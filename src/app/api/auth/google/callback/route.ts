import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams, host } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    if (error || !code) {
        console.error('Google OAuth Error:', error);
        return NextResponse.redirect(new URL(`/login?error=${error || 'NoCode'}`, request.url));
    }

    // Decode State
    let role = 'shopper';
    if (state) {
        try {
            const decodedState = JSON.parse(Buffer.from(state, 'base64').toString('utf8'));
            if (decodedState.role) role = decodedState.role;
        } catch (e) {
            console.error('Failed to parse state', e);
        }
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return NextResponse.redirect(new URL('/login?error=GoogleLoginNotConfigured', request.url));
    }

    // Construct redirect URI dynamically based on the current host
    const proto = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const actualProto = host.includes('localhost') ? 'http' : (request.headers.get('x-forwarded-proto') || proto);
    const redirectUri = `${actualProto}://${host}/api/auth/google/callback`;

    try {
        // 1. Exchange code for access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error('Token Exchange Error:', tokenData);
            return NextResponse.redirect(new URL('/login?error=GoogleTokenError', request.url));
        }

        const { access_token, id_token } = tokenData;

        // 2. Fetch User Profile
        const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const profileData = await profileResponse.json();

        if (!profileResponse.ok || !profileData.email) {
            console.error('Profile fetch error:', profileData);
            return NextResponse.redirect(new URL('/login?error=GoogleProfileError', request.url));
        }

        const email = profileData.email;
        const name = profileData.name || '';
        const givenName = profileData.given_name || '';
        const familyName = profileData.family_name || '';
        const picture = profileData.picture || '';
        const googleId = profileData.id;

        // Create base username from email handle if we need to create a new user
        const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

        // 3. Upsert User
        // First try to find existing user by email
        let user = await prisma.user.findUnique({
            where: { email },
            include: { socialAccounts: true }
        });

        if (!user) {
            // Find a unique username
            let username = baseUsername;
            let counter = 1;
            while (await prisma.user.findUnique({ where: { username } })) {
                username = `${baseUsername}${counter}`;
                counter++;
            }

            // Create new user
            user = await prisma.user.create({
                data: {
                    email,
                    username,
                    fullName: name,
                    avatarUrl: picture,
                    role: role,
                    isVerified: true, // Google emails are auto-verified
                    socialAccounts: {
                        create: {
                            platform: 'google',
                            platformUserId: googleId,
                            accessToken: access_token,
                            lastSyncedAt: new Date()
                        }
                    }
                },
                include: { socialAccounts: true }
            });
        } else {
            // User exists, just ensure social account is linked
            const hasGoogleLinked = user.socialAccounts.some(s => s.platform === 'google');

            if (!hasGoogleLinked) {
                await prisma.socialAccount.create({
                    data: {
                        userId: user.id,
                        platform: 'google',
                        platformUserId: googleId,
                        accessToken: access_token,
                        lastSyncedAt: new Date()
                    }
                });
            }

            // Update avatar if they don't have one
            if (!user.avatarUrl && picture) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { avatarUrl: picture }
                });
            }
        }

        // 4. Create Session
        const COOKIE_NAME = 'room001_session';
        const cookieStore = await cookies();

        // We just set the raw user ID as the session as per the current simplistic implementation
        // Wait, let's double check auth.ts. In `verifyPhoneOtpAction` and `loginAction`,
        // it says: (await cookies()).set(COOKIE_NAME, user.id, { ... })
        // No JWT signing for now if auth.ts just sets user.id directly.
        cookieStore.set(COOKIE_NAME, user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        // 5. Redirect successfully
        return NextResponse.redirect(new URL('/dashboard', request.url));

    } catch (error) {
        console.error('Google Auth Error:', error);
        return NextResponse.redirect(new URL('/login?error=GoogleServerError', request.url));
    }
}

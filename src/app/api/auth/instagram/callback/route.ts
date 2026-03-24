import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams, host } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorReason = searchParams.get('error_reason');
    const errorDescription = searchParams.get('error_description');
    const state = searchParams.get('state');

    if (error || !code) {
        console.error('Instagram OAuth Error:', error, errorReason, errorDescription);
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

    const clientId = process.env.INSTAGRAM_CLIENT_ID;
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return NextResponse.redirect(new URL('/login?error=InstagramLoginNotConfigured', request.url));
    }

    const proto = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const actualProto = host.includes('localhost') ? 'http' : (request.headers.get('x-forwarded-proto') || proto);
    const redirectUri = `${actualProto}://${host}/api/auth/instagram/callback`;

    try {
        // 1. Exchange code for short-lived access token
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: redirectUri,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error('Token Exchange Error:', tokenData);
            return NextResponse.redirect(new URL('/login?error=InstagramTokenError', request.url));
        }

        const { access_token, user_id } = tokenData;

        // 2. Fetch User Profile from Graph API
        const profileResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
        const profileData = await profileResponse.json();

        if (!profileResponse.ok || !profileData.username) {
            console.error('Profile fetch error:', profileData);
            return NextResponse.redirect(new URL('/login?error=InstagramProfileError', request.url));
        }

        const { username, id: instagramId } = profileData;

        // Instagram Basic Display API does not provide an email address.
        // We generate a placeholder email. The user should be prompted to update it later.
        const email = `${username}@instagram.room001.tr`;

        // 3. Upsert User
        // First try to find existing user by checking the SocialAccount link, or the placeholder email
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { socialAccounts: { some: { platform: 'instagram', platformUserId: instagramId.toString() } } }
                ]
            },
            include: { socialAccounts: true }
        });

        if (!user) {
            // Find a unique username if the instagram username is already taken
            let uniqueUsername = username;
            let counter = 1;
            while (await prisma.user.findUnique({ where: { username: uniqueUsername } })) {
                uniqueUsername = `${username}${counter}`;
                counter++;
            }

            // Create new user
            user = await prisma.user.create({
                data: {
                    email,
                    username: uniqueUsername,
                    fullName: username, // Instagram doesn't always provide full name via Basic Display
                    role: role,
                    instagramUrl: `https://instagram.com/${username}`,
                    isVerified: false, // Not a real email, needs verification later
                    socialAccounts: {
                        create: {
                            platform: 'instagram',
                            platformUserId: instagramId.toString(),
                            username: username,
                            accessToken: access_token,
                            lastSyncedAt: new Date()
                        }
                    }
                },
                include: { socialAccounts: true }
            });
        } else {
            // User exists, just ensure social account is linked and token updated
            const socialAccount = user.socialAccounts.find(s => s.platform === 'instagram');

            if (!socialAccount) {
                await prisma.socialAccount.create({
                    data: {
                        userId: user.id,
                        platform: 'instagram',
                        platformUserId: instagramId.toString(),
                        username: username,
                        accessToken: access_token,
                        lastSyncedAt: new Date()
                    }
                });
            } else {
                await prisma.socialAccount.update({
                    where: { id: socialAccount.id },
                    data: {
                        accessToken: access_token,
                        lastSyncedAt: new Date(),
                        username: username
                    }
                });
            }
        }

        // 4. Create Session (Cookie based like AuthContext)
        const COOKIE_NAME = 'room001_session';
        const cookieStore = await cookies();

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
        console.error('Instagram Auth Error:', error);
        return NextResponse.redirect(new URL('/login?error=InstagramServerError', request.url));
    }
}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, host } = new URL(request.url);
    const role = searchParams.get('role') || 'shopper';

    const clientId = process.env.INSTAGRAM_CLIENT_ID;
    if (!clientId) {
        console.error('INSTAGRAM_CLIENT_ID is not configured');
        return NextResponse.redirect(new URL('/login?error=InstagramLoginNotConfigured', request.url));
    }

    const proto = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const actualProto = host.includes('localhost') ? 'http' : (request.headers.get('x-forwarded-proto') || proto);

    const redirectUri = `${actualProto}://${host}/api/auth/instagram/callback`;
    const state = Buffer.from(JSON.stringify({ role })).toString('base64');

    const authUrl = new URL('https://api.instagram.com/oauth/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'user_profile,user_media');
    authUrl.searchParams.set('state', state);

    return NextResponse.redirect(authUrl.toString());
}

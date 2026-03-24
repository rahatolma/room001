import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, host, protocol } = new URL(request.url);
    // Allow passing an optional role during signup, default to shopper
    const role = searchParams.get('role') || 'shopper';

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
        console.error('GOOGLE_CLIENT_ID is not configured');
        return NextResponse.redirect(new URL('/login?error=GoogleLoginNotConfigured', request.url));
    }

    // Construct redirect URI dynamically based on the current host
    const proto = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    // If the host includes localhost, use http, otherwise use the forwarded protocol or https
    const actualProto = host.includes('localhost') ? 'http' : (request.headers.get('x-forwarded-proto') || proto);

    const redirectUri = `${actualProto}://${host}/api/auth/google/callback`;

    // We can pass state to persist the chosen role through the OAuth flow
    const state = Buffer.from(JSON.stringify({ role })).toString('base64');

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    authUrl.searchParams.set('state', state);

    return NextResponse.redirect(authUrl.toString());
}

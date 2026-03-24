import { cookies } from 'next/headers';
import React from 'react';

export default async function TestCookie() {
  const cookieStore = await cookies();
  const session = cookieStore.get('room001_session');
  return <div style={{ fontSize: '24px', padding: '50px' }}>Raw Cookie: {session ? session.value : 'NO COOKIE'}</div>;
}

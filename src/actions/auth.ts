'use server';

import { cookies } from 'next/headers';
import { findUserByEmail, saveUser, updateUserInDb } from '@/lib/db';
import { User } from '@/types';

const COOKIE_NAME = 'shopmy_session';

export async function loginAction(email: string, password?: string): Promise<{ success: boolean; error?: string; user?: User }> {
    const user = await findUserByEmail(email);

    if (!user) {
        return { success: false, error: 'Kullanıcı bulunamadı.' };
    }

    if (password && user.password !== password) {
        return { success: false, error: 'Hatalı şifre.' };
    }

    // Set cookie
    (await cookies()).set(COOKIE_NAME, user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    return { success: true, user };
}

export async function signupAction(email: string, password?: string): Promise<{ success: boolean; error?: string; user?: User }> {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return { success: false, error: 'Bu e-posta adresi zaten kayıtlı.' };
    }

    const normalizedEmail = email.toLowerCase();
    const id = normalizedEmail.split('@')[0] + '_' + Date.now();

    const newUser: User = {
        id,
        username: normalizedEmail.split('@')[0],
        email: normalizedEmail,
        password,
        fullName: normalizedEmail.split('@')[0],
        avatarInitials: normalizedEmail.substring(0, 2).toUpperCase(),
        socialStats: []
    };

    await saveUser(newUser);

    // Set cookie
    (await cookies()).set(COOKIE_NAME, newUser.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    return { success: true, user: newUser };
}

export async function logoutAction() {
    (await cookies()).delete(COOKIE_NAME);
    return { success: true };
}

export async function getSessionAction(): Promise<User | null> {
    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_NAME)?.value;

    if (!userId) return null;

    const users = await import('@/lib/db').then(m => m.getUsers());
    const user = users.find(u => u.id === userId);

    return user || null;
}

export async function updateProfileAction(updates: Partial<User>) {
    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_NAME)?.value;

    if (!userId) return { success: false, error: 'Oturum bulunamadı' };

    const users = await import('@/lib/db').then(m => m.getUsers());
    const user = users.find(u => u.id === userId);

    if (!user) return { success: false, error: 'Kullanıcı bulunamadı' };

    const updatedUser = { ...user, ...updates };
    await updateUserInDb(updatedUser);

    return { success: true, user: updatedUser };
}

export async function findUserByEmailAction(email: string): Promise<User | null> {
    const user = await findUserByEmail(email);
    return user || null;
}

export async function getPublicProfile(username: string): Promise<Partial<User> | null> {
    const users = await import('@/lib/db').then(m => m.getUsers());
    const user = users.find(u => u.username === username);

    if (!user) return null;

    // Return only public info
    const { password, ...publicUser } = user;
    return publicUser;
}

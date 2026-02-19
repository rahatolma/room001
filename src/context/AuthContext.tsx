"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

import { loginAction, signupAction, logoutAction, getSessionAction, updateProfileAction, updateThemeAction } from '@/actions/auth';

interface AuthContextType {
    user: User | null;
    login: (email: string, password?: string) => Promise<boolean>;
    signup: (email: string, password?: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    updateProfile: (updates: Partial<User>) => Promise<void>;
    updateTheme: (theme: any) => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check server session
        const checkSession = async () => {
            try {
                const sessionUser = await getSessionAction();
                if (sessionUser) {
                    setUser(sessionUser);
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async (email: string, password?: string): Promise<boolean> => {
        // Mock Admin Login
        if (email === 'admin@shopmy.tr') {
            const adminUser: User = {
                id: 'admin_1',
                email: 'admin@shopmy.tr',
                fullName: 'Platform Yöneticisi',
                username: 'admin',
                role: 'admin',
                avatarInitials: 'AD'
            };
            setUser(adminUser);
            router.push('/dashboard/admin');
            return true;
        }

        try {
            const result = await loginAction(email, password);
            if (result.success && result.user) {
                setUser(result.user);
                router.push('/dashboard');
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const signup = async (email: string, password?: string) => {
        try {
            const result = await signupAction(email, password);
            if (result.success && result.user) {
                setUser(result.user);
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const logout = async () => {
        await logoutAction();
        setUser(null);
        router.push('/');
    };

    const updateProfile = async (updates: Partial<User>) => {
        if (!user) return;

        // Optimistic update
        setUser({ ...user, ...updates });

        // Server update
        await updateProfileAction(updates);
    };

    const updateTheme = async (theme: any) => {
        if (!user) return;

        // Optimistic update
        setUser({ ...user, themePreferences: theme });

        // Server update
        try {
            await updateThemeAction(theme);
            router.refresh(); // Refresh Server Components
        } catch (error) {
            console.error("Theme update failed", error);
        }
    };

    const refreshUser = async () => {
        try {
            const sessionUser = await getSessionAction();
            if (sessionUser) {
                setUser(sessionUser);
            }
        } catch (error) {
            console.error("Refresh session failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, updateProfile, updateTheme, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

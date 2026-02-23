"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

import { loginAction, signupAction, logoutAction, getSessionAction, updateProfileAction, updateThemeAction, setMockSessionAction } from '@/actions/auth';

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
        // --- MOCK USER ROLES FOR DEMO ---
        // Clean input for checking (remove spaces)
        const checkInput = email.replace(/\s/g, '');

        if (checkInput === '05551111111' || checkInput === '5551111111') {
            const adminUser: User = {
                id: 'admin_1',
                email: 'admin@shopmy.tr',
                fullName: 'Platform Yöneticisi',
                username: 'admin',
                role: 'admin',
                avatarInitials: 'AD'
            };
            await setMockSessionAction(adminUser);
            setUser(adminUser);
            router.push('/dashboard/admin');
            return true;
        }

        if (checkInput === '05552222222' || checkInput === '5552222222') {
            const shopperUser: User = {
                id: 'shopper_1',
                email: 'shopper@shopmy.tr',
                fullName: 'Alışveriş Tutkunu',
                username: 'shopaholic',
                role: 'shopper',
                avatarInitials: 'AT'
            };
            await setMockSessionAction(shopperUser);
            setUser(shopperUser);
            router.push('/dashboard/shopper');
            return true;
        }

        if (checkInput === '05553333333' || checkInput === '5553333333') {
            const creatorUser: User = {
                id: 'creator_1',
                email: 'insider@shopmy.tr',
                fullName: 'Asena Sarıbatur',
                username: 'asenasaribatur',
                role: 'creator',
                avatarInitials: 'AS',
                avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
            };
            await setMockSessionAction(creatorUser);
            setUser(creatorUser);
            router.push('/dashboard/creator');
            return true;
        }

        if (checkInput === '05554444444' || checkInput === '5554444444') {
            const brandUser: User = {
                id: 'brand_1',
                email: 'brand@shopmy.tr',
                fullName: 'Beymen',
                username: 'beymen',
                role: 'brand',
                avatarInitials: 'B',
                avatarUrl: 'https://images.unsplash.com/photo-1541533848490-bc9c15ceaccb?w=150&q=80'
            };
            await setMockSessionAction(brandUser);
            setUser(brandUser);
            router.push('/dashboard/brand');
            return true;
        }

        try {
            const result = await loginAction(email, password);
            if (result.success && result.user) {
                setUser(result.user);
                router.push('/dashboard/creator'); // Default for now
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

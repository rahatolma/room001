'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { User } from '@/types';

const COOKIE_NAME = 'room001_session';

// Helper to map Prisma User to Frontend User Type
function mapPrismaUser(user: any): User {
    return {
        id: user.id,
        username: user.username || user.email.split('@')[0],
        email: user.email,
        fullName: user.fullName || '',
        bio: user.bio || undefined,
        avatarInitials: user.fullName ? user.fullName.substring(0, 2).toUpperCase() : '??',
        contactEmail: user.email,
        password: user.password,
        niche: user.niche || undefined,
        featuredImage: user.avatarUrl || undefined,
        isFeatured: false, // You might want to add this to DB schema later
        role: (user.role as any) || 'shopper',
        permissions: { role: user.role || 'shopper' },
        instagramConnected: user.socialAccounts?.some((s: any) => s.platform === 'instagram') || false,

        // Extended fields
        avatarUrl: user.avatarUrl || undefined,
        websiteUrl: user.websiteUrl || undefined,
        location: user.location || undefined,
        instagramUrl: user.instagramUrl || undefined,
        tiktokUrl: user.tiktokUrl || undefined,
        youtubeUrl: user.youtubeUrl || undefined,

        themePreferences: user.themeConfig ? JSON.parse(user.themeConfig) : {
            primaryColor: 'black',
            backgroundColor: 'white',
            fontFamily: 'dm-sans',
            buttonStyle: 'sharp'
        }
    };
}

export async function updateThemeAction(theme: any) {
    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_NAME)?.value;

    if (!userId) return { success: false, error: 'Oturum bulunamadı' };

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { themeConfig: JSON.stringify(theme) }
        });

        if (updatedUser.username) {
            revalidatePath(`/${updatedUser.username}`);
        }
        revalidatePath('/dashboard/appearance');

        return { success: true };
    } catch (error) {
        console.error('Update theme error:', error);
        return { success: false, error: 'Tema güncellenemedi' };
    }
}

export async function loginAction(email: string, password?: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { socialAccounts: true }
        });

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

        return { success: true, user: mapPrismaUser(user) };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Giriş yapılırken bir hata oluştu.' };
    }
}

export async function signupAction(email: string, password?: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { success: false, error: 'Bu e-posta adresi zaten kayıtlı.' };
        }

        const normalizedEmail = email.toLowerCase();
        const username = normalizedEmail.split('@')[0] + Math.floor(Math.random() * 1000);

        const newUser = await prisma.user.create({
            data: {
                email: normalizedEmail,
                username: username,
                password: password || '',
                fullName: normalizedEmail.split('@')[0],
                role: 'creator' // Default to creator for now as per flow
            }
        });

        // Set cookie
        (await cookies()).set(COOKIE_NAME, newUser.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return { success: true, user: mapPrismaUser(newUser) };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: 'Kayıt olurken bir hata oluştu.' };
    }
}

export async function logoutAction() {
    (await cookies()).delete(COOKIE_NAME);
    return { success: true };
}

export async function setMockSessionAction(user: User) {
    (await cookies()).set(COOKIE_NAME, user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });
    return { success: true };
}

export async function getSessionAction(): Promise<User | null> {
    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_NAME)?.value;

    if (!userId) return null;

    // --- MOCK USERS PERSISTENCE ---
    if (userId === 'admin_1') {
        return {
            id: 'admin_1',
            email: 'admin@room001.tr',
            fullName: 'Platform Yöneticisi',
            username: 'admin',
            role: 'admin',
            avatarInitials: 'AD'
        };
    }
    if (userId === 'shopper_1') {
        return {
            id: 'shopper_1',
            email: 'shopper@room001.tr',
            fullName: 'Alışveriş Tutkunu',
            username: 'shopaholic',
            role: 'shopper',
            avatarInitials: 'AT'
        };
    }
    if (userId === 'creator_1') {
        return {
            id: 'creator_1',
            email: 'insider@room001.tr',
            fullName: 'Asena Sarıbatur',
            username: 'asenasaribatur',
            role: 'creator',
            avatarInitials: 'AS',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
        };
    }
    if (userId === 'brand_1') {
        return {
            id: 'brand_1',
            email: 'brand@room001.tr',
            fullName: 'Beymen',
            username: 'beymen',
            role: 'brand',
            avatarInitials: 'B',
            avatarUrl: 'https://images.unsplash.com/photo-1541533848490-bc9c15ceaccb?w=150&q=80'
        };
    }
    // -----------------------------

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { socialAccounts: true }
        });

        if (!user) return null;

        return mapPrismaUser(user);
    } catch (error) {
        console.error('Get session error:', error);
        return null;
    }
}

export async function updateProfileAction(updates: Partial<User>) {
    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_NAME)?.value;

    if (!userId) return { success: false, error: 'Oturum bulunamadı' };

    try {
        const updateData: any = {};
        if (updates.fullName) updateData.fullName = updates.fullName;
        if (updates.email) updateData.email = updates.email;
        if (updates.password) updateData.password = updates.password;
        if (updates.bio) updateData.bio = updates.bio;
        // Add other fields as necessary

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            include: { socialAccounts: true }
        });

        return { success: true, user: mapPrismaUser(updatedUser) };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, error: 'Profil güncellenemedi' };
    }
}

export async function findUserByEmailAction(email: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { socialAccounts: true }
        });
        return user ? mapPrismaUser(user) : null;
    } catch (error) {
        return null;
    }
}


// --- Phone OTP & Verification System ---

// Mock helper to generate 6-digit code
function generateOtp() {
    return '123456'; // FIXED OTP FOR DEVELOPMENT
}

export async function sendPhoneOtpAction(phoneNumber: string) {
    // 1. Validate phone (rudimentary)
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) return { success: false, error: 'Geçersiz telefon numarası' };

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    console.log('Sending OTP to:', cleanPhone, 'OTP:', otp);

    try {
        // Find or create user with this phone
        // We use upsert to handle both login and signup flows seamlessly
        const user = await prisma.user.upsert({
            where: { phoneNumber: cleanPhone },
            update: {
                phoneCode: otp,
                phoneCodeExpires: expiresAt
            },
            create: {
                phoneNumber: cleanPhone,
                email: `temp_${cleanPhone}@room001.com`, // Temp email
                username: `user${cleanPhone.slice(-4)}`, // Temp username
                password: '', // No password for phone users
                fullName: 'Yeni Üye',
                role: 'creator', // Default to creator for testing purposes, usually 'shopper'
                isVerified: false,
                phoneCode: otp,
                phoneCodeExpires: expiresAt
            }
        });

        // 🚨 MOCK SMS SENDING 🚨
        // In production, integrate with Twilio / Netgsm here.
        console.log(`\n\n[SMS MOCK] To: ${cleanPhone} | Code: ${otp} \n\n`);

        return { success: true };
    } catch (error) {
        console.error('Send OTP error:', error);
        return { success: false, error: 'SMS gönderilemedi.' };
    }
}

export async function verifyPhoneOtpAction(phoneNumber: string, code: string) {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

    try {
        const user = await prisma.user.findUnique({
            where: { phoneNumber: cleanPhone }
        });

        if (!user || !user.phoneCode || !user.phoneCodeExpires) {
            return { success: false, error: 'Geçersiz işlem.' };
        }

        if (new Date() > user.phoneCodeExpires) {
            return { success: false, error: 'Kodun süresi dolmuş.' };
        }

        if (user.phoneCode !== code) {
            return { success: false, error: 'Hatalı kod.' };
        }

        // Verification successful
        // Clean up OTP fields and verify user
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                phoneCode: null,
                phoneCodeExpires: null,
                // If it was a temp email, maybe we ask for real email later?
            }
        });

        // Login the user
        (await cookies()).set(COOKIE_NAME, user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 days for phone login
            path: '/',
        });

        return { success: true, user: mapPrismaUser(user) };

    } catch (error) {
        console.error('Verify OTP error:', error);
        return { success: false, error: 'Doğrulama hatası.' };
    }
}

// --- Creator Eligibility ---

export async function checkCreatorEligibility(instagramHandle: string) {
    // 🚨 MOCK INSTAGRAM API 🚨
    // We simulate a check. 
    // If handle contains "fail", we return low followers.
    // Otherwise we return a high number.

    const isFail = instagramHandle.toLowerCase().includes('ezik');
    const followerCount = isFail ? 1500 : 45200; // Mock counts

    // Threshold
    const MIN_FOLLOWERS = 20000;
    const eligible = followerCount >= MIN_FOLLOWERS;

    return {
        success: true,
        eligible,
        followerCount,
        message: eligible
            ? 'Tebrikler! Kriterlerimizi sağlıyorsunuz.'
            : `Üzgünüz, şu an için en az ${MIN_FOLLOWERS.toLocaleString()} takipçi şartımız var. Sizin takipçi sayınız: ${followerCount.toLocaleString()}`
    };
}

// --- Brand Application ---

export async function submitBrandApplication(data: {
    brandName: string;
    websiteUrl: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    taxId: string;
}) {
    try {
        // Create Brand with 'pending' status
        const slug = data.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000);

        await prisma.brand.create({
            data: {
                name: data.brandName,
                slug: slug,
                websiteUrl: data.websiteUrl,
                contactName: data.contactName,
                contactEmail: data.contactEmail,
                contactPhone: data.contactPhone,
                taxId: data.taxId,
                status: 'pending' // Important
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Brand application error:', error);
        return { success: false, error: 'Başvuru alınamadı.' };
    }
}

'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from './auth';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(formData: FormData) {
    const user = await getSessionAction();

    if (!user) {
        return { success: false, error: 'Oturum açmanız gerekiyor.' };
    }

    const fullName = formData.get('fullName') as string;
    const username = formData.get('username') as string;
    const bio = formData.get('bio') as string;
    const websiteUrl = formData.get('websiteUrl') as string;
    const instagramUrl = formData.get('instagramUrl') as string;
    const tiktokUrl = formData.get('tiktokUrl') as string;
    const youtubeUrl = formData.get('youtubeUrl') as string;
    const location = formData.get('location') as string;
    // For now, we'll just take the avatar URL as a string. 
    // In a real app, we'd handle file upload here.
    const avatarUrl = formData.get('avatarUrl') as string;

    try {
        // Check if username is taken (if changed)
        if (username && username !== user.username) {
            const existing = await prisma.user.findUnique({
                where: { username },
            });
            if (existing) {
                return { success: false, error: 'Bu kullanıcı adı zaten alınmış.' };
            }
        }

        // Fallback to Raw SQL because Prisma Client is caching the old schema in dev mode
        // and not recognizing the new fields despite regeneration.
        // Table name is "users" due to @@map("users") in schema.
        await prisma.$executeRaw`
            UPDATE users 
            SET fullName=${fullName}, 
                username=${username}, 
                bio=${bio}, 
                websiteUrl=${websiteUrl}, 
                instagramUrl=${instagramUrl}, 
                tiktokUrl=${tiktokUrl}, 
                youtubeUrl=${youtubeUrl}, 
                location=${location}, 
                avatarUrl=${avatarUrl}
            WHERE id=${user.id}
        `;

        revalidatePath('/dashboard/profile');
        revalidatePath(`/${username}`); // Revalidate public profile
        return { success: true };
    } catch (error: any) {
        console.error('Profile update error:', error);
        return { success: false, error: `Hata: ${error.message || 'Profil güncellenirken bir hata oluştu.'}` };
    }
}

export async function getShopperDashboardStats() {
    const user = await getSessionAction();

    if (!user) {
        return null;
    }

    try {
        const [favoritesCount, circlesCount, userData] = await Promise.all([
            prisma.favorite.count({ where: { userId: user.id } }),
            prisma.circleMember.count({ where: { userId: user.id } }),
            prisma.user.findUnique({
                where: { id: user.id },
                select: { bio: true, location: true, websiteUrl: true }
            })
        ]);

        const isProfileComplete = !!(userData?.bio || userData?.location || userData?.websiteUrl);

        return {
            favoritesCount,
            circlesCount,
            isProfileComplete
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
            favoritesCount: 0,
            circlesCount: 0,
            isProfileComplete: false
        };
    }
}

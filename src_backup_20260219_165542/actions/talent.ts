'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

export async function updateTalentProfileAction(formData: FormData) {
    const session = await getSessionAction();
    if (!session) return { success: false, error: 'Unauthorized' };

    const gender = formData.get('gender') as string;
    const dob = formData.get('dob') as string;
    const giftPreferences = formData.getAll('giftPreferences') as string[]; // Multi-select
    const identity = formData.getAll('identity') as string[]; // Multi-select
    const familyStatus = formData.get('familyStatus') as string;
    const lifeEvents = formData.get('lifeEvents') as string;

    // Parse DOB
    let dateOfBirth: Date | null = null;
    if (dob) {
        dateOfBirth = new Date(dob);
    }

    try {
        await prisma.user.update({
            where: { id: session.id },
            data: {
                gender,
                dateOfBirth,
                giftPreferences: JSON.stringify(giftPreferences),
                identity: JSON.stringify(identity),
                familyStatus,
                lifeEvents
            }
        });

        revalidatePath('/dashboard/talent-card');
        return { success: true };
    } catch (error) {
        console.error("Failed to update talent profile:", error);
        return { success: false, error: 'Update failed' };
    }
}

export async function getTalentProfile() {
    const session = await getSessionAction();
    if (!session) return null;

    let user = await prisma.user.findUnique({
        where: { id: session.id },
        select: {
            id: true,
            fullName: true,
            username: true,
            bio: true,
            avatarUrl: true,
            gender: true,
            dateOfBirth: true,
            giftPreferences: true,
            identity: true,
            familyStatus: true,
            lifeEvents: true,
            totalEarnings: true, // For volume stats
            productsSharedCount: true,
            // Mocking AOV and Conversion since we don't have order granularity yet
        }
    });

    if (!user) {
        // AUTO-SEED if missing
        const { ensureMockUserExists } = await import('@/actions/debug_media');
        await ensureMockUserExists();

        // Retry fetch
        user = await prisma.user.findUnique({
            where: { id: session.id },
            select: {
                id: true,
                fullName: true,
                username: true,
                bio: true,
                avatarUrl: true,
                gender: true,
                dateOfBirth: true,
                giftPreferences: true,
                identity: true,
                familyStatus: true,
                lifeEvents: true,
                totalEarnings: true,
                productsSharedCount: true,
            }
        });
    }

    return {
        ...user,
        totalEarnings: user.totalEarnings ? Number(user.totalEarnings) : 0
    };
}

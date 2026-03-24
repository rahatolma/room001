'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getActiveNativeAds() {
    try {
        const ads = await prisma.adCampaign.findMany({
            where: {
                isActive: true,
                targetType: 'native',
                startDate: { lte: new Date() },
                endDate: { gte: new Date() }
            },
            take: 5
        });
        return { success: true, ads };
    } catch (error) {
        console.error('Error fetching ads:', error);
        return { success: false, ads: [] };
    }
}

export async function logAdClick(adCampaignId: string, userId?: string) {
    try {
        await prisma.adClick.create({
            data: {
                adCampaignId,
                userId: userId || null
            }
        });
        return { success: true };
    } catch (error) {
        console.error('Error logging ad click:', error);
        return { success: false };
    }
}

'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getUserQuests(userId: string) {
    if (!userId) return { success: false, error: 'Unauthorized' };

    try {
        // Fetch User and their current XP
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { xp: true, id: true }
        });

        if (!user) return { success: false, error: 'Kullanıcı bulunamadı.' };

        // Fetch all available system quests
        let allQuests = await prisma.quest.findMany({
            orderBy: { points: 'asc' }
        });

        if (allQuests.length === 0) {
            const defaultQuests = [
                { title: 'Profilini Tamamla', description: 'Biyografi ve iletişim bilgilerini gir.', points: 10, type: 'PROFILE', actionUrl: '/dashboard/settings' },
                { title: 'İlk Ürün Seçkisini (Koleksiyon) Oluştur', description: 'Takipçilerin için 5 favori ürününü bir araya getir.', points: 15, type: 'COLLECTION', actionUrl: '/dashboard/store' },
                { title: 'Medya Kitini Doldur', description: 'Audience verilerini girerek markalara kendini göster.', points: 15, type: 'MEDIA_KIT', actionUrl: '/dashboard/media-kit' },
                { title: 'TikTok veya Instagram Bağla', description: 'Analitik için sosyal hesaplarını bağla.', points: 20, type: 'SOCIAL', actionUrl: '/dashboard/connected-accounts' },
                { title: 'İlk Satışını (Dönüşüm) Gerçekleştir', description: 'Linklerinden ilk komisyonunu kazan.', points: 30, type: 'SALES', actionUrl: '/dashboard/analytics' },
            ];
            await Promise.all(defaultQuests.map(data => prisma.quest.create({ data })));
            allQuests = await prisma.quest.findMany({ orderBy: { points: 'asc' } });
        }

        // Fetch user's completed/active quests
        const userQuests = await prisma.userQuest.findMany({
            where: { userId }
        });

        // Combine system quests with user progress
        const questStatus = allQuests.map((quest: any) => {
            const uq = userQuests.find((uq: any) => uq.questId === quest.id);
            return {
                id: quest.id,
                title: quest.title,
                description: quest.description,
                points: quest.points,
                actionUrl: quest.actionUrl,
                completed: uq ? uq.isCompleted : false,
            };
        });

        return { success: true, quests: questStatus, currentXp: user.xp };

    } catch (error: any) {
        console.error('Error fetching quests:', error);
        return { success: false, error: 'Görevler yüklenirken bir hata oluştu.' };
    }
}

export async function completeQuest(userId: string, questId: string) {
    if (!userId) return { success: false, error: 'Unauthorized' };

    try {
        const quest = await prisma.quest.findUnique({ where: { id: questId } });
        if (!quest) return { success: false, error: 'Görev bulunamadı.' };

        // Check if already completed
        const existing = await prisma.userQuest.findUnique({
            where: { userId_questId: { userId, questId } }
        });

        if (existing?.isCompleted) {
            return { success: false, error: 'Bu görevi zaten tamamladınız.' };
        }

        // Transaction ensures data consistency
        await prisma.$transaction(async (tx) => {
            // 1. Mark quest as completed
            await tx.userQuest.upsert({
                where: { userId_questId: { userId, questId } },
                update: { isCompleted: true, completedAt: new Date() },
                create: { userId, questId, isCompleted: true, completedAt: new Date() }
            });

            // 2. Add XP to User
            await tx.user.update({
                where: { id: userId },
                data: { xp: { increment: quest.points } }
            });
        });

        revalidatePath('/dashboard/tier');
        return { success: true, addedXp: quest.points };

    } catch (error: any) {
        console.error('Error completing quest:', error);
        return { success: false, error: 'Görev tamamlanırken bir hata oluştu.' };
    }
}

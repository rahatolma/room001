'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from './auth';
import { revalidatePath } from 'next/cache';

export async function getCollections() {
    const user = await getSessionAction();
    if (!user) return [];

    try {
        const collections = await prisma.collection.findMany({
            where: { userId: user.id },
            orderBy: { displayOrder: 'asc' }, // Sıralama önemli
            include: {
                _count: {
                    select: { items: true } // Sadece ürün sayısını al, içeriği değil
                }
            }
        });

        return collections;
    } catch (error) {
        console.error('Error fetching collections:', error);
        return [];
    }
}

export async function updateCollectionsOrder(items: { id: string, displayOrder: number }[]) {
    const user = await getSessionAction();
    if (!user) return { success: false, error: 'Unauthorized' };

    try {
        // Transaction ile güvenli güncelleme
        const transaction = items.map((item) =>
            prisma.collection.update({
                where: {
                    id: item.id,
                    userId: user.id // Güvenlik: Sadece kendi koleksiyonunu güncelleyebilir
                },
                data: { displayOrder: item.displayOrder },
            })
        );

        await prisma.$transaction(transaction);
        revalidatePath('/dashboard/sections');
        return { success: true };
    } catch (error) {
        console.error('Error updating collection order:', error);
        return { success: false, error: 'Failed to update order' };
    }
}

export async function createCollection(title: string) {
    const user = await getSessionAction();
    if (!user) return { success: false, error: 'Unauthorized' };

    try {
        // En son sırayı bul
        const lastCollection = await prisma.collection.findFirst({
            where: { userId: user.id },
            orderBy: { displayOrder: 'desc' }
        });
        const newOrder = (lastCollection?.displayOrder || 0) + 1;

        const newCollection = await prisma.collection.create({
            data: {
                userId: user.id,
                title: title,
                slug: `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                displayOrder: newOrder
            }
        });

        revalidatePath('/dashboard/sections');
        return { success: true, collection: newCollection };
    } catch (error) {
        console.error('Error creating collection:', error);
        return { success: false, error: 'Failed to create collection' };
    }
}

export async function deleteCollection(collectionId: string) {
    const user = await getSessionAction();
    if (!user) return { success: false, error: 'Unauthorized' };

    try {
        await prisma.collection.delete({
            where: {
                id: collectionId,
                userId: user.id // Güvenlik
            }
        });

        revalidatePath('/dashboard/sections');
        return { success: true };
    } catch (error) {
        console.error('Error deleting collection:', error);
        return { success: false, error: 'Failed to delete collection' };
    }
}

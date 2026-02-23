'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

export async function acceptBrandOffer(brandName: string, selectedProductIds: string[]) {
    try {
        const session = await getSessionAction();
        if (!session) {
            return { success: false, error: 'Unauthorized' };
        }

        const userId = session.id;

        // 1. Find or Create "Brand Collaborations" Collection
        let collection = await prisma.collection.findFirst({
            where: {
                userId: userId,
                title: 'Marka İşbirlikleri'
            }
        });

        if (!collection) {
            collection = await prisma.collection.create({
                data: {
                    userId: userId,
                    title: 'Marka İşbirlikleri',
                    description: 'Markalarla yaptığım işbirlikleri ve favori ürünlerim.',
                    slug: 'marka-isbirlikleri', // Simple slug logic
                    isPublic: true,
                    layoutType: 'grid'
                }
            });
        }

        // 2. Add Selected Products as Collection Items
        // We use a loop or createMany if supported for relations (SQLite has limitations sometimes but Prisma handles it)
        // For simplicity and to ensure order, we'll map promises.

        const creationPromises = selectedProductIds.map(async (productId) => {
            // Check if already exists to avoid duplicates
            const existing = await prisma.collectionItem.findFirst({
                where: {
                    collectionId: collection!.id,
                    productId: productId
                }
            });

            if (!existing) {
                return prisma.collectionItem.create({
                    data: {
                        collectionId: collection!.id,
                        productId: productId,
                        curatorComment: `${brandName} işbirliği kapsamında önerimdir.`,
                        displayOrder: 0 // You might want to calculate the max order + 1
                    }
                });
            }
        });

        await Promise.all(creationPromises);

        // 3. Revalidate Paths
        revalidatePath('/dashboard/links');
        revalidatePath('/dashboard/brand-match');

        return { success: true };

    } catch (error) {
        console.error('Error accepting brand offer:', error);
        return { success: false, error: 'Failed to accept offer' };
    }
}

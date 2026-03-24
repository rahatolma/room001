'use server';

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

/**
 * Fetches a specific collection for a public user profile, 
 * including its items and related products/brands.
 */
export async function getPublicCollection(username: string, collectionId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return null;
        }

        const collection = await prisma.collection.findFirst({
            where: {
                id: collectionId,
                userId: user.id
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        username: true,
                        avatarUrl: true
                    }
                },
                items: {
                    include: {
                        product: {
                            include: { brand: true }
                        }
                    },
                    orderBy: { displayOrder: 'asc' }
                }
            }
        });

        if (!collection) return null;

        return collection;
    } catch (error) {
        console.error('Error fetching public collection:', error);
        return null;
    }
}

'use server';

import { getSessionAction } from './auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleFavorite(productId: string) {
    const user = await getSessionAction();
    if (!user) {
        return { success: false, error: 'Giriş yapmalısınız.' };
    }

    try {
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId: user.id,
                    productId: productId
                }
            }
        });

        if (existingFavorite) {
            // Remove favorite
            await prisma.favorite.delete({
                where: { id: existingFavorite.id }
            });

            // Decrement count
            await prisma.product.update({
                where: { id: productId },
                data: { favoritesCount: { decrement: 1 } }
            });

            revalidatePath(`/products/${productId}`);
            return { success: true, isFavorited: false };
        } else {
            // Add favorite
            await prisma.favorite.create({
                data: {
                    userId: user.id,
                    productId: productId
                }
            });

            // Increment count
            await prisma.product.update({
                where: { id: productId },
                data: { favoritesCount: { increment: 1 } }
            });

            revalidatePath(`/products/${productId}`);
            return { success: true, isFavorited: true };
        }

    } catch (error) {
        console.error('Error toggling favorite:', error);
        return { success: false, error: 'Bir hata oluştu.' };
    }
}

export async function checkIsFavorited(productId: string) {
    const user = await getSessionAction();
    if (!user) return false;

    const favorite = await prisma.favorite.findUnique({
        where: {
            userId_productId: {
                userId: user.id,
                productId: productId
            }
        }
    });

    return !!favorite;
}

export async function getUserFavorites() {
    const user = await getSessionAction();
    if (!user) return [];

    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: user.id },
            include: {
                product: {
                    include: {
                        brand: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return favorites.map(fav => ({
            id: fav.product.id,
            title: fav.product.title,
            brand: fav.product.brand?.name || 'Unknown',
            price: fav.product.price?.toString() || '0',
            currency: fav.product.currency,
            imageUrl: fav.product.imageUrl || '',
            url: fav.product.productUrl,
            favoritedAt: fav.createdAt
        }));

    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

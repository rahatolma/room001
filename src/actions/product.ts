'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from './auth';
import { revalidatePath } from 'next/cache';

export async function getUserProducts() {
    const user = await getSessionAction();
    if (!user) return [];

    try {
        // Fetch all collections for the user to aggregate products
        const collections = await prisma.collection.findMany({
            where: { userId: user.id },
            include: {
                items: {
                    include: {
                        product: true
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        // Flatten and map to a friendly format
        const allItems = collections.flatMap(c => c.items.map(i => ({
            id: i.product.id, // We'll use the product ID for now, but deletions should probably target the item OR the product
            itemId: i.id, // The CollectionItem ID (unique per placement)
            title: i.product.title,
            price: i.product.price?.toString() || '0',
            brand: 'Unknown', // We need to fetch brand or store it flattened. Product has brandId. 
            image: i.product.imageUrl || '',
            url: i.product.productUrl,
            collectionName: c.title,
            isVisible: i.isVisible, // From CollectionItem
            viewCount: i.product.viewCount
        })));

        return allItems;
    } catch (error) {
        console.error('Error fetching user products:', error);
        return [];
    }
}

export async function addProductToCollection(collectionId: string | null, productData: {
    title: string;
    brand: string;
    price: string;
    currency?: string;
    note?: string;
    imageUrl: string;
    url: string;
}) {
    const user = await getSessionAction();
    if (!user) return { success: false, error: 'Unauthorized' };

    try {
        let targetCollectionId = collectionId;

        // If no collection specified, find or create "Genel" (General)
        if (!targetCollectionId) {
            const defaultCollection = await prisma.collection.findFirst({
                where: { userId: user.id, title: 'Genel' }
            });

            if (defaultCollection) {
                targetCollectionId = defaultCollection.id;
            } else {
                const newCol = await prisma.collection.create({
                    data: {
                        userId: user.id,
                        title: 'Genel',
                        slug: `genel-${Date.now()}`
                    }
                });
                targetCollectionId = newCol.id;
            }
        }

        // 1. Create Product (Global for now, simpler)
        const product = await prisma.product.create({
            data: {
                title: productData.title,
                price: parseFloat(productData.price.replace(/[^0-9.]/g, '')) || 0,
                currency: productData.currency || 'TRY',
                imageUrl: productData.imageUrl,
                productUrl: productData.url,
                // Handle Brand
                brand: {
                    connectOrCreate: {
                        where: { slug: productData.brand.toLowerCase().replace(/\s+/g, '-') },
                        create: {
                            name: productData.brand,
                            slug: productData.brand.toLowerCase().replace(/\s+/g, '-')
                        }
                    }
                }
            }
        });

        // 2. Add to Collection
        await prisma.collectionItem.create({
            data: {
                collectionId: targetCollectionId!,
                productId: product.id,
                curatorComment: productData.note,
                isVisible: true
            }
        });

        revalidatePath('/dashboard/products');
        revalidatePath(`/${user.username}`);
        return { success: true };

    } catch (error) {
        console.error('Error adding product:', error);
        return { success: false, error: 'Failed to add product' };
    }
}

export async function deleteProductFromUser(itemId: string) {
    const user = await getSessionAction();
    if (!user) return { success: false, error: 'Unauthorized' };

    try {
        // Verify ownership via collection
        const item = await prisma.collectionItem.findUnique({
            where: { id: itemId },
            include: { collection: true }
        });

        if (!item || item.collection.userId !== user.id) {
            return { success: false, error: 'Not found or unauthorized' };
        }

        // Delete the item (Relation removal)
        await prisma.collectionItem.delete({
            where: { id: itemId }
        });

        revalidatePath('/dashboard/products');
        revalidatePath(`/${user.username}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: 'Failed to delete' };
    }
}

export async function getLatestProducts() {
    try {
        // Since products are global, we just fetch them. 
        // But visibility is now per collection item. 
        // For distinct products, we might just default to visible if they exist.
        // Or fetch products that are in at least one visible collection item?
        // For simplicity: Fetch all products.
        const latestProducts = await prisma.product.findMany({
            take: 8,
            orderBy: { createdAt: 'desc' },
            include: {
                brand: true
            }
        });

        // Map to simpler format for landing page
        return latestProducts.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price?.toString() || '0',
            currency: p.currency,
            brand: p.brand?.name || 'Unknown',
            imageUrl: p.imageUrl || '',
            url: p.productUrl,
            // Globally visible default? Or should we check relations? 
            // For now, assume global products are visible on landing unless we implement global hiding.
            isVisible: true
        }));
    } catch (error) {
        console.error('Error fetching latest products:', error);
        return [];
    }
}

export async function toggleProductVisibility(itemId: string) {
    const user = await getSessionAction();
    if (!user) return { success: false, error: 'Unauthorized' };

    try {
        // Find the item and verify ownership
        const item = await prisma.collectionItem.findUnique({
            where: { id: itemId },
            include: { collection: true }
        });

        if (!item || item.collection.userId !== user.id) {
            console.error('Item not found or unauthorized for toggle', itemId);
            return { success: false, error: 'Item not found or unauthorized' };
        }

        // Toggle
        const newValue = !item.isVisible;

        await prisma.collectionItem.update({
            where: { id: itemId },
            data: { isVisible: newValue }
        });

        revalidatePath('/dashboard/products');
        return { success: true, isVisible: newValue };
    } catch (error) {
        console.error('Error toggling visibility:', error);
        return { success: false, error: 'Failed to toggle' };
    }
}

export async function searchProducts(query: string, category?: string) {
    try {
        const where: any = {};

        if (query) {
            where.OR = [
                { title: { contains: query } },
                { description: { contains: query } }
                // { brand: { name: { contains: query } } } // Brand relation?
            ];
        }

        // if (category && category !== 'TÜMÜ') ...

        const products = await prisma.product.findMany({
            where,
            include: { brand: true },
            take: 20
        });

        return products.map(p => ({
            id: p.id,
            title: p.title,
            brand: p.brand?.name || 'Unknown',
            price: Number(p.price) || 0,
            image: p.imageUrl || '',
            url: p.productUrl
        }));
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function createQuickLink(productId: string) {
    const session = await getSessionAction();
    if (!session) return { success: false };

    try {
        // 1. Find or Create "Hızlı Linkler"
        let col = await prisma.collection.findFirst({
            where: { userId: session.id, title: 'Hızlı Linkler' }
        });

        if (!col) {
            col = await prisma.collection.create({
                data: {
                    userId: session.id,
                    title: 'Hızlı Linkler',
                    isPublic: false
                }
            });
        }

        // 2. Add Item
        const existing = await prisma.collectionItem.findFirst({
            where: { collectionId: col.id, productId }
        });

        if (existing) return { success: true };

        await prisma.collectionItem.create({
            data: {
                collectionId: col.id,
                productId,
                isVisible: true
            }
        });

        revalidatePath('/dashboard/links');
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

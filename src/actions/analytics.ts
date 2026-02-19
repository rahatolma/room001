'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// --- Types ---
export type AnalyticsEventType = 'CLICK' | 'VIEW' | 'IMPRESSION';
export type AnalyticsEntityType = 'PRODUCT' | 'PROFILE' | 'LINK' | 'COLLECTION';

interface TrackEventParams {
    type: AnalyticsEventType;
    entityId: string;
    entityType: AnalyticsEntityType;
    metadata?: Record<string, any>;
}

// --- Main Tracking Function ---
export async function trackEvent({ type, entityId, entityType, metadata }: TrackEventParams) {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;
        const sessionId = cookieStore.get('sessionId')?.value || 'anonymous';

        // 1. Log the raw event
        await prisma.analyticsEvent.create({
            data: {
                type,
                entityId,
                entityType,
                userId,
                sessionId,
                metadata: metadata ? JSON.stringify(metadata) : undefined
            }
        });

        // 2. Update Aggregated Counters & Simulate Revenue
        if (type === 'CLICK' && entityType === 'PRODUCT') {
            // Update Global Product Clicks
            await prisma.product.update({
                where: { id: entityId },
                data: { clickCount: { increment: 1 } }
            }).catch(err => console.error("Error updating product click count:", err));

            // Update Specific Collection Item Clicks (Curator Attribution)
            if (metadata?.collectionItemId) {
                await prisma.collectionItem.update({
                    where: { id: metadata.collectionItemId },
                    data: { clickCount: { increment: 1 } }
                }).catch(err => console.error("Error updating collection item click count:", err));

                // Simulate Revenue: 0.50 per click
                const item = await prisma.collectionItem.findUnique({
                    where: { id: metadata.collectionItemId },
                    select: { collection: { select: { userId: true } } }
                });

                if (item?.collection?.userId) {
                    await prisma.user.update({
                        where: { id: item.collection.userId },
                        data: { totalEarnings: { increment: 0.50 } } // 0.50 TL per click
                    }).catch(err => console.error("Error updating user earnings:", err));
                }
            }
        }

        if (type === 'VIEW' && entityType === 'PROFILE') {
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { id: entityId },
                        { username: entityId }
                    ]
                }
            });

            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { profileViewCount: { increment: 1 } }
                }).catch(err => console.error("Error updating profile view count:", err));
            }
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to track event:", error);
        return { success: false };
    }
}

// --- Dashboard Stats ---
export async function getCuratorStats(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                profileViewCount: true,
                totalEarnings: true,
                _count: {
                    select: { collections: true }
                }
            }
        });

        const userCollections = await prisma.collection.findMany({
            where: { userId },
            include: {
                items: {
                    select: { clickCount: true }
                }
            }
        });

        const productClicks = userCollections.reduce((total: number, collection: any) => {
            return total + (collection.items?.reduce((sum: number, item: any) => sum + (item.clickCount || 0), 0) || 0);
        }, 0);

        const totalProducts = userCollections.reduce((total: number, collection: any) => {
            return total + (collection.items?.length || 0);
        }, 0);

        return {
            collections: user?._count.collections || 0,
            products: totalProducts,
            clicks: productClicks || 0,
            profileViews: user?.profileViewCount || 0,
            earnings: Number(user?.totalEarnings) || 0
        };
    } catch (error) {
        console.error("Error getting stats:", error);
        return { collections: 0, products: 0, clicks: 0, profileViews: 0, earnings: 0 };
    }
}

export async function getTopPerformingProducts(userId: string, limit: number = 5) {
    try {
        const topItems = await prisma.collectionItem.findMany({
            where: {
                collection: {
                    userId: userId
                }
            },
            orderBy: {
                clickCount: 'desc'
            },
            take: limit,
            include: {
                product: {
                    include: {
                        brand: true
                    }
                },
                collection: {
                    select: { title: true }
                }
            }
        });

        return topItems.map((item: any) => ({
            id: item.productId,
            title: item.product.title,
            brand: item.product.brand?.name || 'Unknown',
            imageUrl: item.product.imageUrl,
            clicks: item.clickCount,
            collectionName: item.collection.title,
            price: Number(item.product.price) || 0
        }));
    } catch (error) {
        console.error("Error getting top products:", error);
        return [];
    }
}

// --- My Links & Performance ---
export async function getCreatorLinks(userId: string) {
    try {
        const items = await prisma.collectionItem.findMany({
            where: {
                collection: { userId: userId }
            },
            include: {
                product: {
                    include: { brand: true }
                },
                collection: {
                    select: { title: true, slug: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return items.map((item: any) => ({
            id: item.id,
            productId: item.productId,
            date: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            product: {
                image: item.product.imageUrl,
                name: item.product.title,
                brand: item.product.brand?.name || 'Unknown',
                commission: '10-20%' // Placeholder
            },
            content: item.collection.title,
            clicks: item.clickCount || 0,
            orders: Math.floor((item.clickCount || 0) * 0.05), // Mock conversion 5%
            earned: `₺${((item.clickCount || 0) * 0.5).toFixed(2)}`, // Mock earnings
            affiliateLink: `https://room001.com/p/${item.productId}?ref=${userId}`
        }));
    } catch (error) {
        console.error("Error fetching creator links:", error);
        return [];
    }
}

export async function getPerformanceByWebsite(userId: string) {
    try {
        const items = await prisma.collectionItem.findMany({
            where: {
                collection: { userId: userId }
            },
            include: {
                product: {
                    include: { brand: true }
                }
            }
        });

        // Aggregation in JS
        const brandStats: Record<string, any> = {};

        items.forEach((item: any) => {
            const brandName = item.product.brand?.name?.toLowerCase() || 'unknown';
            const domain = brandName + '.com';

            if (!brandStats[domain]) {
                brandStats[domain] = {
                    domain: domain,
                    links: 0,
                    clicks: 0,
                    orders: 0,
                    earned: 0
                };
            }

            brandStats[domain].links += 1;
            brandStats[domain].clicks += (item.clickCount || 0);
            brandStats[domain].orders += Math.floor((item.clickCount || 0) * 0.05);
            brandStats[domain].earned += ((item.clickCount || 0) * 0.5);
        });

        return Object.values(brandStats).map(stat => ({
            domain: stat.domain,
            rate: '12%',
            links: stat.links,
            clicks: stat.clicks,
            orders: stat.orders || '-',
            volume: '-',
            earned: stat.earned > 0 ? `₺${stat.earned.toFixed(2)}` : '-'
        }));

    } catch (error) {
        console.error("Error fetching performance by website:", error);
        return [];
    }
}

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
// ... existing imports

export async function getDashboardStats(userId: string) {
    try {
        // 1. Total Clicks (sum of all product clicks for this user)
        // We can get this from CollectionItem.clickCount if we tracked it there, 
        // or Product.clickCount if the user owns the product (less likely in affiliate model).
        // Better: Aggregate AnalyticsEvent of type 'CLICK' where entityOwner = userId (if we had that)
        // Current Schema: CollectionItem has clickCount. Let's sum that.
        const collections = await prisma.collection.findMany({
            where: { userId },
            include: { items: true }
        });

        const totalClicks = collections.reduce((acc, col) => {
            return acc + col.items.reduce((sum, item) => sum + item.clickCount, 0);
        }, 0);

        // 2. Profile Views
        const userProfile = await prisma.user.findUnique({
            where: { id: userId },
            select: { profileViewCount: true, productsSharedCount: true } // productSharedCount as proxy for something else?
        });

        // 3. Active Collections
        const activeCollectionsCount = collections.filter(c => c.isPublic).length;

        // 4. Products Shared (Total Items)
        const totalProductsShared = collections.reduce((acc, col) => acc + col.items.length, 0);

        return {
            totalClicks,
            profileViews: userProfile?.profileViewCount || 0,
            activeCollections: activeCollectionsCount,
            totalProducts: totalProductsShared
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return {
            totalClicks: 0,
            profileViews: 0,
            activeCollections: 0,
            totalProducts: 0
        };
    }
}

export async function getMediaKitData(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { socialAccounts: true, _count: { select: { collections: true } } }
        });

        if (!user) return null;

        // Calculate Total Reach
        const socialReach = user.socialAccounts.reduce((acc, account) => acc + (account.followerCount || 0), 0);
        const totalReach = socialReach + user.profileViewCount;

        return {
            user: {
                fullName: user.fullName,
                username: user.username,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                niche: user.niche,
                location: user.location,
                contactEmail: user.email,
                websiteUrl: user.websiteUrl
            },
            stats: {
                totalReach,
                profileViews: user.profileViewCount,
                productsShared: user.productsSharedCount,
                collections: user._count.collections,
                // Mock Engagement for demo
                engagementRate: '4.8%'
            },
            socials: user.socialAccounts.map(s => ({
                platform: s.platform,
                username: s.username,
                followers: s.followerCount
            }))
        };
    } catch (error) {
        console.error("Error getting media kit data:", error);
        return null;
    }
}

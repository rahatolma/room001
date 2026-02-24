'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCampaigns() {
    try {
        let campaigns = await prisma.campaign.findMany({
            where: { status: 'active' },
            include: {
                brand: { select: { name: true, logoUrl: true } }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Seed demo campaigns if none exist
        if (campaigns.length === 0) {
            const brand1 = await prisma.brand.create({
                data: { name: "L'Oréal Paris", description: "Kozmetik", slug: "loreal-paris" }
            });
            const brand2 = await prisma.brand.create({
                data: { name: "Nike", description: "Spor Giyim", slug: "nike" }
            });

            const defaultCampaigns = [
                {
                    brandId: brand1.id,
                    title: "L'Oréal Paris Cilt Bakım Serisi",
                    description: "Yeni Revitalift serisi için cilt bakımı odaklı creatorlar arıyoruz.",
                    type: "PAYMENT",
                    budget: 15000,
                    requirements: "Instagram Reels + 2 Story",
                    status: "active"
                },
                {
                    brandId: brand2.id,
                    title: 'Nike Koşu Koleksiyonu',
                    description: "Nike'ın yeni koşu koleksiyonunu takipçilerinle paylaşarak komisyon kazan.",
                    type: "AFFILIATE",
                    requirements: "Açık Program",
                    status: "active"
                }
            ];

            await Promise.all(defaultCampaigns.map(data => prisma.campaign.create({ data })));
            campaigns = await prisma.campaign.findMany({
                where: { status: 'active' },
                include: { brand: { select: { name: true, logoUrl: true } } },
                orderBy: { createdAt: 'desc' }
            });
        }

        return { success: true, campaigns };
    } catch (error: any) {
        console.error('Error fetching campaigns:', error);
        return { success: false, error: 'Kampanyalar yüklenirken bir hata oluştu.' };
    }
}

export async function getCreatorApplications(userId: string) {
    if (!userId) return { success: false, error: 'Unauthorized' };
    try {
        const applications = await prisma.campaignApplication.findMany({
            where: { userId },
            include: {
                campaign: {
                    include: { brand: { select: { name: true, logoUrl: true } } }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, applications };
    } catch (error: any) {
        console.error('Error fetching applications:', error);
        return { success: false, error: 'Başvurular yüklenirken bir hata oluştu.' };
    }
}

export async function applyToCampaign(userId: string, campaignId: string, pitch: string, budget: string, includeStats: boolean) {
    if (!userId) return { success: false, error: 'Giriş yapmanız gerekiyor.' };

    try {
        // Check if already applied
        const existing = await prisma.campaignApplication.findUnique({
            where: { userId_campaignId: { userId, campaignId } }
        });

        if (existing) {
            return { success: false, error: 'Bu kampanyaya zaten başvurdunuz.' };
        }

        const application = await prisma.campaignApplication.create({
            data: {
                userId,
                campaignId,
                pitch,
                budget: budget ? parseFloat(budget.replace(/[^0-9.]/g, '')) : null,
                includeStats
            }
        });

        revalidatePath('/dashboard/collaborations');
        return { success: true, application };

    } catch (error: any) {
        console.error('Error applying to campaign:', error);
        return { success: false, error: 'Başvuru sırasında bir hata oluştu.' };
    }
}

export async function sendBrandOffer(brandId: string, creatorId: string, type: 'gift' | 'campaign', message: string, budget?: number) {
    if (!creatorId) return { success: false, error: 'Kreatör bilgisi eksik.' };

    try {
        let actualBrandId = brandId;
        let brandExists = await prisma.brand.findUnique({ where: { id: brandId } });

        // If the user's ID is passed instead of a Brand ID (common in testing), fallback to the first brand
        if (!brandExists) {
            const firstBrand = await prisma.brand.findFirst();
            if (firstBrand) {
                actualBrandId = firstBrand.id;
            } else {
                return { success: false, error: 'Sistemde marka bulunamadı.' };
            }
        }

        let actualCreatorId = creatorId;
        // Check if creator actually exists
        const creatorExists = await prisma.user.findUnique({ where: { id: creatorId } });
        if (!creatorExists) {
            let firstCreator = await prisma.user.findFirst({ where: { role: 'creator' } });
            if (firstCreator) {
                actualCreatorId = firstCreator.id;
            } else {
                return { success: false, error: 'Sistemde kreatör bulunamadı.' };
            }
        }

        // 1. Create a specialized campaign for this direct offer
        const campaign = await prisma.campaign.create({
            data: {
                brandId: actualBrandId,
                title: type === 'gift' ? 'Hediye İşbirliği Teklifi' : 'Özel İşbirliği Teklifi',
                description: message,
                budget: budget ? Number(budget) : null,
                type: type === 'gift' ? 'gifting' : 'paid',
                status: 'direct_offer'
            }
        });

        // 2. Create the application row with "offered" status
        const offer = await prisma.campaignApplication.create({
            data: {
                userId: actualCreatorId,
                campaignId: campaign.id,
                pitch: 'Marka tarafından doğrudan gelen teklif',
                budget: budget ? Number(budget) : null,
                includeStats: false,
                status: 'offered' // Special status for brand-initiated offers
            }
        });

        // Revalidate the creator's dashboard so they see the offer
        revalidatePath('/dashboard/collaborations');
        // Revalidate brand dashboard
        revalidatePath('/brand/agreements');

        return { success: true, offer };

    } catch (error: any) {
        console.error('Error sending brand offer:', error);
        return { success: false, error: 'Teklif gönderilirken bir hata oluştu.' };
    }
}

export async function respondToOffer(applicationId: string, accepted: boolean) {
    if (!applicationId) return { success: false, error: 'Geçersiz işlem.' };

    try {
        const app = await prisma.campaignApplication.update({
            where: { id: applicationId },
            data: { status: accepted ? 'approved' : 'rejected' }
        });

        revalidatePath('/dashboard/collaborations');
        revalidatePath('/brand/agreements');

        return { success: true, application: app };
    } catch (error) {
        console.error('Error responding to offer:', error);
        return { success: false, error: 'İşlem sırasında hata oluştu.' };
    }
}

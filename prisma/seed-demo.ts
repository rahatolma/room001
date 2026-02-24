import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Boosting platform metrics for Investor Demo...');

    try {
        // Find existing users
        const users = await prisma.user.findMany({
            where: { role: 'creator' }
        });

        if (users.length === 0) {
            console.log('No creators found. Please ensure there is at least one creator to seed metrics.');
            return;
        }

        // Add dummy campaigns if non-existent
        const brands = await prisma.user.findMany({ where: { role: 'brand' } });
        if (brands.length > 0) {
            const firstBrand = brands[0];
            const campaigns = [
                {
                    title: 'Yaz Koleksiyonu Tanıtımı',
                    description: 'Yeni yaz koleksiyonumuz için TikTok ve Instagram reels içerikleri arıyoruz.',
                    brandId: firstBrand.id,
                    budget: '15.000 TL',
                    status: 'active',
                    platform: 'Instagram, TikTok',
                },
                {
                    title: 'Premium Parfüm Lansmanı',
                    description: 'Hediyeli lüks parfüm lansmanı için güzellik ve yaşam tarzı içerik üreticileri.',
                    brandId: firstBrand.id,
                    budget: 'Hediye Gönderimi',
                    status: 'active',
                    platform: 'Instagram',
                },
                {
                    title: 'Sürdürülebilir Moda Farkındalığı',
                    description: 'Doğa dostu yeni kumaş teknolojimizi tanıtacak elçiler.',
                    brandId: firstBrand.id,
                    budget: 'Komisyon (%15)',
                    status: 'review',
                    platform: 'Instagram, YouTube',
                }
            ];

            for (const camp of campaigns) {
                const exists = await prisma.campaign.findFirst({ where: { title: camp.title } });
                if (!exists) {
                    await prisma.campaign.create({ data: camp });
                }
            }
        }

        // Boost analytics for all creators
        for (const user of users) {
            console.log(`Boosting stats for Creator: ${user.fullName || user.email}`);
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    followersCount: Math.floor(Math.random() * 500000) + 100000, // 100k - 600k followers
                    productsSharedCount: Math.floor(Math.random() * 500) + 50,
                    profileViewCount: Math.floor(Math.random() * 1000000) + 500000, // 500k - 1.5M views
                    totalEarnings: Math.floor(Math.random() * 200000) + 15000, // 15k - 215k TRY
                    xp: Math.floor(Math.random() * 20000) + 5000, // Instant Unicorn/Diamond tier
                }
            });
        }

        console.log('✅ Premium Dummy Data injected successfully!');
    } catch (e) {
        console.error('Error seeding demo data:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

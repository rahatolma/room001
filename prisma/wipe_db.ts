import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🧹 CANLI TEST İÇİN VERİTABANI TAMAMEN SIFIRLANIYOR...');

    // 1. WIPE DB (in reverse order of dependencies)
    await prisma.magazinePage.deleteMany();
    await prisma.magazine.deleteMany();
    await prisma.collectionItem.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.circleMember.deleteMany();
    await prisma.circle.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.payout.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.adClick.deleteMany();
    await prisma.adCampaign.deleteMany();
    await prisma.campaignApplication.deleteMany();
    await prisma.campaign.deleteMany();
    await prisma.socialAccount.deleteMany();
    await prisma.userQuest.deleteMany();
    await prisma.quest.deleteMany();
    await prisma.dailyAnalytics.deleteMany();
    await prisma.taxInfo.deleteMany();
    await prisma.feedback.deleteMany();

    // Core entities
    await prisma.product.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Eski veriler temizlendi. Veritabanı canlı manuel testler için bomboş bir tuval (Blank Slate) halinde.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

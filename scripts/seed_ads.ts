import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing existing ads...');
    await prisma.adClick.deleteMany({});
    await prisma.adCampaign.deleteMany({});

    console.log('Seeding mock ad campaigns...');

    await prisma.adCampaign.create({
        data: {
            title: 'Dyson Airwrap ile Yaza Hazırlık',
            brandName: 'Dyson',
            description: 'Tüm saç tiplerine uygun, aşırı ısı olmadan şekillendirme. Şimdi Özel Fırsatlarla.',
            imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800',
            targetUrl: 'https://www.dyson.com.tr',
            targetType: 'native',
            startDate: new Date(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            isActive: true,
            budget: 50000.00
        }
    });

    console.log('✅ Ad Campaigns seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

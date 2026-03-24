import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 BÜYÜK ENTEGRASYON TESTİ: Veritabanı Sıfırlanıyor ve Yükleniyor...');

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

    console.log('🧹 Eski veriler temizlendi.');

    // 2. CREATE 8 BRANDS
    const brandNames = ['Dyson TR', 'Sephora', 'Beymen', 'Trendyol', 'Zara', 'Mac Cosmetics', 'Boyner', 'Watsons'];
    const brands = [];
    for (let i = 0; i < 8; i++) {
        const brand = await prisma.brand.create({
            data: {
                name: brandNames[i],
                slug: brandNames[i].toLowerCase().replace(/\s+/g, '-'),
                description: `${brandNames[i]} resmi markasıdır.`,
                commissionRate: 10 + i, // 10 to 17%
                status: 'active'
            }
        });
        brands.push(brand);
    }
    console.log('✅ 8 Marka yaratıldı.');

    // 3. CREATE 8 PRODUCTS (1 for each brand)
    const productNames = [
        'Airwrap Multi-Styler', 'Glow Serum 30ml', 'Tasarım Çanta', 'Basic Tişört',
        'Oversize Kaban', 'Ruby Woo Ruj', 'Spor Ayakkabı', 'Matlaştırıcı Güneş Kremi'
    ];
    const products = [];
    for (let i = 0; i < 8; i++) {
        const product = await prisma.product.create({
            data: {
                title: productNames[i],
                brandId: brands[i].id,
                price: 500 + (i * 1500),
                currency: 'TRY',
                productUrl: `https://example.com/p/${i}`,
                imageUrl: `https://picsum.photos/seed/product${i}/400/600`, // Placeholder image
                stockStatus: 'in_stock'
            }
        });
        products.push(product);
    }
    console.log('✅ 8 Ürün yaratıldı.');

    // 4. CREATE 8 CREATORS (INSIDERS)
    const creators = [];
    for (let i = 1; i <= 8; i++) {
        const creator = await prisma.user.create({
            data: {
                email: `creator${i}@shopmy.tr`,
                username: `kreatör${i}`, // Slug might need English chars but kept as is
                fullName: `İçerik Üreticisi ${i}`,
                role: 'creator',
                password: 'password123', // Static password or no password needed for OTP logic
                phoneNumber: `555100000${i}`, // 555 100 00 01 to 08
                isVerified: true,
                avatarUrl: `https://picsum.photos/seed/creator${i}/200/200`
            }
        });
        creators.push(creator);
    }
    console.log('✅ 8 Insider (Creator) yaratıldı.');

    // 5. CREATE 8 SHOPPERS
    const shoppers = [];
    for (let i = 1; i <= 8; i++) {
        const shopper = await prisma.user.create({
            data: {
                email: `shopper${i}@shopmy.tr`,
                username: `musteri${i}`,
                fullName: `Alışveriş Tutkunu ${i}`,
                role: 'shopper',
                password: 'password123',
                phoneNumber: `555200000${i}`, // 555 200 00 01 to 08
                isVerified: true,
                avatarUrl: `https://picsum.photos/seed/shopper${i}/200/200`
            }
        });
        shoppers.push(shopper);
    }
    console.log('✅ 8 Müşteri (Shopper) yaratıldı.');

    // 6. CREATE 8 COLLECTIONS (assigned to the 8 creators)
    const collections = [];
    for (let i = 0; i < 8; i++) {
        const collection = await prisma.collection.create({
            data: {
                userId: creators[i].id,
                title: `${creators[i].fullName} Favorileri`,
                slug: `favoriler-${i + 1}`,
                description: 'Bu koleksiyon benim en çok kullandığım ürünleri içeriyor.',
                isPublic: true,
            }
        });
        collections.push(collection);

        // Add 1 product to each collection to make them visual
        await prisma.collectionItem.create({
            data: {
                collectionId: collection.id,
                productId: products[i].id, // Assign the i-th product to i-th collection
                isVisible: true
            }
        });
    }
    console.log('✅ 8 Koleksiyon yaratıldı ve içlerine ürün atandı.');

    // 7. CREATE 8 CIRCLES (Communities)
    for (let i = 0; i < 8; i++) {
        await prisma.circle.create({
            data: {
                name: `Güzellik Sırları ${i + 1}`,
                slug: `guzellik-sirlari-${i + 1}`,
                description: 'Cilt bakımı ve makyaj önerileri topluluğu.',
                creatorId: creators[i].id,
                isVerified: true,
                status: 'approved',
                coverImageUrl: `https://picsum.photos/seed/circle${i}/800/400`
            }
        });
    }
    console.log('✅ 8 Topluluk (Circle) yaratıldı.');

    // 8. CREATE 8 MAGAZINES (Flipbooks)
    for (let i = 0; i < 8; i++) {
        const mag = await prisma.magazine.create({
            data: {
                userId: creators[i].id,
                title: `Vogue Esintisi Sayı ${i + 1}`,
                description: 'En trend kış kombinleri',
                isPublic: true,
                coverImageUrl: `https://picsum.photos/seed/mag${i}/600/800`
            }
        });

        // Add 2 pages to each magazine (Cover + Product)
        await prisma.magazinePage.createMany({
            data: [
                {
                    magazineId: mag.id,
                    pageType: 'cover',
                    imageUrl: `https://picsum.photos/seed/mag${i}/600/800`,
                    displayOrder: 0
                },
                {
                    magazineId: mag.id,
                    pageType: 'product',
                    productId: products[i].id,
                    displayOrder: 1
                }
            ]
        });
    }
    console.log('✅ 8 Dergi (Magazine) yaratıldı.');

    console.log('🎉 TÜM SEED İŞLEMLERİ BAŞARIYLA TAMAMLANDI! (8x8x8 Sistem)');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

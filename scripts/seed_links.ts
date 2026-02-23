
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Get ALL users
    const users = await prisma.user.findMany();

    if (users.length === 0) {
        console.log('No users found to seed links for.');
        return;
    }

    console.log(`Seeding links for ${users.length} users...`);

    // 2. Create Brands (ensure they exist)
    const brandsData = [
        { name: 'Sephora', slug: 'sephora', commissionRate: 14.0 },
        { name: 'Mytheresa', slug: 'mytheresa', commissionRate: 12.0 },
        { name: 'SSENSE', slug: 'ssense', commissionRate: 17.0 },
        { name: 'Nanushka', slug: 'nanushka', commissionRate: 15.0 },
        { name: 'Sahira Jewelry Design', slug: 'sahira-jewelry', commissionRate: 20.0 },
        { name: 'Wolf & Badger', slug: 'wolf-badger', commissionRate: 15.0 },
        { name: '1stDibs', slug: '1stdibs', commissionRate: 8.0 },
        { name: 'Hourglass Cosmetics', slug: 'hourglass', commissionRate: 15.0 },
        { name: 'Liberty London', slug: 'liberty-london', commissionRate: 8.0 },
        { name: 'Madewell', slug: 'madewell', commissionRate: 12.0 },
        { name: 'Saks Fifth Avenue', slug: 'saks', commissionRate: 12.0 },
    ];

    for (const b of brandsData) {
        await prisma.brand.upsert({
            where: { slug: b.slug },
            update: {},
            create: {
                name: b.name,
                slug: b.slug,
                commissionRate: b.commissionRate,
                websiteUrl: `https://www.${b.slug}.com`
            }
        });
    }

    const productsData = [
        { title: 'CHLOÉ | Eau de Parfum', brandSlug: 'sephora', price: 2500, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300' },
        { title: 'LA CANADIENNE | Kadın Eloise Shearling Bot', brandSlug: 'saks', price: 9500, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300' },
        { title: 'BRIXTON | Cohen Kovboy Şapkası', brandSlug: 'madewell', price: 1200, image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=300' },
        { title: 'SAKS POTTS | Foxy Shearling Trençkot', brandSlug: 'ssense', price: 25000, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300' },
        { title: 'RIXO | Milly Uzun kollu ceket', brandSlug: 'mytheresa', price: 4500, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300' },
        { title: 'LA BOUCHE ROUGE PARIS | Ruj', brandSlug: 'liberty-london', price: 1800, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300' },
        { title: 'KUM SAATI | İtiraf Ruj Kırmızı 0', brandSlug: 'hourglass', price: 1500, image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=300' },
        { title: '1STDIBS | 1990\'lar Tiffany Altın Kare Bileklik', brandSlug: '1stdibs', price: 45000, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300' },
        { title: 'TIFFANY & CO. | Paloma Büyük Dövülmüş Manşet', brandSlug: '1stdibs', price: 38000, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300' },
        { title: 'SOPHIE BUHAI | Gündelik İnci Küpeler', brandSlug: 'ssense', price: 6500, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300' },
        { title: 'SAHIRA TAKI TASARIMI | Diana İnci Kolye', brandSlug: 'sahira-jewelry', price: 3200, image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=300' },
        { title: 'MAGDA BUTRYM | Beyaz İnci Kolye', brandSlug: 'ssense', price: 9000, image: 'https://images.unsplash.com/photo-1602751584552-8ba731f0e535?w=300' }
    ];

    for (const user of users) {
        console.log(`Seeding for: ${user.username} (${user.id})`);

        // 3. Create "Genel" Collection if not exists
        let collection = await prisma.collection.findFirst({
            where: { userId: user.id, title: 'Genel' }
        });

        if (!collection) {
            collection = await prisma.collection.create({
                data: {
                    userId: user.id,
                    title: 'Genel',
                    slug: `genel-${user.username}-${Date.now()}`
                }
            });
        }

        // Check if links already exist to avoid duplicates
        const count = await prisma.collectionItem.count({ where: { collectionId: collection.id } });
        if (count > 0) {
            console.log(`Skipping ${user.username}, already has ${count} links.`);
            continue;
        }

        // 4. Create Products & Collection Items (Links)
        for (const p of productsData) {
            const brand = await prisma.brand.findUnique({ where: { slug: p.brandSlug } });
            if (!brand) continue;

            // Create Product (or reuse, but simpler to create new for now to avoid complexity)
            const product = await prisma.product.create({
                data: {
                    title: p.title,
                    price: p.price,
                    imageUrl: p.image,
                    productUrl: `https://www.${p.brandSlug}.com/product/xyz`,
                    brandId: brand.id
                }
            });

            // Create Collection Item (Link)
            await prisma.collectionItem.create({
                data: {
                    collectionId: collection.id,
                    productId: product.id,
                    curatorComment: "Harika bir ürün!",
                    isVisible: true,
                    clickCount: Math.floor(Math.random() * 50) // Random clicks
                }
            });
        }
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

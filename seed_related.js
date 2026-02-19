const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const product = await prisma.product.findFirst({
        where: { title: 'Lüks Deri Çanta' },
        include: { collectionItems: true }
    });

    if (!product) {
        console.log('Product "Lüks Deri Çanta" not found');
        return;
    }

    if (product.collectionItems.length === 0) {
        console.log('Product found but not in any collection');
        return;
    }

    const collectionId = product.collectionItems[0].collectionId;
    console.log('Using Collection ID:', collectionId);

    const relatedProducts = [
        {
            title: 'Deri Cüzdan',
            price: 750,
            currency: 'TRY',
            imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400',
            url: 'https://example.com/wallet',
            brand: 'Gucci'
        },
        {
            title: 'Güneş Gözlüğü',
            price: 3200,
            currency: 'TRY',
            imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400',
            url: 'https://example.com/sunglasses',
            brand: 'Ray-Ban'
        },
        {
            title: 'İpek Eşarp',
            price: 1850,
            currency: 'TRY',
            imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400',
            url: 'https://example.com/scarf',
            brand: 'Hermes'
        }
    ];

    for (const p of relatedProducts) {
        // Find or create brand
        const slug = p.brand.toLowerCase().replace(/\s+/g, '-');

        const newProduct = await prisma.product.create({
            data: {
                title: p.title,
                price: parseFloat(p.price),
                currency: p.currency,
                productUrl: p.url,
                imageUrl: p.imageUrl,
                brand: {
                    connectOrCreate: {
                        where: { slug },
                        create: { name: p.brand, slug }
                    }
                }
            }
        });

        await prisma.collectionItem.create({
            data: {
                collectionId: collectionId,
                productId: newProduct.id,
                curatorComment: `${p.title} benim vazgeçilmezim!`
            }
        });
        console.log(`Added related product: ${p.title}`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());

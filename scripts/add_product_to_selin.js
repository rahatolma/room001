const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { fullName: { contains: 'Selin' } },
                { username: { contains: 'selin' } }
            ]
        }
    });

    if (!user) {
        console.log('User Selin not found');
        return;
    }

    console.log(`Adding product to ${user.username} (${user.id})`);

    // Creates a collection if one doesn't exist
    let collection = await prisma.collection.findFirst({
        where: { userId: user.id }
    });

    if (!collection) {
        collection = await prisma.collection.create({
            data: {
                userId: user.id,
                title: 'Favorilerim',
                layoutType: 'grid'
            }
        });
        console.log('Created collection');
    }

    // Create a product
    const product = await prisma.product.create({
        data: {
            title: 'Test Ruj',
            price: 500.00,
            imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300',
            productUrl: 'https://trendyol.com/test',
            brand: {
                connectOrCreate: {
                    where: { slug: 'mac' },
                    create: { name: 'MAC', slug: 'mac' }
                }
            },
            category: 'MAKEUP'
        }
    });

    // Add to collection
    await prisma.collectionItem.create({
        data: {
            collectionId: collection.id,
            productId: product.id,
            displayOrder: 0
        }
    });

    console.log(`Product added to collection: ${product.title}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

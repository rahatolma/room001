const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing database for fresh testing...');

    // Reverse order of dependencies
    await prisma.magazinePage.deleteMany();
    await prisma.magazine.deleteMany();
    await prisma.collectionItem.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.product.deleteMany();
    await prisma.circleMember.deleteMany();
    await prisma.circle.deleteMany();
    await prisma.campaign.deleteMany();
    await prisma.socialAccount.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.user.deleteMany();

    console.log('Database wiped successfully! ✅');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

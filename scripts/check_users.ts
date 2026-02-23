
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        include: {
            _count: {
                select: {
                    collections: true,
                    // collectionItems is not directly on user, it's via collections usually, 
                    // but let's check collections count first.
                }
            }
        }
    });

    console.log('--- USERS ---');
    for (const u of users) {
        // Count items across all collections
        const collections = await prisma.collection.findMany({
            where: { userId: u.id },
            include: { _count: { select: { items: true } } }
        });
        const totalLinks = collections.reduce((acc, c) => acc + c._count.items, 0);

        console.log(`User: ${u.username} (${u.email}) | ID: ${u.id}`);
        console.log(`  Collections: ${u._count.collections}`);
        console.log(`  Total Links: ${totalLinks}`);
        console.log('----------------');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

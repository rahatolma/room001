
import { PrismaClient } from '@prisma/client';
import { addProductToCollection } from '../src/actions/catalog';

// Mock the session for the action (we might need to bypass the action's auth check or mock it)
// Since we can't easily mock the server action's internal getSessionAction from outside, 
// we will verify the database logic directly or try to invoke the action if possible.
// Actually, calling server actions from a script might fail due to 'use server' context.
// Let's just reproduce the logic or testing the DB write directly is safer.

// BETTER APPROACH:
// We will use Prisma directly to emulate what the action does, to ensure the SCHEMA supports it.
// And we will try to invoke the function if we can mock the context, but let's stick to schema verification first.

const prisma = new PrismaClient();

async function main() {
    console.log('Verifying Product Customization persistence...');

    // 1. Get a user and collection
    const user = await prisma.user.findFirst({ where: { email: 'insider@shopmy.tr' } });
    if (!user) throw new Error('User not found');

    const collection = await prisma.collection.findFirst({ where: { userId: user.id } });
    if (!collection) throw new Error('Collection not found');

    // 2. Get a product
    const product = await prisma.product.findFirst();
    if (!product) throw new Error('Product not found');

    console.log(`Testing with User: ${user.email}, Collection: ${collection.title}, Product: ${product.title}`);

    // 3. Define custom details
    const customDetails = {
        title: 'CUSTOM TITLE TEST',
        description: 'CUSTOM DESCRIPTION TEST',
        imageUrl: 'https://example.com/custom-image.jpg'
    };

    // 4. Simulate the add operation (Direct DB write to bypass auth for script)
    // This confirms the Schema accepts these fields.
    const item = await prisma.collectionItem.create({
        data: {
            collectionId: collection.id,
            productId: product.id,
            customTitle: customDetails.title,
            curatorComment: customDetails.description,
            customImageUrl: customDetails.imageUrl,
            displayOrder: 100
        }
    });

    console.log('Created CollectionItem:', item);

    // 5. Verify
    if (item.customTitle === customDetails.title &&
        item.curatorComment === customDetails.description &&
        item.customImageUrl === customDetails.imageUrl) {
        console.log('✅ SUCCESS: Custom details saved correctly to database.');
    } else {
        console.error('❌ FAILED: Custom details mismatch.');
    }

    // Cleanup
    await prisma.collectionItem.delete({ where: { id: item.id } });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

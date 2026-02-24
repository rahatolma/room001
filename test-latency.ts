import { PrismaClient } from '@prisma/client';
import { performance } from 'perf_hooks';

const prisma = new PrismaClient();

async function test() {
    console.log("Starting latency test for specific queries...");

    // 1. Simulate getCuratorData query
    console.log("Testing user.findUnique (nested joins)...");
    let start = performance.now();
    const user = await prisma.user.findFirst({
        relationLoadStrategy: "join",
        include: {
            collections: {
                orderBy: { createdAt: "desc" },
                include: {
                    items: {
                        include: {
                            product: {
                                include: { brand: true }
                            }
                        }
                    }
                }
            },
            socialAccounts: true
        }
    });
    let end = performance.now();
    console.log(`user.findFirst with deep nesting took ${end - start} ms`, `Found: ${user?.username}`);

    // Fetch all users to see if N+1 or big array is the issue
    start = performance.now();
    const allUsers = await prisma.user.findMany({ select: { id: true, username: true, fullName: true } });
    end = performance.now();
    console.log(`user.findMany (fallback logic length: ${allUsers.length}) took ${end - start} ms`);

    // 2. Simulate Circle query
    start = performance.now();
    const circle = await prisma.circle.findFirst({
        include: { members: { include: { user: true } } }
    });
    end = performance.now();
    console.log(`circle.findFirst took ${end - start} ms`);

    // 3. Simulate Product query
    const product = await prisma.product.findFirst();
    if (product) {
        start = performance.now();
        await prisma.product.findUnique({
            where: { id: product.id },
            include: { brand: true, collectionItems: { include: { collection: { include: { user: true } } }, take: 1 } }
        });
        end = performance.now();
        console.log(`product.findUnique took ${end - start} ms`);
    }

    process.exit(0);
}

test();

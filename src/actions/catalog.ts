'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

export async function searchCatalog(query: string) {
    try {
        const session = await getSessionAction();
        if (!session) return { success: false, error: 'Unauthorized' };

        console.log("searchCatalog received query:", query);
        const lowerQuery = query.toLowerCase();

        // Workaround for SQLite case sensitivity: Fetch and filter in-memory for now
        // In PostgreSQL this would just use { contains: query, mode: 'insensitive' }

        const allBrands = await prisma.brand.findMany();
        const brands = allBrands.filter(b => b.name.toLowerCase().includes(lowerQuery)).slice(0, 10);

        const allProducts = await prisma.product.findMany({ include: { brand: true } });
        const products = allProducts.filter(p =>
            p.title.toLowerCase().includes(lowerQuery) ||
            (p.description && p.description.toLowerCase().includes(lowerQuery))
        ).slice(0, 20);

        console.log(`searchCatalog found ${brands.length} brands and ${products.length} products`);
        return { success: true, brands, products };
    } catch (error) {
        console.error("Catalog Search Error:", error);
        return { success: false, error: 'Search failed' };
    }
}

export async function getBrandProducts(brandId: string) {
    try {
        let whereClause: any = { brandId: brandId };

        // Handle static frontend mock IDs ('1', '2', etc.) by resolving to their real database brand names
        const PARTNER_NAMES: Record<string, string> = {
            '1': 'MYTHERESA', '2': 'SSENSE', '3': '1STDIBS', '4': 'LIBERTY.', '5': 'HOURGLASS', '6': 'Madewell', '7': 'olga berg', '8': 'BOLL & BRANCH'
        };

        if (PARTNER_NAMES[brandId]) {
            whereClause = { brand: { name: { equals: PARTNER_NAMES[brandId] } } };
        } else if (brandId && !brandId.includes('-')) {
            whereClause = { brand: { name: { equals: brandId } } };
        }

        const products = await prisma.product.findMany({
            where: whereClause,
            include: { brand: true },
            take: 50 // Limit for now
        });

        if (products.length === 0) {
            let brandNameStr = PARTNER_NAMES[brandId] || brandId;
            const mockProducts = Array.from({ length: 8 }).map((_, i) => {
                const dummyTitles = ['Ympossible Cream', 'Discovery Duo', `Women's Yoella Tunic In Teyros Scarf Black`, 'Small Sicily Ostrich Leather Bag', 'Yoel Distressed Suede Jacket', 'Silver Metallic Boot'];
                const dummyMerchants = ['Yoé', 'Level Shoes Global', 'JOHNNY WAS', 'Saks Fifth Avenue', 'DSW'];
                const title = dummyTitles[i % dummyTitles.length];
                const merchant = dummyMerchants[i % dummyMerchants.length];
                const comm = Math.floor(Math.random() * 10) + 10;

                return {
                    id: `mock-${brandId}-${i}`,
                    title: title,
                    price: Math.floor(Math.random() * 500) + 50,
                    currency: 'TRY',
                    imageUrl: `https://picsum.photos/seed/${brandNameStr.replace(/\s+/g, '')}${i}/400/400`,
                    productUrl: '#',
                    brand: {
                        name: merchant,
                        commissionRate: `${comm}`
                    }
                };
            });
            return { success: true, products: mockProducts };
        }
        return { success: true, products };
    } catch (error) {
        console.error("Error fetching brand products:", error);
        return { success: false, error: "Failed to fetch products" };
    }
}

export async function addProductToCollection(
    collectionId: string,
    productId: string,
    customDetails?: {
        title?: string;
        description?: string;
        imageUrl?: string;
    }
) {
    const session = await getSessionAction();
    if (!session) return { success: false, error: "Unauthorized" };

    try {
        // Check if item exists to avoid duplicates (optional, but good UX)
        const existing = await prisma.collectionItem.findFirst({
            where: { collectionId, productId }
        });

        if (existing) return { success: false, error: "Product already in collection" };

        // Find max display order
        const maxOrder = await prisma.collectionItem.findFirst({
            where: { collectionId },
            orderBy: { displayOrder: 'desc' }
        });
        const newOrder = (maxOrder?.displayOrder ?? -1) + 1;

        await prisma.collectionItem.create({
            data: {
                collectionId,
                productId,
                displayOrder: newOrder,
                // Map custom details
                customTitle: customDetails?.title,
                curatorComment: customDetails?.description,
                customImageUrl: customDetails?.imageUrl
            }
        });

        revalidatePath('/[creator_slug]');
        return { success: true };
    } catch (error) {
        console.error("Error adding product to collection:", error);
        return { success: false, error: "Failed to add product" };
    }
}

export async function createProductFromUrl(url: string) {
    try {
        const session = await getSessionAction();
        if (!session) return { success: false, error: 'Unauthorized' };

        // 1. Check if product already exists (by URL)
        const existing = await prisma.product.findFirst({
            where: { productUrl: url }
        });
        if (existing) return { success: true, product: existing };

        // 2. Scrape metadata (Mock for now)
        // In a real app, use cheerio/puppeteer here.
        const mockProduct = {
            title: 'Mock Product from URL',
            description: 'Automatically imported from ' + url,
            price: 99.99,
            currency: 'TRY',
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
            productUrl: url,
            brandId: null // or try to detect brand from URL
        };

        const newProduct = await prisma.product.create({
            data: mockProduct
        });

        return { success: true, product: newProduct };

    } catch (error) {
        console.error("URL Import Error:", error);
        return { success: false, error: 'Failed to import product' };
    }
}

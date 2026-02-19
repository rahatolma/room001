'use server';

import prisma from '@/lib/prisma';

export type SearchResultType = 'curator' | 'product' | 'brand' | 'collection';

export interface SearchResult {
    id: string;
    type: SearchResultType;
    title: string;
    subtitle?: string;
    image?: string;
    slug: string;
    url: string;
}

export async function searchGlobal(query: string, limit: number = 5): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();

    try {
        // 1. Search Curators (Users)
        const curators = await prisma.user.findMany({
            where: {
                role: 'creator',
                OR: [
                    { fullName: { contains: query } },
                    { username: { contains: query } },
                    { bio: { contains: query } }
                ]
            },
            take: limit
        });

        // 2. Search Products
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { brand: { name: { contains: query } } }
                ]
            },
            include: { brand: true },
            take: limit
        });

        // 3. Search Brands
        const brands = await prisma.brand.findMany({
            where: {
                name: { contains: query }
            },
            take: limit
        });

        // Combine and map results
        const results: SearchResult[] = [];

        curators.forEach((c: any) => results.push({
            id: c.id,
            type: 'curator',
            title: c.fullName || c.username || 'Unknown',
            subtitle: c.niche || 'Küratör',
            image: c.avatarUrl || `https://ui-avatars.com/api/?name=${c.fullName}&background=random`,
            slug: c.username || '',
            url: `/${c.username}`
        }));

        products.forEach((p: any) => results.push({
            id: p.id,
            type: 'product',
            title: p.title,
            subtitle: p.brand?.name,
            image: p.imageUrl || '',
            slug: p.id,
            url: p.productUrl // External link for now
        }));

        brands.forEach((b: any) => results.push({
            id: b.id,
            type: 'brand',
            title: b.name,
            subtitle: 'Marka',
            image: b.logoUrl || undefined,
            slug: b.slug,
            url: `/brands/${b.slug}`
        }));

        return results;

    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

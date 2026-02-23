import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || 'Ruj';
    const lowerQuery = q.toLowerCase();

    const allProducts = await prisma.product.findMany({ include: { brand: true } });
    const products = allProducts.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        (p.description && p.description.toLowerCase().includes(lowerQuery))
    ).slice(0, 20);

    return NextResponse.json({ test: true, products, count: products.length });
}

import React from 'react';
import ProductGrid from '@/components/landing/ProductGrid';
import { Heart } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getSessionAction } from '@/actions/auth';

export default async function FavoritesPage() {
    const user = await getSessionAction();

    // Fetch real favorites from DB pointing to specific products
    const favs = user
        ? await prisma.favorite.findMany({
            where: { userId: user.id },
            include: { product: { include: { brand: true } } },
            orderBy: { createdAt: 'desc' }
        })
        : [];

    const favoriteProducts = favs.map(f => ({
        id: f.product.id,
        title: f.product.title,
        brand: f.product.brand?.name || 'Marka Yok',
        price: f.product.price ? f.product.price.toString() : '0',
        imageUrl: f.product.imageUrl || '',
        url: f.product.productUrl,
        currency: f.product.currency
    }));

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 40, borderBottom: '1px solid #eaeaea', paddingBottom: 20 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Heart size={28} color="black" fill="black" /> Favorilerim
                </h1>
                <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
                    Kaydettiğiniz tüm ürünler ve içerikler burada listelenir.
                </p>
            </div>

            {favoriteProducts && favoriteProducts.length > 0 ? (
                <div style={{ padding: '20px 0' }}>
                    <ProductGrid items={favoriteProducts} />
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '100px 20px', background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)', borderRadius: 24, border: '1px dashed #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                        <Heart size={36} color="#aaa" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.02em', color: '#111' }}>Henüz Favoriniz Yok</h2>
                    <p style={{ color: '#666', marginBottom: 36, fontSize: '1.1rem', maxWidth: 400 }}>İlginizi çeken ürünleri kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.</p>
                    <a href="/creators" style={{ padding: '14px 28px', background: 'linear-gradient(90deg, #111 0%, #333 100%)', color: 'white', borderRadius: 100, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        Vitrinleri Keşfet
                    </a>
                </div>
            )}
        </div>
    );
}


import React from 'react';
import { getUserFavorites } from '@/actions/favorite';
import ProductGrid from '@/components/landing/ProductGrid';
import { Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
    const favorites = await getUserFavorites();

    return (
        <div>
            <div style={{ marginBottom: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 5, display: 'flex', alignItems: 'center' }}>
                        <Heart size={28} style={{ marginRight: 12, fill: '#ff4444', color: '#ff4444' }} />
                        Favorilerim
                    </h1>
                    <p style={{ color: '#666' }}>Beğendiğiniz ürünleri burada bulabilirsiniz.</p>
                </div>
            </div>

            {favorites.length > 0 ? (
                <ProductGrid items={favorites} showHeader={false} />
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: '#f9f9f9',
                    borderRadius: 12,
                    border: '1px dashed #ddd'
                }}>
                    <Heart size={48} style={{ margin: '0 auto 20px', color: '#ccc' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 10 }}>Henüz favori ürününüz yok</h3>
                    <p style={{ color: '#666', marginBottom: 20 }}>
                        Ürünleri incelerken kalp ikonuna tıklayarak buraya ekleyebilirsiniz.
                    </p>
                    <a href="/" style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        background: '#000',
                        color: '#fff',
                        borderRadius: 8,
                        textDecoration: 'none',
                        fontWeight: 500
                    }}>
                        Ürünleri Keşfet
                    </a>
                </div>
            )}
        </div>
    );
}

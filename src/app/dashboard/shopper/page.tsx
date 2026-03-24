import React from 'react';
import { getLatestProducts } from '@/actions/product';
import ProductGrid from '@/components/landing/ProductGrid';
import { Heart, ShoppingBag, Compass, ArrowRight } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getSessionAction } from '@/actions/auth';
import Link from 'next/link';
import Image from 'next/image';

export default async function ShopperDashboardPage() {
    const user = await getSessionAction();
    const latestProducts = await getLatestProducts();

    // Fetch real metrics from DB
    const favCount = user ? await prisma.favorite.count({ where: { userId: user.id } }) : 0;
    const orderCount = user ? await prisma.transaction.count({ where: { userId: user.id } }) : 0;
    const activeCreatorsCount = await prisma.user.count({ where: { role: 'creator' } });

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 60 }}>
            {/* Header / Welcome Area */}
            <div style={{ marginBottom: 40, borderBottom: '1px solid #eaeaea', paddingBottom: 20 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.03em', color: '#111' }}>
                    Akışım
                </h1>
                <p style={{ color: '#666', fontSize: '1.2rem', margin: 0, fontWeight: 400 }}>
                    Sizin için seçilen en yeni ürünler ve popüler vitrinleri keşfedin.
                </p>
            </div>

            {/* Quick Actions / Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 60 }}>

                {/* Favorites Card */}
                <Link href="/dashboard/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fcfcfc 100%)', padding: 30, borderRadius: 24, border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.2s, box-shadow 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff0f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4b72' }}>
                            <Heart size={28} fill="currentColor" />
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>{favCount}</div>
                            <div style={{ color: '#666', fontSize: '1rem', fontWeight: 500 }}>Favori Ürün</div>
                        </div>
                    </div>
                </Link>

                {/* Orders Card */}
                <Link href="/dashboard/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fcfcfc 100%)', padding: 30, borderRadius: 24, border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.2s, box-shadow 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
                            <ShoppingBag size={28} />
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>{orderCount}</div>
                            <div style={{ color: '#666', fontSize: '1rem', fontWeight: 500 }}>Sipariş Geçmişi</div>
                        </div>
                    </div>
                </Link>

                {/* Creators Hub Card */}
                <Link href="/creators" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'linear-gradient(135deg, #111 0%, #222 100%)', padding: 30, borderRadius: 24, border: '1px solid #333', display: 'flex', alignItems: 'center', gap: 24, color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', transition: 'transform 0.2s, box-shadow 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(10px)' }}>
                            <Compass size={28} />
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>{activeCreatorsCount}+</div>
                            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontWeight: 500 }}>Aktif İçerik Üretici</div>
                        </div>
                    </div>
                </Link>

            </div>

            {/* Content Feed */}
            <div style={{ marginBottom: 60 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>Sizin İçin Seçtiklerimiz</h2>
                        <div style={{ color: '#666' }}>Günlük olarak yenilenen popüler ürün seçkisi.</div>
                    </div>
                    <Link href="/products" style={{ color: '#111', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, paddingBottom: 4 }}>Tümünü Keşfet <ArrowRight size={16} /></Link>
                </div>

                <div style={{ overflowX: 'auto', paddingBottom: 20, margin: '0 -20px', padding: '0 20px' }}>
                    <ProductGrid items={latestProducts.slice(0, 10)} />
                </div>
            </div>

            {/* Inspiration CTA Wrapper */}
            <div style={{ position: 'relative', borderRadius: 32, overflow: 'hidden', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center', color: 'white' }}>
                {/* Background Image - Using a generic Unsplash fashion/lifestyle URL */}
                <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80" alt="Inspiration" fill style={{ objectFit: 'cover', zIndex: 0 }} />

                {/* Overlay Component */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)', zIndex: 1 }}></div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>İlham Verenleri Keşfet</h3>
                    <p style={{ margin: '0 auto 30px auto', fontSize: '1.2rem', lineHeight: 1.5, opacity: 0.9, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                        Ana sayfanızı tamamen kişiselleştirmek için favori içerik üreticilerinize göz atın ve onların yeni koleksiyonlarından anında haberdar olun.
                    </p>
                    <Link href="/creators" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', background: 'white', color: 'black', borderRadius: 100, textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem', transition: 'transform 0.2s', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} className="hover:scale-105">
                        Vitrinleri Keşfet
                    </Link>
                </div>
            </div>

        </div>
    );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPublicCollection } from '@/actions/public';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';

import ShareCollectionButton from '@/components/ShareCollectionButton';

export default async function PublicCollectionPage({ params }: { params: { creator_slug: string, collectionId: string } }) {
    const collection = await getPublicCollection(params.creator_slug, params.collectionId);

    if (!collection) {
        notFound();
    }

    const { user, items } = collection as any;

    return (
        <div style={{ minHeight: '100vh', background: '#fafafa', paddingBottom: 100 }}>
            {/* Minimalist Header */}
            <header style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', borderBottom: '1px solid #eaeaea' }}>
                <Link href={`/${params.creator_slug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#111', fontWeight: 600 }}>
                    <ArrowLeft size={18} />
                    {user.fullName || user.username} Vitrinine Dön
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <ShareCollectionButton path={`/${params.creator_slug}/c/${params.collectionId}`} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: '1px solid #eaeaea' }}>
                            {user.avatarUrl ? (
                                <Image src={user.avatarUrl} alt="Avatar" fill style={{ objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {(user.fullName || user.username).substring(0, 1).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>@{user.username}</span>
                    </div>
                </div>
            </header>

            {/* Collection Hero */}
            <div style={{ maxWidth: 1200, margin: '60px auto 40px', padding: '0 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '0 0 15px 0', letterSpacing: '-0.03em', fontFamily: 'serif' }}>
                    {collection.title}
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                    Seçilmiş favorilerim ve en çok önerdiklerim. Alışverişe doğrudan ürünlere tıklayarak başlayabilirsiniz.
                </p>
                <div style={{ marginTop: 20, fontSize: '0.85rem', color: '#999', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                    {items.length} Ürün
                </div>
            </div>

            {/* Product Masonry/Grid */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 30 }}>
                    {items.map((item: any) => {
                        const product = item.product;
                        return (
                            <a
                                key={item.id}
                                href={product.productUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                            >
                                <div style={{ border: '1px solid #eaeaea', borderRadius: 24, overflow: 'hidden', background: 'white', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
                                    onMouseOver={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseOut={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                                    }}
                                >

                                    {/* Image Container (Aspect Ratio 4:5 for fashion/lifestyle feel) */}
                                    <div style={{ position: 'relative', width: '100%', paddingTop: '125%', background: '#f5f5f5' }}>
                                        {product.imageUrl ? (
                                            <Image src={product.imageUrl} alt={product.title} fill style={{ objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>Görsel Yok</div>
                                        )}

                                        {/* Shop Now Overlay Button */}
                                        <div style={{ position: 'absolute', bottom: 15, right: 15, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                            <ExternalLink size={18} />
                                        </div>
                                    </div>

                                    {/* Product Meta */}
                                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            {product.brand && (
                                                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#666', marginBottom: 6 }}>
                                                    {product.brand.name}
                                                </div>
                                            )}
                                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {product.title}
                                            </h3>
                                        </div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111', marginTop: 10 }}>
                                            {product.price ? `${product.price} TL` : ''}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {items.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 100, color: '#999', fontSize: '1.1rem' }}>
                        Bu koleksiyonda henüz ürün bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import ImageFallback from '@/components/ImageFallback';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    brand: string;
    price: string;
    imageUrl: string;
    url: string;
    currency?: string;
}

export default function ProductGrid({ items, showHeader = true }: { items: Product[], showHeader?: boolean }) {
    if (!items || items.length === 0) return null;

    return (
        <div style={{ width: '100%' }}>
            {/* Header Section */}
            {showHeader && (
                <div style={{ padding: '0 0', margin: '0 0 40px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 0 }}>Keşfet</h2>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginTop: 5, lineHeight: 1 }}>En Yeniler</h1>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: 20 }}>Küratörlerimizin keşfettiği en son ürünleri incele.</p>
                        <Link href="/products">
                            <button style={{ background: 'black', color: 'white', padding: '12px 24px', fontSize: '0.7rem', letterSpacing: '1px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>TÜM ÜRÜNLERİ GÖR</button>
                        </Link>
                    </div>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0
            }}>
                {items.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRight: '1px solid white',
                        borderBottom: '1px solid white',
                        display: 'block'
                    }}>
                        <ImageFallback
                            src={product.imageUrl || 'https://via.placeholder.com/300'}
                            alt={product.title}
                            fill
                            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        />
                        {/* Overlay Gradient */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                            pointerEvents: 'none'
                        }} />

                        {/* Top Right Brand Badge */}
                        <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, zIndex: 10 }}>
                            {product.brand}
                        </div>

                        {/* Text Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 30,
                            left: 20,
                            right: 20,
                            textAlign: 'left',
                            color: 'white',
                            pointerEvents: 'none'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                lineHeight: 1.2,
                                marginBottom: 5,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {product.title}
                            </h3>
                            <div style={{ fontWeight: 600, fontSize: '1rem', color: '#eaeaea' }}>
                                {product.price} {product.currency || 'TL'}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

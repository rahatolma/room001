import React from 'react';
import Link from 'next/link';
import ImageFallback from '@/components/ImageFallback';

export default function CategoryGrid({ items }: { items?: any[] }) {
    if (!items) return null;

    return (
        <div style={{ width: '100%' }}>
            {/* Header */}
            <div style={{ padding: '0 0', margin: '0 0 40px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 0 }}>Keşfet</h2>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginTop: 5, lineHeight: 1 }}>Kategoriler</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: 20 }}>Her kategorinin en iyilerini güvenle alışveriş yap.</p>
                    <Link href="/categories">
                        <button style={{ background: 'black', color: 'white', padding: '12px 24px', fontSize: '0.7rem', letterSpacing: '1px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>TÜM KATEGORİLERİ GÖR</button>
                    </Link>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0
            }}>
                {items.map((cat, index) => (
                    <Link key={index} href={`/categories/${cat.slug || '#'}`} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRight: '1px solid white',
                        borderBottom: '1px solid white',
                        display: 'block'
                    }}>
                        <ImageFallback
                            src={cat.image}
                            alt={cat.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
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

                                fontSize: '1.8rem',
                                fontWeight: 700,
                                lineHeight: 1.1
                            }}>
                                {cat.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

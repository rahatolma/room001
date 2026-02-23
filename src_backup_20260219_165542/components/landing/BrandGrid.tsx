import React from 'react';
import Link from 'next/link';

export default function BrandGrid({ items }: { items?: any[] }) {
    if (!items) return null;

    return (
        <section style={{ width: '100%' }}>
            <div style={{ padding: '0 0', marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: 0 }}>Keşfet</h2>
                    <h1 style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '3.5rem', fontWeight: 800, marginTop: 5, lineHeight: 1 }}>Markalar</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: 20 }}>Bildiğin markaların en iyi ürünlerini keşfet ve seveceğin yeni markalarla tanış.</p>
                    <Link href="/brands">
                        <button style={{
                            background: 'black',
                            color: 'white',
                            padding: '12px 24px',
                            fontSize: '0.7rem',
                            letterSpacing: '1px',
                            border: 'none',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}>
                            TÜM MARKALARI GÖR
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0
            }}>
                {items.map((brand, index) => (
                    <Link key={index} href={`/brands/${brand.slug || '#'}`} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        borderRight: '1px solid white',
                        borderBottom: '1px solid white',
                        display: 'block'
                    }}>
                        <img
                            src={brand.image}
                            alt={brand.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                                fontFamily: 'var(--font-dm-sans)',
                                fontSize: '1.8rem',
                                fontWeight: 700,
                                lineHeight: 1.1
                            }}>
                                {brand.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

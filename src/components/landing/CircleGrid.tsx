import React from 'react';
import Link from 'next/link';
import ImageFallback from '@/components/ImageFallback';

export default function CircleGrid({ items }: { items?: any[] }) {
    if (!items) return null;

    return (
        <div style={{ width: '100%' }}>
            <div style={{ padding: '0 0', margin: '0 0 40px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 0 }}>Keşfet</h2>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginTop: 5, lineHeight: 1 }}>Topluluklar</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ maxWidth: 400, fontSize: '0.9rem', color: '#666', marginBottom: 20 }}>
                        Tarzını paylaşan küratör grupları oluştur ve onların en iyi önerilerini keşfet.
                    </p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <Link href="/circles/new">
                            <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid black', fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer' }}>Topluluk Başvurusu</button>
                        </Link>
                        <Link href="/circles">
                            <button style={{ padding: '10px 20px', background: 'black', color: 'white', border: '1px solid black', fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer' }}>Tüm Toplulukları Gör</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0 // Full bleed
            }}>
                {items.map((circle, index) => (
                    <Link key={index} href={`/circles/${circle.slug || '#'}`} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRight: '1px solid white',
                        borderBottom: '1px solid white',
                        display: 'block'
                    }}>
                        <ImageFallback
                            src={circle.image}
                            alt={circle.name}
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
                                {circle.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

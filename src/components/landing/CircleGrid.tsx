import React from 'react';
import Link from 'next/link';
import ImageFallback from '@/components/ImageFallback';

export default function CircleGrid({ items }: { items?: any[] }) {
    if (!items) return null;

    return (
        <div style={{ width: '100%' }}>
            <div className="landing-section-header">
                <div>
                    <h2>Keşfet</h2>
                    <h1>Topluluklar</h1>
                </div>
                <div className="landing-section-desc">
                    <p>
                        Tarzını paylaşan küratör grupları oluştur ve onların en iyi önerilerini keşfet.
                    </p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <Link href="/circles/new">
                            <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid black', fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>Topluluk Başvurusu</button>
                        </Link>
                        <Link href="/circles">
                            <button style={{ padding: '10px 20px', background: 'black', color: 'white', border: '1px solid black', fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>Tüm Toplulukları Gör</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="responsive-full-image-grid" style={{ minWidth: 0, gap: 0 }}>
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

import React from 'react';
import Link from 'next/link';
import ImageFallback from '@/components/ImageFallback';

export default function CuratorGrid({ hero, curators }: { hero?: any, curators?: any[] }) {
    // Fallback to empty array if no curators found
    const displayCurators = curators || [];

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            {/* Header Section - Only Show if Hero exists */}
            {hero && (
                <div className="landing-section-header">
                    <div>
                        <h2>{hero.title}</h2>
                        <h1>Insiderler</h1>
                    </div>

                    <div className="landing-section-desc">
                        <p>{hero.description}</p>
                        <Link href="/creators">
                            <button style={{
                                background: 'black',
                                color: 'white',
                                padding: '14px 28px',
                                fontSize: '0.75rem',
                                letterSpacing: '1px',
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                            }}>
                                {hero.cta}
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Full Width Grid */}
            <div className="responsive-grid-5" style={{ minWidth: 0, gap: 0 }}>
                {displayCurators.map((curator, index) => (
                    <Link
                        key={index}
                        href={`/${curator.handle || curator.slug || '#'}`}
                        style={{
                            position: 'relative',
                            aspectRatio: '3/4',
                            overflow: 'hidden',
                            borderRight: '1px solid white',
                            borderBottom: '1px solid white',
                            display: 'block'
                        }}
                    >
                        <ImageFallback
                            src={curator.image}
                            alt={curator.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.7s ease'
                            }}
                        />
                        {/* Overlay Gradient for better text readability */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                            pointerEvents: 'none'
                        }} />

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
                                {curator.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

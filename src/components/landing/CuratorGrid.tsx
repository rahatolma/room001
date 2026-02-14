import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CuratorGrid({ hero, curators }: { hero?: any, curators?: any[] }) {
    if (!hero) return null;

    // Fallback to empty array if no curators found
    const displayCurators = curators || [];

    return (
        <section style={{ width: '100%', position: 'relative' }}>
            {/* Header Section */}
            <div style={{
                padding: '40px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
            }}>
                <div>
                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontStyle: 'italic',
                        fontSize: '1.2rem',
                        marginBottom: 0
                    }}>
                        {hero.title}
                    </h2>
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '4rem',
                        fontWeight: 400,
                        lineHeight: 1,
                        marginTop: -5
                    }}>
                        {hero.subtitle}
                    </h1>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <Link href="/curators">
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

            {/* Full Width Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', // CHANGED: 3 to 4 columns
                gap: 0 // No gap for full bleed
            }}>
                {displayCurators.map((curator, index) => (
                    <Link key={curator.id} href={`/${curator.slug}`} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        borderRight: '1px solid white',
                        borderBottom: '1px solid white',
                        display: 'block'
                    }}>
                        <img
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
                            <span style={{
                                fontFamily: 'Playfair Display, serif',
                                fontStyle: 'italic',
                                fontSize: '0.9rem',
                                display: 'block',
                                marginBottom: 5,
                                opacity: 0.9
                            }}>
                                Curated by
                            </span>
                            <h3 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '2rem',
                                fontWeight: 400,
                                lineHeight: 1.1
                            }}>
                                {curator.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Description overlay or bottom bar */}
            <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'flex-end' }}>
                <p style={{ maxWidth: 400, fontSize: '0.9rem', color: '#666' }}>
                    {hero.description}
                </p>
            </div>
        </section>
    );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CuratorGrid({ hero, curators }: { hero?: any, curators?: any[] }) {
    // Fallback to empty array if no curators found
    const displayCurators = curators || [];

    return (
        <section style={{ width: '100%', position: 'relative' }}>
            {/* Header Section - Only Show if Hero exists */}
            {hero && (
                <div style={{
                    padding: '40px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                }}>
                    <div>
                        <h2 style={{
                            fontFamily: 'var(--font-dm-sans)',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            marginBottom: 0
                        }}>
                            {hero.title}
                        </h2>
                        <h1 style={{
                            fontFamily: 'var(--font-dm-sans)',
                            fontSize: '3.5rem', // Slightly smaller for DM Sans
                            fontWeight: 800,
                            lineHeight: 1,
                            marginTop: 5
                        }}>
                            {hero.subtitle}
                        </h1>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
                        <p style={{ maxWidth: 400, fontSize: '0.9rem', color: '#666', marginBottom: 0 }}>
                            {hero.description}
                        </p>
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
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns
                gap: 0 // No gap for full bleed
            }}>
                {displayCurators.map((curator, index) => (
                    <Link key={curator.id} href={curator.slug ? `/${curator.slug}` : '#'} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden', // Changed from hidden to auto if needed, but hidden is safer for card
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
                            <h3 style={{
                                fontFamily: 'var(--font-dm-sans)',
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
        </section >
    );
}

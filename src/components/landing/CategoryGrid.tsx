import React from 'react';

export default function CategoryGrid({ items }: { items?: any[] }) {
    if (!items) return null;

    return (
        <section style={{ width: '100%', paddingBottom: 100 }}>
            {/* Header */}
            <div style={{ padding: '0 40px', marginBottom: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.2rem', marginBottom: 0 }}>Shop by</h2>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', fontWeight: 400, marginTop: -5, lineHeight: 1 }}>Category</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: 20 }}>Confidently shop the best of every category.</p>
                    <button style={{ background: 'black', color: 'white', padding: '12px 24px', fontSize: '0.7rem', letterSpacing: '1px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>SHOP ALL CATEGORIES</button>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0
            }}>
                {items.map((cat, index) => (
                    <div key={index} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRight: '1px solid white',
                        borderBottom: '1px solid white'
                    }}>
                        <img
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
                            <span style={{
                                fontFamily: 'Playfair Display, serif',
                                fontStyle: 'italic',
                                fontSize: '0.9rem',
                                display: 'block',
                                marginBottom: 5,
                                opacity: 0.9
                            }}>
                                Category
                            </span>
                            <h3 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '2rem',
                                fontWeight: 400,
                                lineHeight: 1.1
                            }}>
                                {cat.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

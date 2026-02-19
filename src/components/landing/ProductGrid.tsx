'use client';

import React from 'react';
import Image from 'next/image';
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
        <section style={{ width: '100%' }}>
            {/* Header Section */}
            {showHeader && (
                <div style={{ padding: '0 0', marginBottom: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 0 }}>Keşfet</h2>
                        <h1 style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '3.5rem', fontWeight: 800, marginTop: 5, lineHeight: 1 }}>En Yeniler</h1>
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
                gap: 20
            }}>
                {items.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            background: 'white',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'default',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Image Container - Links to Internal Detail */}
                        <div style={{
                            position: 'relative',
                            aspectRatio: '1',
                            width: '100%',
                            background: '#f9f9f9',
                            cursor: 'pointer'
                        }}>
                            <Link href={`/products/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                                <Image
                                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                                    alt={product.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </Link>

                            {/* External Link Button - Links to Shop */}
                            <a
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    background: 'white',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    zIndex: 10,
                                    cursor: 'pointer',
                                    textDecoration: 'none'
                                }}
                                title="Mağazaya Git"
                            >
                                <ExternalLink size={16} color="#333" />
                            </a>

                            {/* Price Alert Button (Vision 3) */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const btn = e.currentTarget;
                                    const icon = btn.querySelector('svg');
                                    if (icon?.getAttribute('fill') === 'none') {
                                        icon.setAttribute('fill', '#eab308');
                                        icon.setAttribute('stroke', '#eab308');
                                        alert('Fiyat alarmı kuruldu! Ürün indirime girdiğinde bildirim alacaksınız.');
                                    } else {
                                        icon?.setAttribute('fill', 'none');
                                        icon?.setAttribute('stroke', '#888');
                                        alert('Fiyat alarmı kaldırıldı.');
                                    }
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    background: 'white',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    zIndex: 10,
                                    cursor: 'pointer',
                                    border: 'none',
                                    outline: 'none'
                                }}
                                title="Fiyat Alarmı Kur"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: 15 }}>
                            <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>
                                {product.brand}
                            </div>
                            <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3 style={{
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    marginBottom: 10,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    cursor: 'pointer'
                                }}>
                                    {product.title}
                                </h3>
                            </Link>
                            <div style={{ fontWeight: 600, fontSize: '1rem' }}>
                                {product.price} {product.currency || 'TL'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

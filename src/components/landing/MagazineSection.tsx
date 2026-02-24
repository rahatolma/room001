"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import ImageFallback from '@/components/ImageFallback';

const MOCK_MAGAZINES = [
    {
        id: 1,
        title: 'Urban Soul',
        issue: 'Eylül 2026',
        cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600',
        slug: 'urban-soul-september'
    },
    {
        id: 2,
        title: 'Minimalist',
        issue: 'Sonbahar Sayısı',
        cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600',
        slug: 'minimalist-autumn'
    },
    {
        id: 3,
        title: 'Luxe & Life',
        issue: 'Özel Koleksiyon',
        cover: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600',
        slug: 'luxe-life-collection'
    },
    {
        id: 4,
        title: 'Vogue Vibes',
        issue: 'Ağustos 2026',
        cover: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600',
        slug: 'vogue-vibes'
    },
    {
        id: 5,
        title: 'Street Style',
        issue: 'Kış Seçkisi',
        cover: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600',
        slug: 'street-style'
    },
    {
        id: 6,
        title: 'Avant Garde',
        issue: 'Sayı #4',
        cover: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600',
        slug: 'avant-garde'
    },
    {
        id: 7,
        title: 'The Edge',
        issue: 'İlkbahar 2026',
        cover: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=600',
        slug: 'the-edge'
    },
    {
        id: 8,
        title: 'Haute Couture',
        issue: 'Paris Moda Haftası',
        cover: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600',
        slug: 'haute-couture'
    }
];

export default function MagazineSection() {
    return (
        <div style={{ width: '100%' }}>
            <div className="landing-section-header">
                <div>
                    <h2>Keşfet</h2>
                    <h1>Dergiler <span className="badge-yeni">YENİ</span></h1>
                </div>
                <div className="landing-section-desc">
                    <p>Moda dünyasının nabzını tutan seçkin yayınları incele.</p>
                    <Link href="/magazines">
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
                            TÜM YAYINLARI GÖR
                        </button>
                    </Link>
                </div>
            </div>

            <div className="responsive-full-image-grid" style={{ minWidth: 0, gap: 0 }}>
                {MOCK_MAGAZINES.map((mag, index) => (
                    <Link key={index} href={`/magazine/${mag.slug || '#'}`} style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRight: '1px solid white',
                        borderBottom: '1px solid white',
                        display: 'block'
                    }}>
                        <ImageFallback
                            src={mag.cover}
                            alt={mag.title}
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

                        {/* Top Badge Overlay */}
                        <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, zIndex: 10 }}>
                            {mag.issue}
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
                                fontSize: '1.8rem',
                                fontWeight: 700,
                                lineHeight: 1.1
                            }}>
                                {mag.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

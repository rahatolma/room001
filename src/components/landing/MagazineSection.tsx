"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

const MOCK_MAGAZINES = [
    {
        id: 1,
        title: 'Urban Soul',
        issue: 'Eylül 2026',
        cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600', // Edgy magazine cover
        slug: 'urban-soul-september',
        description: 'Sokak modasının kalbi ve şehrin ritmi. Bu ay spor giyim ve sneaker kültürüne derinlemesine bir bakış.',
        theme: '#000'
    },
    {
        id: 2,
        title: 'Minimalist',
        issue: 'Sonbahar Sayısı',
        cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600', // Clean, minimal
        slug: 'minimalist-autumn',
        description: 'Az çoktur felsefesiyle sürdürülebilir moda ve kapsül gardırop önerileri.',
        theme: '#57534e'
    },
    {
        id: 3,
        title: 'Luxe & Life',
        issue: 'Özel Koleksiyon',
        cover: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600', // Luxury
        slug: 'luxe-life-collection',
        description: 'Lüksün yeni tanımı ve ulaşılabilir premium markalar. Yüksek moda sokağa iniyor.',
        theme: '#831843'
    }
];

export default function MagazineSection() {
    return (
        <section style={{ padding: '80px 0', background: '#fff' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40 }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 15 }}>
                            Dergiler <span style={{ fontSize: '1rem', fontWeight: 600, background: 'black', color: 'white', padding: '4px 12px', borderRadius: 20 }}>YENİ</span>
                        </h2>
                        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: 600 }}>
                            Moda dünyasının nabzını tutan niş yayınlar artık Room001'de. Sayfaları çevir, ilham al ve beğendiğin parçaları anında keşfet.
                        </p>
                    </div>
                    <Link href="/magazines" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'black', textDecoration: 'none' }}>
                        Tüm Yayınlar <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Magazine Shelf */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 40 }}>
                    {MOCK_MAGAZINES.map((mag) => (
                        <Link href={`/magazine/${mag.slug}`} key={mag.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ group: 'group', cursor: 'pointer' }}>

                                {/* Cover with 3D Effect */}
                                <div style={{
                                    position: 'relative', aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden',
                                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    transformOrigin: 'bottom center'
                                }}
                                    className="magazine-cover"
                                    /* Inline styles for hover effect require JS or CSS Module, using simple style for now */
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px) rotateX(5deg)';
                                        e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.2)';
                                    }}
                                >
                                    <img
                                        src={mag.cover}
                                        alt={mag.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />

                                    {/* Badge */}
                                    <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                                        {mag.issue}
                                    </div>

                                    {/* Read Overlay */}
                                    <div style={{
                                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        opacity: 0, transition: 'opacity 0.3s'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                                    >
                                        <div style={{ background: 'white', color: 'black', padding: '15px 30px', borderRadius: 30, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <BookOpen size={20} /> Oku & Keşfet
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ marginTop: 25 }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>{mag.title}</h3>
                                    <p style={{ color: '#666', lineHeight: 1.5, fontSize: '0.95rem' }}>{mag.description}</p>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

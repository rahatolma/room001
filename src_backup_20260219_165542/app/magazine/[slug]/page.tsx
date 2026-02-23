"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';

const MOCK_PAGES = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop', // Model portrait
        products: [
            { id: 101, name: 'V-Yaka İpek Bluz', brand: 'Massimo Dutti', price: '2.450 ₺', image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acce', x: '45%', y: '60%' },
            { id: 102, name: 'Altın Halka Küpe', brand: 'Swarovski', price: '3.200 ₺', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908', x: '55%', y: '35%' }
        ]
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', // Full body street style
        products: [
            { id: 201, name: 'Oversize Trençkot', brand: 'Burberry', price: '45.000 ₺', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', x: '50%', y: '40%' },
            { id: 202, name: 'Deri Çizme', brand: 'Zara', price: '2.900 ₺', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2', x: '60%', y: '85%' },
            { id: 203, name: 'Kırmızı El Çantası', brand: 'Prada', price: '85.000 ₺', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', x: '35%', y: '55%' }
        ]
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', // Editorial colorful
        products: [
            { id: 301, name: 'Renkli Ployester Ceket', brand: 'H&M Studio', price: '1.800 ₺', image: 'https://images.unsplash.com/photo-1551488852-080175b92749', x: '50%', y: '50%' }
        ]
    }
];

export default function MagazineViewer({ params }: { params: { slug: string } }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeProduct, setActiveProduct] = useState<number | null>(null); // For hover highlights

    const nextPage = () => {
        if (currentPage < MOCK_PAGES.length - 1) {
            setCurrentPage(currentPage + 1);
            setActiveProduct(null);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            setActiveProduct(null);
        }
    };

    const currentContent = MOCK_PAGES[currentPage];

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#111', color: 'white', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ height: 60, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: '#000' }}>
                <Link href="/" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <X size={24} /> <span style={{ fontWeight: 600 }}>Kapat</span>
                </Link>
                <div style={{ fontWeight: 700, letterSpacing: 1 }}>URBAN SOUL • EYLÜL 2026</div>
                <div style={{ width: 80 }}></div> {/* Spacer for center alignment */}
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, display: 'flex', position: 'relative' }}>

                {/* Main Image (Page) */}
                <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' }}>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevPage} disabled={currentPage === 0}
                        style={{ position: 'absolute', left: 20, zIndex: 10, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 15, borderRadius: '50%', cursor: currentPage === 0 ? 'default' : 'pointer', opacity: currentPage === 0 ? 0.3 : 1, backdropFilter: 'blur(10px)' }}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={nextPage} disabled={currentPage === MOCK_PAGES.length - 1}
                        style={{ position: 'absolute', right: isSidebarOpen ? 370 : 20, zIndex: 10, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: 15, borderRadius: '50%', cursor: currentPage === MOCK_PAGES.length - 1 ? 'default' : 'pointer', opacity: currentPage === MOCK_PAGES.length - 1 ? 0.3 : 1, transition: 'right 0.3s', backdropFilter: 'blur(10px)' }}
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Image Container */}
                    <div style={{ position: 'relative', height: '100%', aspectRatio: '2/3', maxHeight: 'calc(100vh - 80px)', margin: '10px 0', border: '1px solid #333', borderRadius: 4, overflow: 'visible' }}>
                        <Image
                            src={currentContent.image}
                            alt={`Page ${currentPage + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />

                        {/* HOTSPOTS */}
                        {currentContent.products.map(product => (
                            <div
                                key={product.id}
                                style={{
                                    position: 'absolute', left: product.x, top: product.y,
                                    zIndex: 20
                                }}
                                onMouseEnter={() => setActiveProduct(product.id)}
                                onMouseLeave={() => setActiveProduct(null)}
                            >
                                {/* The Dot */}
                                <div style={{
                                    width: 24, height: 24, background: activeProduct === product.id ? 'white' : 'rgba(255,255,255,0.6)',
                                    borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', cursor: 'pointer',
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                                    transition: 'background 0.2s, transform 0.2s'
                                }} />

                                {/* The Popup Card (Visible on Active) */}
                                {activeProduct === product.id && (
                                    <div style={{
                                        position: 'absolute', top: 20, left: -80, width: 180,
                                        background: 'white', color: 'black', borderRadius: 8, padding: 10,
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 30,
                                        animation: 'fadeIn 0.2s ease-out'
                                    }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 2 }}>{product.brand}</div>
                                        <div style={{ fontSize: '0.8rem', marginBottom: 5 }}>{product.name}</div>
                                        <div style={{ fontWeight: 700 }}>{product.price}</div>
                                        <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid white' }} />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Page Number */}
                        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', backdropFilter: 'blur(4px)' }}>
                            {currentPage + 1} / {MOCK_PAGES.length}
                        </div>
                    </div>

                </div>

                {/* Shopping Sidebar */}
                <div style={{
                    width: isSidebarOpen ? 350 : 0,
                    borderLeft: '1px solid #333',
                    background: '#000',
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    display: 'flex', flexDirection: 'column'
                }}>
                    <div style={{ padding: 20, borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 350 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <ShoppingBag size={18} /> Bu Sayfadaki Ürünler
                        </h3>
                    </div>

                    <div style={{ padding: 20, overflowY: 'auto', minWidth: 350 }}>
                        {currentContent.products.map(product => (
                            <div
                                key={product.id}
                                onMouseEnter={() => setActiveProduct(product.id)}
                                onMouseLeave={() => setActiveProduct(null)}
                                style={{
                                    display: 'flex', gap: 15, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #222',
                                    background: activeProduct === product.id ? '#1a1a1a' : 'transparent',
                                    padding: activeProduct === product.id ? '10px' : '0 0 20px 0',
                                    borderRadius: activeProduct === product.id ? 8 : 0,
                                    transition: 'all 0.2s', cursor: 'pointer'
                                }}
                            >
                                <div style={{ width: 80, height: 100, position: 'relative', borderRadius: 8, overflow: 'hidden', background: '#222' }}>
                                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: 4 }}>{product.brand}</div>
                                    <div style={{ fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{product.name}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 10 }}>{product.price}</div>
                                    <button style={{ width: '100%', padding: '10px', background: 'white', color: 'black', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.9rem' }}>
                                        Sepete Ekle <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

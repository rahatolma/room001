"use client";
// @ts-nocheck
// Disabling strict TS checking for react-pageflip due to its generic definitions
import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Plus, Link as LinkIcon } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';

const MOCK_PAGES = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1000&auto=format&fit=crop', // Cover page
        products: []
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop', // Model portrait
        products: [
            { id: 101, name: 'V-Yaka İpek Bluz', brand: 'Massimo Dutti', price: '2.450 ₺', image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acce', x: '45%', y: '60%' },
            { id: 102, name: 'Altın Halka Küpe', brand: 'Swarovski', price: '3.200 ₺', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908', x: '55%', y: '35%' }
        ]
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop', // Full body street style
        products: [
            { id: 201, name: 'Oversize Trençkot', brand: 'Burberry', price: '45.000 ₺', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', x: '50%', y: '40%' },
            { id: 202, name: 'Deri Çizme', brand: 'Zara', price: '2.900 ₺', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2', x: '60%', y: '85%' },
            { id: 203, name: 'Kırmızı El Çantası', brand: 'Prada', price: '85.000 ₺', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', x: '35%', y: '55%' }
        ]
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop', // Editorial colorful
        products: [
            { id: 301, name: 'Renkli Ployester Ceket', brand: 'H&M Studio', price: '1.800 ₺', image: 'https://images.unsplash.com/photo-1551488852-080175b92749', x: '50%', y: '50%' }
        ]
    }
];

// Page component must be forwarded for react-pageflip to work
const Page = React.forwardRef((props: any, ref: React.Ref<HTMLDivElement>) => {
    return (
        <div className="demoPage" ref={ref} style={{ background: '#fff' }}>
            {props.children}
        </div>
    );
});
Page.displayName = 'Page';

export default function MagazineViewer({ params }: { params: { slug: string } }) {
    // Current visible pages (flipbook shows 2 pages at once usually)
    // We only track the current left/right pages for the Sidebar products
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeProduct, setActiveProduct] = useState<number | null>(null);
    const bookRef = useRef<any>(null);

    const onFlip = useCallback((e: any) => {
        // e.data contains the new current page index
        setCurrentPageIndex(e.data);
        setActiveProduct(null);
    }, []);

    const nextPage = () => {
        if (bookRef.current) bookRef.current.pageFlip().flipNext();
    };

    const prevPage = () => {
        if (bookRef.current) bookRef.current.pageFlip().flipPrev();
    };

    // Calculate which products to show in sidebar. 
    // In a 2-page spread, users might see currentPage and currentPage + 1
    // depending on the book configuration. Let's combine them for the sidebar.
    const currentLeftPage = MOCK_PAGES[currentPageIndex] || { products: [] };
    const currentRightPage = MOCK_PAGES[currentPageIndex + 1] || { products: [] };

    // Some pages might not have products, cover page usually doesn't.
    // If we're on page 0 (cover), right page is page 0 (single page mode in cover mode usually).
    // It depends on react-pageflip settings. We'll grab from both to be safe.
    const visibleProducts = [
        ...(currentLeftPage.products || []),
        ...(currentPageIndex === 0 ? [] : (currentRightPage.products || []))
    ];

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', color: '#111', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: '#fff' }}>
                <Link href="/" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <X size={24} /> <span style={{ fontWeight: 600 }}>Kapat</span>
                </Link>
                <div style={{ fontWeight: 700, letterSpacing: 1 }}>URBAN SOUL • EYLÜL 2026</div>
                <div style={{ width: 80 }}></div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, display: 'flex', position: 'relative' }}>

                {/* Main Viewport (Book Container) */}
                <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

                    {/* Left/Right Global Nav Controls */}
                    <button
                        onClick={prevPage}
                        style={{ position: 'absolute', left: 20, zIndex: 10, background: 'rgba(255,255,255,0.8)', border: 'none', color: '#000', padding: 15, borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={nextPage}
                        style={{ position: 'absolute', right: 20, zIndex: 10, background: 'rgba(255,255,255,0.8)', border: 'none', color: '#000', padding: 15, borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Interactive Flipbook */}
                    <HTMLFlipBook
                        width={450}
                        height={650}
                        size="stretch"
                        minWidth={315}
                        maxWidth={600}
                        minHeight={420}
                        maxHeight={800}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        startPage={0}
                        drawShadow={true}
                        flippingTime={1000}
                        usePortrait={true}
                        startZIndex={0}
                        autoSize={true}
                        clickEventForward={true}
                        useMouseEvents={true}
                        swipeDistance={30}
                        showPageCorners={true}
                        disableFlipByClick={false}
                        onFlip={onFlip}
                        className="magazine-flipbook"
                        ref={bookRef}
                        style={{ margin: '0 60px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }} // Premium Drop Shadow
                    >
                        {MOCK_PAGES.map((page, index) => (
                            <Page key={page.id}>
                                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>

                                    <Image
                                        src={page.image}
                                        alt={`Page ${index + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority={index < 2} // load first 2 pages immediately
                                    />

                                    {/* Page Number (Subtle) */}
                                    <div style={{ position: 'absolute', bottom: 15, right: index % 2 === 0 ? 15 : 'auto', left: index % 2 !== 0 ? 15 : 'auto', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 3px rgba(0,0,0,0.5)', zIndex: 5 }}>
                                        {index + 1}
                                    </div>

                                    {/* HOTSPOTS */}
                                    {page.products.map(product => (
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
                                                width: 24, height: 24, background: activeProduct === product.id ? 'black' : 'rgba(255,255,255,0.8)',
                                                borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', cursor: 'pointer',
                                                transform: 'translate(-50%, -50%)',
                                                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                                                transition: 'background 0.2s, transform 0.2s',
                                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <div style={{ width: 8, height: 8, background: activeProduct === product.id ? 'white' : 'black', borderRadius: '50%' }} />
                                            </div>

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
                                </div>
                            </Page>
                        ))}
                    </HTMLFlipBook>
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

                    <div style={{ padding: 20, overflowY: 'auto', minWidth: 350, height: '100%' }}>
                        {visibleProducts.length === 0 && (
                            <div style={{ padding: 20, textAlign: 'center', color: '#666', fontSize: '0.9rem', marginTop: 40 }}>
                                Bu sayfalarda etiketlenmiş ürün bulunmuyor. Diğer sayfaları çevirin.
                            </div>
                        )}
                        {visibleProducts.map(product => (
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
                                        <LinkIcon size={14} /> Linklerime Ekle
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

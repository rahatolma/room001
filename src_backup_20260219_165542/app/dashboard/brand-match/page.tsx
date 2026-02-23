'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight, Heart, X, MessageCircle, DollarSign, Calendar, MapPin, CheckCircle2, Filter, SlidersHorizontal, ArrowLeft, Star, Handshake, Briefcase, Trophy, Plus } from 'lucide-react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { acceptBrandOffer } from '@/actions/brand-match';
import { searchProducts } from '@/actions/search';
import { toast } from 'sonner';

// --- TYPES ---
type ViewMode = 'LIST' | 'SWIPE';

interface BrandMatch {
    id: string;
    name: string;
    logo: string;
    image: string;
    matchScore: number;
    status: 'OFFER_RECEIVED' | 'MATCHED' | 'NEGOTIATION';
    category: string;
    offerDetails?: {
        amount: string;
        deliverables: string[];
        platform: string[];
        deadline: string;
    };
    description: string;
}

// --- MOCK DATA ---
const MOCK_MATCHES: BrandMatch[] = [
    {
        id: '1',
        name: 'Beymen',
        logo: 'https://images.unsplash.com/photo-1541533848490-bc9c15ceaccb?w=200&q=80',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
        matchScore: 98,
        status: 'OFFER_RECEIVED',
        category: 'LÜKS MODA',
        offerDetails: {
            amount: '15.000 ₺',
            deliverables: ['1x Instagram Reels', '2x Instagram Story', 'Link Paylaşımı'],
            platform: ['Instagram'],
            deadline: '25 Şubat 2026'
        },
        description: 'Beymen Club yeni sezon koleksiyonu tanıtımı için seninle çalışmak istiyoruz. Tarzının markamızla çok uyumlu olduğunu düşünüyoruz.'
    },
    {
        id: '2',
        name: 'Trendyol',
        logo: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?w=200&q=80',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        matchScore: 92,
        status: 'MATCHED',
        category: 'E-TİCARET',
        offerDetails: {
            amount: '8.500 ₺ + Komisyon',
            deliverables: ['1x TikTok Video', 'Trendyol Koleksiyonu Oluşturma'],
            platform: ['TikTok'],
            deadline: '1 Mart 2026'
        },
        description: 'Şubat ayı "Okula Dönüş" kampanyası kapsamında favori çalışma alanı ürünlerini paylaşmanı istiyoruz.'
    },
    {
        id: '3',
        name: 'Mavi',
        logo: 'https://images.unsplash.com/photo-1576995853123-5a2946152c7c?w=200&q=80',
        image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80',
        matchScore: 88,
        status: 'NEGOTIATION',
        category: 'MODA',
        offerDetails: {
            amount: 'Teklif Bekleniyor',
            deliverables: ['Jean Kombin Videosu'],
            platform: ['Instagram', 'Youtube Shorts'],
            deadline: 'Belirsiz'
        },
        description: 'Mavi Black serisi tanıtımı için görüşmelerimiz devam ediyor.'
    }
];

export default function BrandMatchPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<ViewMode>('LIST');
    const [selectedMatchId, setSelectedMatchId] = useState<string>(MOCK_MATCHES[0].id);
    const [isSelectingProducts, setIsSelectingProducts] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Derived State
    const selectedMatch = MOCK_MATCHES.find(m => m.id === selectedMatchId) || MOCK_MATCHES[0];

    const handleAcceptOffer = () => {
        setIsSelectingProducts(true);
    };

    const handleConfirmSelection = async () => {
        if (selectedProducts.length === 0) {
            toast.error('Lütfen en az bir ürün seçin.');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await acceptBrandOffer(selectedMatch.name, selectedProducts);
            if (result.success) {
                router.push('/dashboard/links?toast=offer_accepted');
            } else {
                toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Beklenmedik bir hata.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ paddingBottom: 50 }}>

            {/* --- HEADER & TOGGLE --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2rem', margin: 0 }}>Marka Eşleşmeleri</h1>
                    <p style={{ color: '#666' }}>Sana uygun markaları keşfet veya mevcut tekliflerini yönet.</p>
                </div>

                <div style={{ display: 'flex', background: '#f5f5f5', padding: 4, borderRadius: 12 }}>
                    <button
                        onClick={() => setViewMode('LIST')}
                        style={{
                            padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                            background: viewMode === 'LIST' ? 'white' : 'transparent',
                            color: viewMode === 'LIST' ? 'black' : '#666',
                            boxShadow: viewMode === 'LIST' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', gap: 6
                        }}
                    >
                        <Briefcase size={16} />
                        Eşleşmelerim
                    </button>
                    <button
                        onClick={() => setViewMode('SWIPE')}
                        style={{
                            padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                            background: viewMode === 'SWIPE' ? 'white' : 'transparent',
                            color: viewMode === 'SWIPE' ? 'black' : '#666',
                            boxShadow: viewMode === 'SWIPE' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', gap: 6
                        }}
                    >
                        <Trophy size={16} />
                        Keşfet & Eşleş
                    </button>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            {viewMode === 'LIST' ? (
                <div style={{ display: 'flex', height: 'calc(100vh - 200px)', border: '1px solid #eaeaea', borderRadius: 24, overflow: 'hidden', background: 'white' }}>

                    {/* LEFT SIDEBAR: MATCH LIST */}
                    <div style={{ width: 380, borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>

                        {/* Search */}
                        <div style={{ padding: 20, borderBottom: '1px solid #f9f9f9' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                <input
                                    placeholder="Marka veya kampanya ara..."
                                    style={{ width: '100%', padding: '12px 12px 12px 40px', background: '#f9f9f9', border: '1px solid #eee', borderRadius: 12, fontSize: '0.9rem' }}
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {MOCK_MATCHES.map(match => (
                                <div
                                    key={match.id}
                                    onClick={() => setSelectedMatchId(match.id)}
                                    style={{
                                        padding: 20, cursor: 'pointer', transition: 'all 0.2s',
                                        background: selectedMatchId === match.id ? '#fafafa' : 'white',
                                        borderLeft: selectedMatchId === match.id ? '4px solid black' : '4px solid transparent',
                                        display: 'flex', gap: 15, alignItems: 'flex-start'
                                    }}
                                >
                                    <div style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden', border: '1px solid #eee', flexShrink: 0, position: 'relative' }}>
                                        <Image src={match.logo} alt={match.name} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{match.name}</h4>
                                            {match.status === 'OFFER_RECEIVED' && <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: '#047857', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>TEKLİF</span>}
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {match.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT MAIN: DETAILS */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

                        {/* Hero Banner */}
                        <div style={{ height: 250, width: '100%', position: 'relative' }}>
                            <Image src={selectedMatch.image} alt={selectedMatch.name} fill style={{ objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />

                            <div style={{ position: 'absolute', bottom: 30, left: 40, color: 'white' }}>
                                <h2 style={{ fontSize: '3rem', margin: 0 }}>{selectedMatch.name}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                                    <span style={{ background: '#10b981', padding: '6px 14px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700 }}>%{selectedMatch.matchScore} EŞLEŞME</span>
                                    <span style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 500 }}>{selectedMatch.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: 40, flex: 1 }}>

                            {/* Layout: Content Full Width, Card below */}
                            <div style={{ maxWidth: 900 }}>

                                {/* Description */}
                                <div style={{ marginBottom: 40 }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: 15 }}>İşbirliği Detayları</h3>
                                    <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '1.05rem' }}>
                                        {selectedMatch.description} <br /><br />
                                        Markamızın dijital yüzü olarak seni aramızda görmekten mutluluk duyarız.
                                        Bu kampanya kapsamında yaratıcılığını özgürce kullanabilirsin. Hedef kitlemizle en iyi sen iletişim kurabilirsin.
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                                    {/* Left Details */}
                                    <div>
                                        <h4 style={{ fontSize: '0.85rem', color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20, fontWeight: 600 }}>BEKLENEN İÇERİKLER</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                            {selectedMatch.offerDetails?.deliverables.map((d, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f9fafb', borderRadius: 12, border: '1px solid #eee', fontSize: '0.95rem', fontWeight: 500 }}>
                                                    <CheckCircle2 size={18} color="black" />
                                                    {d}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Details: Platforms & Dates */}
                                    <div>
                                        <h4 style={{ fontSize: '0.85rem', color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20, fontWeight: 600 }}>PLATFORM & SÜREÇ</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <MapPin size={18} />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Yayınlanacak Platformlar</div>
                                                    <div style={{ fontWeight: 600 }}>{selectedMatch.offerDetails?.platform.join(', ')}</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Calendar size={18} />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Son Teslim Tarihi</div>
                                                    <div style={{ fontWeight: 600 }}>{selectedMatch.offerDetails?.deadline}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Offer Action Box - Now at bottom & Full Width */}
                                <div style={{ marginTop: 50, background: '#fff', border: '1px solid #eaeaea', borderRadius: 20, padding: 30, boxShadow: '0 10px 40px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#999', fontWeight: 600, marginBottom: 8, letterSpacing: 0.5 }}>TEKLİF TUTARI</label>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#10b981', lineHeight: 1 }}>{selectedMatch.offerDetails?.amount}</div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 15 }}>
                                        <button style={{ background: 'white', color: '#333', border: '1px solid #ddd', padding: '16px 30px', borderRadius: 12, fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <MessageCircle size={18} />
                                            Şartları Konuş
                                        </button>
                                        <button
                                            onClick={handleAcceptOffer}
                                            style={{ background: 'black', color: 'white', border: 'none', padding: '16px 40px', borderRadius: 12, fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                                        >
                                            <Handshake size={18} />
                                            Teklifi Kabul Et & Link Oluştur
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <DiscoverView onSwitchToList={() => setViewMode('LIST')} />
            )}

            {/* PRODUCT SELECTION MODAL */}
            {isSelectingProducts && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
                    <div style={{ background: 'white', borderRadius: 24, width: '90%', maxWidth: 800, height: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>

                        <div style={{ padding: '24px 30px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Hangi ürünleri paylaşacaksın?</h3>
                                <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.9rem' }}>{selectedMatch.name} işbirliği için ürünlerini seç.</p>
                            </div>
                            <button onClick={() => setIsSelectingProducts(false)} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ flex: 1, padding: 30, overflowY: 'auto' }}>
                            <ProductSelector
                                onSelect={(id) => {
                                    if (selectedProducts.includes(id)) {
                                        setSelectedProducts(prev => prev.filter(p => p !== id));
                                    } else {
                                        setSelectedProducts(prev => [...prev, id]);
                                    }
                                }}
                                selectedIds={selectedProducts}
                            />
                        </div>

                        <div style={{ padding: '20px 30px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 15, background: '#fafafa' }}>
                            <button onClick={() => setIsSelectingProducts(false)} style={{ padding: '12px 24px', borderRadius: 12, border: '1px solid #e5e5e5', background: 'white', fontWeight: 600, cursor: 'pointer' }}>Vazgeç</button>
                            <button
                                onClick={handleConfirmSelection}
                                disabled={isSubmitting || selectedProducts.length === 0}
                                style={{ padding: '12px 30px', borderRadius: 12, border: 'none', background: 'black', color: 'white', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                            >
                                {isSubmitting ? 'İşleniyor...' : `Seçimi Onayla (${selectedProducts.length})`}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

// --- SUB-COMPONENT: PRODUCT SELECTOR ---
function ProductSelector({ onSelect, selectedIds }: { onSelect: (id: string) => void, selectedIds: string[] }) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Initial fetch - get some products
        const fetchInitial = async () => {
            try {
                const res = await searchProducts('');
                setProducts(res);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchInitial();
    }, []);

    const handleSearch = async (val: string) => {
        setQuery(val);
        // Simple debounce could differ, but for prototype direct call is fine or execute after delay
        if (val.length > 2 || val.length === 0) {
            const res = await searchProducts(val);
            setProducts(res);
        }
    };

    return (
        <div>
            <div style={{ position: 'relative', marginBottom: 20 }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                    placeholder="Ürün ara..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 12, border: '1px solid #eee', background: '#f9f9f9', fontSize: '1rem' }}
                />
            </div>

            {loading ? (
                <div>Yükleniyor...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 20 }}>
                    {products.map(product => {
                        const isSelected = selectedIds.includes(product.id);
                        return (
                            <div
                                key={product.id}
                                onClick={() => onSelect(product.id)}
                                style={{
                                    border: isSelected ? '2px solid black' : '1px solid #eee',
                                    borderRadius: 16, overflow: 'hidden', cursor: 'pointer', position: 'relative',
                                    transition: 'all 0.2s', transform: isSelected ? 'scale(0.98)' : 'scale(1)'
                                }}
                            >
                                <div style={{ height: 200, position: 'relative', background: '#f5f5f5' }}>
                                    {product.imageUrl ? (
                                        <Image src={product.imageUrl} alt={product.title} fill style={{ objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ccc' }}>No Image</div>
                                    )}
                                    {isSelected && (
                                        <div style={{ position: 'absolute', top: 10, right: 10, background: 'black', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CheckCircle2 size={14} />
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: 12 }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{product.brand?.name || 'Marka'}</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: 6 }}>{product.price} TL</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// --- SUB-COMPONENT: DISCOVERY (TINDER) MODE ---
function DiscoverView({ onSwitchToList }: { onSwitchToList: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [exitX, setExitX] = useState<number | undefined>(undefined);

    // Using simple mock data for discovery
    const DISCOVERY_CANDIDATES = [
        {
            id: 101,
            name: 'Revolve',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=90',
            match: '98%',
            category: 'LÜKS MODA',
            desc: 'Global moda influencerlarının favori durağı.',
        },
        {
            id: 102,
            name: 'Sephora',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=90',
            match: '95%',
            category: 'GÜZELLİK',
            desc: 'Güzellik dünyasının kalbi.',
        },
        {
            id: 103,
            name: 'Penti',
            image: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?w=800&q=90',
            match: '89%',
            category: 'İÇ GİYİM',
            desc: 'Penti MyBra koleksiyonu lansmanı.',
        }
    ];

    const currentCard = DISCOVERY_CANDIDATES[currentIndex];
    const controls = useAnimation();

    const handleDragEnd = (event: any, info: PanInfo) => {
        if (info.offset.x > 150) {
            setExitX(300); // Swipe Right
            setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
        } else if (info.offset.x < -150) {
            setExitX(-300); // Swipe Left
            setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
        }
    };

    useEffect(() => {
        if (exitX !== undefined) {
            controls.start({ x: exitX, opacity: 0, transition: { duration: 0.2 } });
            setTimeout(() => {
                setExitX(undefined);
                controls.set({ x: 0, opacity: 1 });
            }, 200);
        }
    }, [exitX, controls]);

    const swipe = (direction: 'left' | 'right') => {
        setExitX(direction === 'right' ? 300 : -300);
        setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
    };

    if (!currentCard) {
        return (
            <div style={{ textAlign: 'center', padding: 80, background: '#fff', borderRadius: 32, border: '1px solid #eee', minHeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎉</div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: 15 }}>Harikasın!</h2>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Bugünlük tüm markaları inceledin.</p>
                <button onClick={onSwitchToList} style={{ marginTop: 30, padding: '15px 30px', background: 'black', color: 'white', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 600 }}>Eşleşmelerime Git</button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 650, position: 'relative', overflow: 'hidden' }}>
            <motion.div
                key={currentCard.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={controls}
                style={{
                    width: '100%', maxWidth: 450, height: 620, background: 'white', borderRadius: 32,
                    boxShadow: '0 40px 80px -20px rgba(0,0,0,0.2)', overflow: 'hidden', position: 'relative',
                    border: '1px solid #f0f0f0', cursor: 'grab', touchAction: 'none'
                }}
            >
                <div style={{ height: '100%', position: 'relative' }}>
                    <Image src={currentCard.image} alt={currentCard.name} fill style={{ objectFit: 'cover', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 30, left: 30, display: 'flex', gap: 10, pointerEvents: 'none' }}>
                        <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800 }}>{currentCard.category}</div>
                    </div>
                    <div style={{ position: 'absolute', bottom: 120, left: 0, width: '100%', padding: '0 40px 0 40px', color: 'white', pointerEvents: 'none' }}>
                        <h2 style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1, marginBottom: 15 }}>{currentCard.name}</h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: 0, lineHeight: 1.4 }}>{currentCard.desc}</p>
                    </div>
                    <div style={{ position: 'absolute', bottom: 30, width: '100%', display: 'flex', justifyContent: 'center', gap: 40 }}>
                        <button
                            onClick={() => swipe('left')}
                            style={{
                                width: 70, height: 70, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)', background: 'transparent', backdropFilter: 'blur(5px)',
                                color: 'white', cursor: 'pointer', fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                            }}
                        >✕</button>
                        <button
                            onClick={() => swipe('right')}
                            style={{
                                width: 70, height: 70, borderRadius: '50%', border: 'none', background: '#10b981',
                                color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)', transition: 'transform 0.2s'
                            }}
                        >
                            <Heart size={32} fill="white" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

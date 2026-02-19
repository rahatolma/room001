'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Heart } from 'lucide-react';

export default function BrandMatchPage() {
    // --- TINDER LOGIC ONLY ---
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [showOffer, setShowOffer] = useState(false);

    // Richer Data for "High Quality" feel
    const MATCH_CANDIDATES = [
        {
            id: 101,
            name: 'Revolve',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=90',
            match: '98%',
            category: 'LÜKS MODA',
            desc: 'Global moda influencerlarının favori durağı. Yüksek komisyon oranları ve özel etkinlik davetleri.',
            details: 'Revolve, dünya çapında en çok takip edilen influencerlarla çalışarak trendleri belirler. Partnerlerimize özel %20 komisyon, hediye ürün paketleri ve LA etkinliklerine katılım şansı sunuyoruz.',
            offerTypes: ['Ürün Karşılığı Post', 'Ücretli İşbirliği', 'Affiliate Ortaklığı']
        },
        {
            id: 102,
            name: 'Sephora',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=90',
            match: '95%',
            category: 'GÜZELLİK',
            desc: 'Güzellik dünyasının kalbi. Yeni çıkan ürünleri ilk sen dene.',
            details: 'Sephora Squad\'ın bir parçası ol. Makyaj, cilt bakımı ve parfüm kategorilerinde en yeni lansmanlara erişim sağla.',
            offerTypes: ['Youtube Videosu', 'Instagram Reels', 'TikTok Challenge']
        },
        {
            id: 103,
            name: 'Mango',
            image: 'https://images.unsplash.com/photo-1550614000-4b9519e02a15?w=800&q=90',
            match: '89%',
            category: 'MODA',
            desc: 'Akdeniz stili, modern ve şehirli kadınlar için.',
            details: 'Mango Girls topluluğuna katıl. Sezonluk koleksiyonlardan dilediğin parçaları seç ve stilini konuştur.',
            offerTypes: ['Kombin Paylaşımı', 'Mağaza Ziyareti', 'Lookbook Çekimi']
        }
    ];

    const currentCandidate = MATCH_CANDIDATES[currentMatchIndex];

    const handleAction = (action: 'pass' | 'like' | 'offer') => {
        if (action === 'offer') {
            setShowOffer(true);
            return;
        }
        // Swipe Animation Logic (Mock)
        setTimeout(() => {
            if (currentMatchIndex < MATCH_CANDIDATES.length) {
                setCurrentMatchIndex(prev => prev + 1);
                setShowDetails(false);
            }
        }, 200);
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 100, fontFamily: 'sans-serif' }}>

            {/* Header */}
            <div style={{ marginBottom: 60, textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontFamily: 'serif', fontWeight: 400, margin: 0, letterSpacing: -0.5 }}>
                    Marka Eşleşmeleri
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginTop: 10 }}>
                    Sana en uygun markaları kaydır, eşleş ve kazanmaya başla.
                </p>
            </div>

            {/* --- SWIPE AREA (CENTERED & FOCUSED) --- */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 600, position: 'relative' }}>

                {currentCandidate ? (
                    <div style={{
                        width: '100%', maxWidth: 450, background: 'white', borderRadius: 32,
                        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.2)', overflow: 'hidden', position: 'relative',
                        border: '1px solid #f0f0f0'
                    }}>
                        {/* Image Header */}
                        <div style={{ height: 580, position: 'relative' }}>
                            <Image src={currentCandidate.image} alt={currentCandidate.name} fill style={{ objectFit: 'cover' }} />

                            {/* Overlay Gradient */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 50%)' }} />

                            {/* Top Badges */}
                            <div style={{ position: 'absolute', top: 30, left: 30, display: 'flex', gap: 10 }}>
                                <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, letterSpacing: 0.5 }}>
                                    {currentCandidate.category}
                                </div>
                                <div style={{ background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, letterSpacing: 0.5, boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}>
                                    %{currentCandidate.match} EŞLEŞME
                                </div>
                            </div>

                            {/* Info on Card */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: 40, color: 'white' }}>
                                <h2 style={{ fontSize: '3.2rem', margin: 0, fontFamily: 'serif', lineHeight: 1, marginBottom: 10 }}>{currentCandidate.name}</h2>
                                <p style={{ fontSize: '1rem', opacity: 0.85, lineHeight: 1.5, marginBottom: 30 }}>
                                    {currentCandidate.desc}
                                </p>

                                {/* Info Button */}
                                <button
                                    onClick={() => setShowDetails(true)}
                                    style={{
                                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                                        width: '100%', padding: '14px', borderRadius: 16, cursor: 'pointer',
                                        fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                                    }}
                                >
                                    Detayları İncele <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Bottom Swipe Controls */}
                        <div style={{ padding: 30, display: 'flex', justifyContent: 'center', gap: 30, background: 'white' }}>
                            <button
                                onClick={() => handleAction('pass')}
                                style={{
                                    width: 70, height: 70, borderRadius: '50%', border: '2px solid #eee', background: 'white',
                                    color: '#ff4b4b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2rem', transition: 'all 0.2s', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                                }}
                            >
                                ✕
                            </button>
                            <button
                                onClick={() => handleAction('offer')}
                                style={{
                                    width: 70, height: 70, borderRadius: '50%', border: 'none', background: '#3b82f6',
                                    color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)', transition: 'all 0.2s'
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>💬</span>
                            </button>
                            <button
                                onClick={() => handleAction('like')}
                                style={{
                                    width: 70, height: 70, borderRadius: '50%', border: 'none', background: '#10b981',
                                    color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)', transition: 'all 0.2s'
                                }}
                            >
                                <Heart size={32} fill="white" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: 80, background: '#f9fafb', borderRadius: 32, border: '1px solid #eee' }}>
                        <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎉</div>
                        <h2 style={{ fontFamily: 'serif', fontSize: '2.5rem', marginBottom: 15 }}>Harikasın!</h2>
                        <p style={{ color: '#666', fontSize: '1.1rem' }}>Bugünlük tüm markaları inceledin.</p>
                        <button onClick={() => setCurrentMatchIndex(0)} style={{ marginTop: 30, textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', color: '#333', fontWeight: 600 }}>Tekrar Başla</button>
                    </div>
                )}
            </div>

            {/* --- DETAILS MODAL --- */}
            {showDetails && currentCandidate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div style={{ background: 'white', width: '100%', maxWidth: 550, borderRadius: 32, padding: 50, position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <button onClick={() => setShowDetails(false)} style={{ position: 'absolute', top: 25, right: 25, width: 40, height: 40, borderRadius: '50%', background: '#f5f5f5', border: 'none', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

                        <div style={{ width: 80, height: 80, borderRadius: 20, overflow: 'hidden', marginBottom: 25, position: 'relative' }}>
                            <Image src={currentCandidate.image} alt="Logo" fill style={{ objectFit: 'cover' }} />
                        </div>

                        <h2 style={{ fontFamily: 'serif', fontSize: '2.5rem', margin: 0, marginBottom: 5 }}>{currentCandidate.name}</h2>
                        <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem', marginBottom: 30 }}>%{currentCandidate.match} EŞLEŞME SKORU</div>

                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#444', marginBottom: 30 }}>
                            {currentCandidate.details}
                        </p>

                        <h4 style={{ margin: '0 0 15px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 1.5, color: '#999' }}>İŞBİRLİĞİ FIRSATLARI</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                            {currentCandidate.offerTypes?.map(t => (
                                <span key={t} style={{ border: '1px solid #e5e7eb', background: '#f9fafb', padding: '10px 18px', borderRadius: 20, fontSize: '0.9rem', fontWeight: 500, color: '#374151' }}>{t}</span>
                            ))}
                        </div>

                        <button
                            onClick={() => { setShowDetails(false); setShowOffer(true); }}
                            style={{ width: '100%', padding: 20, background: 'black', color: 'white', border: 'none', borderRadius: 16, fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.1s' }}
                        >
                            TEKLİF GÖNDER
                        </button>
                    </div>
                </div>
            )}

            {/* --- OFFER MODAL --- */}
            {showOffer && currentCandidate && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div style={{ background: 'white', width: '100%', maxWidth: 500, borderRadius: 32, padding: 40, position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <button onClick={() => setShowOffer(false)} style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: '50%', background: '#f5f5f5', border: 'none', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

                        <h2 style={{ fontFamily: 'serif', fontSize: '2rem', margin: '0 0 10px' }}>Teklif Gönder</h2>
                        <p style={{ color: '#666', marginBottom: 30 }}>{currentCandidate.name} yetkilisine doğrudan mesajın.</p>

                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 700, color: '#374151' }}>TEKLİF TÜRÜ</label>
                            <select style={{ width: '100%', padding: 16, borderRadius: 12, border: '1px solid #e5e7eb', fontSize: '1rem', background: '#fff', outline: 'none' }}>
                                {currentCandidate.offerTypes?.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: 30 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 700, color: '#374151' }}>NOTUNUZ</label>
                            <textarea
                                rows={4}
                                placeholder="Merhaba, markanızı çok seviyorum ve..."
                                style={{ width: '100%', padding: 16, borderRadius: 12, border: '1px solid #e5e7eb', fontSize: '1rem', fontFamily: 'sans-serif', outline: 'none', resize: 'none' }}
                            />
                        </div>

                        <button
                            onClick={() => { setShowOffer(false); handleAction('like'); alert('Teklifiniz başarıyla iletildi!'); }}
                            style={{ width: '100%', padding: 20, background: 'black', color: 'white', border: 'none', borderRadius: 16, fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                            GÖNDER 🚀
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

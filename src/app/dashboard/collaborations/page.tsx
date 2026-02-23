'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Package, Clock, Gift, Copy, Tag, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

// --- TYPES ---
type TabType = 'GIFTING' | 'CODES' | 'OPPORTUNITIES';

function CollaborationsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tabParam = searchParams.get('tab');

    // Determine active tab from URL or default
    const getTabFromUrl = (): TabType => {
        if (tabParam === 'CODES') return 'CODES';
        if (tabParam === 'OPPORTUNITIES') return 'OPPORTUNITIES';
        return 'GIFTING';
    }

    const [activeTab, setActiveTabState] = useState<TabType>(getTabFromUrl());

    // Sync state with URL changes
    useEffect(() => {
        setActiveTabState(getTabFromUrl());
    }, [tabParam]);

    const handleTabChange = (tab: TabType) => {
        setActiveTabState(tab);
        // Update URL without refresh
        router.push(`/dashboard/collaborations?tab=${tab}`);
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`${code} kopyalandı!`);
    };

    return (
        <div style={{ maxWidth: 1200, paddingBottom: 100, }}>

            {/* Header Area based on Active Tab */}
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 400, margin: 0, letterSpacing: -0.5 }}>
                    {activeTab === 'GIFTING' && 'Hediye İsteklerim'}
                    {activeTab === 'CODES' && 'Kodlarım'}
                    {activeTab === 'OPPORTUNITIES' && 'Fırsatlarım'}
                </h1>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: 15, marginBottom: 50 }}>
                <TabButton
                    label="HEDİYELEŞME"
                    isActive={activeTab === 'GIFTING'}
                    onClick={() => handleTabChange('GIFTING')}
                />
                <TabButton
                    label="İNDİRİM KODLARI"
                    isActive={activeTab === 'CODES'}
                    onClick={() => handleTabChange('CODES')}
                />
                <TabButton
                    label="FIRSATLAR"
                    isActive={activeTab === 'OPPORTUNITIES'}
                    onClick={() => handleTabChange('OPPORTUNITIES')}
                />
            </div>

            {/* --- TAB CONTENT: GIFTING --- */}
            {activeTab === 'GIFTING' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 25 }}>
                    {/* Mock Gifting Item 1 */}
                    <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ width: 45, height: 45, borderRadius: 8, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>Dyson Türkiye</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Airwrap Multi-styler</span>
                                </div>
                            </div>
                            <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Package size={14} /> Kargoya Verildi
                            </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
                            İçerik planlaması için ürününüz 2 gün içinde teslim edilecektir. Takip no: Yurtiçi Kargo (1Z99999).
                        </p>
                    </div>

                    {/* Mock Gifting Item 2 */}
                    <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div style={{ width: 45, height: 45, borderRadius: 8, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>Sephora</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Yaz Koleksiyonu Kiti</span>
                                </div>
                            </div>
                            <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Clock size={14} /> Beklemede
                            </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
                            Marka hediye isteğinizi inceliyor. Onaylandığında adres bilgilerinizi teyit edeceğiz.
                        </p>
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: CODES --- */}
            {activeTab === 'CODES' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#0f172a', marginBottom: 4 }}>Varsayılan Kod Formatınız</h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Markalar kod oluştururken genellikle bu formatı tercih edecektir.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: 1 }}>ASENA20</span>
                            <Link href="/dashboard/settings">
                                <Button variant="outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>DÜZENLE</Button>
                            </Link>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                        {/* Mock Code 1 */}
                        <div style={{ border: '1px solid #eaeaea', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eaeaea', background: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ background: '#111', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>%15 İNDİRİM</div>
                                    <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Trendyol</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#888' }}>Geçerlilik: Sınırsız</span>
                            </div>
                            <div style={{ padding: 20, background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: 1, color: '#111' }}>ASENA15</span>
                                <button onClick={() => copyCode('ASENA15')} style={{ background: 'white', border: '1px solid #ddd', padding: '8px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#555' } as any}>
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Mock Code 2 */}
                        <div style={{ border: '1px solid #eaeaea', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eaeaea', background: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ background: '#059669', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>%20 İNDİRİM</div>
                                    <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Boyner</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#888' }}>Son: 31 Mart</span>
                            </div>
                            <div style={{ padding: 20, background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: 1, color: '#111' }}>ASENA20</span>
                                <button onClick={() => copyCode('ASENA20')} style={{ background: 'white', border: '1px solid #ddd', padding: '8px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#555' } as any}>
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: OPPORTUNITIES --- */}
            {activeTab === 'OPPORTUNITIES' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 25 }}>
                    {/* Mock Opportunity 1 */}
                    <div style={{ border: '1px solid #eaeaea', borderRadius: 12, padding: 25, background: 'white', transition: 'box-shadow 0.2s', cursor: 'pointer' }} className="hover:shadow-lg">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                            <span style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Sparkles size={14} /> Yeni Kampanya
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>₺15.000 Bütçe</span>
                        </div>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 700 }}>L'Oréal Paris Cilt Bakım Serisi</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5, marginBottom: 20 }}>
                            Yeni Revitalift serisi için Instagram Reels ve 2 Story içeriği üretecek, cilt bakımı odaklı creatorlar arıyoruz.
                        </p>
                        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 20px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: '#888' }}>Son Başvuru: 5 Gün Sonra</span>
                            <Button style={{ fontSize: '0.8rem', background: '#111', color: 'white', padding: '8px 16px' }}>BAŞVUR</Button>
                        </div>
                    </div>

                    {/* Mock Opportunity 2 */}
                    <div style={{ border: '1px solid #eaeaea', borderRadius: 12, padding: 25, background: 'white', transition: 'box-shadow 0.2s', cursor: 'pointer' }} className="hover:shadow-lg">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                            <span style={{ background: '#f8fafc', color: '#475569', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Tag size={14} /> Affiliate Odaklı
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>%15 Komisyon</span>
                        </div>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 700 }}>Nike Koşu Koleksiyonu</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5, marginBottom: 20 }}>
                            Nike'ın yeni koşu koleksiyonunu takipçilerinle paylaş, özel indirim kodu oluşturarak %15'e varan komisyon kazan.
                        </p>
                        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 0 20px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: '#888' }}>Açık Program</span>
                            <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', padding: '8px 16px' }}>DETAYLAR <ChevronRight size={14} /></Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

// --- SUB COMPONENTS ---

function TabButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '12px 25px',
                background: 'white',
                border: '1px solid',
                borderColor: isActive ? '#059669' : '#ddd', // Active green border
                borderRadius: 4,
                color: isActive ? 'black' : '#666',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: 1,
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 0 0 #059669' : 'none', // Bottom border stress
                transform: isActive ? 'translateY(-2px)' : 'none',
                transition: 'all 0.2s ease'
            }}
        >
            {label}
        </button>
    );
}

export default function CollaborationsPage() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <CollaborationsContent />
        </Suspense>
    );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

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

    return (
        <div style={{ maxWidth: 1200, paddingBottom: 100, fontFamily: 'sans-serif' }}>

            {/* Header Area based on Active Tab */}
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '3.5rem', fontFamily: 'serif', fontWeight: 400, margin: 0, letterSpacing: -0.5 }}>
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
                <div style={{ textAlign: 'center', padding: '100px 20px', color: '#999' }}>
                    <p style={{ fontSize: '1.2rem', fontWeight: 300 }}>Henüz bir hediyeleşme aktivitesi yok.</p>
                </div>
            )}

            {/* --- TAB CONTENT: CODES --- */}
            {activeTab === 'CODES' && (
                <div>
                    <div style={{
                        background: 'white',
                        border: '1px solid #eee',
                        borderRadius: 8,
                        padding: 30,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.03)'
                    }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>BUNU BİLİYOR MUYDUNUZ?</h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 20 }}>
                            Hesap Ayarları'ndan tercih ettiğiniz kod formatını belirleyebilirsiniz.
                            Şu anki tercihiniz: <strong>ASENA20</strong> formatındadır.
                        </p>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <Link href="/dashboard/settings">
                                <Button style={{ fontSize: '0.8rem', padding: '10px 20px', background: '#1a1a1a' }}>AYARLARA GİT</Button>
                            </Link>
                            <Button variant="outline" style={{ fontSize: '0.8rem', padding: '10px 20px', background: '#f5f5f5', border: 'none' }}>GİZLE</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: OPPORTUNITIES --- */}
            {activeTab === 'OPPORTUNITIES' && (
                <div style={{ textAlign: 'center', padding: '100px 20px', color: '#999' }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 300, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                        Şu anda herhangi bir fırsatınız bulunmuyor. Fırsatlar hakkında daha fazla bilgi almak için <a href="#" style={{ textDecoration: 'underline', color: '#333' }}>Üretici Rehberi</a>ni inceleyebilirsiniz.
                    </p>
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

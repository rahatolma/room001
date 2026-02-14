"use client";

import React, { useState } from 'react';
import Button from '@/components/Button';

export default function MyCirclesPage() {
    const [activeTab, setActiveTab] = useState('Tümü');

    const tabs = ['Tümü', 'Çemberlerim', 'Favori Çemberler', 'Yeni Keşiflerle'];

    return (
        <div style={{ padding: '40px 20px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginBottom: 20 }}>Çemberlerim</h1>
            <p style={{ color: '#666', marginBottom: 40 }}>Kendi kişisel mağazaların, favori insanların tarafından kürate edildi.</p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
                <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    Instagram'dan
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </Button>
                <Button variant="primary" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    Çember Oluştur
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </Button>
            </div>

            <div style={{ width: '100%', maxWidth: 800, borderBottom: '1px solid #eee', marginBottom: 60, display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: 'none',
                            padding: '10px 20px',
                            borderRadius: 20,
                            cursor: 'pointer',
                            color: activeTab === tab ? 'black' : '#999',
                            fontWeight: activeTab === tab ? 600 : 400,
                            border: activeTab === tab ? '1px solid #ddd' : '1px solid transparent'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Empty State */}
            <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 500 }}>
                <div style={{ fontSize: '2rem', marginBottom: 20, color: '#ccc' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: 15 }}>Henüz hiç çemberin yok</h2>
                <p style={{ color: '#999', lineHeight: 1.6, marginBottom: 30 }}>
                    Çemberler, alışveriş deneyimini kimin kürate edeceğini seçmeni sağlar. Kendi çemberini oluştur veya diğerlerini keşfet ve beğen.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15, alignItems: 'center' }}>
                    <Button variant="primary" style={{ width: 250 }}>İlk Çemberimi Oluştur</Button>
                    <Button variant="secondary" style={{ width: 250, background: '#eee', border: 'none' }}>Çemberleri Keşfet</Button>
                </div>
            </div>
        </div>
    );
}

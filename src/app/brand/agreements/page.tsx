'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Filter, MoreHorizontal, MessageCircle, Gift, Zap, CheckCircle2, Clock, XCircle } from 'lucide-react';

// --- MOCK OFFERS DATA ---
const MOCK_AGREEMENTS = [
    {
        id: '1',
        creator: 'Asena Sarıbatur',
        creatorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
        type: 'gift', // gift or campaign
        budget: null,
        status: 'accepted', // pending, accepted, rejected, completed
        date: '12 Şubat 2026',
        details: 'Dyson Airwrap hediye gönderimi'
    },
    {
        id: '2',
        creator: 'Burak Yılmaz',
        creatorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
        type: 'campaign', // gift or campaign
        budget: '15,000 TL',
        status: 'pending', // pending, accepted, rejected, completed
        date: '10 Şubat 2026',
        details: 'Kış Sezonu Tanıtımı - 1 Reels, 2 Story'
    },
    {
        id: '3',
        creator: 'Zeynep Akın',
        creatorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        type: 'campaign',
        budget: '8,000 TL',
        status: 'completed',
        date: '1 Şubat 2026',
        details: 'Yeni Ruj Serisi İncelemesi'
    },
    {
        id: '4',
        creator: 'Alara Şahin',
        creatorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
        type: 'gift',
        budget: null,
        status: 'rejected',
        date: '5 Şubat 2026',
        details: 'Parfüm Koleksiyonu Ön Gösterimi'
    }
];

export default function AgreementsPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

    const filteredAgreements = MOCK_AGREEMENTS.filter(a => activeTab === 'all' ? true : activeTab === 'completed' ? (a.status === 'completed' || a.status === 'rejected') : a.status === activeTab);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span style={{ padding: '6px 12px', background: '#fff3cd', color: '#856404', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={14} /> Beklemede</span>;
            case 'accepted': return <span style={{ padding: '6px 12px', background: '#d4edda', color: '#155724', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={14} /> Kabul Edildi</span>;
            case 'completed': return <span style={{ padding: '6px 12px', background: '#cce5ff', color: '#004085', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Zap size={14} /> Tamamlandı</span>;
            case 'rejected': return <span style={{ padding: '6px 12px', background: '#f8d7da', color: '#721c24', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><XCircle size={14} /> Reddedildi</span>;
            default: return null;
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 5 }}>Anlaşmalar & CRM</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Gönderdiğiniz kampanya ve hediye tekliflerini yönetin.</p>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'black', color: 'white', padding: '12px 24px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    + Yeni Teklif Oluştur
                </button>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #eaeaea', marginBottom: 30 }}>
                {[
                    { id: 'all', label: 'Tümü', count: MOCK_AGREEMENTS.length },
                    { id: 'pending', label: 'Bekleyenler', count: MOCK_AGREEMENTS.filter(a => a.status === 'pending').length },
                    { id: 'accepted', label: 'Kabul Edilenler', count: MOCK_AGREEMENTS.filter(a => a.status === 'accepted').length },
                    { id: 'completed', label: 'Geçmiş Anlaşmalar', count: MOCK_AGREEMENTS.filter(a => a.status === 'completed' || a.status === 'rejected').length }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        style={{
                            padding: '10px 0 15px 0',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid black' : '2px solid transparent',
                            color: activeTab === tab.id ? 'black' : '#999',
                            fontWeight: activeTab === tab.id ? 700 : 500,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        }}
                    >
                        {tab.label}
                        <span style={{ background: activeTab === tab.id ? 'black' : '#eee', color: activeTab === tab.id ? 'white' : '#666', padding: '2px 8px', borderRadius: 12, fontSize: '0.75rem' }}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search and Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '10px 20px', borderRadius: 12, border: '1px solid #eaeaea', gap: 10, width: 300 }}>
                    <Search size={16} color="#999" />
                    <input type="text" placeholder="Kreatör veya kampanya ara..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.9rem' }} />
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', padding: '10px 20px', borderRadius: 12, border: '1px solid #eaeaea', cursor: 'pointer', color: '#666', fontWeight: 500 }}>
                    <Filter size={16} /> Filtrele
                </button>
            </div>

            {/* Agreements List (Table format disguised as cards) */}
            <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, overflow: 'hidden' }}>
                {filteredAgreements.length === 0 ? (
                    <div style={{ padding: 60, textAlign: 'center', color: '#999' }}>Bu kategoride anlaşma bulunamadı.</div>
                ) : (
                    filteredAgreements.map((agreement, i) => (
                        <div key={agreement.id} style={{ display: 'flex', alignItems: 'center', padding: 20, borderBottom: i < filteredAgreements.length - 1 ? '1px solid #eaeaea' : 'none', transition: 'background 0.2s' }}>

                            {/* Creator Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 15, width: '25%' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                                    <Image src={agreement.creatorImage} alt={agreement.creator} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{agreement.creator}</div>
                                    <div style={{ color: '#999', fontSize: '0.85rem' }}>{agreement.date}</div>
                                </div>
                            </div>

                            {/* Details */}
                            <div style={{ flex: 1, paddingRight: 20 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>{agreement.details}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666', fontSize: '0.85rem' }}>
                                    {agreement.type === 'gift' ? <Gift size={14} color="#e67e22" /> : <Zap size={14} color="#9b59b6" />}
                                    {agreement.type === 'gift' ? 'Hediye Gönderimi' : 'Bütçeli Kampanya'}
                                    {agreement.budget && <span style={{ fontWeight: 700, color: 'black', marginLeft: 10 }}>({agreement.budget})</span>}
                                </div>
                            </div>

                            {/* Status */}
                            <div style={{ width: '15%', display: 'flex', justifyContent: 'center' }}>
                                {getStatusBadge(agreement.status)}
                            </div>

                            {/* Actions */}
                            <div style={{ width: '10%', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                <button style={{ width: 40, height: 40, borderRadius: '50%', background: '#f9f9f9', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}>
                                    <MessageCircle size={18} />
                                </button>
                                <button style={{ width: 40, height: 40, borderRadius: '50%', background: '#f9f9f9', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}>
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

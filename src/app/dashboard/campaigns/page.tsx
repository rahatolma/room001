'use client';

import React, { useState } from 'react';
import { Megaphone, Calendar, Users, Target, ArrowRight, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';
import Button from '@/components/Button';
import Image from 'next/image';

export default function BrandCampaignsPage() {
    const [activeTab, setActiveTab] = useState('active');

    const CAMPAIGNS = [
        {
            id: 'CMP-001',
            title: 'İlkbahar/Yaz 2026 Ön Gösterimi',
            type: 'Gifting & Komisyon',
            budget: '₺50,000',
            status: 'active',
            progress: 75,
            participants: 45,
            clicks: '12.4K',
            sales: '₺320,500',
            image: 'https://images.unsplash.com/photo-1469334026194-9ebd1cbfa524?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 'CMP-002',
            title: 'Sevgililer Günü Özel İndirim Kodu',
            type: 'Sadece Komisyon',
            budget: 'Sınırsız',
            status: 'active',
            progress: 40,
            participants: 120,
            clicks: '45.1K',
            sales: '₺1.2M',
            image: 'https://images.unsplash.com/photo-1518199266791-5375a83164ba?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 'CMP-003',
            title: 'Kış Sonu Fırsatları',
            type: 'Sabit Ücret + Komisyon',
            budget: '₺100,000',
            status: 'ended',
            progress: 100,
            participants: 80,
            clicks: '89.2K',
            sales: '₺2.4M',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400'
        }
    ];

    const filteredCampaigns = CAMPAIGNS.filter(c =>
        activeTab === 'all' ||
        (activeTab === 'active' && c.status === 'active') ||
        (activeTab === 'ended' && c.status === 'ended')
    );

    return (
        <div style={{ paddingBottom: 60 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1 }}>Kampanyalar</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', margin: 0, lineHeight: 1.5 }}>İşbirliklerini oluştur, yönet ve performanslarını canlı izle.</p>
                </div>
                <Button style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48, padding: '0 24px' }}>
                    <Megaphone size={18} /> Yeni Kampanya Oluştur
                </Button>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
                <div style={{ padding: 25, background: 'linear-gradient(135deg, #111 0%, #333 100%)', color: 'white', borderRadius: 16 }}>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Aktif Kampanyalar</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>2</div>
                </div>
                <div style={{ padding: 25, background: 'white', border: '1px solid #eaeaea', borderRadius: 16 }}>
                    <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Toplam Tıklama</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>57.5K</div>
                </div>
                <div style={{ padding: 25, background: 'white', border: '1px solid #eaeaea', borderRadius: 16 }}>
                    <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Büyüttüğün Satış (Bu Ay)</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#16a34a' }}>₺1.52M</div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 30, borderBottom: '1px solid #eaeaea', marginBottom: 30 }}>
                <button
                    onClick={() => setActiveTab('all')}
                    style={{ background: 'none', border: 'none', padding: '0 0 15px 0', fontSize: '1rem', fontWeight: 600, color: activeTab === 'all' ? '#111' : '#999', borderBottom: activeTab === 'all' ? '2px solid #111' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    Tümü
                </button>
                <button
                    onClick={() => setActiveTab('active')}
                    style={{ background: 'none', border: 'none', padding: '0 0 15px 0', fontSize: '1rem', fontWeight: 600, color: activeTab === 'active' ? '#111' : '#999', borderBottom: activeTab === 'active' ? '2px solid #111' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    Aktif Olanlar
                </button>
                <button
                    onClick={() => setActiveTab('ended')}
                    style={{ background: 'none', border: 'none', padding: '0 0 15px 0', fontSize: '1rem', fontWeight: 600, color: activeTab === 'ended' ? '#111' : '#999', borderBottom: activeTab === 'ended' ? '2px solid #111' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    Tamamlananlar
                </button>
            </div>

            {/* Campaigns Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 25 }}>
                {filteredCampaigns.map(camp => (
                    <div key={camp.id} style={{ background: 'white', borderRadius: 16, border: '1px solid #eaeaea', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                        {/* Image Header */}
                        <div style={{ position: 'relative', height: 160 }}>
                            <Image src={camp.image} alt={camp.title} fill style={{ objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                            <div style={{ position: 'absolute', top: 15, right: 15, display: 'flex', gap: 8 }}>
                                <span style={{ background: camp.status === 'active' ? '#16a34a' : '#666', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    {camp.status === 'active' ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                                    {camp.status === 'active' ? 'Aktif' : 'Bitti'}
                                </span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 15, left: 15 }}>
                                <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.3)' }}>
                                    {camp.type}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: 25, flex: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 15px 0', lineHeight: 1.4 }}>{camp.title}</h3>

                            {/* Meta */}
                            <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666', fontSize: '0.85rem' }}>
                                    <Target size={16} /> Bütçe: <strong style={{ color: '#111' }}>{camp.budget}</strong>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666', fontSize: '0.85rem' }}>
                                    <Users size={16} /> Katılımcı: <strong style={{ color: '#111' }}>{camp.participants}</strong>
                                </div>
                            </div>

                            {/* Mini Stats Line */}
                            <div style={{ padding: 15, background: '#f9f9f9', borderRadius: 8, display: 'flex', justifyContent: 'space-between', marginBottom: 20, border: '1px solid #f0f0f0' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Tıklama</div>
                                    <div style={{ fontWeight: 700 }}>{camp.clicks}</div>
                                </div>
                                <div style={{ width: 1, background: '#ddd' }} />
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>Sağlanan Ciro</div>
                                    <div style={{ fontWeight: 700, color: '#16a34a' }}>{camp.sales}</div>
                                </div>
                            </div>

                            {/* Progress */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: 8, color: '#555' }}>
                                    <span>Bütçe Durumu</span>
                                    <span>%{camp.progress}</span>
                                </div>
                                <div style={{ width: '100%', height: 6, background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: `${camp.progress}%`, height: '100%', background: camp.progress === 100 ? '#666' : 'black' }} />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ padding: '15px 25px', borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa' }}>
                            <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                                <MoreHorizontal size={20} />
                            </button>
                            <Button variant="outline" style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                Raporları İncele <ArrowRight size={14} />
                            </Button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

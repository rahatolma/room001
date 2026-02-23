'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import { CreditCard, Wallet, Instagram, Link2, Check, Loader2, Store } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ConnectedAccountsPage() {
    const [connectingId, setConnectingId] = useState<string | null>(null);
    const [connectedAccounts, setConnectedAccounts] = useState<string[]>(['stripe']); // Mock initial state

    const handleConnect = (id: string, name: string) => {
        if (connectedAccounts.includes(id)) {
            // Disconnect mock
            if (confirm(`${name} bağlantısını kesmek istediğinize emin misiniz?`)) {
                setConnectedAccounts(prev => prev.filter(a => a !== id));
                toast.success(`${name} bağlantısı kesildi.`);
            }
            return;
        }

        // Connect mock
        setConnectingId(id);
        setTimeout(() => {
            setConnectedAccounts(prev => [...prev, id]);
            setConnectingId(null);
            toast.success(`${name} başarıyla bağlandı!`);
        }, 1500);
    };

    const platforms = [
        { id: 'instagram', name: 'Instagram', description: 'Gönderi ve hikayelerine ürün ekle', icon: <Instagram size={28} />, color: '#E1306C' },
        { id: 'tiktok', name: 'TikTok', description: 'TikTok videolarından satış yap', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 013.183-4.51v-3.5a6.329 6.329 0 00-5.394 10.692 6.33 6.33 0 0010.857-4.424V8.687a8.182 8.182 0 004.773 1.526V6.79a4.831 4.831 0 01-1.003-.104z" /></svg>, color: '#000000' },
        { id: 'dolap', name: 'Dolap', description: 'Dolap mağazanı entegre et', icon: <Store size={28} />, color: '#f36f21' },
        { id: 'gardrops', name: 'Gardrops', description: 'İkinci el ürünlerini listele', icon: <Store size={28} />, color: '#ff3366' },
    ];

    return (
        <div style={{ paddingBottom: 100, maxWidth: 1000 }}>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: 50, letterSpacing: -0.5 }}>Entegrasyonlar</h1>

            {/* PAYMENT METHODS SECTION */}
            <div style={{ marginBottom: 60 }}>
                <div style={{ marginBottom: 25 }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 10 }}>Ödeme Yöntemleri</h2>
                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>
                        Kazançlarını alabilmek için IBAN, Stripe veya PayPal hesabını bağla.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {/* IBAN Mock */}
                    <div style={{ border: '1px solid #eaeaea', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 20, background: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Banka Hesabı (IBAN)</h3>
                                <p style={{ fontSize: '0.8rem', color: '#999', margin: '4px 0 0 0' }}>Türkiye içi transfer</p>
                            </div>
                        </div>
                        <Button variant="outline" style={{ width: '100%', fontSize: '0.85rem' }}>DÜZENLE</Button>
                    </div>

                    {/* Stripe */}
                    <div style={{ border: '1px solid #eaeaea', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 20, background: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#635bff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Stripe</h3>
                                <p style={{ fontSize: '0.8rem', color: '#999', margin: '4px 0 0 0' }}>Uluslararası ödemeler</p>
                            </div>
                        </div>
                        <Button style={{ width: '100%', background: connectedAccounts.includes('stripe') ? '#f0f0f0' : '#635bff', color: connectedAccounts.includes('stripe') ? 'black' : 'white', border: 'none', fontSize: '0.85rem' }}>
                            {connectedAccounts.includes('stripe') ? 'BAĞLI' : 'BAĞLA'}
                        </Button>
                    </div>

                    {/* PayPal */}
                    <div style={{ border: '1px solid #eaeaea', borderRadius: 12, padding: 25, display: 'flex', flexDirection: 'column', gap: 20, background: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#003087', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>PayPal</h3>
                                <p style={{ fontSize: '0.8rem', color: '#999', margin: '4px 0 0 0' }}>Global bakiye</p>
                            </div>
                        </div>
                        <Button variant="outline" style={{ width: '100%', fontSize: '0.85rem' }}>BAĞLA</Button>
                    </div>
                </div>
            </div>


            {/* PLATFORMS SECTION */}
            <div>
                <div style={{ marginBottom: 25 }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 10 }}>Sosyal & Satış Platformları</h2>
                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6 }}>
                        Hesaplarını bağlayarak içeriklerini ve ürünlerini otomatik senkronize et.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {platforms.map(p => {
                        const isConnected = connectedAccounts.includes(p.id);
                        const isConnecting = connectingId === p.id;

                        return (
                            <div key={p.id} style={{
                                border: isConnected ? `2px solid ${p.color}40` : '1px solid #eaeaea',
                                borderRadius: 12,
                                padding: 25,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 20,
                                background: isConnected ? `${p.color}05` : 'white',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Connection Indicator */}
                                {isConnected && (
                                    <div style={{ position: 'absolute', top: 15, right: 15, color: p.color }}>
                                        <Check size={20} />
                                    </div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                    <div style={{ width: 50, height: 50, borderRadius: 12, background: isConnected ? p.color : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isConnected ? 'white' : '#666', transition: 'all 0.3s ease' }}>
                                        {p.icon}
                                    </div>
                                    <div style={{ paddingRight: 20 }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: isConnected ? '#111' : '#333' }}>{p.name}</h3>
                                        <p style={{ fontSize: '0.75rem', color: '#888', margin: '4px 0 0 0', lineHeight: 1.4 }}>{p.description}</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => handleConnect(p.id, p.name)}
                                    disabled={isConnecting}
                                    style={{
                                        width: '100%',
                                        background: isConnected ? 'transparent' : (isConnecting ? '#f5f5f5' : p.color),
                                        color: isConnected ? '#666' : (isConnecting ? '#999' : 'white'),
                                        border: isConnected ? '1px solid #ddd' : 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 8,
                                        boxShadow: (!isConnected && !isConnecting) ? `0 4px 12px ${p.color}30` : 'none'
                                    }}
                                >
                                    {isConnecting ? <><Loader2 size={16} className="animate-spin" /> BAĞLANIYOR...</>
                                        : isConnected ? 'BAĞLANTIYI KES'
                                            : 'BAĞLA'}
                                </Button>

                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}

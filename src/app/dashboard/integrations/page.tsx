"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import Link from 'next/link';

export default function IntegrationsPage() {
    const { user, updateProfile } = useAuth();
    const [instagramConnected, setInstagramConnected] = useState(user?.instagramConnected || false);
    const [tiktokConnected, setTiktokConnected] = useState(false); // Mock

    const handleToggleInstagram = async () => {
        if (!instagramConnected) {
            const username = prompt("Instagram Kullanıcı Adınızı Giriniz (Örn: sofia, shop, test, pro):");
            if (!username) return;

            // Simulating API Check
            const confirmMsg = `"${username}" kullanıcısı için sistem kontrolü yapılıyor...`;
            alert(confirmMsg);

            // Mock Rule: Pass if username includes "pro" or "shop" or "test" or "sofia", fail otherwise
            let mockFollowers = 0;
            if (username.toLowerCase().includes('pro') || username.toLowerCase().includes('shop') || username.toLowerCase().includes('test') || username.toLowerCase() === 'sofia') {
                mockFollowers = 15000 + Math.floor(Math.random() * 10000); // 15k - 25k
            } else {
                mockFollowers = Math.floor(Math.random() * 9000); // 0 - 9k
            }

            if (mockFollowers < 10000) {
                alert(`HATA: "${username}" kullanıcısının takipçi sayısı (${mockFollowers.toLocaleString()}) yetersiz! \nSisteme kabul edilmek için minimum 10.000 takipçi gerekmektedir. \n(İpucu: Test için 'sofia' veya 'pro' kullanıcı adını deneyin)`);
                return;
            }

            alert(`BAŞARILI! \nKullanıcı: ${username} \nTakipçi Sayısı: ${mockFollowers.toLocaleString()} \nSisteme hoşgeldiniz.`);
        }

        const newState = !instagramConnected;
        setInstagramConnected(newState);
        await updateProfile({ instagramConnected: newState });
    };

    const handleToggleTiktok = () => {
        if (!tiktokConnected) {
            const username = prompt("TikTok Kullanıcı Adınızı Giriniz:");
            if (!username) return;

            alert(`"${username}" kullanıcısı için sistem kontrolü yapılıyor...`);

            let mockFollowers = 0;
            if (username.toLowerCase().includes('pro') || username.toLowerCase().includes('shop') || username.toLowerCase().includes('test') || username.toLowerCase() === 'sofia') {
                mockFollowers = 25000 + Math.floor(Math.random() * 10000);
            } else {
                mockFollowers = Math.floor(Math.random() * 5000);
            }

            if (mockFollowers < 10000) {
                alert(`HATA: "${username}" kullanıcısının takipçi sayısı (${mockFollowers.toLocaleString()}) yetersiz! \nMinimum 10.000 takipçi gerekmektedir.`);
                return;
            }
            alert(`BAŞARILI! \nKullanıcı: ${username} \nTakipçi: ${mockFollowers.toLocaleString()}`);
        }
        setTiktokConnected(!tiktokConnected);
        // In real app, update DB
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 10 }}>Entegrasyonlar</h1>
            <p style={{ color: '#666', marginBottom: 40 }}>Sosyal medya hesaplarınızı bağlayarak içeriğinizi otomatik olarak senkronize edin.</p>

            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', overflow: 'hidden' }}>
                {/* Instagram */}
                <div style={{ padding: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 50, height: 50, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 5 }}>Instagram</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Profilinizde Instagram akışınızı gösterin ve ürün etiketleyin.</p>
                        </div>
                    </div>
                    <Button
                        variant={instagramConnected ? "outline" : "primary"}
                        onClick={handleToggleInstagram}
                    >
                        {instagramConnected ? 'Bağlantıyı Kes' : 'Bağla'}
                    </Button>
                </div>

                {/* Tiktok */}
                <div style={{ padding: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 50, height: 50, background: 'black', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 5 }}>TikTok</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>TikTok videolarınızı mağazanızda sergileyin.</p>
                        </div>
                    </div>
                    <Button
                        variant={tiktokConnected ? "outline" : "primary"}
                        onClick={handleToggleTiktok}
                    >
                        {tiktokConnected ? 'Bağlantıyı Kes' : 'Bağla'}
                    </Button>
                </div>

                {/* Dolap */}
                <div style={{ padding: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 50, height: 50, background: '#4cf', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            {/* Dolap Icon (Shopping Bag style) */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 5 }}>Dolap</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Dolap hesabınızı bağlayarak ürünlerinizi burada sergileyin.</p>
                            {user?.dolapAccountUrl && <a href={user.dolapAccountUrl} target="_blank" style={{ fontSize: '0.8rem', color: '#4cf' }}>Profil Linki: {user.dolapAccountUrl}</a>}
                        </div>
                    </div>
                    <Button
                        variant={user?.dolapAccountUrl ? "outline" : "primary"}
                        onClick={() => {
                            if (user?.dolapAccountUrl) {
                                if (confirm('Bağlantıyı kesmek istediğinize emin misiniz?')) updateProfile({ dolapAccountUrl: null as any });
                            } else {
                                const url = prompt('Dolap Profil Linkinizi Giriniz (https://dolap.com/profil/...):');
                                if (url) updateProfile({ dolapAccountUrl: url });
                            }
                        }}
                    >
                        {user?.dolapAccountUrl ? 'Kaldır' : 'Bağla'}
                    </Button>
                </div>

                {/* Gardrops */}
                <div style={{ padding: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 50, height: 50, background: '#f55', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            {/* Gardrops Icon (Hanger/Shirt style) */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 5 }}>Gardrops</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Gardrops dolabınızı profilinize bağlayın.</p>
                            {user?.gardropsAccountUrl && <a href={user.gardropsAccountUrl} target="_blank" style={{ fontSize: '0.8rem', color: '#f55' }}>Profil Linki: {user.gardropsAccountUrl}</a>}
                        </div>
                    </div>
                    <Button
                        variant={user?.gardropsAccountUrl ? "outline" : "primary"}
                        onClick={() => {
                            if (user?.gardropsAccountUrl) {
                                if (confirm('Bağlantıyı kesmek istediğinize emin misiniz?')) updateProfile({ gardropsAccountUrl: null as any });
                            } else {
                                const url = prompt('Gardrops Profil Linkinizi Giriniz (https://gardrops.com/...):');
                                if (url) updateProfile({ gardropsAccountUrl: url });
                            }
                        }}
                    >
                        {user?.gardropsAccountUrl ? 'Kaldır' : 'Bağla'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

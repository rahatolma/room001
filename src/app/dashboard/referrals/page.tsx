'use client';

import React from 'react';
import { Users, Copy, Gift, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function ReferralsPage() {
    const referralLink = "https://room001.com/invite/stil_ikonu";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success("Davet bağlantısı kopyalandı!");
    };

    return (
        <div style={{ padding: '0 40px 60px', maxWidth: 1000 }}>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 10, letterSpacing: '-0.5px' }}>Tavsiye Et & Kazan</h1>
                <p style={{ color: '#666', fontSize: '1.05rem' }}>Ağınızı genişletin ve platforma davet ettiğiniz her yeni Insider için komisyon kazanın.</p>
            </div>

            {/* Main Stats / Link Card */}
            <div style={{
                background: 'white',
                borderRadius: 16,
                padding: 40,
                border: '1px solid #eaeaea',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                marginBottom: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 30
            }}>
                <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Gift size={24} color="#111" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 5 }}>Davet Bağlantınız</h2>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Bu bağlantıyı kullanarak kayıt olan her Insider üzerinden %5 ekstra kazanç sağlayın.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f9f9f9', border: '1px solid #eee', padding: '12px 20px', borderRadius: 8 }}>
                        <span style={{ flex: 1, fontFamily: 'monospace', color: '#333', fontSize: '0.95rem' }}>{referralLink}</span>
                        <button onClick={copyToClipboard} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: '#111', fontWeight: 600, cursor: 'pointer', padding: '5px 10px' }}>
                            <Copy size={16} /> Kopyala
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 40, flex: '0 1 auto' }}>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>Davet Edilenler</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111' }}>12</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>Tahmini Kazanç</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#16a34a' }}>₺4,250</div>
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20 }}>Nasıl Çalışır?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div style={{ padding: 25, background: '#fafafa', borderRadius: 12, border: '1px solid #eee' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 15 }}>1</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>Bağlantıyı Paylaşın</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>Size özel oluşturulan davet bağlantısını sosyal medyada veya doğrudan arkadaşlarınızla paylaşın.</p>
                </div>
                <div style={{ padding: 25, background: '#fafafa', borderRadius: 12, border: '1px solid #eee' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 15 }}>2</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>Kayıt Olsunlar</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>Davet ettiğiniz kişiler bağlantıya tıklayarak ROOM001'e Insider olarak katılsınlar.</p>
                </div>
                <div style={{ padding: 25, background: '#fafafa', borderRadius: 12, border: '1px solid #eee' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 15 }}>3</div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>Kazanın</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>Davet ettiğiniz kişilerin elde ettiği gelirin %5'i kadar ilk 6 ay boyunca komisyon kazanın.</p>
                </div>
            </div>
        </div>
    );
}

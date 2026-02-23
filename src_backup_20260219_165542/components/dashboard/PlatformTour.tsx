"use client";

import React, { useState } from 'react';
import { X, Briefcase, Share2, TrendingUp, ArrowRight } from 'lucide-react';

export default function PlatformTour() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div style={{
            marginBottom: 40,
            background: 'linear-gradient(135deg, #111 0%, #333 100%)',
            borderRadius: 20,
            padding: '40px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Close Button */}
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    position: 'absolute', top: 20, right: 20,
                    background: 'rgba(255,255,255,0.1)', border: 'none',
                    borderRadius: '50%', width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', cursor: 'pointer', transition: 'background 0.2s'
                }}
            >
                <X size={16} />
            </button>

            {/* Background Decoration */}
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: -30, left: 100, width: 150, height: 150, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />

            {/* Header */}
            <div style={{ marginBottom: 40, position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 10 }}>Room001 Creator Vizyonu</h2>
                <p style={{ color: '#ccc', maxWidth: 600, fontSize: '1.1rem', lineHeight: 1.6 }}>
                    Burası sadece link paylaşılan bir yer değil. Burası senin <b>dijital medya şirketin.</b>
                    İçerik üreticiliğini bir üst seviyeye taşıyacak özelliklerin gücünü keşfet.
                </p>
            </div>

            {/* Cards Container */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, position: 'relative', zIndex: 2 }}>

                {/* 1. Medya Kiti */}
                <div className="tour-card" style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 16, padding: 25, backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease'
                }}>
                    <div style={{
                        width: 50, height: 50, background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                        borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                    }}>
                        <Briefcase size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: 10 }}>Profesyonel Kimlik</h3>
                    <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: 1.5, marginBottom: 20 }}>
                        Artık markalara PDF gönderme devri bitti. Canlı verilerle güncellenen <b>Medya Kiti</b>'n, senin CV'n ve portfolyon. Onlara profesyonel kimliğini tek linkle sun.
                    </p>
                    <a href="/dashboard/media-kit" style={{ color: '#a855f7', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                        Medya Kitini İncele <ArrowRight size={16} />
                    </a>
                </div>

                {/* 2. Entegrasyonlar */}
                <div className="tour-card" style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 16, padding: 25, backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        width: 50, height: 50, background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
                        borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                    }}>
                        <Share2 size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: 10 }}>Tam Entegrasyon</h3>
                    <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: 1.5, marginBottom: 20 }}>
                        Sosyal medyanı bağla, kombinlerini sergile. Sadece yeni ürünler değil, <b>Dolap ve Gardrops</b> entegrasyonu ile ikinci el ürünlerini de vitrine koyup satışını yap.
                    </p>
                    <a href="/dashboard/integrations" style={{ color: '#f97316', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                        Hesaplarını Bağla <ArrowRight size={16} />
                    </a>
                </div>

                {/* 3. Öne Çıkar */}
                <div className="tour-card" style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 16, padding: 25, backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        width: 50, height: 50, background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
                        borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
                    }}>
                        <TrendingUp size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: 10 }}>Markanı Büyüt</h3>
                    <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: 1.5, marginBottom: 20 }}>
                        Kürasyonların milyonlara ulaşsın. <b>Öne Çıkar</b> paketleri ile keşfet sayfasında ve aramalarda en üst sırada yer alarak marka bilinirliğini katla.
                    </p>
                    <a href="/dashboard/promote" style={{ color: '#eab308', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                        Paketleri Gör <ArrowRight size={16} />
                    </a>
                </div>

            </div>
        </div>
    );
}

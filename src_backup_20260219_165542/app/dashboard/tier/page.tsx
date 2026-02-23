'use client';

import React from 'react';
import { Award, Lock, CheckCircle, Info } from 'lucide-react';

const TIERS = [
    { name: 'Enthusiast', minScore: 0, color: '#9e9e9e', benefits: ['Insider Erişim', 'Temel Analitik'] },
    { name: 'Ambassador', minScore: 40, color: '#f59e0b', benefits: ['Öncelikli Destek', 'Hediyeleşme', 'Fırsatlar'] },
    { name: 'Trendsetter', minScore: 70, color: '#ec4899', benefits: ['Premium İşbirlikleri', 'Özel Davetler', 'Ana Sayfada Gösterim'] },
    { name: 'Icon', minScore: 90, color: '#8b5cf6', benefits: ['Kişisel Hesap Yöneticisi', 'Global Kampanyalar', 'Verified Rozeti'] }
];

const METRICS = [
    { name: 'Profil Tamamlama', score: 20, max: 20 },
    { name: 'Aylık Trafik', score: 15, max: 30 },
    { name: 'Satış Performansı', score: 10, max: 30 },
    { name: 'Düzenli Aktivite', score: 10, max: 20 },
];

const ProgressBar = ({ progress }: { progress: number }) => (
    <div style={{ width: '100%', height: 10, background: '#eee', borderRadius: 5, overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #333, #000)', transition: 'width 0.5s ease-out' }} />
    </div>
);

export default function CreatorTierPage() {
    // Mock Data
    const currentScore = 55;
    const currentTierIndex = TIERS.findIndex((t, i) => currentScore >= t.minScore && (TIERS[i + 1] ? currentScore < TIERS[i + 1].minScore : true));
    const currentTier = TIERS[currentTierIndex];
    const nextTier = TIERS[currentTierIndex + 1] || currentTier;

    const pointsToNext = nextTier !== currentTier ? nextTier.minScore - currentScore : 0;
    const progressPercentage = nextTier !== currentTier
        ? ((currentScore - currentTier.minScore) / (nextTier.minScore - currentTier.minScore)) * 100
        : 100;

    const displayPoints = currentScore; // Can be formatted

    return (
        <div style={{ maxWidth: 1000, paddingBottom: 60 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 30 }}>
                <div style={{ width: 50, height: 50, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={24} color="#333" />
                </div>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Insider Seviyesi</h1>
                    <p style={{ color: '#666', marginTop: 5 }}>Bir sonraki seviyeye yükselmek ve yeni ayrıcalıklar kazanmak için performansını artır.</p>
                </div>
            </div>

            {/* Current Level Card */}
            <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eaeaea', marginBottom: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>MEVCUT SEVİYE</div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#000' }}>{currentTier.name}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#000' }}>{displayPoints}</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>TOPLAM PUAN</div>
                    </div>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <ProgressBar progress={progressPercentage} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666' }}>
                    <span>{currentTier.name} ({currentTier.minScore})</span>
                    <span>{nextTier.name} ({nextTier.minScore})</span>
                </div>

                {pointsToNext > 0 && (
                    <div style={{ marginTop: 20, padding: 15, background: '#f9f9f9', borderRadius: 8, fontSize: '0.9rem', color: '#555', display: 'flex', gap: 10, alignItems: 'center' }}>
                        <Info size={18} />
                        <span>Sonraki seviye olan <strong>{nextTier.name}</strong> için <strong>{pointsToNext}</strong> puana daha ihtiyacın var.</span>
                    </div>
                )}
            </div>

            {/* Benefits Table */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eaeaea', overflow: 'hidden', marginBottom: 30 }}>
                <div style={{ padding: '20px 30px', borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>Seviye Ayrıcalıkları</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    {TIERS.map((tier, idx) => {
                        const isUnlocked = currentScore >= tier.minScore;
                        return (
                            <div key={idx} style={{
                                padding: 20,
                                borderRight: idx !== TIERS.length - 1 ? '1px solid #eaeaea' : 'none',
                                background: isUnlocked ? 'white' : '#fcfcfc',
                                opacity: isUnlocked ? 1 : 0.6
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 15 }}>
                                    {isUnlocked ? <CheckCircle size={18} color="green" /> : <Lock size={18} color="#999" />}
                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: isUnlocked ? 'black' : '#666' }}>{tier.name}</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {tier.benefits.map((benefit, bIdx) => (
                                        <li key={bIdx} style={{ fontSize: '0.9rem', marginBottom: 8, color: '#555', display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 4, height: 4, background: '#999', borderRadius: '50%' }} />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Calculation Logic */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eaeaea', overflow: 'hidden' }}>
                <div style={{ padding: '20px 30px', borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>Puanlama Metrikleri</h2>
                </div>
                <div style={{ padding: 30 }}>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 30 }}>
                        Puanınızı aşağıdaki özelliklere göre 100 puanlık bir ölçekte hesaplıyoruz. Detaylı bilgi için <a href="#" style={{ textDecoration: 'underline', color: '#1a1a1a' }}>tıklayın</a>.
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {METRICS.map((metric, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }}>
                                <span style={{ fontWeight: 500 }}>{metric.name}</span>
                                <span style={{ display: 'flex', gap: 5 }}>
                                    <strong>{metric.score}</strong> <span style={{ color: '#999' }}>/ {metric.max}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

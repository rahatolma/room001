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
    // GAMIFICATION STATE
    const [quests, setQuests] = React.useState([
        { id: 'q1', title: 'Profilini Tamamla', desc: 'Biyografi ve iletişim bilgilerini gir.', points: 10, completed: true, link: '/dashboard/settings' },
        { id: 'q2', title: 'İlk Ürün Seçkisini (Koleksiyon) Oluştur', desc: 'Takipçilerin için 5 favori ürününü bir araya getir.', points: 15, completed: true, link: '/dashboard/store' },
        { id: 'q3', title: 'Medya Kitini Doldur', desc: 'Audience verilerini girerek markalara kendini göster.', points: 15, completed: false, link: '/dashboard/media-kit' },
        { id: 'q4', title: 'TikTok veya Instagram Bağla', desc: 'Analitik için sosyal hesaplarını bağla.', points: 20, completed: false, link: '/dashboard/connected-accounts' },
        { id: 'q5', title: 'İlk Satışını (Dönüşüm) Gerçekleştir', desc: 'Linklerinden ilk komisyonunu kazan.', points: 30, completed: false, link: '/dashboard/analytics' },
    ]);

    const [claimedRewards, setClaimedRewards] = React.useState<string[]>([]);

    // CALCULATE SCORE DYNAMICALLY BASED ON QUESTS
    const baseScore = 15; // Starting points
    const earnedPoints = quests.filter(q => q.completed).reduce((sum, q) => sum + q.points, 0);
    const currentScore = baseScore + earnedPoints;

    const currentTierIndex = TIERS.findIndex((t, i) => currentScore >= t.minScore && (TIERS[i + 1] ? currentScore < TIERS[i + 1].minScore : true));
    const currentTier = TIERS[currentTierIndex];
    const nextTier = TIERS[currentTierIndex + 1] || currentTier;

    const pointsToNext = nextTier !== currentTier ? nextTier.minScore - currentScore : 0;
    const progressPercentage = nextTier !== currentTier
        ? ((currentScore - currentTier.minScore) / (nextTier.minScore - currentTier.minScore)) * 100
        : 100;

    // ACTIONS
    const handleClaim = (tierName: string) => {
        if (!claimedRewards.includes(tierName)) {
            setClaimedRewards([...claimedRewards, tierName]);
            // Dynamically import toast if needed, assuming it's available globally or we can use a native alert for simplicity in this mock
            // But we can import it at the top
            import('react-hot-toast').then(m => m.toast.success(`${tierName} ödülleri kalıcı olarak açıldı! 🎉`));
        }
    };

    const handleQuestClick = (quest: any) => {
        if (quest.completed) return;
        // Simulate completing a quest for demo purposes
        const newQuests = quests.map(q => q.id === quest.id ? { ...q, completed: true } : q);
        setQuests(newQuests);
        import('react-hot-toast').then(m => m.toast.success(`Tebrikler! +${quest.points} XP Kazandın! 🏆`));
    };

    return (
        <div style={{ maxWidth: 1000, paddingBottom: 60 }}>
            {/* GAMIFIED HEADER ZONE */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: 'white',
                padding: '40px',
                borderRadius: 16,
                marginBottom: 30,
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, letterSpacing: 1, marginBottom: 15, border: '1px solid rgba(255,255,255,0.2)' }}>
                        MEVCUT STATÜ
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: -1, background: `linear-gradient(to right, #fff, ${currentTier.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {currentTier.name}
                    </h1>
                    <p style={{ fontSize: '1rem', color: '#94a3b8', margin: 0, maxWidth: 400, lineHeight: 1.5 }}>
                        Platform içi ayrıcalıklarını ve marka görünürlüğünü artırmak için görevleri tamamla.
                    </p>
                </div>

                <div style={{ width: 350, background: 'rgba(255,255,255,0.05)', padding: 25, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{currentScore} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>XP</span></span>

                        {pointsToNext > 0 ? (
                            <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 600 }}>{nextTier.name} için +{pointsToNext} XP</span>
                        ) : (
                            <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>Maksimum Seviye!</span>
                        )}
                    </div>
                    <div style={{ width: '100%', height: 12, background: 'rgba(0,0,0,0.5)', borderRadius: 6, overflow: 'hidden', marginBottom: 10 }}>
                        <div style={{ width: `${progressPercentage}%`, height: '100%', background: currentTier.color, borderRadius: 6, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 0 10px ${currentTier.color}` }} />
                    </div>
                    {pointsToNext > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
                            <span>{currentTier.name}</span>
                            <span>{nextTier.name} ({nextTier.minScore} XP)</span>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 30 }}>
                {/* LEFT COL: QUESTS */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Aktif Görevler (Quests)</h2>
                        <span style={{ fontSize: '0.85rem', color: '#666', background: '#f1f5f9', padding: '4px 10px', borderRadius: 12 }}>Puan (XP) Kazan</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        {quests.map(quest => (
                            <div
                                key={quest.id}
                                onClick={() => handleQuestClick(quest)}
                                style={{
                                    background: quest.completed ? '#f8fafc' : 'white',
                                    border: `1px solid ${quest.completed ? '#e2e8f0' : '#eaeaea'}`,
                                    padding: 20,
                                    borderRadius: 12,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: quest.completed ? 'default' : 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: quest.completed ? 0.7 : 1
                                }}
                                className={quest.completed ? '' : 'hover:shadow-md hover:border-slate-300'}
                            >
                                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: '50%',
                                        background: quest.completed ? '#10b981' : '#f1f5f9',
                                        color: quest.completed ? 'white' : '#64748b',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {quest.completed ? <CheckCircle size={20} /> : <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>+{quest.points}</div>}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 600, color: quest.completed ? '#64748b' : '#0f172a', textDecoration: quest.completed ? 'line-through' : 'none' }}>
                                            {quest.title}
                                        </h4>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{quest.desc}</p>
                                    </div>
                                </div>
                                {!quest.completed && (
                                    <button style={{ background: '#0f172a', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                                        YAP
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COL: UNLOCKS & REWARDS */}
                <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 20px 0' }}>Seviye Ödülleri</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        {[...TIERS].reverse().map((tier, idx) => {
                            const isUnlocked = currentScore >= tier.minScore;
                            const isCurrent = tier.name === currentTier.name;
                            const isClaimed = claimedRewards.includes(tier.name);

                            // Don't show claim logic for base tier
                            const showClaim = isUnlocked && tier.name !== 'Enthusiast';

                            return (
                                <div key={idx} style={{
                                    background: isUnlocked ? 'white' : '#f8fafc',
                                    border: `1px solid ${isCurrent ? tier.color : '#eaeaea'}`,
                                    borderRadius: 12,
                                    padding: '20px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {isCurrent && (
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: tier.color }} />
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            {isUnlocked ? <Award size={18} color={tier.color} /> : <Lock size={18} color="#94a3b8" />}
                                            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: isUnlocked ? '#0f172a' : '#94a3b8' }}>
                                                {tier.name}
                                            </h3>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: 10 }}>
                                            {tier.minScore} XP
                                        </span>
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 15px 0' }}>
                                        {tier.benefits.map((benefit, bIdx) => (
                                            <li key={bIdx} style={{ fontSize: '0.85rem', marginBottom: 6, color: isUnlocked ? '#475569' : '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <div style={{ width: 4, height: 4, background: isUnlocked ? tier.color : '#cbd5e1', borderRadius: '50%' }} />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>

                                    {showClaim && (
                                        <button
                                            onClick={() => handleClaim(tier.name)}
                                            disabled={isClaimed}
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                border: 'none',
                                                borderRadius: 6,
                                                fontSize: '0.85rem',
                                                fontWeight: 700,
                                                cursor: isClaimed ? 'default' : 'pointer',
                                                background: isClaimed ? '#f1f5f9' : tier.color,
                                                color: isClaimed ? '#10b981' : 'white',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 5
                                            }}
                                        >
                                            {isClaimed ? <><CheckCircle size={14} /> ÖDÜLLER AÇIK</> : 'AYRICALIKLARI TALEP ET'}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}

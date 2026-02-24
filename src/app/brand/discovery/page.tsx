'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, X, Star, MapPin, Instagram, Users, CheckCircle, Search, Filter, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { sendBrandOffer } from '@/actions/campaign';
import { getAllUsers } from '@/actions/admin';

// --- MOCK TALENT DATA ---
const MOCK_CREATORS = [
    {
        id: '1',
        name: 'Asena Sarıbatur',
        niche: 'Moda & Lüks Giyim',
        followers: '1.2M',
        location: 'İstanbul',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
        engagementRate: '4.8%',
        bio: 'Premium moda ve yaşam tarzı içerik üreticisi.'
    },
    {
        id: '2',
        name: 'Burak Yılmaz',
        niche: 'Seyahat & Yaşam Tarzı',
        followers: '850K',
        location: 'İzmir',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
        engagementRate: '5.2%',
        bio: 'Dünyayı gezen, anı yaşayan, ilham veren içerikler.'
    },
    {
        id: '3',
        name: 'Zeynep Akın',
        niche: 'Güzellik & Kozmetik',
        followers: '420K',
        location: 'Ankara',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
        engagementRate: '6.1%',
        bio: 'Makyaj ipuçları, cilt bakım rutinleri ve dürüst ürün incelemeleri.'
    }
];

export default function DiscoveryPage() {
    const { user } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationState, setAnimationState] = useState<'idle' | 'swipe-left' | 'swipe-right'>('idle');
    const [creators, setCreators] = useState<any[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [offerType, setOfferType] = useState<'gift' | 'campaign'>('gift');
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    React.useEffect(() => {
        const fetchCreators = async () => {
            const allUsers = await getAllUsers();
            const creatorUsers = allUsers.filter((u: any) => u.role === 'creator');

            const mapped = creatorUsers.map((u: any, index: number) => ({
                id: u.id,
                name: u.fullName || u.username,
                niche: u.niche || 'Moda & Yaşam Tarzı',
                followers: u.followersCount ? `${(u.followersCount / 1000).toFixed(1)}K` : '10K',
                location: 'Türkiye',
                image: u.profileImage || `https://images.unsplash.com/photo-${1500000000000 + index}?w=800&q=80`,
                engagementRate: '5.2%',
                bio: u.bio || 'Premium içerik üreticisi.'
            }));

            // If empty DB, fallback to MOCK
            setCreators(mapped.length > 0 ? mapped : MOCK_CREATORS);
            setIsDataLoaded(true);
        };
        fetchCreators();
    }, []);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (animationState !== 'idle' || currentIndex >= creators.length) return;

        setAnimationState(direction === 'left' ? 'swipe-left' : 'swipe-right');

        // Show mock match or toast
        if (direction === 'right') {
            toast.success(`${creators[currentIndex].name} favorilere eklendi!`, {
                icon: '💝',
                style: { borderRadius: '20px', background: '#333', color: '#fff' }
            });
        }

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setAnimationState('idle');
        }, 300); // Wait for CSS animation
    };

    const handleSendOffer = async () => {
        if (!message.trim() || !user) return;

        setIsSending(true);
        const creatorId = creators[currentIndex]?.id;

        const res = await sendBrandOffer(user.id, creatorId, offerType, message, budget ? Number(budget) : undefined);

        setIsSending(false);

        if (res.success) {
            toast.success('Teklif başarıyla gönderildi!', {
                icon: '📩',
                style: { borderRadius: '20px', background: '#333', color: '#fff' }
            });
            setShowModal(false);
            setMessage('');
            setBudget('');

            // Auto-swipe right after offer
            setTimeout(() => {
                handleSwipe('right');
            }, 500);
        } else {
            toast.error(res.error || 'Teklif gönderilirken hata oluştu.');
        }
    };

    if (!isDataLoaded) {
        return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" /> Yükleniyor...</div>;
    }

    if (currentIndex >= creators.length) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <CheckCircle size={64} color="#1abc9c" style={{ marginBottom: 20 }} />
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 10 }}>Havuzdaki Tüm Kreatörleri Gördünüz!</h2>
                <p style={{ color: '#666', textAlign: 'center', maxWidth: 400 }}>Yarın yeni yeteneklerle tekrar karşılaşmak için geri dönün ya da eşleşmelerinize mesaj gönderin.</p>
                <button
                    onClick={() => setCurrentIndex(0)}
                    style={{ marginTop: 30, padding: '12px 30px', background: '#000', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 600 }}
                >
                    Başa Dön
                </button>
            </div>
        );
    }

    const creator = creators[currentIndex];

    return (
        <div style={{ paddingBottom: 50 }}>
            {/* Header / Filter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 5 }}>Kreatör Keşfi</h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Markanız için en doğru kitleyle eşleşin.</p>
                </div>
                <div style={{ display: 'flex', gap: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '10px 20px', borderRadius: '30px', border: '1px solid #eaeaea', gap: 10 }}>
                        <Search size={16} color="#999" />
                        <input type="text" placeholder="İsim veya Niş ara..." style={{ border: 'none', outline: 'none', background: 'transparent', width: 200 }} />
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', padding: '10px 20px', borderRadius: '30px', border: '1px solid #eaeaea', cursor: 'pointer' }}>
                        <Filter size={16} /> Filtrele
                    </button>
                </div>
            </div>

            {/* Swipeable Card Area */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: 600 }}>

                <div
                    style={{
                        width: '100%',
                        maxWidth: 450,
                        height: '100%',
                        background: 'white',
                        borderRadius: 24,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s ease, opacity 0.3s ease',
                        transform: animationState === 'swipe-left' ? 'translateX(-150%) rotate(-10deg)' :
                            animationState === 'swipe-right' ? 'translateX(150%) rotate(10deg)' :
                                'translateX(0) rotate(0)',
                        opacity: animationState !== 'idle' ? 0 : 1,
                    }}
                >
                    {/* Creator Image */}
                    <div style={{ width: '100%', height: '65%', position: 'relative' }}>
                        <Image src={creator.image} alt={creator.name} fill style={{ objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />

                        <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 5, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{creator.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', fontWeight: 500 }}>
                                <MapPin size={14} /> {creator.location} • {creator.niche}
                            </div>
                        </div>
                    </div>

                    {/* Creator Details */}
                    <div style={{ padding: '25px 20px', display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <p style={{ color: '#444', lineHeight: 1.5, fontSize: '0.95rem', margin: 0 }}>
                            "{creator.bio}"
                        </p>

                        <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
                            <div style={{ flex: 1, background: '#f5f5f5', padding: '12px', borderRadius: 12, textAlign: 'center' }}>
                                <div style={{ color: '#666', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: 5 }}>TAKİPÇİ</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                    <Instagram size={16} /> {creator.followers}
                                </div>
                            </div>
                            <div style={{ flex: 1, background: '#f5f5f5', padding: '12px', borderRadius: 12, textAlign: 'center' }}>
                                <div style={{ color: '#666', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: 5 }}>ETKİLEŞİM</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                    <Star size={16} color="#f1c40f" fill="#f1c40f" /> {creator.engagementRate}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Floating Action Buttons */}
                <div style={{ position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 20, zIndex: 10 }}>
                    <button
                        onClick={() => handleSwipe('left')}
                        style={{
                            width: 64, height: 64, borderRadius: '50%', background: 'white', border: 'none',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <X size={32} color="#fd5c63" />
                    </button>

                    <button
                        onClick={() => handleSwipe('right')}
                        style={{
                            width: 64, height: 64, borderRadius: '50%', background: 'white', border: 'none',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Heart size={32} fill="#1abc9c" color="#1abc9c" />
                    </button>

                    {/* Add Offer Button Right after Match (Simulation) */}
                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            width: 64, height: 64, borderRadius: '50%', background: 'black', border: 'none',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Star size={24} color="white" fill="white" />
                    </button>
                </div>
            </div>

            {/* Guide Text */}
            <div style={{ textAlign: 'center', marginTop: 50, color: '#999', fontSize: '0.9rem', fontWeight: 500 }}>
                İlgilenmediğiniz profiller için <b>X</b>, favorilere eklemek için <b>Kalp</b>, doğrudan teklif göndermek için <b>Yıldız</b> butonuna tıklayın.
            </div>

            {/* --- OFFER MODAL --- */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', padding: 40, borderRadius: 24, width: '90%', maxWidth: 500, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Teklif Oluştur</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 5 }}>
                                <X size={20} color="#999" />
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                            <button
                                onClick={() => setOfferType('gift')}
                                style={{ flex: 1, padding: '12px', borderRadius: 8, border: offerType === 'gift' ? '2px solid black' : '1px solid #ccc', background: offerType === 'gift' ? '#fdfbf7' : 'white', fontWeight: offerType === 'gift' ? 700 : 500, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                            >
                                🎁 Hediye (Gifting)
                            </button>
                            <button
                                onClick={() => setOfferType('campaign')}
                                style={{ flex: 1, padding: '12px', borderRadius: 8, border: offerType === 'campaign' ? '2px solid black' : '1px solid #ccc', background: offerType === 'campaign' ? '#fdfbf7' : 'white', fontWeight: offerType === 'campaign' ? 700 : 500, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                            >
                                💸 Bütçeli Kampanya
                            </button>
                        </div>

                        {offerType === 'campaign' && (
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>TEKLİF BÜTÇESİ (TL)</label>
                                <input
                                    type="number"
                                    placeholder="Örn: 5000"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    style={{ width: '100%', padding: '12px 15px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        )}

                        <div style={{ marginBottom: 30 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>MESAJINIZ</label>
                            <textarea
                                placeholder={`${creator.name} için işbirliği detaylarını veya hediye etmek istediğiniz ürünü açıklayın...`}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ width: '100%', padding: '15px', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.95rem', minHeight: 120, outline: 'none', resize: 'none' }}
                            />
                        </div>

                        <button
                            onClick={handleSendOffer}
                            disabled={!message.trim() || isSending}
                            style={{
                                width: '100%', padding: '16px', borderRadius: 12, background: message.trim() && !isSending ? 'black' : '#ccc', color: 'white',
                                border: 'none', fontSize: '1rem', fontWeight: 700, cursor: message.trim() && !isSending ? 'pointer' : 'not-allowed',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10
                            }}
                        >
                            {isSending ? <Loader2 size={18} className="animate-spin" /> : <>Teklifi Gönder <Star size={18} fill="white" /></>}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

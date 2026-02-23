'use client';

import React, { useEffect, useState, useRef } from 'react';
import { UserCheck, Plus, X, Eye, Check } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { updateTalentProfileAction, getTalentProfile } from '@/actions/talent';

const PREFERENCES_OPTS = ['Moda', 'Güzellik', 'Cilt Bakımı', 'Sağlık', 'Ev & Yaşam', 'Fitness', 'Teknoloji', 'Bebek & Çocuk'];
const IDENTITY_OPTS = ['Yaşam Tarzı Etkileyicisi', 'Moda Tutkunu', 'Güzellik Gurusu', 'Anne Blogger', 'Teknoloji Meraklısı', 'Geasgin', 'Öğrenci'];
const FAMILY_OPTS = ['Bekar', 'Evli', 'İlişkisi Var', 'Ebeveyn'];
const LIFE_EVENTS_OPTS = ['Evleniyorum', 'Taşınıyorum', 'Bebek Bekliyorum', 'Mezun Oldum', 'Yeni İşe Başladım'];

export default function TalentCardPage() {
    const { user: authUser } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
    const [selectedIdentity, setSelectedIdentity] = useState<string[]>([]);

    useEffect(() => {
        // Fetch profile with error handling
        getTalentProfile()
            .then(data => {
                if (data) {
                    setProfile(data);
                    if (data.giftPreferences) {
                        try { setSelectedPreferences(JSON.parse(data.giftPreferences)); } catch (e) { }
                    }
                    if (data.identity) {
                        try { setSelectedIdentity(JSON.parse(data.identity)); } catch (e) { }
                    }
                }
            })
            .catch(err => {
                console.error("Failed to load talent profile:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // DEBUG ACTION
    const fixData = async () => {
        setLoading(true);
        try {
            const { ensureMockUserExists } = await import('@/actions/debug_media');
            await ensureMockUserExists();
            window.location.reload();
        } catch (e) {
            alert('Debug işlemi başarısız oldu.');
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // Append arrays manually
        selectedPreferences.forEach(p => formData.append('giftPreferences', p));
        selectedIdentity.forEach(i => formData.append('identity', i));

        const res = await updateTalentProfileAction(formData);
        if (res.success) {
            alert('Profil güncellendi!');
            window.location.reload();
        } else {
            alert('Hata oluştu.');
        }
    };

    const toggleSelection = (item: string, list: string[], setList: any) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    if (loading) return <div style={{ padding: 50, textAlign: 'center', color: '#666' }}>Yükleniyor...</div>;

    // EMPTY STATE / DEBUG
    if (!profile) {
        return (
            <div style={{ maxWidth: 1200, padding: 50, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <div style={{ fontSize: '1.2rem', color: '#666' }}>Kullanıcı profili bulunamadı veya oturum açılmamış.</div>
                <Button onClick={fixData}>PROFİLİMİ OLUŞTUR (DEBUG)</Button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 1200, paddingBottom: 100 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <div style={{ width: 50, height: 50, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserCheck size={24} color="#333" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Insider Kartı</h1>
                        <p style={{ color: '#666', marginTop: 5 }}>Markaların sizi keşfetmesi için Insider profilinizi detaylandırın.</p>
                    </div>
                </div>

                {/* VIEW BUTTON (Screenshot 2 Match) */}
                <Button
                    variant="outline"
                    onClick={() => setShowModal(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, height: 42, padding: '0 20px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #ddd' }}
                >
                    <Eye size={16} /> INSIDER KARTINI GÖRÜNTÜLE
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>

                    {/* LEFT COLUMN: Main Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

                        {/* Basic Info (Read Only mostly, edited in Appearance) */}
                        <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eaeaea' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 20 }}>Temel Bilgiler</h2>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', background: '#eee' }}>
                                    {profile?.avatarUrl ? <img src={profile.avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ marginBottom: 15 }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#666' }}>Görünen Ad</label>
                                        <div style={{ fontSize: '1rem', fontWeight: 500 }}>{profile?.fullName || '-'}</div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#666' }}>Biyografi</label>
                                        <div style={{ fontSize: '0.95rem', color: '#333', lineHeight: 1.5 }}>{profile?.bio || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Identity & Preferences (Screenshot 1 Match) */}
                        <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eaeaea' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 5 }}>Tercihler</h2>
                            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 25 }}>Markaların size daha alakalı hediyeler ve fırsatlar göndermesine yardımcı olmak için tercihlerinizi ekleyin.</p>

                            {/* Gift Preferences */}
                            <div style={{ marginBottom: 30 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>İlgi Alanlarınız</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {PREFERENCES_OPTS.map(opt => (
                                        <div
                                            key={opt}
                                            onClick={() => toggleSelection(opt, selectedPreferences, setSelectedPreferences)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: 20,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                background: selectedPreferences.includes(opt) ? 'black' : 'white',
                                                color: selectedPreferences.includes(opt) ? 'white' : 'black',
                                                border: selectedPreferences.includes(opt) ? '1px solid black' : '1px solid #ddd',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Identity */}
                            <div style={{ marginBottom: 30 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>Seni en iyi tanımlayan şey nedir?</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {IDENTITY_OPTS.map(opt => (
                                        <div
                                            key={opt}
                                            onClick={() => toggleSelection(opt, selectedIdentity, setSelectedIdentity)}
                                            style={{
                                                padding: '8px 16px',
                                                borderRadius: 20,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                background: selectedIdentity.includes(opt) ? 'black' : 'white',
                                                color: selectedIdentity.includes(opt) ? 'white' : 'black',
                                                border: selectedIdentity.includes(opt) ? '1px solid black' : '1px solid #ddd',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Family Status */}
                            <div style={{ marginBottom: 30 }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>Aile Hayatınızı Anlatın</label>
                                <select
                                    name="familyStatus"
                                    defaultValue={profile?.familyStatus || ''}
                                    style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', background: 'white' }}
                                >
                                    <option value="">Seçmek</option>
                                    {FAMILY_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Life Events */}
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>Yaklaşan herhangi bir yaşam etkinliğiniz var mı?</label>
                                <select
                                    name="lifeEvents"
                                    defaultValue={profile?.lifeEvents || ''}
                                    style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', background: 'white' }}
                                >
                                    <option value="">Seçmek</option>
                                    {LIFE_EVENTS_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT COLUMN: Demographics */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                        <div style={{ background: 'white', padding: 25, borderRadius: 12, border: '1px solid #eaeaea' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 15 }}>Demografik Bilgiler</h2>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 20 }}>Markaların doğru hedef kitleye ulaşmasına yardımcı olur.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Cinsiyet</label>
                                    <select name="gender" defaultValue={profile?.gender || 'Kadın'} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #eee' }}>
                                        <option value="Kadın">Kadın</option>
                                        <option value="Erkek">Erkek</option>
                                        <option value="Diğer">Diğer</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Doğum Tarihi</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        defaultValue={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : ''}
                                        style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #eee' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" style={{ width: '100%', height: 48, fontSize: '1rem' }}>Değişiklikleri Kaydet</Button>
                    </div>

                </div>
            </form>

            {/* --- MODAL (Screenshot 3 Match) --- */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'white', width: 400, borderRadius: 20, overflow: 'hidden', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>

                        {/* Close Button */}
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 15, right: 15, background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', zIndex: 10 }}>
                            <X size={18} />
                        </button>

                        {/* Top: Image & Header */}
                        <div style={{ position: 'relative', textAlign: 'center', padding: '40px 20px 20px 20px', background: '#fafafa', borderBottom: '1px solid #eee' }}>
                            <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 15px auto', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                {profile?.avatarUrl ? <img src={profile.avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: '#eee' }} />}
                            </div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{profile?.fullName}</h2>
                            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: 5, lineHeight: 1.4 }}>{profile?.bio}</p>

                            {/* Social Icons (Small) */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15, color: '#999' }}>
                                {/* Mocking icons for visual fidelity to screenshot */}
                                <div style={{ width: 24, height: 24, background: '#eee', borderRadius: '50%' }}></div>
                                <div style={{ width: 24, height: 24, background: '#eee', borderRadius: '50%' }}></div>
                            </div>
                        </div>

                        {/* Middle: Scores & Details */}
                        <div style={{ padding: '25px 30px', textAlign: 'center' }}>
                            <div style={{ marginBottom: 25 }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1 }}>15</div>
                                <div style={{ fontSize: '0.7rem', color: '#999', marginTop: 5, letterSpacing: 1, textTransform: 'uppercase' }}>Meraklı • Oluşturucu Puanı ⓘ</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, borderTop: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5', padding: '15px 0', marginBottom: 20 }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>Cinsiyet</div>
                                    <div style={{ fontWeight: 600 }}>{profile?.gender || '-'}</div>
                                </div>
                                <div style={{ borderLeft: '1px solid #f5f5f5' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>Ülke</div>
                                    <div style={{ fontWeight: 600 }}>Türkiye</div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginBottom: 25 }}>
                                {selectedPreferences.slice(0, 5).map(p => (
                                    <span key={p} style={{ fontSize: '0.75rem', border: '1px solid #eee', padding: '4px 10px', borderRadius: 15, color: '#666' }}>{p}</span>
                                ))}
                                {selectedIdentity.slice(0, 3).map(p => (
                                    <span key={p} style={{ fontSize: '0.75rem', border: '1px solid #eee', padding: '4px 10px', borderRadius: 15, color: '#666' }}>{p}</span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>$0<span style={{ fontSize: '0.7rem', fontWeight: 400 }}>/mo</span></div>
                                    <div style={{ fontSize: '0.65rem', color: '#999', marginTop: 2 }}>Hacim / mo</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>$0</div>
                                    <div style={{ fontSize: '0.65rem', color: '#999', marginTop: 2 }}>Ort. Sipariş</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>0.00%</div>
                                    <div style={{ fontSize: '0.65rem', color: '#999', marginTop: 2 }}>Dönüşüm</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Footer Logo */}
                        <div style={{ padding: '15px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: -0.5 }}>room001</div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

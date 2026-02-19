
import React from 'react';
import { getSessionAction } from '@/actions/auth';
import { getCuratorData } from '@/actions/admin';
import Button from '@/components/Button';
import { Eye, Share2, CheckCircle, Instagram, Globe, Mail } from 'lucide-react';
import OverviewChart from '@/components/dashboard/OverviewChart'; // Reuse chart
import Image from 'next/image';

// Client Component for Interactions
import MediaKitActions from '@/components/dashboard/MediaKitActions';

export default async function CreatorMediaKitPage() {
    const session = await getSessionAction();
    if (!session) return <div>Giriş yapmalısınız.</div>;

    const curatorData = await getCuratorData(session.username || '');
    const user = (curatorData?.user || session) as any;

    // Mock Stats (Until we have real Instagram API)
    const stats = {
        followers: user.instagramFollowerCount > 0 ? `${(user.instagramFollowerCount / 1000).toFixed(1)}K` : '24.5K',
        engagement: '4.8%', // Hardcoded for now
        monthlyViews: '150K+',
        niche: user.niche || 'Moda & Yaşam'
    };

    return (
        <div style={{ maxWidth: 1200, paddingBottom: 60 }}>
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Dijital Medya Kiti</h1>
                        <span style={{
                            background: '#e0f2f1', color: '#00695c', padding: '4px 10px',
                            borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4
                        }}>
                            <div style={{ width: 8, height: 8, background: '#00695c', borderRadius: '50%' }} />
                            CANLI
                        </span>
                    </div>
                    <p style={{ color: '#666', maxWidth: 600 }}>
                        Markalara her zaman güncel, etkileşimli ve profesyonel profilinizi tek linkle paylaşın.
                    </p>
                </div>

                <MediaKitActions username={user.username || 'user'} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>

                {/* LEFT COLUMN: LIVE PREVIEW */}
                <div style={{ background: 'white', borderRadius: 24, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>

                    {/* Cover & Profile */}
                    <div style={{ height: 180, background: 'linear-gradient(120deg, #fdfbf7 0%, #eee 100%)', position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: -50, left: 30 }}>
                            <div style={{
                                width: 100, height: 100, borderRadius: '50%', overflow: 'hidden',
                                border: '4px solid white', boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                                position: 'relative'
                            }}>
                                <Image
                                    src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
                                    alt={user.fullName || 'User'} fill style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 60, padding: '0 30px' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 5 }}>{user.fullName}</h2>
                        <div style={{ color: '#666', marginBottom: 15, display: 'flex', gap: 10, alignItems: 'center' }}>
                            <span>@{user.username}</span>
                            <span>•</span>
                            <span>{stats.niche}</span>
                            <span>•</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Globe size={14} /> İstanbul
                            </span>
                        </div>
                        <p style={{ lineHeight: 1.6, color: '#444', marginBottom: 30, maxWidth: '90%' }}>
                            {user.bio || "Merhabalar! Ben moda ve yaşam tarzı üzerine içerikler üretiyorum. Takipçilerimle samimi bir bağ kurmayı ve onlara en sevdiğim ürünleri önermeyi seviyorum."}
                        </p>

                        {/* Quick Stats Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15, marginBottom: 40 }}>
                            <div style={{ background: '#f9fafb', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 5 }}>{stats.followers}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>Takipçi</div>
                            </div>
                            <div style={{ background: '#f9fafb', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 5 }}>{stats.engagement}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>Etkileşim</div>
                            </div>
                            <div style={{ background: '#f9fafb', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 5 }}>{stats.monthlyViews}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>Aylık Erişim</div>
                            </div>
                        </div>

                        {/* Audience Demographics (Using Recharts Logic) */}
                        <div style={{ marginBottom: 40 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 20 }}>Kitle Analizi</h3>
                            <OverviewChart /> {/* Reuse chart for now, later make specific DemographicsChart */}
                        </div>

                        {/* Contact */}
                        <div style={{ borderTop: '1px solid #eee', paddingTop: 30, paddingBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: 5 }}>İşbirlikleri İçin</div>
                                <div style={{ color: '#666' }}>{user.email}</div>
                            </div>
                            <Button>
                                <Mail size={16} style={{ marginRight: 8 }} />
                                İletişime Geç
                            </Button>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: SETTINGS */}
                <div>
                    <div style={{ background: 'white', padding: 25, borderRadius: 16, border: '1px solid #eee' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: 15 }}>Görünürlük Ayarları</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 20 }}>
                            Media Kit'inizde hangi verilerin görüneceğini seçin.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked /> Follower Count
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked /> Engagement Rate
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked /> Past Collaborations
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


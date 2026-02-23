'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getMediaKitData } from '@/actions/analytics';
import Button from '@/components/Button';
import {
    Instagram,
    Youtube,
    Twitter,
    Globe,
    MapPin,
    Mail,
    Share2,
    Download,
    TrendingUp,
    Users,
    Eye,
    ShoppingBag
} from 'lucide-react';

export default function MediaKitPage() {
    const { user } = useAuth();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            getMediaKitData(user.id).then(res => {
                setData(res);
                setLoading(false);
            });
        }
    }, [user?.id]);

    // --- DEBUG BUTTON ---
    const fixData = async () => {
        setLoading(true);
        const { ensureMockUserExists } = await import('@/actions/debug_media');
        await ensureMockUserExists();
        window.location.reload();
    };

    if (loading) return <div style={{ padding: 50, textAlign: 'center', color: '#666' }}>Media Kit hazırlanıyor...</div>;
    if (!data) return (
        <div style={{ padding: 50, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div>Veri bulunamadı.</div>
            <Button onClick={fixData}>PROFİLİMİ OLUŞTUR (DEBUG)</Button>
        </div>
    );

    const { user: profile, stats, socials } = data;

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 100, fontFamily: 'sans-serif' }}>

            {/* ACTIONS HEADER */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 30 }}>
                <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Share2 size={16} /> Paylaş
                </Button>
                <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Download size={16} /> PDF İndir
                </Button>
            </div>

            {/* MAIN CARD */}
            <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>

                {/* HERO SECTION */}
                <div style={{ padding: '60px 50px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 40 }}>
                    {/* Avatar */}
                    <div style={{ width: 150, height: 150, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt={profile.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, color: '#999' }}>
                                {profile.fullName?.[0]}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, letterSpacing: -1 }}>{profile.fullName}</h1>
                            {profile.niche && <span style={{ padding: '4px 12px', background: '#f0f0f0', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>{profile.niche}</span>}
                        </div>
                        <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: 20, lineHeight: 1.5 }}>
                            {profile.bio || "Henüz bir biyografi eklenmemiş."}
                        </div>

                        <div style={{ display: 'flex', gap: 30 }}>
                            {profile.location && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666', fontSize: '0.9rem' }}>
                                    <MapPin size={16} /> {profile.location}
                                </div>
                            )}
                            {profile.websiteUrl && (
                                <a href={profile.websiteUrl} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666', fontSize: '0.9rem', textDecoration: 'none' }}>
                                    <Globe size={16} /> Website
                                </a>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666', fontSize: '0.9rem' }}>
                                <Mail size={16} /> {profile.contactEmail}
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATS GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: '#fafafa' }}>
                    <StatBox label="Toplam Erişim" value={stats.totalReach.toLocaleString()} icon={<Users size={20} />} />
                    <StatBox label="Aylık Görüntülenme" value={stats.profileViews.toLocaleString()} icon={<Eye size={20} />} />
                    <StatBox label="Etkileşim Oranı" value={stats.engagementRate} icon={<TrendingUp size={20} />} />
                    <StatBox label="Ürün Paylaşımı" value={stats.productsShared} icon={<ShoppingBag size={20} />} />
                </div>

                {/* SOCIAL ACCOUNTS & AUDIENCE */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #eee' }}>

                    {/* Socials */}
                    <div style={{ padding: 50, borderRight: '1px solid #eee' }}>
                        <h3 style={{ margin: '0 0 25px 0', fontSize: '1.2rem', fontWeight: 600 }}>Sosyal Medya Kanalları</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {socials.length > 0 ? socials.map((s: any, i: number) => (
                                <SocialRow key={i} platform={s.platform} username={s.username} followers={s.followers} />
                            )) : (
                                <div style={{ color: '#999', fontStyle: 'italic' }}>Henüz sosyal hesap bağlanmamış.</div>
                            )}

                            {/* Static Mock if empty for better look */}
                            {socials.length === 0 && (
                                <>
                                    <SocialRow platform="Instagram" username="@demo_user" followers={125000} />
                                    <SocialRow platform="TikTok" username="@demo_tik" followers={450000} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Audience (Mock) */}
                    <div style={{ padding: 50 }}>
                        <h3 style={{ margin: '0 0 25px 0', fontSize: '1.2rem', fontWeight: 600 }}>Takipçi Kitlesi</h3>

                        <div style={{ marginBottom: 30 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: '#666' }}>
                                <span>Kadın</span>
                                <span>82%</span>
                            </div>
                            <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: '82%', height: '100%', background: 'black' }} />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: '#666' }}>
                                <span>Erkek</span>
                                <span>18%</span>
                            </div>
                            <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: '18%', height: '100%', background: '#999' }} />
                            </div>
                        </div>

                        <div style={{ marginTop: 40, display: 'flex', gap: 10 }}>
                            <Tag>25-34 Yaş</Tag>
                            <Tag>İstanbul</Tag>
                            <Tag>Moda & Giyim</Tag>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

// --- SUBCOMPONENTS ---

function StatBox({ label, value, icon }: { label: string, value: string | number, icon: any }) {
    return (
        <div style={{ padding: '40px 30px', textAlign: 'center', borderRight: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 15, color: '#666' }}>{icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 5 }}>{value}</div>
            <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
        </div>
    );
}

function SocialRow({ platform, username, followers }: { platform: string, username: string, followers: number }) {
    const Icon = platform === 'Instagram' ? Instagram : platform === 'Youtube' ? Youtube : Globe;

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
                    <Icon size={20} />
                </div>
                <div>
                    <div style={{ fontWeight: 600 }}>{platform}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>@{username}</div>
                </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                {(followers / 1000).toFixed(1)}K
            </div>
        </div>
    )
}

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span style={{ padding: '6px 14px', background: '#f5f5f5', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>
            {children}
        </span>
    );
}

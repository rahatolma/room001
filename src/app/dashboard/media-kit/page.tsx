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
    ShoppingBag,
    Printer
} from 'lucide-react';
import { toast } from 'react-hot-toast';

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

    // --- ACTIONS ---
    const handlePrint = () => {
        window.print();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link kopyalandı!');
    };

    const handleShareWhatsApp = () => {
        const text = `Marka işbirlikleri için medya kitimi inceleyin: ${data?.user?.fullName}`;
        const url = window.location.href;
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    };

    const handleShareEmail = () => {
        const subject = `${data?.user?.fullName} - Insider Media Kit`;
        const body = `Merhaba,\n\nMarka işbirlikleri için medya kitimi inceleyebilirsiniz:\n${window.location.href}\n\nSevgiler,\n${data?.user?.fullName}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    // --- DEBUG BUTTON (Only visible to owner in dev) ---
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

    const { user: profile, stats, socials, audience } = data;

    // Audience Data Defaults (if null)
    // We can show a placeholder or "Veri Yok"
    const audienceData = audience || {
        gender: { female: 82, male: 18 }, // Default fallback for check
        age: ['25-34', '18-24', '35-44'],
        topLocations: ['İstanbul', 'Ankara', 'İzmir']
    };

    return (
        <div className="media-kit-container" style={{ paddingBottom: 100, }}>
            <style jsx global>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { background: white; -webkit-print-color-adjust: exact; }
                    .no-print { display: none !important; }
                    .media-kit-container { padding-bottom: 0 !important; max-width: 100% !important; }
                    /* Hide sidebar and header is handled by layout likely, but let's ensure */
                    aside, header, nav, .sidebar-wrapper { display: none !important; }
                    main { margin: 0 !important; padding: 0 !important; }
                }
            `}</style>

            {/* ACTIONS HEADER */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 30 }}>
                <div style={{ display: 'flex', gap: 5, background: 'white', padding: 5, borderRadius: 8, border: '1px solid #eee' }}>
                    <button onClick={handleCopyLink} title="Linki Kopyala" style={{ border: 'none', background: 'transparent', padding: 8, cursor: 'pointer', borderRadius: 4, display: 'flex', alignItems: 'center', color: '#555', hover: { background: '#f5f5f5' } } as any}>
                        <Share2 size={18} />
                    </button>
                    <button onClick={handleShareWhatsApp} title="WhatsApp'ta Paylaş" style={{ border: 'none', background: 'transparent', padding: 8, cursor: 'pointer', borderRadius: 4, display: 'flex', alignItems: 'center', color: '#25D366' }}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    </button>
                    <button onClick={handleShareEmail} title="E-posta ile Paylaş" style={{ border: 'none', background: 'transparent', padding: 8, cursor: 'pointer', borderRadius: 4, display: 'flex', alignItems: 'center', color: '#EA4335' }}>
                        <Mail size={18} />
                    </button>
                </div>

                <Button variant="outline" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Printer size={16} /> PDF İndir
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

                        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
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
                                <div style={{ color: '#999', fontStyle: 'italic', padding: 20, textAlign: 'center', background: '#f9f9f9', borderRadius: 8 }}>
                                    Henüz bağlanmış sosyal medya hesabı bulunmuyor.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Audience (Mock/Real) */}
                    <div style={{ padding: 50 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Takipçi Kitlesi</h3>
                            <span className="no-print" style={{ fontSize: '0.75rem', background: '#eee', padding: '2px 8px', borderRadius: 4, color: '#666' }}>
                                {audience ? 'Doğrulanmış' : 'Tahmini'}
                            </span>
                        </div>

                        {/* Gender Distribution */}
                        <div style={{ marginBottom: 30 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: '#666' }}>
                                <span>Kadın</span>
                                <span>{audienceData.gender.female}%</span>
                            </div>
                            <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: `${audienceData.gender.female}%`, height: '100%', background: 'black' }} />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: '#666' }}>
                                <span>Erkek</span>
                                <span>{audienceData.gender.male}%</span>
                            </div>
                            <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: `${audienceData.gender.male}%`, height: '100%', background: '#999' }} />
                            </div>
                        </div>

                        {/* Demographics Tags */}
                        <div style={{ marginTop: 40, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {audienceData.age && audienceData.age.map((age: string, i: number) => (
                                <Tag key={i}>{age} Yaş</Tag>
                            ))}
                            {audienceData.topLocations && audienceData.topLocations.map((loc: string, i: number) => (
                                <Tag key={i}>{loc}</Tag>
                            ))}
                            {profile.niche && <Tag>{profile.niche}</Tag>}
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
    const Icon = platform === 'Instagram' ? Instagram : platform === 'Youtube' ? Youtube : Globe; // Simple mapping, could be robust

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
                {new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(followers)}
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

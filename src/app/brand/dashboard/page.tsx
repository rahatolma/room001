import React from 'react';
import { TrendingUp, MousePointerClick, ShoppingBag, Eye, Megaphone, Clock, CheckCircle2, ChevronRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';

export default function BrandDashboardPage() {
    return (
        <div style={{ paddingBottom: 100, maxWidth: 1200, margin: '0 auto' }}>
            {/* GREETING & HERO */}
            <div style={{ marginBottom: 40, marginTop: 20 }}>
                <div style={{ display: 'inline-block', background: '#f5f5f5', padding: '6px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: 15, color: '#333' }}>
                    ROOM001 BRAND
                </div>
                <h1 style={{ fontSize: '2.6rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1px', color: '#111' }}>
                    Marka Yönetim Paneli
                </h1>
                <p style={{ fontSize: '1.15rem', color: '#666', lineHeight: 1.5, margin: 0 }}>
                    Hoş geldiniz. İçerik üreticileriyle olan etkileşimlerinizi, kampanyalarınızı ve yatırım getirinizi yönetin.
                </p>
            </div>

            {/* PREMIUM STATS GRID */}
            <div className="responsive-kpi-grid" style={{ marginBottom: 50 }}>
                {[
                    { label: 'GÖRÜNTÜLENME', value: '1.2M', trend: '+12%', icon: <Eye size={20} color="#111" /> },
                    { label: 'TOPLAM TIKLANMA', value: '45.2K', trend: '+8.4%', icon: <MousePointerClick size={20} color="#111" /> },
                    { label: 'DÖNÜŞÜM (SATIŞ)', value: '842', trend: '+24%', icon: <ShoppingBag size={20} color="#111" /> },
                    { label: 'ANLIK ROAS', value: '4.2x', trend: '+1.1x', icon: <TrendingUp size={20} color="#111" /> },
                ].map((stat, idx) => (
                    <div key={idx} style={{
                        background: '#fff',
                        border: '1px solid #eaeaea',
                        padding: '25px',
                        borderRadius: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600, letterSpacing: 0.5 }}>
                                {stat.label}
                            </div>
                            <div style={{ background: '#f8f8f8', padding: 8, borderRadius: 8 }}>
                                {stat.icon}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                            <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-1px', color: '#111' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: 4 }}>{stat.trend}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="responsive-2-col" style={{ gap: 30 }}>
                {/* RECENT CAMPAIGNS */}
                <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, padding: 30, boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Megaphone size={20} color="#111" /> Aktif Kampanyalar
                        </h2>
                        <Link href="/brand/campaigns" style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                            Tümünü Gör <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        {[
                            { name: 'Yaz Koleksiyonu Tanıtımı', type: 'Komisyon (%15)', apps: 12, status: 'Aktif' },
                            { name: 'Yeni Ürün Lansmanı (Hediye)', type: 'Ürün Gönderimi', apps: 45, status: 'Aktif' },
                            { name: 'Influencer Özel İndirim', type: 'Sabit Bütçe', apps: 8, status: 'İnceleniyor' },
                        ].map((camp, idx) => (
                            <div key={idx} style={{ padding: 20, border: '1px solid #f0f0f0', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                                <div>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: '0 0 5px 0' }}>{camp.name}</h3>
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{camp.type} • {camp.apps} Başvuru</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                    <span style={{ background: camp.status === 'Aktif' ? '#dcfce7' : '#fef3c7', color: camp.status === 'Aktif' ? '#166534' : '#92400e', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>
                                        {camp.status}
                                    </span>
                                    <Button variant="outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Yönet</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ACTION REQUIRED / PENDING */}
                <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: 16, padding: 30, boxShadow: '0 4px 12px rgba(254, 240, 138, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 25 }}>
                        <Clock size={20} color="#ca8a04" />
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#854d0e' }}>Aksiyon Bekleyenler</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px dashed #facc15' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 35, height: 35, borderRadius: '50%', background: '#eee' }}>
                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="user" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Asena Keskinci</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Yeni Kampanya Başvurusu</span>
                                </div>
                            </div>
                            <Button style={{ width: '100%', fontSize: '0.8rem', background: '#111', color: 'white', padding: '8px' }}>Profili İncele</Button>
                        </div>

                        <div style={{ background: 'white', padding: 20, borderRadius: 12, border: '1px dashed #facc15' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 35, height: 35, borderRadius: '50%', background: '#eee' }}>
                                    <img src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="user" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Berk Atan</h4>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Yeni Mesaj (Fiyat Teklifi)</span>
                                </div>
                            </div>
                            <Button variant="outline" style={{ width: '100%', fontSize: '0.8rem', padding: '8px' }}>Mesaja Git</Button>
                        </div>
                    </div>

                    <Link href="/brand/discovery" style={{ display: 'block', marginTop: 25, textAlign: 'center', color: '#a16207', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'underline' }}>
                        Daha Fazla Kreatör Keşfet <UserPlus size={14} style={{ display: 'inline', marginLeft: 4 }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

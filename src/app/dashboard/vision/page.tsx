"use client";

import React from 'react';
import { Briefcase, Share2, TrendingUp, ArrowRight, Video, ShoppingBag, Sparkles, Target, PieChart, Award as AwardIcon } from 'lucide-react';
import Link from 'next/link';

export default function VisionPage() {
    return (
        <div style={{ maxWidth: 1200, paddingBottom: 60 }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #111 0%, #333 100%)',
                borderRadius: 24,
                padding: '60px 40px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: 50,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
                <div style={{ position: 'absolute', top: -100, right: -50, width: 400, height: 400, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />

                <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 20,
                        fontSize: '0.85rem', fontWeight: 600, marginBottom: 20, backdropFilter: 'blur(5px)'
                    }}>
                        <Sparkles size={14} fill="white" /> Room001 Vizyonu
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: 20, lineHeight: 1.1 }}>
                        Sadece Link Değil, <br />
                        <span style={{ color: '#fff' }}>Medya İmparatorluğun.</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.6, marginBottom: 30 }}>
                        Biz seni "link paylaşan biri" olarak görmüyoruz. Sen kendi kitlesi, kendi markası ve kendi ekonomisi olan bir <b>Medya Şirketisin.</b> Room001, bu şirketi yönetmen için tasarlandı.
                    </p>
                </div>
            </div>

            {/* Vision Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>

                {/* Card 1 */}
                <div style={{
                    background: 'white', border: '1px solid #eee', borderRadius: 20, overflow: 'hidden',
                    transition: 'transform 0.2s', cursor: 'default'
                }}>
                    <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div style={{
                            width: 80, height: 80, background: 'linear-gradient(135deg, #333 0%, #000 100%)',
                            borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                        }}>
                            <Briefcase size={40} color="white" />
                        </div>
                    </div>
                    <div style={{ padding: 30 }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 15 }}>Profesyonel Kimlik</h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 25 }}>
                            Markalara PDF gönderme devri bitti. Tamamlanan işbirliklerinle otomatik güncellenen <b>Canlı Portfolyo</b> ve <b>Güven Skoru</b> ile profesyonelliğini kanıtla.
                        </p>
                        <Link href="/dashboard/media-kit" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#000', fontWeight: 600, textDecoration: 'none' }}>
                            Medya Kitini İncele <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Card 2 */}
                <div style={{
                    background: 'white', border: '1px solid #eee', borderRadius: 20, overflow: 'hidden',
                    transition: 'transform 0.2s', cursor: 'default'
                }}>
                    <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div style={{
                            width: 80, height: 80, background: 'linear-gradient(135deg, #333 0%, #000 100%)',
                            borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                        }}>
                            <Share2 size={40} color="white" />
                        </div>
                    </div>
                    <div style={{ padding: 30 }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 15 }}>Tam Entegrasyon</h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 25 }}>
                            Sosyal medyanı bağla, kombinlerini sergile. Sadece yeni ürünler değil, <b>Dolap ve Gardrops</b> entegrasyonu ile ikinci el ürünlerini de vitrine koyup satışını yap.
                        </p>
                        <Link href="/dashboard/integrations" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#000', fontWeight: 600, textDecoration: 'none' }}>
                            Hesaplarını Bağla <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Card 3 */}
                <div style={{
                    background: 'white', border: '1px solid #eee', borderRadius: 20, overflow: 'hidden',
                    transition: 'transform 0.2s', cursor: 'default'
                }}>
                    <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div style={{
                            width: 80, height: 80, background: 'linear-gradient(135deg, #333 0%, #000 100%)',
                            borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                        }}>
                            <TrendingUp size={40} color="white" />
                        </div>
                    </div>
                    <div style={{ padding: 30 }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 15 }}>Markanı Büyüt</h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 25 }}>
                            Kürasyonların milyonlara ulaşsın. <b>Öne Çıkar</b> paketleri ile keşfet sayfasında ve aramalarda en üst sırada yer alarak marka bilinirliğini katla.
                        </p>
                        <Link href="/dashboard/promote" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#000', fontWeight: 600, textDecoration: 'none' }}>
                            Paketleri Gör <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Card 4 (New) */}
                <div style={{
                    background: 'white', border: '1px solid #eee', borderRadius: 20, overflow: 'hidden',
                    transition: 'transform 0.2s', cursor: 'default'
                }}>
                    <div style={{ height: 200, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div style={{
                            width: 80, height: 80, background: 'linear-gradient(135deg, #333 0%, #000 100%)',
                            borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                        }}>
                            <Target size={40} color="white" />
                        </div>
                    </div>
                    <div style={{ padding: 30 }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 15 }}>Akıllı Eşleşme</h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 25 }}>
                            Artık markalara mail atıp cevap bekleme devri bitti. <b>Brand Match</b> ile senin kriterlerine uyan markaları sağa kaydır, anında eşleş ve işbirliğine başla.
                        </p>
                        <Link href="/dashboard/brand-match" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#000', fontWeight: 600, textDecoration: 'none' }}>
                            Markaları Keşfet <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Card 5 (New - Analytics) */}
                <div style={{
                    background: 'white', border: '1px solid #eee', borderRadius: 20, overflow: 'hidden',
                    transition: 'transform 0.2s', cursor: 'default'
                }}>
                    <div style={{ height: 180, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div style={{
                            width: 70, height: 70, background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                            borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                        }}>
                            <PieChart size={35} color="white" />
                        </div>
                    </div>
                    <div style={{ padding: 25 }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 15 }}>Kreatör Analizleri</h3>
                        <p style={{ color: '#666', lineHeight: 1.5, marginBottom: 20, fontSize: '0.9rem' }}>
                            Satışından trafiğine, hangi platformun (Instagram/TikTok) daha çok kazandırdığını yapay zeka öngörüleriyle anlık takip et.
                        </p>
                        <Link href="/dashboard/analytics" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#10b981', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                            Analizlere Git <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Card 6 (New - Gamification) */}
                <div style={{
                    background: 'white', border: '1px solid #eee', borderRadius: 20, overflow: 'hidden',
                    transition: 'transform 0.2s', cursor: 'default'
                }}>
                    <div style={{ height: 180, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div style={{
                            width: 70, height: 70, background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                            borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
                        }}>
                            <AwardIcon size={35} color="white" />
                        </div>
                    </div>
                    <div style={{ padding: 25 }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 15 }}>Oyunlaştırılmış Büyüme</h3>
                        <p style={{ color: '#666', lineHeight: 1.5, marginBottom: 20, fontSize: '0.9rem' }}>
                            Görevleri tamamla, XP kazan ve seviye atla. Her yeni seviyede platform içi dev ayrıcalıkların kilidini aç.
                        </p>
                        <Link href="/dashboard/tier" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#f59e0b', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                            Seviyeleri Gör <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

import React from 'react';
import BottomCTA from '@/components/BottomCTA';
import { Target, MessageSquare, Handshake } from 'lucide-react';

export default function BrandPartnershipsPage() {
    return (
        <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
            {/* HERO SECTION */}
            <section style={{
                position: 'relative',
                width: '100%',
                padding: '120px 0 80px',
                overflow: 'hidden',
                backgroundColor: '#fff'
            }}>
                <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>
                    <div style={{ flex: '1 1 500px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#f5f5f5', borderRadius: '30px',
                            fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: '#111', marginBottom: '24px'
                        }}>
                            <Handshake size={16} /> MARKA İŞBİRLİKLERİ
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                            Otantik Zevk,<br />
                            <span style={{ color: '#000', position: 'relative' }}>
                                Organik Eşleşme.
                                <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
                            Soğuk mail atmayı ve ajans komisyonlarını unutun. Zevk profilinizle uyumlu premium markaların doğrudan size teklif getirdiği kapalı ekosisteme hoş geldiniz.
                        </p>
                    </div>

                    {/* DYNAMIC MOCK UI FOR BRAND MATCHING */}
                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '9/16', background: '#fafafa',
                            borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', border: '8px solid #fff', overflow: 'hidden',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            {/* Fake Tinder-like Card Header */}
                            <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #eee', background: '#fff' }}>
                                <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Yeni Kampanya Teklifi</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>Dyson Sonbahar Koleksiyonu</div>
                            </div>

                            {/* Fake Card Image */}
                            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ height: '220px', borderRadius: '16px', backgroundImage: 'url(https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />

                                <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #eee' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Teklif Detayları</div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>1x Instagram Reels + Hikaye</div>
                                    <div style={{ color: '#2E7D32', fontWeight: 800, fontSize: '1.2rem', marginTop: '10px' }}>₺45,000 + Ürün Hediyesi</div>
                                </div>
                            </div>

                            {/* Fake Action Buttons */}
                            <div style={{ padding: '20px', display: 'flex', gap: '15px', borderTop: '1px solid #eee', background: '#fff' }}>
                                <div style={{ flex: 1, height: '50px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, border: '2px solid #ddd', color: '#666', cursor: 'pointer' }}>
                                    Reddet
                                </div>
                                <div style={{ flex: 1, height: '50px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, background: '#111', color: '#fff', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}>
                                    Kabul Et
                                </div>
                            </div>
                        </div>

                        {/* Floating Notification */}
                        <div style={{
                            position: 'absolute', top: '15%', left: '-10%', background: '#fff', padding: '12px 20px',
                            borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '15px',
                            animation: 'float 3.5s ease-in-out infinite 0.5s'
                        }}>
                            <MessageSquare size={20} color="#1565C0" />
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Dyson Türkiye</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Sizinle çalışmak istiyoruz...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES LISTING */}
            <section style={{ padding: '100px 0', backgroundColor: '#fafafa' }}>
                <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                        <div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #ddd' }}>
                                <Target size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Direkt Gelen Teklifler</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Ajans aracılarını ortadan kaldırıyoruz. Markalar, zevk profilinizi inceleyip, uygulama içi mesajlaşma ve teklif sistemi üzerinden sizinle doğrudan iletişime geçer.</p>
                        </div>
                        <div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #ddd' }}>
                                <MessageSquare size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Tek Tıkla Kampanya Yönetimi</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Gelen teklifleri tek tıkla kabul edin, içerik onay süreçlerini platform üzerinden şeffafça yürütün ve ödemenizi garanti altına alın.</p>
                        </div>
                    </div>
                </div>
            </section>

            <BottomCTA
                title="Markaların Radarında Olun"
                subtitle="Profilinizi oluşturun ve sektörün en iyi markalarından teklif almaya başlayın."
                buttonText="Başvurunu Yap"
                theme="dark"
            />
        </main>
    );
}

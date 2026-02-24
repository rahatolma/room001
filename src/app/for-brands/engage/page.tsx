import React from 'react';
import BottomCTA from '@/components/BottomCTA';
import { MessageSquare, Calendar, Gift } from 'lucide-react';

export default function BrandsEngagePage() {
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
                            <MessageSquare size={16} /> ETKİLEŞİM
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                            Gerçek Bağlar,<br />
                            <span style={{ color: '#000', position: 'relative' }}>
                                Derin Etki.
                                <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
                            Dağınık e-posta zincirlerinden kurtulun. Seçtiğiniz Insider'lara uygulama içinden kampanya teklifleri gönderin, hediye ürün lojistiğini ve içerik onay süreçlerini tek merkezden yönetin.
                        </p>
                    </div>

                    {/* DYNAMIC MOCK UI FOR BRAND ENGAGE (CHAT & CAMPAIGN) */}
                    <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '420px', background: '#fff',
                            borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: '1px solid #eaeaea', overflow: 'hidden',
                            display: 'flex', flexDirection: 'column'
                        }}>
                            {/* Chat Header Mock */}
                            <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px', background: '#fafafa' }}>
                                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#ccc', backgroundImage: 'url(https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=200&auto=format&fit=crop)', backgroundSize: 'cover' }} />
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>Dyson Partner Ops</div>
                                    <div style={{ color: '#2E7D32', fontSize: '0.8rem', fontWeight: 600 }}>Çevrimiçi</div>
                                </div>
                            </div>

                            {/* Chat Messages Mock */}
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff' }}>
                                {/* Message from Brand */}
                                <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: '#f5f5f5', padding: '15px', borderRadius: '16px', borderBottomLeftRadius: '4px' }}>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#333', lineHeight: 1.5 }}>
                                        Merhaba @stil_ikonu, yeni lansmanımız için zevkinize çok güveniyoruz. Detayları incelemek ister misiniz?
                                    </p>
                                </div>

                                {/* Campaign Card from Brand */}
                                <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: '#fff', border: '1px solid #eaeaea', padding: '15px', borderRadius: '16px', borderBottomLeftRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#C2185B', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                        <Gift size={16} /> Kampanya Teklifi
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '5px' }}>Lansman Özel İncelemesi</div>
                                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>Bütçe: ₺35,000 + Ürün Onayı</div>
                                    <div style={{ width: '100%', padding: '10px 0', background: '#111', color: '#fff', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>Teklifi Görüntüle</div>
                                </div>

                                {/* Reply from Creator */}
                                <div style={{ alignSelf: 'flex-end', maxWidth: '85%', background: '#111', color: '#fff', padding: '15px', borderRadius: '16px', borderBottomRightRadius: '4px' }}>
                                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>
                                        Harika! Detayları kabul ettim, kargo adresimi platforma kaydettim. 🤍
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Status Notification */}
                        <div style={{
                            position: 'absolute', top: '15%', left: '-10%', background: '#fff', padding: '12px 20px',
                            borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '15px',
                            animation: 'float 3.5s ease-in-out infinite 1s'
                        }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✦</div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>Teklif Kabul Edildi</div>
                                <div style={{ fontSize: '1rem', fontWeight: 800 }}>Kargo Sürecine Geçildi</div>
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
                                <MessageSquare size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Doğrudan İletişim</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Ajans komisyonu ödemeden, favori Insider'ınızla Room001 mesajlaşma modülü üzerinden kurumsal ve direkt bir iletişim hattı kurun.</p>
                        </div>
                        <div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #ddd' }}>
                                <Calendar size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Kampanya Lojistiği</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Bütçe belirleme, sözleşme onayı, adres paylaşımı ve ürün kargolama gibi operasyonel yükleri tek bir panele toplayın; otomatize edin.</p>
                        </div>
                    </div>
                </div>
            </section>

            <BottomCTA
                title="Yaratıcı Sürecin Kontrolü Sizde"
                subtitle="Elçinizle olan iletişiminizi Room001 kalitesiyle yönetin."
                buttonText="Marka Ol"
                href="/for-brands"
                theme="light"
            />
        </main>
    );
}

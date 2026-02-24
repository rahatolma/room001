import React from 'react';
import BottomCTA from '@/components/BottomCTA';
import { Activity, BarChart, TrendingUp, Compass } from 'lucide-react';

export default function BrandsTrackPage() {
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
                            <Activity size={16} /> TAKİP ET
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                            Performansı <br />
                            <span style={{ color: '#000', position: 'relative' }}>
                                Anında Ölçün.
                                <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
                            Gerçekleşen tıklamalar, sepete eklemeler ve satışlar... Influencer pazarlamasındaki kara kutuyu Room001 ile aydınlatın ve her kuruşunuzun yatırım getirisini (ROI) net olarak görün.
                        </p>
                    </div>

                    {/* DYNAMIC MOCK UI FOR BRAND ANALYTICS DASHBOARD */}
                    <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '450px', background: '#111', color: '#fff',
                            borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', border: '1px solid #333', overflow: 'hidden'
                        }}>
                            {/* Analytics Header Mock */}
                            <div style={{ padding: '25px', borderBottom: '1px solid #333' }}>
                                <div style={{ fontSize: '0.9rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>Toplam Kampanya Satışı</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    ₺142,500 <span style={{ fontSize: '1rem', padding: '4px 10px', background: 'rgba(46, 125, 50, 0.2)', color: '#4CAF50', borderRadius: '20px' }}>+%42 ↗</span>
                                </div>
                            </div>

                            {/* Analytics Grid Mock */}
                            <div style={{ padding: '25px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ background: '#222', padding: '20px', borderRadius: '16px' }}>
                                    <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '5px' }}>Tıklanma (Clicks)</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>18.4K</div>
                                </div>
                                <div style={{ background: '#222', padding: '20px', borderRadius: '16px' }}>
                                    <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '5px' }}>Dönüşüm (CVR)</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>%4.2</div>
                                </div>
                                <div style={{ background: '#222', padding: '20px', borderRadius: '16px' }}>
                                    <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '5px' }}>ROI</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>5.4x</div>
                                </div>
                                <div style={{ background: '#222', padding: '20px', borderRadius: '16px' }}>
                                    <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '5px' }}>Sepet Ort. (AOV)</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₺1,250</div>
                                </div>
                            </div>

                            <div style={{ padding: '0 25px 25px' }}>
                                <div style={{ width: '100%', height: '45px', borderRadius: '25px', background: '#fff', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>
                                    Raporu İndir (.CSV)
                                </div>
                            </div>
                        </div>

                        {/* Floating Notification */}
                        <div style={{
                            position: 'absolute', bottom: '10%', right: '-15%', background: '#fff', padding: '12px 20px',
                            borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '15px', color: '#111',
                            animation: 'float 4s ease-in-out infinite 0.5s'
                        }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFF3E0', color: '#E65100', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>⚡</div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>Son 24 Saat</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>+45 Yeni Sipariş</div>
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
                                <BarChart size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Entegre Dashboard</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Instagram kaydırmaları veya YouTube bağlantıları üzerinden gelen trafiği markanızın kendi satışı paneliyle (Shopify vb.) API üzerinden kusursuz eşleştirin.</p>
                        </div>
                        <div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #ddd' }}>
                                <Compass size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>A/B Test Yetenekleri</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Hangi Insider stilinin markanıza daha yüksek geri dönüş (ROI) sağladığını gerçek data ile saptayıp bütçenizi doğru elçilere scale edin.</p>
                        </div>
                    </div>
                </div>
            </section>

            <BottomCTA
                title="Bulanıklığı Ortadan Kaldırın"
                subtitle="Tahmin etmeyi bırakın. Veriye dayalı influencer operasyonuna geçin."
                buttonText="Lansmanı Yap"
                href="/for-brands"
                theme="dark"
            />
        </main>
    );
}

import React from 'react';
import BottomCTA from '@/components/BottomCTA';
import { Link2, DollarSign, BarChart2 } from 'lucide-react';

export default function AffiliateLinksPage() {
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
                            <Link2 size={16} /> AFFİLİATE LİNKLER
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                            Gerçek Zevk,<br />
                            <span style={{ color: '#000', position: 'relative' }}>
                                Gerçek Kazanç.
                                <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
                            Sevdiğiniz ürünleri tavsiye etmek zaten yaptığınız bir şey. Room001 ile bunu anında komisyonlu bir iş modeline çevirin. Sektörün en yüksek komisyon oranlarıyla (%15-30) tanışın.
                        </p>
                    </div>

                    {/* DYNAMIC MOCK UI FOR AFFILIATE DASHBOARD */}
                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '420px', background: '#fff',
                            borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: '1px solid #eaeaea', overflow: 'hidden'
                        }}>
                            <div style={{ padding: '25px', borderBottom: '1px solid #eaeaea', backgroundColor: '#fafafa' }}>
                                <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', marginBottom: '5px' }}>Bu Ayki Kazancınız</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    ₺24,500 <span style={{ fontSize: '1rem', padding: '4px 10px', background: '#E8F5E9', color: '#2E7D32', borderRadius: '20px' }}>+%25 ↗</span>
                                </div>
                            </div>

                            <div style={{ padding: '25px' }}>
                                <div style={{ fontWeight: 700, marginBottom: '20px', fontSize: '1.1rem' }}>En İyi Performans Gösteren Ürünler</div>

                                {/* Product Row 1 */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#eee', backgroundImage: 'url(https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=200&auto=format&fit=crop)', backgroundSize: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Dyson Airwrap</div>
                                        <div style={{ color: '#666', fontSize: '0.85rem' }}>145 Satış</div>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>₺8,450</div>
                                </div>

                                {/* Product Row 2 */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#eee', backgroundImage: 'url(https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=200&auto=format&fit=crop)', backgroundSize: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Prada Çanta</div>
                                        <div style={{ color: '#666', fontSize: '0.85rem' }}>32 Satış</div>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>₺12,100</div>
                                </div>

                                <div style={{ width: '100%', height: '40px', borderRadius: '8px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                                    Tüm Analizleri Gör
                                </div>
                            </div>
                        </div>

                        {/* Floating Action Button Mock */}
                        <div style={{
                            position: 'absolute', bottom: '-20px', left: '-20px', background: '#111', padding: '15px 25px',
                            borderRadius: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff'
                        }}>
                            <Link2 size={20} />
                            <span style={{ fontWeight: 600 }}>Linki Kopyala</span>
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
                                <DollarSign size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Esnek ve Yüksek Kazanç</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Global markalardan yerel butiklere kadar binlerce partnerimizle sektör ortalamasının 3 katı komisyon kazanın.</p>
                        </div>
                        <div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #ddd' }}>
                                <BarChart2 size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Derinlemesine Analiz</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Hangi ürünün hangi platformdan ne kadar dönüşüm getirdiğini şeffaf dashboard'umuzdan milisaniyesinde takip edin.</p>
                        </div>
                    </div>
                </div>
            </section>

            <BottomCTA
                title="Kazancınızı Büyütmeye Başlayın"
                subtitle="Elit Insider ağına katılıp komisyon modelimizi anında kullanmaya başlayın."
                buttonText="Insider Ol"
                theme="light"
            />
        </main>
    );
}

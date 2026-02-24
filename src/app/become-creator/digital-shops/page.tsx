import React from 'react';
import BottomCTA from '@/components/BottomCTA';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function DigitalShopsPage() {
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
                            <ShoppingBag size={16} /> DİJİTAL MAĞAZALAR
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                            Kendi Premium <br />
                            <span style={{ color: '#000', position: 'relative' }}>
                                Mağazanı Kur.
                                <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
                            Takipçileriniz favorilerinizi tek bir çatı altında farksız bir şıklıkla incelesin. Link in bio'nuza yakışır dijital vitrininizle saniyeler içinde zevkinizi komisyona dönüştürün.
                        </p>
                    </div>

                    {/* DYNAMIC MOCK UI FOR DIGITAL SHOP */}
                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '9/16', background: '#fafafa',
                            borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', border: '8px solid #fff', overflow: 'hidden'
                        }}>
                            {/* Fake Shop Header */}
                            <div style={{ padding: '30px 20px', textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ccc', backgroundImage: 'url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop)', backgroundSize: 'cover', margin: '0 auto 15px' }} />
                                <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '5px' }}>@ElitKüratör</div>
                                <div style={{ color: '#666', fontSize: '0.9rem' }}>Room001 Mağazası</div>
                            </div>
                            {/* Fake Categories */}
                            <div style={{ display: 'flex', gap: '10px', padding: '15px 20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                <div style={{ padding: '6px 16px', background: '#111', color: '#fff', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Tümü</div>
                                <div style={{ padding: '6px 16px', background: '#eee', color: '#666', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Güzellik</div>
                                <div style={{ padding: '6px 16px', background: '#eee', color: '#666', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Moda</div>
                            </div>
                            {/* Fake Products Grid */}
                            <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} style={{ aspectRatio: '3/4', borderRadius: '12px', background: '#eee', backgroundImage: `url(https://images.unsplash.com/photo-${1500000000000 + i * 10000}?q=80&w=300&auto=format&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                                ))}
                            </div>
                        </div>

                        {/* Floating Earnings Addon */}
                        <div style={{
                            position: 'absolute', bottom: '15%', right: '-10%', background: '#fff', padding: '15px 25px',
                            borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '15px',
                            animation: 'float 4s ease-in-out infinite'
                        }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>🛍️</div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>Mağaza Satışı</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>₺850.00 Kazanç</div>
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
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Tek Bir Link, Sonsuz Olasılık</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Sizi anlatan ürünleri bir araya toplayın. Link-in-bio çözümümüzle kitleniz tek tıkla dünyanıza girip, beğendiğiniz ürünleri komisyonlu olarak satın alsın.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Zahmetsiz Kürasyon</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Özel Chrome eklentimiz ve Room001 entegrasyonu ile herhangi bir markadan bulduğunuz ürünü saniyeler içinde mağazanıza ekleyin.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <BottomCTA
                title="Vitrinizi Açmanın Vakti Geldi"
                subtitle="Daha profesyonel görünün, daha fazla komisyon kazanın."
                buttonText="Mağazamı Kur"
                theme="dark"
            />
        </main>
    );
}

import React from 'react';
import BottomCTA from '@/components/BottomCTA';
import { Megaphone, Zap, Users } from 'lucide-react';

export default function BrandsAmplifyPage() {
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
                            <Megaphone size={16} /> BÜYÜT (AMPLIFY)
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                            Dalgayı <br />
                            <span style={{ color: '#000', position: 'relative' }}>
                                Fırtınaya Çevirin.
                                <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
                            Performans veren işbirliklerini scale edin. Reklam algısını yenen, "kullanıcı dostu elçilikler" yaratarak Room001 ağı sayesinde kulaktan kulağa yayılan fenomen bir büyüme (viral etki) elde edin.
                        </p>
                    </div>

                    {/* DYNAMIC CASE STUDY UI */}
                    <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '480px', background: '#fafafa',
                            borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: '1px solid #eaeaea', overflow: 'hidden'
                        }}>
                            {/* Case Study Header Mock */}
                            <div style={{ padding: '30px', background: '#fff', borderBottom: '1px solid #eee' }}>
                                <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Başarı Hikayesi</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#ccc', backgroundImage: 'url(https://images.unsplash.com/photo-1617019114594-c941e8656f70?q=80&w=200&auto=format&fit=crop)', backgroundSize: 'cover' }} />
                                    <div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>Kiehl's Super Multi-Corrective</div>
                                        <div style={{ color: '#666', fontSize: '1rem', fontWeight: 500 }}>Lansman Kampanyası</div>
                                    </div>
                                </div>
                            </div>

                            {/* Case Study Grid Mock */}
                            <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>Katılımcı Insider</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111' }}>45</div>
                                </div>
                                <div>
                                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>Toplam Erişim (Reach)</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111' }}>2.4M</div>
                                </div>
                                <div style={{ gridColumn: '1 / -1', height: '1px', background: '#eee', margin: '10px 0' }} />
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>Satış Dönüşümü (ROAS)</div>
                                    <div style={{ height: '24px', width: '100%', background: '#eee', borderRadius: '12px', overflow: 'hidden' }}>
                                        <div style={{ width: '85%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', paddingLeft: '15px', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>
                                            Endüstri Normunun %85 Üzeri
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Floating Interaction Notification */}
                        <div style={{
                            position: 'absolute', top: '-5%', right: '5%', background: '#111', color: '#fff', padding: '15px 25px',
                            borderRadius: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '15px',
                            animation: 'float 3.5s ease-in-out infinite'
                        }}>
                            <Zap size={20} color="#FFC107" />
                            <span style={{ fontWeight: 600 }}>Viral Etkileşim</span>
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
                                <Megaphone size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Ölçeklenebilir Efor</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Eforsuzca yüzlerce kaliteli Insider ile çalışın. Manuel bütçe dağıtımları yerine platform içi algoritmik destekle başarılı gidenleri kopyalayın.</p>
                        </div>
                        <div>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fff', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #ddd' }}>
                                <Users size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Otomasyon ve Güven</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Sözleşmeler, ürün iadeleri veya komisyon sorunlarını düşünmeyin. ROOM001 arka planda tüm pürüzleri çözer, siz sadece büyümeye odaklanırsınız.</p>
                        </div>
                    </div>
                </div>
            </section>

            <BottomCTA
                title="Sınırları Zorlayın"
                subtitle="Elit bir müşteri kitlesine satılmayan ama samimiyetle tavsiye edilen ürünler yaratın."
                buttonText="Bize Ulaşın"
                href="/for-brands"
                theme="light"
            />
        </main>
    );
}

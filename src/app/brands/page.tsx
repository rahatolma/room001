import React from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, Users, Zap, ShieldCheck } from 'lucide-react';
import Button from '@/components/Button';

export const metadata = {
    title: 'Markalar İçin Room001 | Etkileyici Pazarlama Ağı',
    description: 'Türkiye\'nin en seçkin içerik üreticilerine tek noktadan ulaşın, teklifler gönderin ve ROI garantili kampanyalar oluşturun.',
};

export default function BrandsLandingPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'var(--font-dm-sans)' }}>
            {/* HERO SECTION */}
            <section style={{
                background: '#111',
                color: 'white',
                padding: '120px 20px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

                <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', padding: '6px 16px', borderRadius: 30, fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1, marginBottom: 30, color: '#fef08a' }}>
                        MARKALAR İÇİN ROOM001
                    </div>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 30 }}>
                        Geleceğin Ticareti <br /> Müşteri Odaklıdır.
                    </h1>
                    <p style={{ fontSize: '1.3rem', color: '#a1a1aa', lineHeight: 1.6, maxWidth: 650, margin: '0 auto 40px auto' }}>
                        Room001 ile Türkiye'nin en seçkin ve performans garantili içerik üreticilerine tek ekrandan ulaşın.
                        Doğru kitleye, doğru ürünle, en yüksek ROI üzerinden doğrudan satış yapın.
                    </p>
                    <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
                        <Link href="/brands/inquiry">
                            <Button style={{ padding: '16px 36px', fontSize: '1.1rem', background: 'white', color: 'black' }}>
                                Hemen Başvurun
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" style={{ padding: '16px 36px', fontSize: '1.1rem', borderColor: 'rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>
                                Ağı Keşfedin
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* TRUSTED BY / LOGOS (Animated Slider) */}
            <section style={{
                padding: '80px 0',
                background: '#fff',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
                    <p style={{ fontSize: '1.2rem', color: '#374151', lineHeight: 1.6, marginBottom: 50, fontWeight: 500 }}>
                        Dünyanın ve Türkiye'nin önde gelen markaları, içerik üreticisi stratejilerini güçlendirmek ve
                        satışa dönüşen, büyüyen kampanyalar yaratmak için Room001'e güveniyor.
                    </p>
                </div>

                <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                    <div className="animate-marquee" style={{ gap: 24, paddingLeft: 24, display: 'flex' }}>
                        {/* Duplicate the list to make the infinite scroll seamless */}
                        {[...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                {[
                                    { name: 'Dyson', font: 'serif' },
                                    { name: 'Sephora', font: 'sans-serif' },
                                    { name: 'Boyner', font: 'serif' },
                                    { name: 'M.A.C', font: 'sans-serif' },
                                    { name: 'Trendyol', font: 'serif' },
                                    { name: 'Beymen', font: 'serif' },
                                    { name: 'L\'Oréal', font: 'sans-serif' }
                                ].map((brand, idx) => (
                                    <div key={`${i}-${idx}`} style={{
                                        flex: '0 0 auto',
                                        width: 220,
                                        height: 100,
                                        background: 'white',
                                        borderRadius: 16,
                                        border: '1px solid #eaeaea',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                                    }}>
                                        <h3 style={{
                                            margin: 0,
                                            fontSize: '1.7rem',
                                            fontFamily: brand.font === 'serif' ? 'Georgia, serif' : 'var(--font-dm-sans)',
                                            color: '#111827',
                                            fontWeight: brand.font === 'sans-serif' ? 800 : 400,
                                            letterSpacing: brand.font === 'sans-serif' ? '-1px' : '0'
                                        }}>
                                            {brand.name}
                                        </h3>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 50 }}>
                    <Link href="/brands/inquiry">
                        <Button style={{
                            background: '#1f2937',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: 30,
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12
                        }}>
                            Daha Fazla Bilgi Edinin
                            <div style={{ background: '#bef264', color: '#111827', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ArrowRight size={16} strokeWidth={3} />
                            </div>
                        </Button>
                    </Link>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" style={{ padding: '100px 20px', maxWidth: 'var(--max-width)', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 80 }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20 }}>Veri Odaklı Eşleşme.</h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: 600, margin: '0 auto' }}>Artık boşa harcanan marketing bütçelerine son. Sadece size yüksek getiri (ROAS) sağlayan üreticileri bulun.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
                    {[
                        { icon: <Zap size={30} />, title: 'Premium Ağ', desc: 'Sadece kalitesi kanıtlanmış, belirli bir satış performansını geçmiş "Insider" üreticiler platforma kabul edilir.' },
                        { icon: <BarChart3 size={30} />, title: 'Gerçek Zamanlı Veri', desc: 'Kampanyalarınızın anlık olarak kaç kişi tarafından görüntülendiğini ve sepete dönüştüğünü takip edin.' },
                        { icon: <Users size={30} />, title: 'Tinder Tarzı Keşif', desc: 'Kreatör havuzumuzda kitle demografisine göre gezin, beğendiklerinize tek tıkla "Hediye" veya "Çalışma" teklifi gönderin.' },
                        { icon: <ShieldCheck size={30} />, title: 'Güvenli Sözleşmeler', desc: 'Tüm ödemeleriniz ve anlaşmalarınız Room001 altyapısının garantisi altındadır.' }
                    ].map((feat, idx) => (
                        <div key={idx} style={{ background: 'white', padding: 40, borderRadius: 24, border: '1px solid #eaeaea', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                            <div style={{ width: 60, height: 60, background: '#f5f5f5', color: '#111', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                                {feat.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 15 }}>{feat.title}</h3>
                            <p style={{ fontSize: '1.05rem', color: '#666', lineHeight: 1.6 }}>{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '120px 20px', background: '#fff', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#111', marginBottom: 30 }}>
                        Markanızı Büyütmeye Hazır Mısınız?
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px auto' }}>
                        Uzman ekibimiz, hedeflerinize uygun doğru stratejiyi kurgulamak için sizi bekliyor.
                    </p>
                    <Link href="/brands/inquiry">
                        <Button style={{ padding: '20px 40px', fontSize: '1.2rem', background: '#111', color: 'white' }}>
                            Satış Ekibimizle Görüşün <ArrowRight size={20} style={{ marginLeft: 10, display: 'inline' }} />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

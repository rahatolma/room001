import React from 'react';
import BottomCTA from '@/components/BottomCTA';
import { Search, Filter, Star } from 'lucide-react';

export default function BrandsDiscoverPage() {
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
                            <Search size={16} /> KEŞFET
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                            Kültür Yaratanları<br />
                            <span style={{ color: '#000', position: 'relative' }}>
                                Keşfedin.
                                <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
                            Klasik influencer ağlarından sıkıldınız mı? Room001 ile %100 onaylı, zevk sahibi ve hiper-niş kitlelere sahip 10.000'den fazla küratörü saniyeler içinde filtreleyin.
                        </p>
                    </div>

                    {/* DYNAMIC MOCK UI FOR CREATOR SEARCH */}
                    <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{
                            position: 'relative', width: '100%', maxWidth: '480px', background: '#fff',
                            borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', border: '1px solid #eaeaea', overflow: 'hidden'
                        }}>
                            {/* Filter Header Mock */}
                            <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <div style={{ flex: 1, padding: '12px 20px', background: '#f5f5f5', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.9rem' }}>
                                    <Search size={18} /> "Lüks Cilt Bakımı"
                                </div>
                                <div style={{ width: '45px', height: '45px', background: '#111', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Filter size={18} />
                                </div>
                            </div>

                            {/* Search Results Mock */}
                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {[
                                    { name: "@skincare_guru", tag: "Cilt Bakım Uzmanı", reach: "1.2M", img: "1544005313-94ddf0286df2" },
                                    { name: "@lux_routine", tag: "Güzellik Editörü", reach: "850K", img: "1534528741775-53994a69daeb" },
                                    { name: "@the_aesthetic", tag: "Wellness Küratörü", reach: "420K", img: "1494790108377-be9c29b29330" }
                                ].map((creator, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '16px', transition: 'all 0.2s', cursor: 'pointer' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#eee', backgroundImage: `url(https://images.unsplash.com/photo-${creator.img}?q=80&w=200&auto=format&fit=crop)`, backgroundSize: 'cover' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}>{creator.name} <Star size={14} fill="#FFC107" color="#FFC107" /></div>
                                            <div style={{ color: '#666', fontSize: '0.85rem' }}>{creator.tag}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{creator.reach}</div>
                                            <div style={{ color: '#aaa', fontSize: '0.75rem', textTransform: 'uppercase' }}>Erişim</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Notification */}
                        <div style={{
                            position: 'absolute', bottom: '15%', right: '-5%', background: '#fff', padding: '12px 20px',
                            borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '15px',
                            animation: 'float 4s ease-in-out infinite'
                        }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E3F2FD', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✓</div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>120 Yeni Eşleşme</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Mükemmel Uyum</div>
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
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Hedef Kitle Filtreleme</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Insider'ları yaş, lokasyon, cinsiyet, niş marka ilgisi ve hatta "minimalist estetik" gibi spesifik zevk profillerine göre saniyeler içinde filtreleyin.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>Onaylanmış Performans</h3>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>Sahte takipçilerle vedalaşın. Room001 ağındaki her yayıncının dönüşüm oranları (Conversion Rate) ve gerçek etkileşim trafikleri (Click Outs) vizilitelidir.</p>
                        </div>
                    </div>
                </div>
            </section>

            <BottomCTA
                title="Doğru İnsanları Anında Bulun"
                subtitle="Ağımıza katılın ve markanızı bir sonraki seviyeye taşıyacak elçileri keşfedin."
                buttonText="Marka Ol"
                href="/for-brands"
                theme="dark"
            />
        </main>
    );
}

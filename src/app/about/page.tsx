import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { Users, Star, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
    return (
        <main style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '100px' }}>
            {/* HERO SECTION */}
            <section style={{
                position: 'relative',
                width: '100%',
                padding: '120px 0 80px',
                textAlign: 'center',
                overflow: 'hidden',
                borderBottom: '1px solid #eaeaea'
            }}>
                <div style={{
                    position: 'absolute', top: '-20%', left: '10%', width: '40%', height: '80%',
                    background: 'radial-gradient(circle, rgba(230,240,255,0.4) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%', filter: 'blur(60px)', zIndex: 0
                }} />

                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--page-padding-x)', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-block', padding: '6px 16px', background: '#f0ece6', borderRadius: '30px',
                        fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#555', marginBottom: '24px'
                    }}>
                        BİZ KİMİZ?
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: '#111', letterSpacing: '-1.5px', marginBottom: '24px' }}>
                        Zevk Ekonomisine<br />
                        <span style={{ color: '#000', position: 'relative' }}>
                            Yön Veren Ağ.
                            <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>

                    <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '40px' }}>
                        ROOM001, sıradanlığın ötesine geçerek özgün stili ve kültürü savunan premium bir içerik ekosistemidir.
                        Amacımız, gerçek fikir önderleri ile nitelikli markaları şeffaf, kazançlı ve ilham verici bir ortamda buluşturmaktır.
                    </p>
                </div>
            </section>

            {/* MANIFESTO / MISSION SECTION */}
            <section style={{ padding: '100px 0', backgroundColor: '#fafafa' }}>
                <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>Manifestomuz</h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>ROOM001 olarak üç temel direk üzerinde yükseliyoruz.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        {/* Pillar 1 */}
                        <div style={{
                            background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            border: '1px solid #eee', transition: 'transform 0.3s ease', cursor: 'pointer'
                        }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#ffebee', color: '#c62828', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                <Star size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Insider'lar İçin Değer</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Zevk sahiplerinin otantik önerilerini kalıcı bir kazanç modeline dönüştürmelerini sağlıyoruz. Yaratıcılığınızın hakkını veriyoruz.</p>
                        </div>

                        {/* Pillar 2 */}
                        <div style={{
                            background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            border: '1px solid #eee', transition: 'transform 0.3s ease', cursor: 'pointer'
                        }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#e3f2fd', color: '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                <TrendingUp size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Markalar İçin Performans</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Algoritmaların gürültüsünü aşın. Hedef kitlenize gerçek kanaat önderleri aracılığıyla, organik ve ölçülebilir bir şekilde ulaşın.</p>
                        </div>

                        {/* Pillar 3 */}
                        <div style={{
                            background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            border: '1px solid #eee', transition: 'transform 0.3s ease', cursor: 'pointer'
                        }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#e8f5e9', color: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                <ShieldCheck size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Tüketiciler İçin Güven</h3>
                            <p style={{ color: '#666', lineHeight: 1.6 }}>Binlerce manipüle edilmiş reklam yerine, estetik algısına güvendiğiniz insanların şeffaf ve dürüst ürün dolaplarından alışveriş yapın.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* METRICS / STATS SECTION */}
            <section style={{ padding: '80px 0', backgroundColor: '#111', color: '#fff' }}>
                <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '10px' }}>10.000+</div>
                            <div style={{ fontSize: '1.1rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Premium Insider</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '10px' }}>250+</div>
                            <div style={{ fontSize: '1.1rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Partner Marka</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '10px' }}>%15-30</div>
                            <div style={{ fontSize: '1.1rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Yüksek Komisyon Oranı</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section style={{ padding: '100px 0', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '24px' }}>Bu Ekosistemin Bir Parçası Olun</h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
                        Zevkinizi gelire dönüştürmek veya markanızı elit bir kitleyle buluşturmak için ilk adımı atın.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/become-creator" style={{ textDecoration: 'none' }}>
                            <Button style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '50px', background: '#111', color: '#fff' }}>
                                Insider Başvurusu
                            </Button>
                        </Link>
                        <Link href="/for-brands" style={{ textDecoration: 'none' }}>
                            <Button variant="outline" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '50px', borderColor: '#111', color: '#111' }}>
                                Markalar İçin Keşfet
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../Button';

export default function HeroSection() {
    return (
        <section style={{
            position: 'relative',
            width: '100%',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: 'white', // Changed from #FFFCF8 (cream) to white based on feedback
            padding: '120px 0 80px',
        }}>
            {/* Abstract Background Design / Glows */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%',
                background: 'radial-gradient(circle, rgba(255,200,150,0.15) 0%, rgba(255,252,248,0) 70%)',
                borderRadius: '50%', filter: 'blur(60px)', zIndex: 0
            }} />
            <div style={{
                position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%',
                background: 'radial-gradient(circle, rgba(200,220,255,0.15) 0%, rgba(255,252,248,0) 70%)',
                borderRadius: '50%', filter: 'blur(60px)', zIndex: 0
            }} />

            <div style={{
                maxWidth: 'var(--max-width)',
                padding: '0 var(--page-padding-x)',
                margin: '0 auto',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '60px',
                zIndex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {/* Text Content */}
                <div style={{ flex: '1 1 500px', maxWidth: '650px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        background: '#f0ece6',
                        borderRadius: '30px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: '#555',
                        marginBottom: '24px'
                    }}>
                        TÜRKİYE'NİN EN PREMİUM İÇERİK AĞI
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        color: '#111',
                        letterSpacing: '-2px',
                        marginBottom: '24px'
                    }}>
                        Zevkini <br />
                        <span style={{ color: '#000', position: 'relative' }}>
                            Paraya Dönüştür.
                            <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%', height: '12px', zIndex: -1 }} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00032 6.5C40.667 2.16667 114.6 -2.3 198.5 6.5" stroke="#EAEAEA" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: 1.5,
                        color: '#555',
                        marginBottom: '40px',
                        maxWidth: '500px'
                    }}>
                        Yapay zeka tavsiyeleri değil, gerçek Insider seçimleri. Takipçilerine ilham ver, markalarla işbirliği yap ve önerilerinle kalıcı bir gelir modeli yarat.
                    </p>

                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <Link href="/become-creator" style={{ textDecoration: 'none' }}>
                            <Button style={{
                                padding: '16px 36px',
                                fontSize: '1.1rem',
                                borderRadius: '50px',
                                background: '#111',
                                color: '#fff',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                            }}>
                                Insider Olarak Katıl
                            </Button>
                        </Link>
                        <Link href="/brands" style={{ textDecoration: 'none' }}>
                            <Button variant="outline" style={{
                                padding: '16px 36px',
                                fontSize: '1.1rem',
                                borderRadius: '50px',
                                borderColor: '#111',
                                color: '#111',
                                background: 'transparent'
                            }}>
                                Marka Olarak Katıl
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', marginLeft: '10px' }}>
                            {/* Overlapping Avatars */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} style={{
                                    width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #FFF',
                                    marginLeft: '-10px', background: '#DDD', backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover'
                                }} />
                            ))}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>
                            <strong>10.000+</strong> elit Insider arasına katıl
                        </div>
                    </div>
                </div>

                {/* Imagery / UI Mockup representing LTK/Room001 profile */}
                <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '420px',
                        aspectRatio: '9/16',
                        background: '#fff',
                        borderRadius: '30px',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
                        overflow: 'hidden',
                        border: '8px solid #f9f9f9'
                    }}>
                        {/* Fake App UI Header */}
                        <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ccc', backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop)', backgroundSize: 'cover' }} />
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>@stil_ikonu</div>
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>Moda & Yaşam Tarzı Editörü</div>
                                </div>
                            </div>
                        </div>
                        {/* Fake Masonry Grid - Adjusted for better visual balance */}
                        <div style={{ padding: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'start' }}>
                            {/* Column 1 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ height: '180px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div style={{ height: '220px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div style={{ height: '150px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1617019114594-c941e8656f70?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div style={{ height: '190px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            </div>
                            {/* Column 2 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ height: '140px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div style={{ height: '160px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div style={{ height: '190px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                <div style={{ height: '140px', borderRadius: '12px', background: '#f0f0f0', backgroundImage: 'url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            </div>
                        </div>
                    </div>
                    {/* Floating Earning Tag */}
                    <div style={{
                        position: 'absolute', top: '15%', right: '-5%', background: '#fff', padding: '12px 20px',
                        borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px',
                        animation: 'float 3s ease-in-out infinite'
                    }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FCE4EC', color: '#C2185B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>✦</div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600, textTransform: 'uppercase' }}>Yeni İşbirliği</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Dyson Türkiye</div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </section>
    );
}

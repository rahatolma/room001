'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const MANIFESTO_SLIDES = [
    {
        id: 1,
        title: "Algoritmalar Değil,",
        subtitle: "Tutkular Konuşsun.",
        description: "Herkesin bir zevki var. Biz, en iyisini bilenlerin peşindeyiz. Yapay zeka tavsiyeleri değil, gerçek Insider seçimleri.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Keşfedilmemişi",
        subtitle: "Birlikte Bulalım.",
        description: "Standart vitrinlerden sıkılanlar için yeni bir soluk. Niş markalar, özel koleksiyonlar ve gizli kalmış hazineler.",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Alışverişin",
        subtitle: "Yeni Hikayesi.",
        description: "Sadece ürün değil, ilham satın alın. En sevdiğiniz Insider'ların dünyasına adım atın.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function ManifestoSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % MANIFESTO_SLIDES.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(timer);
    }, []);

    return (
        <section style={{
            position: 'relative',
            width: '100%',
            height: '850px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            background: '#000'
        }}>
            {/* Background Images */}
            {MANIFESTO_SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === currentSlide ? 0.6 : 0,
                        transition: 'opacity 1.5s ease-in-out',
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0
                    }}
                />
            ))}

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
                zIndex: 1
            }} />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 20px',
                width: '100%',
                color: 'white'
            }}>
                {MANIFESTO_SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        style={{
                            display: index === currentSlide ? 'block' : 'none',
                            animation: 'fadeInUp 1s ease'
                        }}
                    >
                        <h2 style={{
                            fontFamily: 'var(--font-dm-sans), sans-serif',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '10px',
                            color: '#ccc',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            {slide.title}
                        </h2>
                        <h1 style={{
                            fontFamily: 'var(--font-dm-sans), sans-serif',
                            fontSize: '4.5rem',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '30px',
                            maxWidth: '900px'
                        }}>
                            {slide.subtitle}
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            lineHeight: 1.6,
                            maxWidth: '600px',
                            marginBottom: '40px',
                            color: 'rgba(255,255,255,0.9)'
                        }}>
                            {slide.description}
                        </p>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Link href="/creators">
                                <button style={{
                                    padding: '16px 32px',
                                    background: 'white',
                                    color: 'black',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    transition: 'transform 0.2s'
                                }}>
                                    Insider'ları Keşfet
                                </button>
                            </Link>
                            <Link href="/auth/signup">
                                <button style={{
                                    padding: '16px 32px',
                                    background: 'transparent',
                                    color: 'white',
                                    border: '1px solid white',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}>
                                    Insider Ol
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicators */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
                zIndex: 3
            }}>
                {MANIFESTO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}

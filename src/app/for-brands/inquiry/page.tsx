'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Building2 } from 'lucide-react';
import Button from '@/components/Button';

export default function BrandInquiryPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulasyon API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', padding: 20, fontFamily: 'var(--font-dm-sans)' }}>
                <div style={{ background: 'white', maxWidth: 600, width: '100%', padding: '60px 40px', borderRadius: 24, textAlign: 'center', border: '1px solid #eaeaea', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>Talebiniz Alındı!</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6, marginBottom: 40 }}>
                        Teşekkür ederiz. Marka büyüme uzmanlarımız formunuzu inceleyecek ve en kısa sürede sizinle (genellikle 24 saat içerisinde) iletişime geçecektir.
                    </p>
                    <Link href="/">
                        <Button style={{ width: '100%', padding: 16 }}>Ana Sayfaya Dön</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', padding: '60px 20px', fontFamily: 'var(--font-dm-sans)' }}>

            <div style={{ maxWidth: 1000, width: '100%', display: 'flex', background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>

                {/* Left Side: Info */}
                <div style={{ flex: 1, background: '#111', color: 'white', padding: '60px 50px', display: 'flex', flexDirection: 'column' }}>
                    <Link href="/brands" style={{ color: '#aaa', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', marginBottom: 40, textDecoration: 'none' }} className="hover:text-white">
                        <ArrowLeft size={16} /> Markalar Sayfasına Dön
                    </Link>

                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.1 }}>
                        Markanızı <br />Ağımıza Taşıyın
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: 50 }}>
                        Lütfen yandaki formu eksiksiz doldurun. Sizi doğru konumlandırmak ve uygun kitleyi bulmak için bu bilgilere ihtiyacımız var.
                    </p>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <Building2 size={24} color="#fef08a" />
                        </div>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 600 }}>Performans Garantisi</h4>
                        <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                            Sadece ROAS hedeflerinizi tutturan creatorlar ile çalışma imkanı.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div style={{ flex: 1.2, padding: '60px 80px' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 10px 0' }}>İletişim Formu</h3>
                    <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: 30 }}>İş yetkilisi iseniz kurumsal e-posta adresinizi kullanınız.</p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: 8 }}>Adınız *</label>
                                <input type="text" required style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} placeholder="Örn: Asena" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: 8 }}>Soyadınız *</label>
                                <input type="text" required style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} placeholder="Örn: Yılmaz" />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: 8 }}>Şirket E-postası *</label>
                            <input type="email" required style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} placeholder="isim@sirketiniz.com" />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: 8 }}>Çalıştığınız Marka / Web Sitesi *</label>
                            <input type="url" required style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} placeholder="https://..." />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: 8 }}>Aylık Tahmini Pazarlama Bütçesi</label>
                            <select style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none', background: 'white' }}>
                                <option>50.000₺ - 200.000₺ (Gelişen Marka)</option>
                                <option>200.000₺ - 1.000.000₺ (Ölçeklenen Marka)</option>
                                <option>1.000.000₺+ (Kurumsal / Ajans)</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#444', marginBottom: 8 }}>Ana Hedefiniz Ne?</label>
                            <textarea rows={4} style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none', resize: 'vertical' }} placeholder="Örn: Yeni çıkacak yaz koleksiyonumuz için awareness yaratmak ve affiliate satışları artırmak..." />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                padding: '16px',
                                fontSize: '1.05rem',
                                background: '#111',
                                color: 'white',
                                marginTop: 10,
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    );
}

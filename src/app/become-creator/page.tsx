'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkCreatorEligibility, sendPhoneOtpAction, verifyPhoneOtpAction } from '@/actions/auth';
import { submitCreatorApplication } from '@/actions/creator';
import Button from '@/components/Button';

// Dynamically import authactions to avoid server/client boundary issues if needed, 
// though direct import works in Next.js App Router for server actions usually.
import { ArrowRight, Sparkles, TrendingUp, Link as LinkIcon, DollarSign, Target, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BecomeCreatorPage() {
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [instagramHandle, setInstagramHandle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [eligibilityMsg, setEligibilityMsg] = useState('');

    // Step 1: Check Instagram
    const handleCheckInstagram = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!instagramHandle) {
            setError('Lütfen kullanıcı adınızı girin.');
            setLoading(false);
            return;
        }

        const result = await checkCreatorEligibility(instagramHandle);
        setLoading(false);

        if (result.success && result.eligible) {
            setEligibilityMsg(result.message || '');
            setStep(2);
        } else {
            setError(result.message || 'Üzgünüz, kriterleri sağlamıyorsunuz.');
        }
    };

    // Step 2: Send OTP
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await sendPhoneOtpAction(phoneNumber);
        setLoading(false);

        if (result.success) {
            setStep(3);
        } else {
            setError(result.error || 'SMS gönderilemedi.');
        }
    };

    // Step 3: Verify OTP and Create Account
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await verifyPhoneOtpAction(phoneNumber, otpCode);

        if (result.success) {
            await submitCreatorApplication({
                phoneNumber: phoneNumber,
                socials: { instagram: instagramHandle }
            });
            router.push('/dashboard');
        } else {
            setLoading(false);
            setError(result.error || 'Kod hatalı.');
        }
    };

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
                <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(255, 200, 150, 0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

                <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', padding: '6px 16px', borderRadius: 30, fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1, marginBottom: 30, color: '#ffedd5' }}>
                        INSIDER AĞINA KATIL
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 30 }}>
                        Zevkini Kalıcı Bir <br /> İş Modeline Dönüştür.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#a1a1aa', lineHeight: 1.6, maxWidth: 650, margin: '0 auto 40px auto' }}>
                        Daha fazla satış yapın, performansınızı analiz edin ve elit markalarla birinci elden işbirliği kurun. Türkiye'nin en seçkin içerik ağındaki yerinizi alın.
                    </p>
                    <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
                        <Link href="#application-form">
                            <Button style={{ padding: '16px 36px', fontSize: '1.1rem', background: 'white', color: 'black' }}>
                                Hemen Başvur
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '100px 20px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 80 }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20 }}>Neden Room001?</h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: 600, margin: '0 auto' }}>Sadece bir link paylaşım platformu değil, içerik üreticilerinin işlerini büyütmeleri için tasarlanmış bir ekosistem.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
                    {[
                        { icon: <LinkIcon size={30} />, title: 'Güçlü Affiliate Linkleri', desc: 'Tek bir premium link oluşturun. Takipçileriniz tıkladığında Room001 alandan sapmadan, en yüksek dönüşüm oranıyla satın almayı tamamlar.' },
                        { icon: <Sparkles size={30} />, title: 'Zarif Mağaza Vitrini', desc: 'ShopMyt tarzı kişiselleştirilmiş bir mağaza oluşturun. Ürünlerinizi, koleksiyonlarınızı ve sosyal medya postlarınızı tek bir şık adreste toplayın.' },
                        { icon: <Target size={30} />, title: 'Premium Marka Eşleşmeleri', desc: 'Ağa katıldığınız an, Dior, Sephora, Dyson gibi kurumsal markaların keşfet paneline girersiniz. Size özel kampanyalar ve hediye ürün teklifleri alın.' },
                        { icon: <TrendingUp size={30} />, title: 'Gelişmiş Analitik', desc: 'Hangi ürünün daha çok sattığını, kitlenizin hangi saatlerde daha çok tıkladığını gerçek zamanlı olarak ölçün ve stratejinizi geliştirin.' }
                    ].map((feat, idx) => (
                        <div key={idx} style={{ background: 'white', padding: 40, borderRadius: 24, border: '1px solid #eaeaea', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                            <div style={{ width: 60, height: 60, background: '#fefce8', color: '#d97706', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                                {feat.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 15 }}>{feat.title}</h3>
                            <p style={{ fontSize: '1.05rem', color: '#666', lineHeight: 1.6 }}>{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* APPLICATION FORM SECTION */}
            <section id="application-form" style={{ padding: '80px 20px', background: '#f5f5f5', borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: 'var(--max-width, 1200px)', width: '100%', display: 'flex', flexWrap: 'wrap', background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>

                    {/* Left Side: Info */}
                    <div style={{ flex: '1 1 400px', background: '#111', color: 'white', padding: '60px 50px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: 40 }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.1 }}>
                                Talebinizi<br />Oluşturun
                            </h2>
                            <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                {step === 1 && 'Platform standartlarını korumak amacıyla bir eleme sürecimiz vardır. İlk adım olarak Instagram kullanıcı adınızla uygunluk kontrolü yapın.'}
                                {step === 2 && 'Harika! Kriterleri sağlıyorsunuz. İletişim için cep numaranızı girin.'}
                                {step === 3 && 'Profilinizi güvene almak için telefonunuza gelen kodu girin.'}
                            </p>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                <ShieldCheck size={24} color="#fef08a" />
                            </div>
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 600 }}>Güvenli Eşleşme</h4>
                            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                Başvurunuz sadece markalar ile size özel güvenilir fırsatlar oluşturmak içi incelenir.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div style={{ flex: '1.2 1 500px', padding: '60px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {step === 1 && (
                            <form onSubmit={handleCheckInstagram} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.9rem' }}>Instagram Kullanıcı Adı</label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 12, overflow: 'hidden', background: '#f9f9f9', padding: '4px' }}>
                                        <div style={{ padding: '12px 15px', color: '#888', fontWeight: 600 }}>@</div>
                                        <input
                                            type="text"
                                            value={instagramHandle}
                                            onChange={(e) => setInstagramHandle(e.target.value)}
                                            placeholder="kullaniciadi"
                                            style={{ flex: 1, padding: '14px 12px', border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem', fontWeight: 500 }}
                                        />
                                    </div>
                                </div>

                                {error && <div style={{ color: '#e00', background: '#ffebeb', padding: 12, borderRadius: 8, fontSize: '0.95rem', fontWeight: 500 }}>{error}</div>}

                                <Button type="submit" fullWidth disabled={loading} style={{ padding: '18px', fontSize: '1.1rem', background: '#111', color: 'white', borderRadius: 12 }}>
                                    {loading ? 'Kontrol Ediliyor...' : 'Uygunluğu Kontrol Et'}
                                </Button>

                                <div style={{ fontSize: '0.85rem', color: '#888', textAlign: 'center', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <ShieldCheck size={16} /> Ağa katılım için minimum 20.000 takipçi gereklidir.
                                </div>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <div style={{ color: '#16a34a', background: '#dcfce7', padding: 16, borderRadius: 8, fontSize: '1rem', fontWeight: 500, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    <CheckCircle2 size={20} /> {eligibilityMsg}
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.9rem' }}>Cep Telefonu</label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="0555 123 45 67"
                                        style={{ width: '100%', padding: '16px', border: '1px solid #ddd', borderRadius: 12, fontSize: '1.05rem', outline: 'none' }}
                                    />
                                </div>

                                {error && <div style={{ color: '#e00', background: '#ffebeb', padding: 12, borderRadius: 8, fontSize: '0.95rem', fontWeight: 500 }}>{error}</div>}

                                <Button type="submit" fullWidth disabled={loading} style={{ padding: '18px', fontSize: '1.1rem', background: '#111', color: 'white', borderRadius: 12 }}>
                                    {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
                                </Button>

                                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem', marginTop: 10, textDecoration: 'underline' }}>Farklı bir Instagram hesabı dene</button>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <label style={{ display: 'block', marginBottom: 15, fontWeight: 600, fontSize: '1rem', color: '#444' }}>Telefonunuza gönderilen 6 haneli doğrulama kodunu girin:</label>
                                    <input
                                        type="text"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value)}
                                        placeholder="••••••"
                                        maxLength={6}
                                        style={{ width: '100%', padding: '20px', border: '2px solid #ddd', borderRadius: 12, fontSize: '2rem', letterSpacing: 8, textAlign: 'center', outline: 'none', background: '#fafafa' }}
                                    />
                                </div>

                                {error && <div style={{ color: '#e00', background: '#ffebeb', padding: 12, borderRadius: 8, fontSize: '0.95rem', fontWeight: 500 }}>{error}</div>}

                                <Button type="submit" fullWidth disabled={loading} style={{ padding: '18px', fontSize: '1.1rem', background: '#111', color: 'white', borderRadius: 12 }}>
                                    {loading ? 'Hesap Oluşturuluyor...' : 'Onayla ve Profiline Git'}
                                </Button>

                                <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem', marginTop: 10, textDecoration: 'underline' }}>Telefon Numarasını Değiştir</button>
                            </form>
                        )}

                        <div style={{ textAlign: 'center', marginTop: 40, borderTop: '1px solid #eee', paddingTop: 20 }}>
                            <p style={{ color: '#666', fontSize: '0.95rem' }}>
                                Zaten hesabınız var mı? <Link href="/?login=true" style={{ color: '#111', fontWeight: 600, textDecoration: 'underline' }}>Giriş Yapın</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

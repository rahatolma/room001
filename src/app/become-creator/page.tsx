'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkCreatorEligibility } from '@/actions/auth';
import { submitCreatorApplication } from '@/actions/creator';
import Button from '@/components/Button';

// Dynamically import authactions to avoid server/client boundary issues if needed, 
// though direct import works in Next.js App Router for server actions usually.
import { sendPhoneOtpAction, verifyPhoneOtpAction } from '@/actions/auth';

export default function BecomeCreatorPage() {
    const router = useRouter();

    // Steps: 
    // 1: Instagram Check
    // 2: Phone Input
    // 3: OTP Input
    // 4: Success
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
            // User is now logged in via cookie.
            // Now we finalize the creator role and data.
            await submitCreatorApplication({
                phoneNumber: phoneNumber,
                socials: { instagram: instagramHandle }
            });

            // Redirect to dashboard
            router.push('/dashboard');
        } else {
            setLoading(false);
            setError(result.error || 'Kod hatalı.');
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: '80px auto',  padding: 20 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h1 style={{  fontSize: '2.5rem', fontWeight: 800, marginBottom: 15 }}>
                    İçerik Üreticisi Olun
                </h1>
                <p style={{ color: '#666', lineHeight: 1.5 }}>
                    {step === 1 && 'Instagram hesabınızla başvurun, kriterleri sağlıyorsanız hemen aramıza katılın.'}
                    {step === 2 && 'Telefon numaranızı doğrulayarak hesabınızı oluşturun.'}
                    {step === 3 && 'Telefonunuza gelen kodu girin.'}
                </p>
            </div>

            <div style={{ background: 'white', padding: 30, border: '1px solid #eaeaea', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                {step === 1 && (
                    <form onSubmit={handleCheckInstagram} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Instagram Kullanıcı Adı</label>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
                                <div style={{ padding: '12px 15px', background: '#f5f5f5', color: '#666', fontWeight: 500 }}>@</div>
                                <input
                                    type="text"
                                    value={instagramHandle}
                                    onChange={(e) => setInstagramHandle(e.target.value)}
                                    placeholder="kullaniciadi"
                                    style={{ flex: 1, padding: 12, border: 'none', outline: 'none', fontSize: '1rem' }}
                                />
                            </div>
                        </div>

                        {error && <div style={{ color: '#e00', background: '#ffebeb', padding: 10, borderRadius: 6, fontSize: '0.9rem' }}>{error}</div>}

                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Kontrol Ediliyor...' : 'Uygunluğu Kontrol Et'}
                        </Button>

                        <p style={{ fontSize: '0.8rem', color: '#999', textAlign: 'center', marginTop: 10 }}>
                            *Min. 20.000 takipçi gereklidir.
                        </p>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ color: '#22c55e', background: '#eefcf3', padding: 12, borderRadius: 6, fontSize: '0.9rem', marginBottom: 10 }}>
                            {eligibilityMsg}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Cep Telefonu</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="0555 123 45 67"
                                style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8, fontSize: '1rem' }}
                            />
                        </div>

                        {error && <div style={{ color: '#e00', background: '#ffebeb', padding: 10, borderRadius: 6, fontSize: '0.9rem' }}>{error}</div>}

                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
                        </Button>

                        <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}>Geri Dön</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Doğrulama Kodu</label>
                            <input
                                type="text"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                placeholder="123456"
                                maxLength={6}
                                style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 8, fontSize: '1.5rem', letterSpacing: 5, textAlign: 'center' }}
                            />
                        </div>

                        {error && <div style={{ color: '#e00', background: '#ffebeb', padding: 10, borderRadius: 6, fontSize: '0.9rem' }}>{error}</div>}

                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Hesap Oluşturuluyor...' : 'Onayla ve Katıl'}
                        </Button>

                        <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}>Numarayı Değiştir</button>

                        <p style={{ fontSize: '0.75rem', color: '#ccc', textAlign: 'center', marginTop: 10 }}>Kod: Console loglarına bakın.</p>
                    </form>
                )}
            </div>
        </div>
    );
}

"use client";
import React, { useState } from 'react';
import Button from '@/components/Button';

import { findUserByEmailAction } from '@/actions/auth';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [demoPassword, setDemoPassword] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Demo Logic: Find user via Server Action
        const user = await findUserByEmailAction(email);
        if (user && user.password) {
            setDemoPassword(user.password);
        }

        setSubmitted(true);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '50px auto', textAlign: 'center', }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Şifrenizi mi Unuttunuz?</h1>
            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    <p>E-posta adresinizi girin.</p>
                    <input
                        type="email"
                        placeholder="E-posta Adresi"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '15px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <Button fullWidth>BAĞLANTIYI GÖNDER</Button>
                </form>
            ) : (
                <div style={{ marginTop: '20px', textAlign: 'left', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div style={{ color: 'green', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        ✅ E-posta gönderildi (Simülasyon)
                    </div>
                    <p style={{ marginBottom: '10px' }}>
                        Bu bir <strong>DEMO</strong> uygulaması olduğu için gerçek e-posta gönderilememektedir.
                    </p>

                    {demoPassword ? (
                        <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '4px', border: '1px solid #ffeeba', color: '#856404' }}>
                            <p style={{ fontWeight: 'bold' }}>Demo Modu - Kurtarma Bilgisi:</p>
                            <p>Kullanıcı: <strong>{email}</strong></p>
                            <p>Şifreniz: <strong>{demoPassword}</strong></p>
                            <div style={{ marginTop: '10px' }}>
                                <a href="/login" style={{ textDecoration: 'underline', color: '#856404' }}>Giriş sayfasına dön</a>
                            </div>
                        </div>
                    ) : (
                        <div style={{ color: 'red' }}>
                            <p>Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.</p>
                            <a href="/signup" style={{ textDecoration: 'underline' }}>Hesap Oluşturun</a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

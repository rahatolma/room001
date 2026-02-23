"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignup: () => void;
    type?: 'shopper' | 'creator' | 'brand';
    onLoginSuccess?: () => void;
}

import { Instagram, Mail } from 'lucide-react'; // Import icons

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignup, type = 'shopper', onLoginSuccess }) => {
    const { login } = useAuth();
    const [step, setStep] = useState<'PHONE' | 'OTP' | 'EMAIL'>('PHONE'); // EMAIL is for Brands
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [imgUrl, setImgUrl] = useState(''); // Just to keep imports clean if needed

    // Check type on mount/update to set initial step
    React.useEffect(() => {
        if (type === 'brand') {
            setStep('EMAIL');
        } else {
            setStep('PHONE');
        }
    }, [type]);

    // Reset state when modal closes
    React.useEffect(() => {
        if (!isOpen) {
            setPhoneNumber('');
            setOtpCode('');
            setError('');
            if (type !== 'brand') setStep('PHONE');
        }
    }, [isOpen, type]);

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // CHECK FOR DEMO USERS FIRST
        // We treat the phone number as the 'email' param for our specific mock login function
        const demoLoginSuccess = await login(phoneNumber);
        if (demoLoginSuccess) {
            onClose();
            if (onLoginSuccess) onLoginSuccess();
            // window.location.reload(); // Removed to prevent state wipe
            return;
        }

        // Dynamic import to avoid server-only module issues
        const { sendPhoneOtpAction } = await import('@/actions/auth');

        const result = await sendPhoneOtpAction(phoneNumber);
        if (result.success) {
            setStep('OTP');
        } else {
            setError(result.error || 'Bir hata oluştu.');
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const { verifyPhoneOtpAction } = await import('@/actions/auth');
        const result = await verifyPhoneOtpAction(phoneNumber, otpCode);

        if (result.success && result.user) {
            // Manually trigger login context update if needed, or just reload/close
            // Since we set cookie on server, we might need to refresh context.
            // For now, let's force reload or try to update context.
            // Ideally AuthContext should have a 'refresh' or we pass the user.

            // Simple way: Reload to pick up cookie
            // window.location.reload(); // Removed to prevent state wipe
        } else {
            setError(result.error || 'Kod hatalı.');
        }
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            onClose();
            if (onLoginSuccess) onLoginSuccess();
        } else {
            setError('Bilgiler hatalı. Lütfen kontrol edin.');
        }
    };

    let title = "Giriş Yap / Üye Ol";
    let description = "Telefon numaranızla hızlıca bağlanın.";

    if (type === 'creator') {
        title = "Insider Girişi";
    } else if (type === 'brand') {
        title = "Marka Girişi";
        description = "Marka portalına erişmek için kurumsal e-posta adresinizle giriş yapın.";
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            {description && <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 20 }}>{description}</p>}

            {step === 'PHONE' && (
                <form onSubmit={handlePhoneSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Cep Telefonu</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            placeholder="0555 123 45 67"
                            className={styles.input}
                            style={{ fontSize: '1.2rem', padding: '15px' }}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <Button type="submit" fullWidth>Kod Gönder</Button>
                    <p style={{ marginTop: 10, fontSize: '0.8rem', color: '#999' }}>Size tek kullanımlık bir SMS kodu göndereceğiz.</p>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '25px 0', color: '#ccc' }}>
                        <div style={{ flex: 1, height: 1, background: '#eee' }}></div>
                        <span style={{ padding: '0 10px', fontSize: '0.8rem', color: '#999' }}>VEYA</span>
                        <div style={{ flex: 1, height: 1, background: '#eee' }}></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #eaeaea', background: 'white', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                            <Mail size={18} /> Google ile Devam Et
                        </button>
                        <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #eaeaea', background: 'white', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                            <Instagram size={18} /> Instagram ile Devam Et
                        </button>
                    </div>
                </form>
            )}

            {step === 'OTP' && (
                <form onSubmit={handleOtpSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Doğrulama Kodu</label>
                        <input
                            type="text"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            required
                            placeholder="123456"
                            className={styles.input}
                            style={{ fontSize: '1.5rem', letterSpacing: '5px', textAlign: 'center' }}
                            maxLength={6}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <Button type="submit" fullWidth>Doğrula ve Giriş Yap</Button>
                    <button
                        type="button"
                        onClick={() => setStep('PHONE')}
                        style={{ background: 'none', border: 'none', marginTop: 15, color: '#666', cursor: 'pointer', fontSize: '0.9rem', width: '100%' }}
                    >
                        Numarayı Değiştir
                    </button>
                    {/* Dev helper for OTP */}
                    <p style={{ fontSize: '0.75rem', color: '#ccc', textAlign: 'center', marginTop: 10 }}>Kod için terminal/konsol loglarına bakın.</p>
                </form>
            )}

            {step === 'EMAIL' && (
                <form onSubmit={handleEmailSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>E-posta</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="marka@sirket.com"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <Button type="submit" fullWidth>Giriş Yap</Button>
                </form>
            )}

            <div className={styles.terms} style={{ marginTop: 25 }}>
                &quot;{step === 'OTP' ? 'Doğrula' : 'Giriş Yap'}&quot; diyerek <Link href="/legal/terms">Hizmet Şartları</Link>'nı ve <Link href="/legal/privacy">Gizlilik Politikası</Link>'nı kabul edersiniz.
            </div>

            {/* Shopper/Creator için Signup linki: Telefon ile giriş aynı zamanda kayıt olduğu için gerek yok ama navigation için bırakabiliriz */}
            {type !== 'brand' && step === 'PHONE' && (
                <div className={styles.footer}>
                    Farklı bir yöntem mi? <button type="button" onClick={onSwitchToSignup} className={styles.linkBtn}>Seçenekleri Gör</button>
                </div>
            )}
        </Modal>
    );
};
export default LoginModal;

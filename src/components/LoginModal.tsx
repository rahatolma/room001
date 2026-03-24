"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignup: () => void;
    type?: 'shopper' | 'creator' | 'brand';
    mode?: 'login' | 'signup';
    onLoginSuccess?: () => void;
}

import { Instagram, Mail } from 'lucide-react'; // Import icons

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignup, type: defaultType, mode = 'login', onLoginSuccess }) => {
    const { login, refreshUser } = useAuth();
    const router = useRouter();

    // Internal type state to handle selection if generic
    const [selectedType, setSelectedType] = useState<LoginModalProps['type']>(defaultType);

    // Initial step depends on whether a type was explicitly provided
    // If no specific type (e.g., from global header), start with ROLE_SELECTION
    const [step, setStep] = useState<'ROLE_SELECTION' | 'PHONE' | 'OTP' | 'EMAIL'>(
        !defaultType ? 'ROLE_SELECTION' : (defaultType === 'brand' ? 'EMAIL' : 'PHONE')
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [countryCode, setCountryCode] = useState('+90');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');
    const [otpTimer, setOtpTimer] = useState(0);

    // Reset state when modal closes or opens
    React.useEffect(() => {
        if (!isOpen) {
            setPhoneNumber('');
            setOtpCode('');
            setError('');
            setOtpTimer(0);
        } else {
            // When opening, reset to default state based on props
            setSelectedType(defaultType);
            if (!defaultType) {
                setStep('ROLE_SELECTION');
            } else if (defaultType === 'brand') {
                setStep('EMAIL');
            } else {
                setStep('PHONE');
            }
        }
    }, [isOpen, defaultType]);

    // OTP Timer countdown
    React.useEffect(() => {
        let timer: NodeJS.Timeout;
        if (otpTimer > 0) {
            timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [otpTimer]);

    const handleRoleSelect = (role: 'shopper' | 'creator' | 'brand') => {
        setSelectedType(role);
        setStep(role === 'brand' ? 'EMAIL' : 'PHONE');
    };

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const cleanPhone = phoneNumber.replace(/\s/g, '');

        // CHECK FOR DEMO USERS FIRST
        if (mode === 'login') {
            const demoLoginSuccess = await login(cleanPhone);
            if (demoLoginSuccess) {
                onClose();
                if (onLoginSuccess) onLoginSuccess();
                return;
            }
        }

        // Dynamic import to avoid server-only module issues
        const { sendPhoneOtpAction } = await import('@/actions/auth');

        const result = await sendPhoneOtpAction(cleanPhone, selectedType || 'shopper', mode);
        if (result.success) {
            setStep('OTP');
            setOtpTimer(60); // Start the 60 seconds countdown
        } else {
            setError(result.error || 'Bir hata oluştu.');
        }
    };

    const handleResendOtp = async () => {
        if (otpTimer > 0) return;
        setError('');
        const cleanPhone = phoneNumber.replace(/\s/g, '');
        const { sendPhoneOtpAction } = await import('@/actions/auth');

        const result = await sendPhoneOtpAction(cleanPhone, selectedType || 'shopper', mode);
        if (result.success) {
            setOtpTimer(60);
            // Optionally could add a success toast here
        } else {
            setError(result.error || 'Kod gönderilemedi.');
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const { verifyPhoneOtpAction } = await import('@/actions/auth');
        const result = await verifyPhoneOtpAction(phoneNumber, otpCode);

        if (result.success && result.user) {
            await refreshUser(); // Update AuthContext state
            if (onLoginSuccess) {
                onLoginSuccess();
            } else {
                router.push('/dashboard');
                router.refresh(); // Ensure layout refetches session
            }
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

    let title = mode === 'signup' ? "Hesap Oluştur" : "Giriş Yap";
    let description = mode === 'signup'
        ? "Devam etmek için cep telefonunuzu doğrulayın."
        : "Telefon numaranızla hızlıca bağlanın.";

    if (selectedType === 'creator') {
        title = "Insider Girişi";
    } else if (selectedType === 'brand') {
        title = "Marka Girişi";
        description = "Marka portalına erişmek için kurumsal e-posta adresinizle giriş yapın.";
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={step === 'ROLE_SELECTION' ? 'Giriş Yap' : title}>
            {step === 'ROLE_SELECTION' && (
                <div style={{ padding: '0 10px' }}>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: 30, fontSize: '0.95rem' }}>
                        Hangi hesap türüyle giriş yapmak istersiniz?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <button
                            onClick={() => handleRoleSelect('shopper')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '20px', borderRadius: 12, border: '1px solid #eaeaea',
                                background: 'white', cursor: 'pointer', transition: 'all 0.2s',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.background = '#fafafa'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.background = 'white'; }}
                        >
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Alışveriş Sever</div>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>Telefon numaranızla hızlıca bağlanın.</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleRoleSelect('creator')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '20px', borderRadius: 12, border: '1px solid #eaeaea',
                                background: 'white', cursor: 'pointer', transition: 'all 0.2s',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.background = '#fafafa'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.background = 'white'; }}
                        >
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Insider (Creator)</div>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>Kürasyonlarınıza ulaşmak için giriş yapın.</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleRoleSelect('brand')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '20px', borderRadius: 12, border: '1px solid #eaeaea',
                                background: 'white', cursor: 'pointer', transition: 'all 0.2s',
                                textAlign: 'left'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.background = '#fafafa'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.background = 'white'; }}
                        >
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Marka</div>
                                <div style={{ fontSize: '0.85rem', color: '#666' }}>Marka portalına erişmek için giriş yapın.</div>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {step !== 'ROLE_SELECTION' && description && <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 20 }}>{description}</p>}

            {step === 'PHONE' && (
                <form onSubmit={handlePhoneSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Cep Telefonu</label>
                        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                style={{
                                    fontSize: '1rem',
                                    padding: '0 10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    background: '#f9f9f9',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="+90">🇹🇷 +90</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+49">🇩🇪 +49</option>
                            </select>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => {
                                    let val = e.target.value.replace(/\D/g, '');
                                    if (val.startsWith('0')) val = val.substring(1);
                                    let formatted = '';
                                    if (val.length > 0) formatted += val.substring(0, 3);
                                    if (val.length > 3) formatted += ' ' + val.substring(3, 6);
                                    if (val.length > 6) formatted += ' ' + val.substring(6, 8);
                                    if (val.length > 8) formatted += ' ' + val.substring(8, 10);
                                    setPhoneNumber(formatted);
                                }}
                                required
                                placeholder="555 123 45 67"
                                className={styles.input}
                                style={{ fontSize: '1.2rem', padding: '15px', flex: 1 }}
                            />
                        </div>
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
                        <button type="button" onClick={() => window.location.href = `/api/auth/google?role=${selectedType || 'shopper'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #eaeaea', background: 'white', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 18, height: 18 }} /> Google ile Devam Et
                        </button>
                        <button type="button" onClick={() => window.location.href = `/api/auth/instagram?role=${selectedType || 'shopper'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #eaeaea', background: 'white', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                            <Instagram size={18} color="#E1306C" /> Instagram ile Devam Et
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
                        onClick={handleResendOtp}
                        disabled={otpTimer > 0}
                        style={{ background: 'none', border: 'none', marginTop: 15, color: otpTimer > 0 ? '#ccc' : '#111', cursor: otpTimer > 0 ? 'not-allowed' : 'pointer', fontSize: '0.9rem', width: '100%', fontWeight: otpTimer > 0 ? 400 : 600 }}
                    >
                        {otpTimer > 0 ? `Kodu Tekrar Gönder (${otpTimer}s)` : 'Kodu Tekrar Gönder'}
                    </button>

                    <button
                        type="button"
                        onClick={() => setStep('PHONE')}
                        style={{ background: 'none', border: 'none', marginTop: 10, color: '#666', cursor: 'pointer', fontSize: '0.9rem', width: '100%' }}
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

            {step !== 'ROLE_SELECTION' && (
                <div className={styles.terms} style={{ marginTop: 25 }}>
                    &quot;{step === 'OTP' ? 'Doğrula' : 'Giriş Yap'}&quot; diyerek <Link href="/legal/terms">Hizmet Şartları</Link>'nı ve <Link href="/legal/privacy">Gizlilik Politikası</Link>'nı kabul edersiniz.
                </div>
            )}

            {/* Shopper/Creator için Signup linki: Telefon ile giriş aynı zamanda kayıt olduğu için gerek yok ama navigation için bırakabiliriz */}
            {selectedType !== 'brand' && step === 'PHONE' && (
                <div className={styles.footer}>
                    Farklı bir yöntem mi? <button type="button" onClick={onSwitchToSignup} className={styles.linkBtn}>Seçenekleri Gör</button>
                </div>
            )}
        </Modal>
    );
};
export default LoginModal;

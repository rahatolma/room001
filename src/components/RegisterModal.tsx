"use client";

import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import styles from './LoginModal.module.css'; // Reuse Login styles

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
    role?: string | null;
    onBack?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin, role, onBack }) => {
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // New state for full name
    const [error, setError] = useState<string | null>(null); // New state for error messages

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        try {
            // Assuming signup function can handle full name or it's not needed for signup directly
            // For this example, we'll just use email and password as per original signup function
            await signup(email, password);
            onClose();
            setEmail('');
            setPassword('');
            setFullName('');
        } catch (err: any) {
            setError(err.message || 'Kayıt başarısız oldu.');
        }
    };

    const handleSwitchToLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        onSwitchToLogin();
    };

    if (!isOpen) return null; // Render nothing if not open, as the new structure doesn't use the Modal component wrapper

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>

                <h2 className={styles.title}>Room001'e Katıl</h2>
                <p className={styles.subtitle}>
                    {role === 'creator'
                        ? 'İçerik üreticileri ve küratörler için.'
                        : 'Alışveriş yapanlar ve kaşifler için.'}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Ad Soyad</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Adınız Soyadınız"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>E-posta</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="ornek@email.com"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    {role === 'creator' && (
                        <div className={styles.inputGroup}>
                            <label>Instagram / TikTok Kullanıcı Adı</label>
                            <input
                                type="text"
                                required
                                placeholder="@kullaniciadi"
                            />
                        </div>
                    )}

                    {error && <div className={styles.error}>{error}</div>}

                    <Button type="submit" fullWidth>
                        {role === 'creator' ? 'Küratör Olarak Başvur' : 'Kayıt Ol'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    Zaten hesabın var mı? <button type="button" onClick={handleSwitchToLogin} className={styles.linkButton}>Giriş Yap</button>
                    <br />
                    <button type="button" onClick={onBack} className={styles.backButton}>&larr; Rol Seçimine Dön</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;

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
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToSignup }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            onClose();
            setEmail('');
            setPassword('');
            setError('');
        } else {
            setError('Bilgiler hatalı. Lütfen kontrol edin.');
        }
    };

    const handleLinkClick = (e: React.MouseEvent, msg: string) => {
        e.preventDefault();
        alert(msg);
    };

    // Renamed for clarity based on new footer text
    const handleSwitchToSignup = () => {
        onSwitchToSignup();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Devam etmek için giriş yapın.">
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Giriş Yap</h2>

                <div className={styles.inputGroup}>
                    <label>E-posta</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ornek@email.com"
                        className={styles.input} // Added class for styling
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
                        className={styles.input} // Added class for styling
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <Button type="submit" fullWidth>Giriş Yap</Button>

                <div className={styles.terms}>
                    &quot;Giriş Yap&quot; butonuna tıklayarak ShopMy <Link href="/legal/terms">Hizmet Şartları</Link> ve <Link href="/legal/privacy">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
                </div>

                <div className={styles.footer}>
                    Davet kodunuz mu var? Hesap oluşturmak için <button type="button" onClick={onSwitchToSignup} className={styles.linkBtn}>tıklayın</button>.
                </div>

                {/* Dev Helper */}
                <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.8rem', color: '#ccc' }}>
                    <button type="button" onClick={() => { setEmail('admin@shopmy.tr'); setPassword('admin123'); }} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}>
                        (Dev: Admin Girişi)
                    </button>
                </div>
            </form>
        </Modal>
    );
};
export default LoginModal;

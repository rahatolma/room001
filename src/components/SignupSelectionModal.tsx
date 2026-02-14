"use client";

import React from 'react';
import styles from './SignupSelectionModal.module.css';

interface SignupSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
    onSignupClick: () => void;
}

const SignupSelectionModal: React.FC<SignupSelectionModalProps> = ({ isOpen, onClose, onLoginClick, onSignupClick }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
            <div className={styles.container}>
                {/* Shopper Column */}
                <div className={`${styles.column} ${styles.shopper}`}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>Alışveriş</h2>
                        <p className={styles.description}>Kaydırmak için değil, alışveriş için bir yer.</p>
                        <button className={styles.button} onClick={onSignupClick}>HESAP OLUŞTUR</button>
                    </div>
                </div>

                {/* Creator Column */}
                <div className={`${styles.column} ${styles.creator}`}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>İçerik Üreticisi</h2>
                        <p className={styles.description}>Harika zevklerin büyük fırsatlara dönüştüğü yer.</p>
                        <button className={styles.button} onClick={onSignupClick}>BAŞVUR</button>
                    </div>
                </div>

                {/* Brand Column */}
                <div className={`${styles.column} ${styles.brand}`}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>Marka</h2>
                        <p className={styles.description}>Ürünlerinizi, onları seven insanlar kadar kimse öne çıkaramaz.</p>
                        <button className={styles.button} onClick={onSignupClick}>BAŞVUR</button>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div>
                    Zaten hesabınız var mı? <button onClick={onLoginClick} className={styles.footerLink}>Giriş Yap</button>
                </div>
                <div>
                    Davet kodunuz mu var? <button onClick={onSignupClick} className={styles.footerLink}>Hesap Oluştur</button>
                </div>
            </div>
        </div>
    );
};

export default SignupSelectionModal;

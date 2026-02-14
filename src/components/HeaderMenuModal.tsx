"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './HeaderMenuModal.module.css';

interface HeaderMenuModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HeaderMenuModal: React.FC<HeaderMenuModalProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    if (!isOpen || !user) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className={styles.header}>
                    <div className={styles.avatar}>
                        {user?.avatarInitials || user?.fullName?.substring(0, 2) || 'U'}
                    </div>
                    <div className={styles.userInfo}>
                        <h3>{user.fullName}</h3>
                        <Link href="/dashboard/profile" className={styles.viewAccount}>
                            Hesabımı Görüntüle &rsaquo;
                        </Link>
                    </div>
                </div>

                <div className={styles.menuContent}>
                    <div className={styles.section}>
                        <h4>KEŞFET & ALIŞVERİŞ YAP</h4>
                        <ul>
                            <li><Link href="/">Küratöre Göre Göz At</Link></li>
                            <li><Link href="/">Çembere Göre Göz At</Link></li>
                            <li><Link href="/">Kategoriye Göre Göz At</Link></li>
                            <li><Link href="/">Markaya Göre Göz At</Link></li>
                            <li><Link href="/circles">Çemberlerim</Link></li>
                            <li><Link href="/style">Stilim</Link></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4>BENİM İÇİN</h4>
                        <ul>
                            <li><Link href="/circles">Çemberlerim</Link></li>
                            <li><Link href="/style">Stilim</Link></li>
                            <li><Link href="/wishlists">İstek Listelerim</Link></li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4>GENEL</h4>
                        <ul>
                            <li><Link href="/dashboard/settings">Hesap Ayarları</Link></li>
                            <li><Link href="/dashboard/upgrade">İçerik Üreticisi İçin Başvur</Link></li>
                        </ul>
                    </div>

                    <button className={styles.logoutButton} onClick={logout}>
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenuModal;

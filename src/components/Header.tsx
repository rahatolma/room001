"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import SignupSelectionModal from './SignupSelectionModal';
import HeaderMenuModal from './HeaderMenuModal';

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const Header = () => {
    const { user, logout } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper to check if user is a creator
    const isCreator = user?.role === 'creator' || user?.role === 'admin' || (user?.niche && !user.role);

    return (
        <>
            {/* Top Banner */}
            <div style={{ background: '#f5f5f5', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px' }}>
                <span>MOBİLDE DAHA İYİ.</span>
                <button style={{ background: 'black', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 4, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ marginRight: 5 }}>İndir</span>
                    <strong>App Store</strong>
                </button>
            </div>

            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="/" className={styles.logo}>
                        room001
                    </Link>

                    <nav className={styles.nav}>
                        <Link href="/creators" className={styles.navLink}>Küratörler</Link>
                        <Link href="/circles" className={styles.navLink}>Çemberler</Link>
                        <Link href="/brands" className={styles.navLink}>Markalar</Link>
                        <Link href="/categories" className={styles.navLink}>Kategoriler</Link>
                        {user && (
                            <>
                                <Link href="/my-circles" className={styles.navLink}>Çemberlerim</Link>
                                <Link href="/wishlists" className={styles.navLink}>İstek Listeleri</Link>
                                <Link href="/style" className={styles.navLink}>Zevk Profili</Link>
                            </>
                        )}
                    </nav>
                </div>

                <div className={styles.authButtons}>
                    {/* Progress Indicator (Mock) */}
                    {user && (
                        <div style={{
                            background: '#333', color: '#fff', fontSize: '0.7rem', padding: '4px 8px', borderRadius: 12, marginRight: 15
                        }}>
                            0/3 tamamlandı
                        </div>
                    )}

                    {/* Search Bar */}
                    <div style={{
                        display: 'flex', alignItems: 'center', background: '#444', color: '#ccc',
                        padding: '8px 15px', borderRadius: 20, marginRight: 20, width: 250
                    }}>
                        <SearchIcon />
                        <span style={{ fontSize: '0.85rem' }}>Ne arıyorsun?</span>
                    </div>

                    {/* Mobile Menu Icon (Visible on small screens conceptually, or just part of the design) */}
                    <div style={{ marginRight: 20, cursor: 'pointer', display: 'none' }}>
                        <MenuIcon />
                    </div>

                    {user ? (
                        <>
                            {isCreator ? (
                                <Link href="/dashboard" className={styles.navLink} style={{ marginRight: '10px', color: 'white' }}>
                                    Panel
                                </Link>
                            ) : null}

                            <button
                                onClick={() => setIsMenuOpen(true)}
                                style={{
                                    background: '#fff',
                                    color: 'black',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 35,
                                    height: 35,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {user.avatarInitials || user.fullName?.substring(0, 2) || 'U'}
                            </button>
                        </>
                    ) : (
                        <>
                            <Button variant="secondary" onClick={() => setIsLoginOpen(true)} style={{ color: 'white', borderColor: 'white' }}>
                                Log In
                            </Button>
                            <Button variant="primary" onClick={() => setIsSignupOpen(true)} style={{ background: 'white', color: 'black', border: 'none' }}>
                                Join
                            </Button>
                        </>
                    )}
                </div>
            </header>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToSignup={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true);
                }}
            />
            <SignupSelectionModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLoginClick={() => {
                    setIsSignupOpen(false);
                    setIsLoginOpen(true);
                }}
                onSignupClick={() => {
                    setIsSignupOpen(false);
                    setIsRegisterOpen(true);
                }}
            />
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                }}
            />
            {isMenuOpen && (
                <>
                    <div
                        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100 }}
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '80px', // Below header
                        right: '40px',
                        width: 200,
                        background: 'white',
                        borderRadius: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        zIndex: 101,
                        padding: '10px 0',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '10px 20px', borderBottom: '1px solid #eee', marginBottom: 5 }}>
                            <div style={{ fontWeight: 600 }}>{user?.fullName}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{user?.email}</div>
                        </div>
                        {isCreator && (
                            <Link
                                href="/dashboard"
                                style={{ display: 'block', padding: '10px 20px', textDecoration: 'none', color: '#333', fontSize: '0.9rem', width: '100%' }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Panel
                            </Link>
                        )}
                        <Link
                            href="/dashboard/settings"
                            style={{ display: 'block', padding: '10px 20px', textDecoration: 'none', color: '#333', fontSize: '0.9rem', width: '100%' }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Hesap Ayarları
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                setIsMenuOpen(false);
                            }}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px 20px',
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                borderTop: '1px solid #eee',
                                marginTop: 5,
                                color: '#e00',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Çıkış Yap
                        </button>
                    </div>
                </>
            )}
            {/* 
            <HeaderMenuModal
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            /> 
            */}
        </>
    );
};

export default Header;

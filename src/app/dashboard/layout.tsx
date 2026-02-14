"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './layout.module.css';
import {
    LayoutDashboard,
    ShoppingBag,
    Settings,
    FileText,
    Layers,
    List,
    ShieldCheck,
    Bell,
    DollarSign,
    LogOut,
    Home,
    Search,
    Share2
} from 'lucide-react';

// Map icons to existing usage
const HomeIcon = () => <LayoutDashboard size={20} />;
const CollectionsIcon = () => <Layers size={20} />;
const MediaKitIcon = () => <FileText size={20} />;
const SettingsIcon = () => <Settings size={20} />;
// New Icons
const SectionsIcon = () => <List size={20} />;
const ProductsIcon = () => <ShoppingBag size={20} />;
const AdminIcon = () => <ShieldCheck size={20} />;
// Other icons used in layout
const EarnIcon = () => <DollarSign size={20} />;
const BellIcon = () => <Bell size={20} />;
const LogoutIcon = () => <LogOut size={20} />;
const SearchIcon = () => <Search size={20} />;

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, loading, logout } = useAuth();

    if (loading) return <div>Yükleniyor...</div>;

    // Check recursive role or direct role
    const isCreator = user?.permissions?.role === 'creator' || user?.role === 'creator' || user?.role === 'admin';

    const navigation = isCreator ? [
        { name: 'Metrikler', href: '/dashboard', icon: <HomeIcon /> },
        { name: 'Menu Başlıkları', href: '/dashboard/sections', icon: <SectionsIcon /> },
        { name: 'Ürünler', href: '/dashboard/products', icon: <ProductsIcon /> },
        { name: 'Koleksiyonlar', href: '/dashboard/collections', icon: <CollectionsIcon /> },
        { name: 'Medya Kiti', href: '/dashboard/media-kit', icon: <MediaKitIcon /> },
        { name: 'Entegrasyonlar', href: '/dashboard/integrations', icon: <Share2 size={20} /> },
        { name: 'Ayarlar', href: '/dashboard/settings', icon: <SettingsIcon /> },
        ...(user?.role === 'admin' ? [{ name: 'Yönetici Paneli', href: '/dashboard/admin', icon: <AdminIcon /> }] : []),
    ] : [
        // 'Tümü' removed as requested
        { name: 'Hesap Ayarları', href: '/dashboard/settings', icon: <SettingsIcon /> },
        { name: 'Kazanmak İçin Yükselt', href: '/dashboard/upgrade', icon: <EarnIcon /> },
        { name: 'Bildirimler', href: '/dashboard/notifications', icon: <BellIcon /> },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'white' }}>
            <aside style={{
                width: 300,
                background: 'white',
                borderRight: '1px solid #eee',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                // Changed from fixed to sticky for better flow with header
                position: 'sticky',
                top: 0,
                height: '100vh',
                flexShrink: 0,
                zIndex: 10
            }}>
                {/* User Profile Summary */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
                    <div style={{
                        width: 50, height: 50, borderRadius: '50%', background: '#999',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', color: 'white', marginRight: 15
                    }}>
                        {user?.avatarInitials || user?.fullName?.substring(0, 2) || 'U'}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{user?.fullName || 'Kullanıcı'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{isCreator ? 'İçerik Üreticisi' : 'Alışveriş Tutkunu'}</div>
                    </div>
                </div>

                {/* Search Bar - Shopper Only */}
                {!isCreator && (
                    <div style={{ marginBottom: 40, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Ara"
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 45px',
                                background: '#f5f5f5',
                                border: '1px solid transparent',
                                borderRadius: 8,
                                fontSize: '0.9rem',
                                color: '#333',
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ddd'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                    </div>
                )}

                {/* Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 15px',
                                    borderRadius: 8,
                                    textDecoration: 'none',
                                    color: isActive ? '#000' : '#666',
                                    fontWeight: isActive ? 600 : 400,
                                    background: isActive ? '#f9f9f9' : 'transparent',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span style={{ marginRight: 15, display: 'flex', width: 20, justifyContent: 'center' }}>{item.icon}</span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <button
                    onClick={logout}
                    style={{
                        marginTop: 20, // Fixed margin instead of auto
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 15px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '1rem'
                    }}
                >
                    <span style={{ marginRight: 15, display: 'flex', width: 20, justifyContent: 'center' }}><LogoutIcon /></span>
                    Çıkış Yap
                </button>
            </aside>

            <main style={{ flex: 1, padding: 40, background: 'white', minHeight: '100vh', width: 0 }}>
                {/* minHeight handles full height, width:0 ensures flex child doesn't overflow */}
                <div style={{ minHeight: '85vh', padding: 0 }}>
                    {children}
                </div>
            </main>
        </div >
    );
}

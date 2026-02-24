'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Search,
    MessageCircle,
    Megaphone,
    Settings,
    LogOut,
    Sparkles,
    CheckCircle
} from 'lucide-react';

const BrandNavigation = [
    { name: 'Vizyon', href: '/dashboard/vision', icon: <Sparkles size={18} /> },
    { name: 'Genel Bakış', href: '/brand/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Kreatör Keşfi', href: '/brand/discovery', icon: <Search size={18} /> },
    { name: 'Mesajlar', href: '/brand/chat', icon: <MessageCircle size={18} /> },
    { name: 'Kampanyalar', href: '/brand/campaigns', icon: <Megaphone size={18} /> },
    { name: 'Anlaşmalar', href: '/brand/agreements', icon: <CheckCircle size={18} /> },
    { name: 'Ayarlar', href: '/brand/settings', icon: <Settings size={18} /> },
];

export default function BrandLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();

    if (loading) return null;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#fafafa' }}>
            {/* SIDEBAR FOR BRANDS */}
            <aside className="dashboard-sidebar">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {BrandNavigation.slice(0, 6).map((item) => {
                        const isActive = pathname === item.href || (item.href.includes('?') && pathname.startsWith(item.href.split('?')[0]) && pathname.includes(item.href.split('?')[1]));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '10px 15px',
                                    borderRadius: 8,
                                    fontSize: '0.9rem',
                                    color: isActive ? 'black' : '#666',
                                    background: isActive ? '#f5f5f5' : 'transparent',
                                    fontWeight: isActive ? 600 : 400
                                }}
                            >
                                {item.icon} {item.name}
                            </Link>
                        );
                    })}

                    <div style={{ width: '100%', height: 1, background: '#eee', margin: '20px 0' }} />

                    {/* Simplified General Section */}
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', marginBottom: 10, paddingLeft: 10, letterSpacing: 0.5 }}>GENEL</div>
                    <Link href="/brand/settings" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/brand/settings' ? 'black' : '#666' }}>
                        <Settings size={18} /> Hesap Ayarları
                    </Link>

                    <button
                        onClick={logout}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: '#666', border: 'none', background: 'transparent', cursor: 'pointer', marginTop: 20, textAlign: 'left' }}
                    >
                        <LogOut size={18} /> Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT FOR BRANDS */}
            <main className="dashboard-main">
                <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}

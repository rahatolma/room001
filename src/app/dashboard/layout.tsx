'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
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
    Share2,
    Palette,
    User,
    Heart,
    Megaphone,
    Compass,
    Target,
    Link as LinkIcon,
    Store,
    MessageCircle, // Chat
    Gift,          // Gifting
    Ticket,        // Discount Codes
    Zap,           // Opportunities
    Globe,         // Latest
    ShoppingCart,   // Shopping
    Award,         // Creator Tier
    CreditCard,    // Connected Accounts
    UserCheck,      // Talent Card
    BookOpen       // Guide
} from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, loading, logout } = useAuth();

    if (loading) return <div style={{ padding: 50, textAlign: 'center' }}>Yükleniyor...</div>;

    const isAdminPath = pathname.startsWith('/dashboard/admin');
    // FORCE CREATOR MODE: Removed to respect actual user role
    const isCreator = user?.role === 'creator' || user?.role === 'admin';
    const isAdmin = user?.role === 'admin' || isAdminPath;

    // --- NAVIGATION STRUCTURE ---

    // Helper to render separator
    const Separator = () => <div style={{ height: 1, background: '#f0f0f0', margin: '20px 0' }} />;
    // Helper to render Section Title
    const SectionTitle = ({ title }: { title: string }) => (
        <div style={{ fontSize: '0.7rem', color: '#999', fontWeight: 600, padding: '0 10px', marginBottom: 8, marginTop: 15, letterSpacing: 1, textTransform: 'uppercase' }}>
            {title}
        </div>
    );

    const CreatorNavigation = [
        { type: 'title', label: 'AFFILIATES & KAZANÇLAR' },
        { name: 'Linklerim', href: '/dashboard/links', icon: <LinkIcon size={18} /> },
        { name: 'Mağazam', href: '/dashboard/appearance', icon: <Store size={18} /> },
        { name: 'Ürünler', href: '/dashboard/products', icon: <ShoppingBag size={18} /> },
        { name: 'Tasarım & Tema', href: '/dashboard/theme', icon: <Palette size={18} /> },
        { name: 'Koleksiyonlar', href: '/dashboard/sections', icon: <Layers size={18} /> },
        { name: 'Öne Çıkar', href: '/dashboard/promote', icon: <Megaphone size={18} /> },
        { name: 'Kazançlar', href: '/dashboard/earnings', icon: <DollarSign size={18} /> },
        { name: 'Insider Seviyesi', href: '/dashboard/tier', icon: <Award size={18} /> },

        { type: 'separator' },

        { type: 'title', label: 'MARKA İŞBİRLİKLERİ' },
        { name: 'Mesajlar', href: '/dashboard/chat', icon: <MessageCircle size={18} />, badge: 2 },
        { name: 'Hediyeleşme', href: '/dashboard/collaborations?tab=GIFTING', icon: <Gift size={18} /> },
        { name: 'Fırsatlar', href: '/dashboard/collaborations?tab=OPPORTUNITIES', icon: <Zap size={18} /> },
        { name: 'İndirim Kodları', href: '/dashboard/collaborations?tab=CODES', icon: <Ticket size={18} /> },

        { type: 'separator' },

        { type: 'title', label: 'ALIŞVERİŞ' },
        { name: 'Marka Eşleşmeleri', href: '/dashboard/brand-match', icon: <Compass size={18} /> },
        { name: 'Favorilerim', href: '/dashboard/favorites', icon: <Heart size={18} /> },

        { type: 'separator' },

        { type: 'title', label: 'GENEL' },
        { name: 'Insider Kartı', href: '/dashboard/talent-card', icon: <UserCheck size={18} /> },
        { name: 'Medya Kiti', href: '/dashboard/media-kit', icon: <FileText size={18} /> },
        { name: 'Bağlı Hesaplar', href: '/dashboard/connected-accounts', icon: <CreditCard size={18} /> },
        { name: 'Hesap Ayarları', href: '/dashboard/settings', icon: <Settings size={18} /> },
        { name: 'Yardım & Rehber', href: '/dashboard/guide', icon: <BookOpen size={18} /> },
    ];

    const RegularNavigation = [
        { name: 'Favorilerim', href: '/dashboard/favorites', icon: <Heart size={18} /> },
        { name: 'Kazanmak İçin Yükselt', href: '/dashboard/upgrade', icon: <DollarSign size={18} /> },
        { name: 'Bildirimler', href: '/dashboard/notifications', icon: <Bell size={18} /> },
        { name: 'Hesap Ayarları', href: '/dashboard/settings', icon: <Settings size={18} /> },
    ];

    const AdminNavigation = [
        { type: 'separator' },
        { type: 'title', label: 'YÖNETİCİ' },
        { name: 'Admin Paneli', href: '/dashboard/admin', icon: <ShieldCheck size={18} /> },
        { name: 'CMS', href: '/dashboard/admin/cms', icon: <FileText size={18} /> },
    ];

    const fullNavigation = isCreator ? [...CreatorNavigation, ...(isAdmin ? AdminNavigation : [])] : RegularNavigation;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#fff' }}>

            {/* SIDEBAR */}
            <aside style={{
                width: 260,
                borderRight: '1px solid #eaeaea',
                height: 'calc(100vh - 80px)',
                top: 80,
                position: 'fixed',
                overflowY: 'auto',
                background: '#fff',
                zIndex: 10
            }}>
                {/* Logo Removed */}

                <nav style={{ padding: '20px' }}>
                    <Link
                        href="/dashboard"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '10px 12px',
                            borderRadius: 8,
                            marginBottom: 4,
                            textDecoration: 'none',
                            color: pathname === '/dashboard' ? 'black' : '#666',
                            fontWeight: pathname === '/dashboard' ? 600 : 400,
                            background: pathname === '/dashboard' ? '#f7f7f7' : 'transparent',
                            fontSize: '0.9rem'
                        }}
                    >
                        <Home size={18} />
                        <span>Panel</span>
                    </Link>

                    {fullNavigation.map((item: any, index) => {
                        if (item.type === 'separator') return <Separator key={index} />;
                        if (item.type === 'title') return <SectionTitle key={index} title={item.label} />;

                        // Determine Active State
                        let isActive = false;
                        if (item.href) {
                            const itemPath = item.href.split('?')[0];
                            // Exact match check logic is slightly different here due to explicit "Panel" link above
                            if (itemPath !== '/dashboard' && pathname.startsWith(itemPath)) isActive = true;
                        }

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 12px',
                                    borderRadius: 8,
                                    marginBottom: 4,
                                    textDecoration: 'none',
                                    color: isActive ? 'black' : '#666',
                                    fontWeight: isActive ? 600 : 400,
                                    background: isActive ? '#f7f7f7' : 'transparent',
                                    transition: 'background 0.2s',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                                {item.badge && (
                                    <span style={{
                                        background: '#ea4335', color: 'white', fontSize: '0.7rem', fontWeight: 700,
                                        padding: '2px 6px', borderRadius: 10, minWidth: 18, textAlign: 'center'
                                    }}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                    <button
                        onClick={logout}
                        style={{
                            marginTop: 30, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                            width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: '#999', fontSize: '0.9rem'
                        }}
                    >
                        <LogOut size={18} />
                        <span>Çıkış Yap</span>
                    </button>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main style={{ flex: 1, marginLeft: 260, padding: 40, marginTop: 80, maxWidth: 1600 }}>
                {children}
            </main>
        </div>
    );
}

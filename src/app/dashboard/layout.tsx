'use client';

import React, { useState } from 'react';
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
    BookOpen,       // Guide
    Sparkles,       // Vision
    Briefcase,
    Users,
    TrendingUp,     // Analytics
    Menu,
    X
} from 'lucide-react';

// --- NAVIGATION DATA (FLAT LISTS) ---

const AdminNavigation = [
    { name: 'Vizyon', href: '/dashboard/vision', icon: <Sparkles size={18} /> },
    { name: 'Genel Bakış', href: '/dashboard/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Kullanıcılar', href: '/dashboard/admin/users', icon: <Users size={18} /> },
    { name: 'CMS Yönetimi', href: '/dashboard/admin/cms', icon: <FileText size={18} /> },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: <Settings size={18} /> },
];

const BrandNavigation = [
    { name: 'Vizyon', href: '/dashboard/vision', icon: <Sparkles size={18} /> },
    { name: 'Genel Bakış', href: '/dashboard/brand', icon: <LayoutDashboard size={18} /> },
    { name: 'Keşfet', href: '/dashboard/brand-match', icon: <Search size={18} /> },
    { name: 'Mesajlar', href: '/dashboard/chat', icon: <MessageCircle size={18} /> },
    { name: 'Kampanyalar', href: '/dashboard/campaigns', icon: <Megaphone size={18} /> },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: <Settings size={18} /> },
];

const ShopperNavigation = [
    { name: 'Vizyon', href: '/dashboard/vision', icon: <Sparkles size={18} /> },
    { name: 'Akışım', href: '/dashboard/shopper', icon: <LayoutDashboard size={18} /> },
    { name: 'Favorilerim', href: '/dashboard/favorites', icon: <Heart size={18} /> },
    { name: 'Siparişlerim', href: '/dashboard/orders', icon: <ShoppingBag size={18} /> },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: <Settings size={18} /> },
];

const CreatorNavGroups = [
    {
        title: null,
        items: [
            { name: 'Vizyon', href: '/dashboard/vision', icon: <Sparkles size={18} /> },
        ]
    },
    {
        title: 'Hesabım',
        items: [
            { name: 'Panel', href: '/dashboard/creator', icon: <LayoutDashboard size={18} /> },
            { name: 'Insider Kartı', href: '/dashboard/talent-card', icon: <UserCheck size={18} /> },
            { name: 'Insider Seviyesi', href: '/dashboard/tier', icon: <Award size={18} /> },
            { name: 'Medya Kiti', href: '/dashboard/media-kit', icon: <FileText size={18} /> },
            { name: 'Mağazam', href: '/dashboard/store', icon: <Store size={18} /> },
            { name: 'Ürünlerim', href: '/dashboard/products', icon: <ShoppingBag size={18} /> },
            { name: 'Linklerim', href: '/dashboard/links', icon: <LinkIcon size={18} /> },
            { name: 'Kazançlarım', href: '/dashboard/earnings', icon: <DollarSign size={18} /> },
            { name: 'Favorilerim', href: '/dashboard/favorites', icon: <Heart size={18} /> },
            { name: 'Bağlı Hesaplar', href: '/dashboard/connected-accounts', icon: <CreditCard size={18} /> },
            { name: 'Hesap Ayarları', href: '/dashboard/settings', icon: <Settings size={18} /> },
        ]
    },
    {
        title: 'Marka İşbirlikleri',
        items: [
            { name: 'Mesajlar', href: '/dashboard/chat', icon: <MessageCircle size={18} /> },
            { name: 'Gelen Teklifler', href: '/dashboard/collaborations?tab=OFFERS', icon: <Zap size={18} /> },
            { name: 'Açık Kampanyalar', href: '/dashboard/collaborations?tab=CAMPAIGNS', icon: <Megaphone size={18} /> },
            { name: 'Hediyeleşme', href: '/dashboard/collaborations?tab=GIFTING', icon: <Gift size={18} /> },
            { name: 'İndirim Kodları', href: '/dashboard/collaborations?tab=CODES', icon: <Ticket size={18} /> },
            { name: 'Marka Kataloğu', href: '/dashboard/brand-match', icon: <Compass size={18} /> },
        ]
    },
    {
        title: 'Genel',
        items: [
            { name: 'Yardım & Rehber', href: '/dashboard/guide', icon: <BookOpen size={18} /> },
            { name: 'Tasarım & Tema', href: '/dashboard/theme', icon: <Palette size={18} /> },
            { name: 'Tavsiye Et / Kazan', href: '/dashboard/referrals', icon: <Users size={18} /> },
        ]
    }
];

const CreatorNavigation = CreatorNavGroups.flatMap(group => group.items);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (loading) return null;

    // Determine navigation based on role
    let navigationItems: any[] = [];

    // Grouping logic for Creator only
    const isCreator = !user?.role || user?.role === 'creator';

    if (user?.role === 'admin') navigationItems = AdminNavigation;
    else if (user?.role === 'brand') navigationItems = BrandNavigation;
    else if (user?.role === 'shopper') navigationItems = ShopperNavigation;
    else if (isCreator) navigationItems = CreatorNavigation; // Default fallback to Creator if no role or 'creator' role

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#fafafa' }}>

            {/* SIDEBAR */}
            <aside className="dashboard-sidebar">

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                    {/* --- CREATOR NAVIGATION (Complex Grouped) --- */}
                    {isCreator ? (
                        <>
                            {CreatorNavGroups.map((group, groupIdx) => (
                                <React.Fragment key={groupIdx}>
                                    {group.title && (
                                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'black', marginTop: groupIdx === 0 ? 0 : 20, marginBottom: 10, paddingLeft: 10 }}>
                                            {group.title}
                                        </div>
                                    )}
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href || (item.href.includes('?') && pathname.startsWith(item.href.split('?')[0]) && pathname.includes(item.href.split('?')[1]));
                                        return (
                                            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: isActive ? 'black' : '#666', background: isActive ? '#f5f5f5' : 'transparent', fontWeight: isActive ? 600 : 400 }}>
                                                {item.icon}
                                                {item.name}
                                                {item.name === 'Mesajlar' && <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>2</span>}
                                            </Link>
                                        );
                                    })}
                                    {groupIdx < CreatorNavGroups.length - 1 && group.title === null && (
                                        <div style={{ width: '100%', height: 1, background: '#eee', margin: '15px 0' }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </>
                    ) : (
                        // --- STANDARD LIST FOR OTHER ROLES (Admin, Brand, Shopper) ---
                        <>
                            {navigationItems.map((item) => (
                                <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === item.href ? 'black' : '#666', background: pathname === item.href ? '#f5f5f5' : 'transparent', fontWeight: pathname === item.href ? 600 : 400 }}>
                                    {item.icon} {item.name}
                                </Link>
                            ))}

                            <div style={{ width: '100%', height: 1, background: '#eee', margin: '20px 0' }} />

                            {/* Simplified General Section for Non-Creators */}
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', marginBottom: 10, paddingLeft: 10, letterSpacing: 0.5 }}>GENEL</div>
                            <Link href="/dashboard/settings" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/dashboard/settings' ? 'black' : '#666' }}>
                                <Settings size={18} /> Hesap Ayarları
                            </Link>
                            <Link href="/dashboard/guide" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/dashboard/guide' ? 'black' : '#666' }}>
                                <BookOpen size={18} /> Yardım & Rehber
                            </Link>
                        </>
                    )}

                    <button
                        onClick={logout}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: '#666', border: 'none', background: 'transparent', cursor: 'pointer', marginTop: 20, textAlign: 'left' }}
                    >
                        <LogOut size={18} /> Çıkış Yap
                    </button>

                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="dashboard-main">
                <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
                    {children}
                </div>
            </main>

            {/* MOBILE BOTTOM NAVIGATION */}
            <nav className="mobile-bottom-nav">
                <Link href={user?.role === 'admin' ? '/dashboard/admin' : user?.role === 'brand' ? '/dashboard/brand' : user?.role === 'shopper' ? '/dashboard/shopper' : '/dashboard/creator'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: pathname === '/dashboard/creator' || pathname === '/dashboard' ? 'black' : '#999' }}>
                    <Home size={22} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Panel</span>
                </Link>
                {isCreator && (
                    <Link href="/dashboard/products" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: pathname.startsWith('/dashboard/products') ? 'black' : '#999' }}>
                        <ShoppingBag size={22} />
                        <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Ürünler</span>
                    </Link>
                )}
                <Link href="/dashboard/chat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: pathname.startsWith('/dashboard/chat') ? 'black' : '#999', position: 'relative' }}>
                    <MessageCircle size={22} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Mesajlar</span>
                    <span style={{ position: 'absolute', top: -3, right: 0, width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }} />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Menu size={22} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Menü</span>
                </button>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            {isMobileMenuOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
                    <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: 1, transition: 'opacity 0.3s' }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '80%', background: 'white', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Menü</div>
                            <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={26} color="#666" />
                            </button>
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {isCreator ? (
                                <>
                                    {CreatorNavGroups.map((group, groupIdx) => (
                                        <React.Fragment key={groupIdx}>
                                            {group.title && <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#999', marginTop: 15, marginBottom: 5 }}>{group.title}</div>}
                                            {group.items.map((item) => (
                                                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 10px', borderRadius: 8, fontSize: '1rem', color: pathname === item.href ? 'black' : '#444', background: pathname === item.href ? '#f5f5f5' : 'transparent', fontWeight: pathname === item.href ? 600 : 400 }}>
                                                    {item.icon} {item.name}
                                                </Link>
                                            ))}
                                            <div style={{ width: '100%', height: 1, background: '#eee', margin: '10px 0' }} />
                                        </React.Fragment>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {navigationItems.map((item) => (
                                        <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 10px', borderRadius: 8, fontSize: '1rem', color: pathname === item.href ? 'black' : '#444', background: pathname === item.href ? '#f5f5f5' : 'transparent', fontWeight: pathname === item.href ? 600 : 400 }}>
                                            {item.icon} {item.name}
                                        </Link>
                                    ))}
                                    <div style={{ width: '100%', height: 1, background: '#eee', margin: '10px 0' }} />
                                    <Link href="/dashboard/settings" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 10px', borderRadius: 8, fontSize: '1rem', color: pathname === '/dashboard/settings' ? 'black' : '#444' }}>
                                        <Settings size={20} /> Hesap Ayarları
                                    </Link>
                                </>
                            )}
                        </div>
                        <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 10px', fontSize: '1rem', color: '#666', border: 'none', background: 'transparent', cursor: 'pointer', marginTop: 20, textAlign: 'left', fontWeight: 600 }}>
                            <LogOut size={20} /> Çıkış Yap
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

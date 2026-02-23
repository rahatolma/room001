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
    BookOpen,       // Guide
    Sparkles,       // Vision
    Briefcase,
    Users
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

const CreatorNavigation = [
    // 0: Room001 (Moved to top)
    { name: 'Vizyon', href: '/dashboard/vision', icon: <Sparkles size={18} /> },
    // 1: Panel
    { name: 'Panel', href: '/dashboard/creator', icon: <LayoutDashboard size={18} /> },
    // 2-9: Affiliates & Kazançlar
    { name: 'Linklerim', href: '/dashboard/links', icon: <LinkIcon size={18} /> },

    { name: 'Ürünler', href: '/dashboard/products', icon: <ShoppingBag size={18} /> },
    { name: 'Tasarım & Tema', href: '/dashboard/theme', icon: <Palette size={18} /> },
    { name: 'Mağazam', href: '/dashboard/store', icon: <Store size={18} /> },
    { name: 'Öne Çıkar', href: '/dashboard/promote', icon: <Megaphone size={18} /> },
    { name: 'Medya Kiti', href: '/dashboard/media-kit', icon: <FileText size={18} /> },
    { name: 'Kazançlar', href: '/dashboard/earnings', icon: <DollarSign size={18} /> },
    { name: 'Insider Seviyesi', href: '/dashboard/tier', icon: <Award size={18} /> },
    // 10-13: Marka İşbirlikleri
    { name: 'Mesajlar', href: '/dashboard/chat', icon: <MessageCircle size={18} /> },
    { name: 'Hediyeleşme', href: '/dashboard/collaborations?tab=GIFTING', icon: <Gift size={18} /> },
    { name: 'Fırsatlar', href: '/dashboard/collaborations?tab=OPPORTUNITIES', icon: <Zap size={18} /> },
    { name: 'İndirim Kodları', href: '/dashboard/collaborations?tab=CODES', icon: <Ticket size={18} /> },
    // 14-15: Alışveriş
    { name: 'Marka Eşleşmeleri', href: '/dashboard/brand-match', icon: <Compass size={18} /> },
    { name: 'Favorilerim', href: '/dashboard/favorites', icon: <Heart size={18} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();

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
            <aside style={{ width: 260, background: 'white', borderRight: '1px solid #eaeaea', position: 'fixed', top: 80, bottom: 0, overflowY: 'auto', padding: '30px 20px' }}>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                    {/* --- CREATOR NAVIGATION (Complex Grouped) --- */}
                    {isCreator ? (
                        <>
                            {/* Vizyon (now index 0) & Panel (now index 1) */}
                            {CreatorNavigation.slice(0, 2).map((item) => (
                                <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === item.href ? 'black' : '#666', background: pathname === item.href ? '#f5f5f5' : 'transparent', fontWeight: pathname === item.href ? 600 : 400 }}>
                                    {item.icon} {item.name}
                                </Link>
                            ))}

                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', marginTop: 20, marginBottom: 10, paddingLeft: 10, letterSpacing: 0.5 }}>AFFILIATES & KAZANÇLAR</div>
                            {CreatorNavigation.slice(2, 10).map((item) => (
                                <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === item.href || pathname?.startsWith(item.href) ? 'black' : '#666', background: pathname === item.href ? '#f5f5f5' : 'transparent', fontWeight: pathname === item.href ? 600 : 400 }}>
                                    {item.icon} {item.name}
                                </Link>
                            ))}

                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', marginTop: 20, marginBottom: 10, paddingLeft: 10, letterSpacing: 0.5 }}>MARKA İŞBİRLİKLERİ</div>
                            {CreatorNavigation.slice(10, 14).map((item) => {
                                const isActive = pathname === item.href || (item.href.includes('?') && pathname.startsWith(item.href.split('?')[0]) && pathname.includes(item.href.split('?')[1]));
                                return (
                                    <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: isActive ? 'black' : '#666', background: isActive ? '#f5f5f5' : 'transparent', fontWeight: isActive ? 600 : 400 }}>
                                        {item.icon}
                                        {item.name}
                                        {item.name === 'Mesajlar' && <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>2</span>}
                                    </Link>
                                );
                            })}

                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', marginTop: 20, marginBottom: 10, paddingLeft: 10, letterSpacing: 0.5 }}>ALIŞVERİŞ</div>
                            {CreatorNavigation.slice(14, 16).map((item) => (
                                <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === item.href ? 'black' : '#666', background: pathname === item.href ? '#f5f5f5' : 'transparent', fontWeight: pathname === item.href ? 600 : 400 }}>
                                    {item.icon} {item.name}
                                </Link>
                            ))}

                            <div style={{ width: '100%', height: 1, background: '#eee', margin: '20px 0' }} />

                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', marginBottom: 10, paddingLeft: 10, letterSpacing: 0.5 }}>GENEL</div>
                            <Link href="/dashboard/talent-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/dashboard/talent-card' ? 'black' : '#666' }}>
                                <UserCheck size={18} /> Insider Kartı
                            </Link>
                            <Link href="/dashboard/media-kit" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/dashboard/media-kit' ? 'black' : '#666' }}>
                                <FileText size={18} /> Medya Kiti
                            </Link>
                            <Link href="/dashboard/connected-accounts" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/dashboard/connected-accounts' ? 'black' : '#666' }}>
                                <CreditCard size={18} /> Bağlı Hesaplar
                            </Link>
                            <Link href="/dashboard/settings" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/dashboard/settings' ? 'black' : '#666' }}>
                                <Settings size={18} /> Hesap Ayarları
                            </Link>
                            <Link href="/dashboard/guide" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 15px', borderRadius: 8, fontSize: '0.9rem', color: pathname === '/dashboard/guide' ? 'black' : '#666' }}>
                                <BookOpen size={18} /> Yardım & Rehber
                            </Link>
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
            <main style={{ flex: 1, marginLeft: 260, padding: '40px 60px', marginTop: 80, minHeight: 'calc(100vh - 80px)' }}>
                <div style={{ maxWidth: 1600, margin: '0 auto', width: '100%' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}

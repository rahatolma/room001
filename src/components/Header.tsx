'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, ChevronDown, Search, MessageSquareShare } from 'lucide-react';
import LoginModal from './LoginModal';
import SignupSelectionModal from './SignupSelectionModal';
import Button from './Button';
import FeedbackModal from './FeedbackModal';

// --- MENU DATA ---
const MENU_ITEMS = {
    shoppers: {
        label: 'Alışveriş Severler',
        items: [
            { title: 'Insider Keşfet', description: 'Favori Insider\'larınızın önerilerine içeriden erişim.', href: '/creators' },
            { title: 'Kolektif Keşfet', description: 'Stilinizi paylaşan Insider grupları.', href: '/circles' },
            { title: 'Marka Keşfet', description: 'Bildiğiniz ve seveceğiniz yeni markaları keşfedin.', href: '/brands' },
            { title: 'Kategori Keşfet', description: 'Her kategorinin en iyilerini güvenle alışveriş yapın.', href: '/categories' },
            { title: 'Ürün Keşfet', description: 'Öne çıkan tüm ürünlerimizi tek tıkla incele.', href: '/products' },
            { title: 'Dergi Keşfet', description: 'Sezonun öne çıkan son trendlerini oku.', href: '/magazines' },
        ]
    },
    creators: {
        label: 'Insider\'lar',
        items: [
            { title: 'Insider Olarak Katıl', description: 'Zevkinizi paraya dönüştürün.', href: '/become-creator' },
            { title: 'Dijital Mağazanı Kur', description: 'Kitleniz için basitleştirilmiş ve premium bir alışveriş deneyimi.', href: '/become-creator/digital-shops' },
            { title: 'Link Paylaş', description: 'Önerileri kalıcı gelire dönüştüren profesyonel altyapı.', href: '/become-creator/affiliate-links' },
            { title: 'Marka İşbirliklerini İncele', description: 'Otantik zevk arayan premium markalara doğrudan erişim.', href: '/become-creator/brand-partnerships' },
        ]
    },
    brands: {
        label: 'Markalar',
        items: [
            { title: 'Marka Olarak Katıl', description: 'Kültür yaratan zevk sahipleriyle keşfedin, etkileşime geçin ve işbirliği yapın.', href: '/for-brands' },
            { title: 'Keşfet', description: 'Gerçek satışları yönlendiren 185.000+ zevk sahibinden oluşan ağımıza erişin.', href: '/for-brands/discover' },
            { title: 'Etkileşim', description: 'Premium zevk sahiplerini performans verileri ve zevk profilleri aracılığıyla bulun.', href: '/for-brands/engage' },
            { title: 'Takip', description: 'Kalıcı marka inşası için altyapı aracılığıyla gerçek performansı ve ROI\'yi izleyin.', href: '/for-brands/track' },
            { title: 'Büyüt', description: 'Reklamları otantik önerilerle değiştiren ağızdan ağıza altyapı ile ölçeklenin.', href: '/for-brands/amplify' },
        ]
    }
};

function HeaderUrlHandler({
    setIsLoginOpen,
    setIsSignupOpen,
    setLoginMode
}: {
    setIsLoginOpen: (v: boolean) => void,
    setIsSignupOpen: (v: boolean) => void,
    setLoginMode: (v: 'login' | 'signup') => void
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const loginParam = searchParams.get('login');
        const signupParam = searchParams.get('signup');

        if (loginParam === 'true') {
            setLoginMode('login');
            setIsLoginOpen(true);
            const params = new URLSearchParams(searchParams.toString());
            params.delete('login');
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        } else if (signupParam === 'true') {
            setIsSignupOpen(true);
            const params = new URLSearchParams(searchParams.toString());
            params.delete('signup');
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [searchParams, router, pathname, setIsLoginOpen, setIsSignupOpen]);

    return null;
}

export default function Header() {
    const { user, logout } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);

    // URL handling for modals
    const router = useRouter();
    const pathname = usePathname();

    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (key: string) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setActiveDropdown(key);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    const isHome = pathname === '/';
    // Header should be transparent ONLY if: It's Home AND It's at the top AND No menu is open
    const isTransparan = isHome && !isScrolled && !activeDropdown && !mobileMenuOpen;



    return (
        <>
            <Suspense fallback={null}>
                <HeaderUrlHandler setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} setLoginMode={setLoginMode} />
            </Suspense>
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                backgroundColor: isTransparan ? 'transparent' : 'white',
                color: 'black', // Always black text for visibility on light backgrounds
                borderBottom: !isTransparan ? '1px solid #eaeaea' : 'none',
                transition: 'all 0.3s ease',
                height: 80,
                // We handle this in the layout or page wrapper usually, but header itself is fine.
            }}>
                <div style={{ maxWidth: pathname?.startsWith('/dashboard') ? '100%' : 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* LOGO */}
                    <Link href="/" className="header-logo" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontWeight: 800, letterSpacing: -1, textDecoration: 'none', color: 'inherit' }}>
                        ROOM001
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav style={{ display: 'flex', gap: 40, height: '100%', alignItems: 'center' }} className="desktop-nav">
                        {Object.entries(MENU_ITEMS).map(([key, section]) => (
                            <div
                                key={key}
                                onMouseEnter={() => handleMouseEnter(key)}
                                onMouseLeave={handleMouseLeave}
                                style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
                            >
                                <span style={{
                                    display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem', fontWeight: 600,
                                    color: activeDropdown === key ? 'black' : 'inherit',
                                    transition: 'color 0.2s ease'
                                }}>
                                    {section.label} <ChevronDown size={14} style={{
                                        transform: activeDropdown === key ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }} />
                                </span>
                            </div>
                        ))}
                    </nav>

                    {/* RIGHT ACTIONS */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                        <button className="mobile-hide-btn hover-opacity" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                            <Search size={20} />
                        </button>

                        <button
                            className="beta-feedback-btn mobile-hide-btn"
                            onClick={() => setIsFeedbackOpen(true)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: 'linear-gradient(135deg, #111, #333)',
                                color: 'white', border: 'none', padding: '10px 18px', borderRadius: 30,
                                fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'; }}
                        >
                            <MessageSquareShare size={16} /> <span>Beta Geri Bildirim</span>
                        </button>

                        {!user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <button className="mobile-hide-btn" onClick={() => { setLoginMode('login'); setIsLoginOpen(true); }} style={{ background: 'none', border: 'none', color: 'inherit', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', transition: 'opacity 0.2s' }}>
                                    Giriş Yap
                                </button>
                                <Button className="mobile-hide-btn" onClick={() => setIsSignupOpen(true)} style={{
                                    background: activeDropdown || mobileMenuOpen ? 'black' : '#111',
                                    color: 'white', padding: '10px 24px', borderRadius: 30, fontWeight: 700,
                                    border: 'none', transition: 'all 0.3s ease'
                                }}>
                                    Başvur
                                </Button>
                            </div>
                        ) : (
                            <Link href="/dashboard" className="mobile-hide-btn" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
                                <div style={{
                                    width: 40, height: 40, background: '#f5f5f5', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'black', fontWeight: 700, border: '1px solid #eaeaea',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    {user.avatarInitials}
                                </div>
                            </Link>
                        )}

                        {/* Hamburger menu is now visible on desktop too, acting as a global side menu */}
                        <button onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', marginLeft: 10, transition: 'opacity 0.2s' }} className="hover-opacity">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>

                {/* MEGA MENU DROPDOWN */}
                <div
                    onMouseEnter={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        position: 'absolute', top: 80, left: 0, right: 0, background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        padding: '40px 0 60px', borderTop: '1px solid #f0f0f0', boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                        color: 'black',
                        opacity: activeDropdown ? 1 : 0,
                        visibility: activeDropdown ? 'visible' : 'hidden',
                        transform: activeDropdown ? 'translateY(0)' : 'translateY(-10px)',
                        pointerEvents: activeDropdown ? 'auto' : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 50, padding: '0 40px' }}>
                        {activeDropdown && MENU_ITEMS[activeDropdown as keyof typeof MENU_ITEMS].items.map((item: any, idx) => (
                            <Link key={idx} href={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '15px 20px', borderRadius: 12, transition: 'background 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <h3 style={{ fontSize: '1.25rem', marginBottom: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {item.title} <span style={{ opacity: 0, transform: 'translateX(-10px)', transition: 'all 0.3s ease', display: 'inline-block' }} className="menu-arrow">→</span>
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </header>

            {/* SPACER FOR FIXED HEADER (Only on non-home pages AND non-dashboard pages) */}
            {/* Dashboard layout handles its own top spacing/padding */}
            {!isHome && !pathname?.startsWith('/dashboard') && <div style={{ height: 80 }} />}

            {/* MOBILE / OFF-CANVAS MENU */}
            {mobileMenuOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 2000 }}>
                    {/* Backdrop */}
                    <div
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: mobileMenuOpen ? 1 : 0, transition: 'opacity 0.3s' }}
                    />

                    {/* Panel */}
                    <div style={{
                        position: 'absolute', top: 0, right: 0, bottom: 0, width: 400, maxWidth: '90vw', background: 'white',
                        padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column'
                    }}>
                        <button onClick={() => setMobileMenuOpen(false)} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 40 }}>
                            <X size={28} />
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, flex: 1 }}>
                            {Object.entries(MENU_ITEMS).map(([key, section]) => (
                                <div key={key}>
                                    <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#999', margin: '0 0 20px', letterSpacing: 1 }}>{section.label}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                        {section.items.map((item: any, idx) => (
                                            <Link key={idx} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'black', fontSize: '1.1rem' }}>
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* General Links (About, Contact, etc.) */}
                        <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#666', fontSize: '1.05rem', fontWeight: 500 }}>
                                Hakkımızda
                            </Link>
                            <div style={{ textDecoration: 'none', color: '#666', fontSize: '1.05rem', fontWeight: 500, cursor: 'pointer' }}>
                                İletişim (info@room001.tr)
                            </div>
                            <Link href="/categories" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#666', fontSize: '1.05rem', fontWeight: 500 }}>
                                Tüm Kategoriler
                            </Link>
                        </div>

                        {/* Footer in Menu */}
                        <div style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 30 }}>
                            {!user ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                    <Button onClick={() => { setIsSignupOpen(true); setMobileMenuOpen(false); }} style={{ width: '100%', padding: '15px 0' }}>BAŞVUR</Button>
                                    <Button variant="outline" onClick={() => { setLoginMode('login'); setIsLoginOpen(true); setMobileMenuOpen(false); }} style={{ width: '100%', padding: '15px 0' }}>GİRİŞ YAP</Button>
                                    <Button
                                        onClick={() => { setIsFeedbackOpen(true); setMobileMenuOpen(false); }}
                                        style={{ width: '100%', padding: '15px 0', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none' }}
                                    >
                                        BETA GERİ BİLDİRİM
                                    </Button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                                        <Button style={{ width: '100%', padding: '15px 0' }}>PANELİM</Button>
                                    </Link>
                                    <Button
                                        onClick={() => { setIsFeedbackOpen(true); setMobileMenuOpen(false); }}
                                        style={{ width: '100%', padding: '15px 0', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none' }}
                                    >
                                        BETA GERİ BİLDİRİM
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}

            {/* Modals */}
            <LoginModal
                isOpen={isLoginOpen}
                mode={loginMode}
                onClose={() => setIsLoginOpen(false)}
                type={undefined}
                onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
                onLoginSuccess={() => { window.location.href = '/dashboard'; }}
            />
            <SignupSelectionModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLoginClick={() => { setIsSignupOpen(false); setLoginMode('login'); setIsLoginOpen(true); }}
                onSignupClick={() => { setIsSignupOpen(false); setLoginMode('signup'); setIsLoginOpen(true); }}
                onCreatorClick={() => { setIsSignupOpen(false); router.push('/become-creator'); }}
                onBrandClick={() => { setIsSignupOpen(false); router.push('/for-brands/inquiry'); }}
            />

            <FeedbackModal
                isOpen={isFeedbackOpen}
                onClose={() => setIsFeedbackOpen(false)}
            />
        </>
    );
}

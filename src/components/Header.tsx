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
            { title: 'Kolektiflerim', description: 'Kendi kişisel mağazalarınız, favori kişileriniz tarafından düzenlenmiş.', href: '/my-circles' },
            { title: 'Zevk Profilim', description: 'Size özel bir stil oluşturmak için 25 ürünü beğenin.', href: '/style' },
        ]
    },
    creators: {
        label: 'Insider\'lar',
        items: [
            { title: 'Insider\'lar İçin', description: 'Zevkinizi paraya dönüştürün.', href: '/creators-info' },
            { title: 'Dijital Mağazalar', description: 'Kitleniz için basitleştirilmiş ve premium bir alışveriş deneyimi.', href: '/digital-shops' },
            { title: 'Affiliate Linkler', description: 'Önerileri kalıcı gelire dönüştüren profesyonel altyapı.', href: '/affiliate-links' },
            { title: 'Marka İşbirlikleri', description: 'Otantik zevk arayan premium markalara doğrudan erişim.', href: '/brand-partnerships' },
            { title: 'Insider Ol', description: 'Kolektif ağımıza katılın ve premium araçlara erişin.', href: '/become-creator' },
        ]
    },
    brands: {
        label: 'Markalar',
        items: [
            { title: 'Markalar İçin', description: 'Kültür yaratan zevk sahipleriyle keşfedin, etkileşime geçin ve işbirliği yapın.', href: '/brands' },
            { title: 'Keşfet', description: 'Gerçek satışları yönlendiren 185.000+ zevk sahibinden oluşan ağımıza erişin.', href: '/brands/discover' },
            { title: 'Etkileşim', description: 'Premium zevk sahiplerini performans verileri ve zevk profilleri aracılığıyla bulun.', href: '/brands/engage' },
            { title: 'Takip', description: 'Kalıcı marka inşası için altyapı aracılığıyla gerçek performansı ve ROI\'yi izleyin.', href: '/brands/track' },
            { title: 'Büyüt', description: 'Reklamları otantik önerilerle değiştiren ağızdan ağıza altyapı ile ölçeklenin.', href: '/brands/amplify' },
        ]
    }
};

function HeaderUrlHandler({
    setIsLoginOpen,
    setIsSignupOpen
}: {
    setIsLoginOpen: (v: boolean) => void,
    setIsSignupOpen: (v: boolean) => void
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const loginParam = searchParams.get('login');
        const signupParam = searchParams.get('signup');

        if (loginParam === 'true') {
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
                <HeaderUrlHandler setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} />
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
                    <Link href="/" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '2.2rem', fontWeight: 800, letterSpacing: -1, textDecoration: 'none', color: 'inherit' }}>
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
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.95rem', fontWeight: 500, }}>
                                    {section.label} <ChevronDown size={14} />
                                </span>
                            </div>
                        ))}
                    </nav>

                    {/* RIGHT ACTIONS */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <button
                            onClick={() => setIsFeedbackOpen(true)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: 'white', border: 'none', padding: '8px 16px', borderRadius: 30,
                                fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                            }}
                        >
                            <MessageSquareShare size={16} /> Beta Geri Bildirim
                        </button>
                        {!user ? (
                            <>
                                <button onClick={() => setIsLoginOpen(true)} style={{ background: 'none', border: 'none', color: 'inherit', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>
                                    Giriş Yap
                                </button>
                                <Button onClick={() => setIsSignupOpen(true)} style={{ background: activeDropdown || mobileMenuOpen ? 'black' : 'white', color: activeDropdown || mobileMenuOpen ? 'white' : 'black', padding: '12px 24px', borderRadius: 4 }}>
                                    Başvur
                                </Button>
                            </>
                        ) : (
                            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ width: 36, height: 36, background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 700 }}>
                                    {user.avatarInitials}
                                </div>
                            </Link>
                        )}

                        <button className="mobile-only-btn" onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', marginLeft: 10 }}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>

                {/* MEGA MENU DROPDOWN */}
                {activeDropdown && (
                    <div
                        onMouseEnter={() => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            position: 'absolute', top: 80, left: 0, right: 0, background: 'white',
                            padding: '40px 0 60px', borderTop: '1px solid #f0f0f0', boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                            color: 'black'
                        }}
                    >
                        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, padding: '0 40px' }}>
                            {MENU_ITEMS[activeDropdown as keyof typeof MENU_ITEMS].items.map((item: any, idx) => (
                                <Link key={idx} href={item.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: 8, fontWeight: 700 }}>{item.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
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

                        {/* Footer in Menu */}
                        <div style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 30 }}>
                            {!user ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                    <Button onClick={() => { setIsSignupOpen(true); setMobileMenuOpen(false); }} style={{ width: '100%', padding: '15px 0' }}>BAŞVUR</Button>
                                    <Button variant="outline" onClick={() => { setIsLoginOpen(true); setMobileMenuOpen(false); }} style={{ width: '100%', padding: '15px 0' }}>GİRİŞ YAP</Button>
                                </div>
                            ) : (
                                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                    <Button style={{ width: '100%', padding: '15px 0' }}>PANELİM</Button>
                                </Link>
                            )}
                        </div>

                    </div>
                </div>
            )}

            {/* Modals */}
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                type="shopper"
                onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
                onLoginSuccess={() => router.push('/dashboard')}
            />
            <SignupSelectionModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLoginClick={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
                onSignupClick={() => { setIsSignupOpen(false); /* redirect to shopper signup */ }}
                onCreatorClick={() => { setIsSignupOpen(false); router.push('/become-creator'); }}
                onBrandClick={() => { setIsSignupOpen(false); router.push('/brands/inquiry'); }}
            />

            <FeedbackModal
                isOpen={isFeedbackOpen}
                onClose={() => setIsFeedbackOpen(false)}
            />
        </>
    );
}

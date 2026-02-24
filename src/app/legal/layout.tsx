import React from 'react';
import Link from 'next/link';

const LEGAL_LINKS = [
    { name: 'Kullanım Şartları', href: '/legal/terms' },
    { name: 'Gizlilik Politikası', href: '/legal/privacy' },
    { name: 'Çerez Politikası', href: '/legal/cookie' },
    { name: 'Künye (Imprint)', href: '/legal/imprint' },
    { name: 'Kişisel Verilerim (Do Not Sell)', href: '/legal/do-not-sell' },
    { name: 'Patentler', href: '/legal/patents' },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
                {/* Fixed Sidebar */}
                <aside style={{ width: '250px', flexShrink: 0, position: 'sticky', top: '120px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase', color: '#111' }}>
                        Yasal Bilgiler
                    </h2>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {LEGAL_LINKS.map(link => (
                            <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: '#666', fontSize: '1.05rem', fontWeight: 500, transition: 'color 0.2s' }}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Content Area */}
                <div style={{ flex: 1, maxWidth: '800px', padding: '0 20px' }}>
                    {children}
                </div>
            </div>
        </main>
    );
}

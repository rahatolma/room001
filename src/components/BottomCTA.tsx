import React from 'react';
import Link from 'next/link';
import Button from './Button';

interface BottomCTAProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    href?: string;
    theme?: 'dark' | 'light';
}

const BottomCTA: React.FC<BottomCTAProps> = ({
    title = "Platformun bir parçası olun.",
    subtitle = "Saniyeler içinde başvurunuzu yapın ve zevk sahiplerinden oluşan ağımıza katılın.",
    buttonText = "Hemen Başvur",
    href = "/become-creator",
    theme = 'dark'
}) => {
    const isDark = theme === 'dark';

    return (
        <section style={{
            padding: '100px 0',
            textAlign: 'center',
            backgroundColor: isDark ? '#111' : '#f9f9f9',
            color: isDark ? '#fff' : '#111'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '24px' }}>
                    {title}
                </h2>
                <p style={{ fontSize: '1.2rem', color: isDark ? '#aaa' : '#666', marginBottom: '40px', lineHeight: 1.6 }}>
                    {subtitle}
                </p>
                <Link href={href} style={{ textDecoration: 'none' }}>
                    <Button style={{
                        padding: '16px 40px',
                        fontSize: '1.1rem',
                        borderRadius: '50px',
                        background: isDark ? '#fff' : '#111',
                        color: isDark ? '#111' : '#fff',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default BottomCTA;

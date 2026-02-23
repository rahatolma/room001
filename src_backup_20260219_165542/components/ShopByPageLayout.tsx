import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GridItem } from '@/types/shop';

interface ShopByPageLayoutProps {
    title: string;
    subtitle?: string;
    heroImage: string;
    heroTitle: string;
    heroDescription?: string;
    heroSlug?: string; // Add this
    items: GridItem[];
    type: 'curator' | 'circle' | 'brand' | 'category';
}

const ShopByPageLayout: React.FC<ShopByPageLayoutProps> = ({
    title,
    subtitle = "Göz At",
    heroImage,
    heroTitle,
    heroDescription,
    heroSlug, // Add this
    items,
    type
}) => {
    // Helper for Turkish grammar (roughly)
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'curator': return 'Insider\'lar';
            case 'circle': return 'Kolektifler';
            case 'brand': return 'Markalar';
            case 'category': return 'Kategoriler';
            default: return type;
        }
    }

    const getItemLink = (item: GridItem) => {
        if (type === 'curator') {
            return `/${item.slug}`;
        }
        if (type === 'brand') {
            return `/brands/${item.slug}`;
        }
        if (type === 'circle') {
            return `/circles/${item.slug}`;
        }
        if (type === 'category') {
            return `/categories/${item.slug}`;
        }
        return `/${type}/${item.slug}`;
    }

    return (
        <div style={{ paddingBottom: 80, backgroundColor: '#fff' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>
                {/* Hero Section */}
                <div style={{ display: 'flex', minHeight: '600px', flexDirection: 'row', marginBottom: 60 }}>
                    {/* Left Content */}
                    <div style={{
                        flex: '0 0 50%', // Force 50% width
                        padding: '80px 40px 80px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: '#fff'
                    }}>
                        <div style={{
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '0.9rem',
                            marginBottom: 20,
                            fontFamily: 'var(--font-dm-sans), sans-serif',
                            fontWeight: 700,

                        }}>
                            {subtitle}
                        </div>
                        <h1 style={{
                            fontSize: '5rem',
                            lineHeight: 1,
                            marginBottom: 30,
                            fontWeight: 800,
                            color: 'rgba(0,0,0,0.05)',
                            fontFamily: 'var(--font-dm-sans), sans-serif',
                            textTransform: 'uppercase'
                        }}>
                            {title}
                        </h1>
                        <h2 style={{
                            fontSize: '4rem',
                            lineHeight: 1.1,
                            marginBottom: 30,
                            fontWeight: 700,
                            marginTop: -60,
                            position: 'relative',
                            zIndex: 2,
                            fontFamily: 'var(--font-dm-sans), sans-serif',
                        }}>
                            {heroTitle}
                        </h2>

                        {heroDescription && (
                            <p style={{ maxWidth: 400, color: '#666', lineHeight: 1.6, marginBottom: 40 }}>
                                {heroDescription}
                            </p>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                            <Link href={heroSlug ? `/${heroSlug}` : '#'} style={{ textDecoration: 'none' }}>
                                <button style={{
                                    background: '#222',
                                    color: 'white',
                                    padding: '15px 30px',
                                    fontSize: '0.9rem',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}>
                                    En Yenileri Keşfet
                                </button>
                            </Link>
                            <button style={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                border: '1px solid #ddd',
                                background: 'white',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div style={{ flex: '0 0 50%', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, background: '#f5f5f5' }}>
                            <img
                                src={heroImage}
                                alt={heroTitle}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                <div style={{ padding: '0' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        marginBottom: 40,
                        borderTop: '1px solid #eee',
                        paddingTop: 40
                    }}>
                        Öne Çıkan {getTypeLabel(type)}
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 40
                    }}>
                        {items.map(item => (
                            <Link key={item.id} href={getItemLink(item)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative', aspectRatio: '3/4', marginBottom: 20, overflow: 'hidden' }}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    />

                                    <div style={{
                                        position: 'absolute', bottom: 30, left: 20, right: 20,
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                        fontFamily: 'var(--font-dm-sans), sans-serif',
                                        lineHeight: 1.1
                                    }}>
                                        {item.title}
                                    </div>
                                </div>
                            </Link >
                        ))}
                    </div >
                </div >
            </div>
        </div >
    );
};

export default ShopByPageLayout;

'use client';

import React, { useState } from 'react';
import ImageFallback from './ImageFallback';
import Link from 'next/link';
import { GridItem } from '@/types/shop';
import FeaturedSlider from './FeaturedSlider';

interface ShopByPageLayoutProps {
    title: string;
    subtitle?: string;
    featuredItems: GridItem[];
    items: GridItem[];
    type: 'curator' | 'circle' | 'brand' | 'category';
}

const ShopByPageLayout: React.FC<ShopByPageLayoutProps> = ({
    title,
    subtitle = "Göz At",
    featuredItems,
    items,
    type
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recommended');

    // Filter items locally based on search query
    const filteredItems = items.filter(item => {
        const titleStr = item?.title ? String(item.title) : '';
        const searchStr = searchQuery ? String(searchQuery) : '';
        return titleStr.toLowerCase().includes(searchStr.toLowerCase());
    });

    // Mock sorting
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === 'newest') {
            const idA = a?.id ? String(a.id) : '';
            const idB = b?.id ? String(b.id) : '';
            return idB.localeCompare(idA);
        }
        if (sortBy === 'popular') {
            const titleA = a?.title ? String(a.title) : '';
            const titleB = b?.title ? String(b.title) : '';
            return titleA.localeCompare(titleB);
        }
        return 0;
    });
    // Helper for Turkish grammar (roughly)
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'curator': return 'Insiderlar';
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
            {/* NEW FULL WIDTH FEATURED SLIDER */}
            <FeaturedSlider items={featuredItems} type={type} onSearchChange={setSearchQuery} />

            <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>

                {/* Grid Section */}
                <div style={{ padding: '0' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #eee',
                        paddingTop: 40,
                        marginBottom: 40
                    }}>
                        <h3 style={{ fontWeight: 700, fontSize: '1.5rem', margin: 0 }}>
                            {getTypeLabel(type)}
                        </h3>

                        {/* Sorting Dropdown */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500 }}>Sıralama:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 30,
                                    border: '1px solid #eaeaea',
                                    fontFamily: 'var(--font-dm-sans)',
                                    fontSize: '0.9rem',
                                    background: '#f8f8f8',
                                    color: '#111',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="recommended">Önerilenler</option>
                                <option value="popular">En Çok Tıklananlar</option>
                                <option value="newest">En Yeniler</option>
                            </select>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 40
                    }}>
                        {sortedItems.map(item => (
                            <Link key={item.id} href={getItemLink(item)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative', aspectRatio: '3/4', marginBottom: 20, overflow: 'hidden' }}>
                                    <ImageFallback
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'Transform 0.5s' }}
                                    />

                                    <div style={{
                                        position: 'absolute', bottom: 30, left: 20, right: 20,
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 700,

                                        lineHeight: 1.1
                                    }}>
                                        {item.title}
                                    </div>
                                </div>
                            </Link >
                        ))}
                    </div >
                </div >
            </div >
        </div >
    );
};

export default ShopByPageLayout;

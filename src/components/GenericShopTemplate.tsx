'use client';

import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import ProductGrid from '@/components/ProductGrid';
import { toast } from 'sonner';

interface GenericShopTemplateProps {
    title: string;
    roleLabel?: string;
    avatarImage?: string | null;
    statsText?: string;
    buttonText?: string;
    products: any[];
    isOwner?: boolean;
}

export default function GenericShopTemplate({
    title,
    roleLabel,
    avatarImage,
    statsText,
    buttonText,
    products,
    isOwner = false
}: GenericShopTemplateProps) {
    const [activeSection, setActiveSection] = useState('all');

    const handleEditClick = () => {
        toast.info(`${title} vitrini düzenleme özelliği yakında aktif olacak!`);
    };

    // Extract unique categories to act as faux-sections for visual consistency
    // If there are none, we just show "Tümü"
    const uniqueCategories = Array.from(new Set(products.map((p: any) => p.category?.name || p.category || 'Tümü'))).filter(c => c !== 'Tümü' && c !== 'GENEL').slice(0, 8);

    // Filter products based on active "section"
    const filteredProducts = activeSection === 'all'
        ? products
        : products.filter(p => (p.category?.name || p.category) === activeSection);

    return (
        <div style={{ padding: '0', maxWidth: '100vw', overflowX: 'hidden' }}>
            <ProfileHeader
                name={title}
                roleLabel={roleLabel}
                avatarImage={avatarImage}
                avatarInitials={title[0]}
                statsText={statsText}
                hideFollowButton={!buttonText}
                isOwner={isOwner}
                onEditClick={handleEditClick}
            />

            {/* Section Navigation (Pill Buttons) - Exact match to CuratorShop */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 15,
                padding: '15px 0',
                marginBottom: 30,
                borderBottom: '1px solid #f0f0f0',
                fontSize: '0.85rem',
                color: '#333',
                fontWeight: 500,
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                maxWidth: 'var(--max-width)',
                margin: '0 auto'
            }}>
                <span
                    onClick={() => setActiveSection('all')}
                    style={{
                        border: activeSection === 'all' ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        cursor: 'pointer',
                        opacity: activeSection === 'all' ? 1 : 0.6
                    }}
                >
                    Tümü
                </span>

                {uniqueCategories.map(cat => (
                    <span
                        key={cat as string}
                        onClick={() => setActiveSection(cat as string)}
                        style={{
                            border: activeSection === cat ? '1px solid var(--color-primary, black)' : '1px solid transparent',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            cursor: 'pointer',
                            opacity: activeSection === cat ? 1 : 0.6
                        }}
                    >
                        {cat as string}
                    </span>
                ))}
            </div>

            <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
                {filteredProducts.length > 0 ? (
                    <ProductGrid products={filteredProducts} />
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: '#999' }}>Bu kategoride henüz ürün bulunmuyor.</div>
                )}
            </div>
        </div>
    );
}

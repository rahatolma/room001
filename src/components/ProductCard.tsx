'use client';

import React from 'react';
import { trackEvent } from '@/actions/analytics';

interface ProductCardProps {
    id: string;
    image: string;
    brand: string;
    title: string;
    price: string;
    curator: {
        name: string;
        avatar: string;
    };
    link?: string;
    collectionItemId?: string;
}

export default function ProductCard({ id, image, brand, title, price, curator, link, collectionItemId }: ProductCardProps) {
    const handleProductClick = async () => {
        try {
            await trackEvent({
                type: 'CLICK',
                entityId: id,
                entityType: 'PRODUCT',
                metadata: { collectionItemId }
            });
        } catch (error) {
            // Ignore error
        }
    };

    const content = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', width: '100%', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                <img
                    src={image}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#ccc'
                        }}>
                            <img src={curator.avatar} alt={curator.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#666', fontWeight: 500 }}>{curator.name}</span>
                    </div>
                </div>

                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-primary, #333)', marginBottom: 2 }}>{brand}</span>
                    <h3 style={{ fontFamily: 'var(--font-primary, var(--font-dm-sans), sans-serif)', fontSize: '1rem', fontWeight: 600, margin: 0, lineHeight: 1.3, color: 'var(--text-primary, #000)' }}>{title}</h3>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-primary, #666)', marginTop: 4 }}>{price}</span>
                </div>
            </div>
        </div>
    );

    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={handleProductClick}
            >
                {content}
            </a>
        );
    }

    return content;
}

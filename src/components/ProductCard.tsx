'use client';

import React from 'react';
import { trackEvent } from '@/actions/analytics';
import ImageFallback from './ImageFallback';

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
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', transition: 'transform 0.2s ease' }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
            }}
        >
            <div style={{ position: 'relative', aspectRatio: '4/5', width: '100%', overflow: 'hidden', backgroundColor: '#f9f9f9', borderRadius: 8 }}>
                <ImageFallback
                    src={image}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#ccc'
                        }}>
                            <ImageFallback src={curator.avatar} alt={curator.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 500 }}>{curator.name}</span>
                    </div>
                </div>

                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary, #111)', letterSpacing: 0.5, marginBottom: 4 }}>{brand}</span>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 400, margin: 0, lineHeight: 1.4, color: 'var(--text-primary, #444)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</h3>
                    <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary, #000)', marginTop: 8 }}>{price}</span>
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

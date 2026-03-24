'use client';

import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { logAdClick } from '@/actions/ads';

interface NativeAdSlotProps {
    ad: {
        id: string;
        title: string;
        brandName: string;
        description: string | null;
        imageUrl: string;
        targetUrl: string;
        targetType: string;
    };
    userId?: string;
    orientation?: 'horizontal' | 'vertical';
}

export default function NativeAdSlot({ ad, userId, orientation = 'vertical' }: NativeAdSlotProps) {
    const [clicked, setClicked] = useState(false);

    const handleClick = async () => {
        if (!clicked) {
            setClicked(true);
            await logAdClick(ad.id, userId);
        }
    };

    if (orientation === 'vertical') {
        return (
            <div
                className="product-card native-ad-card"
                style={{ position: 'relative', border: '1px solid #e2e8f0', background: '#f8fafc', overflow: 'hidden' }}
            >
                {/* SPONSORED BADGE */}
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '4px 8px', borderRadius: 4, zIndex: 10, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Sponsorlu
                </div>

                <Link href={ad.targetUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '0 0 100% 0', position: 'relative', background: '#f0f0f0' }}>
                        <img
                            src={ad.imageUrl}
                            alt={ad.title}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ padding: '15px 12px' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', letterSpacing: 0.5, marginBottom: 4 }}>{ad.brandName}</div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 5px 0', lineHeight: 1.3 }}>{ad.title}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                            {ad.description || 'Bu fırsatı kaçırmayın. Hemen keşfedin.'}
                        </p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600, color: '#2563eb' }}>
                            İncele <ArrowUpRight size={14} />
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

    // Horizontal Layout (Banners between rows)
    return (
        <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0', margin: '30px 0', display: 'flex', background: '#f8fafc', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '4px 8px', borderRadius: 4, zIndex: 10, letterSpacing: 1 }}>
                SPONSORLU
            </div>

            <Link href={ad.targetUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick} style={{ display: 'flex', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '30%', minHeight: 120, position: 'relative' }}>
                    <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div style={{ padding: 25, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666', letterSpacing: 0.5, marginBottom: 5 }}>{ad.brandName}</div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a' }}>{ad.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.5, maxWidth: 500 }}>
                        {ad.description}
                    </p>
                </div>
                <div style={{ padding: 25, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 150 }}>
                    <div style={{ background: '#111', color: 'white', padding: '10px 20px', borderRadius: 30, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        Keşfet <ArrowUpRight size={16} />
                    </div>
                </div>
            </Link>
        </div>
    );
}

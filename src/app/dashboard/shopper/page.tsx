'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';

// Mock favorites for now
const MOCK_FAVORITES = [
    {
        id: 'p1',
        title: 'Premium Keten Gömlek',
        brand: 'Massimo Dutti',
        price: '2.499 TL',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
        curator: {
            name: 'Selin Yılmaz',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80'
        }
    },
    {
        id: 'p2',
        title: 'Deri Omuz Çantası',
        brand: 'Yargıcı',
        price: '3.250 TL',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
        curator: {
            name: 'Selin Yılmaz',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80'
        }
    },
];

export default function ShopperDashboardHome() {
    const { user } = useAuth();

    return (
        <div style={{ paddingBottom: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0, marginBottom: 10 }}>Merhaba, {user?.fullName || 'Alışveriş Tutkunu'}</h1>
                    <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>Sizin için seçilenler.</p>
                </div>
            </div>

            <div style={{ marginBottom: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Son Eklenen Favoriler</h2>
                    <Link href="/dashboard/favorites" style={{ fontSize: '0.9rem', color: '#666' }}>Tümünü Gör</Link>
                </div>
                <ProductGrid products={MOCK_FAVORITES} />
            </div>

            <div style={{ marginBottom: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Keşfetmeye Devam Et</h2>
                </div>
                <div style={{ padding: 40, background: '#f5f5f5', borderRadius: 16, textAlign: 'center' }}>
                    <p>Daha fazla içerik üreticisini takip ederek akışınızı kişiselleştirin.</p>
                    <Link href="/creators" style={{ marginTop: 20, display: 'inline-flex', padding: '12px 24px', background: 'black', color: 'white', borderRadius: 30, textDecoration: 'none', fontWeight: 600 }}>
                        Insider'ları Keşfet
                    </Link>
                </div>
            </div>

        </div>
    );
}

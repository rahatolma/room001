'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Megaphone, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BrandDashboardHome() {
    const { user } = useAuth();

    return (
        <div style={{ paddingBottom: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 50 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0, marginBottom: 10 }}>Hoş geldiniz, {user?.fullName || 'Marka Yöneticisi'}</h1>
                    <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>Marka portalına genel bakış.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 30 }}>
                <div style={{ padding: 40, border: '1px solid #eaeaea', borderRadius: 16, background: 'white' }}>
                    <Search size={40} style={{ marginBottom: 20 }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Yeni Insider'lar Keşfet</h3>
                    <p style={{ color: '#666', marginBottom: 30, lineHeight: 1.6 }}>Markanız için en uygun içerik üreticilerini bulun ve işbirliği teklifi gönderin.</p>
                    <Link href="/dashboard/brand-match" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600, color: 'black', textDecoration: 'none' }}>
                        Keşfetmeye Başla <ArrowRight size={18} />
                    </Link>
                </div>

                <div style={{ padding: 40, border: '1px solid #eaeaea', borderRadius: 16, background: 'white' }}>
                    <Megaphone size={40} style={{ marginBottom: 20 }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Kampanya Oluştur</h3>
                    <p style={{ color: '#666', marginBottom: 30, lineHeight: 1.6 }}>Yeni bir reklam kampanyası başlatın ve insider'ları davet edin.</p>
                    <Link href="/dashboard/campaigns" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600, color: 'black', textDecoration: 'none' }}>
                        Kampanya Yönetimi <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

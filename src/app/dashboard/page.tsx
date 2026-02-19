'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { TrendingUp, Bell } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Chart
const DATA = [
    { name: 'Pzt', uv: 400 },
    { name: 'Sal', uv: 300 },
    { name: 'Çar', uv: 1200 }, // Peak like in screenshot
    { name: 'Per', uv: 600 },
    { name: 'Cum', uv: 800 },
    { name: 'Cmt', uv: 500 },
    { name: 'Paz', uv: 700 },
];

export default function DashboardHome() {
    const { user } = useAuth();

    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 1200, paddingBottom: 100 }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 50 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0, marginBottom: 10 }}>Merhaba, {user?.fullName || 'Yeni Üye'}</h1>
                    <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>İşte mağazanın son durum özeti.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#999', letterSpacing: 1, marginBottom: 5 }}>BAKİYE</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>₺0.00</div>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 30 }}>

                {/* Clicks */}
                <div style={{ padding: 25, borderRadius: 12, border: '1px solid #eaeaea', background: 'white' }}>
                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: 15 }}>Toplam Tıklanma</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: 10 }}>0</div>
                    <div style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                        <TrendingUp size={16} /> %12 artış <span style={{ color: '#999', fontWeight: 400 }}>(son 30 gün)</span>
                    </div>
                </div>

                {/* Profile Views */}
                <div style={{ padding: 25, borderRadius: 12, border: '1px solid #eaeaea', background: 'white' }}>
                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: 15 }}>Profil Görüntülenme</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: 10 }}>0</div>
                    <div style={{ fontSize: '0.85rem', color: '#059669', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                        <TrendingUp size={16} /> %5 artış <span style={{ color: '#999', fontWeight: 400 }}>(son 30 gün)</span>
                    </div>
                </div>

                {/* Active Collections */}
                <div style={{ padding: 25, borderRadius: 12, border: '1px solid #eaeaea', background: 'white' }}>
                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: 15 }}>Aktif Koleksiyon</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: 10 }}>1</div>
                </div>
            </div>

            {/* Notification Card (Yellow) */}
            <div style={{
                background: '#fff9e6', border: '1px solid #ffeeba', borderRadius: 12, padding: 25,
                marginBottom: 40, width: 'fit-content', minWidth: 300
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ color: '#b96c15', fontWeight: 700, fontSize: '0.95rem' }}>Fiyat Alarmı Bekleyen</div>
                    <Bell size={24} color="#eec68b" />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#b96c15', marginBottom: 10 }}>1.2K</div>
                <div style={{ fontSize: '0.85rem', color: '#b96c15', fontWeight: 600 }}>🔥 Yüksek Satış Potansiyeli</div>
            </div>

            {/* Weekly Performance Chart */}
            <div style={{ padding: 30, borderRadius: 12, border: '1px solid #eaeaea', background: 'white' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0, marginBottom: 30 }}>Haftalık Performans</h3>
                <div style={{ height: 300, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DATA}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ background: '#1a1a1a', border: 'none', borderRadius: 8, color: 'white' }}
                                itemStyle={{ color: 'white' }}
                                cursor={{ stroke: '#ddd' }}
                            />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Pzt', views: 400, clicks: 240 },
    { name: 'Sal', views: 300, clicks: 139 },
    { name: 'Çar', views: 200, clicks: 980 },
    { name: 'Per', views: 278, clicks: 390 },
    { name: 'Cum', views: 189, clicks: 480 },
    { name: 'Cmt', views: 239, clicks: 380 },
    { name: 'Paz', views: 349, clicks: 430 },
];

export default function OverviewChart() {
    return (
        <div style={{ width: '100%', height: 300, background: 'white', padding: 20, borderRadius: 12, border: '1px solid #f0f0f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 20, color: '#333' }}>Haftalık Performans</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#000" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#000" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                    <Tooltip
                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ fontSize: 12 }}
                        formatter={(value, name) => [value, name === 'views' ? 'Görüntülenme' : name === 'clicks' ? 'Tıklama' : name]}
                    />
                    <Area type="monotone" dataKey="views" stackId="1" stroke="#82ca9d" fill="url(#colorViews)" activeDot={{ r: 6 }} />
                    <Area type="monotone" dataKey="clicks" stackId="2" stroke="#000" fill="url(#colorClicks)" activeDot={{ r: 6 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

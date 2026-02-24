'use client';

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { ArrowUpRight, TrendingUp, Users, MousePointerClick, ShoppingBag, Eye, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAnalyticsData } from '@/actions/analytics';

export default function AnalyticsPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [performanceData, setPerformanceData] = useState<any[]>([]);
    const [sourceData, setSourceData] = useState<any[]>([]);
    const [totals, setTotals] = useState<any>({ views: 0, clicks: 0, ordersGenerated: 0, revenue: 0 });
    const [topProducts, setTopProducts] = useState<any[]>([]);

    useEffect(() => {
        if (!user?.id) return;

        async function fetchAnalytics() {
            setLoading(true);
            const res = await getAnalyticsData(user!.id);
            if (res.success && res.timeline && res.totals) {
                // Map timeline to chart format
                const chartData = res.timeline.map((day: any) => ({
                    date: new Date(day.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
                    views: day.views,
                    clicks: day.clicks
                }));
                // Limit to last 7 days for cleaner UI if too many
                setPerformanceData(chartData.slice(-7));

                // Map sources
                setSourceData([
                    { name: 'Instagram', value: res.totals.instagramClicks || 0, color: '#E1306C' },
                    { name: 'TikTok', value: res.totals.tiktokClicks || 0, color: '#000000' },
                    { name: 'Direct/Web', value: res.totals.directClicks || 0, color: '#059669' },
                ]);

                setTotals(res.totals);
            }

            // For demo purposes, we keep mock top products here since we need full product data integration
            setTopProducts([
                { id: 1, name: "Dyson Airwrap Styler", brand: "Dyson", clicks: 1240, orders: 45, conversion: "3.6%", revenue: "₺18.500" },
                { id: 2, name: "L'Oréal Paris Serum", brand: "L'Oréal", clicks: 5800, orders: 320, conversion: "5.5%", revenue: "₺4.800" },
                { id: 3, name: "Nike Air Force 1", brand: "Nike", clicks: 890, orders: 28, conversion: "3.1%", revenue: "₺5.600" },
            ]);

            setLoading(false);
        }

        fetchAnalytics();
    }, [user?.id]);

    if (loading) return <div style={{ padding: 50, textAlign: 'center' }}>Analizler yükleniyor...</div>;

    // Formatting helpers
    const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();
    const ctr = totals.views > 0 ? ((totals.clicks / totals.views) * 100).toFixed(1) : '0';
    return (
        <div style={{ maxWidth: 1200, paddingBottom: 100 }}>
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1 }}>Panel</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', margin: 0, lineHeight: 1.5 }}>Trafik, tıklanma oranları ve satış performansını analiz et.</p>
            </div>

            {/* AI INSIGHTS BANNERS */}
            <div className="responsive-2-col" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 40 }}>
                <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', padding: 25, borderRadius: 12, display: 'flex', gap: 15, alignItems: 'flex-start', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.2)' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 8 }}><Zap size={24} /></div>
                    <div>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: 600 }}>Trafik Patlaması!</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5 }}>
                            L'Oréal Paris Serum linkiniz son 24 saatte TikTok'tan yoğun trafik alıyor.
                            Dönüşüm oranını artırmak için bir Story daha atabilirsiniz.
                        </p>
                    </div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 25, borderRadius: 12, display: 'flex', gap: 15, alignItems: 'flex-start' }}>
                    <div style={{ background: '#e2e8f0', color: '#475569', padding: 10, borderRadius: 8 }}><TrendingUp size={24} /></div>
                    <div>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: 600 }}>Genel Büyüme</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>
                            Geçen aya göre link tıklamalarınız <strong>%24 arttı</strong>.
                            Özellikle akşam 20:00 - 22:00 saatleri arası etkileşiminiz zirve yapıyor.
                        </p>
                    </div>
                </div>
            </div>

            {/* KPI CARDS */}
            <div className="responsive-kpi-grid" style={{ marginBottom: 40 }}>
                <KpiCard title="Toplam Görüntülenme" value={formatNumber(totals.views)} trend="+12%" icon={<Eye size={20} />} />
                <KpiCard title="Toplam Tıklanma" value={formatNumber(totals.clicks)} trend="+24%" icon={<MousePointerClick size={20} />} />
                <KpiCard title="Dönüşüm Oranı (CTR)" value={`%${ctr}`} trend="+0.8%" icon={<ArrowUpRight size={20} />} />
                <KpiCard title="Yönlendirilen Satış" value={formatNumber(totals.ordersGenerated)} trend="+18%" icon={<ShoppingBag size={20} />} />
            </div>

            {/* CHARTS ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30, marginBottom: 50 }}>
                {/* Traffic Over Time */}
                <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, padding: 30 }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Trafik Akışı (Son 30 Gün)</h3>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#111" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#111" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="views" name="Görüntüleme" stroke="#8884d8" fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="clicks" name="Tıklanma" stroke="#111" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, padding: 30 }}>
                    <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', fontWeight: 600 }}>Trafik Kaynakları</h3>
                    <div style={{ height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Custom Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                        {sourceData.map(s => (
                            <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                                    <span style={{ color: '#444' }}>{s.name}</span>
                                </div>
                                <strong style={{ color: '#111' }}>%{s.value}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TOP PRODUCTS TABLE */}
            <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '25px 30px', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>En Çok Performans Gösteren Ürünler</h3>
                    <span style={{ fontSize: '0.8rem', color: '#666', background: '#f5f5f5', padding: '6px 12px', borderRadius: 20 }}>Son 30 Gün</span>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#fafafa', color: '#666', fontSize: '0.85rem' }}>
                            <th style={{ padding: '15px 30px', fontWeight: 500 }}>Ürün</th>
                            <th style={{ padding: '15px 30px', fontWeight: 500 }}>Marka</th>
                            <th style={{ padding: '15px 30px', fontWeight: 500 }}>Tıklanma</th>
                            <th style={{ padding: '15px 30px', fontWeight: 500 }}>Satış (Sipariş)</th>
                            <th style={{ padding: '15px 30px', fontWeight: 500 }}>Dönüşüm Oranı</th>
                            <th style={{ padding: '15px 30px', fontWeight: 500, textAlign: 'right' }}>Tahmini Kazanç</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topProducts.map((p, i) => (
                            <tr key={p.id} style={{ borderTop: '1px solid #eee', fontSize: '0.9rem', color: '#333' }}>
                                <td style={{ padding: '20px 30px', fontWeight: 500 }}>{p.name}</td>
                                <td style={{ padding: '20px 30px', color: '#666' }}>{p.brand}</td>
                                <td style={{ padding: '20px 30px' }}>{new Intl.NumberFormat('tr-TR').format(p.clicks)}</td>
                                <td style={{ padding: '20px 30px' }}>{p.orders}</td>
                                <td style={{ padding: '20px 30px' }}>
                                    <span style={{ background: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: 4, fontWeight: 600, fontSize: '0.8rem' }}>
                                        {p.conversion}
                                    </span>
                                </td>
                                <td style={{ padding: '20px 30px', textAlign: 'right', fontWeight: 600 }}>{p.revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

// Subcomponent for KPI Cards
function KpiCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
    const isPositive = trend.startsWith('+');
    return (
        <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, padding: 25, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: '#666' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{title}</span>
                <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8 }}>{icon}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: -0.5 }}>{value}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isPositive ? '#059669' : '#dc2626', display: 'flex', alignItems: 'center' }}>
                    {trend}
                </span>
            </div>
        </div>
    );
}

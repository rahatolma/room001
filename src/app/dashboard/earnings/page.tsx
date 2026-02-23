'use client';

import React from 'react';
import Button from '@/components/Button';
import { Download, ExternalLink, HelpCircle, CheckCircle } from 'lucide-react';

import { getFinancialSummary, getTransactions, requestPayout } from '@/actions/finance';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { seedFinancialData } from '@/actions/seed';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EarningsPage() {
    const { user } = useAuth();
    const [summary, setSummary] = useState<any>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            Promise.all([
                getFinancialSummary(),
                getTransactions(10)
            ]).then(([sumData, txData]) => {
                setSummary(sumData);
                setTransactions(txData);
                setLoading(false);
            });
        }
    }, [user?.id]);

    if (loading) return <div style={{ padding: 50, textAlign: 'center' }}>Finansal veriler yükleniyor...</div>;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
    };

    // Realistic Mock Chart Data
    const chartData = [
        { month: 'Eyl', total: 4500, paid: 4500 },
        { month: 'Eki', total: 6800, paid: 6800 },
        { month: 'Kas', total: 11200, paid: 11200 },
        { month: 'Ara', total: 15400, paid: 14000 },
        { month: 'Oca', total: 18900, paid: 12500 },
        { month: 'Şub', total: 24500, paid: 0 },
    ];

    return (
        <div style={{ maxWidth: 1200, paddingBottom: 100, }}>


            {/* --- HEADER SECTION --- */}
            <div style={{ background: 'white', padding: '40px 0', borderBottom: '1px solid #eee', marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    {/* Level Badge */}
                    <div>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 400, margin: 0, lineHeight: 1 }}>Tutkun</h1>
                        <div style={{ marginTop: 10, color: '#666', fontSize: '0.9rem' }}>
                            <span style={{ fontWeight: 600, color: 'black' }}>Elçi seviyesine</span> 14 puan kaldı
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'flex', gap: 60, textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 5 }}>-</div>
                            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Gelecek Ödeme</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 5 }}>{formatCurrency(summary?.pendingBalance || 0)}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Bekleyen</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 5 }}>{formatCurrency(summary?.lastPayoutAmount || 0)}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Son Ödeme</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 5 }}>{formatCurrency(summary?.totalEarnings || 0)}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Toplam Kazanç</div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 20, textAlign: 'right' }}>
                    <a href="#" style={{ fontSize: '0.85rem', color: '#666', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        Daha Fazla Bilgi <HelpCircle size={14} />
                    </a>
                </div>
            </div>

            {/* --- MONTHLY BREAKDOWN (CHART) --- */}
            <Section title="Kazanç Grafiği">
                <div style={{ background: 'white', border: '1px solid #eee', borderRadius: 12, padding: '30px', height: 400, boxShadow: '0 5px 20px rgba(0,0,0,0.02)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#888', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#888', fontSize: 12 }}
                                tickFormatter={(value) => `₺${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                                formatter={(value: number | undefined) => [formatCurrency(value || 0), '']}
                                labelStyle={{ fontWeight: 'bold', color: '#333', marginBottom: 5 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                name="Kazanç"
                                stroke="#059669"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Section>

            {/* --- LEDGER (TRANSACTIONS) --- */}
            <Section
                title="Hesap Hareketleri (Ledger)"
                subtitle="Tüm kazanç ve ödemelerin detaylı dökümü."
                action={<Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', height: 36, padding: '0 15px', textTransform: 'uppercase', letterSpacing: 1 }}>İNDİR</Button>}
            >
                <Table
                    headers={['Tarih', 'İşlem Tipi', 'Açıklama', 'Tutar', 'Durum']}
                    rows={transactions.map(t => [
                        new Date(t.createdAt).toLocaleDateString('tr-TR'),
                        t.type,
                        t.description || '-',
                        <span key="amount" style={{ color: t.amount > 0 ? 'green' : 'red', fontWeight: 600 }}>
                            {t.amount > 0 ? '+' : ''}{formatCurrency(t.amount)}
                        </span>,
                        <span key="status" style={{ padding: '4px 8px', borderRadius: 4, background: t.status === 'APPROVED' ? '#dcfce7' : '#f3f4f6', color: t.status === 'APPROVED' ? '#166534' : '#6b7280', fontSize: '0.75rem', fontWeight: 600 }}>
                            {t.status}
                        </span>
                    ])}
                    emptyMessage="Henüz bir işlem hareketi bulunmuyor."
                />
            </Section>

            {/* --- REFERRALS --- */}
            <Section
                title="Referanslar"
                subtitle={<>Davet ettiğin her üretici için ₺30.000'ye kadar kazan. <a href="#" style={{ textDecoration: 'underline' }}>Detaylar burada</a></>}
                action={<Button style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', height: 36, padding: '0 15px', textTransform: 'uppercase', letterSpacing: 1, background: '#1a1a1a', color: 'white' }}>DAVET ET & KAZAN</Button>}
            >
                <Table
                    headers={['Katıldı', 'İsim', 'En Yüksek Seviye', 'Ulaşılan Tarih', 'Bonus', 'Bekleyen ⓘ', 'Ödenen', 'Referans Kredisi', 'Bonus Puanı']}
                    rows={[
                        // Footer Row Style Mock
                        [<strong key="1">Toplam</strong>, '', '', '', <strong key="2">0₺</strong>, <strong key="3">0₺</strong>, <strong key="4">0₺</strong>, <strong key="5">0</strong>, <strong key="6">0</strong>]
                    ]}
                />
            </Section>

            {/* --- LINKED ACCOUNTS --- */}
            <Section
                title="Bağlı Hesaplar (Ödeme Al)"
                subtitle={<>Lütfen IBAN veya Banka hesabınızı bağlayın. Mevcut Bakiyeniz: <strong>{formatCurrency(summary?.availableBalance || 0)}</strong></>}
            >
                <div style={{ border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#1a1a1a', color: 'white', padding: '15px 25px', fontSize: '0.85rem', fontWeight: 500 }}>
                        <div>Tip</div>
                        <div style={{ textAlign: 'center' }}>Hesap</div>
                        <div style={{ textAlign: 'right' }}>İşlem</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '20px 25px', alignItems: 'center', fontSize: '0.9rem', color: '#333' }}>
                        <div style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>IBAN / BANKA</div>
                        <div style={{ textAlign: 'center' }}>TR90 0000... (Garanti)</div>
                        <div style={{ textAlign: 'right' }}>
                            <Button
                                onClick={async () => {
                                    if (confirm('Tüm bakiyeyi çekmek istiyor musunuz?')) {
                                        await requestPayout(summary?.availableBalance, 'TR90 0000...');
                                        alert('Ödeme talebi alındı!');
                                        window.location.reload();
                                    }
                                }}
                                disabled={!summary || summary.availableBalance <= 0}
                                style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', color: summary?.availableBalance > 0 ? 'black' : '#ccc' }}
                            >
                                ÖDEME TALEP ET
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>

        </div>
    );
}

// --- REUSABLE COMPONENTS ---

function Section({ title, subtitle, action, children }: { title: string, subtitle?: React.ReactNode, action?: React.ReactNode, children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 400, margin: 0, marginBottom: 8 }}>{title}</h2>
                    {subtitle && <div style={{ fontSize: '0.9rem', color: '#666', maxWidth: 800, lineHeight: 1.5 }}>{subtitle}</div>}
                </div>
                {action && <div>{action}</div>}
            </div>
            {children}
        </div>
    );
}

function Table({ headers, rows = [], emptyMessage }: { headers: string[], rows?: any[][], emptyMessage?: string }) {
    return (
        <div style={{ border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                background: '#1a1a1a',
                color: 'white',
                padding: '15px 25px',
                fontSize: '0.85rem',
                fontWeight: 500
            }}>
                {headers.map((h, i) => (
                    <div key={i} style={{ textAlign: i === 0 ? 'left' : 'center' }}>{h}</div>
                ))}
            </div>

            {/* Rows */}
            {rows.length > 0 ? (
                <div style={{ background: '#f9f9f9' }}>
                    {rows.map((row, rI) => (
                        <div key={rI} style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                            padding: '20px 25px',
                            borderBottom: rI === rows.length - 1 ? 'none' : '1px solid #eee',
                            fontSize: '0.9rem',
                            color: '#333',
                            background: 'white'
                        }}>
                            {row.map((cell, cI) => (
                                <div key={cI} style={{ textAlign: cI === 0 ? 'left' : 'center' }}>{cell}</div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: '0.9rem', fontWeight: 300, background: '#fafafa' }}>
                    {emptyMessage}
                </div>
            )}
        </div>
    )
}

'use client';

import React from 'react';
import Button from '@/components/Button';
import { Download, ExternalLink, HelpCircle, CheckCircle } from 'lucide-react';

export default function EarningsPage() {
    return (
        <div style={{ maxWidth: 1200, paddingBottom: 100, fontFamily: 'sans-serif' }}>

            {/* --- HEADER SECTION --- */}
            <div style={{ background: 'white', padding: '40px 0', borderBottom: '1px solid #eee', marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    {/* Level Badge */}
                    <div>
                        <h1 style={{ fontSize: '3.5rem', fontFamily: 'serif', fontWeight: 400, margin: 0, lineHeight: 1 }}>Tutkun</h1>
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
                            <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 5 }}>-</div>
                            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Bekleyen</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 5 }}>-</div>
                            <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>Ödenen Tutar</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300, marginBottom: 5 }}>-</div>
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

            {/* --- MONTHLY BREAKDOWN --- */}
            <Section title="Aylık Özet">
                <Table
                    headers={['Tarih', 'Toplam Tutar', 'Kilitli Tutar', 'Ödenen Tutar']}
                    rows={[
                        ['Şubat \'26', '-', '-', '-']
                    ]}
                />
            </Section>

            {/* --- COMMISSIONS --- */}
            <Section
                title="Komisyonlar"
                subtitle="Siparişlerin kazanç sekmesine yansıması 7 günü bulabilir. Detaylı bilgi için lütfen Üretici Rehberi'ne göz atın."
                action={<Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', height: 36, padding: '0 15px', textTransform: 'uppercase', letterSpacing: 1 }}>İNDİR</Button>}
            >
                <Table
                    headers={['Tarih', 'Ürün', 'Satıcı', 'Sipariş Tutarı', 'Komisyon', 'Kod', 'Durum']}
                    emptyMessage="Mağazanız ve linkleriniz üzerinden yapılan satın alımlar burada görünecektir."
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
                        [<strong>Toplam</strong>, '', '', '', <strong>0₺</strong>, <strong>0₺</strong>, <strong>0₺</strong>, <strong>0</strong>, <strong>0</strong>]
                    ]}
                />
            </Section>

            {/* --- OPPORTUNITY PAYMENTS --- */}
            <Section
                title="İşbirliği Ödemeleri"
                action={<Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', height: 36, padding: '0 15px', textTransform: 'uppercase', letterSpacing: 1 }}>İNDİR</Button>}
            >
                <Table
                    headers={['Tarih', 'Fırsat', 'Bonus', 'Durum']}
                    emptyMessage="Marka işbirliklerinden gelen ödemeler burada görünecektir."
                />
            </Section>

            {/* --- SHOPPER REFERRAL BONUSES --- */}
            <Section
                title="Alışverişçi Referans Bonusları"
                subtitle="Alışverişçi referanslarından ₺0 kazandın, her yeni kişi için ₺30 kazanabilirsin."
            >
                <Table
                    headers={['Tarih', 'Bonus', 'Tutar', 'Durum']}
                    emptyMessage="Her alışverişçi referansı için ₺30 kazanabilirsin."
                />
            </Section>

            {/* --- PAYMENTS --- */}
            <Section title="Ödemeler">
                <Table
                    headers={['Gönderildi', 'Tutar', 'Kaynak']}
                    emptyMessage="Ödeme alabilmek için lütfen aşağıdan bir hesap bağlayın."
                />
            </Section>

            {/* --- LINKED ACCOUNTS --- */}
            <Section
                title="Bağlı Hesaplar"
                subtitle={<>Lütfen IBAN veya Banka hesabınızı bağlayın. Sorun yaşarsanız <a href="#" style={{ textDecoration: 'underline' }}>hesap ayarlarına</a> gidebilirsiniz.</>}
            >
                <div style={{ border: '1px solid #1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#1a1a1a', color: 'white', padding: '15px 25px', fontSize: '0.85rem', fontWeight: 500 }}>
                        <div>Tip</div>
                        <div style={{ textAlign: 'center' }}>Hesap</div>
                        <div style={{ textAlign: 'right' }}>İşlem</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '20px 25px', alignItems: 'center', fontSize: '0.9rem', color: '#333' }}>
                        <div style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>IBAN / BANKA</div>
                        <div style={{ textAlign: 'center' }}>-</div>
                        <div style={{ textAlign: 'right' }}>
                            <button style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase' }}>HESAP BAĞLA</button>
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
                    <h2 style={{ fontSize: '1.8rem', fontFamily: 'serif', fontWeight: 400, margin: 0, marginBottom: 8 }}>{title}</h2>
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

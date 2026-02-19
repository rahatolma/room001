'use client';

import React, { useState } from 'react';
import {
    Search,
    Download,
    Plus,
    Copy,
    Check,
    ArrowDown,
    ExternalLink,
    ChevronRight,
    Filter,
    Calendar,
    Settings,
    MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/Button';

// Types
type TabType = 'LINKS' | 'PERFORMANCE' | 'ORDERS';

interface LinkData {
    id: string;
    productId: string;
    date: string;
    product: {
        image: string;
        name: string;
        brand: string;
        commission: string;
    };
    content: string;
    clicks: number | string;
    orders: number | string;
    earned: string;
    affiliateLink: string;
}

interface PerformanceData {
    domain: string;
    rate: string;
    links: number;
    clicks: number;
    orders: string;
    volume: string;
    earned: string;
}

interface LinksTabsProps {
    initialLinks: LinkData[];
    initialPerformance: PerformanceData[];
}

export default function LinksTabs({ initialLinks, initialPerformance }: LinksTabsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('LINKS');
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredLinks = initialLinks.filter(link =>
        link.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header / Tabs */}
            <div style={{ marginBottom: 30 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
                    <button
                        onClick={() => setActiveTab('LINKS')}
                        style={{
                            padding: '10px 20px',
                            background: activeTab === 'LINKS' ? 'white' : 'transparent',
                            border: activeTab === 'LINKS' ? '1px solid #ddd' : '1px solid transparent',
                            borderRadius: 4,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: activeTab === 'LINKS' ? 'black' : '#666',
                            cursor: 'pointer',
                            letterSpacing: 1
                        }}
                    >
                        LİNKLERİM
                    </button>
                    <button
                        onClick={() => setActiveTab('PERFORMANCE')}
                        style={{
                            padding: '10px 20px',
                            background: activeTab === 'PERFORMANCE' ? 'white' : 'transparent',
                            border: activeTab === 'PERFORMANCE' ? '1px solid #ddd' : '1px solid transparent',
                            borderRadius: 4,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: activeTab === 'PERFORMANCE' ? 'black' : '#666',
                            cursor: 'pointer',
                            letterSpacing: 1
                        }}
                    >
                        SİTE BAZLI PERFORMANS
                    </button>
                    <button
                        onClick={() => setActiveTab('ORDERS')}
                        style={{
                            padding: '10px 20px',
                            background: activeTab === 'ORDERS' ? 'white' : 'transparent',
                            border: activeTab === 'ORDERS' ? '1px solid #ddd' : '1px solid transparent',
                            borderRadius: 4,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: activeTab === 'ORDERS' ? 'black' : '#666',
                            cursor: 'pointer',
                            letterSpacing: 1
                        }}
                    >
                        TÜM SİPARİŞLER
                    </button>
                </div>

                {/* Filters & Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 300, maxWidth: 400 }}>
                        <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            type="text"
                            placeholder="Linklerini ara"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                border: '1px solid #eaeaea',
                                borderRadius: 4,
                                fontSize: '0.95rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        {/* Date Picker Placeholder */}
                        <div style={{
                            background: 'white', border: '1px solid #eaeaea', borderRadius: 4, padding: '10px 15px',
                            fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center', gap: 10, minWidth: 200, justifyContent: 'space-between'
                        }}>
                            <span>Başlangıç</span>
                            <span style={{ color: '#ccc' }}>→</span>
                            <span>Bitiş</span>
                        </div>

                        <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 42, background: '#f5f5f5', border: 'none' }}>
                            <Download size={16} />
                            İNDİR
                        </Button>
                        <Button style={{ display: 'flex', alignItems: 'center', gap: 8, height: 42, background: '#1a1a1a' }}>
                            YENİ LİNK OLUŞTUR
                        </Button>
                    </div>
                </div>
            </div>

            {/* TAB CONTENT: MY LINKS */}
            {activeTab === 'LINKS' && (
                <div style={{ border: '1px solid #eaeaea', borderRadius: 8, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '50px 100px 3fr 2fr 80px 80px 80px 3fr', background: '#1a1a1a', color: 'white', padding: '15px 20px', fontSize: '0.8rem', fontWeight: 600 }}>
                        <div></div>{/* Checkbox */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Oluşturuldu <ArrowDown size={14} /></div>
                        <div>Ürün</div>
                        <div>İçerik</div>
                        <div>Tıklama</div>
                        <div>Sipariş</div>
                        <div>Kazanç</div>
                        <div>Affiliate Linki</div>
                    </div>

                    {/* Rows */}
                    {filteredLinks.length === 0 ? (
                        <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Link bulunamadı.</div>
                    ) : (
                        filteredLinks.map((link) => (
                            <div key={link.id} style={{
                                display: 'grid', gridTemplateColumns: '50px 100px 3fr 2fr 80px 80px 80px 3fr',
                                padding: '20px', borderBottom: '1px solid #f5f5f5', alignItems: 'center', background: 'white',
                                fontSize: '0.9rem'
                            }}>
                                <div>
                                    <input type="checkbox" style={{ width: 16, height: 16, cursor: 'pointer' }} />
                                </div>
                                <div style={{ color: '#666', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                                    {link.date}
                                </div>
                                <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                    <div style={{ width: 50, height: 60, background: '#f9f9f9', position: 'relative', overflow: 'hidden' }}>
                                        {link.product.image && (
                                            <Image src={link.product.image} alt={link.product.name} fill style={{ objectFit: 'contain' }} />
                                        )}
                                    </div>
                                    <div style={{ maxWidth: 200 }}>
                                        <div style={{ fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={link.product.name}>
                                            {link.product.name}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{link.product.brand}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 2 }}>{link.product.commission} komisyon ⓘ</div>
                                    </div>
                                </div>
                                <div>
                                    <a href="#" style={{ textDecoration: 'underline', color: '#333', fontWeight: 500 }}>{link.content}</a>
                                </div>
                                <div style={{ fontWeight: 600 }}>{link.clicks}</div>
                                <div>{link.orders}</div>
                                <div>{link.earned}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                                    <input
                                        readOnly
                                        value={link.affiliateLink}
                                        style={{
                                            width: '100%', padding: '8px 10px', fontSize: '0.8rem', border: '1px solid #ddd',
                                            borderRight: 'none', borderRadius: '4px 0 0 4px', background: '#fdfdfd', color: '#666'
                                        }}
                                    />
                                    <button
                                        onClick={() => handleCopy(link.affiliateLink, link.id)}
                                        style={{
                                            padding: '8px 12px', background: '#333', color: 'white', border: 'none',
                                            borderRadius: '0 4px 4px 0', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                                            minWidth: 80
                                        }}
                                    >
                                        {copiedId === link.id ? 'OK' : 'KOPYALA'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* TAB CONTENT: PERFORMANCE */}
            {activeTab === 'PERFORMANCE' && (
                <div style={{ border: '1px solid #eaeaea', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr 1fr 1fr', background: '#1a1a1a', color: 'white', padding: '15px 20px', fontSize: '0.8rem', fontWeight: 600 }}>
                        <div>Site/Domain ⓘ</div>
                        <div style={{ textAlign: 'center' }}>Mevcut Oran</div>
                        <div style={{ textAlign: 'center' }}>Linkler</div>
                        <div style={{ textAlign: 'center' }}>Tıklama</div>
                        <div style={{ textAlign: 'center' }}>Sipariş</div>
                        <div style={{ textAlign: 'center' }}>Hacim</div>
                        <div style={{ textAlign: 'center' }}>Kazanç</div>
                    </div>
                    {initialPerformance.map((item, idx) => (
                        <div key={idx} style={{
                            display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr 1fr 1fr',
                            padding: '20px', borderBottom: '1px solid #f5f5f5', alignItems: 'center', background: 'white',
                            fontSize: '0.9rem'
                        }}>
                            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                                {item.domain} <CheckCircle size={14} fill="#059669" color="white" />
                            </div>
                            <div style={{ textAlign: 'center', fontWeight: 600 }}>{item.rate}</div>
                            <div style={{ textAlign: 'center', fontWeight: 600 }}>{item.links}</div>
                            <div style={{ textAlign: 'center', fontWeight: 600 }}>{item.clicks}</div>
                            <div style={{ textAlign: 'center', color: '#999' }}>{item.orders}</div>
                            <div style={{ textAlign: 'center', color: '#999' }}>{item.volume}</div>
                            <div style={{ textAlign: 'center', color: '#999' }}>{item.earned}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB CONTENT: ALL ORDERS */}
            {activeTab === 'ORDERS' && (
                <div style={{ textAlign: 'center', padding: 80, color: '#666' }}>
                    <div style={{ marginBottom: 20 }}>
                        <span style={{ fontSize: '5rem', fontWeight: 200, opacity: 0.1, display: 'block' }}>S</span>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: 10, color: '#333' }}>Komisyonlu linkler oluştur ve paylaş</h2>
                    <p style={{ marginBottom: 30 }}>gelen siparişleri buradan takip et</p>
                    <Button variant="outline">YENİ LİNK OLUŞTUR</Button>
                </div>
            )}
        </div>
    );
}

// Icon helper
function CheckCircle({ size, fill, color }: { size: number, fill: string, color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" fill={fill} stroke="none" />
            <path d="M9 12l2 2 4-4" stroke={color} />
        </svg>
    )
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, ArrowUpDown, Paperclip, Send, MoreVertical, CheckCircle2 } from 'lucide-react';

// --- MOCK BRAND DATA ---

const BRANDS = [
    {
        id: '1',
        name: 'Beymen',
        logo: 'https://images.unsplash.com/photo-1541533848490-bc9c15ceaccb?auto=format&fit=crop&q=80&w=200', // Using generic luxury placeholder
        lastMessage: 'Merhaba Asena, Beymen ekibi burada! Yeni sezon Montcler koleksiyonunu hediye kartı etkinliğimize dahil ettiğimizi duyurmaktan heyecan duyuyoruz.',
        time: '2s',
        unread: 2,
        verified: true
    },
    {
        id: '2',
        name: 'Vakko',
        logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=200',
        lastMessage: 'https://static.shopmy.us/uploa...',
        time: '2h',
        unread: 0,
        verified: true
    },
    {
        id: '3',
        name: 'Mavi',
        logo: 'https://images.unsplash.com/photo-1576995853123-5a2946152c7c?auto=format&fit=crop&q=80&w=200',
        lastMessage: 'Denim koleksiyonumuzdan seçtiğin parçaları gönderdik.',
        time: '1g',
        unread: 0,
        verified: false
    },
    {
        id: '4',
        name: 'Network',
        logo: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200',
        lastMessage: 'Teşekkürler!',
        time: '3g',
        unread: 0,
        verified: true
    },
    {
        id: '5',
        name: 'LC Waikiki',
        logo: 'https://images.unsplash.com/photo-1550614000-4b9519e02a15?auto=format&fit=crop&q=80&w=200',
        lastMessage: 'İşbirliği teklifiniz değerlendiriliyor.',
        time: '1h',
        unread: 0,
        verified: true
    }
];

const MESSAGES = [
    {
        id: 1,
        sender: 'brand',
        text: 'Merhaba Asena.',
        time: '12 Şubat, Perşembe'
    },
    {
        id: 2,
        sender: 'brand',
        text: 'Beymen ekibi burada!',
        time: ''
    },
    {
        id: 3,
        sender: 'brand',
        text: 'Yeni sezon Montcler koleksiyonunu (normalde Hediye Kartı Etkinliklerine dahil edilmez) Hediye Kartı etkinliğimize dahil ettiğimizi, BUGÜN 13/2\'den 15/2\'ye kadar başladığını duyurmaktan heyecan duyuyoruz! Detaylar için sitemizi kontrol edebilirsiniz :)',
        time: ''
    },
    {
        id: 4,
        sender: 'brand',
        text: 'Montcler ürünleri burada: https://www.beymen.com/tr/kadin-giyim-dis-giyim-mont-c-10020',
        time: ''
    },
    {
        id: 5,
        sender: 'brand',
        text: 'Daha Fazla Harca, Daha Fazla Kazan! Alışverişinizle 50₺ - 500₺ Hediye Kartı kazanın. GCFEBSF kodunu kullanın. 12/2 - 15/2 arası geçerli. Alışverişe Başla!',
        time: ''
    },
    {
        id: 6,
        sender: 'brand',
        text: 'Sevgiler,\nBeymen <3',
        time: ''
    }

];

export default function ChatPage() {
    const [selectedBrandId, setSelectedBrandId] = useState('1');
    const [inputMessage, setInputMessage] = useState('');

    const activeBrand = BRANDS.find(b => b.id === selectedBrandId) || BRANDS[0];

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 100px)', background: 'white', border: '1px solid #eaeaea', borderRadius: 12, overflow: 'hidden' }}>

            {/* --- SIDEBAR: Brand List --- */}
            <div style={{ width: 350, borderRight: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>

                {/* Search & Filter Header */}
                <div style={{ padding: 20, borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>Tüm Mesajlar</h2>
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', marginBottom: 15 }}>
                        <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            type="text"
                            placeholder="Ara..."
                            style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: 8, border: '1px solid #eee', background: '#f9f9f9', fontSize: '0.9rem' }}
                        />
                    </div>

                    {/* Filters */}
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20,
                            border: '1px solid #eee', background: 'white', fontSize: '0.75rem', fontWeight: 600, color: '#333', cursor: 'pointer'
                        }}>
                            Filtrele
                        </button>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20,
                            border: '1px solid #eee', background: 'white', fontSize: '0.75rem', fontWeight: 600, color: '#333', cursor: 'pointer'
                        }}>
                            Okunmamış (2)
                        </button>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20,
                            border: '1px solid #eee', background: 'white', fontSize: '0.75rem', fontWeight: 600, color: '#333', cursor: 'pointer', marginLeft: 'auto'
                        }}>
                            En Yeni <ArrowUpDown size={12} />
                        </button>
                    </div>
                </div>

                {/* List */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {BRANDS.map(brand => (
                        <div
                            key={brand.id}
                            onClick={() => setSelectedBrandId(brand.id)}
                            style={{
                                padding: 20,
                                display: 'flex',
                                gap: 15,
                                cursor: 'pointer',
                                background: selectedBrandId === brand.id ? '#fdfbf7' : 'white', // Light warm bg for active
                                borderLeft: selectedBrandId === brand.id ? '3px solid black' : '3px solid transparent',
                                transition: 'all 0.2s ease',
                                borderBottom: '1px solid #fbfbfb'
                            }}
                        >
                            <div style={{ alignSelf: 'flex-start' }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', border: '1px solid #eee', position: 'relative' }}>
                                    <Image src={brand.logo} alt={brand.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        {brand.name}
                                        {brand.verified && <CheckCircle2 size={12} fill="black" color="white" />}
                                    </h3>
                                    <span style={{ fontSize: '0.75rem', color: '#999' }}>{brand.time}</span>
                                </div>
                                <p style={{
                                    fontSize: '0.85rem', color: brand.unread ? '#333' : '#666', margin: 0,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                    fontWeight: brand.unread ? 600 : 400
                                }}>
                                    {brand.lastMessage}
                                </p>
                            </div>
                            {brand.unread > 0 && (
                                <div style={{ alignSelf: 'center' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'black' }} />
                                </div>
                            )}
                        </div>
                    ))}

                    <div style={{ padding: 20, textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: '#999', letterSpacing: 1, marginBottom: 10 }}>POTANSİYEL PARTNERLER</div>
                        {/* Mock Potential Partners List */}
                        <div style={{ opacity: 0.6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eee' }} />
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Mondo Mondo</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eee' }} />
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>ARMANI</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* --- MAIN: Chat Window --- */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fafafa' }}>

                {/* Chat Header */}
                <div style={{
                    padding: '15px 25px', background: 'white', borderBottom: '1px solid #eaeaea',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '1px solid #eee', position: 'relative' }}>
                            <Image src={activeBrand.logo} alt={activeBrand.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, }}>{activeBrand.name}</h2>
                            <button style={{ color: '#666', fontSize: '0.8rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                Marka Profilini Görüntüle <ArrowUpDown size={12} style={{ transform: 'rotate(-90deg)' }} />
                            </button>
                        </div>
                    </div>
                    <button style={{ padding: 8, borderRadius: 8, border: '1px solid #eee', background: 'white', cursor: 'pointer' }}>
                        <MoreVertical size={18} color="#666" />
                    </button>
                </div>

                {/* Messages Area */}
                <div style={{ flex: 1, padding: 30, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <span style={{ fontSize: '0.75rem', color: '#999', background: '#eee', padding: '4px 10px', borderRadius: 12 }}>12 Şubat, Perşembe</span>
                    </div>

                    {MESSAGES.map((msg) => (
                        <div key={msg.id} style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
                            <div style={{ background: 'white', padding: 15, borderRadius: '0 12px 12px 12px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', border: '1px solid #eee', fontSize: '0.95rem', lineHeight: 1.5, color: '#333', whiteSpace: 'pre-line' }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div style={{ padding: 20, background: 'white', borderTop: '1px solid #eaeaea' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        background: '#f9f9f9', padding: '10px 15px', borderRadius: 24, border: '1px solid #eee'
                    }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 5 }}>
                            <Paperclip size={20} color="#999" />
                        </button>
                        <input
                            type="text"
                            placeholder={`${activeBrand.name} markasına mesaj yaz...`}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '0.95rem', padding: '5px 0', outline: 'none' }}
                            onKeyDown={(e) => e.key === 'Enter' && setInputMessage('')}
                        />
                        <button style={{ background: 'black', border: 'none', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Send size={16} color="white" style={{ marginLeft: 2 }} />
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}

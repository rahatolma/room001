'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import {
    Layout,
    Palette,
    Type,
    Image as ImageIcon, // Renamed to avoid alias conflict
    Move,
    Plus,
    Trash2,
    GripVertical,
    ExternalLink
} from 'lucide-react';
import Image from 'next/image';

// --- MOCK COLLECTIONS ---
const INITIAL_COLLECTIONS = [
    { id: '1', title: 'Favori Çantalarım', count: 12, hidden: false },
    { id: '2', title: 'Yaz Tatili', count: 8, hidden: false },
    { id: '3', title: 'Cilt Bakım Rutinim', count: 5, hidden: true },
    { id: '4', title: 'Spor Giyim', count: 20, hidden: false },
];

export default function MyShopPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'CONTENT' | 'DESIGN'>('CONTENT');
    const [collections, setCollections] = useState(INITIAL_COLLECTIONS);

    // Toggle hidden status
    const toggleHidden = (id: string) => {
        setCollections(collections.map(c => c.id === id ? { ...c, hidden: !c.hidden } : c));
    };

    return (
        <div style={{ maxWidth: 800, paddingBottom: 100, fontFamily: 'sans-serif' }}>
            <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-dm-sans), sans-serif', fontWeight: 700, margin: 0 }}>Mağazam</h1>
                <a href={`/${user?.username}`} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: '#666', borderBottom: '1px solid #ddd' }}>
                    Mağazayı Görüntüle <ExternalLink size={14} />
                </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

                {/* Profile Section */}
                <div style={{ padding: 25, border: '1px solid #eee', borderRadius: 12, background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <ImageIcon size={20} /> Profil Bilgileri
                        </h3>
                        <Button variant="outline" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>DÜZENLE</Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', background: '#f5f5f5', position: 'relative' }}>
                            {user?.avatarUrl ? (
                                <Image src={user.avatarUrl} alt="Profile" fill style={{ objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, color: '#999' }}>
                                    {user?.avatarInitials}
                                </div>
                            )}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{user?.fullName}</div>
                            <div style={{ color: '#666', marginTop: 4, fontSize: '0.9rem' }}>@{user?.username}</div>
                            <div style={{ color: '#999', marginTop: 8, fontSize: '0.85rem', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {user?.bio || 'Minimalist yaşam ve stil önerileri...'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collections (Sortable) */}
                <div style={{ padding: 25, border: '1px solid #eee', borderRadius: 12, background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Layout size={20} /> Koleksiyonlar
                        </h3>
                        <Button style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'black', color: 'white' }}>
                            <Plus size={16} style={{ marginRight: 6 }} /> YENİ EKLE
                        </Button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {collections.map((col, idx) => (
                            <div key={col.id} style={{
                                display: 'flex', alignItems: 'center', gap: 15, padding: 15, borderRadius: 8,
                                background: '#fff', border: '1px solid #eee', cursor: 'grab',
                                opacity: col.hidden ? 0.6 : 1
                            }}>
                                <div style={{ color: '#ccc' }}><GripVertical size={20} /></div>
                                <div style={{ width: 40, height: 40, background: '#f9f9f9', borderRadius: 4 }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{col.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#999' }}>{col.count} Ürün</div>
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button
                                        onClick={() => toggleHidden(col.id)}
                                        style={{ background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', color: col.hidden ? '#666' : '#059669' }}
                                    >
                                        {col.hidden ? 'GİZLİ' : 'GÖRÜNÜR'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: 15, textAlign: 'center', fontSize: '0.85rem', color: '#999', background: '#fafafa', borderRadius: 8, marginTop: 15, border: '1px dashed #ddd' }}>
                        Koleksiyonların sırasını değiştirmek için sürükleyip bırakın.
                    </div>
                </div>

            </div>
        </div>
    );
}

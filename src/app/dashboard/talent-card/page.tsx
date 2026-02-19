'use client';

import React from 'react';
import { UserCheck, Plus, X, Instagram, Youtube, Twitter } from 'lucide-react';
import Button from '@/components/Button';

// Temporary Mock Data
const SOCIALS = [
    { name: 'Instagram', connected: true, username: '@selinyilmaz', icon: <Instagram size={18} /> },
    { name: 'TikTok', connected: false, username: '', icon: <span style={{ fontSize: 14, fontWeight: 'bold' }}>TikTok</span> },
    { name: 'YouTube', connected: true, username: 'Selin Yılmaz Vlogs', icon: <Youtube size={18} /> }
];

const PREFERENCES = ['Moda', 'Güzellik', 'Ev & Yaşam', 'Fitness', 'Teknoloji'];

export default function TalentCardPage() {
    return (
        <div style={{ maxWidth: 1200, paddingBottom: 60 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 30 }}>
                <div style={{ width: 50, height: 50, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={24} color="#333" />
                </div>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>Insider Kartı</h1>
                    <p style={{ color: '#666', marginTop: 5 }}>Markaların sizi keşfetmesi için Insider profilinizi detaylandırın.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
                {/* LEFT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

                    {/* Basic Info */}
                    <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eaeaea' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 20 }}>Temel Bilgiler</h2>

                        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                            <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#eee', overflow: 'hidden', position: 'relative' }}>
                                {/* Profile Photo Placeholder */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#999', fontSize: '0.8rem' }}>
                                    FOTOĞRAF
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ marginBottom: 15 }}>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: 8 }}>Görünen Ad</label>
                                    <input type="text" defaultValue="Selin Yılmaz" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.95rem' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: 8 }}>Biyografi</label>
                                    <textarea rows={3} placeholder="Kendinizden kısaca bahsedin..." style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.95rem', resize: 'vertical' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Connections */}
                    <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eaeaea' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 20 }}>Sosyal Medya Bağlantıları</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                            {SOCIALS.map((social, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid #eee', borderRadius: 8 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 36, height: 36, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {social.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{social.name}</div>
                                            {social.connected && <div style={{ fontSize: '0.8rem', color: '#666' }}>{social.username}</div>}
                                        </div>
                                    </div>
                                    <Button variant={social.connected ? "secondary" : "primary"} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                                        {social.connected ? 'Yönet' : 'Bağla'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

                    {/* Demographics */}
                    <div style={{ background: 'white', padding: 25, borderRadius: 12, border: '1px solid #eaeaea' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 15 }}>Demografik Bilgiler</h2>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 20 }}>Markaların doğru hedef kitleye ulaşmasına yardımcı olur.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Cinsiyet</label>
                                <select style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #eee' }}>
                                    <option>Kadın</option>
                                    <option>Erkek</option>
                                    <option>Belirtmek İstemiyorum</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Doğum Tarihi</label>
                                <input type="date" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #eee' }} />
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div style={{ background: 'white', padding: 25, borderRadius: 12, border: '1px solid #eaeaea' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 15 }}>Tercihler</h2>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 20 }}>İlgi alanlarınızı seçin.</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {PREFERENCES.map(pref => (
                                <div key={pref} style={{
                                    padding: '6px 12px', background: '#f5f5f5', borderRadius: 20, fontSize: '0.85rem', color: '#333', cursor: 'pointer', border: '1px solid transparent'
                                }}>
                                    {pref}
                                </div>
                            ))}
                            <div style={{ padding: '6px 12px', border: '1px dashed #ccc', borderRadius: 20, fontSize: '0.85rem', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Plus size={14} /> Ekle
                            </div>
                        </div>
                    </div>

                    <Button style={{ width: '100%', marginTop: 20 }}>Değişiklikleri Kaydet</Button>

                </div>
            </div>
        </div>
    );
}

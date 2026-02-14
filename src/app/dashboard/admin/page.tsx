"use client";

import React, { useState } from 'react';
import Button from '@/components/Button';
import { Check, X, Search, Filter } from 'lucide-react';

interface Applicant {
    id: string;
    name: string;
    email: string;
    platform: 'Instagram' | 'TikTok' | 'YouTube';
    handle: string;
    followers: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: string;
}

const INITIAL_APPLICANTS: Applicant[] = [
    { id: '1', name: 'Ayşe Yılmaz', email: 'ayse@example.com', platform: 'Instagram', handle: '@aysemode', followers: '12.5K', status: 'Pending', date: '14.02.2024' },
    { id: '2', name: 'Burak Demir', email: 'burak@example.com', platform: 'TikTok', handle: '@buraktech', followers: '45.2K', status: 'Pending', date: '13.02.2024' },
    { id: '3', name: 'Selin Kaya', email: 'selin@example.com', platform: 'Instagram', handle: '@selinbeauty', followers: '8.4K', status: 'Pending', date: '12.02.2024' },
    { id: '4', name: 'Mert Çelik', email: 'mert@example.com', platform: 'YouTube', handle: 'MertVlogs', followers: '150K', status: 'Approved', date: '10.02.2024' },
];

export default function CreatorAdminPage() {
    const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
    const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('Pending');

    const handleApprove = (id: string) => {
        setApplicants(applicants.map(app => app.id === id ? { ...app, status: 'Approved' } : app));
        alert('Kullanıcı onaylandı ve sisteme kabul edildi.');
    };

    const handleReject = (id: string) => {
        setApplicants(applicants.map(app => app.id === id ? { ...app, status: 'Rejected' } : app));
        alert('Kullanıcı başvurusu reddedildi.');
    };

    const filteredApplicants = filter === 'All'
        ? applicants
        : applicants.filter(app => app.status === filter);

    return (
        <div style={{ maxWidth: 1200 }}>
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '2rem', marginBottom: 10, fontFamily: 'Playfair Display, serif' }}>Yönetici Paneli</h1>
                <p style={{ color: '#666' }}>İçerik üretici başvurularını buradan yönetebilirsiniz.</p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 20,
                            border: '1px solid #ddd',
                            background: filter === f ? '#000' : 'white',
                            color: filter === f ? 'white' : '#666',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                    >
                        {f === 'All' ? 'Tümü' : f === 'Pending' ? 'Bekleyenler' : f === 'Approved' ? 'Onaylananlar' : 'Reddedilenler'}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                            <th style={{ padding: '15px 20px', fontWeight: 600, color: '#444' }}>İsim</th>
                            <th style={{ padding: '15px 20px', fontWeight: 600, color: '#444' }}>Platform / Handle</th>
                            <th style={{ padding: '15px 20px', fontWeight: 600, color: '#444' }}>Takipçi</th>
                            <th style={{ padding: '15px 20px', fontWeight: 600, color: '#444' }}>Tarih</th>
                            <th style={{ padding: '15px 20px', fontWeight: 600, color: '#444' }}>Durum</th>
                            <th style={{ padding: '15px 20px', fontWeight: 600, color: '#444', textAlign: 'right' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplicants.map((app) => (
                            <tr key={app.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{ fontWeight: 500 }}>{app.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{app.email}</div>
                                </td>
                                <td style={{ padding: '15px 20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {app.platform === 'Instagram' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E1306C' }}></span>}
                                        {app.platform === 'TikTok' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#000' }}></span>}
                                        {app.platform === 'YouTube' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF0000' }}></span>}
                                        {app.platform}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: 2 }}>{app.handle}</div>
                                </td>
                                <td style={{ padding: '15px 20px', fontWeight: 600 }}>{app.followers}</td>
                                <td style={{ padding: '15px 20px', color: '#666' }}>{app.date}</td>
                                <td style={{ padding: '15px 20px' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500,
                                        background: app.status === 'Approved' ? '#e6f4ea' : app.status === 'Rejected' ? '#fce8e6' : '#fff3e0',
                                        color: app.status === 'Approved' ? '#1e8e3e' : app.status === 'Rejected' ? '#d93025' : '#e65100'
                                    }}>
                                        {app.status === 'Pending' ? 'Bekliyor' : app.status === 'Approved' ? 'Onaylandı' : 'Reddedildi'}
                                    </span>
                                </td>
                                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                    {app.status === 'Pending' && (
                                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => handleApprove(app.id)}
                                                style={{ border: '1px solid #ddd', background: 'white', padding: 8, borderRadius: 6, cursor: 'pointer', color: '#1e8e3e' }}
                                                title="Onayla"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleReject(app.id)}
                                                style={{ border: '1px solid #ddd', background: 'white', padding: 8, borderRadius: 6, cursor: 'pointer', color: '#d93025' }}
                                                title="Reddet"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, MoreHorizontal, CheckCircle2, ShieldAlert } from 'lucide-react';
import Button from '@/components/Button';
import { getAllUsers } from '@/actions/admin';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data || []);
        setLoading(false);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
    };

    const getRoleName = (role: string) => {
        if (role === 'admin') return 'Admin';
        if (role === 'creator') return 'Insider (Creator)';
        if (role === 'brand') return 'Marka';
        if (role === 'shopper') return 'Tüketici';
        return role;
    };

    return (
        <div style={{ paddingBottom: 60, maxWidth: 1200 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1 }}>Kullanıcı Yönetimi</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', margin: 0 }}>Sistemdeki tüm kayıtlı kullanıcıları, rollerini ve durumlarını yönetin.</p>
                </div>
                <Button style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Users size={16} /> Yeni Kullanıcı Ekle</Button>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 15, marginBottom: 30, background: 'white', padding: 20, borderRadius: 12, border: '1px solid #eaeaea' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input type="text" placeholder="İsim veya E-posta ara..." style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.95rem' }} />
                </div>
                <select style={{ padding: '0 20px', borderRadius: 8, border: '1px solid #ddd', background: '#f9f9f9', outline: 'none', cursor: 'pointer' }}>
                    <option value="">Tüm Roller</option>
                    <option value="creator">Insider (Creator)</option>
                    <option value="brand">Marka</option>
                    <option value="shopper">Tüketici</option>
                </select>
                <select style={{ padding: '0 20px', borderRadius: 8, border: '1px solid #ddd', background: '#f9f9f9', outline: 'none', cursor: 'pointer' }}>
                    <option value="">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="pending">Onay Bekliyor</option>
                    <option value="inactive">Pasif</option>
                </select>
            </div>

            {/* Users Table */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eaeaea', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #eaeaea' }}>
                            <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>KULLANICI</th>
                            <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>ROL</th>
                            <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>DURUM</th>
                            <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>KAYIT TARİHİ</th>
                            <th style={{ padding: '15px 20px', fontSize: '0.85rem', color: '#666', fontWeight: 600, textAlign: 'right' }}>İŞLEM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Yükleniyor...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Kullanıcı bulunamadı.</td>
                            </tr>
                        ) : (
                            users.map((user, i) => (
                                <tr key={user.id || i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '15px 20px' }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111' }}>{user.fullName || user.username || 'İsimsiz Kullanıcı'}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{user.email || user.phoneNumber}</div>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{ padding: '4px 10px', background: user.role === 'creator' ? '#eef2ff' : user.role === 'brand' ? '#fdf4ff' : '#f8fafc', color: user.role === 'creator' ? '#4f46e5' : user.role === 'brand' ? '#c026d3' : '#64748b', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>
                                            {getRoleName(user.role)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.85rem', fontWeight: 500, color: user.applicationStatus === 'approved' ? '#16a34a' : user.applicationStatus === 'pending' ? '#ca8a04' : '#dc2626' }}>
                                            {user.applicationStatus === 'approved' ? <CheckCircle2 size={14} /> : user.applicationStatus === 'pending' ? <ShieldAlert size={14} /> : null}
                                            {user.applicationStatus === 'approved' ? 'Aktif' : user.applicationStatus === 'pending' ? 'İnceleniyor' : 'Pasif/Red'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px 20px', fontSize: '0.9rem', color: '#555' }}>
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}><MoreHorizontal size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

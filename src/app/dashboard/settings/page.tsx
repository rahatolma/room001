'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import Image from 'next/image';

export default function SettingsPage() {
    const { user } = useAuth();

    // States
    const [email, setEmail] = useState('asena@asenasaribatur.com');
    const [username, setUsername] = useState('asenasaribatur');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [amazonCode, setAmazonCode] = useState('');

    return (
        <div style={{ paddingBottom: 100 }}>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: 50 }}>Hesap Ayarları</h1>

            {/* Profile Photo Change Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 50 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', background: '#eee', position: 'relative' }}>
                    {user?.avatarUrl && <Image src={user.avatarUrl} alt="Profile" fill style={{ objectFit: 'cover' }} />}
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{user?.fullName}</div>
                    <button style={{ fontSize: '0.85rem', color: '#666', background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>
                        Profil Fotoğrafını Değiştir
                    </button>
                </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, maxWidth: 600 }}>

                {/* Email */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Birincil E-posta</label>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: 8 }}>Giriş yapmak ve bildirim almak için kullanılan e-posta.</div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '12px 15px', borderRadius: 8, border: '1px solid #ccc', background: 'white', fontSize: '0.95rem' }}
                    />
                </div>

                {/* Username */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Kullanıcı Adı</label>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: 8 }}>Genel mağaza URL'nizi tanımlamak için kullanılacak kullanıcı adı.</div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '12px 15px', borderRadius: 8, border: '1px solid #ccc', background: 'white', fontSize: '0.95rem' }}
                    />
                </div>

                {/* Password */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Şifre</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input
                            type="password"
                            value="dummy-password"
                            readOnly
                            style={{ flex: 1, padding: '12px 15px', borderRadius: 8, border: '1px solid #eee', background: '#f5f5f5', color: '#999' }}
                        />
                        <Button variant="outline" style={{ background: 'white', color: 'black', border: '1px solid #ddd' }}>DÜZENLE</Button>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Hediye Gönderim Adresi</label>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: 8 }}>Markalarla hediye kabul ettiğinizde paylaşılacak adres.</div>
                    <textarea
                        rows={3}
                        placeholder="Hediye Adresi"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ width: '100%', padding: '12px 15px', borderRadius: 8, border: '1px solid #ccc', background: 'white', fontSize: '0.95rem', }}
                    />
                </div>

                {/* Phone */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Telefon Numarası</label>
                    <div style={{ display: 'flex', borderRadius: 8, border: '1px solid #ccc', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 15px', background: '#f5f5f5', borderRight: '1px solid #ccc', fontSize: '1.2rem' }}>🇹🇷</div>
                        <input
                            type="tel"
                            placeholder="Telefon Numarası"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ flex: 1, padding: '12px 15px', border: 'none', outline: 'none', fontSize: '0.95rem' }}
                        />
                    </div>
                </div>

                {/* Amazon Affiliate */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Amazon Affiliate Kodu</label>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: 8 }}>
                        Kendi Amazon affiliate kodunuzu kullanmak isterseniz aşağıya girin. Uygulama içi linkleri otomatik olarak dönüştüreceğiz.
                    </div>
                    <input
                        type="text"
                        placeholder="Örnek: my-code-20"
                        value={amazonCode}
                        onChange={(e) => setAmazonCode(e.target.value)}
                        style={{ width: '100%', padding: '12px 15px', borderRadius: 8, border: '1px solid #ccc', background: 'white', fontSize: '0.95rem' }}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <Button style={{ width: '100%', padding: '15px 0', fontSize: '1rem', fontWeight: 600, background: 'black', color: 'white' }}>DEĞİŞİKLİKLERİ KAYDET</Button>
                </div>

            </div>
        </div>
    );
}

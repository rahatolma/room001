"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';

export default function SettingsPage() {
    const { user, updateProfile } = useAuth();
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [email, setEmail] = useState(user?.email || '');
    // Password usually managed safely, simplfied here
    const [password, setPassword] = useState('');
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    // Photo upload reference
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Mock upload - in real app, upload to storage and get URL
            // const mockUrl = URL.createObjectURL(file);
            await updateProfile({ avatarInitials: 'IMG' }); // Just updating visuals for now
            alert("Profil fotoğrafı güncellendi! (Simülasyon)");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const updates: any = { fullName, email };
        let message = 'Profil bilgileri güncellendi!';

        if (isEditingPassword && password) {
            updates.password = password;
            message = 'Profil ve şifre başarıyla güncellendi!';
        }

        await updateProfile(updates);
        setIsEditingPassword(false);
        setPassword('');
        alert(message);
    };

    return (
        <div style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: '2rem', marginBottom: 10, fontFamily: 'Playfair Display, serif' }}>Hesap Ayarları</h1>
            <p style={{ color: '#666', marginBottom: 40 }}>Profil bilgilerinizi ve hesap tercihlerinizi yönetin.</p>

            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', padding: 30 }}>
                {/* Profile Header */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                    <div style={{
                        width: 80, height: 80, borderRadius: '50%', background: '#999',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', color: 'white', marginRight: 20
                    }}>
                        {user?.avatarInitials || 'SR'}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 5 }}>{user?.fullName}</h2>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handlePhotoChange}
                            accept="image/*"
                        />
                        <button
                            type="button"
                            onClick={handlePhotoClick}
                            style={{ color: '#666', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Profil Fotoğrafını Değiştir
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9rem' }}>Ad Soyad</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9rem' }}>Email Adresi</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
                        />
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: 5 }}>Bu email adresi giriş yapmak ve bildirim almak için kullanılır.</p>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9rem' }}>Şifre</label>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <input
                                type="password"
                                value={isEditingPassword ? password : ""}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={!isEditingPassword}
                                placeholder={isEditingPassword ? "Yeni şifre giriniz" : "•••••••••••••"}
                                style={{ flex: 1, padding: '12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', background: isEditingPassword ? 'white' : '#f9f9f9', cursor: isEditingPassword ? 'text' : 'not-allowed' }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (isEditingPassword) {
                                        setIsEditingPassword(false);
                                        setPassword('');
                                    } else {
                                        setIsEditingPassword(true);
                                    }
                                }}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: 8,
                                    border: '1px solid #ddd',
                                    background: isEditingPassword ? '#fff' : '#f9f9f9',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}
                            >
                                {isEditingPassword ? 'İptal' : 'Değiştir'}
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit">Değişiklikleri Kaydet</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

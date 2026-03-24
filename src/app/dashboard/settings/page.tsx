'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import Image from 'next/image';
import { toast } from 'sonner';
import { updateProfileAction } from '@/actions/auth';

export default function SettingsPage() {
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);

    // States
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [amazonCode, setAmazonCode] = useState('');

    // Password state
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if (user) {
            setEmail(user.email || '');
            setUsername(user.username || '');
            setAddress((user as any).location || ''); // Using location as address for now

            // Format existing phone
            let val = (user.phoneNumber || '').replace(/\D/g, '');
            if (val.startsWith('0')) val = val.substring(1);
            let formatted = '';
            if (val.length > 0) formatted += val.substring(0, 3);
            if (val.length > 3) formatted += ' ' + val.substring(3, 6);
            if (val.length > 6) formatted += ' ' + val.substring(6, 8);
            if (val.length > 8) formatted += ' ' + val.substring(8, 10);
            setPhone(formatted);
        }
    }, [user]);

    const handleSave = async () => {
        if (!email.includes('@') || !email.includes('.')) {
            toast.error('Lütfen geçerli bir e-posta adresi giriniz.');
            return;
        }

        setLoading(true);
        const updates: any = {
            email,
            username,
            location: address,
        };

        if (isEditingPassword && newPassword.trim().length > 0) {
            if (newPassword.trim().length < 6) {
                toast.error('Şifre en az 6 karakter olmalıdır.');
                setLoading(false);
                return;
            }
            updates.password = newPassword.trim();
        }

        // Update phone if valid and different from initial empty state
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (cleanPhone && cleanPhone.length >= 10) {
            updates.phoneNumber = cleanPhone;
        } else if (cleanPhone.length > 0 && cleanPhone.length < 10) {
            toast.error('Lütfen geçerli bir telefon numarası giriniz.');
            setLoading(false);
            return;
        }

        try {
            const res = await updateProfileAction(updates);

            if (res.success) {
                toast.success('Değişiklikler kaydedildi.');

                // Reset password editing state on success
                if (isEditingPassword) {
                    setIsEditingPassword(false);
                    setNewPassword('');
                }

                await refreshUser(); // Refresh user context
            } else {
                toast.error(res.error || 'Kaydedilemedi.');
            }
        } catch (error) {
            console.error("Save error:", error);
            toast.error('Giriş bilgileri kaydedilirken beklenmeyen bir hata oluştu. Çakışan bir bilgi girmediğinizden emin olun.');
        } finally {
            setLoading(false);
        }
    };

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
                    <button
                        onClick={() => toast.info('Profil fotoğrafı yükleme özelliği yakında eklenecek.')}
                        style={{ fontSize: '0.85rem', color: '#666', background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer' }}
                    >
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

                {/* Username - Hidden for Shoppers by default unless they have one, but basically creators need it */}
                {user?.role !== 'shopper' && (
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
                )}

                {/* Password */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Şifre</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input
                            type={isEditingPassword ? "text" : "password"}
                            value={isEditingPassword ? newPassword : "dummy-password"}
                            onChange={(e) => isEditingPassword && setNewPassword(e.target.value)}
                            readOnly={!isEditingPassword}
                            placeholder={isEditingPassword ? "Yeni şifrenizi girin..." : "***************"}
                            style={{ flex: 1, padding: '12px 15px', borderRadius: 8, border: '1px solid #eee', background: isEditingPassword ? 'white' : '#f5f5f5', color: isEditingPassword ? 'black' : '#999' }}
                        />
                        <Button
                            variant="outline"
                            onClick={() => setIsEditingPassword(!isEditingPassword)}
                            style={{ background: 'white', color: 'black', border: '1px solid #ddd' }}
                        >
                            {isEditingPassword ? 'İPTAL' : 'DÜZENLE'}
                        </Button>
                    </div>
                </div>

                {/* Address - Only for Creators */}
                {user?.role !== 'shopper' && (
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
                )}

                {/* Phone */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Telefon Numarası</label>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: 8 }}>Giriş yaparken SMS doğrulama kodu bu numaraya gönderilecektir. (Örn: 5551234567)</div>
                    <div style={{ display: 'flex', borderRadius: 8, border: '1px solid #ccc', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 15px', background: '#f5f5f5', borderRight: '1px solid #ccc', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>🇹🇷 +90</div>
                        <input
                            type="tel"
                            placeholder="555..."
                            maxLength={14}
                            value={phone}
                            onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, '');
                                if (val.startsWith('0')) val = val.substring(1);
                                let formatted = '';
                                if (val.length > 0) formatted += val.substring(0, 3);
                                if (val.length > 3) formatted += ' ' + val.substring(3, 6);
                                if (val.length > 6) formatted += ' ' + val.substring(6, 8);
                                if (val.length > 8) formatted += ' ' + val.substring(8, 10);
                                setPhone(formatted);
                            }}
                            style={{ flex: 1, padding: '12px 15px', border: 'none', outline: 'none', fontSize: '0.95rem' }}
                        />
                    </div>
                </div>

                {/* Amazon Affiliate - Hidden for Shoppers */}
                {user?.role !== 'shopper' && (
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
                )}

                <div style={{ marginTop: 20 }}>
                    <Button onClick={handleSave} disabled={loading} style={{ width: '100%', padding: '15px 0', fontSize: '1rem', fontWeight: 600, background: 'black', color: 'white' }}>
                        {loading ? 'KAYDEDİLİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
                    </Button>
                </div>

            </div>
        </div>
    );
}

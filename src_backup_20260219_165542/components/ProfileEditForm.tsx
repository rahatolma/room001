'use client';

import React, { useState } from 'react';
import { updateUserProfile } from '@/actions/user';
import { useRouter } from 'next/navigation';
import styles from './ProfileEditForm.module.css';

interface ProfileEditFormProps {
    user: any; // User type is messy with Prisma here, using any for now or I can define a partial type
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await updateUserProfile(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profiliniz başarıyla güncellendi.' });
            router.refresh();
        } else {
            setMessage({ type: 'error', text: result.error || 'Bir hata oluştu.' });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            {message && (
                <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}

            <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Temel Bilgiler</h2>

            <div style={{ display: 'flex', gap: 20 }}>
                {/* Avatar Preview (Mock) */}
                <div style={{ width: 100, flexShrink: 0 }}>
                    <div style={{
                        width: 80, height: 80, borderRadius: '50%', background: '#eee',
                        overflow: 'hidden', marginBottom: 10,
                        backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#999', fontSize: '2rem'
                    }}>
                        {!user.avatarUrl && (user.fullName?.charAt(0) || 'U')}
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="avatarUrl">Profil Fotoğrafı URL (Geçici)</label>
                        <input
                            type="text"
                            id="avatarUrl"
                            name="avatarUrl"
                            defaultValue={user.avatarUrl || ''}
                            placeholder="https://example.com/photo.jpg"
                            className={styles.input}
                        />
                        <small style={{ color: '#666', fontSize: '0.8rem' }}>Şimdilik sadece resim linki yapıştırabilirsiniz.</small>
                    </div>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="fullName">Ad Soyad</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    defaultValue={user.fullName || ''}
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="username">Kullanıcı Adı (Slug)</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ padding: '12px', background: '#f5f5f5', border: '1px solid #ddd', borderRight: 'none', borderRadius: '8px 0 0 8px', color: '#666' }}>
                        room001.com/
                    </span>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={user.username || ''}
                        className={styles.input}
                        style={{ borderRadius: '0 8px 8px 0' }}
                        required
                    />
                </div>
                <small style={{ color: '#666', fontSize: '0.8rem' }}>Profil linkiniz bu olacaktır.</small>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="bio">Biyografi</label>
                <textarea
                    id="bio"
                    name="bio"
                    defaultValue={user.bio || ''}
                    className={styles.textarea}
                    placeholder="Kendinizden ve seçkilerinizden bahsedin..."
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="location">Konum</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    defaultValue={user.location || ''}
                    placeholder="İstanbul, TR"
                    className={styles.input}
                />
            </div>

            <h2 className={styles.sectionTitle}>Sosyal Medya & Bağlantılar</h2>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="instagramUrl">Instagram URL</label>
                <input
                    type="text"
                    id="instagramUrl"
                    name="instagramUrl"
                    defaultValue={user.instagramUrl || ''}
                    placeholder="https://instagram.com/kullaniciadi"
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="tiktokUrl">TikTok URL</label>
                <input
                    type="text"
                    id="tiktokUrl"
                    name="tiktokUrl"
                    defaultValue={user.tiktokUrl || ''}
                    placeholder="https://tiktok.com/@kullaniciadi"
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="youtubeUrl">YouTube URL</label>
                <input
                    type="text"
                    id="youtubeUrl"
                    name="youtubeUrl"
                    defaultValue={user.youtubeUrl || ''}
                    placeholder="https://youtube.com/@channel"
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="websiteUrl">Web Sitesi / Blog</label>
                <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    defaultValue={user.websiteUrl || ''}
                    placeholder="https://mysite.com"
                    className={styles.input}
                />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
        </form>
    );
};

export default ProfileEditForm;

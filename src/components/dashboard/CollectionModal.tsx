'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        id?: string;
        title: string;
        visibility: 'public' | 'private';
    } | null;
    onSave: (data: { title: string; visibility: 'public' | 'private' }) => Promise<void>;
}

export default function CollectionModal({ isOpen, onClose, initialData, onSave }: CollectionModalProps) {
    const [title, setTitle] = useState('');
    const [visibility, setVisibility] = useState<'public' | 'private'>('public');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && initialData) {
            setTitle(initialData.title);
            setVisibility(initialData.visibility);
        } else {
            setTitle('');
            setVisibility('public');
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave({ title, visibility });
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{ background: 'white', borderRadius: 12, width: '100%', maxWidth: 500, padding: 30, position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', right: 20, top: 20, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <X size={24} color="#666" />
                </button>

                <h2 style={{ fontSize: '1.5rem', marginBottom: 20, fontWeight: 600 }}>
                    {initialData ? 'Bölümü Düzenle' : 'Yeni Bölüm Ekle'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: 8 }}>Bölüm Başlığı</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Örn: Çantalarım, Favori Kombinler..."
                            style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: 8 }}>Görünürlük</label>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="visibility"
                                    checked={visibility === 'public'}
                                    onChange={() => setVisibility('public')}
                                />
                                Herkese Açık
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="visibility"
                                    checked={visibility === 'private'}
                                    onChange={() => setVisibility('private')}
                                />
                                Gizli
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: 600 }}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !title.trim()}
                            style={{
                                padding: '12px 24px', borderRadius: 8, border: 'none', background: 'black', color: 'white',
                                cursor: 'pointer', fontWeight: 600, opacity: (loading || !title.trim()) ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { X, LayoutGrid, LayoutList, Grid3X3, Smartphone, Monitor, CheckCircle2 } from 'lucide-react';

interface ShopSectionEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    section?: any; // If editing existing
    onSave: (data: any) => void;
}

const LAYOUT_OPTIONS = [
    { id: 'shelves', label: 'Raflar', desc: 'Güzellik, cilt bakımı veya farklı yükseklikteki diğer ürünler için mükemmeldir.', icon: LayoutGrid },
    { id: 'editorial', label: 'Editoryal', desc: 'Hediye rehberleri gibi daha uzun açıklamalar içeren içerikler için kullanılır.', icon: LayoutList },
    { id: 'square', label: 'Kare Gönderiler', desc: 'Standart bir Instagram sayfasını andırır.', icon: Grid3X3 },
    { id: 'vertical', label: 'Dikey Gönderiler', desc: 'TikTok veya Instagram Reels gibi video içerikleri için kullanılır.', icon: Smartphone },
    { id: 'horizontal', label: 'Yatay Gönderiler', desc: 'YouTube ve Substack için biçimlendirmeyi andırır.', icon: Monitor },
];

const SUGGESTED_SECTIONS = [
    'Hediye Rehberleri', 'Moda', 'Ev & Yaşam', 'Instagram Akışı', 'TikTok Akışı', 'Ürün Listesi'
];

export default function ShopSectionEditorModal({ isOpen, onClose, section, onSave }: ShopSectionEditorModalProps) {
    const [title, setTitle] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [selectedLayout, setSelectedLayout] = useState('shelves');
    const [socialSource, setSocialSource] = useState<string[]>([]);

    // Reset or Load state when modal opens
    useEffect(() => {
        if (isOpen) {
            if (section) {
                setTitle(section.title);
                setIsVisible(section.isVisible ?? true);
                setSelectedLayout(section.layoutType || 'shelves');
                // setSocialSource if we had it
            } else {
                setTitle('');
                setIsVisible(true);
                setSelectedLayout('shelves');
            }
        }
    }, [isOpen, section]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            id: section?.id, // include ID if editing
            title,
            isVisible,
            layoutType: selectedLayout,
            socialSources: socialSource
        });
        // onClose is called by parent after success, or here?
        // Let's call it here for optimisitc UI, parent handles async
    };

    const toggleSocialSource = (source: string) => {
        if (socialSource.includes(source)) {
            setSocialSource(prev => prev.filter(s => s !== source));
        } else {
            setSocialSource(prev => [...prev, source]);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
            <div style={{ background: 'white', borderRadius: 16, width: '90%', maxWidth: 900, height: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}>

                {/* Header */}
                <div style={{ padding: '20px 30px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{section ? 'Bölümü Düzenle' : 'Yeni Bölüm Ekle'}</h2>
                    <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex' }}>

                    {/* LEFT COLUMN: Settings */}
                    <div style={{ flex: 1, padding: 30, borderRight: '1px solid #f0f0f0' }}>

                        {/* Title Input */}
                        <div style={{ marginBottom: 30 }}>
                            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>Bölüm Başlığı</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Örn: Favori Çantalarım"
                                style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}
                            />
                        </div>

                        {/* Visibility */}
                        <div style={{ marginBottom: 30 }}>
                            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>Görünürlük</label>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input
                                        type="radio"
                                        checked={isVisible}
                                        onChange={() => setIsVisible(true)}
                                        style={{ accentColor: 'black' }}
                                    />
                                    Herkese Açık
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input
                                        type="radio"
                                        checked={!isVisible}
                                        onChange={() => setIsVisible(false)}
                                        style={{ accentColor: 'black' }}
                                    />
                                    Gizli
                                </label>
                            </div>
                        </div>

                        {/* Layout Selector */}
                        <div style={{ marginBottom: 30 }}>
                            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: 15 }}>Görünüm Düzeni</label>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 15 }}>Bu bölümdeki koleksiyonların mağazanızda nasıl görüneceğini seçin.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 15 }}>
                                {LAYOUT_OPTIONS.map(option => {
                                    const isSelected = selectedLayout === option.id;
                                    const Icon = option.icon;
                                    return (
                                        <div
                                            key={option.id}
                                            onClick={() => setSelectedLayout(option.id)}
                                            style={{
                                                border: isSelected ? '2px solid black' : '1px solid #e5e5e5',
                                                borderRadius: 12,
                                                padding: 15,
                                                cursor: 'pointer',
                                                position: 'relative',
                                                background: isSelected ? '#fafafa' : 'white',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ marginBottom: 10 }}>
                                                <Icon size={24} color={isSelected ? 'black' : '#999'} />
                                            </div>
                                            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 5 }}>{option.label}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.4 }}>{option.desc}</div>

                                            {isSelected && (
                                                <div style={{ position: 'absolute', top: 10, right: 10 }}>
                                                    <CheckCircle2 size={18} fill="black" color="white" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Sources */}
                        <div>
                            <label style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: 10 }}>Sosyal Medya Kaynakları</label>
                            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 15 }}>Aşağıdan bir platform seçerek, yeni koleksiyon eklerken o platformdan içerik çekmenizi kolaylaştıracağız.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['Instagram', 'TikTok', 'YouTube'].map(platform => (
                                    <label key={platform} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.9rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={socialSource.includes(platform)}
                                            onChange={() => toggleSocialSource(platform)}
                                            style={{ width: 16, height: 16, accentColor: 'black' }}
                                        />
                                        {platform}
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Suggestions / Existing */}
                    <div style={{ width: 300, background: '#fafafa', padding: 30, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Bölümleriniz</h3>

                        {/* Should be populated with actual sections if available contextually, currently static mock */}
                        <div style={{ marginBottom: 30 }}>
                            {/* Placeholder for existing sections list */}
                            <div style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic' }}>
                                Mevcut bölümleriniz burada listelenir.
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Önerilen Bölümler</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {SUGGESTED_SECTIONS.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setTitle(s.toLocaleUpperCase())}
                                    style={{
                                        padding: '12px 15px',
                                        background: 'white',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: 8,
                                        textAlign: 'left',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}
                                >
                                    {s}
                                    <span>+</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Buttons */}
                <div style={{ padding: '20px 30px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 15, background: 'white' }}>
                    <button onClick={onClose} style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid #e5e5e5', background: 'white', fontWeight: 600, cursor: 'pointer' }}>İptal</button>
                    <button
                        onClick={handleSave}
                        style={{ padding: '12px 30px', borderRadius: 8, border: 'none', background: 'black', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Kaydet
                    </button>
                </div>

            </div>
        </div>
    );
}

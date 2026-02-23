"use client";

import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/Button';

const ThemeEditor: React.FC = () => {
    const { theme, updateTheme, saveTheme, resetTheme } = useTheme();
    const [saved, setSaved] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveTheme();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error(error);
            alert("Tema kaydedilirken bir hata oluştu.");
        }
    };

    return (
        <form onSubmit={handleSave} style={{ padding: 20, background: 'white', borderRadius: 8, border: '1px solid #eaeaea' }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.2rem', fontWeight: 600 }}>Tema Düzenleyici</h3>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9rem' }}>Ana Renk (Primary Color)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                        type="color"
                        value={theme.primaryColor || '#000000'}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        style={{ width: 50, height: 40, padding: 0, border: 'none', cursor: 'pointer', borderRadius: 4 }}
                    />
                    <input
                        type="text"
                        value={theme.primaryColor}
                        readOnly
                        style={{ padding: '8px', border: '1px solid #ddd', borderRadius: 4, width: '100px', fontSize: '0.9rem' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9rem' }}>Arka Plan Rengi</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                        type="color"
                        value={theme.backgroundColor || '#ffffff'}
                        onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                        style={{ width: 50, height: 40, padding: 0, border: 'none', cursor: 'pointer', borderRadius: 4 }}
                    />
                    <input
                        type="text"
                        value={theme.backgroundColor}
                        readOnly
                        style={{ padding: '8px', border: '1px solid #ddd', borderRadius: 4, width: '100px', fontSize: '0.9rem' }}
                    />
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9rem' }}>Yazı Tipi</label>
                <select
                    value={theme.fontFamily || 'Inter'}
                    onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                    style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: '0.9rem' }}
                >
                    <option value="Inter">Inter (Modern & Clean)</option>
                    <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                    <option value="Roboto Mono">Roboto Mono (Tech / Code)</option>
                    <option value="Courier New">Courier New (Retro Typewriter)</option>
                </select>
            </div>

            <div style={{ marginBottom: 30 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9rem' }}>Buton Stili</label>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        type="button"
                        onClick={() => updateTheme({ buttonStyle: 'sharp' })}
                        style={{
                            padding: '8px 12px',
                            border: theme.buttonStyle === 'sharp' ? '2px solid var(--theme-primary)' : '1px solid #ddd',
                            borderRadius: '0px',
                            background: theme.buttonStyle === 'sharp' ? '#f9f9f9' : 'white',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        Keskin
                    </button>
                    <button
                        type="button"
                        onClick={() => updateTheme({ buttonStyle: 'rounded' })}
                        style={{
                            padding: '8px 12px',
                            border: theme.buttonStyle === 'rounded' ? '2px solid var(--theme-primary)' : '1px solid #ddd',
                            borderRadius: '8px',
                            background: theme.buttonStyle === 'rounded' ? '#f9f9f9' : 'white',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        Yuvarlak
                    </button>
                    <button
                        type="button"
                        onClick={() => updateTheme({ buttonStyle: 'pill' })}
                        style={{
                            padding: '8px 12px',
                            border: theme.buttonStyle === 'pill' ? '2px solid var(--theme-primary)' : '1px solid #ddd',
                            borderRadius: '50px',
                            background: theme.buttonStyle === 'pill' ? '#f9f9f9' : 'white',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                        }}
                    >
                        Hap (Pill)
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
                <Button fullWidth>{saved ? '✅ Kaydedildi' : 'Ayarları Kaydet'}</Button>
                <button
                    type="button"
                    onClick={resetTheme}
                    style={{ padding: '10px 20px', border: '1px solid #ddd', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                    Sıfırla
                </button>
            </div>
        </form>
    );
};

export default ThemeEditor;

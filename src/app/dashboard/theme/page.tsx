'use client';

import React from 'react';
import { Palette, Type } from 'lucide-react';

export default function ThemePage() {
    return (
        <div style={{ maxWidth: 800, paddingBottom: 100 }}>
            <h1 style={{ fontSize: '2.5rem',  fontWeight: 700, marginBottom: 30 }}>Tasarım & Tema</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                {/* Color Theme */}
                <div style={{ padding: 25, border: '1px solid #eaeaea', borderRadius: 12, background: 'white' }}>
                    <div style={{ marginBottom: 20 }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Palette size={20} /> Renk Teması
                        </h3>
                    </div>
                    <div style={{ display: 'flex', gap: 15 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'black', border: '2px solid #ddd', cursor: 'pointer' }} title="Siyah" />
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F5F5DC', border: '1px solid #ddd', cursor: 'pointer' }} title="Bej" />
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFF0F5', border: '1px solid #ddd', cursor: 'pointer' }} title="Lavanta" />
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#E0FFFF', border: '1px solid #ddd', cursor: 'pointer' }} title="Camgöbeği" />
                    </div>
                </div>

                {/* Typography */}
                <div style={{ padding: 25, border: '1px solid #eaeaea', borderRadius: 12, background: 'white' }}>
                    <div style={{ marginBottom: 20 }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Type size={20} /> Yazı Tipi
                        </h3>
                    </div>
                    <select style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem' }}>
                        <option>Serif (Klasik & Şık)</option>
                        <option>Sans Serif (Modern & Temiz)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

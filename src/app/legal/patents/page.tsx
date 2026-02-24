import React from 'react';

export default function PatentsPage() {
    return (
        <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Patentler ve Fikri Mülkiyet</h1>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>Yasal Haklar</p>

            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
                <p style={{ marginBottom: '20px' }}>
                    Room001 platformunda bulunan bazı özellikler, iş akışları ve tasarımlar yürürlükteki fikri mülkiyet kanunları ve patent başvurularıyla korunmaktadır.
                </p>

                <div style={{ borderLeft: '4px solid #111', paddingLeft: '20px', margin: '30px 0', background: '#f5f5f5', padding: '20px' }}>
                    <p style={{ marginBottom: '0', fontStyle: 'italic' }}>
                        Platform üzerindeki sanal hediyeleşme (Gifting) altyapısı, Insider Tier (Oyunlaştırma) motoru ve anında "Marka Kataloğu - Linklerim" entegrasyonu tescil sürecine dahildir.
                    </p>
                </div>
            </div>
        </div>
    );
}

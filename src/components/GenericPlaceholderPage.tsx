'use client';

import React from 'react';

export default function GenericPlaceholderPage() {
    return (
        <div style={{ padding: 60, textAlign: 'center', background: 'white', borderRadius: 16, border: '1px solid #eaeaea', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 20 }}>🚧</div>
            <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Yakında Burada!</h1>
            <p style={{ color: '#666', maxWidth: 400 }}>Bu sayfa şu anda geliştirme aşamasında. Çok yakında harika özelliklerle karşınızda olacak.</p>
        </div>
    );
}

'use client';

import React from 'react';

export default function UpgradePage() {
    return (
        <div style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: 20 }}>Kazanmak İçin Yükselt</h1>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display, serif', marginBottom: 10, color: '#333' }}>İçerik Üreticisi hesabına yükseltin.</h2>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, maxWidth: 600 }}>
                    Hesabınız şu anda bir <strong>alışveriş hesabıdır</strong>. Para kazanma fırsatlarına erişmek için hesabınızı içerik üreticisi hesabına yükseltmek üzere başvuruda bulunmalısınız.
                </p>
            </div>

            <button style={{
                padding: '12px 25px',
                background: 'black',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.5px'
            }}>
                YÜKSELTME İÇİN BAŞVUR
            </button>
        </div>
    );
}

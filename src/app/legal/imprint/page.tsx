import React from 'react';

export default function ImprintPage() {
    return (
        <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Künye (Imprint)</h1>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>Yasal Bilgiler</p>

            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', background: '#f9f9f9', padding: '30px', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', color: '#111' }}>Şirket Unvanı</h3>
                <p style={{ marginBottom: '20px' }}>Room001 Teknoloji ve Reklamcılık A.Ş.</p>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', color: '#111' }}>Adres</h3>
                <p style={{ marginBottom: '20px' }}>Levent Mah. Büyükdere Cad. No: 199<br />Şişli / İstanbul, Türkiye</p>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', color: '#111' }}>İletişim</h3>
                <p style={{ marginBottom: '20px' }}>Email: hello@room001.tr<br />Telefon: +90 212 555 00 00</p>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', color: '#111' }}>Ticaret Sicil No</h3>
                <p style={{ marginBottom: '0' }}>123456-78</p>
            </div>
        </div>
    );
}

'use client';

import React from 'react';

export default function NotificationsPage() {
    return (
        <div style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: '2rem',  marginBottom: 20 }}>Bildirimler</h1>

            <div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 10 }}>Bildirim Ayarları</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', maxWidth: 600 }}>
                    Almak istediğiniz e-posta ve anlık bildirimleri özelleştirin. Mobil cihazınızda anlık bildirim almak için uygulamayı indirin.
                </p>
            </div>

            <div style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 30 }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: '#999', marginBottom: 20, textTransform: 'uppercase' }}>ALIŞVERİŞ AYARLARI</h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
                    <div style={{ maxWidth: 500 }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 5 }}>Haftalık Bültenler</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Çemberlerinizdeki küratörlerin eklediği yeni ürünler hakkında haftalık güncellemeler alın.</p>
                    </div>
                    <select style={{ padding: '10px 15px', border: '1px solid #ddd', borderRadius: 8, minWidth: 200, fontSize: '0.9rem', outline: 'none' }}>
                        <option>Email Bildirimleri</option>
                        <option>Hiçbiri</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

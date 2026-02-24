import React from 'react';

export default function CookiePage() {
    return (
        <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Çerez Politikası</h1>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>Son Güncelleme: Ekim 2025</p>

            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
                <p style={{ marginBottom: '20px' }}>
                    Gezinme deneyiminizi en üst düzeye çıkarmak ve Insider'larımızın affiliate linklerinin doğru şekilde takip edilmesini sağlamak amacıyla çerezleri (cookies) kullanıyoruz.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>Zorunlu Çerezler</h3>
                <p style={{ marginBottom: '20px' }}>
                    Platformun temel işlevlerini (giriş yapma, oturumu açık tutma) yerine getirebilmesi için gerekli olan teknik çerezlerdir. Devre dışı bırakılamazlar.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>Performans ve Takip Çerezleri</h3>
                <p style={{ marginBottom: '20px' }}>
                    Bir içerik üreticisinin mağazasından harici bir satıcıya (örn. Trendyol) gidildiğinde, komisyon takibinin yapılabilmesi için kullanılan sektör standardı takip altyapısıdır.
                </p>
            </div>
        </div>
    );
}

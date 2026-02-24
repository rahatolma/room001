import React from 'react';

export default function PrivacyPage() {
    return (
        <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Gizlilik Politikası</h1>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>Son Güncelleme: Ekim 2025</p>

            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
                <p style={{ marginBottom: '20px' }}>
                    Gizliliğiniz bizim için önemlidir. Bu politika, Room001 hizmetlerini kullanırken ziyaretçilerden ve kayıtlı kullanıcılardan hangi verileri topladığımızı ve bunları nasıl kullandığımızı açıklar.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>1. Toplanan Veriler</h3>
                <p style={{ marginBottom: '20px' }}>
                    - Hesap Bilgileri: Adınız, e-posta adresiniz, sosyal medya bağlantılarınız.<br />
                    - Analitik Verileri: Tıklanan ürün linkleri, trafik kaynakları, cihaz bilgileri.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>2. Verilerin Kullanımı</h3>
                <p style={{ marginBottom: '20px' }}>
                    Toplanan veriler, platformu iyileştirmek, içerik üreticilerine tıklama/satış istatistikleri sunmak ve markalara "Keşfet" sekmesinde daha doğru eşleşmeler göstermek amacıyla kullanılır. Kesinlikle üçüncü taraf veri tüccarlarına satılmaz.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>3. Verilerinizi Silme Hakkı</h3>
                <p style={{ marginBottom: '20px' }}>
                    Hesabınızı ve tüm bağlantılı verilerinizi dilediğiniz zaman "Ayarlar" sekmesinden veya doğrudan support@room001.tr adresine mail atarak sildirebilirsiniz.
                </p>
            </div>
        </div>
    );
}

import React from 'react';

export default function TermsPage() {
    return (
        <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Kullanım Şartları</h1>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>Son Güncelleme: Ekim 2025</p>

            <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>1. Kabul Beyanı</h3>
                <p style={{ marginBottom: '20px' }}>
                    Room001 platformunu kullanarak bu kullanım şartlarını kabul etmiş sayılırsınız. Şartların herhangi bir bölümünü kabul etmiyorsanız, hizmeti kullanmamalısınız.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>2. İçerik ve Bağlantılar</h3>
                <p style={{ marginBottom: '20px' }}>
                    İçerik üreticilerimiz (Insider'lar), platform üzerinden bağımsız üçüncü taraf satıcılara (örn. Trendyol, Hepsiburada) affiliate bağlantıları sunar. Room001, bu üçüncü taraf sitelerin içeriğinden veya ürün tedariğinden sorumlu değildir.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>3. Gelir ve Vergiler</h3>
                <p style={{ marginBottom: '20px' }}>
                    Insider'lar, affiliate satışlarından elde ettikleri veya markalarla yaptıkları işbirliklerinden doğan komisyon ve kazançlar üzerinden kendi vergilerini ödemekle yükümlüdür. Room001 sadece bir teknoloji altyapısı sağlayıcısıdır.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>4. Marka İşbirlikleri</h3>
                <p style={{ marginBottom: '20px' }}>
                    Platform üzerinden markaların içerik üreticilerine gönderdiği tekliflerin nihai bağlayıcılığı taraflar arasındadır. Room001, bu anlaşmazlıklarda sadece arabulucu teknoloji sağlar, yasal bir sorumluluk üstlenmez.
                </p>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '40px 0 15px', color: '#111' }}>5. Değişiklikler</h3>
                <p style={{ marginBottom: '20px' }}>
                    Room001, bu Hizmet Şartlarını önceden bildirmeksizin değiştirme hakkını saklı tutar. Değişiklikler bu sayfada yayımlandığı andan itibaren geçerli olur.
                </p>
            </div>
        </div>
    );
}

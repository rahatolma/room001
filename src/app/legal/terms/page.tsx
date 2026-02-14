export default function TermsPage() {
    return (
        <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>Kullanım Şartları</h1>
            <p style={{ color: '#666', marginBottom: 40 }}>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>

            <section style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: 10 }}>1. Giriş</h2>
                <p style={{ lineHeight: 1.6 }}>
                    Room001'e hoş geldiniz. Platformumuzu ("Site", "Hizmet") kullanarak aşağıdaki şartları kabul etmiş olursunuz.
                </p>
            </section>

            <section style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: 10 }}>2. Hesap Oluşturma</h2>
                <p style={{ lineHeight: 1.6 }}>
                    Room001 üzerinde hesap oluştururken doğru ve güncel bilgiler sağlamayı kabul edersiniz.
                    Küratör hesapları onay sürecine tabi olabilir.
                </p>
            </section>

            <section style={{ marginBottom: 30 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: 10 }}>3. İçerik ve Davranış</h2>
                <p style={{ lineHeight: 1.6 }}>
                    Paylaştığınız içeriklerden siz sorumlusunuz. Room001, uygunsuz gördüğü içerikleri kaldırma hakkını saklı tutar.
                </p>
            </section>
        </div>
    );
}

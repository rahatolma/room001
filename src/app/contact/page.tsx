import React from 'react';

export default function ContactPage() {
    return (
        <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>İletişim</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6 }}>
                        Soruların veya işbirliği tekliflerin için buradayız. Sana en kısa sürede dönüş yapacağız.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '60px' }}>
                    <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '15px' }}>📩</div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px' }}>Destek ve Sorular</h3>
                        <p style={{ color: '#666', marginBottom: '0' }}>support@room001.tr</p>
                    </div>
                    <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '15px' }}>🤝</div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px' }}>Marka İşbirlikleri</h3>
                        <p style={{ color: '#666', marginBottom: '0' }}>brands@room001.tr</p>
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '50px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '30px' }}>Bize Yazın</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Ad Soyad</label>
                                <input type="text" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} placeholder="Adınız" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>E-Posta</label>
                                <input type="email" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} placeholder="ornek@email.com" />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Konu</label>
                            <input type="text" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} placeholder="Hangi konuda yardımcı olabiliriz?" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Mesajınız</label>
                            <textarea rows={5} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', resize: 'vertical' }} placeholder="Mesajınızı buraya yazın..." />
                        </div>
                        <button type="button" style={{
                            background: '#111', color: '#fff', padding: '16px 24px', fontSize: '1.1rem',
                            borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, marginTop: '10px'
                        }}>
                            Gönder
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <main style={{ background: '#FFFCF8', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '20px' }}>Biz Kimiz?</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6 }}>
                        Değer önerimiz basit: Senin kitlen, senin zevkin, senin başarın.
                    </p>
                </div>

                <div style={{ background: '#fff', padding: '50px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>Hikayemiz</h2>
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '30px' }}>
                        Room001, Türkiye'de markalar ve içerik üreticileri (Insider'lar) arasındaki uçurumu kapatmak üzere doğdu. Geleneksel reklamcılığın güvenilmez hissettirdiği günümüzde biz, samimi önerilere ve kürasyona inanıyoruz.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '30px' }}>
                        Global çözümlere yerli bir alternatif olarak, amacımız sana ait bir dijital vitrin sunmak. Algoritmaların kölesi olmadan, doğrudan takipçilerine ulaşabildiğin saydam bir ekosistem yaratıyoruz. Sen sadece sevdiğin ürünleri paylaş, geri kalan altyapıyı biz halledelim.
                    </p>

                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px', marginTop: '50px' }}>Misyonumuz</h2>
                    <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '40px' }}>
                        Markalar için en doğru kültürel elçileri bulmak, içerik üreticileri için ise hak ettikleri geliri kusursuz bir teknolojiyle elde etmelerini sağlamak. Kalabalığın arasından sıyrıl, odamıza katıl.
                    </p>

                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link href="/become-creator">
                            <button style={{
                                background: '#111', color: '#fff', padding: '16px 40px', fontSize: '1.1rem',
                                borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600
                            }}>
                                Bize Katıl
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

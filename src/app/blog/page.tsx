import React from 'react';
import Link from 'next/link';
import ImageFallback from '@/components/ImageFallback';

const DUMMY_POSTS = [
    { title: "2025'in Kuralları Yeniden Yazan Güzellik Trendleri", category: "Güzellik", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop" },
    { title: "Kreatör Ekonomisinde Affiliate Link Stratejileri", category: "Rehber", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" },
    { title: "Kapsül Gardırop Oluşturmanın Sırları", category: "Moda", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" },
    { title: "Markalarla İlk İşbirliği Anlaşmanı Nasıl Yaparsın?", category: "İş Dünyası", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" },
    { title: "Ev Dekorasyonunda Minimalizme Dönüş", category: "Yaşam", image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=800&auto=format&fit=crop" },
    { title: "Başarılı Bir Medya Kiti Nasıl Hazırlanır?", category: "Rehber", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop" },
];

export default function BlogPage() {
    return (
        <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-2px', marginBottom: '20px' }}>Room001 Dergi</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Trendler, rehberler ve zevk sahipleri için tasarlanmış özel editoryal içerikler.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
                    {DUMMY_POSTS.map((post, i) => (
                        <Link href="#" key={i} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '16px', marginBottom: '20px', background: '#f5f5f5' }}>
                                <ImageFallback src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                            </div>
                            <div style={{ color: '#999', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '10px' }}>
                                {post.category}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '15px' }}>
                                {post.title}
                            </h2>
                            <div style={{ fontSize: '0.9rem', color: '#666', borderBottom: '1px solid #111', alignSelf: 'flex-start', paddingBottom: '2px', fontWeight: 500 }}>
                                Devamını Oku
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}

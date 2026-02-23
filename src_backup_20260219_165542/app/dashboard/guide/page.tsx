'use client';

import React from 'react';
import { Search, MousePointer2, Smartphone, Link, Users, ShoppingBag, CreditCard, BarChart2, Share2, BookOpen, Settings, HelpCircle, DollarSign, PenTool } from 'lucide-react';

const CATEGORIES = [
    {
        title: 'Room001\'e Katılmak',
        description: 'Room001 hakkında daha fazla bilgi edinin ve nasıl başvuru yapacağınızı öğrenin.',
        articles: 4,
        icon: <MousePointer2 size={32} />
    },
    {
        title: 'Komisyon Kazanmak',
        description: 'Komisyon kazançları hakkında en sık sorulan soruların cevapları.',
        articles: 12,
        icon: <DollarSign size={32} />
    },
    {
        title: 'Room001 Uygulaması',
        description: 'iOS uygulamamız ve özellikleri hakkında daha fazla bilgi edinin.',
        articles: 4,
        icon: <Smartphone size={32} />
    },
    {
        title: 'Link Oluşturma ve Paylaşma',
        description: 'Link oluşturma, paylaşma ve en iyi uygulamalar hakkında sık sorulan sorular.',
        articles: 10,
        icon: <Link size={32} />
    },
    {
        title: 'Sosyal Medya Bağlama',
        description: 'Instagram, YouTube veya TikTok bağlantı sorunlarını giderin.',
        articles: 4,
        icon: <Users size={32} />
    },
    {
        title: 'Markalarla Çalışmak',
        description: 'Sohbet, Lookbooklar, Fırsatlar ve İşbirlikleri aracılığıyla markalarla çalışmak.',
        articles: 9,
        icon: <ShoppingBag size={32} />
    },
    {
        title: 'Mağazanızı Oluşturmak',
        description: 'Mağazanızı özelleştirin, koleksiyonlar oluşturun ve vitrininizi düzenleyin.',
        articles: 8,
        icon: <PenTool size={32} />
    },
    {
        title: 'Ödeme',
        description: 'Ödeme yönteminizi nasıl ayarlayacağınıza dair eğitimler ve sık sorulan sorular.',
        articles: 5,
        icon: <CreditCard size={32} />
    },
    {
        title: 'Seviye Sistemi',
        description: 'Insider puanınızı anlayın ve Insider Seviyelerimize genel bakış.',
        articles: 3,
        icon: <BarChart2 size={32} />
    },
    {
        title: 'Insider Referans Programı',
        description: 'Insider referans bonus programımız hakkında bilgi.',
        articles: 1,
        icon: <Share2 size={32} />
    },
    {
        title: 'Strateji ve En İyi Uygulamalar',
        description: 'Mağazanızı paylaşmak için en iyi uygulamalar.',
        articles: 5,
        icon: <BookOpen size={32} />
    },
    {
        title: 'Hesap Ayarları',
        description: 'Bildirimlerinizi nasıl yöneteceğiniz veya bir hesap yöneticisi ekleme.',
        articles: 4,
        icon: <Settings size={32} />
    },
    {
        title: 'Kolektifler, Wishlist ve Fazlası',
        description: 'Daha fazla kullanıcıya ulaşmak ve daha fazla kazanmak için Room001 özelliklerini en üst düzeye çıkarın.',
        articles: 6,
        icon: <HelpCircle size={32} />
    }
];

const SUGGESTED_ARTICLES = [
    {
        title: 'Satışların "Linklerim" veya "Kazançlar" sekmesinde görünmesi ne kadar sürer?',
        subtitle: 'Satışların görünme süresi çerçevesi.'
    },
    {
        title: 'Neden bir satın alma işleminden beklediğimden daha az komisyon kazandım?',
        subtitle: 'Komisyonun beklenenden az görünmesinin nedenleri.'
    },
    {
        title: 'Hızlı Link nedir?',
        subtitle: '"Hızlı Linkleri" veya doğrudan ürün linklerini anlamak.'
    },
    {
        title: 'Instagram Hesabınızı nasıl bağlarsınız?',
        subtitle: 'Instagram\'ı Room001\'e bağlayın.'
    },
    {
        title: 'Neden puan kaybettim veya bir seviye düştüm?',
        subtitle: 'Insider seviyeleri için puan sistemi.'
    },
    {
        title: 'Performansınızı nasıl analiz edersiniz?',
        subtitle: 'Verilerinizi analiz etmenin yolları hakkında bir açıklama ve video anlatımı.'
    },
    {
        title: 'Şifremi nasıl sıfırlarım?',
        subtitle: 'Platforma katıldıktan sonra şifrenizi nasıl sıfırlarsınız.'
    }
];

export default function GuidePage() {
    return (
        <div style={{ fontFamily: 'sans-serif', paddingBottom: 100 }}>

            {/* Hero Search Section */}
            <div style={{
                background: '#333',
                color: 'white',
                padding: '60px 40px',
                borderRadius: 12,
                textAlign: 'center',
                marginBottom: 50
            }}>
                <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', marginBottom: 30, fontWeight: 500 }}>Nasıl yardımcı olabiliriz?</h1>
                <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
                    <Search size={20} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Ne aramıştınız?"
                        style={{
                            width: '100%',
                            padding: '16px 20px 16px 50px',
                            borderRadius: 6,
                            border: 'none',
                            fontSize: '1rem',
                            outline: 'none',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white'
                        }}
                    />
                </div>
            </div>

            {/* Categories Grid */}
            <h2 style={{ fontSize: '0.9rem', color: '#666', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Tüm Kategoriler</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 60 }}>
                {CATEGORIES.map((cat, idx) => (
                    <div key={idx} style={{
                        background: 'white',
                        padding: 30,
                        borderRadius: 8,
                        border: '1px solid #eee',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)'; }}
                    >
                        <div style={{ color: '#333', marginBottom: 20 }}>{cat.icon}</div>
                        <h3 style={{ fontSize: '1.2rem', fontFamily: 'serif', marginBottom: 10, fontWeight: 600 }}>{cat.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5, marginBottom: 15 }}>{cat.description}</p>
                        <div style={{ fontSize: '0.8rem', color: '#999', fontWeight: 500 }}>{cat.articles} Makale</div>
                    </div>
                ))}
            </div>

            {/* Suggested Articles List */}
            <h2 style={{ fontSize: '0.9rem', color: '#666', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Önerilen Makaleler</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SUGGESTED_ARTICLES.map((article, idx) => (
                    <div key={idx} style={{
                        background: 'white',
                        padding: '20px 25px',
                        borderRadius: 8,
                        border: '1px solid #eee',
                        cursor: 'pointer'
                    }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, marginBottom: 5 }}>{article.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>{article.subtitle}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

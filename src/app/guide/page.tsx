'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search, MousePointerClick, Banknote, Smartphone, Link as LinkIcon,
    UserPlus, ShoppingBag, Tent, CreditCard, ChevronRight, Home, ChevronLeft,
    ThumbsUp, ThumbsDown, Meh, Clock
} from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = [
    {
        id: 'joining',
        icon: <MousePointerClick size={32} strokeWidth={1.5} />,
        title: 'Platforma Katılmak',
        desc: 'Room001 hakkında detaylar ve nasıl başvurulacağı.',
        articles: [
            { id: 'a1', title: 'Room001 nedir?', desc: 'Türkiye\'nin elit içerik ağı.', content: 'Platformumuz, premium markalarla içerik üreticilerini komisyon ve özel tekliflerle buluşturan kapalı devre bir ağdır.' },
            { id: 'a2', title: 'Nasıl başvuru yapabilirim?', desc: 'Kabul şartlarımız ve süreç.', content: 'Ana sayfadaki Katıl butonundan Instagram veya TikTok hesabınızı bağlayarak yapay zeka destekli onay sürecimize girebilirsiniz.' }
        ]
    },
    {
        id: 'commission',
        icon: <Banknote size={32} strokeWidth={1.5} />,
        title: 'Komisyon Kazanmak',
        desc: 'Komisyon kazançlarıyla ilgili sıkça sorulan sorular.',
        articles: [
            { id: 'c1', title: 'Affiliate link nedir?', desc: 'Affiliate linklerin çalışma mantığı.', content: 'Affiliate linkleri, takipçilerinizin hangi bağlantılardan alım yaptığını takip edebildiğimiz özel kodlu (utm) bağlantılardır. Son tıklama (last-click) modeliyle çalışır.' },
            { id: 'c2', title: 'Komisyon oranları neye göre belirlenir?', desc: 'Marka teklifleri ve sepet oranları.', content: 'Markalar her kategori için farklı komisyon oranları belirtebilir (örn: Elektronik %2, Giyim %15).' },
            { id: 'c3', title: 'Satışlarım panelime ne zaman düşer?', desc: 'Zaman çizelgesi ve onay süreci.', content: 'Tıklamalar anlık (30 dk), satışlar ise e-ticaret sitelerinden gelen günlük verilerle genelde 24-48 saat içinde yansır.' },
            { id: 'c4', title: 'Neden beklenen komisyonu alamadım?', desc: 'İade ve iptal edilen siparişler.', content: 'Kullanıcı ürünü iade ettiğinde veya farklı bir pencereden son tıklamayı yaptığında komisyondan hakkınız düşebilir.' }
        ]
    },
    {
        id: 'links',
        icon: <LinkIcon size={32} strokeWidth={1.5} />,
        title: 'Link Oluşturma',
        desc: 'Link yaratma ve paylaşım üzerine en iyi pratikler.',
        articles: [
            { id: 'l1', title: 'Nasıl link oluştururum?', desc: 'Panelden link çevirme adımları.', content: 'Panelinize girip herhangi bir Trendyol, Boyner vs. linkini yapıştırarak anında sihirli affiliate linkinize çevirebilirsiniz.' },
            { id: 'l2', title: 'Instagram Story için en iyi pratikler', desc: 'Daha çok tıklanma almak için ipuçları.', content: 'Link etiketini ürün görselinin veya "Ürünü İncele" gibi dikkat çekici bir metin arkasına koymak tıklanmayı %40 artırır.' }
        ]
    },
    {
        id: 'brands',
        icon: <ShoppingBag size={32} strokeWidth={1.5} />,
        title: 'Markalarla Çalışmak',
        desc: 'Mesajlaşma, Hediyeleşme ve Kampanyalar.',
        articles: [
            { id: 'b1', title: 'Marka bana nasıl ulaşır?', desc: 'Marka Kataloğu algoritması.', content: 'Eğer Insider Seviyeniz yeterliyse markalar sizi katalogda bulup doğrudan teklif iletebilir.' }
        ]
    },
    {
        id: 'shop',
        icon: <Tent size={32} strokeWidth={1.5} />,
        title: 'Vitrini Özelleştirmek',
        desc: 'Mağazanı ve koleksiyonlarını düzenle.',
        articles: [
            { id: 's1', title: 'Koleksiyonlara ürün nasıl eklenir?', desc: 'Ürün paneli kullanımı.', content: 'Ürünler bölümünden yeni bir kart oluşturup dilediğiniz bir koleksiyona atayabilirsiniz.' }
        ]
    },
    {
        id: 'payment',
        icon: <CreditCard size={32} strokeWidth={1.5} />,
        title: 'Ödemeler',
        desc: 'Banka hesabı ekleme ve ödeme takvimi.',
        articles: [
            { id: 'p1', title: 'Param ne zaman yatar?', desc: 'Aylık ödeme takvimi.', content: 'Hak edilen ve markalar tarafından onaylanan tutarlar, her ayın 15. iş gününde IBAN adresinize otomatik yatırılır.' }
        ]
    },
];

export default function GuideDrillDown() {
    // Navigation States
    const [currentView, setCurrentView] = useState<'categories' | 'category_detail' | 'article_detail'>('categories');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedArticle, setSelectedArticle] = useState<any>(null);

    // Filter Navigation
    const goHome = () => {
        setCurrentView('categories');
        setSelectedCategory(null);
        setSelectedArticle(null);
    };

    const goCategory = (category: any) => {
        setSelectedCategory(category);
        setCurrentView('category_detail');
        setSelectedArticle(null);
    };

    const goArticle = (article: any) => {
        setSelectedArticle(article);
        setCurrentView('article_detail');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'var(--font-dm-sans)' }}>
            {/* SEARCH HEADER */}
            <div style={{ background: '#333333', padding: '60px 20px', textAlign: 'center' }}>
                <h1 style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 500,
                    marginBottom: '30px',
                    fontFamily: 'serif',
                    letterSpacing: '0.5px'
                }}>
                    <span style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>
                        Size nasıl yardımcı olabiliriz?
                    </span>
                </h1>

                <div style={{
                    maxWidth: 700,
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    <Search color="#999" size={20} style={{ position: 'absolute', left: 20, top: 15 }} />
                    <input
                        type="text"
                        placeholder="Ne arıyorsunuz?"
                        style={{
                            width: '100%',
                            padding: '16px 20px 16px 50px',
                            background: '#444',
                            border: '1px solid #555',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '1.05rem',
                            outline: 'none',
                        }}
                    />
                </div>
            </div>

            {/* BREADCRUMBS */}
            <div style={{ background: '#2a2a2a', padding: '15px 40px', color: '#ccc', fontSize: '0.85rem', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span onClick={goHome} style={{ cursor: 'pointer', fontWeight: currentView === 'categories' ? 'bold' : 'normal', color: currentView === 'categories' ? 'white' : '#ccc' }}>
                    Tüm Kategoriler
                </span>

                {selectedCategory && (
                    <>
                        <ChevronRight size={14} />
                        <span onClick={() => goCategory(selectedCategory)} style={{ cursor: 'pointer', fontWeight: currentView === 'category_detail' ? 'bold' : 'normal', color: currentView === 'category_detail' ? 'white' : '#ccc' }}>
                            {selectedCategory.title}
                        </span>
                    </>
                )}

                {selectedArticle && (
                    <>
                        <ChevronRight size={14} />
                        <span style={{ fontWeight: 'bold', color: 'white' }}>
                            {selectedArticle.title}
                        </span>
                    </>
                )}
            </div>

            {/* MAIN CONTENT AREA */}
            <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px', paddingBottom: 100 }}>

                {/* VIEW: 1. CATEGORIES GRID */}
                {currentView === 'categories' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: 20
                    }}>
                        {CATEGORIES.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => goCategory(cat)}
                                style={{
                                    background: 'white',
                                    padding: '40px 30px',
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }}
                                className="hover:shadow-lg hover:-translate-y-1"
                            >
                                <div style={{ marginBottom: 20, color: '#333' }}>
                                    {cat.icon}
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, fontFamily: 'serif', marginBottom: 10, color: '#000' }}>
                                    {cat.title}
                                </h3>
                                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: 20 }}>
                                    {cat.desc}
                                </p>
                                <span style={{ color: '#888', fontSize: '0.75rem', fontWeight: 600 }}>
                                    {cat.articles.length} Makale
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* VIEW: 2. CATEGORY DETAIL (List of Articles) */}
                {currentView === 'category_detail' && selectedCategory && (
                    <div style={{ background: 'white', borderRadius: 8, border: '1px solid #eaeaea', overflow: 'hidden' }}>
                        <div style={{ padding: '20px 30px', background: '#f5f5f5', borderBottom: '1px solid #eaeaea' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, fontFamily: 'serif' }}>Temel Konular</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {selectedCategory.articles.map((article: any, idx: number) => (
                                <div
                                    key={article.id}
                                    onClick={() => goArticle(article)}
                                    style={{
                                        padding: '25px 30px',
                                        borderBottom: idx !== selectedCategory.articles.length - 1 ? '1px solid #f0f0f0' : 'none',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                    className="hover:bg-gray-50"
                                >
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111', margin: '0 0 5px 0' }}>
                                        {article.title}
                                    </h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                                        {article.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW: 3. ARTICLE DETAIL */}
                {currentView === 'article_detail' && selectedArticle && (
                    <div style={{ background: 'white', padding: '50px', borderRadius: 12, border: '1px solid #eaeaea' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
                            {selectedArticle.title}
                        </h1>
                        <p style={{ fontSize: '1rem', color: '#666', margin: '0 0 20px 0' }}>
                            {selectedArticle.desc}
                        </p>

                        <div style={{ display: 'flex', gap: 15, fontSize: '0.8rem', color: '#999', marginBottom: 40 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={14} /> Son güncelleme: Bugün</span>
                        </div>

                        <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#333' }}>
                            <p style={{ marginBottom: 20 }}>
                                {selectedArticle.content}
                            </p>
                            <p style={{ marginBottom: 20 }}>
                                Takipçileriniz linkinize tıkladığında çerezler (cookies) taranarak kullanıcının platformla etkileşimi markaya raporlanır. Bu aşamada arka planda çok sofistike bir alt yapı çalışmaktadır. Room001 olarak bu süreci sizin için tamamen otomatik hale getirdik.
                            </p>
                        </div>

                        {/* HELPFUL WIDGET */}
                        <div style={{ marginTop: 80, padding: 30, background: '#f8fafc', borderRadius: 12, textAlign: 'center', border: '1px solid #f1f5f9' }}>
                            <h4 style={{ fontSize: '1.1rem', margin: '0 0 20px 0', fontWeight: 600, color: '#334155' }}>Bu makale yardımcı oldu mu?</h4>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
                                <button style={{ background: 'white', padding: 15, borderRadius: '50%', border: '1px solid #e2e8f0', cursor: 'pointer' }}><ThumbsUp size={20} color="#64748b" /></button>
                                <button style={{ background: 'white', padding: 15, borderRadius: '50%', border: '1px solid #e2e8f0', cursor: 'pointer' }}><Meh size={20} color="#64748b" /></button>
                                <button style={{ background: 'white', padding: 15, borderRadius: '50%', border: '1px solid #e2e8f0', cursor: 'pointer' }}><ThumbsDown size={20} color="#64748b" /></button>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Eğer daha fazla yardıma ihtiyacınız varsa <Link href="/contact" style={{ color: '#0f172a', textDecoration: 'underline' }}>support@room001.tr</Link> adresinden iletişime geçin.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Search, Link as LinkIcon, Plus, Loader2, CheckCircle2, X } from 'lucide-react';
import Button from '@/components/Button';
import Image from 'next/image';
import { searchProducts } from '@/actions/admin';
import { scrapeProductUrl, saveExternalProduct, ScrapedProductData } from '@/actions/scraper';

// A helper for the bookmarklet code
const bookmarkletCode = `javascript:(function(){
  const url = encodeURIComponent(window.location.href);
  window.open('http://localhost:3000/dashboard/products/add?snapshop_url=' + url, '_blank', 'width=800,height=600');
})();`;

export default function AddProductPage() {
    const [viewMode, setViewMode] = useState<'menu' | 'search' | 'url'>('menu');

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // URL Scraper State
    const [pasteUrl, setPasteUrl] = useState('');
    const [isFetchingLink, setIsFetchingLink] = useState(false);
    const [fetchedProduct, setFetchedProduct] = useState<ScrapedProductData | null>(null);
    const [fetchError, setFetchError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Listen for bookmarklet query parameter
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const snapshopUrl = params.get('snapshop_url');
        if (snapshopUrl) {
            setViewMode('url');
            setPasteUrl(decodeURIComponent(snapshopUrl));
        }
    }, []);

    const handleSearch = async (query: string) => {
        setIsSearching(true);
        try {
            const results = await searchProducts(query);
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleScrapeUrl = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pasteUrl) return;

        setIsFetchingLink(true);
        setFetchedProduct(null);
        setFetchError('');

        try {
            const res = await scrapeProductUrl(pasteUrl);
            if (res.success && res.product) {
                setFetchedProduct(res.product);
            } else {
                setFetchError(res.error || 'Ürün bilgileri getirilemedi.');
            }
        } catch (error) {
            setFetchError('Beklenmeyen bir hata oluştu.');
        } finally {
            setIsFetchingLink(false);
        }
    };

    const handleSaveExternalProduct = async () => {
        if (!fetchedProduct) return;
        setIsSaving(true);
        try {
            const res = await saveExternalProduct(fetchedProduct);
            if (res.success) {
                alert('Ürün başarıyla mağazanıza/kataloga eklendi!');
                setPasteUrl('');
                setFetchedProduct(null);
                setViewMode('menu'); // return to main menu
            } else {
                alert(res.error || 'Kaydedilemedi.');
            }
        } catch (error) {
            alert('Bir hata oluştu.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ paddingBottom: 60, maxWidth: 1000, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 40, position: 'relative' }}>
                {viewMode !== 'menu' && (
                    <button
                        onClick={() => setViewMode('menu')}
                        style={{ position: 'absolute', right: 0, top: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, color: '#666' }}
                    >
                        <X size={18} /> Kapat
                    </button>
                )}
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1, fontFamily: 'serif' }}>Create New Quick Link</h1>
                <p style={{ fontSize: '1rem', color: '#666', margin: 0 }}>Sevdiğiniz ürünlerin linklerini paylaşarak komisyon kazanın.</p>
            </div>

            {/* Main Menu View */}
            {viewMode === 'menu' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* 1. From URL */}
                        <div
                            onClick={() => setViewMode('url')}
                            style={{ border: '1px solid #eaeaea', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', display: 'flex', background: 'white', transition: 'transform 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: 140, background: '#f5f7f9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Decorative mockup of a paste input over a skirt */}
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=200")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }}></div>
                                <div style={{ background: 'white', padding: '6px 12px', borderRadius: 20, fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: 6, zIndex: 1, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                                    <LinkIcon size={12} /> Paste URL
                                </div>
                            </div>
                            <div style={{ padding: 25, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'serif', margin: '0 0 8px 0' }}>From URL</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0, lineHeight: 1.5 }}>Herhangi bir e-ticaret sitesinden ürün linki kopyalayıp yapıştırın.</p>
                            </div>
                        </div>

                        {/* 2. From Catalog */}
                        <div
                            onClick={() => { setViewMode('search'); handleSearch(''); }}
                            style={{ border: '1px solid #eaeaea', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', display: 'flex', background: 'white', transition: 'transform 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ width: 140, background: '#f5f7f9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                                {/* Product tiles decorative */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, width: '100%' }}>
                                    <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: 4, backgroundImage: 'url("https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=100")', backgroundSize: 'cover' }}></div>
                                    <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: 4, backgroundImage: 'url("https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=100")', backgroundSize: 'cover' }}></div>
                                    <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: 4, backgroundImage: 'url("https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=100")', backgroundSize: 'cover' }}></div>
                                    <div style={{ aspectRatio: '1/1', background: '#ccc', borderRadius: 4, backgroundImage: 'url("https://images.unsplash.com/photo-1599643478524-fb66f7ca0f4b?q=80&w=100")', backgroundSize: 'cover' }}></div>
                                </div>
                            </div>
                            <div style={{ padding: 25, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'serif', margin: '0 0 8px 0' }}>From Catalog</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0, lineHeight: 1.5 }}>Partner marka katalogumuzdaki milyonlarca ürün içinde arama yapın.</p>
                            </div>
                        </div>

                        {/* 3. From Past Links */}
                        <div
                            style={{ border: '1px solid #eaeaea', borderRadius: 8, overflow: 'hidden', cursor: 'not-allowed', display: 'flex', background: 'white', opacity: 0.6 }}
                        >
                            <div style={{ width: 140, background: '#f5f7f9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                            <div style={{ padding: 25, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'serif', margin: '0 0 8px 0' }}>From Past Links</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0, lineHeight: 1.5 }}>Geçmişte oluşturduğunuz linkleri çoğaltın. (Yakında)</p>
                            </div>
                        </div>

                        {/* 4. From Highest Rates */}
                        <div
                            style={{ border: '1px solid #eaeaea', borderRadius: 8, overflow: 'hidden', cursor: 'not-allowed', display: 'flex', background: 'white', opacity: 0.6 }}
                        >
                            <div style={{ width: 140, background: '#f5f7f9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
                            <div style={{ padding: 25, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'serif', margin: '0 0 8px 0' }}>From Highest Rates</h3>
                                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0, lineHeight: 1.5 }}>En yüksek komisyon oranına sahip işbirliklerini bulun. (Yakında)</p>
                            </div>
                        </div>
                    </div>

                    {/* Install Snapshop Banner */}
                    <div style={{ background: '#1c1b18', borderRadius: 8, overflow: 'hidden', display: 'flex', color: 'white', marginTop: 20 }}>
                        {/* Decorative left image */}
                        <div style={{ width: 250, position: 'relative', background: '#333' }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1591557304104-e0b62e4a8362?q=80&w=400")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6 }}></div>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, #1c1b18)' }}></div>
                        </div>

                        <div style={{ padding: '40px 50px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 400, margin: '0 0 15px 0' }}>Add products directly from any websites in seconds:</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 30 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem' }}>1</div>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#ccc', paddingTop: 2 }}>Bu butonu tutun ve tarayıcınızın Sık Kullanılanlar (Yer İmleri) çubuğuna sürükleyip bırakın.</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem' }}>2</div>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#ccc', paddingTop: 2 }}>Herhangi bir e-ticaret (Zara, Trendyol, vb.) sitesinde ürün sayfasına gidin.</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem' }}>3</div>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#ccc', paddingTop: 2 }}>Sık kullanılanlar çubuğundaki 'Snapshop' butonuna tıklayarak saniyeler içinde o ürünü mağazanıza linkleyin.</p>
                                </div>
                            </div>

                            <div>
                                <a
                                    href={bookmarkletCode}
                                    style={{
                                        display: 'inline-block',
                                        padding: '12px 24px',
                                        background: 'white',
                                        color: 'black',
                                        fontWeight: 600,
                                        letterSpacing: '1px',
                                        textDecoration: 'none',
                                        borderRadius: 4,
                                        fontSize: '0.85rem'
                                    }}
                                    title="Sürükleyip Sık Kullanılanlar çubuğuna bırakın"
                                    onClick={(e) => { e.preventDefault(); alert("Lütfen bu butonu mouse ile tutup tarayıcınızın Yer İmleri (Bookmarks) çubuğuna sürükleyip bırakın."); }}
                                >
                                    INSTALL SNAPSHOP
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* URL/Snapshop Scraper View */}
            {viewMode === 'url' && (
                <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, padding: '40px 60px' }}>
                    <div style={{ width: 48, height: 48, background: '#f5f5f5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <LinkIcon size={24} color="#111" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 10 }}>Link ile Hızlı Ekle</h3>
                    <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.5, marginBottom: 30 }}>
                        Platformda olmayan bir ürün mü buldun? Herhangi bir e-ticaret sitesinden ürün linkini buraya yapıştır. Sistemi senin için ürünü tanıyıp affiliate linkine çevirecektir.
                    </p>

                    <form onSubmit={handleScrapeUrl} style={{ display: 'flex', gap: 15, marginBottom: 30 }}>
                        <input
                            type="url"
                            placeholder="https://www.zara.com/..."
                            value={pasteUrl}
                            onChange={(e) => setPasteUrl(e.target.value)}
                            style={{ flex: 1, padding: '16px 20px', borderRadius: 8, border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }}
                            required
                        />
                        <Button type="submit" disabled={isFetchingLink || !pasteUrl} style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center', padding: '0 30px' }}>
                            {isFetchingLink ? <Loader2 size={18} className="spin" /> : <Plus size={18} />}
                            {isFetchingLink ? 'Bulunuyor...' : 'Ürünü Bul'}
                        </Button>
                    </form>

                    {fetchError && (
                        <div style={{ padding: 15, background: '#fee2e2', color: '#b91c1c', borderRadius: 8, marginBottom: 20 }}>
                            {fetchError}
                        </div>
                    )}

                    {fetchedProduct && (
                        <div style={{ padding: 25, border: '1px solid #eaeaea', borderRadius: 12, display: 'flex', gap: 20, animation: 'fadeIn 0.3s ease' }}>
                            <div style={{ width: 120, height: 160, borderRadius: 8, overflow: 'hidden', position: 'relative', flexShrink: 0, background: '#f9f9f9' }}>
                                <Image src={fetchedProduct.image} alt={fetchedProduct.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', fontSize: '0.8rem', fontWeight: 700, marginBottom: 8 }}>
                                    <CheckCircle2 size={16} /> Ürün Bulundu
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{fetchedProduct.brand}</div>
                                <div style={{ fontWeight: 600, fontSize: '1.2rem', lineHeight: 1.3, marginBottom: 10 }}>{fetchedProduct.title}</div>
                                {fetchedProduct.price && (
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 20 }}>{fetchedProduct.price} {fetchedProduct.currency}</div>
                                )}
                                <div style={{ marginTop: 'auto' }}>
                                    <Button onClick={handleSaveExternalProduct} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {isSaving ? <Loader2 size={16} className="spin" /> : <Plus size={16} />}
                                        Mağazama / Koleksiyonuma Ekle
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Catalog Search View */}
            {viewMode === 'search' && (
                <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, padding: '40px 30px' }}>
                    <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto 40px' }}>
                        <Search size={20} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            type="text"
                            placeholder="Zevkine uygun markaları ve ürünleri ara..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (e.target.value.length > 2 || e.target.value.length === 0) {
                                    handleSearch(e.target.value);
                                }
                            }}
                            style={{
                                width: '100%', padding: '18px 20px 18px 55px', fontSize: '1.05rem',
                                borderRadius: 16, border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {isSearching ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: 80, color: '#999' }}>Yükleniyor...</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                            {searchResults.map(product => (
                                <div key={product.id} className="product-card" style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                                    <div style={{ position: 'relative', paddingTop: '120%', background: '#f5f5f5' }}>
                                        {product.imageUrl && <Image src={product.imageUrl} alt={product.title || product.name || 'Product'} fill style={{ objectFit: 'cover' }} />}
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover-overlay">
                                            <Button style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Hızlı Ekle</Button>
                                        </div>
                                    </div>
                                    <div style={{ padding: 15 }}>
                                        <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{product.brand?.name || 'Markasız'}</div>
                                        <div style={{ fontWeight: 500, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title || product.name || 'İsimsiz Ürün'}</div>
                                    </div>
                                </div>
                            ))}
                            {searchResults.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', padding: 80, textAlign: 'center', color: '#999', background: '#f9f9f9', borderRadius: 12 }}>
                                    Aranan kriterlerde katalog ürünü bulunamadı.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .product-card:hover .hover-overlay { opacity: 1 !important; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .spin { animation: spin 1s linear infinite; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </div>
    );
}

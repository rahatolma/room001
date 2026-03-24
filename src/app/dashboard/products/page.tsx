"use client";

import React, { useState } from 'react';
import Button from '@/components/Button';
import { Plus, Link as LinkIcon, ExternalLink, Trash2, Eye, EyeOff, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import { addProductToCollection, deleteProductFromUser, getUserProducts, toggleProductVisibility } from '@/actions/product';

interface Product {
    id: string;
    title: string;
    price: string;
    brand: string;
    image: string;
    url: string;
    isVisible?: boolean; // Added
    viewCount?: number; // Added
}

// ... Mock Data Removed or kept as fallback ...

export default function CreatorProductsPage() {
    const [products, setProducts] = useState<any[]>([]); // Using 'any' for now to match backend response structure
    const [isAdding, setIsAdding] = useState(false);
    // ... states ...
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [currency, setCurrency] = useState('TRY');
    const [note, setNote] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [newUrl, setNewUrl] = useState('');

    // ... useEffect ...
    React.useEffect(() => {
        const fetchProducts = async () => {
            const data = await getUserProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleToggleVisibility = async (itemId: string) => {
        const result = await toggleProductVisibility(itemId);
        if (result.success) {
            // Optimistic update
            setProducts(products.map(p =>
                p.itemId === itemId ? { ...p, isVisible: result.isVisible } : p
            ));
        } else {
            alert('Hata: ' + result.error);
        }
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleAddProduct = async () => {
        if (!newUrl || !title) return; // Simple validation
        setIsFetching(true);

        const result = await addProductToCollection(null, {
            title,
            brand: brand || 'Bilinmiyor',
            price: price || '0',
            currency,
            note,
            imageUrl: image || 'https://via.placeholder.com/500', // Basic placeholder
            url: newUrl
        });

        if (result.success) {
            // Refresh local state
            const data = await getUserProducts();
            setProducts(data);
            setIsAdding(false);
            setNewUrl(''); setTitle(''); setBrand(''); setPrice(''); setImage(''); setCurrency('TRY'); setNote('');
            alert('Ürün başarıyla eklendi!');
        } else {
            alert('Hata: ' + result.error);
        }
        setIsFetching(false);
    };

    const handleDelete = async (itemId: string) => {
        if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            const result = await deleteProductFromUser(itemId);
            if (result.success) {
                setProducts(products.filter(p => p.itemId !== itemId));
            } else {
                alert('Silinemedi.');
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1 }}>Ürünler</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', margin: 0, lineHeight: 1.5 }}>Mağazan için ürün ekle ve vitrinini düzenle.</p>
                </div>
                <Button onClick={handleAddClick}>
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Yeni Ürün Ekle
                </Button>
            </div>

            {/* Add Product Area */}
            {isAdding && (
                <div style={{ background: '#fdfdfd', padding: 40, borderRadius: 24, border: '1px solid #eaeaea', marginBottom: 40, animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: '#111' }}>Manuel Ürün Ekle</h3>
                        <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 5, fontSize: '0.9rem', fontWeight: 500 }} className="hover:text-black transition-colors">Kapat</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: 10, fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Ürün Linki (Varsa)</label>
                            <div style={{ position: 'relative' }}>
                                <LinkIcon size={18} style={{ position: 'absolute', top: 14, left: 14, color: '#aaa' }} />
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    style={{
                                        width: '100%', padding: '14px 14px 14px 44px', borderRadius: 12,
                                        border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff',
                                        transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.1)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 10, fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Ürün Adı *</label>
                            <input
                                type="text"
                                placeholder="Örn: Kırmızı Ruj"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px', borderRadius: 12,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff',
                                    transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.1)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 10, fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Marka</label>
                            <input
                                type="text"
                                placeholder="Örn: MAC"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px', borderRadius: 12,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff',
                                    transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.1)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 10, fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Fiyat</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    style={{
                                        width: '100%', padding: '14px', borderRadius: 12,
                                        border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff',
                                        transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.1)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 10, fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Birim</label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    style={{
                                        width: '100%', padding: '14px', borderRadius: 12,
                                        border: '1px solid #ddd', fontSize: '1rem', outline: 'none', background: 'white',
                                        transition: 'all 0.2s'
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.1)'; }}
                                    onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                                >
                                    <option value="TRY">TRY (₺)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 10, fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Kapak Görseli URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px', borderRadius: 12,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff',
                                    transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.1)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                            />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: 10, fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Otantik Bir Not Ekleyin (Küratör İncelemesi)</label>
                            <textarea
                                placeholder="Bu ürünü neden seviyorsun? Takipçilerine stil ipuçları ver..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={3}
                                style={{
                                    width: '100%', padding: '14px', borderRadius: 12,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff',
                                    resize: 'vertical', minHeight: 100,
                                    transition: 'all 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.1)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 35, borderTop: '1px solid #eaeaea', paddingTop: 25, display: 'flex', gap: 15, justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setIsAdding(false)}
                            style={{ padding: '14px 28px', borderRadius: 12, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}
                        >
                            İptal
                        </button>
                        <Button onClick={handleAddProduct} disabled={isFetching || !title} style={{ padding: '14px 36px', borderRadius: 12, fontWeight: 700, fontSize: '0.95rem', background: '#111', color: 'white', border: 'none' }}>
                            {isFetching ? 'Ekleniyor...' : 'Kaydet ve Vitrine Ekle'}
                        </Button>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 30 }}>
                {products.length === 0 && !isFetching && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 80, color: '#999', background: '#fdfdfd', borderRadius: 24, border: '1px dashed #ddd', fontSize: '1.1rem' }}>
                        <div style={{ marginBottom: 15 }}><ExternalLink size={40} color="#ccc" style={{ margin: '0 auto' }} /></div>
                        Henüz hiç ürün eklemediniz.<br />
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>"Yeni Ürün Ekle" butonu ile mağazanızı oluşturmaya başlayın.</span>
                    </div>
                )}

                {products.map(product => (
                    <div key={product.itemId || product.id} style={{
                        background: 'white', borderRadius: 20, border: '1px solid #eaeaea',
                        overflow: 'hidden', position: 'relative', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: product.isVisible ? 1 : 0.6, // Dim if hidden
                        filter: product.isVisible ? 'none' : 'grayscale(80%)', // Grayscale if hidden
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                        }}
                    >
                        <div style={{ position: 'relative', height: 280, width: '100%', backgroundColor: '#f9f9f9' }}>
                            <img
                                src={product.image || 'https://via.placeholder.com/300'}
                                alt={product.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />

                            {/* Hidden Overlay */}
                            {!product.isVisible && (
                                <div style={{
                                    position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)'
                                }}>
                                    <span style={{
                                        background: 'rgba(0,0,0,0.8)', color: 'white', padding: '8px 16px',
                                        borderRadius: 30, fontSize: '0.8rem', fontWeight: 700, display: 'flex', gap: 6, alignItems: 'center', letterSpacing: 1
                                    }}>
                                        <EyeOff size={14} /> GİZLİ MÜŞTERİYE GÖRÜNMEZ
                                    </span>
                                </div>
                            )}

                            {/* Actions Overlay (Top) */}
                            <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between' }}>
                                {/* Visibility Toggle */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleToggleVisibility(product.itemId); }}
                                    style={{
                                        background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: product.isVisible ? '#111' : '#666',
                                        backdropFilter: 'blur(5px)', transition: 'all 0.2s'
                                    }}
                                    title={product.isVisible ? "Gizle" : "Görünür Yap"}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
                                >
                                    {product.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(product.itemId); }}
                                    style={{
                                        background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 36, height: 36,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: '#e11d48',
                                        backdropFilter: 'blur(5px)', transition: 'all 0.2s'
                                    }}
                                    title="Sil"
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div style={{ padding: 15 }}>
                            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.brand}</div>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{product.title}</h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <span style={{ fontWeight: 600, color: '#000' }}>{product.price} {product.currency}</span>
                                {product.collectionName && (
                                    <div style={{ fontSize: '0.7rem', padding: '2px 8px', background: '#f3f4f6', borderRadius: 4, color: '#555' }}>
                                        {product.collectionName}
                                    </div>
                                )}
                            </div>

                            {/* Simple Stats Footer */}
                            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 10, marginTop: 10, display: 'flex', gap: 15, fontSize: '0.8rem', color: '#666' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} title="Görüntülenme">
                                    <Eye size={14} color="#9ca3af" />
                                    <span style={{ fontWeight: 600 }}>{product.viewCount || 0}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} title="Tıklanma">
                                    <BarChart2 size={14} color="#9ca3af" />
                                    <span style={{ fontWeight: 600 }}>{(product.viewCount || 0) * 0.4}</span> {/* Mock conversion for now */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

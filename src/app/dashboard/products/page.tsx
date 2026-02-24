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
                <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eee', marginBottom: 30, animation: 'fadeIn 0.3s ease' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 20, fontWeight: 600 }}>Manuel Ürün Ekle</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 500 }}>Ürün Linki</label>
                            <div style={{ position: 'relative' }}>
                                <LinkIcon size={18} style={{ position: 'absolute', top: 12, left: 12, color: '#999' }} />
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    style={{
                                        width: '100%', padding: '12px 12px 12px 40px', borderRadius: 8,
                                        border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 500 }}>Ürün Adı</label>
                            <input
                                type="text"
                                placeholder="Örn: Kırmızı Ruj"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 500 }}>Marka</label>
                            <input
                                type="text"
                                placeholder="Örn: MAC"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 500 }}>Fiyat</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: 8,
                                        border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 500 }}>Birim</label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    style={{
                                        width: '100%', padding: '12px', borderRadius: 8,
                                        border: '1px solid #ddd', fontSize: '1rem', outline: 'none', background: 'white'
                                    }}
                                >
                                    <option value="TRY">TRY (₺)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 500 }}>Görsel URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 500 }}>Küratör Notu / İnceleme</label>
                            <textarea
                                placeholder="Bu ürünü neden seviyorsun? Takipçilerine ipuçları ver..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={3}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none',
                                    resize: 'vertical', minHeight: 80
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 25, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setIsAdding(false)}
                            style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: 500 }}
                        >
                            İptal
                        </button>
                        <Button onClick={handleAddProduct} disabled={isFetching || !newUrl || !title} style={{ padding: '12px 30px' }}>
                            {isFetching ? 'Ekleniyor...' : 'Kaydet ve Ekle'}
                        </Button>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
                {products.length === 0 && !isFetching && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 50, color: '#999' }}>
                        Henüz hiç ürün eklemediniz. "Yeni Ürün Ekle" butonu ile başlayın.
                    </div>
                )}

                {products.map(product => (
                    <div key={product.itemId || product.id} style={{
                        background: 'white', borderRadius: 12, border: '1px solid #eee',
                        overflow: 'hidden', position: 'relative', transition: 'transform 0.2s',
                        opacity: product.isVisible ? 1 : 0.75, // Dim if hidden
                        filter: product.isVisible ? 'none' : 'grayscale(100%)' // Grayscale if hidden
                    }}>
                        <div style={{ position: 'relative', height: 250, width: '100%' }}>
                            <img
                                src={product.image || 'https://via.placeholder.com/300'}
                                alt={product.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />

                            {/* Hidden Overlay */}
                            {!product.isVisible && (
                                <div style={{
                                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{
                                        background: 'black', color: 'white', padding: '6px 12px',
                                        borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, display: 'flex', gap: 6, alignItems: 'center'
                                    }}>
                                        <EyeOff size={14} /> GİZLİ
                                    </span>
                                </div>
                            )}

                            {/* Actions Overlay (Top) */}
                            <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between' }}>
                                {/* Visibility Toggle */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleToggleVisibility(product.itemId); }}
                                    style={{
                                        background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', color: product.isVisible ? '#111' : '#999'
                                    }}
                                    title={product.isVisible ? "Gizle" : "Görünür Yap"}
                                >
                                    {product.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(product.itemId); }}
                                    style={{
                                        background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', color: '#ef4444'
                                    }}
                                >
                                    <Trash2 size={16} />
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

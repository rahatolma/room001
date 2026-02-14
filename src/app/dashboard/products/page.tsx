"use client";

import React, { useState } from 'react';
import Button from '@/components/Button';
import { Plus, Link as LinkIcon, ExternalLink, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    title: string;
    price: string;
    brand: string;
    image: string;
    url: string;
}

// Mock Initial Data
const INITIAL_PRODUCTS: Product[] = [
    { id: '1', title: 'Nemlendirici Yüz Kremi', price: '450 TL', brand: 'La Roche Posay', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', url: '#' },
    { id: '2', title: 'Oversize T-Shirt', price: '299 TL', brand: 'Zara', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', url: '#' },
    { id: '3', title: 'Kablosuz Kulaklık', price: '3200 TL', brand: 'Apple', image: 'https://images.unsplash.com/photo-1572569028738-411a0977627e?w=500&q=80', url: '#' },
    { id: '4', title: 'Mat Ruj', price: '890 TL', brand: 'MAC', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80', url: '#' },
];

export default function CreatorProductsPage() {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [isAdding, setIsAdding] = useState(false);
    const [newUrl, setNewUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleFetchProduct = async () => {
        if (!newUrl) return;
        setIsFetching(true);

        // Improve simulation with a delay and mock result
        setTimeout(() => {
            const newProduct: Product = {
                id: Date.now().toString(),
                title: 'Yeni Eklenen Ürün (Örnek)',
                price: '500 TL',
                brand: 'Bilinmiyor',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
                url: newUrl
            };
            setProducts([newProduct, ...products]);
            setIsFetching(false);
            setIsAdding(false);
            setNewUrl('');
            alert('Ürün başarıyla eklendi!');
        }, 1500);
    };

    const handleDelete = (id: string) => {
        if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div style={{ maxWidth: 1200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: 10, fontFamily: 'Playfair Display, serif' }}>Ürünler</h1>
                    <p style={{ color: '#666' }}>Mağazanızda sergilediğiniz ürünleri buradan yönetin.</p>
                </div>
                <Button onClick={handleAddClick}>
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Yeni Ürün Ekle
                </Button>
            </div>

            {/* Add Product Area */}
            {isAdding && (
                <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eee', marginBottom: 30, animation: 'fadeIn 0.3s ease' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: 15, fontWeight: 600 }}>Ürün Linki ile Ekle</h3>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <LinkIcon size={18} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                            <input
                                type="text"
                                placeholder="https://..."
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px 12px 12px 45px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>
                        <Button onClick={handleFetchProduct} disabled={isFetching || !newUrl}>
                            {isFetching ? 'Getiriliyor...' : 'Ekle'}
                        </Button>
                        <button
                            onClick={() => setIsAdding(false)}
                            style={{ padding: '0 20px', borderRadius: 8, border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
                        >
                            İptal
                        </button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginTop: 10 }}>Desteklenen sitelerden ürün linkini yapıştırarak otomatik ekleyebilirsiniz.</p>
                </div>
            )}

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
                {products.map(product => (
                    <div key={product.id} style={{ background: 'white', borderRadius: 12, border: '1px solid #eee', overflow: 'hidden', position: 'relative', transition: 'transform 0.2s', cursor: 'pointer' }}>
                        <div style={{ position: 'relative', height: 250, width: '100%' }}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', top: 10, right: 10 }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}
                                    style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                                >
                                    <Trash2 size={16} color="#e00" />
                                </button>
                            </div>
                        </div>
                        <div style={{ padding: 15 }}>
                            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.brand}</div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{product.title}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, color: '#000' }}>{product.price}</span>
                                <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ color: '#000' }}>
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";

import React, { useState } from 'react';
import { searchProducts } from '@/actions/product';
import { Product } from '@prisma/client';
import ImageFallback from './ImageFallback';
import styles from './ProductSearch.module.css';

interface ProductSearchProps {
    onAddProduct: (product: any) => void;
}

export default function ProductSearch({ onAddProduct }: ProductSearchProps) {
    const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');
    const [manualProduct, setManualProduct] = useState({ name: '', brand: '', link: '', imageUrl: '' });
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 1) {
            setIsSearching(true);
            try {
                const res = await searchProducts(val);
                if (Array.isArray(res)) {
                    setResults(res);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        } else {
            setResults([]);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mockProduct: any = {
            id: 'mock-' + Date.now(),
            title: manualProduct.name || 'Yeni Ürün (Linkten)',
            brandId: manualProduct.brand || 'Bilinmeyen',
            price: 0,
            imageUrl: manualProduct.imageUrl || '',
            url: manualProduct.link
        };
        onAddProduct(mockProduct);
        setManualProduct({ name: '', brand: '', link: '', imageUrl: '' });
        setActiveTab('search');
    };

    return (
        <div className={styles.searchContainer}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                <button
                    type="button"
                    onClick={() => setActiveTab('search')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 20,
                        border: 'none',
                        background: activeTab === 'search' ? '#000' : '#f0f0f0',
                        color: activeTab === 'search' ? '#fff' : '#000',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Search Database
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('manual')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 20,
                        border: 'none',
                        background: activeTab === 'manual' ? '#000' : '#f0f0f0',
                        color: activeTab === 'manual' ? '#fff' : '#000',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Add Manually
                </button>
            </div>

            {activeTab === 'search' ? (
                <>
                    <div className={styles.inputWrapper}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={query}
                                onChange={handleSearch}
                                placeholder="Search brand or product..."
                                className={styles.searchInput}
                            />
                            {isSearching && (
                                <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#999' }}>...</div>
                            )}
                        </div>
                    </div>

                    {results.length > 0 && (
                        <div className={styles.resultsList}>
                            {results.map((product) => (
                                <div key={product.id} className={styles.productItem}>
                                    <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }}>
                                        {product.imageUrl && <ImageFallback src={product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />}
                                    </div>
                                    <div className={styles.productInfo}>
                                        <div className={styles.productName} title={product.title}>{product.title}</div>
                                        <div className={styles.productBrand}>Brand ID: {product.brandId}</div>
                                        <div className={styles.productPrice}></div>
                                    </div>
                                    <button
                                        className={styles.addButton}
                                        onClick={() => {
                                            onAddProduct(product);
                                            setQuery('');
                                            setResults([]);
                                        }}
                                        type="button"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {query.length > 1 && !isSearching && results.length === 0 && (
                        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: 10 }}>No results found.</p>
                    )}
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 15, background: '#f9f9f9', borderRadius: 8 }}>
                    <input
                        placeholder="Product Name"
                        value={manualProduct.name}
                        onChange={e => setManualProduct({ ...manualProduct, name: e.target.value })}
                        style={{ padding: 10, borderRadius: 4, border: '1px solid #ddd' }}
                    />
                    <input
                        placeholder="Brand"
                        value={manualProduct.brand}
                        onChange={e => setManualProduct({ ...manualProduct, brand: e.target.value })}
                        style={{ padding: 10, borderRadius: 4, border: '1px solid #ddd' }}
                    />
                    <input
                        placeholder="Affiliate Link"
                        value={manualProduct.link}
                        onChange={e => setManualProduct({ ...manualProduct, link: e.target.value })}
                        style={{ padding: 10, borderRadius: 4, border: '1px solid #ddd' }}
                    />
                    <input
                        placeholder="Image URL"
                        value={manualProduct.imageUrl}
                        onChange={e => setManualProduct({ ...manualProduct, imageUrl: e.target.value })}
                        style={{ padding: 10, borderRadius: 4, border: '1px solid #ddd' }}
                    />
                    <button
                        type="button"
                        onClick={handleManualSubmit}
                        disabled={!manualProduct.name || !manualProduct.link}
                        style={{
                            padding: 10, background: '#000', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer',
                            opacity: (!manualProduct.name || !manualProduct.link) ? 0.5 : 1
                        }}
                    >
                        Add Product
                    </button>
                </div>
            )}
        </div>
    );
}

"use client";

import React, { useState } from 'react';
import { searchProducts } from '@/lib/mockData';
import { Product } from '@/types';
import styles from './ProductSearch.module.css';

interface ProductSearchProps {
    onAddProduct: (product: Product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onAddProduct }) => {
    const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');
    const [manualProduct, setManualProduct] = useState({ name: '', brand: '', link: '', imageUrl: '' });
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 1) {
            setResults(searchProducts(val));
        } else {
            setResults([]);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            id: Date.now().toString(),
            name: manualProduct.name,
            brand: manualProduct.brand,
            link: manualProduct.link,
            imageUrl: manualProduct.imageUrl || 'https://via.placeholder.com/150',
            clicks: 0,
            earnings: 0
        };
        onAddProduct(newProduct);
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
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search brand or product..."
                            className={styles.searchInput}
                        />
                    </div>

                    {results.length > 0 && (
                        <div className={styles.resultsList}>
                            {results.map((product) => (
                                <div key={product.id} className={styles.productItem}>
                                    <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }}>
                                        {product.imageUrl && <img src={product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />}
                                    </div>
                                    <div className={styles.productInfo}>
                                        <span className={styles.productName}>{product.name}</span>
                                        <span className={styles.productBrand}>{product.brand}</span>
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
                    {query.length > 1 && results.length === 0 && (
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
};

export default ProductSearch;

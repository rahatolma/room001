"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import styles from '../../layout.module.css';
import { Collection, Product } from '@/types';
import ProductSearch from '@/components/ProductSearch';
import { getCategories } from '@/actions/admin';

export default function NewCollectionPage() {
    const { user } = useAuth();
    const { addCollection } = useData();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [availableCategories, setAvailableCategories] = useState<any[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    useEffect(() => {
        getCategories().then(setAvailableCategories);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const newCollection: Collection = {
            id: Date.now().toString(),
            creatorId: user.id,
            title,
            subtitle,
            category,
            products: selectedProducts,
            imageAlt: title
        };

        addCollection(newCollection);
        router.push('/dashboard/collections');
    };

    const handleAddProduct = (product: Product) => {
        if (!selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const removeProduct = (productId: string) => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    };

    return (
        <div style={{ maxWidth: 600 }}>
            <h1 className={styles.title}>Yeni Koleksiyon Oluştur</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Başlık</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Örn: Yaz Favorileri"
                        style={{ width: '100%', padding: 12, border: '1px solid #eaeaea', borderRadius: 6 }}
                        required
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Kategori</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%', padding: 12, border: '1px solid #eaeaea', borderRadius: 6, background: 'white' }}
                        required
                    >
                        <option value="">Kategori Seçin</option>
                        {availableCategories.map((cat, i) => (
                            <option key={i} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Alt Başlık / Açıklama</label>
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="Örn: Tatil için vazgeçilmezler"
                        style={{ width: '100%', padding: 12, border: '1px solid #eaeaea', borderRadius: 6 }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Seçili Ürünler ({selectedProducts.length})</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 15 }}>
                        {selectedProducts.map(p => (
                            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, background: 'white', border: '1px solid #eee', borderRadius: 6 }}>
                                <div>
                                    <span style={{ fontWeight: 500 }}>{p.name}</span>
                                    <span style={{ fontSize: '0.85rem', color: '#666', marginLeft: 8 }}>({p.brand})</span>
                                </div>
                                <button type="button" onClick={() => removeProduct(p.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Sil</button>
                            </div>
                        ))}
                    </div>
                    <ProductSearch onAddProduct={handleAddProduct} />
                </div>

                <Button>Oluştur</Button>
            </form>
        </div>
    );
}

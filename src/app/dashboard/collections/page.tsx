"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from '../layout.module.css';

export default function CollectionsPage() {
    const { user } = useAuth();
    const { getCollectionsByCreator } = useData();

    const collections = user ? getCollectionsByCreator(user.id) : [];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h1 className={styles.title}>Koleksiyonlarım</h1>
                <Button href="/dashboard/collections/new">Yeni Oluştur</Button>
            </div>

            {collections.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, background: '#f9f9f9', borderRadius: 8 }}>
                    <p style={{ marginBottom: 20, color: '#666' }}>Henüz hiç koleksiyonunuz yok.</p>
                    <Button href="/dashboard/collections/new">İlk Koleksiyonunu Oluştur</Button>
                </div>
            ) : (
                <div className={styles.cardGrid}>
                    {collections.map((collection) => (
                        <div key={collection.id} className={styles.statCard}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 5 }}>{collection.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: 15 }}>
                                {collection.subtitle || 'Açıklama yok'}
                            </p>
                            <div style={{ display: 'flex', gap: 10, fontSize: '0.9rem' }}>
                                <span>{collection.products.length} Ürün</span>
                            </div>
                            <div style={{ marginTop: 15 }}>
                                <Link href={`/dashboard/collections/${collection.id}`} style={{ color: 'black', textDecoration: 'underline' }}>
                                    Düzenle
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

"use client";

import React, { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import styles from './layout.module.css';
import Button from '@/components/Button';

export default function DashboardPage() {
    const { user } = useAuth();
    const { getCollectionsByCreator } = useData();

    const stats = useMemo(() => {
        if (!user) return { collections: 0, products: 0, clicks: 0, earnings: 0 };

        const collections = getCollectionsByCreator(user.id);
        let totalProducts = 0;
        let totalClicks = 0;
        let totalEarnings = 0;

        collections.forEach(col => {
            totalProducts += col.products.length;
            col.products.forEach(p => {
                totalClicks += (p.clicks || 0);
                totalEarnings += (p.earnings || 0);
            });
        });

        return {
            collections: collections.length,
            products: totalProducts,
            clicks: totalClicks,
            earnings: totalEarnings
        };
    }, [user, getCollectionsByCreator]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h1 className={styles.title}>Hoşgeldin, {user?.username}</h1>
            </div>

            <div className={styles.cardGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Toplam Koleksiyon</div>
                    <div className={styles.statValue}>{stats.collections}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Toplam Ürün</div>
                    <div className={styles.statValue}>{stats.products}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Toplam Tıklanma</div>
                    <div className={styles.statValue}>{stats.clicks}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Tahmini Kazanç</div>
                    <div className={styles.statValue}>₺{stats.earnings.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}

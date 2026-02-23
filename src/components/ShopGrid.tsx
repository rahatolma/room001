"use client";

import React from 'react';
import Link from 'next/link';
import styles from './ShopGrid.module.css';
import { useData } from '@/context/DataContext';
import ImageFallback from '@/components/ImageFallback';

interface ShopItem {
    id: string;
    title: string;
    subtitle: string;
    imageAlt: string;
    href: string;
    collectionId?: string;
    imageUrl?: string; // Added for real images
}

interface ShopGridProps {
    title: string;
    items: ShopItem[];
    isPublic?: boolean;
}

const ShopGrid: React.FC<ShopGridProps> = ({ title, items, isPublic = false }) => {
    const { trackClick } = useData();

    const handleClick = (item: ShopItem) => {
        if (isPublic && item.collectionId) {
            trackClick(item.collectionId, item.id);
        }
    };

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.grid}>
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={styles.card}
                        onClick={() => handleClick(item)}
                    >
                        <div className={styles.imagePlaceholder}>
                            {item.imageUrl ? (
                                <ImageFallback
                                    src={item.imageUrl}
                                    alt={item.imageAlt}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                item.imageAlt
                            )}
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardSubtitle}>{item.subtitle}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ShopGrid;

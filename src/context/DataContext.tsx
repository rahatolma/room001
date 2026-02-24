"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Collection, User } from '@/types';

interface DataContextType {
    collections: Collection[];
    addCollection: (collection: Collection) => void;
    getCollectionsByCreator: (creatorId: string) => Collection[];
    trackClick: (collectionId: string, productId: string) => void;
    updateCollection: (id: string, updates: Partial<Collection>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('room001_collections');
        if (stored) {
            setCollections(JSON.parse(stored));
        } else {
            // Initialize with specific demo data
            const INITIAL_COLLECTIONS: Collection[] = [
                {
                    id: '1',
                    creatorId: 'zeynep',
                    title: 'Yaz Favorileri',
                    subtitle: 'Plaj ve Günlük',
                    imageAlt: 'Yaz',
                    products: []
                },
                {
                    id: '2',
                    creatorId: 'user',
                    title: 'İlk Koleksiyonum',
                    subtitle: 'Deneme',
                    imageAlt: 'Demo',
                    products: []
                }
            ];
            setCollections(INITIAL_COLLECTIONS);
            localStorage.setItem('room001_collections', JSON.stringify(INITIAL_COLLECTIONS));
        }
    }, []);

    const addCollection = (collection: Collection) => {
        const updated = [...collections, collection];
        setCollections(updated);
        localStorage.setItem('room001_collections', JSON.stringify(updated));
    };

    const getCollectionsByCreator = (creatorId: string) => {
        return collections.filter(c => c.creatorId === creatorId);
    };

    const trackClick = (collectionId: string, productId: string) => {
        const updatedCollections = collections.map(col => {
            if (col.id === collectionId) {
                return {
                    ...col,
                    products: col.products.map(prod => {
                        if (prod.id === productId) {
                            return {
                                ...prod,
                                clicks: (prod.clicks || 0) + 1,
                                earnings: (prod.earnings || 0) + 0.50 // Simulation: 0.50 TL per click
                            };
                        }
                        return prod;
                    })
                };
            }
            return col;
        });

        setCollections(updatedCollections);
        localStorage.setItem('room001_collections', JSON.stringify(updatedCollections));
    };

    const updateCollection = (id: string, updates: Partial<Collection>) => {
        const updatedCollections = collections.map(col => {
            if (col.id === id) {
                return { ...col, ...updates };
            }
            return col;
        });
        setCollections(updatedCollections);
        localStorage.setItem('room001_collections', JSON.stringify(updatedCollections));
    };

    return (
        <DataContext.Provider value={{ collections, addCollection, getCollectionsByCreator, trackClick, updateCollection }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}

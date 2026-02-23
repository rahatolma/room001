'use client';

import { toggleFavorite } from '@/actions/favorite';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Button from './Button';

export default function FavoriteButton({ productId, initialIsFavorited }: { productId: string, initialIsFavorited: boolean }) {
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        setIsLoading(true);
        // Optimistic update
        setIsFavorited(!isFavorited);

        const result = await toggleFavorite(productId);

        if (!result.success) {
            // Revert on error
            setIsFavorited(!isFavorited);
            if (result.error === 'Giriş yapmalısınız.') {
                alert('Favorilere eklemek için lütfen giriş yapın.');
                // Optionally redirect to login
            } else {
                alert('Bir hata oluştu.');
            }
        }
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            style={{
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#000'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
        >
            <Heart
                size={22}
                className={isLoading ? 'animate-pulse' : ''}
                fill={isFavorited ? '#e00' : 'none'}
                color={isFavorited ? '#e00' : '#333'}
            />
        </button>
    );
}

'use client';

import React from 'react';
import Button from '@/components/Button';
import { Share2, Eye, Link } from 'lucide-react';

export default function MediaKitActions({ username }: { username: string }) {

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${username} Media Kit`,
                url: window.location.href
            });
        } else {
            alert('Link kopyalandı!');
        }
    };

    return (
        <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="secondary" onClick={handleShare}>
                <Link size={16} style={{ marginRight: 8 }} />
                Link Kopyala
            </Button>
            <Button>
                <Eye size={16} style={{ marginRight: 8 }} />
                Önizle
            </Button>
        </div>
    );
}

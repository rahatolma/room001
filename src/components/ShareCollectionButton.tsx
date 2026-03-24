'use client';

import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareCollectionButton({ path }: { path: string }) {
    const [fullUrl, setFullUrl] = useState('');

    useEffect(() => {
        setFullUrl(`${window.location.origin}${path}`);
    }, [path]);

    const handleCopy = () => {
        if (!fullUrl) return;
        navigator.clipboard.writeText(fullUrl);
        toast.success("Koleksiyon linki kopyalandı!");
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'white',
                border: '1px solid #eaeaea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                color: '#111'
            }}
            title="Koleksiyonu Paylaş"
        >
            <Share2 size={18} />
        </button>
    );
}

'use client';

import { useState } from 'react';
import { requestJoinCircle } from '@/actions/circle';

interface JoinCircleButtonProps {
    circleId: string;
    initialStatus: string | null;
    isDbBacked: boolean;
}

export default function JoinCircleButton({ circleId, initialStatus, isDbBacked }: JoinCircleButtonProps) {
    const [status, setStatus] = useState<string | null>(initialStatus);
    const [loading, setLoading] = useState(false);

    if (!isDbBacked) return null;

    const handleJoin = async () => {
        setLoading(true);
        const res = await requestJoinCircle(circleId);
        setLoading(false);

        if (res.success) {
            setStatus('pending');
        } else {
            alert(res.message);
        }
    };

    if (status === 'approved') {
        return (
            <button disabled style={{
                padding: '10px 20px',
                background: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'default',
                fontWeight: 600,
                fontSize: '0.9rem'
            }}>
                Üyesiniz
            </button>
        );
    }

    if (status === 'pending') {
        return (
            <button disabled style={{
                padding: '10px 20px',
                background: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'default',
                fontWeight: 600,
                fontSize: '0.9rem'
            }}>
                İstek Gönderildi
            </button>
        );
    }

    return (
        <button
            onClick={handleJoin}
            disabled={loading}
            style={{
                padding: '12px 24px',
                background: 'black',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'background 0.2s'
            }}
        >
            {loading ? 'İşleniyor...' : 'Gruba Katıl'}
        </button>
    );
}

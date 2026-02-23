'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardRedirect() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user?.role === 'admin') {
                router.push('/dashboard/admin');
            } else if (user?.role === 'brand') {
                router.push('/dashboard/brand');
            } else if (user?.role === 'shopper') {
                router.push('/dashboard/shopper');
            } else {
                // Default to creator if role is creator or undefined (for legacy/demo purposes)
                router.push('/dashboard/creator');
            }
        }
    }, [user, loading, router]);

    return (
        <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="loader">Yükleniyor...</div>
        </div>
    );
}

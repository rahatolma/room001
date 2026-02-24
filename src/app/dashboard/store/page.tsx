'use client';

import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink } from 'lucide-react';

export default function CollectionsPage() {
    const { user } = useAuth();

    return (
        <div style={{ maxWidth: 800, margin: '50px auto', textAlign: 'center' }}>
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1 }}>Mağazam</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', margin: 0, lineHeight: 1.5 }}>Mağaza vitrinini doğrudan Insider Profilin üzerinden düzenle.</p>
            </div>

            <div style={{ padding: 40, border: '1px dashed #ccc', borderRadius: 12, background: '#fafafa' }}>
                <p style={{ marginBottom: 20, fontWeight: 500 }}>Profilinize giderek düzenlemeye başlayın:</p>
                <Button
                    onClick={() => window.open(`/${user?.username || user?.id}`, '_blank')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'black', color: 'white', padding: '15px 30px' }}
                >
                    <ExternalLink size={20} /> Profilime Git ve Düzenle
                </Button>
            </div>
        </div>
    );
}

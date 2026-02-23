'use client';

import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink } from 'lucide-react';

export default function CollectionsPage() {
    const { user } = useAuth();

    return (
        <div style={{ maxWidth: 800, margin: '50px auto', textAlign: 'center', }}>
            <h1 style={{ fontSize: '2rem', marginBottom: 20 }}>Mağaza Yönetimi (Insider Vitrini)</h1>
            <p style={{ color: '#666', marginBottom: 40, lineHeight: 1.6 }}>
                Vitrin düzenlemeleri ve koleksiyon yönetimi artık doğrudan <strong>Insider Profiliniz</strong> üzerinde yapılıyor.
                <br />
                Sürükle-bırak ile sıralama, yeni bölüm ekleme ve düzenleme işlemlerini profilinizde "Inline Editör" ile yapabilirsiniz.
            </p>

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

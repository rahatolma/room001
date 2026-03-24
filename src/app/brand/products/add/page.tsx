'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { createBrandProduct } from '@/actions/admin';
import { useRouter } from 'next/navigation';

export default function AddBrandProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Using creator_1 or brand_1 mock mapping from auth
    // In a real app this would come from useSession()
    const mockBrandId = 'brand_1';

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        imageUrl: '',
        productUrl: '',
        commissionRate: '10'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.title || !formData.price || !formData.productUrl) {
            setError('Lütfen tüm zorunlu alanları doldurun.');
            setLoading(false);
            return;
        }

        try {
            const result = await createBrandProduct(mockBrandId, {
                title: formData.title,
                price: parseFloat(formData.price),
                imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', // Default fallback
                productUrl: formData.productUrl,
                commissionRate: parseFloat(formData.commissionRate)
            });

            if (result.success) {
                router.push('/brand/products');
                router.refresh();
            } else {
                setError(result.error || 'Bir hata oluştu.');
            }
        } catch (err) {
            setError('Sunucu ile bağlantı kurulamadı.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 100 }}>
            {/* HEADER */}
            <div style={{ marginBottom: 40, marginTop: 20 }}>
                <Link href="/brand/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', marginBottom: 20 }} className="hover:text-black">
                    <ArrowLeft size={16} /> Kataloğa Dön
                </Link>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1px', color: '#111' }}>
                    Yeni Ürün Ekle
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#666', lineHeight: 1.5, margin: 0 }}>
                    Insider'ların mağazalarında sergileyebilmesi için ürününüzü platforma tanımlayın.
                </p>
            </div>

            {/* ERROR ALERT */}
            {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '12px 20px', borderRadius: 8, marginBottom: 25, fontSize: '0.95rem', fontWeight: 500 }}>
                    {error}
                </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>

                {/* PREVIEW HERO (Optional visual flair) */}
                <div style={{ height: 120, background: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #eaeaea', position: 'relative' }}>
                    {formData.imageUrl ? (
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${formData.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
                    ) : (
                        <ImageIcon size={40} color="#ccc" />
                    )}
                </div>

                <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 25 }}>

                    {/* TITLE */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#111', marginBottom: 8 }}>Ürün Adı *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Örn: Siyah Oversize Tişört"
                            style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* PRICE */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#111', marginBottom: 8 }}>Satış Fiyatı (₺) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
                                required
                            />
                        </div>

                        {/* COMMISSION RATE */}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#111', marginBottom: 8 }}>Hedef Komisyon Oranı (%) *</label>
                            <input
                                type="number"
                                name="commissionRate"
                                value={formData.commissionRate}
                                onChange={handleChange}
                                placeholder="10"
                                min="0"
                                max="100"
                                style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
                                required
                            />
                            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 6 }}>Kreatörlerin bu ürünü sattıklarında alacakları pay.</div>
                        </div>
                    </div>

                    {/* URL */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#111', marginBottom: 8 }}>E-Ticaret Linki (URL) *</label>
                        <input
                            type="url"
                            name="productUrl"
                            value={formData.productUrl}
                            onChange={handleChange}
                            placeholder="https://www.markaniz.com/urun-linki"
                            style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
                            required
                        />
                    </div>

                    {/* IMAGE URL */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#111', marginBottom: 8 }}>Ürün Görseli URL (Opsiyonel)</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://.../gorsel.jpg"
                            style={{ width: '100%', padding: '14px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div style={{ marginTop: 20, paddingTop: 30, borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: loading ? '#ccc' : '#111', color: 'white',
                                padding: '14px 32px', borderRadius: '30px', border: 'none',
                                fontWeight: 600, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                            }}
                            className={!loading ? "hover:scale-105" : ""}
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {loading ? 'Kaydediliyor...' : 'Kataloğa Ekle'}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

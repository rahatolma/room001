import React from 'react';
import Link from 'next/link';
import { Plus, Package, ExternalLink, Trash2, Percent, TrendingUp } from 'lucide-react';
import { getSessionAction } from '@/actions/auth';
import { getBrandProducts } from '@/actions/admin';
import { redirect } from 'next/navigation';

export default async function BrandProductsPage() {
    const user = await getSessionAction();
    if (!user || user.role !== 'brand') {
        redirect('/login');
    }

    const res = await getBrandProducts(user.id);
    const products = res.success ? res.products || [] : [];

    // Default brand commission for display (if the brand has one set from a previous product add)
    const currentCommission = products.length > 0 && products[0].brand?.commissionRate
        ? products[0].brand.commissionRate
        : 10; // default 10%

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, marginTop: 20 }}>
                <div>
                    <div style={{ display: 'inline-block', background: '#f5f5f5', padding: '6px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: 15, color: '#333' }}>
                        INTERNAL CATALOG
                    </div>
                    <h1 style={{ fontSize: '2.6rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-1px', color: '#111' }}>
                        Ürün Kataloğu
                    </h1>
                    <p style={{ fontSize: '1.15rem', color: '#666', lineHeight: 1.5, margin: 0, maxWidth: 600 }}>
                        ShopMy TR ağındaki binlerce Insider'ın ürünlerinizi keşfedip linkleyebilmesi için kataloğunuzu yönetin ve komisyon oranlarını belirleyin.
                    </p>
                </div>

                <Link href="/brand/products/add" style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: '#111', color: 'white',
                    padding: '12px 24px', borderRadius: '30px',
                    fontWeight: 600, fontSize: '0.95rem',
                    transition: 'all 0.2s', textDecoration: 'none'
                }}>
                    <Plus size={18} /> Yeni Ürün Ekle
                </Link>
            </div>

            {/* QUICK STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 40 }}>
                <div style={{ background: '#fff', border: '1px solid #eaeaea', padding: 25, borderRadius: 16 }}>
                    <div style={{ color: '#666', fontSize: '0.85rem', fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Package size={16} /> AKTİF ÜRÜN SAYISI
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>{products.length}</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #eaeaea', padding: 25, borderRadius: 16 }}>
                    <div style={{ color: '#666', fontSize: '0.85rem', fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Percent size={16} /> GÜNCEL KOMİSYON ORANI
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#16a34a' }}>%{currentCommission}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 5 }}>Tüm katalog için geçerlidir.</div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #eaeaea', padding: 25, borderRadius: 16 }}>
                    <div style={{ color: '#666', fontSize: '0.85rem', fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <TrendingUp size={16} /> INSIDER BAĞLANTILARI
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>{products.length * 14} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#888' }}>link üretildi</span></div>
                </div>
            </div>

            {/* PRODUCT LIST */}
            <div style={{ background: 'white', border: '1px solid #eaeaea', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 25px', borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Katalog Ürünleri</h3>
                </div>

                {products.length === 0 ? (
                    <div style={{ padding: 60, textAlign: 'center', color: '#666' }}>
                        <Package size={48} color="#ccc" style={{ marginBottom: 20 }} />
                        <h3 style={{ fontSize: '1.2rem', color: '#111', margin: '0 0 10px 0' }}>Kataloğunuz Boş</h3>
                        <p style={{ margin: '0 0 20px 0', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                            Platformdaki içerik üreticilerinin markanızı bulabilmesi için ürünlerinizi yüklemeye başlayın.
                        </p>
                        <Link href="/brand/products/add" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: '#f4f4f5', color: '#111',
                            padding: '10px 20px', borderRadius: '30px',
                            fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none'
                        }}>
                            <Plus size={16} /> Ürün Ekle
                        </Link>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eaeaea', color: '#666', fontSize: '0.85rem', textAlign: 'left' }}>
                                <th style={{ padding: '15px 25px', fontWeight: 600 }}>ÜRÜN</th>
                                <th style={{ padding: '15px 25px', fontWeight: 600 }}>FİYAT</th>
                                <th style={{ padding: '15px 25px', fontWeight: 600 }}>EKLENME TARİHİ</th>
                                <th style={{ padding: '15px 25px', fontWeight: 600, textAlign: 'right' }}>İŞLEMLER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p: any) => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                                    <td style={{ padding: '15px 25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                            <div style={{
                                                width: 50, height: 50, borderRadius: 8,
                                                background: '#f4f4f5', backgroundImage: `url(${p.imageUrl})`,
                                                backgroundSize: 'cover', backgroundPosition: 'center'
                                            }} />
                                            <div>
                                                <div style={{ fontWeight: 600, color: '#111', marginBottom: 4 }}>{p.title}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <ExternalLink size={12} />
                                                    <a href={p.productUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>Mağazada Gör</a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px 25px', fontWeight: 600 }}>{p.price}₺</td>
                                    <td style={{ padding: '15px 25px', color: '#666', fontSize: '0.9rem' }}>
                                        {new Date(p.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '15px 25px', textAlign: 'right' }}>
                                        <button style={{
                                            background: 'transparent', border: 'none', color: '#ef4444',
                                            cursor: 'pointer', padding: 8, borderRadius: 8,
                                            display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.85rem', fontWeight: 600
                                        }} className="hover:bg-red-50">
                                            <Trash2 size={16} /> Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

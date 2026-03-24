import React from 'react';
import { Package, Clock, CheckCircle, Search, ArrowRight } from 'lucide-react';
import { getSessionAction } from '@/actions/auth';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export default async function OrdersPage() {
    const user = await getSessionAction();

    // Fetch real transactions for the user
    // In a real scenario, this might join with products/brands depending on the architecture
    const transactions = user ? await prisma.transaction.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
    }) : [];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 60 }}>
            <div style={{ marginBottom: 40, borderBottom: '1px solid #eaeaea', paddingBottom: 20 }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.02em' }}>
                    <Package size={28} color="black" /> Siparişlerim
                </h1>
                <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
                    Geçmiş ve devam eden tüm siparişlerinizi buradan takip edebilirsiniz.
                </p>
                <div style={{ marginTop: 20, padding: 16, background: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: 12, fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ background: 'black', color: 'white', padding: '4px 8px', borderRadius: 6, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.05em' }}>BİLGİ</div>
                    <div style={{ flex: 1 }}>
                        Alışverişler yönlendirme yapılan marka sitelerinde tamamlandığı için, sipariş durumlarının otomatik olarak bu ekrana yansıması için markalarla olan entegrasyonlarımız devam etmektedir.
                    </div>
                </div>
            </div>

            {transactions.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 20 }}>
                    {transactions.map(order => (
                        <div key={order.id} style={{ padding: 24, borderRadius: 16, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: 20, background: 'white', transition: 'all 0.2s ease' }} className="hover:shadow-md">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f5f5f5', paddingBottom: 15 }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Sipariş No: #{order.id.split('-')[0].toUpperCase()}</div>
                                    <div style={{ color: '#666', fontSize: '0.9rem' }}>Tarih: {new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: order.status === 'COMPLETED' ? '#00cc66' : '#f39c12', fontWeight: 600, background: order.status === 'COMPLETED' ? '#e6f9f0' : '#fdf5e6', padding: '6px 12px', borderRadius: 20, fontSize: '0.85rem' }}>
                                    {order.status === 'COMPLETED' ? <CheckCircle size={16} /> : <Clock size={16} />}
                                    {order.status === 'COMPLETED' ? 'Tamamlandı' : 'Hazırlanıyor'}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                                {/* Generic Image for Transaction as it doesn't map to a specific product directly right now */}
                                <div style={{ width: 80, height: 80, borderRadius: 12, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Package size={32} color="#ccc" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{order.description || 'Marka Siparişi'}</div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{Number(order.amount).toLocaleString('tr-TR')} {order.currency}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '100px 20px', background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)', borderRadius: 24, border: '1px dashed #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                        <Search size={36} color="#aaa" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.02em', color: '#111' }}>Henüz Siparişiniz Yok</h2>
                    <p style={{ color: '#666', marginBottom: 36, fontSize: '1.1rem', maxWidth: 400 }}>Harika ürünler keşfetmek ve tarzınıza uygun parçaları bulmak için vitrinlere göz atın.</p>
                    <Link href="/creators" style={{ padding: '14px 28px', background: 'linear-gradient(90deg, #111 0%, #333 100%)', color: 'white', borderRadius: 100, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        İlham Kaynaklarını Keşfet <ArrowRight size={18} />
                    </Link>
                </div>
            )}
        </div>
    );
}

'use client';

import React, { useState } from 'react';

import Button from '@/components/Button';
import { createPaymentIntent, completePaymentSimulation } from '@/actions/payment';

export const dynamic = 'force-dynamic';

export default function PromotePage() {
    const [selectedPackage, setSelectedPackage] = useState<'boost_1_week' | 'boost_1_month' | null>(null);
    const [step, setStep] = useState(1); // 1: Select, 2: Pay, 3: Success
    const [loading, setLoading] = useState(false);
    const [paymentId, setPaymentId] = useState<string | null>(null);

    const handleSelect = async (pkg: 'boost_1_week' | 'boost_1_month') => {
        setSelectedPackage(pkg);
        setLoading(true);
        // Start payment flow
        const result = await createPaymentIntent(pkg);
        if (result.success && result.paymentId) {
            setPaymentId(result.paymentId);
            setStep(2);
        } else {
            alert('Hata: ' + result.message);
        }
        setLoading(false);
    };

    const handleSimulationPayment = async () => {
        if (!paymentId) return;
        setLoading(true);
        // Simulate Iyzico processing time
        await new Promise(r => setTimeout(r, 2000));

        const result = await completePaymentSimulation(paymentId);
        if (result.success) {
            setStep(3);
        } else {
            alert('Ödeme başarısız oldu.');
        }
        setLoading(false);
    };

    return (
        <div style={{ paddingBottom: 60 }}>
            <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -1 }}>Öne Çıkar</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
                    Profilini Room001 ana sayfasında milyonlara göster. Küratörlüğünü bir üst seviyeye taşı.
                </p>
            </div>

            {step === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30 }}>
                    {/* Package 1 */}
                    <div style={{
                        border: '1px solid #ddd',
                        borderRadius: 12,
                        padding: 30,
                        textAlign: 'center',
                        cursor: loading ? 'wait' : 'default',
                        opacity: loading ? 0.7 : 1,
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Haftanın Yıldızı</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 20 }}>₺500<span style={{ fontSize: '1rem', fontWeight: 400, color: '#999' }}>/hafta</span></div>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: 30, color: '#555' }}>
                            <li style={{ marginBottom: 10 }}>✓ Ana Sayfa "Öne Çıkanlar" Vitrini</li>
                            <li style={{ marginBottom: 10 }}>✓ Arama sonuçlarında öncelik</li>
                            <li style={{ marginBottom: 10 }}>✓ Profilde "Onaylı Rozet"</li>
                        </ul>
                        <Button
                            variant="primary"
                            style={{ width: '100%' }}
                            onClick={() => handleSelect('boost_1_week')}
                            disabled={loading}
                        >
                            {loading ? 'İşleniyor...' : 'Seç ve Öde'}
                        </Button>
                    </div>

                    {/* Package 2 */}
                    <div style={{
                        border: '2px solid black',
                        borderRadius: 12,
                        padding: 30,
                        textAlign: 'center',
                        position: 'relative',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{
                            position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
                            background: 'black', color: 'white', padding: '5px 15px', borderRadius: 20, fontSize: '0.8rem', letterSpacing: 1
                        }}>EN POPÜLER</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Aylık Hakimiyet</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 20 }}>₺1.500<span style={{ fontSize: '1rem', fontWeight: 400, color: '#999' }}>/ay</span></div>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: 30, color: '#555' }}>
                            <li style={{ marginBottom: 10 }}>✓ <b>30 Gün Boyunca</b> Ana Vitrin</li>
                            <li style={{ marginBottom: 10 }}>✓ Tüm Kategorilerde En Üst Sıra</li>
                            <li style={{ marginBottom: 10 }}>✓ Özel Instagram Tanıtımı</li>
                            <li style={{ marginBottom: 10 }}>✓ Detaylı İstatistik Raporu</li>
                        </ul>
                        <Button
                            variant="primary"
                            style={{ width: '100%', padding: '15px' }}
                            onClick={() => handleSelect('boost_1_month')}
                            disabled={loading}
                        >
                            {loading ? 'İşleniyor...' : 'Seç ve Öde'}
                        </Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div style={{ maxWidth: 500, margin: '0 auto', border: '1px solid #ddd', padding: 40, borderRadius: 12 }}>
                    <h3 style={{ marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 10 }}>Güvenli Ödeme</h3>

                    <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 8, marginBottom: 20, fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <span>Paket:</span>
                            <strong>{selectedPackage === 'boost_1_week' ? 'Haftanın Yıldızı' : 'Aylık Hakimiyet'}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Toplam:</span>
                            <span>{selectedPackage === 'boost_1_week' ? '₺500,00' : '₺1.500,00'}</span>
                        </div>
                    </div>

                    {/* Fake Credit Card Form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: 5, color: '#666' }}>Kart Sahibi</label>
                            <input type="text" placeholder="Ad Soyad" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: 5, color: '#666' }}>Kart Numarası</label>
                            <input type="text" placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
                        </div>
                        <div style={{ display: 'flex', gap: 15 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: 5, color: '#666' }}>SKT</label>
                                <input type="text" placeholder="AA/YY" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: 5, color: '#666' }}>CVV</label>
                                <input type="text" placeholder="123" style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Button
                            variant="primary"
                            style={{ width: '100%', background: '#222' }}
                            onClick={handleSimulationPayment}
                            disabled={loading}
                        >
                            {loading ? 'Ödeme Alınıyor...' : 'Ödemeyi Tamamla (Simülasyon)'}
                        </Button>
                        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: 10 }}>
                            🔒 Iyzico Güvenli Ödeme Altyapısı ile korunmaktadır.
                        </p>
                    </div>

                    <button
                        onClick={() => setStep(1)}
                        style={{ display: 'block', width: '100%', marginTop: 20, background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#666' }}
                    >
                        İptal Et ve Geri Dön
                    </button>
                </div>
            )}

            {step === 3 && (
                <div style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto', padding: 60 }}>
                    <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎉</div>
                    <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>Tebrikler!</h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: 30 }}>
                        Ödemeniz başarıyla alındı. Profiliniz belirlediğiniz süre boyunca vitrinde parlayacak!
                    </p>
                    <Button variant="primary" onClick={() => window.location.href = '/'}>
                        Ana Sayfaya Dön
                    </Button>
                </div>
            )}
        </div>
    );
}

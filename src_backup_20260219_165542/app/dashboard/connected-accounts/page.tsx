'use client';

import React from 'react';
import Button from '@/components/Button';
import { CreditCard, Wallet } from 'lucide-react';

export default function ConnectedAccountsPage() {
    return (
        <div style={{ paddingBottom: 100 }}>

            <h1 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: 50 }}>Bağlı Hesaplar</h1>

            <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: 15 }}>Ödeme Hesabı Bağla</h2>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, maxWidth: 800 }}>
                    Stripe şu anda sadece ABD merkezli içerik oluşturucular için kullanılabilir. ABD dışında bir içerik oluşturucuysanız, lütfen PayPal hesabınızı bağlayın.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>

                {/* Stripe */}
                <div style={{
                    border: '1px solid #eaeaea',
                    borderRadius: 12,
                    padding: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    background: 'white',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.02)'
                }}>
                    <div style={{
                        width: 60, height: 60, borderRadius: '50%', background: '#635bff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}>
                        <CreditCard size={28} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, marginBottom: 5 }}>Stripe</h3>
                        <p style={{ fontSize: '0.85rem', color: '#999', margin: 0 }}>Banka hesabı ile ödeme al</p>
                    </div>
                    <Button style={{ width: '100%', background: '#635bff', border: 'none', color: 'white', fontWeight: 600 }}>BAĞLA</Button>
                </div>

                {/* PayPal */}
                <div style={{
                    border: '1px solid #eaeaea',
                    borderRadius: 12,
                    padding: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    background: 'white',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.02)'
                }}>
                    <div style={{
                        width: 60, height: 60, borderRadius: '50%', background: '#003087',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}>
                        <Wallet size={28} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, marginBottom: 5 }}>PayPal</h3>
                        <p style={{ fontSize: '0.85rem', color: '#999', margin: 0 }}>PayPal bakiyene ödeme al</p>
                    </div>
                    <Button style={{ width: '100%', background: '#003087', border: 'none', color: 'white', fontWeight: 600 }}>BAĞLA</Button>
                </div>

            </div>

        </div>
    );
}

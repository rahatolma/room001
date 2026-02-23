"use client";

import React, { useState } from 'react';
import Modal from './Modal'; // Assuming we reuse the generic Modal component for consistent style
import Button from './Button'; // Reusing Button component
import Link from 'next/link';
import { ShoppingBag, Sparkles, Building2 } from 'lucide-react';

interface SignupSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
    onSignupClick: () => void;
    onCreatorClick: () => void;
    onBrandClick: () => void;
}

const SignupSelectionModal: React.FC<SignupSelectionModalProps> = ({
    isOpen,
    onClose,
    onLoginClick,
    onSignupClick,
    onCreatorClick,
    onBrandClick
}) => {
    // If we want a completely custom look like "Image 2" (simple white modal), we might not use the generic Modal wrapper if it enforces specific headers/styles.
    // However, looking at LoginModal, it uses <Modal>. The user wants the style of LoginModal (Image 2).
    // So we will reuse the <Modal> component structure but adapt the content.

    const [selectedRole, setSelectedRole] = useState<'shopper' | 'creator' | 'brand' | null>(null);

    if (!isOpen) return null;

    // We will mimic the "LoginModal" style: Clean white background, centered content.
    // We will present the 3 options as clean selectable cards or buttons.

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Hesap Oluştur">
            <div style={{ padding: '0 10px' }}>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: 30, fontSize: '0.95rem' }}>
                    Size en uygun deneyimi sunabilmemiz için lütfen hesap türünüzü seçin.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    {/* SHOPPER */}
                    <button
                        onClick={onSignupClick}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '20px', borderRadius: 12, border: '1px solid #eaeaea',
                            background: 'white', cursor: 'pointer', transition: 'all 0.2s',
                            textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.background = '#fafafa'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.background = 'white'; }}
                    >
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Alışveriş</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Favori içerik üreticilerinizin önerilerini keşfedin.</div>
                        </div>
                        <div style={{ color: '#000' }}>
                            <ShoppingBag size={28} />
                        </div>
                    </button>

                    {/* CREATOR */}
                    <button
                        onClick={onCreatorClick}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '20px', borderRadius: 12, border: '1px solid #eaeaea',
                            background: 'white', cursor: 'pointer', transition: 'all 0.2s',
                            textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.background = '#fafafa'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.background = 'white'; }}
                    >
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Insider (Creator)</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Kürasyonlarınızla kazanmaya başlayın.</div>
                        </div>
                        <div style={{ color: '#000' }}>
                            <Sparkles size={28} />
                        </div>
                    </button>

                    {/* BRAND */}
                    <button
                        onClick={onBrandClick}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '20px', borderRadius: 12, border: '1px solid #eaeaea',
                            background: 'white', cursor: 'pointer', transition: 'all 0.2s',
                            textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.background = '#fafafa'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#eaeaea'; e.currentTarget.style.background = 'white'; }}
                    >
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>Marka</div>
                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Ürünlerinizi doğru kitlelerle buluşturun.</div>
                        </div>
                        <div style={{ color: '#000' }}>
                            <Building2 size={28} />
                        </div>
                    </button>
                </div>

                <div style={{ marginTop: 30, textAlign: 'center', fontSize: '0.9rem', color: '#666', borderTop: '1px solid #eaeaea', paddingTop: 20 }}>
                    Zaten hesabınız var mı? <button onClick={onLoginClick} style={{ background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Giriş Yap</button>
                </div>
            </div>
        </Modal>
    );
};

export default SignupSelectionModal;

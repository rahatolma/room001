'use client';

import React, { useState } from 'react';
import { X, Search, Link as LinkIcon, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import ProductSearch from '@/components/ProductSearch';
import { Product } from '@/types';
import { createQuickLink, addProductToCollection } from '@/actions/product';
import { toast } from 'react-hot-toast';

interface CreateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateLinkModal({ isOpen, onClose }: CreateLinkModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleAddProduct = async (product: Product) => {
        setIsLoading(true);
        try {
            // Case 1: Existing Product (from Search)
            // If it has a numeric ID or UUID from DB
            if (product.id && !product.id.startsWith('manual_')) {
                const res = await createQuickLink(product.id);
                if (res.success) {
                    toast.success('Link başarıyla oluşturuldu!');
                    onClose();
                    // window.location.reload(); // Optional: RevalidatePath handles it usually
                } else {
                    toast.error('Link oluşturulamadı.');
                }
            }
            // Case 2: Manual Product
            else {
                // If manual, ProductSearch passes a mock object. We need to actually create it.
                // product.link contains the URL
                const res = await addProductToCollection(null, { // null collectionId defaults to "Genel"
                    title: product.name,
                    brand: product.brand,
                    price: '0', // Manual entry might not have price, default 0
                    imageUrl: product.imageUrl || '',
                    url: product.link || ''
                });

                if (res.success) {
                    toast.success('Ürün ve Link oluşturuldu!');
                    onClose();
                } else {
                    toast.error('Hata: ' + res.error);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
            <div style={{ background: 'white', borderRadius: 16, width: '90%', maxWidth: 600, maxHeight: '90vh', minHeight: 400, display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}>

                {/* Header */}
                <div style={{ padding: '20px 30px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                            <LinkIcon size={20} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Yeni Link Oluştur</h2>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Veritabanından seçin veya manuel ekleyin</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: 30, flex: 1, overflowY: 'auto' }}>
                    {isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, color: '#666' }}>
                            <div className="spinner" style={{ width: 30, height: 30, border: '3px solid #eee', borderTopColor: 'black', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 15 }}></div>
                            İşleniyor...
                            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                        </div>
                    ) : (
                        <div>
                            <ProductSearch onAddProduct={handleAddProduct} />

                            <div style={{ marginTop: 20, padding: 15, background: '#FFFBEB', borderRadius: 8, border: '1px solid #FEF3C7', display: 'flex', gap: 10, fontSize: '0.9rem', color: '#92400E' }}>
                                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                                <div>
                                    Manuel eklediğiniz ürünler "Genel" koleksiyonunuza kaydedilir ve buradan affiliate linki oluşturulur.
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

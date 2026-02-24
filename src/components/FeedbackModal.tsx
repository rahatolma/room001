'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { submitFeedback } from '@/actions/feedback';
import { MessageSquare, Bug, Lightbulb, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const { user } = useAuth();
    const pathname = usePathname();
    const [type, setType] = useState('suggestion');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        const res = await submitFeedback({
            content,
            type,
            url: pathname,
            userId: user?.id,
        });
        setIsSubmitting(false);

        if (res.success) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setContent('');
                onClose();
            }, 2000);
        } else {
            alert(res.error || 'Bir hata oluştu.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Geri Bildirim Gönder">
            {isSuccess ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 20px auto' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Teşekkürler!</h3>
                    <p style={{ color: '#666' }}>Geri bildiriminiz başarıyla alındı. Geliştirmelere hemen başlayacağız.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ padding: '10px 20px 20px' }}>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 20 }}>
                        Karşılaştığınız bir hatayı bildirin veya sistemin gelişmesi için önerinizi paylaşın.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                        <button
                            type="button"
                            onClick={() => setType('suggestion')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '12px', borderRadius: 8, border: `2px solid ${type === 'suggestion' ? 'black' : '#eaeaea'}`,
                                background: type === 'suggestion' ? '#f8f9fa' : 'white',
                                cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem'
                            }}
                        >
                            <Lightbulb size={18} color={type === 'suggestion' ? '#eab308' : '#888'} /> Öneri
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('bug')}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '12px', borderRadius: 8, border: `2px solid ${type === 'bug' ? 'black' : '#eaeaea'}`,
                                background: type === 'bug' ? '#fcf0f0' : 'white',
                                cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem'
                            }}
                        >
                            <Bug size={18} color={type === 'bug' ? '#ef4444' : '#888'} /> Hata Bildir
                        </button>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>Mesajınız</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Örn: Mobilden girince butonlar üst üste biniyor... veya Şuraya şöyle bir metrik eklesek çok iyi olur..."
                            style={{
                                width: '100%', minHeight: 120, padding: 15, borderRadius: 8,
                                border: '1px solid #ccc', fontSize: '0.95rem', resize: 'vertical',
                                fontFamily: 'inherit'
                            }}
                            required
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting || !content.trim()} style={{ width: '100%', padding: 16, fontSize: '1rem', background: 'black', color: 'white' }}>
                        {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    </Button>
                </form>
            )}
        </Modal>
    );
}

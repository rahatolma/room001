'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { requestCircleCreation } from '@/actions/circle';
import Button from '@/components/Button';

const initialState = {
    success: false,
    message: '',
};

export default function NewCirclePage() {
    const [state, formAction] = useFormState(requestCircleCreation, initialState);

    return (
        <div style={{ maxWidth: 800, margin: '60px auto', padding: '0 20px', minHeight: '60vh' }}>
            <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', marginBottom: 20 }}>Topluluk Başvurusu</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: 40 }}>
                Kendi topluluğunuzu yönetmek ve benzer zevklere sahip insanları bir araya getirmek için başvurun.
            </p>

            {state.message && (
                <div style={{
                    padding: 20,
                    marginBottom: 30,
                    background: state.success ? '#e8f5e9' : '#ffebee',
                    color: state.success ? '#2e7d32' : '#c62828',
                    borderRadius: 8
                }}>
                    {state.message}
                </div>
            )}

            {!state.success && (
                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Topluluk Adı</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Örn: Minimalist Ev Dekorasyonu"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: 4,
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Açıklama & Vizyon</label>
                        <textarea
                            name="description"
                            required
                            rows={5}
                            placeholder="Bu toplulukta neler paylaşılacak? Kimlere hitap ediyor?"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: 4,
                                fontSize: '1rem',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    <Button variant="primary" type="submit" style={{ alignSelf: 'flex-start', padding: '12px 30px' }}>
                        Başvuruyu Gönder
                    </Button>
                </form>
            )}

            {state.success && (
                <div style={{ marginTop: 20 }}>
                    <a href="/circles" style={{ textDecoration: 'underline' }}>Topluluklara Geri Dön</a>
                </div>
            )}
        </div>
    );
}

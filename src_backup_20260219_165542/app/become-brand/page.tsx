'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitBrandApplication } from '@/actions/creator';
import Link from 'next/link';

export default function BecomeBrandPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState({
        website: '',
        industry: '',
        companySize: '',
        contactRole: ''
    });

    const [submitting, setSubmitting] = useState(false);

    const validateStep = (currentStep: number) => {
        const newErrors: any = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.website) {
                newErrors.website = true;
                isValid = false;
            }
            if (!formData.industry) {
                newErrors.industry = true;
                isValid = false;
            }
        } else if (currentStep === 2) {
            if (!formData.contactRole) {
                newErrors.contactRole = true;
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            if (step < 2) setStep(step + 1);
            else handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
            const result = await submitBrandApplication({
                website: formData.website,
                industry: formData.industry,
                companySize: formData.companySize,
                role: formData.contactRole
            });

            if (result.success) {
                // Show success message or redirect to a thank you page
                alert('Başvurunuz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.');
                router.push('/');
            } else {
                alert('Başvuru başarısız oldu. Lütfen tekrar deneyin.');
            }
        } catch (e) {
            console.error(e);
            alert('Bir hata oluştu.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '80px auto', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            {/* Steps Indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 40 }}>
                {[1, 2].map(s => (
                    <div key={s} style={{
                        width: 30, height: 30, borderRadius: '50%',
                        border: `1px solid ${step > s || step === s ? '#1a1a1a' : '#ccc'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: step > s ? '#1a1a1a' : 'transparent',
                        color: step > s ? 'white' : (step === s ? '#1a1a1a' : '#ccc'),
                        fontWeight: 600
                    }}>
                        {step > s ? '✓' : s}
                    </div>
                ))}
            </div>

            {/* Content per Step */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h1 style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '2.5rem', fontWeight: 800, marginBottom: 10 }}>
                    {step === 1 && 'Marka Olarak Room001 ile Ortak Olun'}
                    {step === 2 && 'Şirketiniz Hakkında'}
                </h1>
                <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: 450, margin: '0 auto' }}>
                    {step === 1 && 'Ürünlerinizi en iyi creator\'lar aracılığıyla milyonlara ulaştırın.'}
                    {step === 2 && 'Size en uygun creator\'ları bulmamıza yardımcı olun.'}
                </p>
            </div>

            <div style={{ background: 'white', padding: 40, border: '1px solid #eaeaea', borderRadius: 8 }}>
                {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <input
                            placeholder="Web Sitesi URL (örn: www.markam.com)"
                            value={formData.website}
                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                            style={{
                                padding: 15, borderRadius: 4,
                                border: errors.website ? '1px solid #e00' : '1px solid #ddd'
                            }}
                        />
                        <select
                            value={formData.industry}
                            onChange={e => setFormData({ ...formData, industry: e.target.value })}
                            style={{
                                padding: 15, borderRadius: 4,
                                border: errors.industry ? '1px solid #e00' : '1px solid #ddd',
                                background: 'white'
                            }}
                        >
                            <option value="">Sektör Seçin</option>
                            <option value="fashion">Moda & Giyim</option>
                            <option value="beauty">Güzellik & Kozmetik</option>
                            <option value="home">Ev & Yaşam</option>
                            <option value="tech">Teknoloji</option>
                            <option value="lifestyle">Yaşam Tarzı</option>
                            <option value="other">Diğer</option>
                        </select>
                    </div>
                )}

                {step === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <input
                            placeholder="Şirketteki Rolünüz (örn: Pazarlama Müdürü)"
                            value={formData.contactRole}
                            onChange={e => setFormData({ ...formData, contactRole: e.target.value })}
                            style={{
                                padding: 15, borderRadius: 4,
                                border: errors.contactRole ? '1px solid #e00' : '1px solid #ddd'
                            }}
                        />
                        <select
                            value={formData.companySize}
                            onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                            style={{ padding: 15, borderRadius: 4, border: '1px solid #ddd', background: 'white' }}
                        >
                            <option value="">Şirket Büyüklüğü (Opsiyonel)</option>
                            <option value="1-10">1-10 Çalışan</option>
                            <option value="11-50">11-50 Çalışan</option>
                            <option value="50+">50+ Çalışan</option>
                        </select>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, alignItems: 'center' }}>
                    {step > 1 ? (
                        <button onClick={handleBack} style={{ background: 'transparent', border: '1px solid #ddd', padding: '12px 24px', borderRadius: 4, cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: 1 }}>Geri</button>
                    ) : (
                        <div /> // Spacer
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                        <button
                            onClick={handleNext}
                            disabled={submitting}
                            style={{
                                background: '#1a1a1a',
                                color: 'white',
                                padding: '14px 40px',
                                borderRadius: 4,
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                fontWeight: 600,
                                opacity: submitting ? 0.7 : 1
                            }}
                        >
                            {submitting ? 'Gönderiliyor...' : (step === 2 ? 'Başvuruyu Tamamla' : 'İleri')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

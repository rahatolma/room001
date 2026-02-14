"use client";

import React from 'react';
import Button from '@/components/Button';
import { Download, Instagram, TrendingUp, Users, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CreatorMediaKitPage() {
    const { user } = useAuth();

    // Mock Stats
    const stats = {
        followers: '24.5K',
        engagement: '4.8%',
        monthlyViews: '150K+',
        avgLikes: '1.2K'
    };

    const handleDownload = () => {
        alert("Medya Kiti PDF olarak hazırlanıyor... (Simülasyon)");
    };

    return (
        <div style={{ maxWidth: 1000 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: 10, fontFamily: 'Playfair Display, serif' }}>Medya Kiti</h1>
                    <p style={{ color: '#666' }}>Markalarla paylaşabileceğiniz profesyonel özetiniz.</p>
                </div>
                <Button onClick={handleDownload}>
                    <Download size={18} style={{ marginRight: 8 }} />
                    PDF İndir
                </Button>
            </div>

            {/* Preview Card */}
            <div style={{ background: 'white', borderRadius: 20, border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ height: 150, background: 'linear-gradient(135deg, #fdfbf7 0%, #f0f0f0 100%)', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: -40, left: 40 }}>
                        <div style={{
                            width: 100, height: 100, borderRadius: '50%', background: '#333',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2rem', color: 'white', border: '5px solid white'
                        }}>
                            {user?.avatarInitials || 'SR'}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '60px 40px 40px 40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 }}>
                        <div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 5 }}>{user?.fullName}</h2>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>Beauty & Lifestyle Creator</p>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ background: '#f8f8f8', padding: '8px 12px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <Instagram size={16} /> @{user?.fullName?.toLowerCase().replace(/\s/g, '') || 'username'}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
                        <div style={{ background: '#fdfbf7', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                            <div style={{ color: '#888', marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <Users size={16} /> Takipçi
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.followers}</div>
                        </div>
                        <div style={{ background: '#fdfbf7', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                            <div style={{ color: '#888', marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <TrendingUp size={16} /> Etkileşim
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.engagement}</div>
                        </div>
                        <div style={{ background: '#fdfbf7', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                            <div style={{ color: '#888', marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <Eye size={16} /> Aylık İzlenme
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.monthlyViews}</div>
                        </div>
                        <div style={{ background: '#fdfbf7', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                            <div style={{ color: '#888', marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <Users size={16} /> Ort. Beğeni
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.avgLikes}</div>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 15 }}>Hakkımda</h3>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            Merhaba! Ben {user?.fullName}. Moda, güzellik ve yaşam tarzı üzerine içerikler üretiyorum.
                            Takipçilerimle samimi ve güvene dayalı bir ilişkim var. Markalarla işbirliği yaparken
                            ürünlerin kalitesine ve takipçilerimin ilgisine önem veriyorum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

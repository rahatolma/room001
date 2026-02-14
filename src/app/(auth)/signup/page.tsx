"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import styles from '../login/page.module.css'; // Reuse login styles

export default function SignupPage() {
    const [email, setEmail] = useState('');
    // The following lines are new based on the instruction's provided JSX
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: 10, fontFamily: 'Playfair Display, serif' }}>Room001'e Katıl</h1>
            <p style={{ marginBottom: 40, color: '#666' }}>Nasıl katılmak istiyorsunuz?</p>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                <RoleCard
                    role="creator"
                    title="İçerik Üreticisi"
                    description="Kendi vitrininizi oluşturun, ürünler önerin ve gelir elde edin."
                    icon="✨"
                    onClick={() => handleRoleSelect('creator')}
                />

                <RoleCard
                    role="user"
                    title="Alışveriş Sever"
                    description="Favori içerik üreticilerinizi takip edin, yeni ürünleri ve markaları keşfedin."
                    icon="🛍️"
                    onClick={() => handleRoleSelect('user')}
                />
            </div>

            <p style={{ marginTop: 40, fontSize: '0.9rem', color: '#999' }}>
                Zaten hesabınız var mı? <a href="/login" style={{ color: 'black', textDecoration: 'underline' }}>Giriş Yap</a>
            </p>

            {selectedRole && (
                // Assuming RegisterModal is imported or defined elsewhere
                // For now, it's commented out to avoid compilation errors if not provided
                // <RegisterModal
                //     isOpen={!!selectedRole}
                //     onClose={() => setSelectedRole(null)}
                //     role={selectedRole}
                // />
                <div>Register Modal Placeholder for role: {selectedRole}</div>
            )}
        </div>
    );
}

const RoleCard = ({ role, title, description, icon, onClick }: any) => (
    <div
        onClick={onClick}
        style={{
            width: 300,
            padding: 30,
            border: '1px solid #ddd',
            borderRadius: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: 'white'
        }}
    >
        <div style={{ fontSize: '2rem', marginBottom: 15 }}>{icon}</div>
        <h3 style={{ marginBottom: 10 }}>{title}</h3>
        <p style={{ color: '#666', lineHeight: 1.5, fontSize: '0.9rem' }}>{description}</p>
    </div>
);

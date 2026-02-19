"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import styles from '../login/page.module.css'; // Reuse login styles

export default function SignupPage() {
    // Redirect to home with signup query param
    if (typeof window !== 'undefined') {
        window.location.href = '/?signup=true';
    }
    return null;
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

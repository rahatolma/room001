"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            login(email);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Giriş Yap</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="email" className={styles.label}>Email Adresi</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        placeholder="ornek@email.com"
                        required
                    />
                </div>
                <Button fullWidth>Giriş Yap</Button>
            </form>
            <p className={styles.footer}>
                Hesabınız yok mu? <a href="/signup">Kayıt Ol</a>
            </p>
        </div>
    );
}

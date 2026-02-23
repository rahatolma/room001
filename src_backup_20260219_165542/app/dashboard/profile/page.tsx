import React from 'react';
import { getSessionAction } from '@/actions/auth';
import { redirect } from 'next/navigation';
import ProfileEditForm from '@/components/ProfileEditForm';

export default async function ProfilePage() {
    const user = await getSessionAction();

    if (!user) {
        redirect('/login');
    }

    return (
        <div style={{ maxWidth: 800 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 10 }}>Profil Düzenle</h1>
            <p style={{ color: '#666', marginBottom: 30 }}>Profil bilgilerinizi ve sosyal medya hesaplarınızı buradan güncelleyebilirsiniz.</p>

            <div style={{ background: 'white', padding: 30, borderRadius: 12, border: '1px solid #eaeaea' }}>
                <ProfileEditForm user={user} />
            </div>
        </div>
    );
}

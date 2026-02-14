"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/Button';
import { useData } from '@/context/DataContext';

export default function PublicMediaKitPage() {
    const params = useParams();
    const slug = params?.creator_slug as string;
    const { getCollectionsByCreator } = useData(); // We can use this to get collections count

    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        // In a real app, we would fetch User by slug from API
        // Here we simulate fetching the user data from localStorage if it matches, 
        // or fallback to mock data

        const storedUser = localStorage.getItem('shopmy_user');
        let userData = storedUser ? JSON.parse(storedUser) : null;

        // simplistic: if the logged in user matches the slug, show their data
        // otherwise show mock data for demo
        if (userData && userData.username === slug) {
            setProfile(userData);
        } else {
            setProfile({
                fullName: slug.charAt(0).toUpperCase() + slug.slice(1),
                bio: 'Deneyimli içerik üreticisi.',
                contactEmail: `contact@${slug}.com`,
                avatarInitials: slug.slice(0, 2).toUpperCase(),
                socialStats: [
                    { platform: 'Instagram', username: `@${slug}`, followers: '125K', engagementRate: '5.2%' },
                    { platform: 'TikTok', username: `@${slug}`, followers: '340K', engagementRate: '8.1%' },
                ]
            });
        }

    }, [slug]);

    if (!profile) return <div>Yükleniyor...</div>;

    const collections = getCollectionsByCreator(slug);
    const totalProducts = collections.reduce((acc, col) => acc + col.products.length, 0);

    return (
        <div style={{ maxWidth: 800, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
            <header style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ width: 100, height: 100, background: '#000', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 20px' }}>
                    {profile.avatarInitials}
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 10 }}>{profile.fullName}</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: 600, margin: '0 auto' }}>{profile.bio}</p>
                <div style={{ marginTop: 20 }}>
                    <a href={`mailto:${profile.contactEmail}`} style={{ color: 'black', textDecoration: 'underline' }}>{profile.contactEmail}</a>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 50 }}>
                {profile.socialStats?.map((stat: any) => (
                    <div key={stat.platform} style={{ padding: 20, border: '1px solid #eee', borderRadius: 8, textAlign: 'center' }}>
                        <h3 style={{ marginBottom: 5 }}>{stat.platform}</h3>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.followers}</div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Takipçi</div>
                        {stat.engagementRate && (
                            <div style={{ marginTop: 5, color: '#4CAF50', fontWeight: 500 }}>
                                {stat.engagementRate} Etkileşim
                            </div>
                        )}
                    </div>
                ))}
                <div style={{ padding: 20, border: '1px solid #eee', borderRadius: 8, textAlign: 'center', background: '#f9f9f9' }}>
                    <h3 style={{ marginBottom: 5 }}>Room001</h3>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{collections.length}</div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>Koleksiyon</div>
                    <div style={{ marginTop: 5 }}>{totalProducts} Ürün</div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Button onClick={() => alert('PDF İndirme simülasyonu: Başarılı!')}>Media Kit İndir (PDF)</Button>
            </div>
        </div>
    );
}

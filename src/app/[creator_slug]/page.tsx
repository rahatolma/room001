
import React from 'react';
import CuratorShop from '@/components/CuratorShop'; // Import the client component
import { getCuratorData } from '@/actions/admin';
import { notFound } from 'next/navigation';

export default async function CreatorPage({ params }: { params: { creator_slug: string } }) {
    const slug = params.creator_slug;
    const data = await getCuratorData(slug);

    if (!data) {
        return notFound();
    }

    const { user, sections, products } = data;
    const diffName = user.fullName || user.username || slug;

    const profile = {
        name: diffName,
        bio: user.bio || "Welcome to my shop!",
        initials: user.avatarInitials || diffName.substring(0, 2).toUpperCase(),
        socials: user.socialStats?.map((s: any) => ({ platform: s.platform, url: s.url })) || []
    };

    return (
        <CuratorShop
            profile={profile}
            sections={sections}
            products={products}
            instagramPosts={data.instagramPosts}
            tiktokPosts={data.tiktokPosts}
        />
    );
}

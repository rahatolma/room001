
import React from 'react';
import CuratorShop from '@/components/CuratorShop'; // Import the client component
import { getCuratorData } from '@/actions/admin';
import { notFound } from 'next/navigation';
import { trackEvent } from '@/actions/analytics';
import { getSessionAction } from '@/actions/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CreatorPage({ params }: { params: Promise<{ creator_slug: string }> }) {
    const { creator_slug } = await params;
    const data = await getCuratorData(creator_slug);

    if (!data || (data as any).error) {
        console.error("Creator page error/not found:", (data as any)?.error);
        return notFound();
    }

    const { user, sections, products } = data as any;
    const session = await getSessionAction();
    const isOwner = session?.id === user.id;

    // Track View
    // Only track if user exists
    if (user?.id) {
        try {
            await trackEvent({
                type: 'VIEW',
                entityId: user.id,
                entityType: 'PROFILE'
            });
        } catch (e) {
            console.error("Tracking error (ignored):", e);
        }
    }

    const diffName = user.fullName || user.username || creator_slug;

    const socials = [];
    if (user.instagramUrl) socials.push({ platform: 'Instagram', url: user.instagramUrl });
    if (user.tiktokUrl) socials.push({ platform: 'TikTok', url: user.tiktokUrl });
    if (user.youtubeUrl) socials.push({ platform: 'YouTube', url: user.youtubeUrl });
    if (user.websiteUrl) socials.push({ platform: 'Website', url: user.websiteUrl });
    if (user.dolapAccountUrl) socials.push({ platform: 'Dolap', url: user.dolapAccountUrl });
    if (user.gardropsAccountUrl) socials.push({ platform: 'Gardrops', url: user.gardropsAccountUrl });

    // Merge with legacy mock socials if needed, but for now prefer DB
    if (socials.length === 0 && user.socialStats) {
        user.socialStats.forEach((s: any) => socials.push({ platform: s.platform, url: s.url }));
    }

    const profile = {
        name: diffName,
        bio: user.bio || "Welcome to my shop!",
        initials: user.avatarInitials || diffName.substring(0, 2).toUpperCase(),
        socials: socials,
        location: user.location
    };

    const theme = user.themePreferences || {
        primaryColor: 'black',
        backgroundColor: 'white',
        
        buttonStyle: 'sharp'
    };

    return (
        <CuratorShop
            profile={profile}
            sections={sections}
            products={products}
            instagramPosts={data.instagramPosts}
            tiktokPosts={data.tiktokPosts}
            theme={theme}
            isOwner={isOwner}
        />
    );
}

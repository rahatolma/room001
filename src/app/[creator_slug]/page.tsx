
import React from 'react';
import CuratorShop from '@/components/CuratorShop'; // Import the client component
import { getCuratorData } from '@/actions/admin';
import { notFound } from 'next/navigation';
import { trackEvent } from '@/actions/analytics';
import { getSessionAction } from '@/actions/auth';
import { getActiveNativeAds } from '@/actions/ads';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CreatorPage({ params }: { params: Promise<{ creator_slug: string }> }) {
    const { creator_slug } = await params;
    const [data, session, adsRes] = await Promise.all([
        getCuratorData(creator_slug),
        getSessionAction(),
        getActiveNativeAds()
    ]);

    if (!data || (data as any).error) {
        console.error("Creator page error/not found:", (data as any)?.error);
        return notFound();
    }

    const { user, sections, products } = data as any;

    // Serialize the user object to avoid passing Prisma Decimal or Date objects directly to Client Component
    const safeUser = JSON.parse(JSON.stringify(user));
    const isOwner = session?.id === safeUser.id;

    // Track View without blocking render
    if (user?.id) {
        trackEvent({
            type: 'VIEW',
            entityId: user.id,
            entityType: 'PROFILE'
        }).catch(e => console.error("Tracking error (ignored):", e));
    }

    const diffName = safeUser.fullName || safeUser.username || creator_slug;

    const socials = [];
    if (safeUser.instagramUrl) socials.push({ platform: 'Instagram', url: safeUser.instagramUrl });
    if (safeUser.tiktokUrl) socials.push({ platform: 'TikTok', url: safeUser.tiktokUrl });
    if (safeUser.youtubeUrl) socials.push({ platform: 'YouTube', url: safeUser.youtubeUrl });
    if (safeUser.websiteUrl) socials.push({ platform: 'Website', url: safeUser.websiteUrl });
    if (safeUser.dolapAccountUrl) socials.push({ platform: 'Dolap', url: safeUser.dolapAccountUrl });
    if (safeUser.gardropsAccountUrl) socials.push({ platform: 'Gardrops', url: safeUser.gardropsAccountUrl });

    // Merge with legacy mock socials if needed, but for now prefer DB
    if (socials.length === 0 && safeUser.socialStats) {
        safeUser.socialStats.forEach((s: any) => socials.push({ platform: s.platform, url: s.url }));
    }

    const profile = {
        name: diffName,
        username: safeUser.username || creator_slug,
        bio: safeUser.bio || "Welcome to my shop!",
        initials: safeUser.avatarInitials || diffName.substring(0, 2).toUpperCase(),
        socials: socials,
        location: safeUser.location
    };

    const theme = safeUser.themePreferences || {
        primaryColor: 'black',
        backgroundColor: 'white',

        buttonStyle: 'sharp'
    };

    return (
        <CuratorShop
            profile={profile}
            sections={sections}
            products={products}
            instagramPosts={(data as any).instagramPosts}
            tiktokPosts={(data as any).tiktokPosts}
            theme={theme}
            isOwner={isOwner}
            ads={adsRes.ads || []}
        />
    );
}

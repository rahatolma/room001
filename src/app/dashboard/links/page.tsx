
import React from 'react';
import { getSessionAction } from '@/actions/auth';
import { getCreatorLinks, getPerformanceByWebsite } from '@/actions/analytics';
import { redirect } from 'next/navigation';
import LinksTabs from '@/components/dashboard/LinksTabs';

export default async function MyLinksPage() {
    const session = await getSessionAction();

    if (!session) {
        redirect('/login');
    }

    const links = await getCreatorLinks(session.id);
    const performance = await getPerformanceByWebsite(session.id);

    return (
        <div style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: 60 }}>
            {/* Header / Tabs */}
            <div style={{ marginBottom: 30 }}>
                {/* LinksTabs handles the UI and Tabs */}
                {/* We pass the server-side fetched data */}
                <LinksTabs initialLinks={links} initialPerformance={performance} />
            </div>
        </div>
    );
}

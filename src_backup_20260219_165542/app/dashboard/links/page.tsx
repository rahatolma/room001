
import React from 'react';
import { getSessionAction } from '@/actions/auth';
import { getCreatorLinks, getPerformanceByWebsite } from '@/actions/analytics';
import { redirect } from 'next/navigation';
import LinksTabs from '@/components/dashboard/LinksTabs';
import ToastHandler from '@/components/ToastHandler';


interface MyLinksPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MyLinksPage({ searchParams }: MyLinksPageProps) {
    const session = await getSessionAction();
    const params = await searchParams;

    if (!session) {
        redirect('/login');
    }

    const links = await getCreatorLinks(session.id);
    const performance = await getPerformanceByWebsite(session.id);

    return (
        <div style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: 60 }}>
            <ToastHandler toastParam={params.toast as string} />
            {/* Header / Tabs */}
            <div style={{ marginBottom: 30 }}>
                {/* LinksTabs handles the UI and Tabs */}
                {/* We pass the server-side fetched data */}
                <LinksTabs initialLinks={links} initialPerformance={performance} />
            </div>
        </div>
    );
}


import { getFeaturedCurators, getContent, getAllUsers } from '@/actions/admin';

export const revalidate = 0;

export default async function DebugPage() {
    const curators = await getFeaturedCurators();
    const content = await getContent();
    const users = await getAllUsers();

    return (
        <div style={{ padding: 40, fontFamily: 'monospace' }}>
            <h1>Debug Info</h1>

            <h2>Featured Curators ({curators.length})</h2>
            <pre style={{ background: '#f0f0f0', padding: 20, borderRadius: 8 }}>
                {JSON.stringify(curators, null, 2)}
            </pre>

            <h2>Content.json Featured IDs</h2>
            <pre style={{ background: '#f0f0f0', padding: 20, borderRadius: 8 }}>
                {JSON.stringify(content?.sections?.curators?.featuredIds, null, 2)}
            </pre>

            <h2>All Users ({users.length})</h2>
            <pre style={{ background: '#f0f0f0', padding: 20, borderRadius: 8 }}>
                {JSON.stringify(users.map((u: any) => ({ id: u.id, username: u.username, slug: u.slug })), null, 2)}
            </pre>
        </div>
    );
}

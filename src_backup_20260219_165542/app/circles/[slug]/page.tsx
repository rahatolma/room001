import { getCircleBySlug } from '@/actions/admin';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getCircleMembershipStatus } from '@/actions/circle';
import JoinCircleButton from '@/components/JoinCircleButton';

export default async function CirclePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const circle = await getCircleBySlug(slug);

    if (!circle) return notFound();

    let membershipStatus = null;
    if (circle.isDbBacked) {
        membershipStatus = await getCircleMembershipStatus(circle.id);
    }

    return (
        <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                {circle.image && (
                    <img src={circle.image} alt={circle.name} style={{ width: 120, height: 120, objectFit: 'cover', margin: '0 auto 20px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                )}
                <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3.5rem', marginBottom: 10 }}>{circle.name}</h1>
                <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: 20 }}>{circle.description || 'Bu topluluğun üyelerini keşfet.'}</p>

                {circle.isDbBacked && (
                    <JoinCircleButton
                        circleId={circle.id}
                        initialStatus={membershipStatus}
                        isDbBacked={!!circle.isDbBacked}
                    />
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20
            }}>
                {circle.curators.map((curator: any) => (
                    <Link key={curator.id} href={`/${curator.username}`} style={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', marginBottom: 10 }}>
                            <img
                                src={curator.image}
                                alt={curator.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.2rem', margin: 0 }}>{curator.name}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>@{curator.username}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

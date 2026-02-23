import { getCircleBySlug } from '@/actions/admin';
import GenericShopTemplate from '@/components/GenericShopTemplate';
import { notFound } from 'next/navigation';
import { getCircleMembershipStatus } from '@/actions/circle';

export default async function CirclePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const circle = await getCircleBySlug(slug);

    if (!circle) return notFound();

    let membershipStatus = null;
    if (circle.isDbBacked) {
        membershipStatus = await getCircleMembershipStatus(circle.id);
    }

    return (
        <GenericShopTemplate
            title={circle.name}
            roleLabel="TOPLULUK KÜRATÖRLERİ"
            avatarImage={circle.image}
            statsText={`${circle.curators?.length || 0} küratör bu toplulukta`}
            products={circle.products || []}
            buttonText="KATIL"
        />
    );
}

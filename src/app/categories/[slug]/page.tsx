import { getCategoryBySlug } from '@/actions/admin';
import GenericShopTemplate from '@/components/GenericShopTemplate';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) return notFound();

    return (
        <GenericShopTemplate
            title={category.name}
            roleLabel="KATEGORİ SEÇKİSİ"
            avatarImage={category.image}
            statsText="Tüm küratörlerin bu kategorideki favorileri"
            products={category.products || []}
            buttonText="TAKİP ET"
        />
    );
}

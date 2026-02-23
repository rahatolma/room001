import { getBrandBySlug } from '@/actions/admin';
import GenericShopTemplate from '@/components/GenericShopTemplate';
import { notFound } from 'next/navigation';

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const brand = await getBrandBySlug(slug);

    if (!brand) return notFound();

    // Transform products to match ProductGrid interface if needed
    const displayProducts = brand.products.map((p: any) => ({
        ...p,
        brand: brand.name, // Ensure brand name is set
        curator: p.curator || { name: 'ShopMy', avatar: '' }
    }));

    return (
        <GenericShopTemplate
            title={brand.name}
            roleLabel="MARKA SEÇKİSİ"
            avatarImage={brand.image}
            statsText={`${brand.name} ürünleri ve öne çıkanlar`}
            products={displayProducts}
            buttonText="TAKİP ET"
        />
    );
}

import ShopByPageLayout from '@/components/ShopByPageLayout';
import { getFeaturedCurators } from '@/actions/admin';

export default async function CuratorsPage() {
    const featuredCurators = await getFeaturedCurators();

    return (
        <ShopByPageLayout
            title="INSIDER"
            subtitle="Göz At"
            featuredItems={featuredCurators.slice(0, 5)}
            items={featuredCurators.slice(5)}
            type="curator"
        />
    );
}

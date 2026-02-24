import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredBrands } from '@/lib/shopData';

export default function BrandsPage() {
    return (
        <ShopByPageLayout
            title="MARKA"
            subtitle="Göz At"
            featuredItems={featuredBrands.slice(0, 5)}
            items={featuredBrands}
            type="brand"
        />
    );
}

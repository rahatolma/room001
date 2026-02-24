import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredProducts } from '@/lib/shopData';

export default function ProductsPage() {
    return (
        <ShopByPageLayout
            title="ÜRÜNLER"
            subtitle="Keşfet"
            featuredItems={featuredProducts.slice(0, 5)}
            items={featuredProducts}
            type="category" // We reuse category type for now for generic behavior
        />
    );
}

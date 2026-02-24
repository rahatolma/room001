import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredCategories } from '@/lib/shopData';

export default function CategoriesPage() {
    return (
        <ShopByPageLayout
            title="Kategori"
            subtitle="Göz At"
            featuredItems={featuredCategories.slice(0, 5)}
            items={featuredCategories}
            type="category"
        />
    );
}

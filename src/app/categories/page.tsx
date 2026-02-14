import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredCategories } from '@/lib/shopData';

export default function CategoriesPage() {
    return (
        <ShopByPageLayout
            title="Kategori"
            subtitle="Göz At"
            heroTitle="Kolyeler"
            heroDescription="Size özel öneriler"
            heroImage="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000"
            items={featuredCategories}
            type="category"
        />
    );
}

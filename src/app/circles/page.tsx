import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredCircles } from '@/lib/shopData';

export default function CirclesPage() {
    return (
        <ShopByPageLayout
            title="Çember"
            subtitle="Göz At"
            featuredItems={featuredCircles.slice(0, 5)}
            items={featuredCircles.slice(5)}
            type="circle"
        />
    );
}

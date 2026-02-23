import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredCircles } from '@/lib/shopData';

export default function CirclesPage() {
    return (
        <ShopByPageLayout
            title="Çember"
            subtitle="Göz At"
            heroTitle="Stilistler"
            heroDescription="Kırmızı halı ikonlarından editoryal uzmanlara ve kişisel stil devlerine kadar, modanın en iyi stilistlerinden güvenilir seçimleri keşfedin."
            heroImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000"
            items={featuredCircles}
            type="circle"
        />
    );
}

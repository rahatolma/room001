import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredBrands } from '@/lib/shopData';

export default function BrandsPage() {
    return (
        <ShopByPageLayout
            title="Marka"
            subtitle="Göz At"
            heroTitle="PORTA"
            heroDescription="PORTA'da, günlük yaşamı destekleyen objelerde biçim ve işlev bir araya geliyor. İster basit bir yemek ister şenlikli bir toplantı olsun, her parça anı güzelleştirmek ve insanları bir araya getirmek için özenle tasarlandı."
            heroImage="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000"
            items={featuredBrands}
            type="brand"
        />
    );
}

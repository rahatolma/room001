import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredMagazines } from '@/lib/shopData';

export default function MagazinesPage() {
    return (
        <ShopByPageLayout
            title="DERGİ"
            subtitle="Oku & Keşfet"
            featuredItems={featuredMagazines.slice(0, 5)}
            items={featuredMagazines}
            type="category" // Reusing category type for generic behavior
        />
    );
}

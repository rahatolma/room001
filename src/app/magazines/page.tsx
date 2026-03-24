import ShopByPageLayout from '@/components/ShopByPageLayout';
import { getPublicMagazines } from '@/actions/magazine';

export const dynamic = 'force-dynamic';

export default async function MagazinesPage() {
    const magazines = await getPublicMagazines();
    console.log('Magazines fetched on server:', magazines.length, magazines);

    return (
        <ShopByPageLayout
            title="DERGİ"
            subtitle="Oku & Keşfet"
            featuredItems={magazines.slice(0, 5)}
            items={magazines}
            type="category" // Reusing category type for generic behavior
        />
    );
}

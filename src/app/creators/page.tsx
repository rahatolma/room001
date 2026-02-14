import ShopByPageLayout from '@/components/ShopByPageLayout';
import { featuredCurators } from '@/lib/shopData';

export default function CuratorsPage() {
    return (
        <ShopByPageLayout
            title="Küratör"
            subtitle="Göz At"
            heroTitle="Sofia Richie Grainge"
            heroDescription="Vogue tarafından modern bir güzellik ilham perisi olarak kabul edilen Sofia, sade zarafet ve sessiz lükse dayanan zamansız moda ve güzelliği kürate ediyor. Stil anı kültür boyunca dalgalanıyor ve bir nesil için yeni standartlar belirliyor."
            heroImage="https://images.unsplash.com/photo-1611601679655-7c642d4735fb?q=80&w=1000"
            heroSlug="sofia-richie"
            items={featuredCurators}
            type="curator"
        />
    );
}

import ShopByPageLayout from '@/components/ShopByPageLayout';
import { getFeaturedCurators } from '@/actions/admin';

export default async function CuratorsPage() {
    const featuredCurators = await getFeaturedCurators();

    return (
        <ShopByPageLayout
            title="INSIDER"
            subtitle="Göz At"
            heroTitle="Sofia Richie Grainge"
            heroDescription="Vogue tarafından modern bir güzellik ilham perisi olarak kabul edilen Sofia, sade zarafet ve sessiz lükse dayanan zamansız moda ve güzelliği kürate ediyor. Stil anı kültür boyunca dalgalanıyor ve bir nesil için yeni standartlar belirliyor."
            heroImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000"
            heroSlug="sofia-richie"
            items={featuredCurators}
            type="curator"
        />
    );
}

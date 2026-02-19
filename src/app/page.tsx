import { getContent, getFeaturedCurators, getCircles, getCategories, getBrands } from '@/actions/admin';
import CuratorGrid from '@/components/landing/CuratorGrid';
import CircleGrid from '@/components/landing/CircleGrid';
import CategoryGrid from '@/components/landing/CategoryGrid';
import BrandGrid from '@/components/landing/BrandGrid';
import ManifestoSlider from '@/components/landing/ManifestoSlider';
import ProductGrid from '@/components/landing/ProductGrid';
import MagazineSection from '@/components/landing/MagazineSection';
import { getLatestProducts } from '@/actions/product';

export default async function Home() {
  const content = await getContent();
  const curators = await getFeaturedCurators();
  const circles = await getCircles();
  const categories = await getCategories();
  const brands = await getBrands();
  const products = await getLatestProducts();

  return (
    <main style={{ background: '#fff' }}>
      <ManifestoSlider />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 20px' }}>
        <CuratorGrid curators={curators} hero={content?.hero} />
      </div>

      <MagazineSection />

      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>
          <CircleGrid items={circles} />
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 20px' }}>
        <ProductGrid items={products} />
      </div>

      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>
          <CategoryGrid items={categories} />
        </div>
      </div>

      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>
          <BrandGrid items={brands} />
        </div>
      </div>
    </main>
  );
}

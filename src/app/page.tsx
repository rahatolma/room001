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

      {/* 1. Insiderler */}
      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
          <CuratorGrid curators={curators} hero={content?.hero} />
        </div>
      </div>

      {/* 2. Markalar */}
      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
          <BrandGrid items={brands} />
        </div>
      </div>

      {/* 3. Topluluklar */}
      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
          <CircleGrid items={circles} />
        </div>
      </div>

      {/* 4. Dergiler */}
      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
          <MagazineSection />
        </div>
      </div>

      {/* 5. Kategoriler */}
      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
          <CategoryGrid items={categories} />
        </div>
      </div>

      {/* 6. Ürünler */}
      <div style={{ background: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>
          <ProductGrid items={products} />
        </div>
      </div>
    </main>
  );
}

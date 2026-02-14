import { getContent, getFeaturedCurators, getCircles, getCategories, getBrands } from '@/actions/admin';
import CuratorGrid from '@/components/landing/CuratorGrid';
import CircleGrid from '@/components/landing/CircleGrid';
import CategoryGrid from '@/components/landing/CategoryGrid';
import BrandGrid from '@/components/landing/BrandGrid';

export default async function Home() {
  const content = await getContent();
  const curators = await getFeaturedCurators();
  const circles = await getCircles();
  const categories = await getCategories();
  const brands = await getBrands();

  return (
    <main style={{ background: '#fff' }}>
      <CuratorGrid hero={content?.hero} curators={curators} />
      <div style={{ height: 100 }} />
      <CircleGrid items={circles} />
      <CategoryGrid items={categories} />
      <BrandGrid items={brands} />
      <div style={{ height: 100 }} />
    </main>
  );
}

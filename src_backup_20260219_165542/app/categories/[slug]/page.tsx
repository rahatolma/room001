import { getCategoryBySlug } from '@/actions/admin';
import ProductGrid from '@/components/ProductGrid';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) return notFound();

    return (
        <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                {category.image && (
                    <img src={category.image} alt={category.name} style={{ width: 120, height: 160, objectFit: 'cover', margin: '0 auto 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                )}
                <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3.5rem', marginBottom: 10 }}>{category.name}</h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Bu kategorideki en popüler ürünler.</p>
            </div>

            <ProductGrid products={category.products} />
        </div>
    );
}

import { getBrandBySlug } from '@/actions/admin';
import ProductGrid from '@/components/ProductGrid';
import { notFound } from 'next/navigation';

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const brand = await getBrandBySlug(slug);

    if (!brand) return notFound();

    // Transform products to match ProductGrid interface if needed
    // The details from admin.ts mock match the ProductGrid 'Product' interface closely
    const displayProducts = brand.products.map((p: any) => ({
        ...p,
        brand: brand.name, // Ensure brand name is set
        curator: p.curator || { name: 'ShopMy', avatar: '' }
    }));

    return (
        <div style={{ padding: '40px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                {brand.image && (
                    <img src={brand.image} alt={brand.name} style={{ width: 120, height: 160, objectFit: 'cover', margin: '0 auto 20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                )}
                <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3.5rem', marginBottom: 10 }}>{brand.name}</h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Bu markanın öne çıkan ürünleri ve küratör favorileri.</p>
            </div>

            <ProductGrid products={displayProducts} />
        </div>
    );
}


import React from 'react';
import { searchGlobal } from '@/actions/search';
import Link from 'next/link';
import Image from 'next/image';
import ShopGrid from '@/components/ShopGrid';

export default async function SearchPage(props: {
    searchParams: Promise<{ q: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || '';
    const results = await searchGlobal(query, 50);

    const curators = results.filter((r) => r.type === 'curator');
    const products = results.filter((r) => r.type === 'product');
    const brands = results.filter((r) => r.type === 'brand');

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '10px' }}>
                "{query}" için sonuçlar
            </h1>
            <p style={{ color: '#666', marginBottom: '40px' }}>
                {results.length} sonuç bulundu
            </p>

            {/* CURATORS SECTION */}
            {curators.length > 0 && (
                <section style={{ marginBottom: '60px' }}>
                    <h2
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 400,
                            marginBottom: '20px',
                            borderBottom: '1px solid #eee',
                            paddingBottom: '10px',
                        }}
                    >
                        Küratörler
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        {curators.map((curator) => (
                            <Link
                                key={curator.id}
                                href={curator.url}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <div
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {curator.image && (
                                        <Image
                                            src={curator.image}
                                            alt={curator.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                                    {curator.title}
                                </div>
                                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                    {curator.subtitle}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* BRANDS SECTION */}
            {brands.length > 0 && (
                <section style={{ marginBottom: '60px' }}>
                    <h2
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 400,
                            marginBottom: '20px',
                            borderBottom: '1px solid #eee',
                            paddingBottom: '10px',
                        }}
                    >
                        Markalar
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: '20px',
                        }}
                    >
                        {brands.map((brand) => (
                            <Link
                                key={brand.id}
                                href={brand.url}
                                style={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    textAlign: 'center',
                                    transition: 'background 0.2s',
                                }}
                            >
                                <div style={{ fontWeight: 600, fontSize: '1rem' }}>
                                    {brand.title}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* PRODUCTS SECTION */}
            {products.length > 0 && (
                <section>
                    <h2
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 400,
                            marginBottom: '20px',
                            borderBottom: '1px solid #eee',
                            paddingBottom: '10px',
                        }}
                    >
                        Ürünler
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '30px',
                        }}
                    >
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={product.url}
                                target="_blank"
                                style={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '0.8',
                                    position: 'relative',
                                    marginBottom: '10px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                }}>
                                    {product.image && (
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666', marginBottom: 4 }}>
                                    {product.subtitle}
                                </div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: '1.3' }}>
                                    {product.title}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {results.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
                    <h2 style={{ fontWeight: 300 }}>Sonuç bulunamadı</h2>
                    <p>"{query}" için herhangi bir sonuç bulamadık.</p>
                </div>
            )}
        </div>
    );
}

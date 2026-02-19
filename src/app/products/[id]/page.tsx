import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Button from '@/components/Button';
import { ExternalLink, ShoppingBag, ArrowLeft, Star } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import ProductGrid from '@/components/landing/ProductGrid';
import { checkIsFavorited } from '@/actions/favorite';

async function getProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            brand: true,
            collectionItems: {
                include: {
                    collection: {
                        include: {
                            user: true
                        }
                    }
                },
                take: 1 // Just take the first curator/collection for now
            }
        }
    });
    return product;
}

async function getRelatedProducts(currentProductId: string, collectionId?: string) {
    if (!collectionId) return [];

    const items = await prisma.collectionItem.findMany({
        where: {
            collectionId,
            productId: { not: currentProductId }
        },
        include: {
            product: {
                include: { brand: true }
            }
        },
        take: 4
    });

    return items.map(item => ({
        id: item.product.id,
        title: item.product.title,
        brand: item.product.brand?.name || 'Unknown',
        price: item.product.price?.toString() || '0',
        currency: item.product.currency,
        imageUrl: item.product.imageUrl || '',
        url: item.product.productUrl
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const curatorItem = product.collectionItems[0];
    const curator = curatorItem?.collection?.user;
    const curatorNote = curatorItem?.curatorComment;
    const collectionId = curatorItem?.collectionId;

    // Fetch related products
    const relatedProducts = await getRelatedProducts(id, collectionId);

    // Check if favorited
    const isFavorited = await checkIsFavorited(id);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: currency }).format(amount);
    };

    return (
        <main style={{ background: '#fff', minHeight: '100vh', paddingBottom: 80 }}>
            {/* Breadcrumb / Back */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 20px 0' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} style={{ marginRight: 5 }} />
                    Ana Sayfaya Dön
                </Link>
            </div>

            <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60 }}>

                {/* Image Section */}
                <div style={{ position: 'relative', aspectRatio: '0.8', background: '#f9f9f9', borderRadius: 16, overflow: 'hidden' }}>
                    <Image
                        src={product.imageUrl || 'https://via.placeholder.com/600'}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                {/* Details Section */}
                <div>
                    {/* Brand */}
                    {product.brand && (
                        <div style={{ marginBottom: 10 }}>
                            <Link href={`/brands/${product.brand.slug}`} style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', color: '#666', fontWeight: 600, textDecoration: 'none' }}>
                                {product.brand.name}
                            </Link>
                        </div>
                    )}

                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-playfair), serif', marginBottom: 20, lineHeight: 1.2 }}>
                        {product.title}
                    </h1>

                    <div style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: 30, color: '#000' }}>
                        {formatCurrency(Number(product.price), product.currency)}
                    </div>

                    {/* Curator Note (if exists) */}
                    {curatorNote && (
                        <div style={{ background: '#f8f9fa', padding: 25, borderRadius: 12, marginBottom: 30, borderLeft: '4px solid #000' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                {curator?.avatarUrl ? (
                                    <Image src={curator.avatarUrl} alt={curator.username || ''} width={30} height={30} style={{ borderRadius: '50%', marginRight: 10 }} />
                                ) : (
                                    <div style={{ width: 30, height: 30, background: '#ddd', borderRadius: '50%', marginRight: 10 }} />
                                )}
                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                    {curator?.fullName || curator?.username || 'Bir Küratör'} diyor ki:
                                </span>
                            </div>
                            <p style={{ fontStyle: 'italic', color: '#444', lineHeight: 1.6, fontSize: '1.05rem' }}>
                                "{curatorNote}"
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 15, marginBottom: 40 }}>
                        <a href={product.productUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                            <Button style={{ width: '100%', padding: '18px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ShoppingBag size={20} style={{ marginRight: 10 }} />
                                Satın Al / İncele
                                <ExternalLink size={16} style={{ marginLeft: 10, opacity: 0.7 }} />
                            </Button>
                        </a>
                        <FavoriteButton productId={product.id} initialIsFavorited={isFavorited} />
                    </div>

                    {/* Description (if exists) */}
                    {product.description && (
                        <div style={{ borderTop: '1px solid #eee', paddingTop: 30 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 15 }}>Ürün Detayları</h3>
                            <p style={{ color: '#555', lineHeight: 1.6 }}>{product.description}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div style={{ maxWidth: 1200, margin: '80px auto 0', padding: '0 20px', borderTop: '1px solid #eee', paddingTop: 60 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
                        <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-playfair), serif', textTransform: 'capitalize' }}>
                            {curator ? `${(curator.fullName || curator.username || 'Küratör').replace(/-/g, ' ')} Tarafından Diğer Seçimler` : 'Benzer Ürünler'}
                        </h2>
                    </div>
                    <ProductGrid items={relatedProducts} showHeader={false} />
                </div>
            )}

        </main>
    );
}

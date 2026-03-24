import React from 'react';
import ProductCard from './ProductCard';
import NativeAdSlot from './ads/NativeAdSlot';

interface Product {
    id: string;
    image: string;
    brand: string;
    title: string;
    price: string;
    curator: {
        name: string;
        avatar: string;
    };
    collectionItemId?: string;
}

interface ProductGridProps {
    products: Product[];
    ads?: any[];
}

export default function ProductGrid({ products, ads = [] }: ProductGridProps) {
    return (
        <div className="responsive-product-grid" style={{ padding: '40px 0' }}>
            {products.map((product, index) => {
                const showAd = ads.length > 0 && index !== 0 && index % 4 === 0;
                const adToDisplay = showAd ? ads[(index / 4 - 1) % ads.length] : null;

                return (
                    <React.Fragment key={product.id}>
                        <ProductCard {...product} />
                        {showAd && adToDisplay && (
                            <NativeAdSlot ad={adToDisplay} orientation="vertical" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

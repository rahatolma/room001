import React from 'react';
import ProductCard from './ProductCard';

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
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            columnGap: 20,
            rowGap: 60,
            padding: '40px 0'
        }}>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
}

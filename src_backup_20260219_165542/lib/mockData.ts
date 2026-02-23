import { Product } from '@/types';

export const MOCK_BRANDS = [
    { id: 'nike', name: 'Nike', logo: 'N' },
    { id: 'sephora', name: 'Sephora', logo: 'S' },
    { id: 'apple', name: 'Apple', logo: 'A' },
    { id: 'ikea', name: 'IKEA', logo: 'I' },
    { id: 'zara', name: 'Zara', logo: 'Z' },
];

export const MOCK_PRODUCTS: Product[] = [
    // Fashion
    { id: 'p1', name: 'Air Force 1', brand: 'Nike', imageUrl: '', link: 'https://nike.com' },
    { id: 'p2', name: 'Basic T-Shirt', brand: 'Zara', imageUrl: '', link: 'https://zara.com' },
    { id: 'p3', name: 'Oversized Hoodie', brand: 'Zara', imageUrl: '', link: 'https://zara.com' },

    // Beauty
    { id: 'p4', name: 'Repair Oil', brand: 'Sephora', imageUrl: '', link: 'https://sephora.com' },
    { id: 'p5', name: 'Matte Lipstick', brand: 'Sephora', imageUrl: '', link: 'https://sephora.com' },

    // Tech
    { id: 'p6', name: 'iPhone 15 Pro', brand: 'Apple', imageUrl: '', link: 'https://apple.com' },
    { id: 'p7', name: 'AirPods Pro', brand: 'Apple', imageUrl: '', link: 'https://apple.com' },

    // Home
    { id: 'p8', name: 'Billy Bookcase', brand: 'IKEA', imageUrl: '', link: 'https://ikea.com' },
    { id: 'p9', name: 'Markus Chair', brand: 'IKEA', imageUrl: '', link: 'https://ikea.com' },
];

export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
    );
};

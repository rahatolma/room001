export interface GridItem {
    id: string;
    title: string;
    subtitle?: string; // e.g., "Stylist", "Dermatologist"
    imageUrl: string;
    slug: string;
}

export interface ShopPyPageProps {
    title: string; // e.g., "Mücevher" (Jewelry) or "Curator"
    description?: string;
    heroImage: string;
    items: GridItem[];
    type: 'curator' | 'circle' | 'brand' | 'category';
}

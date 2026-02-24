import React from 'react';
import ImageFallback from './ImageFallback';
import Link from 'next/link';
import { GridItem } from '@/types/shop';
import FeaturedSlider from './FeaturedSlider';

interface ShopByPageLayoutProps {
    title: string;
    subtitle?: string;
    featuredItems: GridItem[];
    items: GridItem[];
    type: 'curator' | 'circle' | 'brand' | 'category';
}

const ShopByPageLayout: React.FC<ShopByPageLayoutProps> = ({
    title,
    subtitle = "Göz At",
    featuredItems,
    items,
    type
}) => {
    // Helper for Turkish grammar (roughly)
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'curator': return 'Insiderlar';
            case 'circle': return 'Kolektifler';
            case 'brand': return 'Markalar';
            case 'category': return 'Kategoriler';
            default: return type;
        }
    }

    const getItemLink = (item: GridItem) => {
        if (type === 'curator') {
            return `/${item.slug}`;
        }
        if (type === 'brand') {
            return `/brands/${item.slug}`;
        }
        if (type === 'circle') {
            return `/circles/${item.slug}`;
        }
        if (type === 'category') {
            return `/categories/${item.slug}`;
        }
        return `/${type}/${item.slug}`;
    }

    return (
        <div style={{ paddingBottom: 80, backgroundColor: '#fff' }}>
            {/* NEW FULL WIDTH FEATURED SLIDER */}
            <FeaturedSlider items={featuredItems} type={type} />

            <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--page-padding-x)' }}>

                {/* Grid Section */}
                <div style={{ padding: '0' }}>
                    <h3 style={{

                        fontWeight: 700,
                        fontSize: '1.5rem',
                        marginBottom: 40,
                        borderTop: '1px solid #eee',
                        paddingTop: 40
                    }}>
                        Öne Çıkan {getTypeLabel(type)}
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 40
                    }}>
                        {items.map(item => (
                            <Link key={item.id} href={getItemLink(item)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative', aspectRatio: '3/4', marginBottom: 20, overflow: 'hidden' }}>
                                    <ImageFallback
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'Transform 0.5s' }}
                                    />

                                    <div style={{
                                        position: 'absolute', bottom: 30, left: 20, right: 20,
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 700,

                                        lineHeight: 1.1
                                    }}>
                                        {item.title}
                                    </div>
                                </div>
                            </Link >
                        ))}
                    </div >
                </div >
            </div >
        </div >
    );
};

export default ShopByPageLayout;

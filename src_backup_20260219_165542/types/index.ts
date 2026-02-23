export interface SocialStats {
    platform: 'Instagram' | 'TikTok' | 'YouTube';
    username: string;
    followers: string; // e.g., "1.2M"
    engagementRate?: string; // e.g., "5.4%"
}

export interface User {
    id: string;
    username: string;
    email: string;
    fullName: string;
    bio?: string;
    avatarInitials?: string;
    socialStats?: SocialStats[];
    contactEmail?: string;
    password?: string; // Stored in users.json
    themePreferences?: ThemePreferences;

    niche?: string; // e.g. "Stylist", "Dermatologist"
    featuredImage?: string; // URL for the landing page portrait
    isFeatured?: boolean;
    role?: 'shopper' | 'creator' | 'admin' | 'brand';
    permissions?: { role: string }; // For legacy/nested structure support
    instagramConnected?: boolean;

    // Extended profile fields
    avatarUrl?: string;
    websiteUrl?: string;
    location?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    youtubeUrl?: string;
    dolapAccountUrl?: string;
    gardropsAccountUrl?: string;
    totalEarnings?: number;
}

export interface ThemePreferences {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
    buttonStyle: 'rounded' | 'sharp' | 'pill';
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
    link: string;
    clicks?: number;
    earnings?: number;
}

export interface Collection {
    id: string;
    creatorId: string;
    title: string;
    subtitle?: string;
    products: Product[];
    imageAlt?: string; // usually first product image
    category?: string;
}

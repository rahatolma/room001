'use server';

import fs from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

// --- File Paths (Legacy / Static Content) ---
const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');
const INSTAGRAM_FILE_PATH = path.join(process.cwd(), 'data', 'instagram_posts.json');
const TIKTOK_FILE_PATH = path.join(process.cwd(), 'data', 'tiktok_posts.json');

// --- Helper: Read JSON (for non-migrated data) ---
async function readJsonFile(filePath: string) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// --- Content Actions (CMS) ---
export async function getContent() {
    try {
        const data = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading content:", error);
        return null;
    }
}

export async function updateContent(newContent: any) {
    try {
        await fs.writeFile(CONTENT_FILE_PATH, JSON.stringify(newContent, null, 2), 'utf-8');
        return { success: true };
    } catch (error) {
        console.error("Error updating content:", error);
        return { success: false, error: 'Failed to update content' };
    }
}

// --- User Actions ---

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany();
        return users.map(u => ({
            ...u,
            profileImage: u.avatarUrl, // Map avatarUrl to profileImage for frontend compatibility
            role: u.role || 'creator'
        }));
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        return [];
    }
}

export async function getFeaturedCurators() {
    try {
        const content = await getContent();
        const featuredIds = content?.sections?.curators?.featuredIds || [];

        // Fetch users from DB
        let users = await prisma.user.findMany({
            where: {
                OR: [
                    { id: { in: featuredIds } },
                    { username: { in: featuredIds } },
                    // Also check slug if we had it, but username is close enough for now
                ]
            }
        });

        // Fallback: If no specific featured curators found, fetch any 8 users
        if (users.length === 0) {
            users = await prisma.user.findMany({
                take: 8,
                orderBy: { createdAt: 'desc' }
            });
        }

        // Map to frontend structure
        return users.map((u: any) => ({
            id: u.id,
            name: u.fullName,
            title: u.fullName, // GridItem compatibility
            image: u.avatarUrl || `https://ui-avatars.com/api/?name=${u.fullName}&background=random`,
            imageUrl: u.avatarUrl || `https://ui-avatars.com/api/?name=${u.fullName}&background=random`, // GridItem compatibility
            niche: u.niche || 'Insider',
            subtitle: u.niche || 'Insider', // GridItem compatibility
            slug: u.username || slugify(u.fullName || `curator-${u.id}`) // Backup slug generation
        }));
    } catch (error) {
        console.error("Error getting featured curators:", error);
        return [];
    }
}

// --- Other Feature Getters (Static for now) ---

function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// Mock data for fallback if CMS content is empty
const MOCK_CATEGORIES = [
    { id: '1', name: 'Kadın Giyim', title: 'Kadın Giyim', slug: 'kadin-giyim', image: 'https://images.unsplash.com/photo-1523381294911-8d3cead1858b?q=80&w=800&auto=format&fit=crop' },
    { id: '2', name: 'Erkek Giyim', title: 'Erkek Giyim', slug: 'erkek-giyim', image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800&auto=format&fit=crop' },
    { id: '3', name: 'Ayakkabı', title: 'Ayakkabı', slug: 'ayakkabi', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
    { id: '4', name: 'Aksesuar', title: 'Aksesuar', slug: 'aksesuar', image: 'https://images.unsplash.com/photo-1561053720-76ae6740c114?q=80&w=800&auto=format&fit=crop' },
    { id: '5', name: 'Çanta', title: 'Çanta', slug: 'canta', image: 'https://images.unsplash.com/photo-1584917865442-de89df76cca8?q=80&w=800&auto=format&fit=crop' },
    { id: '6', name: 'Ev & Yaşam', title: 'Ev & Yaşam', slug: 'ev-yasam', image: 'https://images.unsplash.com/photo-1556912167-f57ade81469f?q=80&w=800&auto=format&fit=crop' },
    { id: '7', name: 'Kozmetik', title: 'Kozmetik', slug: 'kozmetik', image: 'https://images.unsplash.com/photo-1580870069867-ce3551579710?q=80&w=800&auto=format&fit=crop' },
    { id: '8', name: 'Takı', title: 'Takı', slug: 'taki', image: 'https://images.unsplash.com/photo-1599643478518-a784f5de9c2f?q=80&w=800&auto=format&fit=crop' },
];

const MOCK_CIRCLES = [
    { id: '1', name: 'Minimalist Şıklık', title: 'Minimalist Şıklık', slug: 'minimalist-siklik', image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800&auto=format&fit=crop' },
    { id: '2', name: 'Sokak Modası', title: 'Sokak Modası', slug: 'sokak-modasi', image: 'https://images.unsplash.com/photo-1503341504253-b579171505a1?q=80&w=800&auto=format&fit=crop' },
    { id: '3', name: 'Vintage Tutkunları', title: 'Vintage Tutkunları', slug: 'vintage-tutkunlari', image: 'https://images.unsplash.com/photo-1534452203293-494d7dddc114?q=80&w=800&auto=format&fit=crop' },
    { id: '4', name: 'Sürdürülebilir Yaşam', title: 'Sürdürülebilir Yaşam', slug: 'surdurulebilir-yasam', image: 'https://images.unsplash.com/photo-1516253593-dd45bc759571?q=80&w=800&auto=format&fit=crop' },
];

export async function getAllCategories() {
    try {
        const content = await getContent();
        const items = content?.sections?.categories?.items || [];
        if (items.length === 0) return MOCK_CATEGORIES.map(i => ({ ...i, imageUrl: i.image, slug: i.slug || slugify(i.title) })); // Fallback to mock if empty
        return items.map((item: any) => ({
            ...item,
            title: item.name || item.title,
            imageUrl: item.image,
            slug: item.slug || slugify(item.name || item.title)
        }));
    } catch (error) {
        return MOCK_CATEGORIES.map(i => ({ ...i, imageUrl: i.image, slug: i.slug || slugify(i.title) }));
    }
}

export async function getCategories() {
    try {
        const content = await getContent();
        const allItems = await getAllCategories();
        const featuredIds = content?.sections?.categories?.featuredIds || [];

        if (featuredIds.length > 0) {
            return allItems.filter((item: any) => featuredIds.includes(item.id) || featuredIds.includes(item.slug));
        }

        return allItems.slice(0, 8);
    } catch (error) {
        return [];
    }
}

export async function getAllCircles() {
    try {
        const content = await getContent();
        const items = content?.sections?.circles?.items || [];
        if (items.length === 0) return MOCK_CIRCLES.map(i => ({ ...i, imageUrl: i.image, slug: i.slug || slugify(i.title) })); // Fallback
        return items.map((item: any) => ({
            ...item,
            title: item.name || item.title,
            imageUrl: item.image,
            slug: item.slug || slugify(item.name || item.title)
        }));
    } catch (error) {
        return MOCK_CIRCLES.map(i => ({ ...i, imageUrl: i.image, slug: i.slug || slugify(i.title) }));
    }
}

export async function getCircles() {
    try {
        const content = await getContent();
        const allItems = await getAllCircles();
        const featuredIds = content?.sections?.circles?.featuredIds || [];

        if (featuredIds.length > 0) {
            return allItems.filter((item: any) => featuredIds.includes(item.id) || featuredIds.includes(item.slug));
        }

        return allItems.slice(0, 8);
    } catch (error) {
        return [];
    }
}

// Mock Brands Fallback
const MOCK_BRANDS = [
    { id: '1', title: 'VAKKO', name: 'VAKKO', slug: 'vakko', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop' },
    { id: '2', title: 'MAVI', name: 'MAVI', slug: 'mavi', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop' },
    { id: '3', title: 'IPEKYOL', name: 'IPEKYOL', slug: 'ipekyol', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop' },
    { id: '4', title: 'BEYMEN', name: 'BEYMEN', slug: 'beymen', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop' },
    { id: '5', title: 'NETWORK', name: 'NETWORK', slug: 'network', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4971a?q=80&w=800&auto=format&fit=crop' },
    { id: '6', title: 'YARGICI', name: 'YARGICI', slug: 'yargici', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop' },
    { id: '7', title: 'DIVARESE', name: 'DIVARESE', slug: 'divarese', image: 'https://images.unsplash.com/photo-1511556820780-dba8c3c29c4b?q=80&w=800&auto=format&fit=crop' },
    { id: '8', title: 'DESA', name: 'DESA', slug: 'desa', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop' },
];

export async function getAllBrands() {
    try {
        const content = await getContent();
        const items = content?.sections?.brands?.items || [];
        if (items.length === 0) return MOCK_BRANDS.map(i => ({ ...i, imageUrl: i.image, slug: i.slug || slugify(i.title) }));
        return items.map((item: any) => ({
            ...item,
            title: item.name || item.title,
            imageUrl: item.image,
            slug: slugify(item.name || item.title)
        }));
    } catch (error) {
        return MOCK_BRANDS.map(i => ({ ...i, imageUrl: i.image, slug: i.slug || slugify(i.title) }));
    }
}

export async function getBrands() {
    try {
        const content = await getContent();
        const allItems = await getAllBrands();
        const featuredIds = content?.sections?.brands?.featuredIds || [];

        if (featuredIds.length > 0) {
            return allItems.filter((item: any) => featuredIds.includes(item.id) || featuredIds.includes(item.slug));
        }

        return allItems.slice(0, 8);
    } catch (error) {
        return MOCK_BRANDS.map(i => ({ ...i, imageUrl: i.image, slug: i.slug || slugify(i.title) }));
    }
}

export async function getBrandBySlug(slug: string) {
    const brands = await getBrands();
    const brand = brands.find((b: any) => b.slug === slug);
    if (!brand) return null;

    // Simulate Products for this brand (Mock)
    // In real app: prisma.product.findMany({ where: { brand: { slug } } });
    const products = Array(8).fill(null).map((_, i) => ({
        id: `brand-prod-${i}`,
        title: `${brand.name} Ürün ${i + 1}`,
        brand: brand.name,
        price: (Math.random() * 1000 + 500).toFixed(2),
        image: brand.image, // Reuse brand image or random
        curator: { name: 'ShopMy', avatar: '' }
    }));

    return { ...brand, products };
}

export async function getCategoryBySlug(slug: string) {
    const categories = await getCategories();
    const category = categories.find((c: any) => c.slug === slug);
    if (!category) return null;

    // Simulate Products for this category
    const products = Array(8).fill(null).map((_, i) => ({
        id: `cat-prod-${i}`,
        title: `${category.name} Seçkisi ${i + 1}`,
        brand: 'Çeşitli Markalar',
        price: (Math.random() * 500 + 100).toFixed(2),
        image: category.image,
        curator: { name: 'Editör', avatar: '' }
    }));

    return { ...category, products };
}

export async function getCircleBySlug(slug: string) {
    // 1. Try DB
    try {
        const dbCircle = await prisma.circle.findUnique({
            where: { slug: slug },
            include: {
                members: {
                    include: { user: true }
                }
            }
        });

        if (dbCircle) {
            return {
                id: dbCircle.id,
                name: dbCircle.name,
                description: dbCircle.description,
                image: dbCircle.coverImageUrl || `https://ui-avatars.com/api/?name=${dbCircle.name}&background=random`,
                slug: dbCircle.slug,
                status: dbCircle.status,
                curators: dbCircle.members.map((m: any) => ({
                    id: m.userId,
                    name: m.user.fullName || m.user.username || 'User',
                    username: m.user.username || 'user',
                    image: m.user.avatarUrl || `https://ui-avatars.com/api/?name=${m.user.username}&background=random`
                })),
                isDbBacked: true
            };
        }
    } catch (e) {
        // console.error(e);
    }

    // 2. Fallback to Legacy JSON
    const circles = await getCircles();
    const circle = circles.find((c: any) => c.slug === slug);
    if (!circle) return null;

    // Simulate Curators in this circle
    const curators = Array(4).fill(null).map((_, i) => ({
        id: `circle-curator-${i}`,
        name: `${circle.name} Üyesi ${i + 1}`,
        image: `https://ui-avatars.com/api/?name=Member+${i}&background=random`,
        username: `user${i}`
    }));

    return { ...circle, curators, isDbBacked: false };
}

// --- Types (Legacy Support) ---
export interface Section {
    id: string;
    title: string;
    order?: number;
    // products: Product[]; // In db, this is a relation
}

export interface Product {
    id: string;
    curatorId?: string;
    sectionId: string; // The Collection ID
    image: string;
    brand: string;
    title: string;
    price: string;
    category?: string;
    link?: string;
}

// --- Actions: Sections (Collections) ---

export async function addSection(userId: string, title: string) {
    try {
        const newCollection = await prisma.collection.create({
            data: {
                userId: userId,
                title: title,
                slug: `${title.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().substring(0, 8)}`, // Generate slug
                layoutType: 'grid'
            }
        });

        return { success: true, section: { ...newCollection, id: newCollection.id } }; // Normalize return
    } catch (error) {
        console.error("Error adding section:", error);
        return { success: false, error: 'Failed to add section' };
    }
}

export async function deleteSection(userId: string, sectionId: string) {
    try {
        await prisma.collection.delete({
            where: { id: sectionId }
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete section' };
    }
}

export async function updateCollectionOrder(items: { id: string; displayOrder: number }[]) {
    try {
        const transaction = items.map((item) =>
            prisma.collection.update({
                where: { id: item.id },
                data: { displayOrder: item.displayOrder },
            })
        );
        await prisma.$transaction(transaction);
        return { success: true };
    } catch (error) {
        console.error("Error updating collection order:", error);
        return { success: false, error: 'Failed to update order' };
    }
}

export async function getMyCollections(userId: string) {
    try {
        const collections = await prisma.collection.findMany({
            where: { userId },
            orderBy: { displayOrder: 'asc' },
            include: {
                _count: {
                    select: { items: true }
                }
            }
        });
        return collections.map(c => ({
            id: c.id,
            title: c.title,
            productCount: c._count.items,
            displayOrder: c.displayOrder
        }));
    } catch (error) {
        return [];
    }
}

// --- Actions: Products ---

export async function addProduct(productData: Omit<Product, 'id'>) {
    try {
        // 1. Find or Create Brand
        const brandSlug = productData.brand.toLowerCase().replace(/\s+/g, '-');

        const product = await prisma.product.create({
            data: {
                title: productData.title,
                price: parseFloat(productData.price.replace(/[^0-9.]/g, '')),
                imageUrl: productData.image,
                productUrl: productData.link || '#',
                brand: {
                    connectOrCreate: {
                        where: { slug: brandSlug },
                        create: {
                            name: productData.brand,
                            slug: brandSlug
                        }
                    }
                }
            }
        });

        // 2. Add to Collection (Section)
        await prisma.collectionItem.create({
            data: {
                collectionId: productData.sectionId,
                productId: product.id
            }
        });

        return { success: true, product: { ...productData, id: product.id } };
    } catch (error) {
        console.error("Error adding product:", error);
        return { success: false, error: 'Failed to add product' };
    }
}

export async function deleteProduct(productId: string) {
    try {
        // This is tricky. Do we delete the product globally or just from the collection?
        // Since input is productId, we might not know which collection it's from here.
        // But usually frontend sends the id of the 'item'.
        // If productId refers to the global product, deleting it impacts everyone.
        // We likely need to delete the CollectionItem.
        // However, if the frontend assumes productId IS the item ID...
        // Let's assume for now we delete the CollectionItem where productId matches. 
        // THIS MIGHT BE RISKY if product is in multiple collections.
        // Ideally we need collectionId too.

        // For now, let's try to delete the Product itself for simplicity of migration from JSON where products were unique per user.
        await prisma.product.delete({
            where: { id: productId }
        });
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: 'Failed to delete product' };
    }
}

// --- Actions: Social Posts (Still JSON for now) ---

export interface InstagramPost {
    id: string;
    curatorId: string;
    imageUrl: string;
    caption: string;
    date: string;
    productIds: string[];
}

export async function getInstagramPosts(curatorId: string) {
    try {
        const posts = await readJsonFile(INSTAGRAM_FILE_PATH);
        return posts.filter((p: InstagramPost) => p.curatorId === curatorId);
    } catch (error) {
        return [];
    }
}

export interface TiktokPost {
    id: string;
    curatorId: string;
    imageUrl: string;
    caption: string;
    date: string;
    productIds: string[];
}

export async function getTiktokPosts(curatorId: string) {
    try {
        const posts = await readJsonFile(TIKTOK_FILE_PATH);
        return posts.filter((p: TiktokPost) => p.curatorId === curatorId);
    } catch (error) {
        return [];
    }
}

// --- Main Curator Data Fetcher ---

export async function getCuratorData(username: string) {
    try {
        // Fetch user with collections and products
        let user = await prisma.user.findUnique({
            where: { username },
            include: {
                collections: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        items: {
                            include: {
                                product: {
                                    include: {
                                        brand: true
                                    }
                                }
                            }
                        }
                    }
                },
                socialAccounts: true
            }
        });

        if (!user) {
            user = await prisma.user.findFirst({
                where: {
                    username: username.toLowerCase()
                },
                include: {
                    collections: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            items: {
                                include: {
                                    product: {
                                        include: {
                                            brand: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    socialAccounts: true
                }
            });
        }

        // Fallback: Try to find by slugified full name (in-memory search as last resort)
        if (!user) {
            try {
                const possibleUsers = await prisma.user.findMany({
                    select: { id: true, fullName: true, username: true }
                });
                const targetSlug = username.toLowerCase(); // The 'username' arg is actually the slug from URL
                const match = possibleUsers.find(u => {
                    const nameSlug = slugify(u.fullName || '');
                    // Check if slug matches, OR if the username matches (double check)
                    return nameSlug === targetSlug || (u.username && u.username.toLowerCase() === targetSlug);
                });

                if (match) {
                    user = await prisma.user.findUnique({
                        where: { id: match.id },
                        include: {
                            collections: {
                                orderBy: { createdAt: 'desc' },
                                include: {
                                    items: {
                                        include: {
                                            product: { include: { brand: true } }
                                        }
                                    }
                                }
                            },
                            socialAccounts: true
                        }
                    });
                }
            } catch (e) {
                console.error("Error in fallback user search:", e);
            }
        }

        if (!user) {
            console.log(`User not found for username: ${username}`);
            return null;
        }

        // Flatten products from all collections for the 'products' array
        // (This mimics the old architecture)
        const allProducts = user.collections.flatMap((c: any) =>
            c.items
                .filter((i: any) => i.isVisible !== false) // Filter Hidden Items
                .map((i: any) => ({
                    id: i.product.id,
                    curatorId: user.id,
                    sectionId: c.id,
                    image: i.product.imageUrl,
                    brand: i.product.brand?.name || 'Unknown', // Safe access
                    title: i.product.title,
                    price: i.product.price?.toString() || '0',
                    link: i.product.productUrl,
                    collectionItemId: i.id
                }))
        );

        // Map Sections
        const sections = user.collections.map((c: any) => ({
            id: c.id,
            title: c.title,
            products: c.items
                .filter((i: any) => i.isVisible !== false) // Filter Hidden Items
                .map((i: any) => ({
                    id: i.product.id,
                    curatorId: user.id,
                    sectionId: c.id,
                    image: i.product.imageUrl,
                    brand: i.product.brand?.name || 'Unknown', // Safe access
                    title: i.product.title,
                    price: i.product.price?.toString() || '0',
                    link: i.product.productUrl,
                    collectionItemId: i.id
                }))
        }));

        const instagramPosts = await getInstagramPosts(user.id);
        const tiktokPosts = await getTiktokPosts(user.id);

        // Parse theme config
        let themePreferences = null;
        if (user.themeConfig) {
            try {
                themePreferences = JSON.parse(user.themeConfig);
            } catch (e) {
                console.error("Failed to parse theme config");
            }
        }

        return {
            user: {
                ...user,
                profileImage: user.avatarUrl, // Compatibility
                role: user.role || 'creator',
                permissions: { role: user.role || 'creator' },
                themePreferences
            },
            sections: sections,
            products: allProducts,
            instagramPosts: instagramPosts || [],
            tiktokPosts: tiktokPosts || []
        };
    } catch (error) {
        console.error("Error fetching curator data DETAILED:", error);
        return { error: 'Failed to fetch curator data', details: error };
    }
}

export async function toggleInstagramConnection(userId: string, isConnected: boolean) {
    try {
        if (isConnected) {
            // Check if exists
            const existing = await prisma.socialAccount.findFirst({
                where: { userId, platform: 'instagram' }
            });
            if (!existing) {
                await prisma.socialAccount.create({
                    data: {
                        userId,
                        platform: 'instagram',
                        username: 'connected_user' // Placeholder
                    }
                });
            }
        } else {
            await prisma.socialAccount.deleteMany({
                where: { userId, platform: 'instagram' }
            });
        }
        return { success: true };
    } catch (error) {
        console.error("Error toggling Instagram:", error);
        return { success: false, error: 'Failed to update settings' };
    }
}

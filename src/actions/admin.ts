'use server';

import fs from 'fs/promises';
import path from 'path';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');

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

export async function getAllUsers() {
    try {
        const usersFile = path.join(process.cwd(), 'data', 'users.json');
        const data = await fs.readFile(usersFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

import { featuredCurators, featuredCategories, featuredCircles, featuredBrands } from '@/lib/shopData';

// ... (keep file read/write functions) ...

export async function getFeaturedCurators() {
    // Return static data for consistency with rebranding
    return featuredCurators.map(c => ({
        id: c.id,
        name: c.title,
        image: c.imageUrl,
        niche: 'Küratör',
        slug: c.slug
    }));
}

export async function getCategories() {
    return featuredCategories.map(c => ({
        id: c.id,
        title: c.title,
        image: c.imageUrl,
        link: `/categories/${c.slug}`
    }));
}

export async function getCircles() {
    return featuredCircles.map(c => ({
        id: c.id,
        title: c.title,
        image: c.imageUrl,
        link: `/circles/${c.slug}`
    }));
}

export async function getBrands() {
    return featuredBrands.map(c => ({
        id: c.id,
        title: c.title,
        image: c.imageUrl,
        link: `/brands/${c.slug}`
    }));
}
// ... existing imports
import { v4 as uuidv4 } from 'uuid';

const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');
const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'data', 'products.json');

// --- Types ---
export interface Section {
    id: string;
    title: string;
    order: number;
}

export interface Product {
    id: string;
    curatorId: string;
    sectionId: string;
    image: string;
    brand: string;
    title: string;
    price: string;
    category?: string; // New field
    link?: string;
}

// --- Helper: Read Data ---
async function readJsonFile(filePath: string) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeJsonFile(filePath: string, data: any) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// --- ACTIONS: Sections (Stored in User Profile) ---

export async function addSection(userId: string, title: string) {
    try {
        const users = await readJsonFile(USERS_FILE_PATH);
        const userIndex = users.findIndex((u: any) => u.id === userId);

        if (userIndex === -1) return { success: false, error: 'User not found' };

        const newSection: Section = {
            id: uuidv4(),
            title,
            order: (users[userIndex].sections?.length || 0)
        };

        if (!users[userIndex].sections) {
            users[userIndex].sections = [];
        }
        users[userIndex].sections.push(newSection);

        await writeJsonFile(USERS_FILE_PATH, users);
        return { success: true, section: newSection };
    } catch (error) {
        console.error("Error adding section:", error);
        return { success: false, error: 'Failed to add section' };
    }
}

export async function deleteSection(userId: string, sectionId: string) {
    try {
        const users = await readJsonFile(USERS_FILE_PATH);
        const userIndex = users.findIndex((u: any) => u.id === userId);

        if (userIndex === -1) return { success: false, error: 'User not found' };

        if (users[userIndex].sections) {
            users[userIndex].sections = users[userIndex].sections.filter((s: Section) => s.id !== sectionId);
            await writeJsonFile(USERS_FILE_PATH, users);
        }
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete section' };
    }
}

// --- ACTIONS: Products ---

export async function addProduct(productData: Omit<Product, 'id'>) {
    try {
        const products = await readJsonFile(PRODUCTS_FILE_PATH);
        const newProduct: Product = {
            id: uuidv4(),
            ...productData
        };
        products.push(newProduct);
        await writeJsonFile(PRODUCTS_FILE_PATH, products);
        return { success: true, product: newProduct };
    } catch (error) {
        console.error("Error adding product:", error);
        return { success: false, error: 'Failed to add product' };
    }
}

export async function deleteProduct(productId: string) {
    try {
        const products = await readJsonFile(PRODUCTS_FILE_PATH);
        const filtered = products.filter((p: Product) => p.id !== productId);
        await writeJsonFile(PRODUCTS_FILE_PATH, filtered);
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete product' };
    }
}

// --- ACTIONS: Instagram ---
const INSTAGRAM_FILE_PATH = path.join(process.cwd(), 'data', 'instagram_posts.json');

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

// --- ACTIONS: Tiktok ---
const TIKTOK_FILE_PATH = path.join(process.cwd(), 'data', 'tiktok_posts.json');

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

export async function getCuratorData(username: string) {
    try {
        const users = await readJsonFile(USERS_FILE_PATH);
        const user = users.find((u: any) => u.username === username || u.slug === username);

        if (!user) return null;

        const allProducts = await readJsonFile(PRODUCTS_FILE_PATH);
        const userProducts = allProducts.filter((p: Product) => p.curatorId === user.id);

        const instagramPosts = await getInstagramPosts(user.id);
        const tiktokPosts = await getTiktokPosts(user.id);

        return {
            user,
            sections: user.sections || [],
            products: userProducts,
            instagramPosts: instagramPosts || [],
            tiktokPosts: tiktokPosts || []
        };
    } catch (error) {
        console.error("Error fetching curator data", error);
        return null;
    }
}

// --- ACTIONS: Settings ---

export async function toggleInstagramConnection(userId: string, isConnected: boolean) {
    try {
        const users = await readJsonFile(USERS_FILE_PATH);
        const userIndex = users.findIndex((u: any) => u.id === userId);

        if (userIndex === -1) return { success: false, error: 'User not found' };

        users[userIndex].instagramConnected = isConnected;
        await writeJsonFile(USERS_FILE_PATH, users);
        return { success: true };
    } catch (error) {
        console.error("Error toggling Instagram:", error);
        return { success: false, error: 'Failed to update settings' };
    }
}

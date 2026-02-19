import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    console.log('Running quick fixes...')

    try {
        // 1.Fix "Wellness Koçları" and "Kolyeler" images - These are in data/content.json but rendered via admin.ts -> content.json. 
        // Admin.ts reads directly from content.json, so file updates should be enough unless there's a cached state or DB seed for circles/categories.
        // Wait, admin.ts reads `data/content.json` file directly on each request? Yes: `getContent()`.
        // However, `getFeaturedCurators` reads from DB (`prisma.user.findMany`).
        // `getCircles` reads from `content.json`.
        // `getCategories` reads from `content.json`.
        // So file updates I did earlier should cover Circles and Categories.

        // 2. Fix "Örnek Ürün 3" in Database
        const product = await prisma.product.findFirst({
            where: { title: 'Örnek Ürün 3' }
        });

        if (product) {
            console.log(`Found product: ${product.id}`);
            await prisma.product.update({
                where: { id: product.id },
                data: {
                    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'
                }
            });
            console.log('Updated "Örnek Ürün 3" image.');
        } else {
            // Find ANY product with title starting with "Örnek Ürün" and update the 3rd one if exists
            const products = await prisma.product.findMany({
                where: { title: { startsWith: 'Örnek Ürün' } },
                take: 5
            });
            if (products.length >= 3) {
                await prisma.product.update({
                    where: { id: products[2].id },
                    data: { imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop' }
                });
                console.log('Updated 3rd product image.');
            }
        }

        // 3. Fix Curators Images in DB
        // I updated users.json, but need to sync to DB for `getFeaturedCurators`
        const usersPath = path.join(process.cwd(), 'data', 'users.json')
        if (fs.existsSync(usersPath)) {
            const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
            for (const user of usersData) {
                if (user.profileImage) {
                    await prisma.user.updateMany({
                        where: { username: user.username },
                        data: { avatarUrl: user.profileImage }
                    });
                    // Also handle IDs which might differ in DB if seeded differently, but username is consistent
                }
            }
            console.log('Synced avatars from users.json to DB.');
        }

    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()

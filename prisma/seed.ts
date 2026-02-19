import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting seeding...')

    // 1. Seed Users
    const usersPath = path.join(process.cwd(), 'data', 'users.json')
    if (fs.existsSync(usersPath)) {
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))

        for (const user of usersData) {
            // Create User
            const createdUser = await prisma.user.upsert({
                where: { email: user.email || `${user.username}@example.com` },
                update: {},
                create: {
                    id: user.id,
                    email: user.email || `${user.username}@example.com`,
                    username: user.username,
                    fullName: user.fullName,
                    avatarUrl: user.profileImage,
                    role: user.role || 'creator',
                    bio: user.bio,
                    isVerified: user.permissions?.verified || false,
                    applicationStatus: 'approved',
                    followersCount: user.metrics?.followers ? parseInt(user.metrics.followers.replace('k', '000').replace('.', '')) : 0,
                },
            })
            console.log(`Created user: ${createdUser.username}`)

            // 2. Seed Collections (Sections)
            if (user.sections && user.sections.length > 0) {
                for (const section of user.sections) {
                    const collection = await prisma.collection.create({
                        data: {
                            userId: createdUser.id,
                            title: section.title,
                            slug: section.id, // using id as slug for now
                            layoutType: section.type === 'carousel' ? 'carousel' : 'grid',
                        }
                    })

                    // 3. Seed Collection Items (Products)
                    let productsToSeed = section.products || [];

                    // Fallback: Generate dummy products if none exist
                    if (!productsToSeed || productsToSeed.length === 0) {
                        const dummyBrands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Prada', 'Apple', 'Samsung'];
                        const dummyTitles = ['Harika Ürün', 'Sezonun Favorisi', 'Mutlaka Alınmalı', 'Çok Şık', 'İndirimde'];

                        for (let i = 0; i < 4; i++) {
                            productsToSeed.push({
                                title: `${dummyTitles[Math.floor(Math.random() * dummyTitles.length)]} ${i + 1}`,
                                price: (Math.random() * 1000 + 100).toFixed(2),
                                image: `https://picsum.photos/seed/${Math.random()}/400/600`,
                                link: 'https://example.com',
                                brand: dummyBrands[Math.floor(Math.random() * dummyBrands.length)]
                            });
                        }
                    }

                    if (productsToSeed) {
                        for (const prod of productsToSeed) {
                            try {
                                const product = await prisma.product.create({
                                    data: {
                                        title: prod.title,
                                        price: typeof prod.price === 'string' ? parseFloat(prod.price.replace(/[^0-9.]/g, '')) : prod.price,
                                        imageUrl: prod.image,
                                        productUrl: prod.link || '#',
                                        brand: {
                                            connectOrCreate: {
                                                where: { slug: prod.brand?.toLowerCase().replace(/\s+/g, '-') || 'generic' },
                                                create: {
                                                    name: prod.brand || 'Generic',
                                                    slug: prod.brand?.toLowerCase().replace(/\s+/g, '-') || `generic-${Math.random()}`
                                                }
                                            }
                                        }
                                    }
                                })

                                await prisma.collectionItem.create({
                                    data: {
                                        collectionId: collection.id,
                                        productId: product.id,
                                    }
                                })
                            } catch (e) {
                                console.log(`Skipping product ${prod.title} due to error or duplicate`)
                            }
                        }
                    }
                }
            } else {
                // If user has no sections, create a default one with products
                const defaultCollection = await prisma.collection.create({
                    data: {
                        userId: createdUser.id,
                        title: 'Favorilerim',
                        slug: 'favorilerim',
                        layoutType: 'grid'
                    }
                });

                // Add dummy products
                const dummyBrands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Prada', 'Apple', 'Samsung'];
                for (let i = 0; i < 6; i++) {
                    try {
                        const product = await prisma.product.create({
                            data: {
                                title: `Örnek Ürün ${i + 1}`,
                                price: (Math.random() * 2000 + 100).toFixed(2),
                                imageUrl: `https://picsum.photos/seed/${createdUser.username}-${i}/400/600`,
                                productUrl: 'https://example.com',
                                brand: {
                                    connectOrCreate: {
                                        where: { slug: dummyBrands[i % dummyBrands.length].toLowerCase() },
                                        create: { name: dummyBrands[i % dummyBrands.length], slug: dummyBrands[i % dummyBrands.length].toLowerCase() }
                                    }
                                }
                            }
                        });
                        await prisma.collectionItem.create({
                            data: { collectionId: defaultCollection.id, productId: product.id }
                        });
                    } catch (e) { }
                }
            }
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

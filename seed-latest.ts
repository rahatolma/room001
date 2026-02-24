import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log("Starting DB seed to Frankfurt...");

    const passwordHash = await bcrypt.hash('password123', 10);

    let shopper = await prisma.user.findUnique({ where: { email: 'shopper@example.com' } });
    if (!shopper) {
        shopper = await prisma.user.create({
            data: { email: 'shopper@example.com', fullName: 'Selin Yılmaz', role: 'shopper', password: passwordHash }
        });
    }

    let brandUser = await prisma.user.findUnique({ where: { email: 'brand@example.com' } });
    if (!brandUser) {
        brandUser = await prisma.user.create({
            data: { email: 'brand@example.com', fullName: 'Trendyol', role: 'brand', password: passwordHash }
        });
    }

    let creator = await prisma.user.findUnique({ where: { email: 'creator@example.com' } });
    if (!creator) {
        creator = await prisma.user.create({
            data: {
                email: 'creator@example.com',
                username: 'rahatolma',
                fullName: 'Sofia Richie Grainge',
                role: 'creator',
                password: passwordHash,
                followersCount: 350000,
                productsSharedCount: 154,
                profileViewCount: 850000,
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
                niche: 'Moda & Yaşam Tarzı'
            }
        });
    }

    const additionalCreators = [
        { email: 'creator2@example.com', username: 'styleicon', fullName: 'Hailey Bieber', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80', niche: 'Güzellik & Cilt Bakımı' },
        { email: 'creator3@example.com', username: 'minimalist', fullName: 'Matilda Djerf', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', niche: 'Kapsül Dolap' },
        { email: 'creator4@example.com', username: 'vintagelover', fullName: 'Kendall Jenner', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80', niche: 'High Fashion' },
        { email: 'creator5@example.com', username: 'fitnessguru', fullName: 'Pamela Reif', avatarUrl: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=400&q=80', niche: 'Spor & Sağlık' },
        { email: 'creator6@example.com', username: 'homedecor', fullName: 'Marie Kondo', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', niche: 'Ev & Dekorasyon' },
        { email: 'creator7@example.com', username: 'techreviewer', fullName: 'Marques Brownlee', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', niche: 'Teknoloji' },
        { email: 'creator8@example.com', username: 'foodie', fullName: 'Gordon Ramsay', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', niche: 'Gastronomi' }
    ];

    for (const c of additionalCreators) {
        let user = await prisma.user.findUnique({ where: { email: c.email } });
        if (!user) {
            await prisma.user.create({
                data: {
                    email: c.email,
                    username: c.username,
                    fullName: c.fullName,
                    role: 'creator',
                    password: passwordHash,
                    followersCount: Math.floor(Math.random() * 500000) + 50000,
                    productsSharedCount: Math.floor(Math.random() * 200) + 20,
                    profileViewCount: Math.floor(Math.random() * 1000000) + 100000,
                    avatarUrl: c.avatarUrl,
                    niche: c.niche
                }
            });
        }
    }

    const brandsData = [
        { name: 'Khaite', slug: 'khaite', logoUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', description: 'Elegan ve modern lüks giyim.' },
        { name: 'Prada', slug: 'prada', logoUrl: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=400&q=80', description: 'İtalyan moda evi ikonik tasarımları.' },
        { name: 'Toteme', slug: 'toteme', logoUrl: 'https://images.unsplash.com/photo-1434389678369-182cb626602e?w=400&q=80', description: 'Minimalist İskandinav stili.' },
        { name: 'Mavi', slug: 'mavi', logoUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', description: 'Türkiye’nin öncü denim markası.' },
        { name: 'Yargıcı', slug: 'yargici', logoUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80', description: 'Şık ve zamansız kıyafetler, ev aksesuarları.' },
        { name: 'Vakko', slug: 'vakko', logoUrl: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&q=80', description: 'Lüks giyim ve aksesuar.' }
    ];

    for (const b of brandsData) {
        const extBrand = await prisma.brand.findFirst({ where: { name: b.name } });
        if (!extBrand) {
            await prisma.brand.create({ data: b });
        }
    }

    let firstPrismaBrand = await prisma.brand.findFirst();

    const productsData = [
        { title: 'The Maddy Top', description: 'Luxurious ribbed knit top.', price: 1250, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?w=400&q=80' },
        { title: 'Classic Loafers', description: 'Timeless leather loafers.', price: 4500, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80' },
        { title: 'Silk Midi Skirt', description: 'Flowy silk skirt for summer evenings.', price: 2100, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1583391733958-625ee9193108?w=400&q=80' },
        { title: 'Vintage Sunglasses', description: 'Retro style sunglasses.', price: 850, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80' },
        { title: 'Cashmere Sweater', description: 'Ultra soft cashmere for winter.', price: 3200, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80' },
        { title: 'Leather Crossbody Bag', description: 'Everyday essential bag.', price: 5600, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
        { title: 'Gold Hoop Earrings', description: 'Minimalist 14k gold hoops.', price: 1100, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80' },
        { title: 'Oversized Blazer', description: 'Perfect tailored fit.', price: 2800, brandId: firstPrismaBrand?.id, productUrl: '#', imageUrl: 'https://images.unsplash.com/photo-1551488828-ea24424b953d?w=400&q=80' },
    ];

    for (const p of productsData) {
        const extProduct = await prisma.product.findFirst({ where: { title: p.title } });
        if (!extProduct) {
            await prisma.product.create({ data: p as any });
        }
    }

    console.log("Seeding complete!");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

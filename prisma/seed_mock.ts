import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const brand = await prisma.brand.create({
    data: {
      name: 'Mock Brand',
      slug: 'mock-brand',
    }
  })
  
  await prisma.product.create({
    data: {
      title: 'Mock Ruj',
      description: 'A mock lipstick for testing.',
      price: 100,
      currency: 'TRY',
      imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1000',
      productUrl: 'https://example.com/mock-ruj',
      brandId: brand.id
    }
  })
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

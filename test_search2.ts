import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const query = 'Ruj'.toLowerCase()
  const allBrands = await prisma.brand.findMany();
  const brands = allBrands.filter(b => b.name.toLowerCase().includes(query)).slice(0, 10);

  const allProducts = await prisma.product.findMany({ include: { brand: true } });
  const products = allProducts.filter(p => 
      p.title.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query))
  ).slice(0, 20);

  console.log("Found brands:", brands)
  console.log("Found products:", products)
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

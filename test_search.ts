import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const query = "Ruj"
  const products = await prisma.product.findMany({
      where: {
          OR: [
              { title: { contains: query } },
              { description: { contains: query } }
          ]
      },
      include: { brand: true },
      take: 20
  });
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

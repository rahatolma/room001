import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing old test users...')

  await prisma.user.deleteMany({
    where: {
      OR: [
        { email: { in: ['admin_1@room001.tr', 'shopper@room001.tr', 'insider@room001.tr', 'brand@room001.tr'] } },
        { username: { in: ['admin', 'shopaholic', 'asenasaribatur', 'beymen'] } }
      ]
    }
  });

  console.log('Seeding test users...')

  await prisma.user.create({
    data: { email: 'admin_1@room001.tr', username: 'admin', fullName: 'Admin User', role: 'admin', password: '123' }
  })

  await prisma.user.create({
    data: { email: 'shopper@room001.tr', username: 'shopaholic', fullName: 'Alışveriş Tutkunu', role: 'shopper', phoneNumber: '5551112233' }
  })

  const creatorUser = await prisma.user.create({
    data: { email: 'insider@room001.tr', username: 'asenasaribatur', fullName: 'Asena Sarıbatur', role: 'creator', phoneNumber: '5554445566' }
  })

  // Create a sample magazine for the creator_1
  await prisma.magazine.create({
    data: {
      userId: creatorUser.id,
      title: "Yaz Stili Önerileri (Test)",
      description: "En trend yazlık parçalar",
      coverImageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=800&auto=format&fit=crop",
      isPublic: true,
    }
  });
  console.log('Sample magazine created for creator User.');

  await prisma.user.create({
    data: { email: 'brand@room001.tr', username: 'beymen', fullName: 'Beymen', role: 'brand', phoneNumber: '5557778899' }
  })

  console.log('Test users seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

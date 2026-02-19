
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding shopper user...')

    const shopper = await prisma.user.upsert({
        where: { email: 'shopper@room001.com' },
        update: {
            role: 'shopper', // Ensure role is shopper
            password: '123'
        },
        create: {
            email: 'shopper@room001.com',
            username: 'alisveris-tutkunu',
            fullName: 'Alışveriş Tutkunu',
            password: '123',
            role: 'shopper', // Explicitly set role
            avatarInitials: 'AT'
        }
    })

    console.log(`Created/Updated Shopper User: ${shopper.email} (Role: ${shopper.role})`)
    console.log('Password: 123')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

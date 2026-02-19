const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { fullName: { contains: 'Selin' } },
                { username: { contains: 'selin' } }
            ]
        }
    });

    if (user) {
        console.log(`Found user: ${user.username} (ID: ${user.id}, Email: ${user.email})`);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: '123456' } // Simple plain text as per auth.ts implementation
        });
        console.log('Password updated to 123456');
    } else {
        console.log('User Selin not found');
        // Create one for testing
        const newUser = await prisma.user.create({
            data: {
                email: 'selin@example.com',
                username: 'selin',
                fullName: 'Selin Yılmaz',
                password: '123456',
                role: 'creator'
            }
        });
        console.log(`Created user: ${newUser.username}`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

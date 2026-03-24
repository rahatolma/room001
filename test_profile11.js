const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.findFirst({ where: { phoneNumber: '5558889900' }});
    console.log("Found user?", !!user, user?.id);
}
main().catch(console.error).finally(() => prisma.$disconnect());

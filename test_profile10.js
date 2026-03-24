const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    console.log("Just verifying prisma exists.");
}
main().catch(console.error).finally(() => prisma.$disconnect());

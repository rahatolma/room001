const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ where: { phoneNumber: '5552223344' }});
  console.log("Users with 5552223344:", users.length, users.map(u => u.email));
}

main().catch(console.error).finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ where: { phoneNumber: '5558889900' }});
  console.log("Users with 5558889900:", users.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());

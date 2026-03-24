const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ 
    where: { phoneNumber: { contains: "555" } },
    select: { id: true, phoneNumber: true, email: true }
  });
  console.log("Users with 555:", users);
}

main().catch(console.error).finally(() => prisma.$disconnect());

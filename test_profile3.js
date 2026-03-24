const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { phoneNumber: '5555555555' }});
  
  if (!user) {
     console.log("No user found");
     return;
  }
  
  try {
      const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
              email: 'test@gmail.com',
              password: 'testpassword123',
              location: 'Ankara',
              phoneNumber: '5555555555'
          }
      });
      console.log("Success update:", updatedUser.location, updatedUser.phoneNumber, updatedUser.password);
  } catch(e) {
      console.error(e);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

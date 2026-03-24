const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { phoneNumber: '5555555555' }});
  
  if (!user) {
     console.log("No user found");
     return;
  }
  
  console.log("User currently:", user.email, user.phoneNumber, user.username, user.password, user.location, user.role);

  try {
      const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
              email: user.email,
              username: user.username,
              location: '',
              phoneNumber: '5552223344',
              password: 'testpassword123',
          }
      });
      console.log("Success update test:", updatedUser.phoneNumber);
  } catch(e) {
      console.error("Prisma Error:", e);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { phoneNumber: '5555555555' }});
  
  if (!user) {
     console.log("No user found");
     return;
  }
  
  const updates = {
     email: 'updated_email@test.com',
     username: 'updated_user_name',
     location: 'Istanbul, Turkey',
     phoneNumber: '5551234567' 
  };
  
  try {
      const updateData = {};
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.username !== undefined) updateData.username = updates.username;
      if (updates.location !== undefined) updateData.location = updates.location;
      if (updates.phoneNumber !== undefined) updateData.phoneNumber = updates.phoneNumber;
      
      const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: updateData
      });
      console.log("Success update:");
      console.log(updatedUser);
  } catch(e) {
      console.error(e);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

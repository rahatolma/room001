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
      
      if (updates.email !== undefined && updates.email !== '') {
          const existingEmail = await prisma.user.findFirst({
              where: { email: updates.email, id: { not: user.id } }
          });
          if (existingEmail) {
             console.log('Bu e-posta adresi başka bir hesap tarafından kullanılıyor.');
             return;
          }
          updateData.email = updates.email;
      }

      if (updates.phoneNumber !== undefined && updates.phoneNumber !== '') {
          const existingPhone = await prisma.user.findFirst({
              where: { phoneNumber: updates.phoneNumber, id: { not: user.id } }
          });
          if (existingPhone) {
              console.log('Bu telefon numarası başka bir hesap tarafından kullanılıyor.');
              return;
          }
          updateData.phoneNumber = updates.phoneNumber;
      }
      
  } catch(e) {
      console.error(e);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const userId = (await prisma.user.findFirst({ where: { phoneNumber: '5555555555' }})).id;
  console.log("Found user ID:", userId);

  const updates = {
    email: "temp_5555555555@room001.com",
    username: "user5555392",
    location: "",
    phoneNumber: "5552223344",
    password: "123456"
  };

  try {
    const updateData = {};
    if (updates.email !== undefined && updates.email !== '') {
        const existingEmail = await prisma.user.findFirst({
            where: { email: updates.email, id: { not: userId } }
        });
        if (existingEmail) {
            console.log("Email exists error");
            return;
        }
        updateData.email = updates.email;
    }

    if (updates.phoneNumber !== undefined && updates.phoneNumber !== '') {
        const existingPhone = await prisma.user.findFirst({
            where: { phoneNumber: updates.phoneNumber, id: { not: userId } }
        });
        if (existingPhone) {
            console.log("Phone exists error");
            return;
        }
        updateData.phoneNumber = updates.phoneNumber;
    }

    if (updates.fullName !== undefined) updateData.fullName = updates.fullName;
    if (updates.password !== undefined) updateData.password = updates.password;
    if (updates.bio !== undefined) updateData.bio = updates.bio;
    if (updates.username !== undefined) updateData.username = updates.username;
    if (updates.location !== undefined) updateData.location = updates.location;

    // Do the update
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        include: { socialAccounts: true }
    });

    console.log("Successfully updated:", updatedUser.phoneNumber);

  } catch (error) {
    console.error("Caught error:", error);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

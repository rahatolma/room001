const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Deleting all users...');
  
  // Due to foreign key constraints, we might need to delete related records first
  // However, Prisma's onDelete: Cascade should handle most if configured correctly.
  // Let's just try to delete all users.
  try {
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`Successfully deleted ${deletedUsers.count} users.`);
    
    // Also clear related sessions and accounts if they are not cascaded
    const deletedAccounts = await prisma.account.deleteMany({});
    console.log(`Successfully deleted ${deletedAccounts.count} accounts.`);
    
    const deletedSessions = await prisma.session.deleteMany({});
    console.log(`Successfully deleted ${deletedSessions.count} sessions.`);
    
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({ select: { username: true } });
    console.log(users.map((u: any) => u.username));
}

main().finally(() => prisma.$disconnect());

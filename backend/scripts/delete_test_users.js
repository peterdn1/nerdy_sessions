const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteTestUsers() {
  try {
    const users = await prisma.users.findMany({
      orderBy: { created_at: 'desc' },
      take: 2
    });

    for (const user of users) {
      await prisma.users.delete({ where: { id: user.id } });
      console.log(`Deleted user: ${user.email}`);
    }
  } catch (err) {
    console.error('Error deleting users:', err);
  } finally {
    await prisma.$disconnect();
  }
}

deleteTestUsers();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteTestUsers() {
  try {
    const user = await prisma.users.findUnique({
      where: { email: 'peterdunn1111@gmail.com' }
    });

    if (user) {
      await prisma.users.delete({ where: { id: user.id } });
      console.log(`Deleted user: ${user.email}`);
    } else {
      console.log('No test user found with email peterdunn1111@gmail');
    }
  } catch (err) {
    console.error('Error deleting users:', err);
  } finally {
    await prisma.$disconnect();
  }
}

deleteTestUsers();
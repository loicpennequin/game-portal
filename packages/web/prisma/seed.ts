import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function createTestUser() {
  return prisma.user.upsert({
    where: {
      email: 'test-user@gmail.com'
    },
    create: {
      email: 'test-user@gmail.com',
      username: 'test-user'
    },
    update: {}
  });
}

function createTestGame(user: User) {
  return prisma.game.upsert({
    where: { name: 'Test Game' },
    create: {
      name: 'Test Game',
      description: 'A game created via seed for test purposes',
      url: 'http://localhost:3001',
      apiKey: bcrypt.hashSync('12345', 10),
      authorId: user.id
    },
    update: {}
  });
}

(async function () {
  try {
    const user = await createTestUser();
    await createTestGame(user);
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();

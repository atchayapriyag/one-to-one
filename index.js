
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a new user and a post
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      post: {
        create: {
          title: 'My first post',
          content: 'Hello World!',
        },
      },
    },
  });

  console.log('Created user:', user);

  // Fetch user with post
  const userWithPost = await prisma.user.findUnique({
    where: { id: user.id },
    include: { post: true },
  });

  console.log('User with post:', userWithPost);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
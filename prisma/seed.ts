import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const numberOfPosts = 400;
const posts = new Array(numberOfPosts).fill(null).map((_, index) => ({
  title: `Post ${index + 1}`,
  content: `This is the content of the post ${
    index + 1
  }, which is a very long text. and will be used to test the performance of the query.`,
  published: true,
}));

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: posts.slice(0, 100),
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    posts: {
      create: posts.slice(100, 200),
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    posts: {
      create: posts.slice(200, 300),
    },
  },
  {
    name: "Nirav",
    email: "nirAv@prisma.io",
    posts: {
      create: posts.slice(300, 400),
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

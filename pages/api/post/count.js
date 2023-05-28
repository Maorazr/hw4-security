import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const count = await prisma.post.count({
    where: {
      published: true,
    },
  });
  res.json(count);
}

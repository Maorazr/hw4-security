// import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  if (req.method === "GET") {
    const page = Number(req.query.page) || 1;
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: { id: "desc" },
    });

    const count = await prisma.post.count({
      where: {
        published: true,
      },
    });

    res.json({ posts, count });
  }

  const { title, content, session, email } = req.body;

  if (session) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: email } },
      },
    });
    // res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

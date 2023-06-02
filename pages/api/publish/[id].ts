import type { NextApiResponse } from "next";
import type { NextApiRequest as NetxReq } from "next";

import prisma from "../../../lib/prisma";
import validateJWT from "../middleware/validateJWT";

// PUT /api/publish/:id
interface NextApiRequest extends NetxReq {
  userId?: Number;
}

export default validateJWT(async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;
  const userId = req.userId;

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });
  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  if (post.authorId !== userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const updatePost = await prisma.post.update({
    where: { id: Number(postId) },
    data: { published: true },
  });
  res.json(updatePost);
});

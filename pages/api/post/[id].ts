import type { NextApiResponse } from "next";
import type { NextApiRequest as NetxReq } from "next";
import prisma from "../../../lib/prisma";
import validateJWT from "../middleware/validateJWT";

interface NextApiRequest extends NetxReq {
  userId?: Number;
}

// DELETE /api/post/:id
async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  const userId = req.userId;

  if (req.method === "DELETE") {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!post || post.authorId !== userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return res.status(204).end();
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

export default validateJWT(handle);

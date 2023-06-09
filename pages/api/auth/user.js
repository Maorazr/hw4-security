import { PrismaClient } from "@prisma/client";
import validateJWT from "../middleware/validateJWT";

const prisma = new PrismaClient();
async function handle(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export default validateJWT(handle);

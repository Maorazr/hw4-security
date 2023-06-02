import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handle(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists." });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong during registration." });
  }
}

import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export default async function handle(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email does not exist." });
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword) {
    return res.status(409).json({ message: "Invalid Password." });
  }

  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({ token });
}

import prisma from "../../../lib/prisma";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

async function handle(req, res) {
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

    const token = jwt.sign(
      { userId: result.id, email: result.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // use HTTPS in production
        maxAge: 86400, // 1 hour
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Registration error: ${error.message}` });
  }
}

export default handle;

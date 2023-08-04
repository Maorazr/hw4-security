import prisma from "../../../lib/prisma";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const DEFAULT_PROFILE_PIC_URL =
  "https://res.cloudinary.com/dhl4ej1ci/image/upload/v1686382067/Blog/ProfilePic/Default_pfp_x11n6t.png";

async function handle(req, res) {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUserByUsername = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const existingUser = existingUserByUsername || existingUserByEmail;

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email or username already exists." });
  }

  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    const result = await prisma.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        password: hash,
        profilePic: DEFAULT_PROFILE_PIC_URL,
      },
    });

    const token = jwt.sign(
      {
        userId: result.id,
        email: result.email,
        username: result.username,
        name: result.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // false,
        maxAge: 86400, // 1d
        sameSite: "strict", //"none",
        path: "/",
      })
    );

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Registration error: ${error.message}` });
  }
}

export default handle;

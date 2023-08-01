import prisma from "../../../lib/prisma";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require("cookie");

async function handle(req, res) {
  const { userNameOrEmail, password } = req.body;

  if (!userNameOrEmail || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let user;
  if (userNameOrEmail.includes("@")) {
    user = await prisma.user.findUnique({
      where: {
        email: userNameOrEmail,
      },
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        username: userNameOrEmail,
      },
    });
  }

  if (!user) {
    return res.status(404).json({ message: "User does not exist." });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid Password." });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV !== "development",
      sameSite: "none", //"strict",
      maxAge: 86400,
      path: "/",
    })
  );

  res.status(200).json({ message: "Login successful." });
}

export default handle;

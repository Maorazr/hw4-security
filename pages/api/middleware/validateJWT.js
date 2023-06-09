const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const validateJWT = (handler) => (req, res) => {
  return new Promise((resolve, reject) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies["auth"];

    if (!token) {
      res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
      return resolve();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token." });
        return resolve();
      }

      req.userId = decoded.userId;
      resolve(handler(req, res));
    });
  });
};

export default validateJWT;

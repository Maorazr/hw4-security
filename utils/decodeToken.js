import jwt from "jsonwebtoken";
import cookie from "cookie";

export function decodeToken(req) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.auth;
  let decodedToken;

  if (token) {
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification error: ", err); // Log the error
    }
  }

  return decodedToken;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  res.setHeader("Set-Cookie", `auth=; Max-Age=0; Path=/; HttpOnly`);
  res.status(200).json({ message: "Logout successful." });
}

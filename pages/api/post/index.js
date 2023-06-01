import prisma from "../../../lib/prisma";
import Upload from "./uploadVideo";
import uploadMeta from "../../../lib/mongo";
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};
// POST /api/post
// Required fields in body: title
// Optional fields in body: content

export default async function handle(req, res) {
  if (req.method === "GET") {
    const page = parseInt(req.query.page) || 1;
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: { author: true },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: { id: "desc" },
    });

    const count = await prisma.post.count({
      where: {
        published: true,
      },
    });
    res.json({ posts, count });
  } else if (req.method === "POST") {
    const data = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log("Error occurred during form parsing: ", err);
          reject(err);
        }
        resolve({ fields, files });
      });
    });
    const { fields, files } = data;
    const { title, content, session, email } = fields;

    if (session) {
      let response = null;
      let postData = {
        title: title,
        content: content,
        author: { connect: { email: email } },
      };
      if (files?.file?.filepath) {
        response = await Upload(files.file);
        postData["videoUrl"] = response.url;
      }
      const post = await prisma.post.create({
        data: postData,
        include: { author: true },
      });

      if (response) {
        uploadMeta(
          post.author.name,
          post.id,
          new Date().toISOString(),
          response.url
        );
      }
      res.json(post);
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

import prisma from "../../../lib/prisma";
import Upload from "./uploadVideo";
import uploadMeta from "../../../lib/mongo";
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getPosts(req, res) {
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
}

async function createPost(req, res) {
  // Modified function to handle optional files
  try {
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
    const { title, content } = fields;

    let response = null;
    let postData = {
      title: title,
      content: content,
      //author: { connect: { id: req.userId } }, // Temporarily commented out to allow anonymous post creation
    };

    if (files?.file?.filepath) {
      // Check if file is attached before processing it
      response = await Upload(files.file, "video");
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

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Post creation error: ${error.message}` });
  }
}

async function getAllPosts(req, res) {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });

  res.json({ posts });
}

export default function handle(req, res) {
  switch (req.method) {
    case "GET":
      if (req.query.all) return getAllPosts(req, res);
      else return getPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      res.status(405).end();
      break;
  }
}

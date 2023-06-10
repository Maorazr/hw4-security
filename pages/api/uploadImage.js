const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");
import ValidateJWT from "./middleware/validateJWT";
import prisma from "../../lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: "dhl4ej1ci",
  api_key: "621887279844749",
  api_secret: "FW-0Yi_hI0cHr2Y4W710ydtb5i0",
});

const uploadImage = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Method not allowed" });
  }

  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error", err);
      throw err;
    }

    const file = files.file;

    const response = await cloudinary.uploader.upload(file.filepath, {
      folder: "Blog/ProfilePic",
      resource_type: "image",
      public_id: uuidv4(),
    });

    if (!response) {
      return res.status(500).json({ message: "Something went wrong." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId }, // user's ID
      data: { profilePic: response.url }, // URL of the uploaded image
    });

    res.status(200).json(response);
  });
};

export default ValidateJWT(uploadImage);

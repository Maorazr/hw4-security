const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: "dhl4ej1ci",
  api_key: "621887279844749",
  api_secret: "FW-0Yi_hI0cHr2Y4W710ydtb5i0",
});

const Upload = async (file, resourceType) => {
  const filePath = file.filepath;
  const response = await cloudinary.uploader.upload(filePath, {
    resource_type: resourceType,
    public_id: uuidv4(),
  });
  return response;
};

export default Upload;

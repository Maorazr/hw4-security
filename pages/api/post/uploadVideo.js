const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dhl4ej1ci",
  api_key: "621887279844749",
  api_secret: "FW-0Yi_hI0cHr2Y4W710ydtb5i0",
});

const Upload = async (file) => {
  const videoPath = file.filepath;
  const response = await cloudinary.uploader.upload(videoPath, {
    resource_type: "video",
    public_id: "my_video",
  });
  return response;
};

export default Upload;

const { ImageKit, toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY?.trim()
});

async function uploadFile(buffer, fileName = "image.jpg") {
  if (!buffer) {
    throw new Error("Image buffer is required");
  }

  if (!process.env.IMAGEKIT_PRIVATE_KEY?.trim()) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is missing");
  }

  const file = await toFile(buffer, fileName);

    const result = await imagekit.files.upload({
    file,
    fileName,
    });

    return result;
}

module.exports = uploadFile;
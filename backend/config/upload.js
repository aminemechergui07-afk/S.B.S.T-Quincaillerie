const path = require("path");
const multer = require("multer");

const uploadsDir = path.join(__dirname, "..", "uploads");

const getFileExtension = (file) => {
  const originalExtension = path.extname(file.originalname || "").toLowerCase();

  if (originalExtension) {
    return originalExtension;
  }

  const mimeExtension = (file.mimetype || "").split("/")[1];
  return mimeExtension ? `.${mimeExtension.toLowerCase()}` : "";
};

const createStorage = () =>
  multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${getFileExtension(file)}`;
      cb(null, uniqueName);
    },
  });

const imageOnlyFilter = (_req, file, cb) => {
  if (!file.mimetype || !file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"));
  }

  cb(null, true);
};

const createUploader = () =>
  multer({
    storage: createStorage(),
    fileFilter: imageOnlyFilter,
  });

module.exports = { createUploader };

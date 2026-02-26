const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: "tuitionplus_materials",

    resource_type: "raw", // IMPORTANT: allows PDF, DOCX, etc

    allowed_formats: [
      "pdf",
      "doc",
      "docx",
      "ppt",
      "pptx",
      "xls",
      "xlsx",
      "txt",
      "jpg",
      "png"
    ],

    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname;
    }
  }
});

const upload = multer({
  storage: storage
});

module.exports = upload;
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: async (req, file) => ({

        folder: "tuitionplus_materials",

        resource_type: "auto",

        type: "upload",           // IMPORTANT → makes file public

        access_mode: "public"     // IMPORTANT → allows public access

    })

});

const upload = multer({

    storage: storage

});

module.exports = upload;
const Material = require("../models/materialModel");

const Notification =
require("../models/notificationModel");
// CREATE MATERIAL (Admin / Teacher)


exports.createMaterial = async (req, res) => {

 try {

  if (!req.file) {

   return res.status(400).json({
    message: "No file uploaded"
   });

  }

  const material = new Material({

   title: req.body.title,
   description: req.body.description,
   fileUrl: req.file.path,
public_id: req.file.filename,
   classId: req.body.classId,
   subjectId: req.body.subjectId,
   uploadedBy: req.body.uploadedBy,
   uploaderRole: req.body.uploaderRole

  });

  await material.save();

  console.log("Material saved:", material._id);


  // CREATE NOTIFICATION
  const notification = await Notification.create({

   userId: req.body.classId,
   message: `New material uploaded: ${req.body.title}`,
   role: "Student"

  });

  console.log("Notification saved:", notification._id);


  res.status(201).json({

   success: true,
   message: "Material uploaded successfully",
   material

  });

 }
 catch (error) {

  console.error("Material upload error:", error.message);

  res.status(500).json({

   success: false,
   message: error.message

  });

 }

};

// GET ALL MATERIALS (Admin)

exports.getAllMaterials = async (req, res) => {

    try {

        const materials = await Material.find()

        .populate("classId", "sclassName")

        .populate("subjectId", "subName")

        .sort({ createdAt: -1 });

        res.status(200).json(materials);

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// GET MATERIALS BY CLASS (Student)

exports.getMaterialsByClass = async (req, res) => {

    try {

        const materials = await Material.find({

            classId: req.params.classId

        })

        .populate("subjectId", "subName")

        .populate("uploadedBy")

        .sort({ createdAt: -1 });

        res.status(200).json(materials);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// DELETE MATERIAL
exports.deleteMaterial = async (req, res) => {

    try {

        await Material.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Material deleted successfully"
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getMaterials = async (req, res) => {

    try {

        const materials = await Material.find({
            classId: req.params.classId
        })

        .populate({
            path: "classId",
            model: "sclass",
            select: "sclassName"
        })

        .populate({
            path: "subjectId",
            model: "subject",
            select: "subName"
        })

        .populate({
            path: "uploadedBy",
            model: "admin teacher",
            select: "name"
        })

        .sort({ createdAt: -1 });

        res.status(200).json(materials);

    }
    catch (error) {

        console.log("FETCH MATERIAL ERROR:");
        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};
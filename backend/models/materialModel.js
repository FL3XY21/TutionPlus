const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: String,

    fileUrl: {
        type: String,
        required: true
    },

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sclass",
        required: true
    },

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "uploaderRole"
    },

    uploaderRole: {
        type: String,
        required: true,
        enum: ["Admin", "Teacher"]
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("material", materialSchema);
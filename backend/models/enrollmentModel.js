const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true
    },

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sclass",
        required: true
    },

    enrolledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }

}, { timestamps: true });

module.exports =
mongoose.model("enrollment", enrollmentSchema);
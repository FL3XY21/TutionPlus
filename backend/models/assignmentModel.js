const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({

    title: String,

    description: String,

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sclass"
    },

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject"
    },

    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },

    deadline: Date

},
{
    timestamps: true
});

module.exports = mongoose.model("Assignment", assignmentSchema);
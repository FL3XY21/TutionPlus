const Assignment = require("../models/assignmentModel");


// Create Assignment (Admin or Teacher)

exports.createAssignment = async (req, res) => {

    try {

        const assignment = new Assignment({

            title: req.body.title,

            description: req.body.description,

            classId: req.body.classId,

            subjectId: req.body.subjectId,

            teacherId: req.body.teacherId,

            createdBy: req.body.createdBy,

            deadline: req.body.deadline

        });

        const savedAssignment = await assignment.save();

        res.status(201).json(savedAssignment);

    }
    catch (error) {

        res.status(500).json({
            message: "Failed to create assignment",
            error
        });

    }

};



// Admin → Get ALL assignments


exports.getAllAssignments = async (req, res) => {

    try {

        const assignments = await Assignment.find()

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
            path: "teacherId",
            model: "teacher",
            select: "name"
        })

        .populate({
            path: "createdBy",
            model: "admin",
            select: "name email"
        })

        .sort({ createdAt: -1 });

        res.status(200).json(assignments);

    }
    catch (error) {

        console.log("Assignment fetch error:", error);

        res.status(500).json({
            message: error.message
        });

    }

};  



// Student → Get assignments by class

exports.getAssignmentsByClass = async (req, res) => {

    try {

        const assignments = await Assignment.find({

            classId: req.params.classId

        })
        .populate("subjectId", "subName")
        .populate("teacherId", "name");

        res.status(200).json(assignments);

    }
    catch (error) {

        res.status(500).json({

            message: "Failed to fetch assignments",

            error

        });

    }

};



// Teacher → Get own assignments

exports.getAssignmentsByTeacher = async (req, res) => {

    try {

        const assignments = await Assignment.find({

            teacherId: req.params.teacherId

        })
        .populate("classId", "sclassName")
        .populate("subjectId", "subName");

        res.status(200).json(assignments);

    }
    catch (error) {

        res.status(500).json({

            message: "Failed to fetch teacher assignments",

            error

        });

    }

};



// Delete assignment (Admin)

exports.deleteAssignment = async (req, res) => {

    try {

        await Assignment.findByIdAndDelete(req.params.id);

        res.status(200).json({

            message: "Assignment deleted successfully"

        });

    }
    catch (error) {

        res.status(500).json({

            message: "Failed to delete assignment",

            error

        });

    }

};
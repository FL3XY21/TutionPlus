const Enrollment = require("../models/enrollmentModel");


// Admin enroll student
exports.enrollStudent = async (req, res) => {

    try {

        const exists =
        await Enrollment.findOne({

            studentId: req.body.studentId,
            classId: req.body.classId

        });

        if (exists) {

            return res.status(400).json({
                message: "Student already enrolled"
            });

        }

        const enrollment =
        new Enrollment(req.body);

        await enrollment.save();

        res.status(201).json({
            message: "Student enrolled successfully",
            enrollment
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// Get student enrollments

exports.getStudentEnrollments = async (req, res) => {

    try {

        const enrollments =
        await Enrollment.find({

            studentId: req.params.studentId

        })
        .populate("classId", "sclassName");

        res.json(enrollments);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Admin view all enrollments

exports.getAllEnrollments = async (req, res) => {

    try {

        const enrollments =
        await Enrollment.find()
        .populate("studentId", "name")
        .populate("classId", "sclassName");

        res.json(enrollments);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
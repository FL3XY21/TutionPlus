const Submission = require("../models/submissionModel");

// Student submits assignment
exports.submitAssignment = async (req, res) => {
    try {
        const submission = new Submission(req.body);
        const savedSubmission = await submission.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        res.status(500).json({ message: "Submission failed", error });
    }
};

// Get submissions by assignment (Teacher view)
exports.getSubmissionsByAssignment = async (req, res) => {
    try {
        const submissions = await Submission.find({
            assignmentId: req.params.assignmentId
        });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch submissions", error });
    }
};

// Get submissions by student
exports.getSubmissionsByStudent = async (req, res) => {
    try {
        const submissions = await Submission.find({
            studentId: req.params.studentId
        });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch student submissions", error });
    }
};

// Grade submission (Teacher)
exports.gradeSubmission = async (req, res) => {
    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(
            req.params.id,
            {
                grade: req.body.grade,
                feedback: req.body.feedback
            },
            { new: true }
        );

        res.status(200).json(updatedSubmission);
    } catch (error) {
        res.status(500).json({ message: "Grading failed", error });
    }
};
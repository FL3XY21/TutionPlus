const Student = require("../models/studentSchema");
const Teacher = require("../models/teacherSchema");
const Sclass = require("../models/sclassSchema");
const Subject = require("../models/subjectSchema");
const Assignment = require("../models/assignmentModel");
const Submission = require("../models/submissionModel");
const Material = require("../models/materialModel");
const Enrollment = require("../models/enrollmentModel");

exports.getAdminDashboard = async (req, res) => {

    try {

        const data = {

            totalStudents: await Student.countDocuments(),

            totalTeachers: await Teacher.countDocuments(),

            totalClasses: await Sclass.countDocuments(),

            totalSubjects: await Subject.countDocuments(),

            totalAssignments: await Assignment.countDocuments(),

            totalSubmissions: await Submission.countDocuments(),

            totalMaterials: await Material.countDocuments(),

            totalEnrollments: await Enrollment.countDocuments()

        };

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json(error);

    }

};
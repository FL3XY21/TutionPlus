const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');
const {
    createMaterial,
    getAllMaterials,
    getMaterialsByClass,
    deleteMaterial
} = require("../controllers/material-controller");

const {
 enrollStudent,
 getStudentEnrollments,
 getAllEnrollments
} =
require("../controllers/enrollment-controller");

const {
 createNotification,
 getNotifications,
 getAllNotifications
} =
require("../controllers/notification-controller");

const {
    createAssignment,
    getAllAssignments,
    getAssignmentsByClass,
    getAssignmentsByTeacher,
    deleteAssignment
} = require("../controllers/assignment-controller");

const {
    submitAssignment,
    getSubmissionsByAssignment,
    getSubmissionsByStudent,
    gradeSubmission
} = require("../controllers/submission-controller");
const { getAdminDashboard } = require("../controllers/dashboard-controller");
const upload = require("../middleware/cloudinaryUpload");
router.post(
    "/MaterialCreate",
    upload.single("file"),
    createMaterial
);
router.get("/AdminDashboard", getAdminDashboard);
router.post(
 "/NotificationCreate",
 createNotification
);

router.get(
 "/Notifications/:userId",
 getNotifications
);
router.get(
 "/Notifications",
 getAllNotifications
);
// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)


router.post("/MaterialCreate", createMaterial);

router.get("/Materials", getAllMaterials);
router.get("/MaterialList/:classId", getAllMaterials);

router.delete("/Material/:id", deleteMaterial);



router.post("/Enroll", enrollStudent);

router.get("/Enrollments", getAllEnrollments);

router.get(
 "/EnrollmentsStudent/:studentId",
 getStudentEnrollments
);

// Assignment routes
router.post("/AssignmentCreate", createAssignment);

router.get("/Assignments", getAllAssignments);

router.get("/AssignmentsClass/:classId", getAssignmentsByClass);

router.get("/AssignmentsTeacher/:teacherId", getAssignmentsByTeacher);

router.delete("/Assignment/:id", deleteAssignment);


// Submission routes

router.post("/SubmissionCreate", submitAssignment);

router.get("/SubmissionsAssignment/:assignmentId", getSubmissionsByAssignment);

router.get("/SubmissionsStudent/:studentId", getSubmissionsByStudent);

router.put("/SubmissionGrade/:id", gradeSubmission);
module.exports = router;
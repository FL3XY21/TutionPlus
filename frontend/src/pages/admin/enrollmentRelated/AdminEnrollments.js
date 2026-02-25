import React, { useEffect, useState } from "react";
import axios from "axios";

import {
 Box,
 Button,
 MenuItem,
 TextField,
 Typography,
 Card,
 CardContent
}
from "@mui/material";

const AdminEnrollments = () => {

 const [students, setStudents] = useState([]);
 const [classes, setClasses] = useState([]);
 const [enrollments, setEnrollments] = useState([]);

 const [studentId, setStudentId] = useState("");
 const [classId, setClassId] = useState("");

 const admin =
 JSON.parse(localStorage.getItem("user"));

 useEffect(() => {

  fetchStudents();
  fetchClasses();
  fetchEnrollments();

 }, []);


 const fetchStudents = async () => {

  const res =
  await axios.get(
   `https://tutionplus.onrender.com/Students/${admin._id}`
  );

  setStudents(res.data);

 };


 const fetchClasses = async () => {

  const res =
  await axios.get(
   `http://localhost:5000/SclassList/${admin._id}`
  );

  setClasses(res.data);

 };


 const fetchEnrollments = async () => {

  const res =
  await axios.get(
   "https://tutionplus.onrender.com/Enrollments"
  );

  setEnrollments(res.data);

 };


 const enroll = async () => {

  await axios.post(
   "https://tutionplus.onrender.com/Enroll",
   {
    studentId,
    classId,
    enrolledBy: admin._id
   }
  );

  alert("Student enrolled");

  fetchEnrollments();

 };


 return (

  <Box p={3}>

   <Typography variant="h4">
    Enroll Student
   </Typography>


   <TextField
    select
    fullWidth
    label="Student"
    onChange={(e)=>setStudentId(e.target.value)}
   >
    {students.map(s=>(
     <MenuItem key={s._id} value={s._id}>
      {s.name}
     </MenuItem>
    ))}
   </TextField>


   <TextField
    select
    fullWidth
    label="Class"
    onChange={(e)=>setClassId(e.target.value)}
   >
    {classes.map(c=>(
     <MenuItem key={c._id} value={c._id}>
      {c.sclassName}
     </MenuItem>
    ))}
   </TextField>


   <Button
    variant="contained"
    onClick={enroll}
   >
    Enroll
   </Button>


   <Typography variant="h5" mt={4}>
    Enrolled Students
   </Typography>


   {enrollments.map(e=>(
    <Card key={e._id} sx={{mt:2}}>
     <CardContent>
      Student: {e.studentId?.name}
      <br/>
      Class: {e.classId?.sclassName}
     </CardContent>
    </Card>
   ))}

  </Box>

 );

};

export default AdminEnrollments;
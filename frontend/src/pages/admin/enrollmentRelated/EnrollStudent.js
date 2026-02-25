import React, { useEffect, useState }
from "react";

import axios from "axios";

import {
 Box,
 Button,
 MenuItem,
 TextField,
 Typography
}
from "@mui/material";


const EnrollStudent = () => {

 const [students, setStudents] =
 useState([]);

 const [classes, setClasses] =
 useState([]);

 const [studentId, setStudentId] =
 useState("");

 const [classId, setClassId] =
 useState("");


 useEffect(() => {

  fetchStudents();
  fetchClasses();

 }, []);


 const fetchStudents = async () => {

  const res =
  await axios.get(
   "http://localhost:5000/Students"
  );

  setStudents(res.data);

 };


 const fetchClasses = async () => {

  const res =
  await axios.get(
   "http://localhost:5000/SclassList"
  );

  setClasses(res.data);

 };


 const enroll = async () => {

  await axios.post(
   "http://localhost:5000/Enroll",
   {
    studentId,
    classId,
    enrolledBy:
    JSON.parse(
     localStorage.getItem("user")
    )._id
   }
  );

  alert("Student enrolled");

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
    onChange={(e)=>
    setStudentId(e.target.value)}
   >

    {students.map(s => (

     <MenuItem
      key={s._id}
      value={s._id}
     >
      {s.name}
     </MenuItem>

    ))}

   </TextField>


   <TextField
    select
    fullWidth
    label="Class"
    onChange={(e)=>
    setClassId(e.target.value)}
   >

    {classes.map(c => (

     <MenuItem
      key={c._id}
      value={c._id}
     >
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


  </Box>

 );

};

export default EnrollStudent;
import React,
{ useEffect, useState }
from "react";

import axios from "axios";

import {
 Box,
 Typography,
 Card,
 CardContent,
 CircularProgress
}
from "@mui/material";


const ShowNotifications = () => {

 const [notifications,
 setNotifications] =
 useState([]);

 const [loading,
 setLoading] =
 useState(true);


 useEffect(()=>{

  fetchNotifications();

 },[]);


 const fetchNotifications =
 async ()=>{

  try{

   const res =
   await axios.get(
    "http://localhost:5000/Notifications"
   );

   setNotifications(res.data);

  }
  catch(error){

   console.log(error);

  }

  setLoading(false);

 };


 if(loading){

  return (
   <CircularProgress/>
  );

 }


 return (

  <Box p={3}>

   <Typography variant="h4">

    Notifications

   </Typography>


   {notifications.map(n=>(
    <Card key={n._id}
     sx={{mt:2}}
    >

     <CardContent>

      <Typography>

       {n.message}

      </Typography>

      <Typography
       variant="caption"
      >

       {new Date(
        n.createdAt
       ).toLocaleString()}

      </Typography>

     </CardContent>

    </Card>
   ))}

  </Box>

 );

};

export default ShowNotifications;
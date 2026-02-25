import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Chip
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { useSelector } from "react-redux";



const StudentMaterials = () => {

  const { currentUser } =
    useSelector(state => state.user);

  const classId =
    currentUser?.sclassName?._id;



  const [materials, setMaterials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    fetchMaterials();

  }, []);



  const fetchMaterials =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/MaterialList/${classId}`
          );

        setMaterials(res.data);

      }
      catch (err) {

        console.log(err);

      }

      setLoading(false);

    };



  const getFileType =
    (url) => {

      if (!url)
        return "FILE";

      if (url.includes(".pdf"))
        return "PDF";

      if (url.includes(".doc"))
        return "DOC";

      if (url.includes(".ppt"))
        return "PPT";

      if (url.includes(".jpg") ||
          url.includes(".png"))
        return "IMAGE";

      return "FILE";

    };



  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={6}
      >
        <CircularProgress />
      </Box>
    );



  return (

    <Box>

      {/* HEADER */}

      <Box
        display="flex"
        alignItems="center"
        mb={3}
      >

        <MenuBookIcon
          sx={{
            fontSize: 32,
            mr: 1,
            color: "#7c3aed"
          }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Study Materials
        </Typography>

      </Box>



      {/* EMPTY STATE */}

      {materials.length === 0 &&
        (
          <Paper
            sx={{
              p: 4,
              textAlign: "center"
            }}
          >

            <Typography>
              No materials available
            </Typography>

          </Paper>
        )
      }



      {/* MATERIAL CARDS */}

      <Grid container spacing={3}>

        {materials.map(
          (material) => (

            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={material._id}
            >

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform:
                      "translateY(-5px)",
                    boxShadow: 6
                  }
                }}
              >

                {/* ICON */}

                <DescriptionIcon
                  sx={{
                    fontSize: 40,
                    color: "#7c3aed",
                    mb: 1
                  }}
                />



                {/* TITLE */}

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {material.title}
                </Typography>



                {/* DESCRIPTION */}

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                >
                  {material.description}
                </Typography>



                {/* FILE TYPE */}

                <Chip
                  label={
                    getFileType(
                      material.fileUrl
                    )
                  }
                  sx={{
                    mb: 2
                  }}
                />



                {/* VIEW BUTTON */}

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    <DownloadIcon />
                  }
                  href={
                    material.fileUrl
                  }
                  target="_blank"
                >
                  View Material
                </Button>

              </Paper>

            </Grid>

          )
        )}

      </Grid>

    </Box>

  );

};



export default StudentMaterials;
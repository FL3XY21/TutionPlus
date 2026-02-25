import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Typography,
    Grid,
    Box,
    Button,
    Card,
    CardContent
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import MaterialCard from "./MaterialCard";
const ShowMaterials = () => {

    const navigate = useNavigate();

    const [materials, setMaterials] = useState([]);

    useEffect(() => {

        fetchMaterials();

    }, []);

    const fetchMaterials = async () => {

        const res = await axios.get(
            "https://tutionplus.onrender.com/Materials"
        );

        setMaterials(res.data);

    };

    return (

        <Box p={3}>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >

                <Typography variant="h4">
                    Study Materials
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/Admin/materials/create")
                    }
                >
                    Add Material
                </Button>

            </Box>

 <Grid container spacing={3}>

    {materials.map((material) => (

        <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={material._id}
        >

            <MaterialCard material={material} />

        </Grid>

    ))}

</Grid>

        </Box>

    );

};

export default ShowMaterials;
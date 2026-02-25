import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    TextField,
    Button,
    Avatar,
    Card,
    CardContent,
    IconButton,
    Stack
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

const TeacherMaterials = () => {

    const { currentUser } = useSelector(state => state.user);

    const teacherId = currentUser?._id;
    const classId = currentUser?.teachSclass?._id;
    const subjectId = currentUser?.teachSubject?._id;

    const [materials, setMaterials] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await axios.get(
                "https://tutionplus.onrender.com/Materials"
            );

            // Filter only teacher materials
            const teacherMaterials = res.data.filter(
                m => m.uploadedBy === teacherId
            );

            setMaterials(teacherMaterials);
        }
        catch (err) {
            console.log(err);
        }
    };

    const uploadMaterial = async () => {

        if (!file) return;

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("classId", classId);
        formData.append("subjectId", subjectId);
        formData.append("uploadedBy", teacherId);
        formData.append("uploaderRole", "teacher");
        formData.append("file", file);

        await axios.post(
            "https://tutionplus.onrender.com/MaterialCreate",
            formData
        );

        setTitle("");
        setDescription("");
        setFile(null);

        fetchMaterials();
    };

    const deleteMaterial = async (id) => {

        await axios.delete(
            `https://tutionplus.onrender.com/Material/${id}`
        );

        fetchMaterials();
    };

    return (
        <Container maxWidth="lg">

            {/* Header */}
            <Header>
                <Avatar sx={{ bgcolor: "#7c3aed" }}>
                    <MenuBookIcon />
                </Avatar>
                <Box>
                    <Typography variant="h5">
                        Study Materials
                    </Typography>
                    <Typography variant="body2">
                        Upload and manage class resources
                    </Typography>
                </Box>
            </Header>

            {/* Upload Section */}
            <FormCard>
                <Typography variant="h6" mb={2}>
                    Upload New Material
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadFileIcon />}
                        >
                            Choose File
                            <input
                                type="file"
                                hidden
                                onChange={e => setFile(e.target.files[0])}
                            />
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <UploadButton
                            onClick={uploadMaterial}
                        >
                            Upload Material
                        </UploadButton>
                    </Grid>

                </Grid>
            </FormCard>

            {/* Materials List */}
            <Grid container spacing={3} mt={1}>

                {materials.map(m => (

                    <Grid item xs={12} md={6} key={m._id}>

                        <MaterialCard>

                            <CardContent>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Box>

                                        <Typography fontWeight="bold">
                                            {m.title}
                                        </Typography>

                                        <Typography variant="body2">
                                            {m.description}
                                        </Typography>

                                        <Button
                                            size="small"
                                            href={m.fileUrl}
                                            target="_blank"
                                        >
                                            View File
                                        </Button>

                                    </Box>

                                    <IconButton
                                        onClick={() =>
                                            deleteMaterial(m._id)
                                        }
                                    >
                                        <DeleteIcon color="error"/>
                                    </IconButton>

                                </Stack>

                            </CardContent>

                        </MaterialCard>

                    </Grid>

                ))}

            </Grid>

        </Container>
    );
};

export default TeacherMaterials;


/* Styled */

const Header = styled(Paper)`
display:flex;
gap:15px;
align-items:center;
padding:20px;
border-radius:16px;
margin-bottom:20px;
`;

const FormCard = styled(Paper)`
padding:20px;
border-radius:16px;
margin-bottom:20px;
`;

const MaterialCard = styled(Card)`
border-radius:16px;
`;

const UploadButton = styled(Button)`
background:linear-gradient(135deg,#2563eb,#7c3aed);
color:white;
margin-top:10px;
`;
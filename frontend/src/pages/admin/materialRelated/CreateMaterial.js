
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const CreateMaterial = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [file, setFile] = useState(null);

    const [form, setForm] = useState({

        title: "",
        description: "",
        classId: "",
        subjectId: ""

    });

    const [error, setError] = useState("");

    useEffect(() => {

        fetchClasses();
        fetchSubjects();

    }, []);

    const fetchClasses = async () => {

        try {

            const res = await axios.get(
                `https://tutionplus.onrender.com/SclassList/${user._id}`
            );

            setClasses(res.data);

        }
        catch (err) {

            setError("Failed to load classes");

        }

    };

    const fetchSubjects = async () => {

        try {

            const res = await axios.get(
                `https://tutionplus.onrender.com/AllSubjects/${user._id}`
            );

            setSubjects(res.data);

        }
        catch (err) {

            setError("Failed to load subjects");

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    const handleFileChange = (e) => {

        setFile(e.target.files[0]);

    };

    const handleSubmit = async () => {

        try {

            if (!file) {

                setError("Please select file");

                return;

            }

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("classId", form.classId);
            formData.append("subjectId", form.subjectId);
            formData.append("uploadedBy", user._id);
            formData.append("uploaderRole", user.role);
            formData.append("file", file);

            await axios.post(
                "https://tutionplus.onrender.com/MaterialCreate",

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            navigate("/Admin/materials");

        }
       catch (error) {

    console.error("Upload error:", error.response?.data || error.message);

    setError(
        error.response?.data?.message ||
        "Upload failed"
    );

}

    };

    return (

        <Box maxWidth="500px" p={3}>

            <Typography variant="h4" mb={2}>
                Upload Study Material
            </Typography>

            {error && (

                <Alert severity="error">
                    {error}
                </Alert>

            )}

            <TextField
                fullWidth
                label="Title"
                name="title"
                margin="normal"
                onChange={handleChange}
            />

            <TextField
                fullWidth
                label="Description"
                name="description"
                margin="normal"
                onChange={handleChange}
            />

            <TextField
                select
                fullWidth
                label="Class"
                name="classId"
                margin="normal"
                onChange={handleChange}
            >

                {classes.map((c) => (

                    <MenuItem
                        key={c._id}
                        value={c._id}
                    >
                        {c.sclassName}
                    </MenuItem>

                ))}

            </TextField>

            <TextField
                select
                fullWidth
                label="Subject"
                name="subjectId"
                margin="normal"
                onChange={handleChange}
            >

                {subjects.map((s) => (

                    <MenuItem
                        key={s._id}
                        value={s._id}
                    >
                        {s.subName}
                    </MenuItem>

                ))}

            </TextField>

            <input
                type="file"
                onChange={handleFileChange}
                style={{ marginTop: "20px" }}
            />

            <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                Upload Material
            </Button>

        </Box>

    );

};

export default CreateMaterial;
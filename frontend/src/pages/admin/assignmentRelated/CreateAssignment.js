import React, { useEffect, useState } from "react";
import axios from "axios";

import {

    Box,
    TextField,
    Button,
    Typography,
    MenuItem

} from "@mui/material";

import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {

    const navigate = useNavigate();

    const adminId = JSON.parse(
        localStorage.getItem("user")
    )._id;

    const [classes, setClasses] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [teachers, setTeachers] = useState([]);

    const [form, setForm] = useState({

        title: "",

        description: "",

        classId: "",

        subjectId: "",

        teacherId: "",

        deadline: ""

    });

    useEffect(() => {

        fetchClasses();

        fetchSubjects();

        fetchTeachers();

    }, []);

    const fetchClasses = async () => {

        const res = await axios.get(
            `https://tutionplus.onrender.com/SclassList/${adminId}`
        );

        setClasses(res.data);

    };

    const fetchSubjects = async () => {

        const res = await axios.get(
            `https://tutionplus.onrender.com/AllSubjects/${adminId}`
        );

        setSubjects(res.data);

    };

    const fetchTeachers = async () => {

        const res = await axios.get(
            `https://tutionplus.onrender.com/Teachers/${adminId}`
        );

        setTeachers(res.data);

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async () => {

        await axios.post(

            "https://tutionplus.onrender.com/AssignmentCreate",

            {

                ...form,

                createdBy: adminId

            }

        );

        navigate("/Admin/assignments");

    };

    return (

        <Box maxWidth="500px">

            <Typography variant="h4" mb={3}>
                Create Assignment
            </Typography>

            <TextField
                fullWidth
                label="Title"
                name="title"
                onChange={handleChange}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Description"
                name="description"
                onChange={handleChange}
                margin="normal"
            />

            <TextField
                select
                fullWidth
                label="Class"
                name="classId"
                onChange={handleChange}
                margin="normal"
            >

                {classes.map((c) => (

                    <MenuItem key={c._id} value={c._id}>
                        {c.sclassName}
                    </MenuItem>

                ))}

            </TextField>

            <TextField
                select
                fullWidth
                label="Subject"
                name="subjectId"
                onChange={handleChange}
                margin="normal"
            >

                {subjects.map((s) => (

                    <MenuItem key={s._id} value={s._id}>
                        {s.subName}
                    </MenuItem>

                ))}

            </TextField>

            <TextField
                select
                fullWidth
                label="Teacher"
                name="teacherId"
                onChange={handleChange}
                margin="normal"
            >

                {teachers.map((t) => (

                    <MenuItem key={t._id} value={t._id}>
                        {t.name}
                    </MenuItem>

                ))}

            </TextField>

            <TextField
                fullWidth
                type="date"
                name="deadline"
                onChange={handleChange}
                margin="normal"
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                Create Assignment
            </Button>

        </Box>

    );

};

export default CreateAssignment;
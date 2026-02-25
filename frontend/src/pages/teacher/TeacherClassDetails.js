import { useEffect } from "react";
import * as React from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    getClassStudents
} from "../../redux/sclassRelated/sclassHandle";

import {
    Paper,
    Box,
    Typography,
    ButtonGroup,
    Button,
    Popper,
    Grow,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Container,
    Avatar,
    Stack,
    CircularProgress
} from "@mui/material";

import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    School,
    People
} from "@mui/icons-material";

import TableTemplate from "../../components/TableTemplate";

import {
    BlackButton,
    BlueButton
} from "../../components/buttonStyles";



const TeacherClassDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassStudents, loading, error, getresponse } =
        useSelector((state) => state.sclass);

    const { currentUser } =
        useSelector((state) => state.user);

    const classID =
        currentUser.teachSclass?._id;

    const subjectID =
        currentUser.teachSubject?._id;



    useEffect(() => {

        dispatch(getClassStudents(classID));

    }, [dispatch, classID]);



    if (error) console.log(error);



    const studentColumns = [

        {
            id: "name",
            label: "Student Name",
            minWidth: 170
        },

        {
            id: "rollNum",
            label: "Roll Number",
            minWidth: 100
        }

    ];



    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id
    }));



    const StudentsButtonHaver = ({ row }) => {

        const options = [
            "Take Attendance",
            "Provide Marks"
        ];

        const [open, setOpen] = React.useState(false);

        const anchorRef = React.useRef(null);

        const [selectedIndex, setSelectedIndex] =
            React.useState(0);



        const handleClick = () => {

            if (selectedIndex === 0)
                navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);

            else
                navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);

        };



        const handleMenuItemClick = (event, index) => {

            setSelectedIndex(index);

            setOpen(false);

        };



        const handleToggle = () =>
            setOpen((prev) => !prev);



        const handleClose = (event) => {

            if (anchorRef.current &&
                anchorRef.current.contains(event.target))
                return;

            setOpen(false);

        };



        return (

            <Stack direction="row" spacing={1}>

                <BlueButton
                    variant="contained"
                    onClick={() =>
                        navigate(`/Teacher/class/student/${row.id}`)
                    }
                >
                    View
                </BlueButton>



                <ButtonGroup
                    variant="contained"
                    ref={anchorRef}
                >

                    <Button onClick={handleClick}>
                        {options[selectedIndex]}
                    </Button>

                    <BlackButton
                        size="small"
                        onClick={handleToggle}
                    >
                        {open ?
                            <KeyboardArrowUp /> :
                            <KeyboardArrowDown />
                        }
                    </BlackButton>

                </ButtonGroup>



                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                >

                    {({ TransitionProps, placement }) => (

                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom"
                                        ? "center top"
                                        : "center bottom"
                            }}
                        >

                            <Paper>

                                <ClickAwayListener onClickAway={handleClose}>

                                    <MenuList>

                                        {options.map((option, index) => (

                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) =>
                                                    handleMenuItemClick(event, index)
                                                }
                                            >
                                                {option}
                                            </MenuItem>

                                        ))}

                                    </MenuList>

                                </ClickAwayListener>

                            </Paper>

                        </Grow>

                    )}

                </Popper>

            </Stack>

        );

    };



    return (

        <Container maxWidth="xl">

            {/* Header */}

            <Box mb={4}>

                <Stack direction="row" spacing={2} alignItems="center">

                    <Avatar
                        sx={{
                            bgcolor: "#2563eb",
                            width: 56,
                            height: 56
                        }}
                    >
                        <School />
                    </Avatar>

                    <Box>

                        <Typography variant="h4" fontWeight="bold">
                            Class {currentUser.teachSclass?.sclassName}
                        </Typography>

                        <Typography color="text.secondary">
                            Manage students, attendance and marks
                        </Typography>

                    </Box>

                </Stack>

            </Box>



            {/* Stats */}

            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}
            >

                <Avatar sx={{ bgcolor: "#7c3aed" }}>
                    <People />
                </Avatar>

                <Box>

                    <Typography variant="h6">
                        Total Students
                    </Typography>

                    <Typography variant="h4" fontWeight="bold">
                        {sclassStudents.length}
                    </Typography>

                </Box>

            </Paper>



            {/* Table */}

            {loading ? (

                <Box textAlign="center" mt={5}>
                    <CircularProgress />
                </Box>

            ) : getresponse ? (

                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6">
                        No students found
                    </Typography>
                </Paper>

            ) : (

                <Paper
                    sx={{
                        borderRadius: 3,
                        p: 2
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                        fontWeight="bold"
                    >
                        Students List
                    </Typography>

                    <TableTemplate
                        buttonHaver={StudentsButtonHaver}
                        columns={studentColumns}
                        rows={studentRows}
                    />

                </Paper>

            )}

        </Container>

    );

};



export default TeacherClassDetails;
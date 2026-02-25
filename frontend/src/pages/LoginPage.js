import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    Button,
    Grid,
    Box,
    Typography,
    Paper,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    IconButton,
    InputAdornment,
    CircularProgress,
    Backdrop,
    Avatar,
    Divider
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
    Visibility,
    VisibilityOff,
    School
} from '@mui/icons-material';

import styled from 'styled-components';

import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const theme = createTheme();

const LoginPage = ({ role }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole }
        = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    // ============================
    // SUBMIT HANDLER (UNCHANGED)
    // ============================

    const handleSubmit = (event) => {

        event.preventDefault();

        if (role === "Student") {

            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { rollNum, studentName, password };

            setLoader(true);
            dispatch(loginUser(fields, role));

        } else {

            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };

            setLoader(true);
            dispatch(loginUser(fields, role));

        }

    };

    const handleInputChange = (event) => {

        const { name } = event.target;

        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);

    };

    // ============================
    // GUEST LOGIN (UNCHANGED)
    // ============================

    const guestModeHandler = () => {

        const password = "zxc";

        if (role === "Admin") {

            const email = "yogendra@12";
            const fields = { email, password };

            setGuestLoader(true);
            dispatch(loginUser(fields, role));

        }
        else if (role === "Student") {

            const rollNum = "1";
            const studentName = "Dipesh Awasthi";

            const fields = { rollNum, studentName, password };

            setGuestLoader(true);
            dispatch(loginUser(fields, role));

        }
        else if (role === "Teacher") {

            const email = "tony@12";

            const fields = { email, password };

            setGuestLoader(true);
            dispatch(loginUser(fields, role));

        }

    };

    // ============================
    // REDIRECT LOGIC (UNCHANGED)
    // ============================

    useEffect(() => {

        if (status === 'success' || currentUser !== null) {

            if (currentRole === 'Admin')
                navigate('/Admin/dashboard');

            else if (currentRole === 'Student')
                navigate('/Student/dashboard');

            else if (currentRole === 'Teacher')
                navigate('/Teacher/dashboard');

        }
        else if (status === 'failed') {

            setMessage(response);
            setShowPopup(true);
            setLoader(false);

        }
        else if (status === 'error') {

            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);

        }

    }, [status, currentRole, navigate, error, response, currentUser]);


    // ============================
    // UI START
    // ============================

    return (

        <ThemeProvider theme={theme}>

            <Grid
                container
                sx={{
                    height: '100vh',
                    background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)"
                }}
            >

                <CssBaseline />

                {/* CENTER LOGIN CARD */}

                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >

                    <Paper
                        elevation={10}
                        sx={{
                            p: 5,
                            width: 420,
                            borderRadius: 4
                        }}
                    >

                        {/* LOGO */}

                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >

                            <Avatar
                                sx={{
                                    bgcolor: "#7c3aed",
                                    width: 56,
                                    height: 56
                                }}
                            >
                                <School />
                            </Avatar>

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                mt={2}
                            >
                                TuitionPlus
                            </Typography>

                            <Typography
                                color="text.secondary"
                                mb={2}
                            >
                                {role} Login
                            </Typography>

                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* FORM */}

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >

                            {role === "Student" ? (

                                <>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="rollNumber"
                                        label="Roll Number"
                                        error={rollNumberError}
                                        helperText={
                                            rollNumberError &&
                                            "Required"
                                        }
                                        onChange={handleInputChange}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="studentName"
                                        label="Student Name"
                                        error={studentNameError}
                                        helperText={
                                            studentNameError &&
                                            "Required"
                                        }
                                        onChange={handleInputChange}
                                    />
                                </>

                            ) : (

                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="email"
                                    label="Email"
                                    error={emailError}
                                    helperText={
                                        emailError &&
                                        "Required"
                                    }
                                    onChange={handleInputChange}
                                />

                            )}

                            <TextField
                                fullWidth
                                margin="normal"
                                name="password"
                                label="Password"
                                type={toggle ? "text" : "password"}
                                error={passwordError}
                                helperText={
                                    passwordError &&
                                    "Required"
                                }
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setToggle(!toggle)
                                                }
                                            >
                                                {
                                                    toggle ?
                                                        <Visibility />
                                                        :
                                                        <VisibilityOff />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <FormControlLabel
                                control={<Checkbox />}
                                label="Remember me"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontWeight: "bold"
                                }}
                            >
                                {
                                    loader ?
                                        <CircularProgress size={24} />
                                        :
                                        "Login"
                                }
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 2 }}
                                onClick={guestModeHandler}
                            >
                                Login as Guest
                            </Button>

                            {
                                role === "Admin" &&
                                <Box mt={2} textAlign="center">
                                    <Typography variant="body2">
                                        Don't have account?
                                        <StyledLink to="/AdminReg">
                                            Sign Up
                                        </StyledLink>
                                    </Typography>
                                </Box>
                            }

                        </Box>

                    </Paper>

                </Grid>

            </Grid>

            {/* BACKDROP */}

            <Backdrop open={guestLoader}>

                <CircularProgress />

            </Backdrop>

            <Popup
                message={message}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
            />

        </ThemeProvider>

    );

};

export default LoginPage;


// Styled link

const StyledLink = styled(Link)`
 margin-left: 5px;
 text-decoration: none;
 color: #7c3aed;
 font-weight: bold;
`;
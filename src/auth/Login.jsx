import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, Paper, Container
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleNext = () => {
        if (email.trim() === '') {
            toast.warning("Please Enter Email First");
            return;
        }
        setStep(2);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", { email, password });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success("Login Successful..");
                setTimeout(() => navigate("/dashboard"), 2000);
            }
        } catch (err) {
            toast.error("Login failed. Please check credentials.");
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                background: 'linear-gradient(135deg,rgb(53, 61, 92),rgb(125, 87, 107),rgb(9, 109, 89))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="xs">
                <Paper elevation={12} sx={{
                    backdropFilter: "blur(20px)",
                    background: "rgba(0, 0, 0, 0.7)",  // 🖤 Solid black with transparency
                    padding: 5,
                    borderRadius: 5,
                    boxShadow: "0 20px 45px rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff"
                }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {step === 1 ? "Let's Start" : "Almost There"}
                    </Typography>

                    <form onSubmit={handleLogin}>
                        {step === 1 && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="filled"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        input: { color: "#fff" },
                                        label: { color: "#ccc" },
                                        background: "rgba(255,255,255,0.05)",
                                        borderRadius: 1,
                                        mt: 2
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        mt: 3,
                                        background: "#ffffff30",
                                        backdropFilter: "blur(4px)",
                                        "&:hover": {
                                            background: "#ffffff50"
                                        }
                                    }}
                                >
                                    Next →
                                </Button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="filled"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{
                                        input: { color: "#fff" },
                                        label: { color: "#ccc" },
                                        background: "rgba(255,255,255,0.05)",
                                        borderRadius: 1,
                                        mt: 2
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        background: "#ffffff30",
                                        backdropFilter: "blur(4px)",
                                        "&:hover": {
                                            background: "#ffffff50"
                                        }
                                    }}
                                >
                                    Log In ✔
                                </Button>
                            </>
                        )}
                    </form>

                    <Typography align="center" mt={3}>
                        <span style={{ color: "#eee" }}>New here?</span>{' '}
                        <Button onClick={() => navigate("/signup")} sx={{ color: "#fff", textDecoration: "underline" }}>
                            Create Profile
                        </Button>
                    </Typography>
                </Paper>

                <ToastContainer position="top-center" autoClose={2000} />
            </Container>
        </Box>
    );
};

export default LoginPage;

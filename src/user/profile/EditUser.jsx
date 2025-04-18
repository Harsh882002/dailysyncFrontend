import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const EditUser = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        designation: '',
    })

    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
    const navigate = useNavigate();

    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    //to fetch data 
    useEffect(() => {
        const handleFetchData = async () => {
            const token = localStorage.getItem("token");
            const getUser = localStorage.getItem("user");

            if (!token || !getUser) {
                setAlert({ open: true, severity: "error", message: "User Not Found" });
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/getUserById/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success) {
                    setFormData(response.data.user);
                } else {
                    setAlert({ open: true, severity: "warning", message: "Task Not Found" });
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || "Failed to fetch task data.";
                setAlert({ open: true, severity: "error", message: errorMsg });
            } finally {
                setLoading(false);
            }
        };

        handleFetchData();
    }, [id]);


    //handle Edit User and submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/edituser/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.data.success) {
                toast.success("User Update Successful..", {
                    autoClose: 2000,
                    position:"top-center",
                    pauseOnHover: false,
                    closeOnClick: false
                });

                setTimeout(() =>{
                    navigate("/dashboard");
                },2000)
            
            }
        } catch (e) {
            console.log("Error,", e);
        }
    }

    if (loading) {
        return <div>Loading......</div>
    }

    return (
        <Container >
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>

                <Typography variant='h3' fontFamily="monospace" align='center' gutterBottom>
                    User Edit
                </Typography>

                <form action="" onSubmit={handleSubmit}>

                    {/*  Name Input  */}
                    <TextField
                        label="Name"
                        type='text'
                        name="name"
                        fullWidth
                        margin='normal'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email Input */}
                    <TextField
                        label="Email"
                        type='email'
                        name="email"
                        fullWidth
                        margin='normal'
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />

                    {/* Designation Input  */}

                    <TextField
                        label="Designation"
                        type='text'
                        name="designation"
                        fullWidth
                        value={formData.designation}
                        onChange={handleChange}
                        margin='normal'
                        required
                    />

                    {/* Department Input  */}
                    <TextField
                        label="Department"
                        type='text'
                        name="department"
                        fullWidth
                        value={formData.department}
                        onChange={handleChange}
                        margin='normal'
                        required
                    />

                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
                    </Box>
                </form>
            </Paper>
            <ToastContainer />
        </Container>

    )
}

export default EditUser

import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SignUp = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        designation: '',
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const handleSubmit = async (e) => {
         e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            alert("Password do not match...");
            return;
        }
 

        try {
            const response = await axios.post("http://localhost:3000/register", formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log("Response from backend:", response.data);


            if (response.data.success) {
                toast.success("Register Successfull",{
                    autoClose: 2000,
                    pauseOnHover: false,
                    closeOnClick: false
                })

                setTimeout(()=>{
                    navigate("/");
                },2000)
            }
        } catch (e) {
            toast.error("Something went wrong!",{
                autoClose: 2000,
                pauseOnHover: false,
                closeOnClick: false
            })
            setTimeout(()=>{
                navigate("/signup");
            },2000)
        }
    }
    return (
        <Container >
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>

                <Typography variant='h5' align='center' gutterBottom>
                    Sign Up
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

                    {/* Password Input */}
                    <TextField
                        label="Password"
                        type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                    />

                    {/* confirm password  */}
                    <TextField
                        label="Confirm password"
                        type='password'
                        name='confirmPassword'
                        fullWidth
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin='normal'
                        required
                    />

                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
                    </Box>
                </form>
            </Paper>
        </Container>

    )
}

export default SignUp

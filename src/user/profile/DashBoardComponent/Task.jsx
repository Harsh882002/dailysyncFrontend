import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, {   useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Task = () => {

    const userData = JSON.parse(localStorage.getItem("user"))

    const [formData, setFormData] = useState({
        user_id:`${userData.id}`,
        title: "",
        description: "",
        workHours: "",
        status: "",
    })
const navigate  = useNavigate()


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)
        try {
            const response = await axios.post("http://localhost:3000/task", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                setAlert({ open: true, message: "Task Submitted Successfully!", severity: "success" })

                setFormData({
                    title: "",
                    description: "",
                    workHours: "",
                    status: "",
                })

                setTimeout(() =>{
                navigate("/dashboard");
                },2000)
            }
        } catch (e) {
            console.log("Error", e);
            setAlert({ open: true, message: "Something went wrong.", severity: "error" });

        }
    }



    return (
        <Container  maxWidth="sm">

            <Paper sx={{padding: 4, mt: 4}} >

                <form action="" onSubmit={handleSubmit}>

                    <Typography variant='h4' textAlign={'center'} gutterBottom>
                        Task Status
                    </Typography>

                    {/* Title  */}
                    <div>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            fullWidth
                            required
                            onChange={handleOnChange}
                            margin="normal"
                        />
                    </div>

                    {/* Description  */}
                    <div>
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            fullWidth
                            required
                            onChange={handleOnChange}
                            margin='normal'
                            multiline
                            rows={4}
                        />
                    </div>

                    {/* Work Hours Field  */}
                    <div>
                        <TextField
                            label="Work Hours"
                            name='workHours'
                            value={formData.workHours}
                            fullWidth
                            required
                            onChange={handleOnChange}
                            margin='normal'
                            type='number'
                    
                        />
                    </div>

                    { /* Status Field   */}
                    <div>
                        <FormControl fullWidth margin='normal' required>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name='status'
                                value={formData.status}
                                onChange={handleOnChange}
                                label="Status"
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {/* submit Button  */}
                    <div>
                        <Box mt={2}>
                            <Button
                                type="submit" variant="contained" color="primary" fullWidth

                            >Submit</Button>
                        </Box>

                    </div>

                

                </form>

            </Paper>

            {/* FeedBack SnackBar  */}
            <Snackbar
            open={alert.open}
            autoHideDuration={4000}
            onClose={() => setAlert((prev) =>({...prev, open: false}))}
            anchorOrigin={{vertical: "top", horizontal:"center"}}
            >
                <Alert
                severity={alert.severity} onClose={() => setAlert((prev) =>({...prev, open: false}))}
                >{alert.message}</Alert>
            </Snackbar>

        
        </Container>
    )
}

export default Task

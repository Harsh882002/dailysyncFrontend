import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { useNavigate, useParams } from "react-router-dom";
  import React, { useEffect, useState } from "react";
  
  const EditTask = () => {
    const [taskData, setTaskData] = useState({
      title: "",
      description: "",
      workHours: "",
      status: "pending",
    });
  
    const { id } = useParams();  
     const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleFetchData = async () => {
        const token = localStorage.getItem("token");
        const getUser = localStorage.getItem("user");
  
        if (!token || !getUser) {
          setAlert({ open: true, severity: "error", message: "User Not Found" });
          return;
        }
  
        try {
          const { data } = await axios.get(`http://localhost:3000/getById/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (data?.data) {
            setTaskData(data.data[0]);
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
  
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setTaskData((prev) => ({ ...prev, [name]: value }));
    };


    //to Edit the task
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem("token");
  
      try {
        const response = await axios.put(
          `http://localhost:3000/editTask/${id}`, 
          taskData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        setAlert({ open: true, severity: "success", message: response.data.message });

        setTimeout(() =>{
          navigate("/dashboard");
        },1000);
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Failed to update task. Please try again.";
        setAlert({ open: true, severity: "error", message: errorMsg });
      }
    };
  
    if (loading) {
      return <Typography align="center">Loading...</Typography>;
    }

    console.log(taskData)
  
     return (
      <Container maxWidth="sm">
        <Paper sx={{ padding: 4, mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Edit Task
            </Typography>
  
            {/* Title */}
            <TextField
              label="Title"
              name="title"
              value={taskData.title}
              fullWidth
              required
              onChange={handleOnChange}
              margin="normal"
            />
  
            {/* Description */}
            <TextField
              label="Description"
              name="description"
              value={taskData.description}
              fullWidth
              required
              onChange={handleOnChange}
              margin="normal"
              multiline
              rows={4}
            />
  
            {/* Work Hours */}
            <TextField
              label="Work Hours"
              name="workHours"
              value={taskData.work_hours}
              fullWidth
              required
              onChange={handleOnChange}
              margin="normal"
              type="number"
            />
  
            {/* Status */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={taskData.status}
                onChange={handleOnChange}
                label="Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
  
            {/* Submit Button */}
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Task
              </Button>
            </Box>
          </form>
        </Paper>
  
        {/* Alert Snackbar */}
        <Snackbar
          autoHideDuration={4000}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          open={alert.open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={alert.severity}
            onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  };
  
  export default EditTask;
  
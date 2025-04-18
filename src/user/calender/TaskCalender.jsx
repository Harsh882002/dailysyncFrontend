import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  Grid,
  Tooltip
} from "@mui/material";
import { EventNote, Edit, ExitToApp } from "@mui/icons-material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSpring, animated } from "react-spring";
import LogSection from "./LogSection";
import TodayTask from "./TodayTask";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const TaskCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tasks, setTasks] = useState([]);
  const [log, setLog] = useState([]);
  const [user, setUsers] = useState({});
  const [alert, setAlert] = useState(true)
  const [loading,setLoading] =  useState(true);

  const navigate = useNavigate();

  const cardStyle = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 160, friction: 20 }
  });



  useEffect(() => {

    const handleFetchData = async () => {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      setUsers(userData);
      if (!token) {
        setAlert({ open: true, severity: 'error', message: "Token not found" });
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`http://localhost:3000/getData/${userData.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data?.data) {
          setLog(data.data);
          setTasks(data.data)
        } else {
          setAlert({ open: true, severity: 'warning', message: "Task Not Found" });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Failed to fetch task data. Please try again.";
        setAlert({ open: true, severity: 'error', message: errorMsg });
      }
    };

    handleFetchData();
  }, []);


  //handle logout here
  const handlelogoutUser = async () => {
    try {
      // Retrieve token from local storage (or wherever it's stored)
      const token = localStorage.getItem('token'); // Example for token storage in localStorage
 
      if (!token) {
        throw new Error("No token found. User might already be logged out.");
      }

      // Send logout request to the server
      const response = await axios.post('http://localhost:3000/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Check for successful logout response
      if (response.status === 200) {
        // Remove token from localStorage and log out
        localStorage.removeItem('token');
 
        toast.success("Logout successfullly..", {
          autoClose: 2000,
        })
        setTimeout(() => {
          navigate("/");
        }, 2000)

      } else {
        // Handle server-side errors
        console.error(response.data.message || 'An error occurred during logout.');
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: { xs: 2, sm: 4 },
            py: 5,
            bgcolor: "#f4f6f8",
            minHeight: "100vh",
          }}
        >
          {/* User Info Section */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px",
              backgroundColor: "#fff",
              borderRadius: 4,
              boxShadow: 6,
              p: 3,
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#3f51b5", mr: 2, width: 56, height: 56 }}>
              {user.name && 
              user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {user.name}   </Typography>

                <Typography variant="body2" color="text.secondary">
                  {user.designation}, {user.department}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Tooltip title="Edit Profile">
                <IconButton color="primary" sx={{ mr: 1 }}>
                  <Link to={`/edituser/${user.id}`}><Edit /></Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout" onClick={handlelogoutUser}>
                <IconButton color="error">
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Today's Task Section */}
          <TodayTask tasks={log.filter(tasks => dayjs(tasks.created_at).isSame(dayjs(), 'day'))} />

          {/* Calendar + Tasks */}
          <animated.div style={cardStyle}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
                maxWidth: "1200px",
                boxShadow: 12,
                borderRadius: 4,
                mt: 4,
                backgroundColor: "#fff",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 20,
                  transform: "scale(1.01)",
                },
              }}
            >
              {/* Calendar */}
              <Box sx={{ flex: 1, p: 3, borderRight: { md: "1px solid #e0e0e0" } }}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: "#3f51b5 !important",
                      color: "#fff",
                    },
                    "& .MuiDayCalendar-weekdayLabel": {
                      color: "#3f51b5",
                    },
                    "& .MuiPickersDay-today": {
                      backgroundColor: "#ff7043",
                      color: "#fff",
                    },
                  }}
                />
              </Box>

              {/* Task List */}
              <Box sx={{ flex: 2, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  📝 Tasks for {selectedDate.format("DD MMM YYYY")}
                </Typography>
                {tasks.filter(task => dayjs(task.current_date).isSame(selectedDate, 'day')).length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No tasks available for this day.
                  </Typography>
                ) : (
                  <List>
                    {tasks
                      .filter(task => dayjs(task.current_date).isSame(selectedDate, 'day'))
                      .map((task, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            borderRadius: 2,
                            my: 1,
                            px: 2,
                            py: 1,
                            backgroundColor: "#f5faff",
                            "&:hover": {
                              backgroundColor: "#e3f2fd",
                            },
                          }}
                        >
                          <ListItemIcon>
                            <EventNote sx={{ color: "#3f51b5" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={task.title}
                            secondary={`Status: ${task.status}`}
                            typographyprops={{
                              fontWeight: "500",
                              fontSize: "1rem",
                            }}
                          />
                        </ListItem>
                      ))}
                  </List>
                )}
              </Box>
            </Card>
          </animated.div>

          {/* Log Section */}
          <LogSection log={log} />
        </Box>

      </LocalizationProvider>
      <ToastContainer />

    </>
  );
};

export default TaskCalendar;

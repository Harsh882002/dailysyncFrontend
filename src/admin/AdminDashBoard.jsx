import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Alert, Box, Typography, Tooltip, IconButton } from '@mui/material';
import axios from 'axios';
import Updates from './UserDailyUpdate';
import Filters from './FilterControl';
import UserList from './AllUsers';
import { ExitToApp } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [date, setDate] = useState('');
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
 const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAllTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/admin/getAllTask', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { success, data } = response.data;
        if (success) {
          setUpdates(data);
        } else {
          setAlert({ severity: 'warning', message: 'No tasks found.' });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch task data.';
        setAlert({ severity: 'error', message: errorMsg });
      }
      finally {
        setLoading(false);
      }
    };
    fetchAllTasks();
  }, []);


//  handle log out 
const handlelogoutAdmin = async () => {
  try {
    // Retrieve token from local storage (or wherever it's stored)
    const token = localStorage.getItem('token'); // Example for token storage in localStorage
    console.log(token)

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


  // to handle all users

  useEffect(() => {
    const handleFetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/getAlluser', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { success, data } = response.data;
        if (success) {
          setUpdates(data);
        } else {
          setAlert({ severity: 'warning', message: 'No tasks found.' });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch task data.';
        setAlert({ severity: 'error', message: errorMsg });
      }
      finally {
        setLoading(false);
      }
    }
  }, [])
  console.log(updates)

  const filteredUpdates = updates.filter((update) => {
    const isStatusMatch = !statusFilter || update.status === statusFilter;
    const isDateMatch = !date || new Date(update.date).toDateString() === new Date(date).toDateString();
    return isStatusMatch && isDateMatch;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
     <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
  <Typography variant="h4" fontWeight="bold">
    Welcome, Admin
  </Typography>

  <Tooltip title="Logout">
    <IconButton color="error" onClick={handlelogoutAdmin}>
      <ExitToApp />
    </IconButton>
  </Tooltip>
</Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : alert ? (
        <Alert severity={alert.severity} sx={{ mt: 2 }}>
          {alert.message}
        </Alert>
      ) : (
        <Box display="flex" gap={4} alignItems="flex-start" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Filters Component */}
          <Filters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            date={date}
            setDate={setDate}
          />

          {/* Updates Component */}
          <Updates filteredUpdates={filteredUpdates} />

        </Box>
      )}

      <Box>
        <UserList />
      </Box>

<ToastContainer />
    </Container>
  );
};

export default AdminDashboard;

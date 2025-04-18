import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, CircularProgress, Alert, Divider, Grid } from '@mui/material';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/admin/getAllUser', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { success, user } = response.data;
        if (success) {
          setUsers(user)
        } else {
          setAlert({ severity: 'warning', message: 'No users found.' });
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch data.';
        setAlert({ severity: 'error', message: errorMsg });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  return (
    <Box sx={{ mt: 4 }}>
      {/* Alert Section */}
      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* Title */}
          <Typography variant="h4" fontWeight="bold" mb={3} align="center">
            User List
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Table */}
          {users.length === 0 ? (
            <Typography align="center" variant="h6" color="textSecondary">
              No users found.
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>Name</b></TableCell>
                  <TableCell align="center"><b>Email</b></TableCell>
                  <TableCell align="center"><b>Role</b></TableCell>
                  <TableCell align="center"><b>Department</b></TableCell>
                  <TableCell align="center"><b>Designation</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">{user.department || 'N/A'}</TableCell>
                    <TableCell align="center">{user.designation || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default UserList;

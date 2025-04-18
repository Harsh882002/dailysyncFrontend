import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Typography, Paper } from '@mui/material';

const Updates = ({ filteredUpdates }) => {
  // Function to return status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'info';
      default:
        return 'default';
    }
  };

  console.log("filteredUpdates",filteredUpdates)

  return (
    <Paper elevation={3} sx={{ flex: 1, p: 3 }}>
      <Typography variant="h6" mb={2}>
        Daily Updates
      </Typography>

      {filteredUpdates.length === 0 ? (
        <Typography>No updates found for the selected filters.</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>User</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Task</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUpdates.map((update) => (
                <TableRow key={update.id}>
                  <TableCell>{update.user_name}</TableCell>
                  <TableCell>{new Date(update.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{update.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={update.status}
                      color={getStatusColor(update.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default Updates;

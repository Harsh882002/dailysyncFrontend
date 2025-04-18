import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper, Typography, Box } from '@mui/material';

const Filters = ({ statusFilter, setStatusFilter, date, setDate }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, width: { xs: '100%', sm: '300px' } }}>
      <Typography variant="h6" mb={2}>
        Filters
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
           </Select>
        </FormControl>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setDate('');
            setStatusFilter('');
          }}
        >
          Reset Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default Filters;

import { Box, Button, Typography, Stack, Fade, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CheckCircle, HourglassBottom, Edit } from "@mui/icons-material";
import {Link} from 'react-router-dom'
 
const TodayTask = ({ tasks }) => {
   return (
    <Fade in timeout={500}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          mx: "auto",
          backgroundColor: "#fff",
          borderRadius: 4,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          p: 4,
          mb: 5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            mb: 3,
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          🗓️ Today's Work  
        </Typography>

        {tasks.length > 0 ? (
          <Stack spacing={2}>
            {tasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#f5f8ff",
                  border: "1px solid #dbe3f5",
                  padding: "15px 20px",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e8f0fe",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    transform: "scale(1.01)",
                  },
                }}
              >
                {/* Left side: Title and Status */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#333" }}
                  >
                    {task.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                      backgroundColor:
                        task.status === "Completed" ? "#4caf50" : "#ff9800",
                      color: "#fff",
                      borderRadius: "20px",
                      px: 2,
                      py: 0.5,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      width: "fit-content",
                    }}
                  >
                    {task.status === "Completed" ? (
                      <CheckCircle fontSize="small" />
                    ) : (
                      <HourglassBottom fontSize="small" />
                    )}
                    {task.status}
                  </Box>
                </Box>

                {/* Right side: Edit button */}
                <Tooltip title="Edit Task">
                  <IconButton
                    color="primary"
                    // onClick={() => handleEditTask(task)}
                    sx={{
                      ml: 2,
                      "&:hover": {
                        backgroundColor: "#e0ebff",
                      },
                    }}
                  >
                    <Link to={`/edit/${task.id}`}><Edit /></Link> 
                    
                     
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
          >
            No tasks submitted yet for today. Take the lead!
          </Typography>
        )}

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            // onClick={handleTaskSubmit}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(135deg, #3f51b5, #5c6bc0)",
              boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
              transition: "0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #303f9f, #3f51b5)",
                boxShadow: "0 6px 18px rgba(63, 81, 181, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Link to="/task">Submit Today's Task</Link>
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default TodayTask;

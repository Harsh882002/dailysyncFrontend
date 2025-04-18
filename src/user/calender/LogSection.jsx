import {
    Box,
    Typography,
    Paper,
    Slide,
    Grid,
    Chip,
} from "@mui/material";
import React, {  useState } from "react";
 import {format} from 'date-fns';

const LogSection = ({log}) => {
   
    const [alert, setAlert] = useState({ open: false, severity: "", message: "" });



    //format the date received from the database using date-fns
    const formatDate = (timestamp) =>{
        const date = new Date(timestamp);
        return format(date,'PPP p');
    }

     

    if (log.length === 0) {
        return <div>No task data available.</div>;
    }

    return (
        <Slide in direction="up" timeout={500}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1000px",
                    mx: "auto",
                    mt: 5,
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    p: 4,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        mb: 3,
                        letterSpacing: "0.5px",
                        textAlign: "center",
                    }}
                >
                    📋 Activity Log
                </Typography>

                {log.length > 0 ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {log.map((entry, index) => (
                            <Paper
                                key={index}
                                elevation={2}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: "#f9f9ff",
                                    transition: "0.3s",
                                    "&:hover": {
                                        backgroundColor: "#eef3ff",
                                        transform: "translateX(4px)",
                                    },
                                }}
                            >
                                {/* Left side: Date */}
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#3f51b5",
                                        }}
                                    >
                                        {formatDate(entry.created_at)}
                                    </Typography>
                                </Box>

                                {/* Center: Task Name */}
                                <Box sx={{ flex: 2, textAlign: "center" }}>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {entry.title}
                                    </Typography>
                                </Box>

                                {/* Right side: Status */}
                                <Box sx={{ flex: 1, textAlign: "right" }}>
                                    <Chip
                                        label={entry.status}
                                        color={entry.status === "Completed" ? "success" : "warning"}
                                        size="small"
                                    />
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                ) : (
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "center", mt: 2, color: "text.secondary" }}
                    >
                        No recent activity found.
                    </Typography>
                )}
            </Box>
        </Slide>
    );
};

export default LogSection;

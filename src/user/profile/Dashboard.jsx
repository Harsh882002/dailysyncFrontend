import { Container, Paper, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react'
import Task from './DashBoardComponent/Task';
import TaskCalendar from '../calender/TaskCalender';
import AdminDashboard from '../../admin/AdminDashBoard';
 
const Dashboard = () => {

    const userData = JSON.parse(localStorage.getItem("user"));
      const userRole = userData.role;

  if(userRole === 'admin'){
    return(
      <div>
        <AdminDashboard />
      </div>
    )
  }else if(userRole === 'user'){
    return(
      <div>
        <TaskCalendar />
      </div>
    )
  } 
   
}


export default Dashboard

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../auth/Login';
import SignUp from '../auth/SignUp';
import EditTask from '../user/profile/DashBoardComponent/EditTask';
import Task from '../user/profile/DashBoardComponent/Task';
import EditUser from '../user/profile/EditUser';
import Dashboard from '../user/profile/Dashboard';
import AuthRoute from '../auth/AuthRoute';

const RouterComponent = () => {



   return (
      <Router>
         <Routes>
            {/* Public Routes */}
            <Route path="/" element={
               <AuthRoute type="public">
                  <LoginPage />
               </AuthRoute>
            } />
            <Route path="/signup" element={
               <AuthRoute type="public">
                  <SignUp />
               </AuthRoute>
            } />


            {/* Private Routes */}
            <Route path="/dashboard" element={
               <AuthRoute type="private">
                  <Dashboard />
               </AuthRoute>
            } />

            <Route path="/edit/:id" element={
               <AuthRoute type="private">
                  <EditTask />
               </AuthRoute>
            } />

            <Route path="/task" element={
               <AuthRoute type="private">
                  <Task />
               </AuthRoute>
            } />

            <Route path="/edituser/:id" element={
               <AuthRoute type="private">
                  <EditUser />
               </AuthRoute>
            } />

            
            {/* Catch-all route for invalid URLs */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path='/dashboard/*' element={<Navigate to="/dashboard" />} /> {/* Handle invalid URL after /dashboard */}

         </Routes>
      </Router>
   );
};

export default RouterComponent;

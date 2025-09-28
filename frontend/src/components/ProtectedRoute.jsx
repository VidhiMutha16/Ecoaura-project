import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Check 1: Is the user logged in?
    if (!userInfo) {
        // If not, redirect them to the login page
        return <Navigate to="/login" replace />;
    }

    // Check 2: Does the user have the allowed role?
    // The 'allowedRoles' prop is an array of roles that can access this route.
    const hasRequiredRole = allowedRoles.includes(userInfo.role);

    if (!hasRequiredRole) {
        // If they don't have the right role, redirect them.
        // A good practice is to send them to their own dashboard.
        const userRole = userInfo.role.toLowerCase();
        return <Navigate to={`/dashboard/${userRole}`} replace />;
    }

    // If all checks pass, render the child component
    return <Outlet />;
};

export default ProtectedRoute;
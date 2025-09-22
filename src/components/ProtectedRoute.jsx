import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    const location = useLocation();

    // If trying to access a protected route and not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // If already authenticated and trying to access the login page, redirect to admin panel
    if (isAuthenticated && location.pathname === '/admin/login') {
         return <Navigate to="/admin" replace />;
    }

    // If authenticated, render the requested component (e.g., the AdminPanel)
    return children;
};

export default ProtectedRoute;


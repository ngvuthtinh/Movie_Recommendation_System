import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect} from 'react';

export default function ProtectedRoutes ({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home'); // Redirect to home if authenticated
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}


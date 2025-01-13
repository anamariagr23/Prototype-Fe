// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: string[];
}

interface JwtPayload {
    role: string;
    exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        return <Navigate to="/register" replace />;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('auth_token');
            return <Navigate to="/register" replace />;
        }

        // Check if user has required role
        if (!roles.includes(decoded.role)) {
            return <Navigate to="/" replace />;
        }

        return <>{children}</>;
    } catch {
        localStorage.removeItem('auth_token');
        return <Navigate to="/register" replace />;
    }
};

export default ProtectedRoute;
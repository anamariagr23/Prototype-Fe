// Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from './AuthForm';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
    role: string;
}

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = authService.getToken();
    const isLoggedIn = !!token;
    
    let userRole = '';
    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            userRole = decoded.role;
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }

    const handleLogout = () => {
        authService.removeToken();
        navigate('/');
    };

    const renderNavLinks = () => {
        if (!isLoggedIn) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Login/Register</Link>
                </li>
            );
        }

        // Common links for logged-in users
        const links = [
            <li className="nav-item" key="browse">
                <Link className="nav-link" to="/main-page">Browse Internships</Link>
            </li>
        ];

        // Role-specific links
        switch (userRole) {
            case 'Student':
                links.push(
                    <li className="nav-item" key="applications">
                        <Link className="nav-link" to="/my-applications">My Applications</Link>
                    </li>,
                    <li className="nav-item" key="profile">
                        <Link className="nav-link" to="/profile-display">My Profile</Link>
                    </li>
                );
                break;

            case 'CompanyEmployee':
                links.push(
                    <li className="nav-item" key="company-applications">
                        <Link className="nav-link" to="/company/applications">Manage Applications</Link>
                    </li>,
                    <li className="nav-item" key="create-internship">
                        <Link className="nav-link" to="/internship-create">Create Internship</Link>
                    </li>
                );
                break;

            // Add other roles if needed (e.g., FacultyStaff, Administrator)
        }

        // Add logout button for all logged-in users
        links.push(
            <li className="nav-item" key="logout">
                <button 
                    className="nav-link" 
                    onClick={handleLogout}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </li>
        );

        return links;
    };

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light header shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    Internship Platform
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {renderNavLinks()}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
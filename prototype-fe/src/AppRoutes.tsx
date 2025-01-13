import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import InternshipPage from './components/InternshipPage';
import InternshipDetails from './components/InternshipDetails';
import StudentProfileForm from './components/StudentProfile';
import ProfileDisplay from './components/ProfileDisplay';
import InternshipCreationForm from './components/InternshipCreationForm';
import MyApplicationsPage from './components/MyApplicationsPage';
import CompanyApplicationsList from './components/CompanyApplicationsList';
import CompanyApplicationDetail from './components/CompanyApplicationDetail';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes: React.FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/main-page" element={<InternshipPage />} />
                <Route path="/job/:id" element={<InternshipDetails />} />
                
                {/* Student Routes */}
                <Route 
                    path="/profile-edit" 
                    element={
                        <ProtectedRoute roles={['Student']}>
                            <StudentProfileForm />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/profile-display" 
                    element={
                        <ProtectedRoute roles={['Student']}>
                            <ProfileDisplay />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/my-applications" 
                    element={
                        <ProtectedRoute roles={['Student']}>
                            <MyApplicationsPage />
                        </ProtectedRoute>
                    } 
                />

                {/* Company Employee Routes */}
                <Route 
                    path="/company/applications" 
                    element={
                        <ProtectedRoute roles={['CompanyEmployee']}>
                            <CompanyApplicationsList />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/company/applications/:id" 
                    element={
                        <ProtectedRoute roles={['CompanyEmployee']}>
                            <CompanyApplicationDetail />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/internship-create" 
                    element={
                        <ProtectedRoute roles={['CompanyEmployee']}>
                            <InternshipCreationForm />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRoutes;
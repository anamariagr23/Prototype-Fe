import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import SearchBarWithFilters from './components/SearchBarWithFilters';
import InternshipList from './components/InternshipPage';
import InternshipPage from './components/InternshipPage';
import InternshipDetails from './components/InternshipDetails';
import StudentProfileForm from './components/StudentProfile';

const AppRoutes: React.FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<AuthForm />} />
                <Route path="/main-page" element={<InternshipPage />} />
                <Route path="/job/:id" element={<InternshipDetails />} />
                <Route path="/profile" element={<StudentProfileForm />} />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRoutes;
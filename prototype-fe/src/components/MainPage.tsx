// import React from 'react';

// const MainPage: React.FC = () => {
//     return (
//         <div className="mainPage">
//             <div className="text-container">
//                 <h1>Welcome to the Internship Application Platform</h1>
//                 <p>
//                     Streamline your internship applications with ease. Discover opportunities and manage your applications in one place.
//                 </p>
//                 <button className="btn btn-primary">Get Started</button>
//             </div>
//         </div>
//     );
// };

// export default MainPage;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const MainPage: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigation function

    // Event handler for the button
    const handleGetStarted = () => {
        navigate('/register'); // Navigate to the registration page
    };

    return (
        <div className="mainPage">
            <div className="text-container">
                <h1>Welcome to the Internship Application Platform</h1>
                <p>
                    Streamline your internship applications with ease. Discover opportunities and manage your applications in one place.
                </p>
                <button className="btn btn-primary" onClick={handleGetStarted}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default MainPage;

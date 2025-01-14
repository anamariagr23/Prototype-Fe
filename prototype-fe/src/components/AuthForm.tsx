// import React, { useState } from 'react';

// const AuthForm: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

//     return (
//         <div className="registration-container container p-4 my-5" style={{ maxWidth: '600px' }}>
//             <ul className="nav nav-tabs nav-justified mb-3" id="authTabs" role="tablist">


//                 <li className="nav-item" role="presentation">
//                     <button
//                         className={`btn ${activeTab === 'login' ? 'btn-primary' : 'btn-inactive'} px-4 py-2`}
//                         onClick={() => setActiveTab('login')}
//                         type="button"
//                     >
//                         Login
//                     </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                     <button
//                         className={`btn ${activeTab === 'register' ? 'btn-primary' : 'btn-inactive'} px-4 py-2`}
//                         onClick={() => setActiveTab('register')}
//                         type="button"
//                     >
//                         Register
//                     </button>
//                 </li>
//             </ul>

//             <div className="tab-content">
//                 {activeTab === 'login' && (
//                     <div className="tab-pane fade show active">
//                         <h3 className="text-center mb-3">Login</h3>
//                         <form>
//                             <div className="mb-3">
//                                 <label htmlFor="loginEmail" className="form-label">Email address</label>
//                                 <input type="email" className="form-control" id="loginEmail" />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="loginPassword" className="form-label">Password</label>
//                                 <input type="password" className="form-control" id="loginPassword" />
//                             </div>
//                             <div className="d-flex justify-content-between">
//                                 <div className="form-check">
//                                     <input type="checkbox" className="form-check-input" id="rememberMe" />
//                                     <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
//                                 </div>
//                                 <a href="#!">Forgot password?</a>
//                             </div>
//                             <button type="submit" className="btn btn-primary w-100 mt-3">Sign in</button>
//                         </form>
//                     </div>
//                 )}

//                 {activeTab === 'register' && (
//                     <div className="tab-pane fade show active">
//                         <h3 className="text-center mb-3">Register</h3>
//                         <form>
//                             <div className="mb-3">
//                                 <label htmlFor="registerName" className="form-label">Name</label>
//                                 <input type="text" className="form-control" id="registerName" />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="registerUsername" className="form-label">Username</label>
//                                 <input type="text" className="form-control" id="registerUsername" />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="registerEmail" className="form-label">Email</label>
//                                 <input type="email" className="form-control" id="registerEmail" />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="registerPassword" className="form-label">Password</label>
//                                 <input type="password" className="form-control" id="registerPassword" />
//                             </div>
//                             <div className="form-check mb-3">
//                                 <input type="checkbox" className="form-check-input" id="terms" />
//                                 <label className="form-check-label" htmlFor="terms">
//                                     I agree to the terms and conditions
//                                 </label>
//                             </div>
//                             <button type="submit" className="btn btn-primary w-100">Sign up</button>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AuthForm;


export interface LoginResponse {
    token: string;
}

export interface LoginData {
    email: string;
    password: string;
}

const TOKEN_KEY = 'auth_token';

export const authService = {
    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
};

import React, { useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { redirect, useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data: LoginResponse = await response.json();
                authService.setToken(data.token);
                // Handle successful login
                navigate('/main-page');
            } else {
                // Handle error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="registration-container container p-4 my-5" style={{ maxWidth: '600px' }}>
            <ul className="nav nav-tabs nav-justified mb-3" id="authTabs" role="tablist">


                <li className="nav-item" role="presentation">
                    <button
                        className={`btn ${activeTab === 'login' ? 'btn-primary' : 'btn-inactive'} px-4 py-2`}
                        onClick={() => setActiveTab('login')}
                        type="button"
                    >
                        Login
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`btn ${activeTab === 'register' ? 'btn-primary' : 'btn-inactive'} px-4 py-2`}
                        onClick={() => setActiveTab('register')}
                        type="button"
                    >
                        Register
                    </button>
                </li>
            </ul>

            <div className="tab-content">
                {activeTab === 'login' && (
                    <div className="tab-pane fade show active">
                        <h3 className="text-center mb-3">Login</h3>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-3">
                                <label htmlFor="loginEmail" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="loginEmail"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="loginPassword"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            {/* ... other form elements ... */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-3"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'register' && (
                    <div className="tab-pane fade show active">
                        <h3 className="text-center mb-3">Register</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="registerName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="registerName" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerUsername" className="form-label">Username</label>
                                <input type="text" className="form-control" id="registerUsername" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="registerEmail" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="registerPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="registerPassword" />
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="terms" />
                                <label className="form-check-label" htmlFor="terms">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Sign up</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;


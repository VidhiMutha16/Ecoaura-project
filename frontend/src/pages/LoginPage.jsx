import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // React Router's hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const url = 'http://localhost:5000/api/auth/login';
            const userData = { email, password };
            const response = await axios.post(url, userData);

            // --- START OF NEW CODE ---

            // 1. Save user info (including token) to localStorage
            // We use JSON.stringify because localStorage can only store strings.
            localStorage.setItem('userInfo', JSON.stringify(response.data));

            // 2. Redirect the user to their specific dashboard
            // We use .toLowerCase() to match the routes we defined (e.g., 'Organizer' -> 'organizer')
            const userRole = response.data.role.toLowerCase();
            navigate(`/dashboard/${userRole}`);

            // --- END OF NEW CODE ---

        } catch (err) {
            console.error('Login failed:', err.response?.data?.message || 'An error occurred');
            setError(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-hero">
                <h1>Transform Events with EcoAura</h1>
                <p>Use Six Sigma methodology to achieve 95%+ waste reduction in your events.</p>
            </div>
            <div className="login-form-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your EcoAura account to manage sustainable events.</p>
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="test@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
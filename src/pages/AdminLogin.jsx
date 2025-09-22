import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            // Use Firebase to sign in the user
            await signInWithEmailAndPassword(auth, email, password);
            // --- ADDED: Navigate to admin panel on successful login ---
            navigate('/admin');
        } catch (err) {
            // Handle Firebase authentication errors
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError('Invalid email or password.');
                    break;
                default:
                    setError('Failed to log in. Please try again.');
                    break;
            }
            console.error("Firebase login error:", err);
        }
        setIsLoading(false);
    };

    return (
        <div className="d-flex align-items-center bg-light" style={{ minHeight: 'calc(100vh - 70px)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-lg p-3">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                        Admin Login
                                    </h2>
                                    <p className="text-muted">Please enter your credentials</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input 
                                            type="email" 
                                            required 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            className="form-control form-control-lg" 
                                            placeholder="Email Address" 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input 
                                            type="password" 
                                            required 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            className="form-control form-control-lg" 
                                            placeholder="Password" 
                                        />
                                    </div>
                                    {error && <div className="alert alert-danger p-2">{error}</div>}
                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-dark btn-lg" disabled={isLoading}>
                                            {isLoading ? 'Logging in...' : 'Login'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;


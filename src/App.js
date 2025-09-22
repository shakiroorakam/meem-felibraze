import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase auth functions
import { auth } from './firebase'; // Import auth from your config
import Header from './components/Header';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';
import RegistrationFlow from './pages/RegistrationFlow';
import SuccessMessage from './components/SuccessMessage';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false); // State to check if auth state has been confirmed
    const navigate = useNavigate();

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setIsAdminAuthenticated(true);
            } else {
                // User is signed out.
                setIsAdminAuthenticated(false);
            }
            setAuthChecked(true); // Auth state has been checked, we can now render the routes
        });
        
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        navigate('/register');
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 5000);
    }
    
    const handleAdminLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login'); // Redirect to login after successful logout
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    
    // Don't render the app until the auth state has been confirmed
    if (!authChecked) {
        return (
             <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


    return (
        <div>
            {successMessage && <SuccessMessage message={successMessage} onDismiss={() => setSuccessMessage('')} />}
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<UserPanel onSelectPlan={handleSelectPlan} />} />
                    <Route 
                        path="/register" 
                        element={
                            <RegistrationFlow
                                plan={selectedPlan}
                                onBack={() => navigate('/')}
                                onRegistrationComplete={() => {
                                    showSuccess("Your registration details have been submitted!");
                                    navigate('/');
                                }}
                            />
                        } 
                    />
                    <Route path="/admin/login" element={<AdminLogin />} />

                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                                <AdminPanel onLogout={handleAdminLogout} />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;


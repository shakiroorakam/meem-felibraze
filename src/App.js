import React, { useState } from 'react';
import Header from './components/Header';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';
import SuccessMessage from './components/SuccessMessage';
import RegistrationFlow from './pages/RegistrationFlow';

function App() {
    const [currentPage, setCurrentPage] = useState('user'); 
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [registrations, setRegistrations] = useState([
        { name: 'John Doe', place: 'New York', mobile: '123-456-7890', planName: 'Workshop Premium', planPrice: '250' },
        { name: 'Jane Smith', place: 'London', mobile: '098-765-4321', planName: 'Basic', planPrice: '100' },
    ]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
        setCurrentPage('registration');
    };

    const handleRegister = (registrationDetails) => {
        setRegistrations(prevRegistrations => [...prevRegistrations, registrationDetails]);
        setSuccessMessage(`Registration complete, ${registrationDetails.name}! You can now download your ticket.`);
        setTimeout(() => setSuccessMessage(''), 6000);
    };

    const handleNavigate = (page) => {
        setSelectedPlan(null);
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'registration':
                return <RegistrationFlow 
                            plan={selectedPlan} 
                            onRegister={handleRegister} 
                            onBack={() => setCurrentPage('user')} 
                            onNavigateHome={() => handleNavigate('user')}
                        />;
            case 'admin':
                return <AdminPanel registrations={registrations} />;
            case 'user':
            default:
                return <UserPanel onSelectPlan={handleSelectPlan} />;
        }
    };
    
    return (
        <div>
           {successMessage && <SuccessMessage message={successMessage} onDismiss={() => setSuccessMessage('')} />}
           <Header onNavigate={handleNavigate} />
           <main>
             {renderPage()}
           </main>
        </div>
    );
}

export default App;


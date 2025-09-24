import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import UserDetailsForm from '../components/registration/UserDetailsForm.jsx';
import ManualPayment from '../components/registration/ManualPayment.jsx';
import Ticket from '../components/registration/Ticket.jsx';

const RegistrationFlow = ({ plan, onBack, onRegistrationComplete }) => {
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState(null);
    const [registrationId, setRegistrationId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDetailsSubmit = (details) => {
        setUserDetails(details);
        if (plan.price === 'Free' || plan.price === '0') {
            handleFreePlanSubmission(details);
        } else {
            setStep(2);
        }
    };
    
    const handleFreePlanSubmission = async (details) => {
        setIsSubmitting(true);
        const newRegistrationId = `reg_${Date.now()}`;
        setRegistrationId(newRegistrationId);
        
        try {
            const registrationDocRef = doc(db, 'registrations', newRegistrationId);
            await setDoc(registrationDocRef, {
                name: details.name,
                place: details.place,
                mobile: details.mobile,
                // publishedWorkUrl is removed
                planName: plan.name,
                planPrice: plan.price,
                status: 'approved',
                timestamp: new Date(),
            });
            setUserDetails(details);
            setStep(3);
        } catch (error) {
            console.error("Error submitting free registration:", error);
            alert("There was an error submitting your registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePaymentSubmit = async ({ transactionId, screenshotFile }) => {
        if (!userDetails || !screenshotFile || !transactionId) return;
        
        setIsSubmitting(true);
        try {
            const registrationsRef = collection(db, 'registrations');
            const q = query(registrationsRef, where("transactionId", "==", transactionId.trim()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("This Transaction ID has already been used. Please check your ID or contact support.");
                setIsSubmitting(false);
                return;
            }

            const newRegistrationId = `reg_${Date.now()}`;
            setRegistrationId(newRegistrationId);
            
            const screenshotRef = ref(storage, `screenshots/${newRegistrationId}/${screenshotFile.name}`);
            const screenshotSnapshot = await uploadBytes(screenshotRef, screenshotFile);
            const screenshotUrl = await getDownloadURL(screenshotSnapshot.ref);

            const registrationDocRef = doc(db, 'registrations', newRegistrationId);
            await setDoc(registrationDocRef, {
                name: userDetails.name,
                place: userDetails.place,
                mobile: userDetails.mobile,
                // publishedWorkUrl is removed
                planName: plan.name,
                planPrice: plan.price,
                transactionId: transactionId.trim(),
                screenshotUrl,
                status: 'pending',
                timestamp: new Date(),
            });
            setStep(3);
        } catch (error) {
            console.error("Error submitting registration:", error);
            alert("There was an error submitting your registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        if (isSubmitting) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{height: "calc(100vh - 70px)"}}>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Submitting...</span>
                    </div>
                    <p className="ms-3">Submitting your registration...</p>
                </div>
            );
        }

        switch (step) {
            case 1:
                return <UserDetailsForm plan={plan} onSubmit={handleDetailsSubmit} onBack={onBack} />;
            case 2:
                return <ManualPayment plan={plan} onSubmit={handlePaymentSubmit} onBack={() => setStep(1)} />;
            case 3:
                return <Ticket plan={plan} userDetails={userDetails} registrationId={registrationId} onNavigateHome={onRegistrationComplete} />;
            default:
                return <UserDetailsForm plan={plan} onSubmit={handleDetailsSubmit} onBack={onBack} />;
        }
    };

    return <div>{renderStep()}</div>;
};

export default RegistrationFlow;



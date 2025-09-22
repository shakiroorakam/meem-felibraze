import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import UserDetailsForm from '../components/registration/UserDetailsForm.jsx';
import ManualPayment from '../components/registration/ManualPayment.jsx';
import Ticket from '../components/registration/Ticket.jsx';

const RegistrationFlow = ({ plan, onBack, onRegistrationComplete }) => {
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState(null);
    const [registrationId, setRegistrationId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // This function saves data to Firestore and is now used by both free and paid flows
    const finalizeRegistration = async (data) => {
        setIsLoading(true);
        const newRegistrationId = `reg_${Date.now()}`;
        setRegistrationId(newRegistrationId);
        
        try {
            let publishedWorkUrl = null;
            // 1. Upload published work if it exists (only for workshops)
            if (data.publishedWorkFile) {
                const workFile = data.publishedWorkFile;
                const workStorageRef = ref(storage, `published_works/${newRegistrationId}/${workFile.name}`);
                const workSnapshot = await uploadBytes(workStorageRef, workFile);
                publishedWorkUrl = await getDownloadURL(workSnapshot.ref);
            }

            // 2. Prepare data for Firestore, including optional fields
            const firestoreData = {
                name: data.name,
                place: data.place,
                mobile: data.mobile,
                planName: plan.name,
                planPrice: plan.price,
                publishedWorkUrl, // Will be null if not a workshop
                transactionId: data.transactionId || null, // Will be null for free plans
                screenshotUrl: data.screenshotUrl || null, // Will be null for free plans
                status: 'pending',
                timestamp: new Date(),
            };
             // For free plans, we auto-approve them
            if (plan.price === 'Free') {
                firestoreData.status = 'approved';
            }

            // 3. Save to Firestore
            const registrationDocRef = doc(db, 'registrations', newRegistrationId);
            await setDoc(registrationDocRef, firestoreData);

            // 4. Move to ticket step
            setUserDetails(data);
            setStep(3);
        } catch (error) {
            console.error("Error finalizing registration:", error);
            alert(`There was an error submitting your registration. Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Step 1: User submits details
    const handleDetailsSubmit = (details) => {
        if (plan.price === 'Free') {
            // If the plan is free, finalize registration immediately and skip payment
            finalizeRegistration(details);
        } else {
            // For paid plans, proceed to the payment step
            setUserDetails(details);
            setStep(2);
        }
    };

    // Step 2: User submits payment proof (only for paid plans)
    const handlePaymentSubmit = async ({ transactionId, screenshotFile }) => {
        setIsLoading(true);
        try {
            // Upload screenshot
            const screenshotStorageRef = ref(storage, `screenshots/${registrationId}/${screenshotFile.name}`);
            const screenshotSnapshot = await uploadBytes(screenshotStorageRef, screenshotFile);
            const screenshotUrl = await getDownloadURL(screenshotSnapshot.ref);

            // Combine details and finalize
            const finalDetails = { ...userDetails, transactionId, screenshotUrl };
            await finalizeRegistration(finalDetails);
        } catch (error) {
            console.error("Error during payment submission:", error);
            alert(`There was an error submitting your payment. Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        if (isLoading) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
                    <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
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


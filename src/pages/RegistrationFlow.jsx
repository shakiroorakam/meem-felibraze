import React, { useState } from 'react';
import { db, storage } from '../firebase';
<<<<<<< HEAD
=======
// Import Firestore query functions
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
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

<<<<<<< HEAD
    /**
     * This function is called after the user submits their details.
     * It checks if the plan is free and routes the user accordingly.
     */
    const handleDetailsSubmit = (details) => {
        setUserDetails(details);
        // If the plan price is 'Free' or '0', skip the payment step.
        if (plan.price === 'Free' || plan.price === '0') {
            handleFreePlanSubmission(details);
        } else {
            // Otherwise, proceed to the manual payment step.
=======
    const handleDetailsSubmit = (details) => {
        setUserDetails(details);
        if (plan.price === 'Free') {
            handleFreePlanSubmission(details);
        } else {
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
            setStep(2);
        }
    };
    
<<<<<<< HEAD
    /**
     * Handles the entire registration process for a free plan.
     */
=======
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
    const handleFreePlanSubmission = async (details) => {
        setIsSubmitting(true);
        const newRegistrationId = `reg_${Date.now()}`;
        setRegistrationId(newRegistrationId);
        
        try {
            let publishedWorkUrl = null;
<<<<<<< HEAD
            // If it's a workshop, there might be a document to upload.
=======
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
            if (details.publishedWorkFile) {
                const workRef = ref(storage, `published_works/${newRegistrationId}/${details.publishedWorkFile.name}`);
                const workSnapshot = await uploadBytes(workRef, details.publishedWorkFile);
                publishedWorkUrl = await getDownloadURL(workSnapshot.ref);
            }

<<<<<<< HEAD
            // Save the registration data directly to Firestore.
=======
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
            const registrationDocRef = doc(db, 'registrations', newRegistrationId);
            await setDoc(registrationDocRef, {
                name: details.name,
                place: details.place,
                mobile: details.mobile,
                publishedWorkUrl,
                planName: plan.name,
                planPrice: plan.price,
<<<<<<< HEAD
                status: 'approved', // Free plans are automatically approved.
                timestamp: new Date(),
            });

            // Go directly to the ticket download step.
            setStep(3);
        
        } catch (error) {
             console.error("Error submitting free registration:", error);
            alert("There was an error submitting your registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Handles the submission for paid plans after payment proof is provided.
     */
    const handlePaymentSubmit = async ({ transactionId, screenshotFile }) => {
        if (!userDetails || !screenshotFile || !transactionId) return;
        
        setIsSubmitting(true);

        try {
            // Check for duplicate transaction ID
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
            
            // Upload screenshot
=======
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
            // --- CHECK FOR DUPLICATE TRANSACTION ID ---
            const registrationsRef = collection(db, 'registrations');
            const q = query(registrationsRef, where("transactionId", "==", transactionId.trim()));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // If a document with this transaction ID already exists
                alert("This Transaction ID has already been used. Please double-check your ID or contact support if you believe this is an error.");
                setIsSubmitting(false);
                return; // Stop the submission process
            }
            // --- END OF CHECK ---

            const newRegistrationId = `reg_${Date.now()}`;
            setRegistrationId(newRegistrationId);
            
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
            const screenshotRef = ref(storage, `screenshots/${newRegistrationId}/${screenshotFile.name}`);
            const screenshotSnapshot = await uploadBytes(screenshotRef, screenshotFile);
            const screenshotUrl = await getDownloadURL(screenshotSnapshot.ref);

<<<<<<< HEAD
            // Upload published work if it exists
=======
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
            let publishedWorkUrl = null;
            if (userDetails.publishedWorkFile) {
                const workRef = ref(storage, `published_works/${newRegistrationId}/${userDetails.publishedWorkFile.name}`);
                const workSnapshot = await uploadBytes(workRef, userDetails.publishedWorkFile);
                publishedWorkUrl = await getDownloadURL(workSnapshot.ref);
            }

<<<<<<< HEAD
            // Save all data to Firestore
=======
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
            const registrationDocRef = doc(db, 'registrations', newRegistrationId);
            await setDoc(registrationDocRef, {
                name: userDetails.name,
                place: userDetails.place,
                mobile: userDetails.mobile,
                publishedWorkUrl,
                planName: plan.name,
                planPrice: plan.price,
<<<<<<< HEAD
                transactionId: transactionId.trim(),
=======
                transactionId: transactionId.trim(), // Save the trimmed ID
>>>>>>> 0128561a498ceaedf33acfcd525a75f4adfc8214
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


        

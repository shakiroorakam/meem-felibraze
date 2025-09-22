import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode'; // Import the library directly

const Ticket = ({ plan, userDetails, registrationId, onNavigateHome }) => {
    const canvasRef = useRef(null);
    const ticketImageUrl = '/ticket.jpg'; // This file MUST be in your "public" folder
    const [status, setStatus] = useState('loading'); // 'loading', 'drawing', 'ready', 'error'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // We no longer need to wait for a script, just for the props and canvas.
        if (!plan || !userDetails || !registrationId || !canvasRef.current) {
            console.log("Waiting for props or canvas element...");
            return;
        }

        const drawTicket = async () => {
            console.log("Starting to draw E-Ticket...");
            setStatus('drawing');
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            canvas.width = 1920;
            canvas.height = 1080;

            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = ticketImageUrl;

            img.onload = async () => {
                try {
                    console.log("E-Ticket template image loaded.");
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    ctx.fillStyle = '#212529';
                    ctx.font = 'bold 50px Arial';
                    ctx.fillText(userDetails.name, 400, 500);

                    ctx.font = '50px Arial';
                    ctx.fillText(`Plan: ${plan.name}`, 250, 600);

                     // Remove the "reg_" prefix from the registrationId
                    const cleanRegistrationId = registrationId.replace(/^reg_/, '');

                    ctx.font = '50px Arial';
                    ctx.fillText(cleanRegistrationId, 420, 820);


                    // Generate QR code using the imported library
                    const qrCodeDataURL = await QRCode.toDataURL(registrationId, { width: 550, margin: 2 });
                    const qrImg = new Image();
                    qrImg.src = qrCodeDataURL;
                    
                    // Use a promise to wait for the QR code image to load
                    await new Promise((resolve, reject) => {
                        qrImg.onload = resolve;
                        qrImg.onerror = reject;
                    });

                    ctx.drawImage(qrImg, canvas.width - 630, canvas.height - 940);
                    console.log("E-Ticket drawing complete.");
                    setStatus('ready');

                } catch (err) {
                    console.error("QR Code generation or drawing failed:", err);
                    setErrorMessage("Failed to generate the QR code image.");
                    setStatus('error');
                }
            };
            
            img.onerror = () => {
                console.error(`Failed to load template from path: ${ticketImageUrl}`);
                setErrorMessage("Could not load 'ticket.jpg'. Please place it in the '/public' folder.");
                setStatus('error');
            };
        };

        drawTicket();

    }, [plan, userDetails, registrationId]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas || status !== 'ready') return;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `Event-E-Ticket-${registrationId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container py-5 text-center">
             <h2 className="display-4 fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                Registration Submitted!
            </h2>
            <div className="alert alert-warning col-lg-8 mx-auto">
                <strong>Your registration is pending approval.</strong> An admin will verify your payment shortly.
            </div>
            
            <div className="d-flex justify-content-center my-4" style={{minHeight: '250px'}}>
                 {status !== 'ready' && (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 text-muted">Generating your E-Ticket...</p>
                        {status === 'error' && <p className="text-danger mt-2 fw-bold">{errorMessage}</p>}
                    </div>
                 )}
                <canvas 
                    ref={canvasRef} 
                    style={{ 
                        display: status === 'ready' ? 'block' : 'none',
                        width: '100%', 
                        maxWidth: '500px', 
                        border: '1px solid #dee2e6', 
                        borderRadius: '8px' 
                    }} 
                />
            </div>

            <div className="d-grid gap-2 col-6 mx-auto">
                 <button onClick={handleDownload} className="btn btn-warning btn-lg" disabled={status !== 'ready'}>
                    Download E-Ticket
                </button>
                <button onClick={onNavigateHome} className="btn btn-outline-secondary">
                    Finish & Go Home
                </button>
            </div>
        </div>
    );
};

export default Ticket;


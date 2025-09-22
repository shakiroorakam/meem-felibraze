import React, { useState } from 'react';

// This component shows the real payment details and handles the proof upload
const ManualPayment = ({ plan, onSubmit, onBack }) => {
    const [transactionId, setTransactionId] = useState('');
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');
    const [isLoading, setIsLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(''); // To show "Copied!" message

    // Function to handle copying text to clipboard
    const handleCopy = (textToCopy, fieldName) => {
        try {
            // A simple way to copy text that works in most browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            setCopySuccess(fieldName);
            setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy. Please copy it manually.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check for file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large. Please upload an image under 5MB.");
                e.target.value = null; // Clear the input
                return;
            }
            setScreenshotFile(file);
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!transactionId || !screenshotFile) {
            alert("Please provide both a transaction ID and a screenshot.");
            return;
        }
        setIsLoading(true);
        await onSubmit({ transactionId, screenshotFile });
        setIsLoading(false);
    };

    const CopyIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
    );

    return (
        <div className="d-flex align-items-center bg-light" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg p-4">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                        Complete Your Payment
                                    </h2>
                                    <p className="text-muted">Step 2: Pay the fee and upload proof</p>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <h5 className="fw-bold mb-3">Payment Details</h5>
                                        <div className="p-3 rounded bg-light">
                                            <p className="mb-1"><strong>Bank:</strong> Canara Bank</p>
                                            <p className="mb-1"><strong>Name:</strong> MUHAMMED FASAL C P</p>
                                            <p className="mb-1"><strong>Account No:</strong> 110086741610</p>
                                            <p className="mb-1"><strong>IFSC:</strong> CNRB0000855</p>
                                            <hr />
                                             <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div>
                                                    <strong className="d-block">GPay Number:</strong>
                                                    <span>7034013911</span>
                                                </div>
                                                <button onClick={() => handleCopy('7034013911', 'gpay')} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                                                    <CopyIcon/> {copySuccess === 'gpay' ? 'Copied' : 'Copy'}
                                                </button>
                                            </div>
                                             <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong className="d-block">UPI ID:</strong>
                                                    <span>fasalvelluvangad-1@okaxis</span>
                                                </div>
                                                 <button onClick={() => handleCopy('fasalvelluvangad-1@okaxis', 'upi')} className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                                                     <CopyIcon/> {copySuccess === 'upi' ? 'Copied' : 'Copy'}
                                                 </button>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <img 
                                                    src="/payqr.jpeg" 
                                                    alt="Payment QR Code" 
                                                    className="img-fluid rounded"
                                                    style={{maxWidth: '150px'}}
                                                />
                                            </div>
                                        </div>
                                         <div className="mt-3 text-center p-3 border border-warning rounded bg-warning-subtle">
                                            <h5 className="mb-0">Amount to Pay: 
                                                <span className="fw-bold text-dark ms-2">
                                                    {plan.price !== 'Free' ? `₹${plan.price}` : 'Free'}
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="fw-bold mb-3">Submit Your Proof</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="transactionId" className="form-label">Transaction ID / UTR No.</label>
                                                <input
                                                    id="transactionId"
                                                    type="text"
                                                    required
                                                    value={transactionId}
                                                    onChange={(e) => setTransactionId(e.target.value)}
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your transaction ID"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                 <label htmlFor="screenshot" className="form-label">Payment Screenshot</label>
                                                 <input 
                                                    type="file" 
                                                    id="screenshot" 
                                                    className="form-control" 
                                                    required 
                                                    accept="image/png, image/jpeg, image/jpg"
                                                    onChange={handleFileChange}
                                                />
                                                <div className="form-text">{fileName}</div>
                                            </div>
                                            <div className="d-grid mt-4">
                                                <button type="submit" className="btn btn-dark btn-lg" disabled={isLoading}>
                                                    {isLoading ? 'Submitting...' : 'Submit & Finish'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                 <div className="text-center mt-3">
                                    <button onClick={onBack} className="btn btn-link text-muted text-decoration-none">
                                        &larr; Back to Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualPayment;


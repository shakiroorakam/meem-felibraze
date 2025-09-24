import React, { useState } from 'react';

const UserDetailsForm = ({ plan, onSubmit, onBack }) => {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [mobile, setMobile] = useState('');
    const [publishedWorkFile, setPublishedWorkFile] = useState(null);
    const [workFileName, setWorkFileName] = useState('No file chosen');

    // Conditionally render the upload field based on the plan type
    const isWorkshop = plan.type === 'workshop';

    const handleWorkFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large. Please upload a document under 5MB.");
                e.target.value = null;
                return;
            }
            setPublishedWorkFile(file);
            setWorkFileName(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // The published work is only mandatory if it's a workshop
        if (!name || !place || !mobile || (isWorkshop && !publishedWorkFile)) {
            alert("Please fill in all mandatory fields.");
            return;
        }
        onSubmit({ name, place, mobile, publishedWorkFile });
    };

    return (
        <div className="d-flex align-items-center bg-light" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg p-4">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                     <h2 className="fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                                        Register for <span className="text-warning">{plan.name}</span>
                                    </h2>
                                    <p className="text-muted">Step 1: Your Details</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-lg" placeholder="Full Name" />
                                    </div>
                                    <div className="mb-3">
                                        <input id="place" type="text" required value={place} onChange={(e) => setPlace(e.target.value)} className="form-control form-control-lg" placeholder="Place" />
                                    </div>
                                    <div className="mb-3">
                                        <input id="mobile" type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control form-control-lg" placeholder="Mobile Number" />
                                    </div>
                                    
                                    {/* Conditional rendering for the Published Works field */}
                                    {isWorkshop && (
                                        <div className="mb-3">
                                            <label htmlFor="publishedWork" className="form-label">Published Works (PDF, DOC, DOCX - Max 5MB)</label>
                                             <input
                                                type="file"
                                                id="publishedWork"
                                                className="form-control"
                                                required
                                                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                onChange={handleWorkFileChange}
                                            />
                                            <div className="form-text">{workFileName}</div>
                                        </div>
                                    )}

                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-dark btn-lg">
                                            {plan.price === 'free' ? 'Complete Registration' : 'Proceed to Payment'}
                                        </button>
                                    </div>
                                </form>
                                <div className="text-center mt-3">
                                    <button onClick={onBack} className="btn btn-link text-muted text-decoration-none">
                                        &larr; Back to Plans
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

export default UserDetailsForm;


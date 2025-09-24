import React, { useState } from 'react';

const UserDetailsForm = ({ plan, onSubmit, onBack }) => {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!name || !place || !mobile) {
            setError("Please fill in all fields.");
            return;
        }
        // No longer passing a file, just the text details
        onSubmit({ name, place, mobile });
    };

    return (
        <div className="d-flex align-items-center bg-light" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className="container">
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
                                    
                                    {error && <div className="alert alert-danger p-2">{error}</div>}

                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-dark btn-lg">
                                            {plan.price === 'Free' || plan.price === '0' ? 'Complete Registration' : 'Proceed to Payment'}
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



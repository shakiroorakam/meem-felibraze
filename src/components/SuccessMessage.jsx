import React from 'react';

const SuccessMessage = ({ message, onDismiss }) => (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1100 }}>
        <div className="alert alert-success alert-dismissible fade show shadow-lg" role="alert">
            {message}
            <button type="button" className="btn-close" onClick={onDismiss} aria-label="Close"></button>
        </div>
    </div>
);

export default SuccessMessage;


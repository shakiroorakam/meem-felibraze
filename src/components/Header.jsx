import React from 'react';

const Header = ({ onNavigate }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
        <div className="container">
            <a className="navbar-brand" href="#">
                <img src="https://placehold.co/40x40/ffc107/495057?text=ER" alt="EventReg Logo" className="d-inline-block align-text-top rounded me-2" />
                EventReg
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li className="nav-item"><button onClick={() => onNavigate('user')} className="nav-link text-uppercase">Home</button></li>
                    
                    
                </ul>
                <button onClick={() => onNavigate('user')} className="btn" style={{backgroundColor: '#c8974f', color: 'white'}}>REGISTER NOW</button>
            </div>
        </div>
    </nav>
);

export default Header;


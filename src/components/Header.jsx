import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // useCallback is used to prevent the function from being recreated on every render,
    // which satisfies the dependency array warning.
    const controlNavbar = useCallback(() => {
        if (window.scrollY > 100 && window.scrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [controlNavbar]); // controlNavbar is now a stable dependency

    return (
        <nav 
            className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm"
            style={{ top: isVisible ? '0' : '-80px', transition: 'top 0.3s ease-in-out' }}
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img 
                        src="/Logo.png" 
                        alt="EventReg Logo" 
                        className="d-inline-block align-text-top" 
                        style={{ width: '130px', height: 'auto' }} 
                    />
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link text-uppercase" to="/">Home</NavLink>
                        </li>
                    </ul>
                    <Link to="/" className="btn" style={{backgroundColor: '#c8974f', color: 'white'}}>REGISTER NOW</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;


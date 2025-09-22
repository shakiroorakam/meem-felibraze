import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; // Let the build tool resolve the file extension
import { collection, query, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';

// A small component to render the QR code
const QrCodeDisplay = ({ registrationId }) => {
    const canvasRef = useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Safety check to ensure the QRCode library is loaded
        if (window.QRCode && registrationId) {
            window.QRCode.toCanvas(canvasRef.current, registrationId, { width: 80, margin: 1 }, (err) => {
                if (err) {
                    console.error('QR Code generation failed:', err);
                    setError(true);
                }
            });
        } else {
             console.log("QRCode library not ready or no registrationId");
        }
    }, [registrationId]);

    if (error) {
        return <small className="text-danger">QR Error</small>;
    }

    return <canvas ref={canvasRef} />;
};

const AdminPanel = () => {
    const [registrations, setRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(db, 'registrations'), orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(q);
            const regs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRegistrations(regs);
        } catch (error) {
            console.error("Error fetching registrations: ", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        const regDocRef = doc(db, 'registrations', id);
        try {
            await updateDoc(regDocRef, { status: newStatus });
            setRegistrations(prev => 
                prev.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg)
            );
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };
    
    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return 'bg-success';
            case 'rejected': return 'bg-danger';
            case 'pending':
            default: return 'bg-warning text-dark';
        }
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="display-4 fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Admin Panel</h1>
                 <button className="btn btn-outline-primary" onClick={fetchRegistrations} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Refresh'}
                </button>
            </div>
            
            {isLoading ? (
                <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
            ) : registrations.length === 0 ? (
                <div className="alert alert-secondary">No registrations found.</div>
            ) : (
                <div className="card shadow-sm">
                     <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0" style={{verticalAlign: 'middle'}}>
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="p-3">QR Code</th>
                                    <th scope="col" className="p-3">Details</th>
                                    <th scope="col" className="p-3">Plan</th>
                                    <th scope="col" className="p-3">Published Work</th>
                                    <th scope="col" className="p-3">Transaction ID</th>
                                    <th scope="col" className="p-3">Screenshot</th>
                                    <th scope="col" className="p-3">Status</th>
                                    <th scope="col" className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((reg) => (
                                    <tr key={reg.id}>
                                        <td className="p-3">
                                            <QrCodeDisplay registrationId={reg.id} />
                                            <small className="text-muted d-block mt-1" style={{fontSize: '0.75em', wordBreak: 'break-all'}}>{reg.id}</small>
                                        </td>
                                        <td className="p-3">
                                            <div><strong>{reg.name}</strong></div>
                                            <small className="text-muted">{reg.place}</small><br/>
                                            <small className="text-muted">{reg.mobile}</small>
                                        </td>
                                        <td className="p-3">{reg.planName} ({reg.planPrice === 'Free' ? 'Free' : `₹${reg.planPrice}`})</td>
                                        <td className="p-3">
                                            {reg.publishedWorkUrl ? (
                                                <a href={reg.publishedWorkUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info">View Work</a>
                                            ) : (
                                                <span className="text-muted">N/A</span>
                                            )}
                                        </td>
                                        <td className="p-3">{reg.transactionId || <span className="text-muted">N/A</span>}</td>
                                        <td className="p-3">
                                            {reg.screenshotUrl ? (
                                                <a href={reg.screenshotUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">View Proof</a>
                                            ) : (
                                                <span className="text-muted">N/A</span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <span className={`badge ${getStatusBadge(reg.status)}`}>{reg.status}</span>
                                        </td>
                                        <td className="p-3 text-center">
                                            {reg.status === 'pending' && (
                                                <div className="btn-group" role="group">
                                                    <button onClick={() => handleStatusChange(reg.id, 'approved')} className="btn btn-sm btn-success">Approve</button>
                                                    <button onClick={() => handleStatusChange(reg.id, 'rejected')} className="btn btn-sm btn-danger">Reject</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;


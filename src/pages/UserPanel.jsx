import React from 'react';
import { sessionPlans, workshopPlans } from '../data/plans';
import PricingCard from '../components/PricingCard';
import { FeatureIcon, AllSessionsIcon, CertificationIcon, BookDiscountsIcon } from '../components/icons/FeatureIcons';

const UserPanel = ({ onSelectPlan }) => (
    <div className="bg-white">
        <div className="container py-5">
            <div className="text-center">
                <span className="badge rounded-pill text-bg-warning-subtle text-warning-emphasis p-2 mb-3">New Workshop Sessions Available</span>
                <h1 className="display-2 fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Plans and Pricing</h1>
                <p className="lead text-muted mt-3 col-lg-6 mx-auto">
                    Choose the perfect plan for your learning journey. Join our sessions and workshops with comprehensive benefits.
                </p>
            </div>

            <div className="text-center mt-5 pt-4">
                <h2 className="h1 fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Session Plans</h2>
                <p className="text-muted col-lg-5 mx-auto">Access our comprehensive sessions with varying levels of benefits.</p>
            </div>
            {/* --- UPDATED GRID FOR 4 CARDS --- */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
                {sessionPlans.map(plan => 
                    <div key={plan.name} className="col">
                        <PricingCard plan={plan} onSelectPlan={onSelectPlan} />
                    </div>
                )}
            </div>

            <div className="text-center mt-5 pt-4">
                <h2 className="h1 fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Workshop Plans</h2>
                <p className="text-muted col-lg-5 mx-auto">Intensive hands-on workshops with comprehensive accommodation and learning materials.</p>
            </div>
            {/* --- UPDATED GRID FOR LARGER WORKSHOP CARDS --- */}
            <div className="row justify-content-center g-4 mt-3">
                {workshopPlans.map(plan => 
                    <div key={plan.name} className="col-12 col-md-6 col-lg-5">
                        <PricingCard plan={plan} onSelectPlan={onSelectPlan} />
                    </div>
                )}
            </div>

            <div className="col-lg-9 mx-auto mt-5 pt-4">
                <div className="card border-warning-subtle">
                    <div className="card-body p-5 text-center">
                        <h3 className="h2 fw-bold text-body-emphasis" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Need Something Different?</h3>
                        <p className="text-muted mt-2 mb-4">Looking for custom packages or have specific requirements? We're here to help you find the perfect solution.</p>
                        <div className="row mt-4">
                            <div className="col-md-4">
                                <FeatureIcon><AllSessionsIcon /></FeatureIcon>
                                <h4 className="fw-bold mt-3">All Sessions Included</h4>
                                <p className="text-sm text-muted">Access to every session and presentation.</p>
                            </div>
                            <div className="col-md-4">
                                <FeatureIcon><CertificationIcon /></FeatureIcon>
                                <h4 className="fw-bold mt-3">Certification</h4>
                                <p className="text-sm text-muted">Official participation certificates.</p>
                            </div>
                            <div className="col-md-4">
                                <FeatureIcon><BookDiscountsIcon /></FeatureIcon>
                                <h4 className="fw-bold mt-3">Book Discounts</h4>
                                <p className="text-sm text-muted">Exclusive discounts on all publications.</p>
                            </div>
                        </div>
                        <button className="btn btn-outline-warning btn-lg mt-4">Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default UserPanel;


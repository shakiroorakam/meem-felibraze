import React from 'react';
import CheckIcon from './icons/CheckIcon';

const PricingCard = ({ plan, onSelectPlan }) => (
    <div className={`card h-100 ${plan.recommended ? 'border-warning border-2' : 'border-warning-subtle'}`}>
        {plan.recommended && <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning text-dark">Recommended</span>}
        <div className="card-body d-flex flex-column">
            <h3 className="card-title h4 fw-bold text-body-emphasis">{plan.name}</h3>
            <p className="card-text text-muted" style={{minHeight: '48px'}}>{plan.description}</p>
            <div className="my-4">
                <span className="h1 fw-bold text-body-emphasis">
                    {plan.price !== 'Free' ? '₹' : ''}{plan.price}
                </span>
            </div>
            <ul className="list-unstyled mb-4">
                {plan.features.map((feature, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                        <CheckIcon />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button 
                onClick={() => onSelectPlan(plan)}
                className={`w-100 mt-auto btn btn-lg ${plan.recommended ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
            >
                {plan.buttonText}
            </button>
        </div>
    </div>
);

export default PricingCard;


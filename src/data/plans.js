// --- Data for Plans ---
// I've added a 'type' property to each plan for easier logic handling.
const sessionPlans = [
    { name: 'Free', price: '0', type: 'session', description: 'Perfect for exploring our sessions', features: ['Access to All Sessions', '15% Discount on All Books'], buttonText: 'Get Started' },
    { name: 'Basic', price: '100', type: 'session', description: 'Great for individual participants', features: ['Access to All Sessions', 'Badge & Note', 'Certificate of Participation', 'Accommodation', '20% Discount on All Books'], buttonText: 'Choose Basic' },
    { name: 'Medium', price: '200', type: 'session', description: 'Enhanced experience with limited benefits', features: ['Access to All Sessions', 'Badge & Note', 'Certificate of Participation', 'Two Day Food & Accommodation', '25% Discount on All Books'], buttonText: 'Choose Premium' },
    { name: 'Premium', price: '300', type: 'session', description: 'Enhanced experience with full benefits', features: ['Access to All Sessions','Badge & Note','Certification of Participation','Two Day Food & Accommodation','Free Entry for Expo', '30 % Discount on All Books'], buttonText: 'Choose Premium' },
];

const workshopPlans = [
    { name: 'Workshop Basic', price: '150', type: 'workshop', description: 'Hands-on workshop experience', features: ['Two Day Food & Accommodation', 'Badge & Note', 'Access to All Sessions', '20% Discount on All Books', 'Certificate of Participation'], buttonText: 'Join Workshop' },
    { name: 'Workshop Premium', price: '250', type: 'workshop', description: 'Complete workshop package with extras', features: ['Two Day Food & Accommodation', 'Badge & Note', 'Access to All Sessions', '20% Discount on All Books', 'Certificate of Participation', 'Special Swag Bag'], buttonText: 'Join Premium Workshop', recommended: true },
];

export { sessionPlans, workshopPlans };


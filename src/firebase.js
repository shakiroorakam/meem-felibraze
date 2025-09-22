import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- IMPORTANT ---
// Carefully copy and paste these values from your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyAPvYTu4_EKTe6njT0eLPgPerxEDH_QzE0",
  authDomain: "meem-felibraze.firebaseapp.com",
  projectId: "meem-felibraze",
  storageBucket: "meem-felibraze.firebasestorage.app",
  messagingSenderId: "401784672634",
  appId: "1:401784672634:web:68db46fdda9603e5aa46c3",
  measurementId: "G-C727YL6CGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get references to the services
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

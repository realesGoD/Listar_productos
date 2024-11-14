// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCyarfpR1ZwKvyPVLzyVjRLQNiWB1h2WmA",
    authDomain: "crud-jesusweb.firebaseapp.com",
    projectId: "crud-jesusweb",
    storageBucket: "crud-jesusweb.firebasestorage.app",
    messagingSenderId: "575212076580",
    appId: "1:575212076580:web:dcac376fc3ef503e05e2b1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

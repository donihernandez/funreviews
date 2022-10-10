import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB5q9V-Lf_gBHIGNa2bB2FG3TxXUnU6aqs',
    appId: '1:81889447518:web:a4e437d419a36c614f6ecf',
    authDomain: 'fun-reviews-e502b.firebaseapp.com',
    measurementId: 'G-ZLZTYT67F0',
    messagingSenderId: '81889447518',
    projectId: 'fun-reviews-e502b',
    storageBucket: 'fun-reviews-e502b.appspot.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export default app;
export { auth, db, storage };

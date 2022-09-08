import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB3g0iTbjPCFDDDsUPzPdW281vEr_7RKfo',
    appId: '1:514573735978:web:4d7657715bd28002954b53',
    authDomain: 'fun-reviews-5cc40.firebaseapp.com',
    measurementId: 'G-PLR5FVEWPV',
    messagingSenderId: '514573735978',
    projectId: 'fun-reviews-5cc40',
    storageBucket: 'fun-reviews-5cc40.appspot.com',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };

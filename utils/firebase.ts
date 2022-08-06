import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

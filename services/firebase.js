// services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDHISMPrF8FclfulfgymajmKwNb_4iokoo",
    authDomain: "e-book-71c54.firebaseapp.com",
    projectId: "e-book-71c54",
    storageBucket: "e-book-71c54.appspot.com",
    messagingSenderId: "751183563712",
    appId: "1:751183563712:web:ce62c4991fb2ab45995625",
    measurementId: "G-N71CES6SRB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

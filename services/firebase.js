// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyDHISMPrF8FclfulfgymajmKwNb_4iokoo",
  authDomain: "e-book-71c54.firebaseapp.com",
  projectId: "e-book-71c54",
  storageBucket: "e-book-71c54.appspot.com", // Firebase storage bucket
  messagingSenderId: "751183563712",
  appId: "1:751183563712:web:ce62c4991fb2ab45995625",
  measurementId: "G-N71CES6SRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth, Firestore, Storage, and GoogleAuthProvider for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export Firebase Storage
export const googleProvider = new GoogleAuthProvider();

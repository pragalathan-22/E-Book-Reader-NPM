import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDHISMPrF8FclfulfgymajmKwNb_4iokoo",
  authDomain: "e-book-71c54.firebaseapp.com",
  projectId: "e-book-71c54",
  storageBucket: "e-book-71c54.appspot.com",
  messagingSenderId: "751183563712",
  appId: "1:751183563712:web:ce62c4991fb2ab45995625",
  measurementId: "G-N71CES6SRB"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

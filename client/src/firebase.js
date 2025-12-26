// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-72a38.firebaseapp.com",
  projectId: "mern-auth-72a38",
  storageBucket: "mern-auth-72a38.firebasestorage.app",
  messagingSenderId: "641233404165",
  appId: "1:641233404165:web:6fe4b72b7bf448f30f776c",
  measurementId: "G-MTKSQDWEW4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


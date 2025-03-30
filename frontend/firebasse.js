import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_yFOzw9AJXXmvwkGbHRgPgZpL2YsnhxE",
  authDomain: "jobconnect-e95b7.firebaseapp.com",
  projectId: "jobconnect-e95b7",
  storageBucket: "jobconnect-e95b7.firebasestorage.app",
  messagingSenderId: "174513197440",
  appId: "1:174513197440:web:d76be50e728cc68b13b165",
  measurementId: "G-ZKDJK7RFV6"
};

const app =
    initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
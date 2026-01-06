// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcfNUe8PPQGSRG-NtTDzt-dS4N2NpENEw",
  authDomain: "smart-dine-8635e.firebaseapp.com",
  projectId: "smart-dine-8635e",
  storageBucket: "smart-dine-8635e.firebasestorage.app",
  messagingSenderId: "49920395176",
  appId: "1:49920395176:web:ec7b5a6f2e6850fb6aff9d",
  measurementId: "G-ZV8NW1ZBXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
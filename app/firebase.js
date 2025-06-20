// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //register user
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTTX1XPEFb9sM4Bpz0fsa1pBisPk9C99Y",
  authDomain: "rntaskmanager-4e83e.firebaseapp.com",
  projectId: "rntaskmanager-4e83e",
  storageBucket: "rntaskmanager-4e83e.firebasestorage.app",
  messagingSenderId: "265997008127",
  appId: "1:265997008127:web:c5bf04427b064c525020ca",
  measurementId: "G-JCXQGHB6EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);

export default app;
// const analytics = getAnalytics(app);
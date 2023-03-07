// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Timestamp, FieldValue } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKQ7Da0XRr8XKpumBT0tiSFLw9u5a1azo",
  authDomain: "dexbarber-d6428.firebaseapp.com",
  projectId: "dexbarber-d6428",
  storageBucket: "dexbarber-d6428.appspot.com",
  messagingSenderId: "38533633788",
  appId: "1:38533633788:web:a6a5b6a0a56fbfc059a979",
  measurementId: "G-TXY2SV2NEF"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
export default db
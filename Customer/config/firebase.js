import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Timestamp, FieldValue } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1KScQw4U_cNULHaUHzXULWenCxHWhvRk",
  authDomain: "dex-barber.firebaseapp.com",
  projectId: "dex-barber",
  storageBucket: "dex-barber.appspot.com",
  messagingSenderId: "506641102709",
  appId: "1:506641102709:web:c51cd859e496e950c3053c",
  measurementId: "G-S07HR6DNH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
export default db
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfnV5MPy0OVo39gaNL4ZcOUJCofm0MHMs",
  authDomain: "tpcoursmobile.firebaseapp.com",
  databaseURL: "https://tpcoursmobile-default-rtdb.firebaseio.com",
  projectId: "tpcoursmobile",
  storageBucket: "tpcoursmobile.appspot.com",
  messagingSenderId: "811097323774",
  appId: "1:811097323774:web:2f4f9ea7e1a7cb29e14daf",
  measurementId: "G-ZD92ZWZ1BT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;

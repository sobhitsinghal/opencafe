// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import firebase from "firebase/compat/app";
// import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8mV91RFVUKj17caXI1wP_Q8SiJYX1JlU",
  authDomain: "restsem.firebaseapp.com",
  projectId: "restsem",
  storageBucket: "restsem.appspot.com",
  messagingSenderId: "273799189163",
  appId: "1:273799189163:web:2ff49dfa70248f34c2ddee",
  measurementId: "G-BLBSSNNJPX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const storage = getStorage(app);
// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, googleProvider, storage, db };

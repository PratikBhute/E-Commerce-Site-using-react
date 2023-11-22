// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQnAeY4YSoM68UU8XqLUk8El9tE27n794",
  authDomain: "d-mart-c33e7.firebaseapp.com",
  projectId: "d-mart-c33e7",
  storageBucket: "d-mart-c33e7.appspot.com",
  messagingSenderId: "826858829239",
  appId: "1:826858829239:web:f51e85a88009e5eb9e2432"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,   auth } ;
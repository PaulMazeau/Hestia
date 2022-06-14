// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5zQ__Vs4Zjj4Pn4BxbcW57RPfrSUGsic",
  authDomain: "hestiadev-813bc.firebaseapp.com",
  projectId: "hestiadev-813bc",
  storageBucket: "hestiadev-813bc.appspot.com",
  messagingSenderId: "69579247938",
  appId: "1:69579247938:web:36aee7ef0bb396784438db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
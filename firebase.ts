import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNPX_ll80w_nPCFmh5FX3JOKlH7iTTniQ",
  authDomain: "nextvideo-26419.firebaseapp.com",
  projectId: "nextvideo-26419",
  storageBucket: "nextvideo-26419.appspot.com",
  messagingSenderId: "988711060989",
  appId: "1:988711060989:web:c8f2ccfea51c1cb74c8594",
  measurementId: "G-0Q5R72WQ9V",
};

initializeApp(firebaseConfig);

var provider = new GoogleAuthProvider();
export { provider };

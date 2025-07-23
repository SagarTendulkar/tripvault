import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfC87Rk7Yu6WWEh2wGXspcvzs3-Pn28ro",
  authDomain: "trip-vault-79f9b.firebaseapp.com",
  projectId: "trip-vault-79f9b",
  storageBucket: "trip-vault-79f9b.firebasestorage.app",
  messagingSenderId: "247657431789",
  appId: "1:247657431789:web:63b39ee522bbe2051dc2e4",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS83qetkWwJmt0PHCemMP1QZSBIqyblhc",
  authDomain: "notion-clone-cc353.firebaseapp.com",
  projectId: "notion-clone-cc353",
  storageBucket: "notion-clone-cc353.firebasestorage.app",
  messagingSenderId: "533904672551",
  appId: "1:533904672551:web:71e4d6051d842d49eccb02"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
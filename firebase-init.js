// Firebase SDKs via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCScn7VbPmrLXb0u9yq-3l8tfFJcbPZxPw",
  authDomain: "testlab-b8c90.firebaseapp.com",
  projectId: "testlab-b8c90",
  storageBucket: "testlab-b8c90.firebasestorage.app",
  messagingSenderId: "1012515743040",
  appId: "1:1012515743040:web:5e31c11d1f6d1fcfc006a5",
  measurementId: "G-R3VPKKZ9FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

export { db, doc, getDoc, updateDoc, increment, setDoc, onSnapshot };

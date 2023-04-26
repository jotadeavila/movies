
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDtnobwy-j8EXFQfdX1x_2lPpjkZoHVgss",
  authDomain: "react-netflix-f707e.firebaseapp.com",
  projectId: "react-netflix-f707e",
  storageBucket: "react-netflix-f707e.appspot.com",
  messagingSenderId: "135529435348",
  appId: "1:135529435348:web:1947a613dace2d7cc46b41",
  measurementId: "G-XGDZYBRV92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)
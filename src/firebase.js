import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCykS4PdImPgnkA2Ien1j7kQfOdTNnFK04",
    authDomain: "near-us-3b4f3.firebaseapp.com",
    projectId: "near-us-3b4f3",
    storageBucket: "near-us-3b4f3.appspot.com",
    messagingSenderId: "652576746145",
    appId: "1:652576746145:web:274a9c8c4365e716651ee0",
    measurementId: "G-87WPTK9R2P"
  };
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;







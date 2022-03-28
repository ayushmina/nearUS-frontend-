import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBnW-JxS_ObTxL13cqVEcouFgaxErwrvlc",
    authDomain: "nearus-9acce.firebaseapp.com",
    projectId: "nearus-9acce",
    storageBucket: "nearus-9acce.appspot.com",
    messagingSenderId: "1036181121620",
    appId: "1:1036181121620:web:c93a54a1caa9caa80b9bc1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;







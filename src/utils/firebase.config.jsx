import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { getFirestore } from '@firebase/firestore';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "react-firebase-redux-2154c.firebaseapp.com",
    projectId: "react-firebase-redux-2154c",
    storageBucket: "react-firebase-redux-2154c.appspot.com",
    messagingSenderId: "338379224055",
    appId: "1:338379224055:web:398cc0ca5f1605d215f4f2"
});

export const auth = app.auth();
export const db = getFirestore();
export default app;
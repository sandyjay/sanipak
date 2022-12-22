import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';


// Initialize Firebase
const app = initializeApp({
    apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
    databaseURL: "https://sanipakportal-default-rtdb.firebaseio.com",
    authDomain: "sanipakportal.firebaseapp.com",
    projectId: "sanipakportal",
    storageBucket: "sanipakportal.appspot.com",
    messagingSenderId: "631440160563",
    appId: "1:631440160563:web:469c36407d5e910b2b7046",
    measurementId: "G-YLSJL3EG16"
});

export const realtimedb = getDatabase(app)
const storage = getStorage(app);
export default storage;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEHttpx689Y8ROqhYlnMv98H02z8sXirQ",
  authDomain: "sanipak-authentication.firebaseapp.com",
  projectId: "sanipak-authentication",
  storageBucket: "sanipak-authentication.appspot.com",
  messagingSenderId: "739781222549",
  appId: "1:739781222549:web:bbeb4fb653ddb914a87b9c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

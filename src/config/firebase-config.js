import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9_yaty4qKbV2nrl30e2_K9K6oDf9umK8",
  authDomain: "reactblogsite-a1961.firebaseapp.com",
  projectId: "reactblogsite-a1961",
  storageBucket: "reactblogsite-a1961.appspot.com",
  messagingSenderId: "428530983908",
  appId: "1:428530983908:web:805617511ca1c4f90a1df1",
  measurementId: "G-GZLG5JTJ3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
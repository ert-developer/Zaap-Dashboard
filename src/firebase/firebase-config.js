// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkyXUEGRJLonJEP_46WBT1Lyx-TDAvEC0",
  authDomain: "zaap-dc296.firebaseapp.com",
  databaseURL: "https://zaap-dc296.firebaseio.com",
  projectId: "zaap-dc296",
  storageBucket: "zaap-dc296.appspot.com",
  messagingSenderId: "600651705755",
  appId: "1:600651705755:web:703afc43f9173df2",
  measurementId: "G-DE0C4VCCY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const fireStoreDB = getFirestore(app);
export const auth = getAuth(app);

export default app;

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ import auth
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDArnTD9PqCIbushO2O0-gvUaQmAJ1lTCA",
  authDomain: "react-project-c5576.firebaseapp.com",
  projectId: "react-project-c5576",
  storageBucket: "react-project-c5576.appspot.com", // fixed typo (.app → .app**spot**.com)
  messagingSenderId: "1055827632817",
  appId: "1:1055827632817:web:b61062e53ae29fa41d7890",
  measurementId: "G-RYTBCZSJGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Correctly get Auth and Analytics
export const authentication = getAuth(app);
export const db =getFirestore(app)
export const analytics = getAnalytics(app);

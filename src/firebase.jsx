import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSIiTW17-7nElcSi9G57NCMaaY8LxePvM",
  authDomain: "whats-app-clone-1bf1e.firebaseapp.com",
  projectId: "whats-app-clone-1bf1e",
  storageBucket: "whats-app-clone-1bf1e.appspot.com",
  messagingSenderId: "925750253853",
  appId: "1:925750253853:web:c16e7f9e7d35b7e01929f4",
  measurementId: "G-PXP5NGNT36",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebase.firebaseApp.firestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
export { auth, provider };
export default db;

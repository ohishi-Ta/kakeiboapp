// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2mq_geCG_tcObmmso9zU2n3Xl6owldjo",
  authDomain: "typescript-react-kakeiboapp.firebaseapp.com",
  projectId: "typescript-react-kakeiboapp",
  storageBucket: "typescript-react-kakeiboapp.appspot.com",
  messagingSenderId: "696393563999",
  appId: "1:696393563999:web:95cc202519c4147ab9c0ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
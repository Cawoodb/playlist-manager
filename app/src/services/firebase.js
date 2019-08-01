// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
require('dotenv').config();

console.log(process.env);
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "trainingnode-85a3e.firebaseapp.com",
  databaseURL: "https://trainingnode-85a3e.firebaseio.com",
  projectId: "trainingnode-85a3e",
  storageBucket: "trainingnode-85a3e.appspot.com",
  messagingSenderId: "400394898948",
  appId: "1:400394898948:web:5cf68b39ddf6fef3"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
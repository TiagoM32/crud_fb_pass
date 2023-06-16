import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLGWMJASOe18romkHTkSOAo38rXTOG2rA",
  authDomain: "crud-fire-react-35fb7.firebaseapp.com",
  databaseURL: "https://crud-fire-react-35fb7-default-rtdb.firebaseio.com",
  projectId: "crud-fire-react-35fb7",
  storageBucket: "crud-fire-react-35fb7.appspot.com",
  messagingSenderId: "830003493582",
  appId: "1:830003493582:web:3774b7e2720ef2cbbdee9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
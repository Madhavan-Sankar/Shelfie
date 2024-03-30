import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAFye6W9eK_hpacL5Ye7lyyRJyiMj3B6AU",
    authDomain: "stock-f7727.firebaseapp.com",
    databaseURL: "https://stock-f7727-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "stock-f7727",
    storageBucket: "stock-f7727.appspot.com",
    messagingSenderId: "947523017302",
    appId: "1:947523017302:web:2a1c89d779b9186b5779f7",
    measurementId: "G-ZR5JWFL9ZG"  
  };
  

if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase()

export {db}
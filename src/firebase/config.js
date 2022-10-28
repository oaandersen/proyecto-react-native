import app from 'firebase/app'
import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyB4zcuvrxXpCZMZsrpKzr1CRLnZ0bQZSDY",
    authDomain: "proyecto-integrador-a1c45.firebaseapp.com",
    projectId: "proyecto-integrador-a1c45",
    storageBucket: "proyecto-integrador-a1c45.appspot.com",
    messagingSenderId: "103737565749",
    appId: "1:103737565749:web:585e889dc846371900077c"
  };

app.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storage = app.storage()
export const auth = firebase.auth()
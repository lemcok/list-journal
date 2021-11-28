import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB76VSsN1L6WirEBAlV1ReQR04aqATG1uY",
    authDomain: "react-app-cursos-3182f.firebaseapp.com",
    databaseURL: "https://react-app-cursos-3182f.firebaseio.com",
    projectId: "react-app-cursos-3182f",
    storageBucket: "react-app-cursos-3182f.appspot.com",
    messagingSenderId: "392315147422",
    appId: "1:392315147422:web:65293fd005d606531a978f"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig); //esta es la base de datos

const db = firebase.firestore(); //esta es la referencia a firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //este es el auth provider para hacer la autenticacion con google

export {
    db,
    googleAuthProvider,
    firebase
}
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//CAMBIAR POR LAS CREDENCIALES DE LA EMPRESA
const firebaseConfig = {
    apiKey: "AIzaSyDpMxso7pwYwHl2tFAXqIJxlpnYozhLOh8",
    authDomain: "crud-ea92e.firebaseapp.com",
    databaseURL: "https://crud-ea92e.firebaseio.com",
    projectId: "crud-ea92e",
    storageBucket: "crud-ea92e.appspot.com",
    messagingSenderId: "486699919297",
    appId: "1:486699919297:web:541987db30959d3eba3140",
    measurementId: "G-2EJYYBHKXG"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}

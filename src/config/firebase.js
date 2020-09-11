import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDlxVbhiDgu5mbOUFySN4WFuIh8xoS6l88",
    authDomain: "instagram-app-31caa.firebaseapp.com",
    databaseURL: "https://instagram-app-31caa.firebaseio.com",
    projectId: "instagram-app-31caa",
    storageBucket: "instagram-app-31caa.appspot.com",
    messagingSenderId: "657065470934",
    appId: "1:657065470934:web:2a9b8ecc4b91c89a0c5277",
    measurementId: "G-XCCLFYVYRL"
}

const firebaseApp= firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJbU1KesyIXDtuVPVrs3Dut8hyheoMO5M",
  authDomain: "hola-1debb.firebaseapp.com",
  projectId: "hola-1debb",
  storageBucket: "hola-1debb.appspot.com",
  messagingSenderId: "22758903534",
  appId: "1:22758903534:web:4994246772e23679a3edff",
  measurementId: "G-VC1J1QY47J"
};

let app;

if( firebase.apps.length === 0 ) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }
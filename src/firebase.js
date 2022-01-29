// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, authDomain } from 'firebase/firestore';
import { config } from './firebaseConfig'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(config);
const db = getFirestore(app);

export default db;
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

require('dotenv').config();

const firebaseConfig = {
    apiKey: "AIzaSyCwGXkArBVMWirp4Epx4mxu1F0RKsXXwbg"/*process.env.API_KEY*/,
    authDomain: "gym-site1.firebaseapp.com" /*process.env.AUTH_DOMAIN*/,
    projectId: "gym-site1" /*process.env.PROJECT_ID*/,
    storageBucket: "gym-site1.appspot.com" /*process.env.STORAGE_BUCKET*/,
    messagingSenderId: "389704936097" /*process.env.MESSAGING_SENDER_ID*/,
    appId: "1:389704936097:web:4e8a925839f5fe811c9ee0" /*process.env.APP_ID*/,
    measurementId: "G-6PK9Z41XFV" /*process.env.MESAUREMENT_ID*/
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
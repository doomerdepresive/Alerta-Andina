// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJSVrUxWPAs0I0L3GvdnchKUIznlPIoxQ",
    authDomain: "alerta-andina-app.firebaseapp.com",
    projectId: "alerta-andina-app",
    storageBucket: "alerta-andina-app.firebasestorage.app",
    messagingSenderId: "876527948215",
    appId: "1:876527948215:web:6fd12529cae9511aa89832",
    measurementId: "G-0N82X46Z74"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exporta tanto la app como la base de datos si la usas
const db = getFirestore(app);

export { app, db };
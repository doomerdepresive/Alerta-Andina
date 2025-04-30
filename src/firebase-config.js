// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRdo_NLif7YG86RP27V281N5p3ZQrd2sU",
    authDomain: "alerta-andina-c3ebc.firebaseapp.com",
    projectId: "alerta-andina-c3ebc",
    storageBucket: "alerta-andina-c3ebc.firebasestorage.app",
    messagingSenderId: "627833860681",
    appId: "1:627833860681:web:a30312ea72961b81e90598",
    measurementId: "G-G3Z8J3JMGF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exporta tanto la app como la base de datos si la usas
const db = getFirestore(app);

export { app, db };
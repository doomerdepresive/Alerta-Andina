import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase-config";

export default function ProtectedRoute({ children }) {
    const [rol, setRol] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        const db = getFirestore(app);

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const snap = await getDoc(docRef);
                    if (snap.exists()) {
                        const data = snap.data();
                        setRol(data?.role?.toLowerCase()); // 🔑 usar "role"
                    } else {
                        setRol("sin_rol");
                    }
                } catch (error) {
                    console.error("Error cargando el rol:", error);
                }
            } else {
                setRol("no_auth");
            }
            setCargando(false);
        });

        return () => unsubscribe();
    }, []);

    if (cargando) {
        return <p style={{ padding: 30 }}>Verificando acceso...</p>;
    }

    if (rol !== "administrador") {
        return <Navigate to="/" replace />;
    }

    return children;
}

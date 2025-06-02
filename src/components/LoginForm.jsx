import React, { useState, useEffect } from "react";
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import "./LoginForm.css";
import { app } from "../firebase-config";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Autocompleta último email usado
    useEffect(() => {
        const last = localStorage.getItem("lastLogin");
        if (last) setEmail(last);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const auth = getAuth(app);
        const db = getFirestore(app);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                setError("No tienes un perfil válido en la base de datos.");
                return;
            }

            const userData = userDocSnap.data();
            const rol = userData?.role?.toLowerCase();

            // Depuración
            console.log("Datos del usuario Firestore:", userData);
            console.log("Rol detectado:", rol);

            localStorage.setItem("lastLogin", email);

            if (rol === "administrador") {
                setTimeout(() => navigate("/admin"), 100); // pequeña pausa para sincronización
            } else {
                setError("Este acceso es exclusivo para administradores.");
            }

        } catch (err) {
            console.error("Error de autenticación:", err.code, err.message);
            setError("Credenciales inválidas o error de conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="split-container">
            <div className="login-section">
                <div className="login-content">
                    <div className="login-header">
                        <h2>Iniciar Sesión</h2>
                        <p className="login-subtitle">Panel de Administración</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form" aria-label="Formulario de acceso">
                        {error && (
                            <div className="error-message" role="alert">
                                <FaSignInAlt className="error-icon" />
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">
                                <FaEnvelope className="input-icon" />
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Ingrese su correo"
                                className="input-with-icon"
                                aria-label="Correo electrónico"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <FaLock className="input-icon" />
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Ingrese su contraseña"
                                className="input-with-icon"
                                aria-label="Contraseña"
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                            aria-label="Ingresar al sistema"
                        >
                            <FaSignInAlt className="button-icon" />
                            {loading ? "Ingresando..." : "Ingresar al Sistema"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="welcome-section">
                <div className="welcome-content">
                    <div className="logo-container">
                        <img
                            src="/src/assets/Logo_Clima-remove.png"
                            alt="Logo Alerta Andina"
                            className="main-logo"
                        />
                    </div>
                    <h1>Alerta Andina</h1>
                    <p className="welcome-message">
                        Bienvenido al Sistema de Administración de Alerta Andina.
                        Aquí podrás gestionar toda la información meteorológica
                        e hidrológica para mantener informada a nuestra comunidad.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

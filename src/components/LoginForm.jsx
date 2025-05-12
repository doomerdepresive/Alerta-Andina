import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import "./LoginForm.css";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.email === "admin@gmail.com") {
                navigate("/admin");
            } else {
                setError("Este acceso es solo para el administrador");
            }
        } catch (error) {
            setError("Credenciales inválidas. Inténtalo de nuevo.");
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

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="error-message">
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
                            />
                        </div>

                        <button type="submit" className="login-button">
                            <FaSignInAlt className="button-icon" />
                            Ingresar al Sistema
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
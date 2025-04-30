// src/components/LoginForm.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
        <div className="login-background">
            <div className="login-container">
                <h1>🔒 Panel de Administrador</h1>
                <p>Acceso exclusivo para el administrador</p>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}

                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;

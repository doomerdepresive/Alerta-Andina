import React, { useEffect, useState } from "react";
import {
    getAuth,
    signOut,
    updateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./Perfil.css";

function Perfil() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [perfil, setPerfil] = useState(null);
    const [editando, setEditando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false);
    const [passData, setPassData] = useState({
        actual: "",
        nueva: "",
        confirmar: "",
    });

    useEffect(() => {
        const cargarDatos = async () => {
            if (!user) return;
            const ref = doc(db, "users", user.uid);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                setPerfil({ id: user.uid, ...docSnap.data() });
            }
        };
        cargarDatos();
    }, [user]);

    const guardarCambios = async () => {
        if (!perfil) return;
        try {
            await updateDoc(doc(db, "users", perfil.id), {
                displayName: perfil.displayName,
                phone: perfil.phone,
                fotoURL: perfil.fotoURL || null,
                updatedAt: new Date(),
            });

            await updateProfile(user, {
                displayName: perfil.displayName,
            });

            setEditando(false);
            setMensaje("✅ Cambios guardados");
            setTimeout(() => setMensaje(""), 3000);
        } catch (err) {
            console.error("Error al guardar perfil:", err);
            setMensaje("❌ Error al guardar cambios");
        }
    };

    const cerrarSesion = async () => {
        await signOut(auth);
        window.location.href = "/login";
    };

    const manejarImagen = async (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        try {
            const opciones = {
                maxSizeMB: 0.2, // máximo 200KB
                maxWidthOrHeight: 300,
                useWebWorker: true,
            };

            const imagenComprimida = await imageCompression(archivo, opciones);
            const base64 = await imageCompression.getDataUrlFromFile(imagenComprimida);
            setPerfil({ ...perfil, fotoURL: base64 });
        } catch (err) {
            console.error("Error al comprimir imagen:", err);
        }
    };

    const cambiarPassword = async () => {
        const { actual, nueva, confirmar } = passData;
        if (!actual || !nueva || !confirmar) {
            setMensaje("❗ Debes completar todos los campos de contraseña");
            return;
        }
        if (nueva !== confirmar) {
            setMensaje("❗ Las nuevas contraseñas no coinciden");
            return;
        }
        if (nueva.length < 6) {
            setMensaje("❗ La nueva contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            const cred = EmailAuthProvider.credential(user.email, actual);
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, nueva);
            setPassData({ actual: "", nueva: "", confirmar: "" });
            setMostrarCambioPassword(false);
            setMensaje("🔐 Contraseña actualizada correctamente");
            setTimeout(() => setMensaje(""), 4000);
        } catch (err) {
            console.error("Error al cambiar contraseña:", err);
            setMensaje("❌ Error: " + err.message);
        }
    };

    if (!perfil) return <p>Cargando perfil...</p>;

    return (
        <div className="perfil-admin">
            <h2>👤 Mi Perfil</h2>

            {mensaje && <div className="mensaje-perfil">{mensaje}</div>}

            <div className="perfil-contenido">
                <div className="perfil-foto-container">
                    {perfil.fotoURL ? (
                        <img src={perfil.fotoURL} alt="Foto perfil" className="perfil-foto" />
                    ) : (
                        <div className="perfil-placeholder">Sin foto</div>
                    )}
                    {editando && (
                        <input type="file" accept="image/*" onChange={manejarImagen} />
                    )}
                </div>

                <div className="perfil-datos">
                    <label>Nombre:</label>
                    {editando ? (
                        <input
                            value={perfil.displayName}
                            onChange={(e) => setPerfil({ ...perfil, displayName: e.target.value })}
                        />
                    ) : (
                        <p>{perfil.displayName}</p>
                    )}

                    <label>Correo:</label>
                    <p>{perfil.email}</p>

                    <label>Teléfono:</label>
                    {editando ? (
                        <input
                            value={perfil.phone || ""}
                            onChange={(e) => setPerfil({ ...perfil, phone: e.target.value })}
                        />
                    ) : (
                        <p>{perfil.phone || "—"}</p>
                    )}

                    <label>Rol:</label>
                    <p>{perfil.rol}</p>
                </div>
            </div>

            <div className="perfil-controles">
                {editando ? (
                    <>
                        <button onClick={guardarCambios}>💾 Guardar</button>
                        <button onClick={() => setEditando(false)}>❌ Cancelar</button>
                    </>
                ) : (
                    <button onClick={() => setEditando(true)}>✏️ Editar</button>
                )}
                <button onClick={cerrarSesion}>🔓 Cerrar sesión</button>
                <button onClick={() => setMostrarCambioPassword(!mostrarCambioPassword)}>
                    🔑 Cambiar contraseña
                </button>
            </div>

            {mostrarCambioPassword && (
                <div className="cambio-password">
                    <h4>🔐 Cambiar contraseña</h4>
                    <input
                        type="password"
                        placeholder="Contraseña actual"
                        value={passData.actual}
                        onChange={(e) => setPassData({ ...passData, actual: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={passData.nueva}
                        onChange={(e) => setPassData({ ...passData, nueva: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        value={passData.confirmar}
                        onChange={(e) => setPassData({ ...passData, confirmar: e.target.value })}
                    />
                    <button onClick={cambiarPassword}>✅ Confirmar cambio</button>
                </div>
            )}
        </div>
    );
}

export default Perfil;

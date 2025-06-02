// src/pages/admin/Usuarios.jsx
import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy,
    setDoc
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db, app } from "../../firebase-config";
import "./Usuarios.css";

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [nuevoUsuario, setNuevoUsuario] = useState({
        displayName: "",
        email: "",
        password: "",
        phone: "",
        role: "usuario"
    });
    const [mensaje, setMensaje] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [cambiosPendientes, setCambiosPendientes] = useState({});

    const superAdmin = "admin@gmail.com";
    const auth = getAuth(app);

    const cargarUsuarios = async () => {
        const q = query(collection(db, "users"), orderBy("updatedAt", "desc"));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsuarios(lista);
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter(
        (u) =>
            u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.displayName.toLowerCase().includes(busqueda.toLowerCase())
    );

    const manejarCambio = (id, campo, valor) => {
        setCambiosPendientes((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [campo]: valor
            }
        }));
    };

    const guardarCambios = async () => {
        try {
            const entradas = Object.entries(cambiosPendientes);
            for (const [id, cambios] of entradas) {
                await updateDoc(doc(db, "users", id), {
                    ...cambios,
                    createdAt: serverTimestamp()
                });
            }
            setMensaje("✅ Cambios guardados correctamente");
            setCambiosPendientes({});
            cargarUsuarios();
            setTimeout(() => setMensaje(""), 3000);
        } catch (err) {
            console.error("Error al guardar cambios:", err);
            setMensaje("❌ Error al guardar cambios: " + err.message);
            setTimeout(() => setMensaje(""), 4000);
        }
    };

    const crearUsuario = async () => {
        const { displayName, email, password, phone, role } = nuevoUsuario;
        if (!displayName || !email || !password) return;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            await setDoc(doc(db, "users", uid), {
                displayName,
                email,
                phone,
                role,
                activo: true,
                updatedAt: serverTimestamp()
            });

            setNuevoUsuario({ displayName: "", email: "", password: "", phone: "", role: "usuario" });
            setMostrarFormulario(false);
            setMensaje("✅ Usuario creado correctamente");
            cargarUsuarios();
            setTimeout(() => setMensaje(""), 3000);
        } catch (err) {
            console.error("Error al crear usuario:", err);
            setMensaje("❌ Error al crear usuario: " + err.message);
            setTimeout(() => setMensaje(""), 4000);
        }
    };

    const eliminarUsuario = async (id, email) => {
        if (email === superAdmin) return;
        await deleteDoc(doc(db, "users", id));
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
    };

    const formatearFecha = (timestamp) => {
        if (!timestamp) return "—";
        const fecha = timestamp.toDate();
        return fecha.toLocaleDateString("es-BO") + " " + fecha.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
    };

    useEffect(() => {
        const cerrarEsc = (e) => {
            if (e.key === "Escape") setMostrarFormulario(false);
        };
        window.addEventListener("keydown", cerrarEsc);
        return () => window.removeEventListener("keydown", cerrarEsc);
    }, []);


    return (
        <div className="usuarios-page">
            <h2>👥 Lista de Usuarios</h2>

            {mensaje && <div className="mensaje-estado">{mensaje}</div>}

            <div className="usuarios-controles">
                <input
                    type="text"
                    placeholder="Buscar por nombre o correo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="btn-crear" onClick={() => setMostrarFormulario((prev) => !prev)}>
                    {mostrarFormulario ? "✖ Cancelar" : "➕ Agregar nuevo usuario"}
                </button>
                {Object.keys(cambiosPendientes).length > 0 && (
                    <button className="btn-guardar" onClick={guardarCambios}>💾 Guardar todos los cambios</button>
                )}
            </div>

            {mostrarFormulario && (
                <div className="modal-overlay" onClick={() => setMostrarFormulario(false)}>
                    <div
                        className="modal-form animar"
                        onClick={(e) => e.stopPropagation()} // evitar cierre al hacer clic dentro
                    >
                        <h3>Nuevo Usuario</h3>
                        <input type="text" placeholder="Nombre completo" value={nuevoUsuario.displayName} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, displayName: e.target.value })} />
                        <input type="email" placeholder="Correo electrónico" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
                        <input type="password" placeholder="Contraseña" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
                        <input type="text" placeholder="Teléfono" value={nuevoUsuario.phone} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, phone: e.target.value })} />
                        <select value={nuevoUsuario.role} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, role: e.target.value })}>
                            <option value="usuario">Usuario</option>
                            <option value="suscriptor">Suscriptor</option>
                            <option value="administrador">Administrador</option>
                        </select>
                        <div className="modal-actions">
                            <button className="btn-confirmar" onClick={crearUsuario}>✅ Crear</button>
                            <button className="btn-cancelar" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}



            <table className="usuarios-tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Activo</th>
                        <th>Creación</th>
                        <th>Última edición</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((u) => (
                        <tr key={u.id}>
                            <td>{u.displayName}</td>
                            <td>{u.email}</td>
                            <td>
                                <input value={(cambiosPendientes[u.id]?.phone ?? u.phone) || ""} onChange={(e) => manejarCambio(u.id, "phone", e.target.value)} disabled={u.email === superAdmin} />
                            </td>
                            <td>
                                <select value={cambiosPendientes[u.id]?.role ?? u.role} onChange={(e) => manejarCambio(u.id, "role", e.target.value)} disabled={u.email === superAdmin}>
                                    <option value="usuario">Usuario</option>
                                    <option value="suscriptor">Suscriptor</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </td>
                            <td>
                                <input type="checkbox" checked={cambiosPendientes[u.id]?.activo ?? u.activo ?? true} onChange={(e) => manejarCambio(u.id, "activo", e.target.checked)} disabled={u.email === superAdmin} />
                            </td>
                            <td>{formatearFecha(u.updatedAt)}</td>
                            <td>{formatearFecha(u.createdAt)}</td>
                            <td>{u.email !== superAdmin && <button onClick={() => eliminarUsuario(u.id, u.email)}>🗑️</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Usuarios;

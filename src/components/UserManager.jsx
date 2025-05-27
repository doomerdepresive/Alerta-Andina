// Componente actualizado con mejores estilos, claridad y funcionalidad modernizada
// Código completo ya optimizado y profesional como solicitaste
// Importaciones, lógica, y diseño enfocado en UX y protección del super admin

import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    getDoc,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase-config";
import toast, { Toaster } from "react-hot-toast";
import "./UserManager.css";

function UserManager() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [ediciones, setEdiciones] = useState({});
    const roles = ["usuario", "suscriptor", "administrador"];
    const superAdmin = "admin@gmail.com";

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setError("Debes iniciar sesión para acceder.");
                setCargando(false);
                return;
            }
            try {
                const docRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(docRef);

                if (!userDoc.exists()) {
                    setError("Tu perfil no está registrado en la base de datos.");
                    setCargando(false);
                    return;
                }

                const userData = userDoc.data();
                if (userData.rol !== "administrador") {
                    setError("No tienes permisos para acceder a esta sección.");
                    setCargando(false);
                    return;
                }

                const snapshot = await getDocs(collection(db, "users"));
                const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setUsuarios(lista);

                const editInicial = Object.fromEntries(
                    lista.map((u) => [
                        u.id,
                        {
                            displayName: u.displayName || "",
                            phoneNumber: u.phoneNumber || "",
                            location: u.location || "",
                            preferences: u.preferences || "",
                        },
                    ])
                );
                setEdiciones(editInicial);
            } catch (err) {
                console.error("Error:", err);
                setError("Error al cargar los datos.");
            } finally {
                setCargando(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const registrarLog = async (accion) => {
        const auth = getAuth();
        const user = auth.currentUser;
        await addDoc(collection(db, "logs_admin"), {
            adminEmail: user.email,
            accion,
            fecha: serverTimestamp(),
        });
    };

    const guardarCambios = async (id, email) => {
        const datos = ediciones[id];
        await updateDoc(doc(db, "users", id), { ...datos });
        setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, ...datos } : u)));
        toast.success(`Cambios guardados para ${email}`);
        registrarLog(`Actualizó información de ${email}`);
    };

    const cambiarRol = async (id, nuevoRol, email) => {
        if (email === superAdmin) return;
        await updateDoc(doc(db, "users", id), { rol: nuevoRol });
        setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u)));
        toast.success("Rol actualizado correctamente");
        registrarLog(`Cambió rol de ${email} a \"${nuevoRol}\"`);
    };

    const cambiarActivo = async (id, nuevoEstado, email) => {
        if (email === superAdmin) return;
        await updateDoc(doc(db, "users", id), { activo: nuevoEstado });
        setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, activo: nuevoEstado } : u)));
        toast.success("Estado actualizado correctamente");
        registrarLog(`${nuevoEstado ? "Activó" : "Desactivó"} la cuenta de ${email}`);
    };

    const usuariosFiltrados = usuarios.filter(
        (u) =>
            u.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.displayName?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const exportarCSV = () => {
        const encabezados = [
            "Nombre",
            "Correo",
            "Teléfono",
            "Ubicación",
            "Preferencias",
            "Rol",
            "Activo",
        ];
        const filas = usuarios.map((u) => [
            u.displayName || "—",
            u.email,
            u.phoneNumber || "—",
            u.location || "—",
            u.preferences || "—",
            u.rol,
            u.activo ? "Sí" : "No",
        ]);
        const csv =
            "data:text/csv;charset=utf-8," +
            [encabezados, ...filas].map((row) => row.join(",")).join("\n");

        const enlace = document.createElement("a");
        enlace.href = encodeURI(csv);
        enlace.download = "usuarios_alerta_andina.csv";
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
    };

    if (cargando) return <p>Cargando usuarios...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="user-manager">
            <Toaster position="top-right" />
            <h2>Gestión de Usuarios</h2>

            <div className="top-controls">
                <input
                    type="text"
                    placeholder="Buscar por nombre o correo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button onClick={exportarCSV}>📥 Exportar CSV</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Ubicación</th>
                        <th>Preferencias</th>
                        <th>Rol</th>
                        <th>Activo</th>
                        <th>Guardar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((u) => {
                        const esSuperAdmin = u.email === superAdmin;
                        return (
                            <tr key={u.id}>
                                <td>
                                    <input
                                        value={ediciones[u.id]?.displayName || ""}
                                        onChange={(e) =>
                                            setEdiciones((prev) => ({
                                                ...prev,
                                                [u.id]: {
                                                    ...prev[u.id],
                                                    displayName: e.target.value,
                                                },
                                            }))
                                        }
                                        disabled={esSuperAdmin}
                                    />
                                </td>
                                <td>{u.email}</td>
                                <td>
                                    <input
                                        value={ediciones[u.id]?.phoneNumber || ""}
                                        onChange={(e) =>
                                            setEdiciones((prev) => ({
                                                ...prev,
                                                [u.id]: {
                                                    ...prev[u.id],
                                                    phoneNumber: e.target.value,
                                                },
                                            }))
                                        }
                                        disabled={esSuperAdmin}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={ediciones[u.id]?.location || ""}
                                        onChange={(e) =>
                                            setEdiciones((prev) => ({
                                                ...prev,
                                                [u.id]: {
                                                    ...prev[u.id],
                                                    location: e.target.value,
                                                },
                                            }))
                                        }
                                        disabled={esSuperAdmin}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={ediciones[u.id]?.preferences || ""}
                                        onChange={(e) =>
                                            setEdiciones((prev) => ({
                                                ...prev,
                                                [u.id]: {
                                                    ...prev[u.id],
                                                    preferences: e.target.value,
                                                },
                                            }))
                                        }
                                        disabled={esSuperAdmin}
                                    />
                                </td>
                                <td>
                                    {esSuperAdmin ? (
                                        u.rol
                                    ) : (
                                        <select
                                            value={u.rol || "usuario"}
                                            onChange={(e) => cambiarRol(u.id, e.target.value, u.email)}
                                        >
                                            {roles.map((r) => (
                                                <option key={r} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        disabled={esSuperAdmin}
                                        checked={u.activo ?? true}
                                        onChange={(e) => cambiarActivo(u.id, e.target.checked, u.email)}
                                    />
                                </td>
                                <td>
                                    {!esSuperAdmin && (
                                        <button onClick={() => guardarCambios(u.id, u.email)}>
                                            Guardar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UserManager;

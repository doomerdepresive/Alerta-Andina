// src/pages/MeteorologiaPage.jsx - PARTE 1
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  doc,
  getDoc 
} from "firebase/firestore";
import { db } from "../firebase-config";
import styles from "./MeteorologiaPage.module.css";
import MeteoCards from "../components/MeteoCards";

// Constantes para niveles de alerta
const NIVELES_ALERTA = {
  VERDE: { color: '#4CAF50', nivel: 'Verde', descripcion: 'Sin riesgo' },
  AMARILLO: { color: '#FFC107', nivel: 'Amarillo', descripcion: 'Precaución' },
  NARANJA: { color: '#FF9800', nivel: 'Naranja', descripcion: 'Riesgo moderado' },
  ROJO: { color: '#F44336', nivel: 'Rojo', descripcion: 'Alto riesgo' }
};

// Configuración de umbrales para alertas
const UMBRALES_ALERTA = {
  precipitacion: { amarillo: 10, naranja: 25, rojo: 50 }, // mm
  viento: { amarillo: 40, naranja: 60, rojo: 80 }, // km/h
  temperatura: { frio: { amarillo: -5, naranja: -10, rojo: -15 }, calor: { amarillo: 35, naranja: 40, rojo: 45 } },
  humedad: { amarillo: 85, naranja: 90, rojo: 95 } // %
};

// Datos de respaldo mejorados con más información
const datosRespaldo = [
  {
    id: "la-paz",
    region: "La Paz",
    temperatura: 10,
    humedad: 65,
    viento: 26,
    direccionViento: "Suroeste",
    precipitaciones: 5,
    pronostico: "Parcialmente nuboso",
    sensacionTermica: 8,
    presion: 1015,
    uv: 3,
    visibilidad: 10,
    puntoRocio: 4,
    coordenadas: { lat: -16.5000, lng: -68.1193 },
    timestamp: new Date(),
    alertas: []
  },
  {
    id: "cochabamba",
    region: "Cochabamba",
    temperatura: 22,
    humedad: 45,
    viento: 8,
    direccionViento: "Norte",
    precipitaciones: 1,
    pronostico: "Soleado",
    sensacionTermica: 23,
    presion: 1013,
    uv: 7,
    visibilidad: 15,
    puntoRocio: 9,
    coordenadas: { lat: -17.3895, lng: -66.1568 },
    timestamp: new Date(),
    alertas: []
  },
  {
    id: "santa-cruz",
    region: "Santa Cruz",
    temperatura: 28,
    humedad: 60,
    viento: 12,
    direccionViento: "Este",
    precipitaciones: 0,
    pronostico: "Despejado",
    sensacionTermica: 30,
    presion: 1010,
    uv: 9,
    visibilidad: 20,
    puntoRocio: 19,
    coordenadas: { lat: -17.8146, lng: -63.1561 },
    timestamp: new Date(),
    alertas: []
  }
];

// Pronóstico extendido con más detalles
const pronosticoExtendido = [
  {
    dia: "Hoy",
    fecha: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    icono: "🌩️",
    probabilidadLluvia: 80,
    precipitacion: 3.9,
    tempMax: 14,
    tempMin: 2,
    vientoVelocidad: [7, 27],
    vientoDireccion: "sur",
    descripcion: "Tormentas ocasionales",
    alertas: ['precipitacion']
  },
  {
    dia: "Mañana",
    fecha: new Date(Date.now() + 86400000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    icono: "🌩️",
    probabilidadLluvia: 80,
    precipitacion: 2.3,
    tempMax: 15,
    tempMin: 3,
    vientoVelocidad: [7, 29],
    vientoDireccion: "sur",
    descripcion: "Lluvias intermitentes",
    alertas: []
  },
  {
    dia: "Jueves",
    fecha: new Date(Date.now() + 172800000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    icono: "🌩️",
    probabilidadLluvia: 80,
    precipitacion: 1.9,
    tempMax: 15,
    tempMin: 3,
    vientoVelocidad: [10, 34],
    vientoDireccion: "sureste",
    descripcion: "Nublado con chubascos",
    alertas: []
  },
  {
    dia: "Viernes",
    fecha: new Date(Date.now() + 259200000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    icono: "🌤️",
    probabilidadLluvia: 20,
    precipitacion: 0,
    tempMax: 16,
    tempMin: 3,
    vientoVelocidad: [7, 26],
    vientoDireccion: "noreste",
    descripcion: "Parcialmente nublado",
    alertas: []
  },
  {
    dia: "Sábado",
    fecha: new Date(Date.now() + 345600000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    icono: "🌧️",
    probabilidadLluvia: 90,
    precipitacion: 1.5,
    tempMax: 13,
    tempMin: 0,
    vientoVelocidad: [8, 28],
    vientoDireccion: "noreste",
    descripcion: "Lluvias frecuentes",
    alertas: ['temperatura']
  },
  {
    dia: "Domingo",
    fecha: new Date(Date.now() + 432000000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    icono: "🌧️",
    probabilidadLluvia: 60,
    precipitacion: 0.2,
    tempMax: 14,
    tempMin: 2,
    vientoVelocidad: [8, 27],
    vientoDireccion: "sureste",
    descripcion: "Chubascos aislados",
    alertas: []
  },
  {
    dia: "Lunes",
    fecha: new Date(Date.now() + 518400000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    icono: "🌤️",
    probabilidadLluvia: 10,
    precipitacion: 0,
    tempMax: 14,
    tempMin: 0,
    vientoVelocidad: [8, 31],
    vientoDireccion: "sureste",
    descripcion: "Mayormente despejado",
    alertas: ['temperatura']
  }
];

// Función para transformar datos de Firestore al formato esperado
const transformarDatosFirestore = (doc) => {
  const data = doc.data();
  console.log("Datos originales de Firestore:", data);
  
  // Mapear los campos de tu base de datos al formato esperado
  return {
    id: doc.id,
    region: data.region || data.ubicacion || data.estacion || "Desconocido",
    temperatura: data.temperatura || data.temp || 0,
    humedad: data.humedad || data.humidity || 0,
    viento: data.viento || data.velocidad_viento || data.wind_speed || 0,
    direccionViento: data.direccion_viento || data.wind_direction || "Norte",
    precipitaciones: data.precipitaciones || data.lluvia || data.rain || 0,
    pronostico: data.pronostico || data.condiciones || data.descripcion || "Despejado",
    sensacionTermica: data.sensacion_termica || data.feels_like || data.temperatura || 0,
    presion: data.presion || data.pressure || 1013,
    uv: data.uv || data.indice_uv || 0,
    visibilidad: data.visibilidad || data.visibility || 10,
    puntoRocio: data.punto_rocio || data.dew_point || 0,
    coordenadas: data.coordenadas || { lat: 0, lng: 0 },
    timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
    alertas: []
  };
};

function MeteorologiaPage() {
  const [datosClima, setDatosClima] = useState([]);
  const [alertasActivas, setAlertasActivas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("La Paz");
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [modoTiempoReal, setModoTiempoReal] = useState(false);

  // Función para evaluar alertas meteorológicas
  const evaluarAlertas = useCallback((datos) => {
    const alertas = [];
    
    // Alerta por precipitación
    if (datos.precipitaciones >= UMBRALES_ALERTA.precipitacion.rojo) {
      alertas.push({
        tipo: 'precipitacion',
        nivel: NIVELES_ALERTA.ROJO,
        mensaje: `Precipitación extrema: ${datos.precipitaciones}mm. Riesgo de inundaciones.`,
        icono: '🚨'
      });
    } else if (datos.precipitaciones >= UMBRALES_ALERTA.precipitacion.naranja) {
      alertas.push({
        tipo: 'precipitacion',
        nivel: NIVELES_ALERTA.NARANJA,
        mensaje: `Precipitación alta: ${datos.precipitaciones}mm. Precaución en vías.`,
        icono: '⚠️'
      });
    } else if (datos.precipitaciones >= UMBRALES_ALERTA.precipitacion.amarillo) {
      alertas.push({
        tipo: 'precipitacion',
        nivel: NIVELES_ALERTA.AMARILLO,
        mensaje: `Precipitación moderada: ${datos.precipitaciones}mm.`,
        icono: '⚡'
      });
    }

    // Alerta por viento
    const vientoMax = typeof datos.viento === 'string' ? 
      parseInt(datos.viento.match(/\d+/g)?.pop() || '0') : datos.viento;
    
    if (vientoMax >= UMBRALES_ALERTA.viento.rojo) {
      alertas.push({
        tipo: 'viento',
        nivel: NIVELES_ALERTA.ROJO,
        mensaje: `Vientos extremos: ${vientoMax} km/h. Evite actividades al aire libre.`,
        icono: '💨'
      });
    } else if (vientoMax >= UMBRALES_ALERTA.viento.naranja) {
      alertas.push({
        tipo: 'viento',
        nivel: NIVELES_ALERTA.NARANJA,
        mensaje: `Vientos fuertes: ${vientoMax} km/h. Precaución.`,
        icono: '🌬️'
      });
    }

    // Alerta por temperatura
    const temp = typeof datos.temperatura === 'string' ? 
      parseInt(datos.temperatura.replace('°', '')) : datos.temperatura;
    
    if (temp <= UMBRALES_ALERTA.temperatura.frio.rojo) {
      alertas.push({
        tipo: 'temperatura',
        nivel: NIVELES_ALERTA.ROJO,
        mensaje: `Temperatura extremadamente baja: ${temp}°C. Riesgo de congelamiento.`,
        icono: '🥶'
      });
    } else if (temp >= UMBRALES_ALERTA.temperatura.calor.rojo) {
      alertas.push({
        tipo: 'temperatura',
        nivel: NIVELES_ALERTA.ROJO,
        mensaje: `Temperatura extremadamente alta: ${temp}°C. Riesgo de insolación.`,
        icono: '🔥'
      });
    }

    // Alerta por humedad
    const humedad = typeof datos.humedad === 'string' ? 
      parseInt(datos.humedad.replace('%', '')) : datos.humedad;
    
    if (humedad >= UMBRALES_ALERTA.humedad.naranja) {
      alertas.push({
        tipo: 'humedad',
        nivel: NIVELES_ALERTA.NARANJA,
        mensaje: `Humedad muy alta: ${humedad}%. Sensación de bochorno.`,
        icono: '💧'
      });
    }

    return alertas;
  }, []);

  // Función CORREGIDA para obtener datos de Firebase
  const obtenerDatosClima = useCallback(async (tiempoReal = false) => {
    try {
      setError(null);
      console.log("Intentando conectar con Firestore...");
      
      if (tiempoReal) {
        // Configurar listener en tiempo real - USANDO TU COLECCIÓN REAL
        const unsubscribe = onSnapshot(
          query(collection(db, "Hidrologia_Historico"), orderBy("timestamp", "desc"), limit(10)),
          (snapshot) => {
            console.log("Snapshot recibido:", snapshot.size, "documentos");
            
            const datos = snapshot.docs.map(doc => {
              console.log("Documento encontrado:", doc.id, doc.data());
              return transformarDatosFirestore(doc);
            });
            
            if (datos.length > 0) {
              const datosConAlertas = datos.map(dato => ({
                ...dato,
                alertas: evaluarAlertas(dato)
              }));
              
              setDatosClima(datosConAlertas);
              setAlertasActivas(datosConAlertas.flatMap(d => d.alertas));
              setUltimaActualizacion(new Date());
              console.log("Datos procesados correctamente:", datosConAlertas);
            } else {
              console.log("No hay datos en Firestore, usando datos de respaldo");
              const datosRespaldoConAlertas = datosRespaldo.map(dato => ({
                ...dato,
                alertas: evaluarAlertas(dato)
              }));
              setDatosClima(datosRespaldoConAlertas);
              setAlertasActivas(datosRespaldoConAlertas.flatMap(d => d.alertas));
            }
            setCargando(false);
          },
          (error) => {
            console.error("Error en tiempo real:", error);
            setError(`Error de conexión: ${error.message}`);
            // Usar datos de respaldo
            const datosRespaldoConAlertas = datosRespaldo.map(dato => ({
              ...dato,
              alertas: evaluarAlertas(dato)
            }));
            setDatosClima(datosRespaldoConAlertas);
            setAlertasActivas(datosRespaldoConAlertas.flatMap(d => d.alertas));
            setCargando(false);
          }
        );
        
        return unsubscribe;
      } else {
        // Obtención única de datos - USANDO TU COLECCIÓN REAL
        console.log("Haciendo query a Hidrologia_Historico...");
        const querySnapshot = await getDocs(
          query(collection(db, "Hidrologia_Historico"), orderBy("timestamp", "desc"), limit(10))
        );
        
        console.log("Query completada, documentos encontrados:", querySnapshot.size);
        
        const datos = querySnapshot.docs.map(doc => {
          console.log("Procesando documento:", doc.id);
          return transformarDatosFirestore(doc);
        });

        if (datos.length > 0) {
          const datosConAlertas = datos.map(dato => ({
            ...dato,
            alertas: evaluarAlertas(dato)
          }));
          
          setDatosClima(datosConAlertas);
          setAlertasActivas(datosConAlertas.flatMap(d => d.alertas));
          setUltimaActualizacion(new Date());
          console.log("Datos de Firebase cargados correctamente:", datosConAlertas);
        } else {
          console.log("No hay datos en Firebase, usando datos de respaldo");
          const datosRespaldoConAlertas = datosRespaldo.map(dato => ({
            ...dato,
            alertas: evaluarAlertas(dato)
          }));
          setDatosClima(datosRespaldoConAlertas);
          setAlertasActivas(datosRespaldoConAlertas.flatMap(d => d.alertas));
        }
      }
    } catch (error) {
      console.error("Error detallado al obtener datos:", error);
      setError(`Error de conexión: ${error.message}. Usando datos de respaldo.`);
      
      // Usar datos de respaldo en caso de error
      const datosRespaldoConAlertas = datosRespaldo.map(dato => ({
        ...dato,
        alertas: evaluarAlertas(dato)
      }));
      setDatosClima(datosRespaldoConAlertas);
      setAlertasActivas(datosRespaldoConAlertas.flatMap(d => d.alertas));
    } finally {
      setCargando(false);
    }
  }, [evaluarAlertas]);
  // Efecto principal para cargar datos
  useEffect(() => {
    let unsubscribe;
    
    const cargarDatos = async () => {
      console.log("Iniciando carga de datos...");
      if (modoTiempoReal) {
        unsubscribe = await obtenerDatosClima(true);
      } else {
        await obtenerDatosClima(false);
      }
    };

    cargarDatos();

    // Cleanup function
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        console.log("Limpiando listener de tiempo real");
        unsubscribe();
      }
    };
  }, [modoTiempoReal, obtenerDatosClima]);

  // Datos de la ciudad seleccionada con memoización
  const climaCiudadSeleccionada = useMemo(() => {
    return datosClima.find(
      item => item.region.toLowerCase() === ciudadSeleccionada.toLowerCase()
    ) || datosRespaldo[0];
  }, [datosClima, ciudadSeleccionada]);

  // Alertas para la ciudad seleccionada
  const alertasCiudadSeleccionada = useMemo(() => {
    return alertasActivas.filter(alerta => 
      climaCiudadSeleccionada.alertas?.some(a => a.tipo === alerta.tipo)
    );
  }, [alertasActivas, climaCiudadSeleccionada]);

  // Manejadores de eventos
  const cambiarCiudad = useCallback((ciudad) => {
    setCiudadSeleccionada(ciudad);
  }, []);

  const toggleTiempoReal = useCallback(() => {
    setModoTiempoReal(prev => !prev);
  }, []);

  const actualizarDatos = useCallback(() => {
    setCargando(true);
    obtenerDatosClima(false);
  }, [obtenerDatosClima]);

  // Función para obtener ícono según condición climática
  const obtenerIconoClima = useCallback((condicion) => {
    const condicionLower = condicion.toLowerCase();
    if (condicionLower.includes("nuboso") || condicionLower.includes("nublado")) return "☁️";
    if (condicionLower.includes("lluvia")) return "🌧️";
    if (condicionLower.includes("soleado")) return "☀️";
    if (condicionLower.includes("despejado")) return "🌤️";
    if (condicionLower.includes("tormenta")) return "⛈️";
    if (condicionLower.includes("nieve")) return "❄️";
    return "🌡️";
  }, []);

  // Función para obtener flecha de dirección del viento
  const obtenerFlechaViento = useCallback((direccion) => {
    const direccionLower = direccion.toLowerCase();
    const flechas = {
      'norte': '↑', 'sur': '↓', 'este': '→', 'oeste': '←',
      'noreste': '↗', 'noroeste': '↖', 'sureste': '↘', 'suroeste': '↙'
    };
    return flechas[direccionLower] || '↑';
  }, []);

  // Función para formatear la velocidad del viento
  const formatearViento = useCallback((viento) => {
    if (Array.isArray(viento)) {
      return `${viento[0]} - ${viento[1]} km/h`;
    }
    return typeof viento === 'string' ? viento : `${viento} km/h`;
  }, []);

  if (cargando) {
    return (
      <div className={`${styles.meteorologiaPage} ${styles.withNavbar}`}>
        <div className={styles.contenido}>
          <div className={styles.cargandoContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.cargando}>Conectando con Firestore...</p>
            <p className={styles.cargandoDetalle}>Cargando datos meteorológicos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.meteorologiaPage} ${styles.withNavbar}`}>
      <div className={styles.contenido}>
        {/* Header con controles */}
        <div className={styles.headerMeteorologia}>
          <div className={styles.tituloSection}>
            <h1 className={styles.titulo}>Tiempo en {ciudadSeleccionada}</h1>
            <p className={styles.subtitulo}>
              {new Date().toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })} | {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
          
          <div className={styles.controlesHeader}>
            <button 
              className={`${styles.botonTiempoReal} ${modoTiempoReal ? styles.activo : ''}`}
              onClick={toggleTiempoReal}
              title={modoTiempoReal ? "Desactivar tiempo real" : "Activar tiempo real"}
            >
              🔄 {modoTiempoReal ? 'Tiempo Real' : 'Manual'}
            </button>
            
            {!modoTiempoReal && (
              <button 
                className={styles.botonActualizar}
                onClick={actualizarDatos}
                title="Actualizar datos"
              >
                🔄 Actualizar
              </button>
            )}
          </div>
        </div>

        {/* Sistema de Alertas Tempranas */}
        {alertasCiudadSeleccionada.length > 0 && (
          <div className={styles.sistemaAlertas}>
            <h2 className={styles.tituloAlertas}>🚨 Sistema de Alertas Tempranas</h2>
            <div className={styles.alertasContainer}>
              {alertasCiudadSeleccionada.map((alerta, index) => (
                <div 
                  key={index}
                  className={`${styles.alertaCard} ${styles[`nivel${alerta.nivel.nivel}`]}`}
                  style={{ borderLeftColor: alerta.nivel.color }}
                >
                  <div className={styles.alertaHeader}>
                    <span className={styles.alertaIcono}>{alerta.icono}</span>
                    <span className={styles.alertaNivel}>{alerta.nivel.nivel}</span>
                    <span className={styles.alertaTipo}>{alerta.tipo.toUpperCase()}</span>
                  </div>
                  <p className={styles.alertaMensaje}>{alerta.mensaje}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Información de error */}
        {error && (
          <div className={styles.errorBanner}>
            <span className={styles.errorIcono}>⚠️</span>
            <span className={styles.errorMensaje}>{error}</span>
            <button className={styles.errorReintentar} onClick={actualizarDatos}>
              Reintentar
            </button>
          </div>
        )}

        {/* Debug Info - Para ver qué datos llegan de Firestore */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0', fontSize: '12px' }}>
            <strong>DEBUG INFO:</strong>
            <br />Datos encontrados: {datosClima.length}
            <br />Fuente: {datosClima.length > 0 ? 'Firestore' : 'Respaldo'}
            <br />Primera entrada: {JSON.stringify(datosClima[0] || {}, null, 2)}
          </div>
        )}

        {/* Selector de ciudades mejorado */}
        <div className={styles.selectorCiudades}>
          <h3 className={styles.selectorTitulo}>Seleccionar ubicación:</h3>
          <div className={styles.ciudadesGrid}>
            {datosClima.map(item => (
              <button 
                key={item.id}
                className={`${styles.botonCiudad} ${item.region === ciudadSeleccionada ? styles.seleccionada : ''}`}
                onClick={() => cambiarCiudad(item.region)}
              >
                <div className={styles.ciudadNombre}>{item.region}</div>
                <div className={styles.ciudadTemp}>
                  {typeof item.temperatura === 'string' ? item.temperatura : `${item.temperatura}°C`}
                </div>
                <div className={styles.ciudadCondicion}>
                  {obtenerIconoClima(item.pronostico)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tarjeta principal del clima actual mejorada */}
        <div className={styles.climaActualCard}>
          <div className={styles.climaPrincipal}>
            <div className={styles.climaTemperaturaSection}>
              <div className={styles.iconoClimaGrande}>
                {obtenerIconoClima(climaCiudadSeleccionada.pronostico)}
              </div>
              <div className={styles.temperaturaPrincipal}>
                <span className={styles.temperaturaActual}>
                  {typeof climaCiudadSeleccionada.temperatura === 'string' 
                    ? climaCiudadSeleccionada.temperatura 
                    : `${climaCiudadSeleccionada.temperatura}°C`}
                </span>
                <span className={styles.sensacionTermica}>
                  Sensación {typeof climaCiudadSeleccionada.sensacionTermica === 'string' 
                    ? climaCiudadSeleccionada.sensacionTermica 
                    : `${climaCiudadSeleccionada.sensacionTermica}°C`}
                </span>
              </div>
            </div>
            
            <div className={styles.climaDescripcion}>
              <h3 className={styles.condicionActual}>{climaCiudadSeleccionada.pronostico}</h3>
              <div className={styles.detallesPrincipales}>
                <div className={styles.detalleItem}>
                  <span className={styles.detalleIcono}>💧</span>
                  <span>Humedad: {typeof climaCiudadSeleccionada.humedad === 'string' 
                    ? climaCiudadSeleccionada.humedad 
                    : `${climaCiudadSeleccionada.humedad}%`}</span>
                </div>
                <div className={styles.detalleItem}>
                  <span className={styles.detalleIcono}>
                    {obtenerFlechaViento(climaCiudadSeleccionada.direccionViento)}
                  </span>
                  <span>Viento: {formatearViento(climaCiudadSeleccionada.viento)} {climaCiudadSeleccionada.direccionViento}</span>
                </div>
                <div className={styles.detalleItem}>
                  <span className={styles.detalleIcono}>🌧️</span>
                  <span>Precipitación: {climaCiudadSeleccionada.precipitaciones}mm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional detallada */}
          <div className={styles.climaDetallesExtendidos}>
            <div className={styles.detalleGrupo}>
              <div className={styles.detalleItemExt}>
                <span className={styles.detalleLabel}>Presión</span>
                <span className={styles.detalleValor}>
                  {typeof climaCiudadSeleccionada.presion === 'string' 
                    ? climaCiudadSeleccionada.presion 
                    : `${climaCiudadSeleccionada.presion} hPa`}
                </span>
              </div>
              <div className={styles.detalleItemExt}>
                <span className={styles.detalleLabel}>Índice UV</span>
                <span className={styles.detalleValor}>
                  {typeof climaCiudadSeleccionada.uv === 'string' 
                    ? climaCiudadSeleccionada.uv 
                    : climaCiudadSeleccionada.uv}
                </span>
              </div>
            </div>
            
            {climaCiudadSeleccionada.visibilidad && (
              <div className={styles.detalleGrupo}>
                <div className={styles.detalleItemExt}>
                  <span className={styles.detalleLabel}>Visibilidad</span>
                  <span className={styles.detalleValor}>{climaCiudadSeleccionada.visibilidad} km</span>
                </div>
                <div className={styles.detalleItemExt}>
                  <span className={styles.detalleLabel}>Punto de rocío</span>
                  <span className={styles.detalleValor}>{climaCiudadSeleccionada.puntoRocio}°C</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pronóstico semanal mejorado */}
        <div className={styles.pronosticoSection}>
          <h2 className={styles.tituloPronostico}>Pronóstico extendido - 7 días</h2>
          <div className={styles.pronosticoSemanal}>
            {pronosticoExtendido.map((dia, index) => (
              <div key={index} className={`${styles.diaPronostico} ${index === 0 ? styles.diaActual : ''}`}>
                <div className={styles.diaHeader}>
                  <div className={styles.diaNombre}>{dia.dia}</div>
                  <div className={styles.diaFecha}>{dia.fecha}</div>
                </div>
                
                <div className={styles.diaIconoSection}>
                  <div className={styles.diaIcono}>{dia.icono}</div>
                  {dia.alertas && dia.alertas.length > 0 && (
                    <div className={styles.diaAlertaIndicator}>⚠️</div>
                  )}
                </div>
                
                {dia.probabilidadLluvia > 0 && (
                  <div className={styles.diaLluvia}>
                    <span className={styles.probabilidad}>{dia.probabilidadLluvia}%</span>
                    <span className={styles.precipitacion}>{dia.precipitacion} mm</span>
                  </div>
                )}
                
                <div className={styles.diaTemperatura}>
                  <span className={styles.tempMax}>{dia.tempMax}°</span>
                  <span className={styles.separador}> / </span>
                  <span className={styles.tempMin}>{dia.tempMin}°</span>
                </div>
                
                <div className={styles.diaViento}>
                  <div className={styles.vientoDireccion}>
                    {obtenerFlechaViento(dia.vientoDireccion)}
                  </div>
                  <div className={styles.vientoVelocidad}>
                    {formatearViento(dia.vientoVelocidad)}
                  </div>
                </div>

                {dia.descripcion && (
                  <div className={styles.diaDescripcion}>{dia.descripcion}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Información de última actualización */}
        {ultimaActualizacion && (
          <div className={styles.infoActualizacion}>
            <div className={styles.actualizacionContenido}>
              <span className={styles.actualizacionIcono}>🔄</span>
              <span className={styles.actualizacionTexto}>
                Última actualización: {ultimaActualizacion.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
              {modoTiempoReal && (
                <span className={styles.tiempoRealIndicator}>
                  <span className={styles.pulseDot}></span>
                  Tiempo real activo
                </span>
              )}
            </div>
          </div>
        )}

        {/* Información adicional y estadísticas */}
        <div className={styles.estadisticasSection}>
          <h2 className={styles.tituloEstadisticas}>Información adicional</h2>
          <div className={styles.estadisticasGrid}>
            <div className={styles.estadisticaCard}>
              <div className={styles.estadisticaIcono}>📊</div>
              <div className={styles.estadisticaContenido}>
                <h3>Alertas activas</h3>
                <p className={styles.estadisticaValor}>{alertasActivas.length}</p>
                <p className={styles.estadisticaDescripcion}>
                  {alertasActivas.length === 0 ? 'Sin alertas' : 'Alertas meteorológicas'}
                </p>
              </div>
            </div>

            <div className={styles.estadisticaCard}>
              <div className={styles.estadisticaIcono}>🏙️</div>
              <div className={styles.estadisticaContenido}>
                <h3>Ciudades monitoreadas</h3>
                <p className={styles.estadisticaValor}>{datosClima.length}</p>
                <p className={styles.estadisticaDescripcion}>Estaciones meteorológicas</p>
              </div>
            </div>

            <div className={styles.estadisticaCard}>
              <div className={styles.estadisticaIcono}>⚡</div>
              <div className={styles.estadisticaContenido}>
                <h3>Estado del sistema</h3>
                <p className={styles.estadisticaValor}>
                  {error ? 'Error' : 'Operativo'}
                </p>
                <p className={styles.estadisticaDescripcion}>
                  {modoTiempoReal ? 'Tiempo real' : 'Manual'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de página con información técnica */}
        <div className={styles.footerMeteorologia}>
          <div className={styles.footerContenido}>
            <div className={styles.footerSection}>
              <h4>Fuentes de datos</h4>
              <p>• Servicio Nacional de Meteorología</p>
              <p>• Estaciones automáticas</p>
              <p>• Sensores IoT distribuidos</p>
            </div>
            
            <div className={styles.footerSection}>
              <h4>Niveles de alerta</h4>
              <div className={styles.nivelesInfo}>
                <span className={`${styles.nivelBadge} ${styles.verde}`}>Verde: Sin riesgo</span>
                <span className={`${styles.nivelBadge} ${styles.amarillo}`}>Amarillo: Precaución</span>
                <span className={`${styles.nivelBadge} ${styles.naranja}`}>Naranja: Riesgo moderado</span>
                <span className={`${styles.nivelBadge} ${styles.rojo}`}>Rojo: Alto riesgo</span>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4>Contacto de emergencia</h4>
              <p>📞 Emergencias: 911</p>
              <p>🌪️ Meteorología: 155</p>
            </div>
          </div>
          
          <div className={styles.footerDisclaimer}>
            <p>
              ⚠️ Los datos meteorológicos son referenciales. 
              Para actividades críticas, consulte fuentes oficiales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeteorologiaPage;
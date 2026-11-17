import { useState, useEffect } from 'react';
import ResumenFinanciero from './components/ResumenFinanciero';
import FormularioMovimiento from './components/FormularioMovimiento';
import ListaMovimientos from './components/ListaMovimientos';
import './App.css';

const API_URL = import.meta.env.DEV ? 'http://localhost:3000/api/movimientos' : '/api/movimientos';

function App() {
  const [movimientos, setMovimientos] = useState([]);
  const [resumen, setResumen] = useState({
    totalIngresos: 0,
    totalEgresos: 0,
    balance: 0
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) throw new Error('Error al conectar con el servidor');
      const data = await respuesta.json();
      setMovimientos(data.movimientos);
      setResumen(data.resumen);
      setError(null);
    } catch (err) {
      setError('No se pudo conectar con la API. Verifica que el backend esté encendido.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const agregarMovimiento = async (nuevoMovimiento) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoMovimiento)
      });
      if (respuesta.ok) {
        cargarDatos();
      }
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  const eliminarMovimiento = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (respuesta.ok) {
        cargarDatos();
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  return (
    <div className="contenedor-principal">
      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">₿</div>
          <div>
            <h1>FinanzApp</h1>
            <p>Gestión de Finanzas Personales • Full Stack</p>
          </div>
        </div>
        <div className="api-status">
          <span className="pulse-dot" />
          API Conectada
        </div>
      </header>

      {error && <div className="alerta-error">{error}</div>}

      <main>
        <ResumenFinanciero resumen={resumen} />
        <FormularioMovimiento onAgregar={agregarMovimiento} />
        {cargando ? (
          <p className="cargando">Cargando movimientos desde el servidor...</p>
        ) : (
          <ListaMovimientos
            movimientos={movimientos}
            onEliminar={eliminarMovimiento}
          />
        )}
      </main>
    </div>
  );
}

export default App;
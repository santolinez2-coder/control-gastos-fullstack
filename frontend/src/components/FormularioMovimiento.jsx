import { useState } from 'react';

export default function FormularioMovimiento({ onAgregar }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('egreso');
  const [categoria, setCategoria] = useState('Alimentación');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descripcion.trim() || !monto || Number(monto) <= 0) return;

    onAgregar({
      descripcion,
      monto: Number(monto),
      tipo,
      categoria,
      fecha
    });

    setDescripcion('');
    setMonto('');
  };

  return (
    <section className="panel-card">
      <div className="panel-header">
        <div>
          <h2>Nuevo Movimiento</h2>
          <p className="panel-desc">Registra una transacción para actualizar el balance en tiempo real</p>
        </div>

        <div className="segmented-control">
          <button
            type="button"
            className={`seg-btn ${tipo === 'egreso' ? 'active-egreso' : ''}`}
            onClick={() => setTipo('egreso')}
          >
            − Egreso
          </button>
          <button
            type="button"
            className={`seg-btn ${tipo === 'ingreso' ? 'active-ingreso' : ''}`}
            onClick={() => setTipo('ingreso')}
          >
            + Ingreso
          </button>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="input-group span-2">
          <label>Concepto / Descripción</label>
          <input
            type="text"
            placeholder="Ej. Pago de servicios, Honorarios, Mercado..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Monto (COP)</label>
          <input
            type="number"
            placeholder="0"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="input-group">
          <label>Categoría</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="Alimentación">Alimentación</option>
            <option value="Hogar">Hogar</option>
            <option value="Transporte">Transporte</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="Salud">Salud</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="input-group">
          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="input-group btn-align">
          <button type="submit" className="btn-primary">
            Registrar Transacción
          </button>
        </div>
      </form>
    </section>
  );
}
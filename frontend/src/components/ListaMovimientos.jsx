import { useState } from 'react';

export default function ListaMovimientos({ movimientos, onEliminar }) {
  const [filtro, setFiltro] = useState('todos');

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const movimientosFiltrados = movimientos.filter((mov) => {
    if (filtro === 'todos') return true;
    return mov.tipo === filtro;
  });

  return (
    <section className="panel-card">
      <div className="panel-header">
        <div>
          <h2>Historial de Transacciones</h2>
          <p className="panel-desc">
            Mostrando {movimientosFiltrados.length} de {movimientos.length} movimientos
          </p>
        </div>

        <div className="filter-tabs">
          <button
            type="button"
            className={`tab-btn ${filtro === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltro('todos')}
          >
            Todos
          </button>
          <button
            type="button"
            className={`tab-btn ${filtro === 'ingreso' ? 'active' : ''}`}
            onClick={() => setFiltro('ingreso')}
          >
            Ingresos
          </button>
          <button
            type="button"
            className={`tab-btn ${filtro === 'egreso' ? 'active' : ''}`}
            onClick={() => setFiltro('egreso')}
          >
            Egresos
          </button>
        </div>
      </div>

      {movimientosFiltrados.length === 0 ? (
        <div className="empty-state">
          <p>No hay movimientos en esta categoría.</p>
        </div>
      ) : (
        <div className="tabla-responsive">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th className="text-right">Monto</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map((mov) => (
                <tr key={mov.id}>
                  <td className="fecha-col">{mov.fecha}</td>
                  <td className="desc-col">{mov.descripcion}</td>
                  <td>
                    <span className="cat-badge">{mov.categoria}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${mov.tipo}`}>
                      <span className="dot" />
                      {mov.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}
                    </span>
                  </td>
                  <td className={`monto-col text-right ${mov.tipo}`}>
                    {mov.tipo === 'ingreso' ? '+' : '−'} {formatearMoneda(mov.monto)}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn-icon-delete"
                      onClick={() => onEliminar(mov.id)}
                      title="Eliminar registro"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
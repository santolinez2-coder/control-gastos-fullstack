export default function ResumenFinanciero({ resumen }) {
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const totalFlujo = resumen.totalIngresos + resumen.totalEgresos;
  const pctIngresos = totalFlujo > 0 ? Math.round((resumen.totalIngresos / totalFlujo) * 100) : 0;
  const pctEgresos = totalFlujo > 0 ? Math.round((resumen.totalEgresos / totalFlujo) * 100) : 0;

  return (
    <section className="resumen-wrapper">
      <div className="resumen-grid">
        <div className="stat-card balance">
          <div className="stat-header">
            <span className="stat-label">Balance Disponible</span>
            <span className="stat-pill neutral">Neto</span>
          </div>
          <p className="stat-value">{formatearMoneda(resumen.balance)}</p>
          <span className="stat-sub">Liquidez actual consolidada</span>
        </div>

        <div className="stat-card ingreso">
          <div className="stat-header">
            <span className="stat-label">Ingresos Totales</span>
            <span className="stat-pill up">↑ {pctIngresos}%</span>
          </div>
          <p className="stat-value">{formatearMoneda(resumen.totalIngresos)}</p>
          <span className="stat-sub">Entradas registradas</span>
        </div>

        <div className="stat-card egreso">
          <div className="stat-header">
            <span className="stat-label">Egresos Totales</span>
            <span className="stat-pill down">↓ {pctEgresos}%</span>
          </div>
          <p className="stat-value">{formatearMoneda(resumen.totalEgresos)}</p>
          <span className="stat-sub">Salidas acumuladas</span>
        </div>
      </div>

      {totalFlujo > 0 && (
        <div className="ratio-bar-container">
          <div className="ratio-labels">
            <span>Proporción de flujo: {pctIngresos}% Ingresos</span>
            <span>{pctEgresos}% Egresos</span>
          </div>
          <div className="ratio-track">
            <div className="ratio-fill-in" style={{ width: `${pctIngresos}%` }} />
            <div className="ratio-fill-out" style={{ width: `${pctEgresos}%` }} />
          </div>
        </div>
      )}
    </section>
  );
}
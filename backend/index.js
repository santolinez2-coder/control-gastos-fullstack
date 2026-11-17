import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos simulada en memoria con datos iniciales
let movimientos = [
  {
    id: 1,
    descripcion: 'Salario mensual',
    monto: 2500000,
    tipo: 'ingreso',
    categoria: 'Trabajo',
    fecha: '2026-11-01'
  },
  {
    id: 2,
    descripcion: 'Pago de internet y servicios',
    monto: 180000,
    tipo: 'egreso',
    categoria: 'Hogar',
    fecha: '2026-11-05'
  },
  {
    id: 3,
    descripcion: 'Compra de supermercado',
    monto: 320000,
    tipo: 'egreso',
    categoria: 'Alimentación',
    fecha: '2026-11-10'
  }
];

// GET: Obtener todos los movimientos y el resumen financiero
app.get('/api/movimientos', (req, res) => {
  const totalIngresos = movimientos
    .filter(m => m.tipo === 'ingreso')
    .reduce((acc, m) => acc + Number(m.monto), 0);

  const totalEgresos = movimientos
    .filter(m => m.tipo === 'egreso')
    .reduce((acc, m) => acc + Number(m.monto), 0);

  const balance = totalIngresos - totalEgresos;

  res.json({
    resumen: {
      totalIngresos,
      totalEgresos,
      balance
    },
    movimientos
  });
});

// POST: Registrar un nuevo ingreso o egreso
app.post('/api/movimientos', (req, res) => {
  const { descripcion, monto, tipo, categoria, fecha } = req.body;

  if (!descripcion || !monto || !tipo) {
    return res.status(400).json({ error: 'Descripción, monto y tipo son obligatorios' });
  }

  const nuevoMovimiento = {
    id: Date.now(),
    descripcion,
    monto: Number(monto),
    tipo,
    categoria: categoria || 'General',
    fecha: fecha || new Date().toISOString().split('T')[0]
  };

  movimientos.unshift(nuevoMovimiento);
  res.status(201).json(nuevoMovimiento);
});

// DELETE: Eliminar un movimiento por ID
app.delete('/api/movimientos/:id', (req, res) => {
  const id = Number(req.params.id);
  const existe = movimientos.some(m => m.id === id);

  if (!existe) {
    return res.status(404).json({ error: 'Movimiento no encontrado' });
  }

  movimientos = movimientos.filter(m => m.id !== id);
  res.json({ mensaje: 'Movimiento eliminado correctamente', id });
});

// Servir los archivos estáticos del Frontend compilado (React)
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor Full Stack corriendo en http://localhost:${PORT}`);
});
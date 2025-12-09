import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors'; // captura async sin try/catch

import indexRoutes from './routes/indexRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import spellRoutes from './routes/spellRoutes.js';
import monsterRoutes from './routes/monsterRoutes.js';
import raceRoutes from './routes/raceRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Views estaticas
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'views')));

// Rutas
app.use('/', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/spells', spellRoutes);
app.use('/api/monsters', monsterRoutes);
app.use('/api/races', raceRoutes);
app.use('/api/equipment', equipmentRoutes);

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor', detail: err.message });
});

export default app;

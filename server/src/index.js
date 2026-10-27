import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import habitsRoutes from './routes/habits.js';
import statsRoutes from './routes/stats.js';
import achievementsRoutes from './routes/achievements.js';
import profileRoutes from './routes/profile.js';
import { getDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/profile', profileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'HabitUp Backend API', version: '1.0.0' });
});

// Serve static React client if built
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Start DB & Server
async function start() {
  try {
    await getDb();
    console.log('Base de datos PostgreSQL inicializada correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor HabitUp corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error fatal al iniciar servidor:', err);
    process.exit(1);
  }
}

start();

import express from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../db.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, ingresa tu correo y contraseña.' });
    }

    const db = await getDb();
    const userRes = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email.trim()]);

    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    const token = generateToken(user);

    // Return sanitized user
    const { password_hash, ...safeUser } = user;
    res.json({
      message: '¡Bienvenido de nuevo a HabitUp!',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Error en /login:', err);
    res.status(500).json({ error: 'Error del servidor al iniciar sesión.' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, termsAccepted } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'El nombre completo es obligatorio.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Ingresa un correo electrónico válido.' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
    }
    if (!termsAccepted) {
      return res.status(400).json({ error: 'Debes aceptar los Términos y Condiciones.' });
    }

    const db = await getDb();
    const checkUser = await db.query('SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [email.trim()]);
    if (checkUser.rows.length > 0) {
      return res.status(409).json({ error: 'Ya existe una cuenta con este correo electrónico.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUserRes = await db.query(`
      INSERT INTO users (name, email, password_hash, level, title, xp, target_xp, streak_days, best_streak, gems, multiplier, avatar_url)
      VALUES ($1, $2, $3, 1, 'Iniciado', 100, 500, 1, 1, 100, 1.0, '')
      RETURNING id, name, email, level, title, xp, target_xp, streak_days, best_streak, gems, multiplier, avatar_url, created_at;
    `, [fullName.trim(), email.trim(), passwordHash]);

    const newUser = newUserRes.rows[0];

    // Create user settings
    await db.query(`INSERT INTO user_settings (user_id) VALUES ($1)`, [newUser.id]);

    // Give welcome initial habits
    const initialHabits = [
      { name: 'Beber 2L de agua', cat: 'salud', sub: 'HIDRATACIÓN', time: 'manana', xp: 20 },
      { name: 'Caminata de 15 min', cat: 'fitness', sub: 'CARDIO', time: 'manana', xp: 30 },
      { name: 'Lectura diaria (10 págs)', cat: 'productividad', sub: 'DESARROLLO', time: 'tarde', xp: 25 }
    ];

    for (const h of initialHabits) {
      await db.query(`
        INSERT INTO habits (user_id, name, category, subcategory, time_of_day, xp_reward, current_streak)
        VALUES ($1, $2, $3, $4, $5, $6, 0);
      `, [newUser.id, h.name, h.cat, h.sub, h.time, h.xp]);
    }

    const token = generateToken(newUser);

    res.status(201).json({
      message: '¡Cuenta creada con éxito! Bienvenido a HabitUp.',
      token,
      user: newUser
    });
  } catch (err) {
    console.error('Error en /register:', err);
    res.status(500).json({ error: 'Error del servidor al registrar usuario.' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const userRes = await db.query('SELECT id, name, email, level, title, xp, target_xp, streak_days, best_streak, gems, multiplier, avatar_url, created_at FROM users WHERE id = $1', [req.user.id]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json({ user: userRes.rows[0] });
  } catch (err) {
    console.error('Error en /me:', err);
    res.status(500).json({ error: 'Error al obtener datos del usuario.' });
  }
});

export default router;

import express from 'express';
import { getDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const userRes = await db.query(`
      SELECT 
        u.id, u.name, u.email, u.level, u.title, u.xp, u.target_xp, 
        u.streak_days, u.best_streak, u.gems, u.multiplier, u.avatar_url, u.created_at,
        s.morning_reminder, s.morning_time, s.streak_danger_alert, s.streak_danger_time,
        s.weekly_summary, s.haptic_sound, s.confetti_fx, s.competitive_mode,
        s.dark_mode, s.typography_size, s.daily_xp_goal, s.cutoff_time
      FROM users u
      LEFT JOIN user_settings s ON u.id = s.user_id
      WHERE u.id = $1;
    `, [req.user.id]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'Perfil no encontrado.' });
    }

    res.json({ profile: userRes.rows[0] });
  } catch (err) {
    console.error('Error en /profile:', err);
    res.status(500).json({ error: 'Error del servidor al obtener perfil.' });
  }
});

// PUT /api/profile
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { 
      name, morning_reminder, streak_danger_alert, weekly_summary,
      haptic_sound, confetti_fx, competitive_mode, dark_mode,
      typography_size, daily_xp_goal, cutoff_time
    } = req.body;

    const db = await getDb();

    if (name) {
      await db.query('UPDATE users SET name = $1 WHERE id = $2', [name.trim(), req.user.id]);
    }

    await db.query(`
      UPDATE user_settings
      SET 
        morning_reminder = COALESCE($1, morning_reminder),
        streak_danger_alert = COALESCE($2, streak_danger_alert),
        weekly_summary = COALESCE($3, weekly_summary),
        haptic_sound = COALESCE($4, haptic_sound),
        confetti_fx = COALESCE($5, confetti_fx),
        competitive_mode = COALESCE($6, competitive_mode),
        dark_mode = COALESCE($7, dark_mode),
        typography_size = COALESCE($8, typography_size),
        daily_xp_goal = COALESCE($9, daily_xp_goal),
        cutoff_time = COALESCE($10, cutoff_time),
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $11;
    `, [
      morning_reminder, streak_danger_alert, weekly_summary,
      haptic_sound, confetti_fx, competitive_mode, dark_mode,
      typography_size, daily_xp_goal, cutoff_time, req.user.id
    ]);

    res.json({ message: '¡Configuración y perfil actualizados con éxito!' });
  } catch (err) {
    console.error('Error al actualizar perfil:', err);
    res.status(500).json({ error: 'Error al actualizar configuración.' });
  }
});

export default router;

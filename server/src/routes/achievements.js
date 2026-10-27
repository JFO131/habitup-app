import express from 'express';
import { getDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/achievements
router.get('/', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();

    const achRes = await db.query(`
      SELECT 
        a.*,
        ua.progress_current,
        ua.is_unlocked,
        ua.unlocked_at
      FROM achievements a
      LEFT JOIN user_achievements ua 
        ON a.id = ua.achievement_id AND ua.user_id = $1
      ORDER BY a.id ASC;
    `, [req.user.id]);

    const achievements = achRes.rows.map(a => ({
      ...a,
      is_unlocked: !!a.is_unlocked,
      progress_current: a.progress_current || 0,
      progress_percent: Math.min(100, Math.round(((a.progress_current || 0) / (a.target_value || 1)) * 100))
    }));

    const unlockedCount = achievements.filter(a => a.is_unlocked).length;

    res.json({
      season: 'Temporada 2 • Ascenso',
      adventurer_id: '#HU-9842',
      achievements_total: achievements.length,
      achievements_unlocked: unlockedCount,
      achievements_in_progress: achievements.filter(a => !a.is_unlocked && a.progress_current > 0).length,
      achievements_locked: achievements.filter(a => !a.is_unlocked && (!a.progress_current || a.progress_current === 0)).length,
      achievements
    });
  } catch (err) {
    console.error('Error en /achievements:', err);
    res.status(500).json({ error: 'Error del servidor al obtener catálogo de logros.' });
  }
});

export default router;

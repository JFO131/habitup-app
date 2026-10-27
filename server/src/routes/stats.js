import express from 'express';
import { getDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/stats/summary
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const todayStr = new Date().toISOString().split('T')[0];

    // Total habits for user
    const totalHabitsRes = await db.query('SELECT COUNT(*) as count FROM habits WHERE user_id = $1 AND is_active = TRUE', [req.user.id]);
    const totalHabits = parseInt(totalHabitsRes.rows[0].count) || 0;

    // Completed today
    const completedTodayRes = await db.query(`
      SELECT COUNT(*) as count 
      FROM habit_completions hc
      JOIN habits h ON hc.habit_id = h.id
      WHERE hc.user_id = $1 AND hc.completion_date = $2
    `, [req.user.id, todayStr]);
    const completedToday = parseInt(completedTodayRes.rows[0].count) || 0;

    // Calculate percentage today
    const percentageToday = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

    // User profile data
    const userRes = await db.query('SELECT level, xp, target_xp, streak_days, best_streak, gems FROM users WHERE id = $1', [req.user.id]);
    const user = userRes.rows[0] || {};

    res.json({
      global_compliance_rate: 88.4,
      monthly_completed: 142,
      monthly_target: 170,
      max_streak_history: user.best_streak || 24,
      current_streak: user.streak_days || 14,
      total_hours_invested: 48,
      today: {
        total: totalHabits,
        completed: completedToday,
        pending: Math.max(0, totalHabits - completedToday),
        percentage: percentageToday,
        xp_available: Math.max(0, (totalHabits - completedToday) * 30)
      }
    });
  } catch (err) {
    console.error('Error en /stats/summary:', err);
    res.status(500).json({ error: 'Error al obtener resumen estadístico.' });
  }
});

// GET /api/stats/heatmap (30-day activity matrix)
router.get('/heatmap', authenticateToken, async (req, res) => {
  try {
    const days = [];
    const today = new Date();

    // Generate 30 days data
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayNum = 30 - i;

      // Realistic mock completions consistent with Stitch mockup (e.g. 5/5, 4/5, 3/5)
      const ratio = [5, 5, 4, 3, 5, 4, 5, 5, 4, 5, 3, 5, 5, 4, 5, 5, 4, 5, 2, 5, 5, 4, 5, 5, 4, 5, 5, 3, 5, 5][i % 30];
      const total = 5;

      days.push({
        day_index: dayNum,
        date: dateStr,
        completed: ratio,
        total: total,
        ratio_text: `${ratio}/${total}`,
        is_today: i === 0,
        level_class: ratio === 5 ? 'full' : ratio >= 4 ? 'high' : ratio >= 3 ? 'mid' : 'low'
      });
    }

    res.json({
      streak_days_count: 30,
      active_rate: 96.7,
      matrix: days
    });
  } catch (err) {
    console.error('Error en /stats/heatmap:', err);
    res.status(500).json({ error: 'Error al obtener matriz de hábitos.' });
  }
});

// GET /api/stats/categories
router.get('/categories', authenticateToken, async (req, res) => {
  res.json({
    pillars_count: 5,
    categories: [
      { name: 'Salud & Nutrición', key: 'salud', percentage: 35, color: '#0060A9' },
      { name: 'Mente & Mindfulness', key: 'mente', percentage: 25, color: '#3F22C8' },
      { name: 'Fitness & Fuerza', key: 'fitness', percentage: 20, color: '#653F00' },
      { name: 'Productividad', key: 'productividad', percentage: 15, color: '#3F9EFF' },
      { name: 'Descanso & Sueño', key: 'descanso', percentage: 5, color: '#865400' }
    ]
  });
});

export default router;

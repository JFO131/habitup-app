import express from 'express';
import { getDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/habits
router.get('/', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const todayStr = new Date().toISOString().split('T')[0];

    const habitsRes = await db.query(`
      SELECT 
        h.*,
        CASE WHEN hc.id IS NOT NULL THEN TRUE ELSE FALSE END AS is_completed_today
      FROM habits h
      LEFT JOIN habit_completions hc 
        ON h.id = hc.habit_id 
        AND hc.completion_date = $1
      WHERE h.user_id = $2
      ORDER BY h.id ASC;
    `, [todayStr, req.user.id]);

    const formattedHabits = habitsRes.rows.map(h => ({
      ...h,
      frequency_days: typeof h.frequency_days === 'string' ? JSON.parse(h.frequency_days) : h.frequency_days,
      target_value: parseFloat(h.target_value),
      current_value: parseFloat(h.current_value)
    }));

    res.json({ habits: formattedHabits });
  } catch (err) {
    console.error('Error al listar hábitos:', err);
    res.status(500).json({ error: 'Error del servidor al obtener hábitos.' });
  }
});

// POST /api/habits
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, category, subcategory, frequency_days, time_of_day, target_time, xp_reward, target_value, unit } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'El nombre del hábito es obligatorio.' });
    }

    const db = await getDb();
    const freqJson = JSON.stringify(frequency_days || ['L', 'M', 'X', 'J', 'V', 'S', 'D']);
    const xp = parseInt(xp_reward) || 30;

    const insertRes = await db.query(`
      INSERT INTO habits (
        user_id, name, category, subcategory, frequency_days, 
        time_of_day, target_time, xp_reward, current_streak, 
        target_value, current_value, unit
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 0, $9, 0, $10)
      RETURNING *;
    `, [
      req.user.id,
      name.trim(),
      category || 'salud',
      subcategory || category?.toUpperCase() || 'RUTINA',
      freqJson,
      time_of_day || 'manana',
      target_time || '08:00 AM',
      xp,
      target_value || 1.0,
      unit || ''
    ]);

    const newHabit = insertRes.rows[0];
    newHabit.frequency_days = JSON.parse(newHabit.frequency_days);
    newHabit.is_completed_today = false;

    res.status(201).json({
      message: '¡Hábito creado exitosamente!',
      habit: newHabit
    });
  } catch (err) {
    console.error('Error al crear hábito:', err);
    res.status(500).json({ error: 'Error del servidor al crear hábito.' });
  }
});

// PUT /api/habits/:id
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const habitId = parseInt(req.params.id);
    const { name, category, frequency_days, time_of_day, target_time, xp_reward, is_active } = req.body;

    const db = await getDb();
    const checkRes = await db.query('SELECT id FROM habits WHERE id = $1 AND user_id = $2', [habitId, req.user.id]);
    if (checkRes.rows.length === 0) {
      return res.status(404).json({ error: 'Hábito no encontrado.' });
    }

    const freqJson = frequency_days ? JSON.stringify(frequency_days) : null;

    const updateRes = await db.query(`
      UPDATE habits
      SET 
        name = COALESCE($1, name),
        category = COALESCE($2, category),
        frequency_days = COALESCE($3, frequency_days),
        time_of_day = COALESCE($4, time_of_day),
        target_time = COALESCE($5, target_time),
        xp_reward = COALESCE($6, xp_reward),
        is_active = COALESCE($7, is_active)
      WHERE id = $8 AND user_id = $9
      RETURNING *;
    `, [name, category, freqJson, time_of_day, target_time, xp_reward, is_active, habitId, req.user.id]);

    const updated = updateRes.rows[0];
    updated.frequency_days = JSON.parse(updated.frequency_days);

    res.json({ message: 'Hábito actualizado.', habit: updated });
  } catch (err) {
    console.error('Error al actualizar hábito:', err);
    res.status(500).json({ error: 'Error al actualizar hábito.' });
  }
});

// DELETE /api/habits/:id
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const habitId = parseInt(req.params.id);
    const db = await getDb();
    const deleteRes = await db.query('DELETE FROM habits WHERE id = $1 AND user_id = $2 RETURNING id', [habitId, req.user.id]);

    if (deleteRes.rows.length === 0) {
      return res.status(404).json({ error: 'Hábito no encontrado.' });
    }

    res.json({ message: 'Hábito eliminado correctamente.' });
  } catch (err) {
    console.error('Error al eliminar hábito:', err);
    res.status(500).json({ error: 'Error al eliminar el hábito.' });
  }
});

// POST /api/habits/:id/toggle
router.post('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const habitId = parseInt(req.params.id);
    const db = await getDb();
    const todayStr = new Date().toISOString().split('T')[0];

    // Find habit
    const habitRes = await db.query('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [habitId, req.user.id]);
    if (habitRes.rows.length === 0) {
      return res.status(404).json({ error: 'Hábito no encontrado.' });
    }
    const habit = habitRes.rows[0];

    // Check if already completed today
    const compRes = await db.query(
      'SELECT id FROM habit_completions WHERE habit_id = $1 AND completion_date = $2',
      [habitId, todayStr]
    );

    let isCompletedNow = false;
    let xpChange = 0;

    if (compRes.rows.length > 0) {
      // Un-complete habit
      await db.query('DELETE FROM habit_completions WHERE habit_id = $1 AND completion_date = $2', [habitId, todayStr]);
      xpChange = -habit.xp_reward;
      isCompletedNow = false;

      // Update streak
      await db.query('UPDATE habits SET current_streak = GREATEST(0, current_streak - 1) WHERE id = $1', [habitId]);
    } else {
      // Complete habit
      await db.query(
        'INSERT INTO habit_completions (habit_id, user_id, completion_date, xp_earned) VALUES ($1, $2, $3, $4)',
        [habitId, req.user.id, todayStr, habit.xp_reward]
      );
      xpChange = habit.xp_reward;
      isCompletedNow = true;

      // Increment streak
      await db.query('UPDATE habits SET current_streak = current_streak + 1 WHERE id = $1', [habitId]);
    }

    // Update user XP & Level
    const userRes = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = userRes.rows[0];
    let newXp = Math.max(0, user.xp + xpChange);
    let newLevel = user.level;
    let newTargetXp = user.target_xp;
    let leveledUp = false;

    // Level-up logic: each level requires 500 * level XP
    if (newXp >= newTargetXp) {
      newLevel += 1;
      newTargetXp = newLevel * 500;
      leveledUp = true;
    }

    const updatedUserRes = await db.query(`
      UPDATE users 
      SET xp = $1, level = $2, target_xp = $3
      WHERE id = $4
      RETURNING id, name, email, level, title, xp, target_xp, streak_days, best_streak, gems, multiplier;
    `, [newXp, newLevel, newTargetXp, req.user.id]);

    res.json({
      message: isCompletedNow ? `¡Hábito completado! +${habit.xp_reward} XP ganados.` : 'Hábito desmarcado.',
      is_completed_today: isCompletedNow,
      xp_earned: isCompletedNow ? habit.xp_reward : 0,
      leveled_up: leveledUp,
      user: updatedUserRes.rows[0]
    });
  } catch (err) {
    console.error('Error al togglear hábito:', err);
    res.status(500).json({ error: 'Error del servidor al registrar cumplimiento del hábito.' });
  }
});

export default router;

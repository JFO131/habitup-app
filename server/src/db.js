import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbClient = null;

export async function getDb() {
  if (dbClient) return dbClient;

  if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    dbClient = {
      query: (sql, params = []) => pool.query(sql, params)
    };
  } else {
    const dataDir = path.join(__dirname, '..', 'data', 'postgres');
    fs.mkdirSync(dataDir, { recursive: true });
    const pglite = new PGlite(dataDir);
    await pglite.waitReady;
    dbClient = {
      exec: async (sql) => pglite.exec(sql),
      query: async (sql, params = []) => {
        const res = await pglite.query(sql, params);
        return {
          rows: res.rows,
          rowCount: res.affectedRows ?? res.rows.length
        };
      }
    };
  }

  await initSchema(dbClient);
  return dbClient;
}

async function initSchema(db) {
  const schemaSql = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(180) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      level INT DEFAULT 7,
      title VARCHAR(120) DEFAULT 'Explorador Imparable',
      xp INT DEFAULT 3450,
      target_xp INT DEFAULT 4000,
      streak_days INT DEFAULT 14,
      best_streak INT DEFAULT 24,
      gems INT DEFAULT 240,
      multiplier NUMERIC(3, 1) DEFAULT 1.5,
      avatar_url TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS habits (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(200) NOT NULL,
      category VARCHAR(50) NOT NULL,
      subcategory VARCHAR(100) DEFAULT '',
      frequency_days TEXT DEFAULT '["L","M","X","J","V"]',
      time_of_day VARCHAR(50) DEFAULT 'manana',
      target_time VARCHAR(50) DEFAULT '08:00',
      xp_reward INT DEFAULT 30,
      current_streak INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      target_value NUMERIC(6, 2) DEFAULT 1.0,
      current_value NUMERIC(6, 2) DEFAULT 0.0,
      unit VARCHAR(50) DEFAULT '',
      notes TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS habit_completions (
      id SERIAL PRIMARY KEY,
      habit_id INT REFERENCES habits(id) ON DELETE CASCADE,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      completion_date DATE NOT NULL,
      xp_earned INT DEFAULT 30,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_habit_day UNIQUE (habit_id, completion_date)
    );

    CREATE TABLE IF NOT EXISTS achievements (
      id SERIAL PRIMARY KEY,
      code VARCHAR(80) UNIQUE NOT NULL,
      title VARCHAR(120) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(60) NOT NULL,
      badge_tier VARCHAR(30) DEFAULT 'bronce',
      badge_label VARCHAR(30) DEFAULT '',
      xp_reward INT DEFAULT 50,
      gems_reward INT DEFAULT 10,
      icon VARCHAR(60) NOT NULL,
      target_value INT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_achievements (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      achievement_id INT REFERENCES achievements(id) ON DELETE CASCADE,
      progress_current INT DEFAULT 0,
      is_unlocked BOOLEAN DEFAULT FALSE,
      unlocked_at TIMESTAMP NULL,
      CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id)
    );

    CREATE TABLE IF NOT EXISTS user_settings (
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      morning_reminder BOOLEAN DEFAULT TRUE,
      morning_time VARCHAR(20) DEFAULT '07:30 AM',
      streak_danger_alert BOOLEAN DEFAULT TRUE,
      streak_danger_time VARCHAR(20) DEFAULT '20:00 PM',
      weekly_summary BOOLEAN DEFAULT TRUE,
      haptic_sound BOOLEAN DEFAULT TRUE,
      confetti_fx BOOLEAN DEFAULT TRUE,
      competitive_mode BOOLEAN DEFAULT TRUE,
      dark_mode BOOLEAN DEFAULT FALSE,
      typography_size VARCHAR(30) DEFAULT 'standard',
      daily_xp_goal INT DEFAULT 150,
      cutoff_time VARCHAR(20) DEFAULT '00:00',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  if (db.exec) {
    await db.exec(schemaSql);
  } else {
    // pg Pool fallback
    await db.query(schemaSql);
  }

  await seedData(db);
}

async function seedData(db) {
  // Check if users exist
  const existingUsers = await db.query('SELECT COUNT(*) as count FROM users');
  if (parseInt(existingUsers.rows[0].count) > 0) {
    return;
  }

  // Create demo default user: Laura Gómez / Carlos Mendoza
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  const userRes = await db.query(`
    INSERT INTO users (name, email, password_hash, level, title, xp, target_xp, streak_days, best_streak, gems, multiplier, avatar_url)
    VALUES (
      'Laura Gómez',
      'carlos.mendoza@habitup.app',
      $1,
      7,
      'Explorador Imparable',
      3450,
      4000,
      14,
      24,
      240,
      1.5,
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUOkeg1TR9-Gw7kAsCQfohpEDWJCT2lDE7OL-2Uk-QNF8T-ZaHIe7hg8RlTW0lx9AQiSv9jCNOvnqCMbqHWBf83HyNEmC01Pb5N5wtxwMoscYp7cPh6SH4TpxtVL6ulrhvo1nTWIwLnvOTauV0JqA8NZsZcALmrd4muLHzexOobEzA3ZzPM4fhUbSNsgfihC3wG75jjvgEfC_RUl5ny6YWr_Kv_FisfxtLK58h3On3Pfpz0r5ek96kBw'
    )
    RETURNING id;
  `, [passwordHash]);

  const userId = userRes.rows[0].id;

  // Also create user settings
  await db.query(`
    INSERT INTO user_settings (user_id)
    VALUES ($1);
  `, [userId]);

  // Seed Habits matching Stitch exactly
  const habitsData = [
    {
      name: 'Beber 2L de agua',
      category: 'salud',
      subcategory: 'HIDRATACIÓN',
      frequency: '["L","M","X","J","V","S","D"]',
      timeOfDay: 'manana',
      targetTime: 'Mañana y Día',
      xp: 20,
      streak: 18,
      targetVal: 2.0,
      currentVal: 2.0,
      unit: 'L',
      isCompletedToday: true
    },
    {
      name: 'Caminata matutina 30 min',
      category: 'fitness',
      subcategory: 'CARDIO',
      frequency: '["L","M","X","J","V","S","D"]',
      timeOfDay: 'manana',
      targetTime: '07:15 AM',
      xp: 40,
      streak: 14,
      targetVal: 30,
      currentVal: 30,
      unit: 'min',
      isCompletedToday: true
    },
    {
      name: 'Meditación mindfulness',
      category: 'mente',
      subcategory: 'MINDFULNESS',
      frequency: '["L","M","X","J","V","S","D"]',
      timeOfDay: 'manana',
      targetTime: '09:00 AM',
      xp: 25,
      streak: 9,
      targetVal: 15,
      currentVal: 15,
      unit: 'min',
      isCompletedToday: true
    },
    {
      name: 'Leer 20 páginas de libro',
      category: 'productividad',
      subcategory: 'DESARROLLO MENTAL',
      frequency: '["L","M","X","J","V"]',
      timeOfDay: 'tarde',
      targetTime: '18:00',
      xp: 30,
      streak: 6,
      targetVal: 20,
      currentVal: 14,
      unit: 'págs',
      isCompletedToday: false
    },
    {
      name: 'Dormir antes de las 11:00 PM',
      category: 'descanso',
      subcategory: 'RITMO CIRCADIANO',
      frequency: '["L","M","X","J","V","S","D"]',
      timeOfDay: 'noche',
      targetTime: '22:30 Alarma',
      xp: 50,
      streak: 12,
      targetVal: 1,
      currentVal: 0,
      unit: 'noche',
      isCompletedToday: false
    },
    {
      name: 'Estiramientos posturales',
      category: 'salud',
      subcategory: 'BIENESTAR',
      frequency: '["L","M","X","J","V","S","D"]',
      timeOfDay: 'tarde',
      targetTime: '16:30',
      xp: 20,
      streak: 9,
      targetVal: 15,
      currentVal: 0,
      unit: 'min',
      isCompletedToday: false
    }
  ];

  const todayStr = new Date().toISOString().split('T')[0];

  for (const h of habitsData) {
    const habitRes = await db.query(`
      INSERT INTO habits (user_id, name, category, subcategory, frequency_days, time_of_day, target_time, xp_reward, current_streak, target_value, current_value, unit)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id;
    `, [userId, h.name, h.category, h.subcategory, h.frequency, h.timeOfDay, h.targetTime, h.xp, h.streak, h.targetVal, h.currentVal, h.unit]);

    if (h.isCompletedToday) {
      await db.query(`
        INSERT INTO habit_completions (habit_id, user_id, completion_date, xp_earned)
        VALUES ($1, $2, $3, $4);
      `, [habitRes.rows[0].id, userId, todayStr, h.xp]);
    }
  }

  // Seed Achievements catalog
  const achievementsList = [
    {
      code: 'guerrero_matutino',
      title: 'Guerrero Matutino',
      description: 'Completar hábitos antes de las 9:00 AM durante 7 días seguidos.',
      category: 'constancia',
      badgeTier: 'oro',
      badgeLabel: 'NIV 3',
      xp: 100,
      gems: 15,
      icon: 'wb_sunny',
      unlocked: true,
      progress: 7,
      target: 7
    },
    {
      code: 'amo_hidratacion',
      title: 'Amo de la Hidratación',
      description: '20 días alcanzando el consumo de al menos 2 litros de agua.',
      category: 'salud',
      badgeTier: 'plata',
      badgeLabel: '20D',
      xp: 75,
      gems: 10,
      icon: 'water_drop',
      unlocked: true,
      progress: 20,
      target: 20
    },
    {
      code: 'mente_serena',
      title: 'Mente Serena',
      description: '10 sesiones de meditación o respiración consciente consecutivas.',
      category: 'mente',
      badgeTier: 'bronce',
      badgeLabel: '10D',
      xp: 90,
      gems: 12,
      icon: 'psychology',
      unlocked: true,
      progress: 10,
      target: 10
    },
    {
      code: 'racha_titan',
      title: 'Racha de Titán',
      description: 'Mantener 14 días seguidos cualquier hábito de tu rutina activa.',
      category: 'rachas',
      badgeTier: 'oro',
      badgeLabel: '14D',
      xp: 150,
      gems: 25,
      icon: 'local_fire_department',
      unlocked: true,
      progress: 14,
      target: 14
    },
    {
      code: 'lector_voraz',
      title: 'Lector Voraz',
      description: 'Leer un total de 500 páginas registradas en tus hábitos.',
      category: 'productividad',
      badgeTier: 'plata',
      badgeLabel: '64%',
      xp: 120,
      gems: 15,
      icon: 'menu_book',
      unlocked: false,
      progress: 320,
      target: 500
    },
    {
      code: 'madrugador_disciplinado',
      title: 'Madrugador Disciplinado',
      description: 'Despertar a las 6:30 AM durante 10 días registrados.',
      category: 'descanso',
      badgeTier: 'bronce',
      badgeLabel: '7/10',
      xp: 80,
      gems: 10,
      icon: 'alarm',
      unlocked: false,
      progress: 7,
      target: 10
    },
    {
      code: 'habito_centenario',
      title: 'Hábito Centenario',
      description: 'Mantener una racha ininterrumpida de 100 días consecutivos.',
      category: 'rachas',
      badgeTier: 'platino',
      badgeLabel: '14/100',
      xp: 500,
      gems: 100,
      icon: 'lock',
      unlocked: false,
      progress: 14,
      target: 100
    },
    {
      code: 'polimata',
      title: 'Polímata',
      description: 'Completar hábitos en 5 categorías distintas en un único día solar.',
      category: 'constancia',
      badgeTier: 'oro',
      badgeLabel: '3/5',
      xp: 250,
      gems: 40,
      icon: 'military_tech',
      unlocked: false,
      progress: 3,
      target: 5
    }
  ];

  for (const ach of achievementsList) {
    const achRes = await db.query(`
      INSERT INTO achievements (code, title, description, category, badge_tier, badge_label, xp_reward, gems_reward, icon, target_value)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `, [ach.code, ach.title, ach.description, ach.category, ach.badgeTier, ach.badgeLabel, ach.xp, ach.gems, ach.icon, ach.target]);

    await db.query(`
      INSERT INTO user_achievements (user_id, achievement_id, progress_current, is_unlocked, unlocked_at)
      VALUES ($1, $2, $3, $4, $5);
    `, [userId, achRes.rows[0].id, ach.progress, ach.unlocked, ach.unlocked ? new Date() : null]);
  }
}

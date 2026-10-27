import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function ProfilePage({ profileData }) {
  const { user, logout, updateUser } = useAuth();

  const [morningReminder, setMorningReminder] = useState(profileData?.morning_reminder ?? true);
  const [streakDangerAlert, setStreakDangerAlert] = useState(profileData?.streak_danger_alert ?? true);
  const [weeklySummary, setWeeklySummary] = useState(profileData?.weekly_summary ?? true);
  const [hapticSound, setHapticSound] = useState(profileData?.haptic_sound ?? true);
  const [confettiFx, setConfettiFx] = useState(profileData?.confetti_fx ?? true);
  const [competitiveMode, setCompetitiveMode] = useState(profileData?.competitive_mode ?? true);
  const [typographySize, setTypographySize] = useState('standard');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const level = user?.level || 7;
  const streak = user?.streak_days || 14;
  const bestStreak = user?.best_streak || 24;
  const gems = user?.gems || 240;

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateProfile({
        morning_reminder: morningReminder,
        streak_danger_alert: streakDangerAlert,
        weekly_summary: weeklySummary,
        haptic_sound: hapticSound,
        confetti_fx: confettiFx,
        competitive_mode: competitiveMode,
        typography_size: typographySize
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Error al guardar configuración: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">
            <span>Configuración Personal</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            <span>Panel de Jugador</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">Mi Perfil & Configuración</h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Copia de seguridad y exportación de datos descargada en JSON.')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-container-highest transition-all shadow-sm" 
            type="button"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            <span>Exportar Datos</span>
          </button>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:opacity-95 active:scale-95 transition-all" 
            type="button"
          >
            <span className="material-symbols-outlined text-lg">check</span>
            <span>{saveSuccess ? '¡Guardado!' : 'Guardar Cambios'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 font-label-md text-label-md flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>Tus preferencias y configuraciones han sido sincronizadas en la base de datos PostgreSQL.</span>
        </div>
      )}

      {/* Profile Hero Card */}
      <section className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-surface-container-high">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden ring-4 ring-primary-container/20 shadow-md">
                <img 
                  className="w-full h-full object-cover" 
                  alt={user?.name || 'Laura Gómez'}
                  src={user?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUOkeg1TR9-Gw7kAsCQfohpEDWJCT2lDE7OL-2Uk-QNF8T-ZaHIe7hg8RlTW0lx9AQiSv9jCNOvnqCMbqHWBf83HyNEmC01Pb5N5wtxwMoscYp7cPh6SH4TpxtVL6ulrhvo1nTWIwLnvOTauV0JqA8NZsZcALmrd4muLHzexOobEzA3ZzPM4fhUbSNsgfihC3wG75jjvgEfC_RUl5ny6YWr_Kv_FisfxtLK58h3On3Pfpz0r5ek96kBw'} 
                />
              </div>
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-black shadow-lg">
                <span className="material-symbols-outlined text-xs material-symbols-fill">military_tech</span>
                <span>LVL {level}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
                  {user?.name || 'Laura Gómez'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-bold">
                  Pro Habitual
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                <span className="font-medium text-on-surface">@{user?.email ? user.email.split('@')[0] : 'laura_habits'}</span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  Miembro desde Octubre 2024
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Estado: <strong className="font-bold text-on-surface">Activa y enfocada 🚀</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => alert('Edición de avatar y perfil abierta.')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all font-label-lg text-label-lg font-bold"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              <span>Editar Perfil</span>
            </button>
            <button 
              onClick={() => alert('Enlace de perfil público copiado.')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface transition-all font-label-md text-label-md"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* 5 Quick KPI Cards under Profile */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6">
          <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">Racha Actual</span>
              <div className="w-7 h-7 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-base material-symbols-fill">local_fire_department</span>
              </div>
            </div>
            <span className="font-stat-numeric text-stat-numeric text-tertiary font-black">{streak} <span className="font-label-md text-label-md font-bold">días</span></span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">Mantén el impulso hoy</span>
          </div>

          <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">Racha Récord</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-base material-symbols-fill">emoji_events</span>
              </div>
            </div>
            <span className="font-stat-numeric text-stat-numeric text-on-surface font-black">{bestStreak} <span className="font-label-md text-label-md font-bold">días</span></span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">Logrado en Enero</span>
          </div>

          <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">Tasa Éxito</span>
              <div className="w-7 h-7 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-base material-symbols-fill">trending_up</span>
              </div>
            </div>
            <span className="font-stat-numeric text-stat-numeric text-secondary font-black">88%</span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">Histórico global</span>
          </div>

          <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">XP Total</span>
              <div className="w-7 h-7 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-base material-symbols-fill">bolt</span>
              </div>
            </div>
            <span className="font-stat-numeric text-stat-numeric text-primary font-black">12,450</span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">Siguiente nivel en 550</span>
          </div>

          <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">Gemas</span>
              <div className="w-7 h-7 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-base material-symbols-fill">diamond</span>
              </div>
            </div>
            <span className="font-stat-numeric text-stat-numeric text-on-surface font-black">{gems}</span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">Disponibles en tienda</span>
          </div>
        </div>
      </section>

      {/* 2 Column Settings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Settings Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Notification Preferences */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Preferencias de Notificaciones</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Configura cuándo y cómo HabitUp te recuerda tus rutinas</span>
              </div>
            </div>

            <div className="divide-y divide-surface-container-high">
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">wb_sunny</span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Recordatorios matutinos</div>
                    <div className="font-body-sm text-[12px] text-on-surface-variant">Notificación de inicio y plan diario programada a las 07:30 AM</div>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={morningReminder}
                  onChange={(e) => setMorningReminder(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer"
                />
              </div>

              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary">warning</span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Alertas de racha en peligro</div>
                    <div className="font-body-sm text-[12px] text-on-surface-variant">Aviso preventivo si tienes hábitos sin marcar a las 20:00 PM</div>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={streakDangerAlert}
                  onChange={(e) => setStreakDangerAlert(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer"
                />
              </div>

              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">stacked_bar_chart</span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Resumen dominical semanal</div>
                    <div className="font-body-sm text-[12px] text-on-surface-variant">Informe global de consistencia y análisis de desempeño cada domingo</div>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={weeklySummary}
                  onChange={(e) => setWeeklySummary(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Gamification & Sounds */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl material-symbols-fill">sports_esports</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Gamificación & Sonidos</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Ajusta la intensidad sensorial de tus victorias diarias</span>
              </div>
            </div>

            <div className="divide-y divide-surface-container-high">
              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">volume_up</span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Sonido háptico de satisfacción</div>
                    <div className="font-body-sm text-[12px] text-on-surface-variant">Feedback acústico al completar y validar un hábito</div>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={hapticSound}
                  onChange={(e) => setHapticSound(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer"
                />
              </div>

              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">celebration</span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Efectos de confeti y animaciones XP</div>
                    <div className="font-body-sm text-[12px] text-on-surface-variant">Partículas visuales al superar hitos y rachas destacadas</div>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={confettiFx}
                  onChange={(e) => setConfettiFx(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer"
                />
              </div>

              <div className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">leaderboard</span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">Modo Competitivo en Liga Diamante</div>
                    <div className="font-body-sm text-[12px] text-on-surface-variant">Comparte tu puntaje y racha semanal con tu círculo de amigos</div>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={competitiveMode}
                  onChange={(e) => setCompetitiveMode(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Appearance & System */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">palette</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Apariencia y Sistema</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Personaliza la ergonomía visual de tu interfaz</span>
              </div>
            </div>

            <div>
              <span className="font-label-md text-label-md font-bold text-on-surface block mb-3">TEMA VISUAL</span>
              <div className="grid grid-cols-2 gap-4">
                {/* Light Theme Card */}
                <div className="p-4 rounded-2xl border-2 border-primary bg-surface-container-lowest shadow-xs flex flex-col gap-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Modo Claro</span>
                    <span className="material-symbols-outlined text-primary text-xl font-bold">check_circle</span>
                  </div>
                  <div className="w-full h-8 bg-surface-container-low rounded-lg p-1.5 flex flex-col justify-center gap-1">
                    <div className="w-3/4 h-1.5 bg-primary-container rounded-full"></div>
                    <div className="w-1/2 h-1.5 bg-surface-container-high rounded-full"></div>
                  </div>
                  <span className="text-[11px] font-bold text-primary mt-1">Activo por defecto</span>
                </div>

                {/* Dark Theme Card */}
                <div className="p-4 rounded-2xl border border-surface-container-high bg-slate-800 text-white shadow-xs flex flex-col gap-2 opacity-75">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-bold">Modo Oscuro</span>
                    <span className="w-4 h-4 rounded-full border border-slate-500"></span>
                  </div>
                  <div className="w-full h-8 bg-slate-700 rounded-lg p-1.5 flex flex-col justify-center gap-1">
                    <div className="w-3/4 h-1.5 bg-indigo-400 rounded-full"></div>
                    <div className="w-1/2 h-1.5 bg-slate-600 rounded-full"></div>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1">Próxima versión</span>
                </div>
              </div>
            </div>

            {/* Typography size selector */}
            <div className="pt-2">
              <span className="font-label-md text-label-md font-bold text-on-surface block mb-2">TAMAÑO DE TIPOGRAFÍA</span>
              <div className="grid grid-cols-3 gap-2">
                {['Compacto', 'Estándar', 'Amplio'].map((size, idx) => {
                  const key = idx === 0 ? 'compact' : idx === 1 ? 'standard' : 'large';
                  const isSel = typographySize === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setTypographySize(key)}
                      className={`py-2.5 rounded-xl font-label-md text-label-md font-bold transition-all ${
                        isSel 
                          ? 'bg-primary-container text-on-primary shadow-xs' 
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {size} {idx === 1 && '(Recomendado)'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Titles Vault, Diamond League, Security */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Titles Vault */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl material-symbols-fill">military_tech</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Bóveda de Títulos</h3>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Coleccionables de honor desbloqueados</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm font-bold text-on-surface">
                3 / 12
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="p-3.5 rounded-2xl bg-primary-fixed/30 border border-primary-fixed flex items-center justify-between">
                <div>
                  <div className="font-label-md text-label-md font-black text-on-surface">Explorador Imparable</div>
                  <div className="text-[11px] text-on-surface-variant">Por mantener rachas de 10+ días en 3 categorías</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[10px] font-black uppercase">
                  EQUIPADO
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <div className="font-label-md text-label-md font-bold text-on-surface">Guerrero del Alba</div>
                  <div className="text-[11px] text-on-surface-variant">5 hábitos completados antes de las 8 AM</div>
                </div>
                <button 
                  onClick={() => alert('¡Título Guerrero del Alba equipado!')}
                  className="font-label-sm text-label-sm text-primary font-bold hover:underline"
                >
                  Equipar
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <div className="font-label-md text-label-md font-bold text-on-surface">Maestro Zen</div>
                  <div className="text-[11px] text-on-surface-variant">21 sesiones completas de meditación</div>
                </div>
                <button 
                  onClick={() => alert('¡Título Maestro Zen equipado!')}
                  className="font-label-sm text-label-sm text-primary font-bold hover:underline"
                >
                  Equipar
                </button>
              </div>
            </div>
          </div>

          {/* Diamond League Leaderboard */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl material-symbols-fill">shield</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Liga Diamante</h3>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">Corte semanal en 2 días, 14 hrs</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-label-sm text-label-sm font-bold">
                TOP 3
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { rank: 1, name: 'Diego Morales', streak: '38 días', xp: '1,480 XP', isMe: false },
                { rank: 2, name: 'Sofía Herrera', streak: '19 días', xp: '1,310 XP', isMe: false },
                { rank: 3, name: `Tú (${user?.name || 'Laura Gómez'})`, streak: '14 días', xp: '1,240 XP', isMe: true },
              ].map(item => (
                <div 
                  key={item.rank}
                  className={`p-3 rounded-2xl flex items-center justify-between ${
                    item.isMe ? 'bg-primary-container text-on-primary font-bold shadow-xs' : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm w-4">{item.rank}</span>
                    <div className="w-7 h-7 rounded-full bg-surface-bright ring-1 ring-primary flex items-center justify-center text-primary font-bold text-xs">
                      {item.name[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md">{item.name}</span>
                      <span className={`text-[10px] ${item.isMe ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                        Racha de {item.streak}
                      </span>
                    </div>
                  </div>
                  <span className="font-stat-numeric text-label-lg font-black">{item.xp}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => alert('¡Enlace de invitación generado! Comparte con amigos y gana +50 gemas.')}
              className="w-full py-2.5 rounded-xl bg-surface-container-high text-primary font-label-md text-label-md font-bold hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>Invitar amigo (+50 Gemas)</span>
            </button>
          </div>

          {/* Security & Account Zone */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-surface-container-high text-on-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">security</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Zona de Seguridad & Cuenta</h3>
                <span className="font-body-sm text-[12px] text-on-surface-variant">Credenciales de inicio y privacidad</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase block">Correo Principal</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">{user?.email || 'carlos.mendoza@habitup.app'}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span> Verificado
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase block">Contraseña</span>
                  <span className="font-label-md text-label-md text-on-surface">Actualizada hace 2 meses</span>
                </div>
                <button 
                  onClick={() => alert('Para cambiar tu contraseña contacta a soporte o usa la clave demo.')}
                  className="px-3 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high"
                >
                  Cambiar
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant font-bold uppercase block">Autenticación en 2 Pasos</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">Protección vía app autenticadora</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">
                  Activo
                </span>
              </div>

              {/* Logout Button */}
              <button 
                onClick={logout}
                className="w-full mt-2 py-3 rounded-2xl bg-error-container text-on-error-container font-label-lg text-label-lg font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Cerrar Sesión</span>
              </button>

              <div className="text-center text-[11px] text-on-surface-variant pt-2">
                HabitUp Build v2.4.1 (Stable Release) • Base de datos PostgreSQL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

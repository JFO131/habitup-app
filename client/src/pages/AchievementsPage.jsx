import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

export default function AchievementsPage({ achievementsData }) {
  const { user } = useAuth();
  const [filterTab, setFilterTab] = useState('todas'); // todas, desbloqueadas, progreso, bloqueadas

  const level = user?.level || 7;
  const currentXp = user?.xp || 3450;
  const targetXp = user?.target_xp || 4000;
  const gems = user?.gems || 240;
  const streak = user?.streak_days || 14;
  const xpPercentage = Math.min(100, Math.round((currentXp / targetXp) * 100));

  const achievements = achievementsData?.achievements || [];

  const filteredAchievements = achievements.filter(a => {
    if (filterTab === 'desbloqueadas') return a.is_unlocked;
    if (filterTab === 'progreso') return !a.is_unlocked && a.progress_current > 0;
    if (filterTab === 'bloqueadas') return !a.is_unlocked && (!a.progress_current || a.progress_current === 0);
    return true;
  });

  const handleShare = () => {
    confetti({ particleCount: 40, spread: 50 });
    alert('¡Enlace de logro copiado al portapapeles para compartir con tu comunidad!');
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider font-bold">
              Temporada 2 • Ascenso
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-tertiary-container material-symbols-fill">stars</span>
              Temporada activa
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
            Logros, Niveles y Recompensas
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Convierte tu disciplina diaria en poder desbloqueable, coleccionables e insignias de maestría.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Tienda de Avatares: ¡Gemas disponibles para canjear marcos y temas!')}
            className="relative group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-surface-container-lowest text-on-surface shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
            type="button"
          >
            <div className="w-8 h-8 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-lg material-symbols-fill">diamond</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Canjear</span>
              <span className="font-label-lg text-label-lg text-on-surface leading-tight font-extrabold">Tienda de Avatares</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Gamified Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary shadow-xl p-6 md:p-8 mb-10">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-on-primary flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-base material-symbols-fill">workspace_premium</span>
                <span className="font-label-sm text-label-sm font-extrabold uppercase tracking-wider">Rango Maestro</span>
              </div>
              <span className="text-on-primary-container font-label-md text-label-md">ID Aventurero: #HU-9842</span>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="font-display-hero text-display-hero text-on-primary font-black tracking-tight leading-none">
                  Nivel {level}
                </h2>
                <span className="font-headline-md text-headline-md text-on-primary-container font-bold">
                  — {user?.title || 'Explorador Imparable'}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-primary/80 mt-1">
                A solo {Math.max(0, targetXp - currentXp)} XP de desbloquear el prestigioso título <strong className="text-on-primary font-semibold">Nivel {level + 1}: Maestro de la Constancia</strong>.
              </p>
            </div>

            {/* Glowing XP Progress Bar */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between text-on-primary font-label-md text-label-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm material-symbols-fill">bolt</span>
                  <span className="font-bold">{currentXp.toLocaleString()} XP Actuales</span>
                </div>
                <span className="text-on-primary-container">Objetivo: {targetXp.toLocaleString()} XP ({xpPercentage}%)</span>
              </div>

              <div className="relative w-full h-4 rounded-full bg-on-primary/20 overflow-hidden shadow-inner p-0.5">
                <div 
                  className="relative h-full rounded-full bg-gradient-to-r from-secondary-container via-surface-bright to-tertiary-fixed shadow-md transition-all duration-1000 ease-out" 
                  style={{ width: `${xpPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container-lowest/60 to-transparent animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-on-primary/70 font-label-sm text-label-sm mt-0.5">
                <span>Nivel {level} ({currentXp.toLocaleString()} XP)</span>
                <span className="font-bold text-on-primary">Faltan {Math.max(0, targetXp - currentXp)} XP</span>
                <span>Nivel {level + 1} ({targetXp.toLocaleString()} XP)</span>
              </div>
            </div>
          </div>

          {/* Right Metrics Cards inside Hero */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
            {/* Gem Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest/15 backdrop-blur-md text-on-primary shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/20 flex items-center justify-center text-tertiary-fixed">
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">diamond</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-primary/75 uppercase tracking-wide">Saldo de Recompensas</span>
                  <span className="font-stat-numeric text-stat-numeric text-on-primary font-black leading-none mt-0.5">{gems}</span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">Gemas</span>
            </div>

            {/* Streak Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest/15 backdrop-blur-md text-on-primary shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary-fixed">
                  <span className="material-symbols-outlined text-2xl material-symbols-fill">local_fire_department</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-primary/75 uppercase tracking-wide">Fuego de Racha Global</span>
                  <span className="font-stat-numeric text-stat-numeric text-on-primary font-black leading-none mt-0.5">{streak} Días</span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-bold">x1.5 Multi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter tabs & Achievement Catalog Cards */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Tabs bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-surface-container-lowest shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { key: 'todas', label: `Todas (${achievements.length})` },
                { key: 'desbloqueadas', label: `Desbloqueadas (${achievements.filter(a => a.is_unlocked).length})` },
                { key: 'progreso', label: 'En Progreso (4)' },
                { key: 'bloqueadas', label: 'Bloqueadas (2)' },
              ].map(tab => (
                <button 
                  key={tab.key}
                  onClick={() => setFilterTab(tab.key)}
                  className={`px-4 py-2 rounded-xl font-label-md text-label-md font-bold transition-all ${
                    filterTab === tab.key 
                      ? 'bg-primary-container text-on-primary shadow-xs' 
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pr-2 text-on-surface-variant font-label-sm text-label-sm">
              <span>Ordenar: <strong>Recientes</strong></span>
            </div>
          </div>

          {/* Achievement Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredAchievements.map(ach => {
              const isUnlocked = ach.is_unlocked;
              return (
                <div 
                  key={ach.id}
                  className={`p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 relative overflow-hidden border ${
                    isUnlocked 
                      ? 'bg-surface-container-lowest border-surface-container-high' 
                      : 'bg-surface-container-low/60 border-dashed border-outline-variant/50 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                          isUnlocked ? 'bg-tertiary-fixed text-tertiary' : 'bg-surface-container-high text-outline'
                        }`}>
                          <span className={`material-symbols-outlined text-2xl ${isUnlocked ? 'material-symbols-fill' : ''}`}>
                            {ach.icon}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                              {ach.title}
                            </h3>
                            {ach.badge_label && (
                              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[10px] font-bold">
                                {ach.badge_label}
                              </span>
                            )}
                          </div>
                          <span className="font-label-sm text-label-sm text-primary font-bold">+{ach.xp_reward} XP</span>
                        </div>
                      </div>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {ach.description}
                    </p>
                  </div>

                  {/* Bottom status */}
                  <div className="pt-3 border-t border-surface-container-high flex items-center justify-between text-label-sm font-label-sm">
                    {isUnlocked ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                        Completada
                      </span>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-3">
                        <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                          <div className="h-full bg-primary-container rounded-full" style={{ width: `${ach.progress_percent}%` }}></div>
                        </div>
                        <span className="text-on-surface-variant font-bold whitespace-nowrap">{ach.progress_current}/{ach.target_value}</span>
                      </div>
                    )}

                    {isUnlocked && (
                      <span className="text-on-surface-variant text-[11px]">
                        +{ach.gems_reward || 15} Gemas
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Latest Unlocked Showcase & Trophy Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Latest Unlocked Showcase Card */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-4 relative overflow-hidden">
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-extrabold uppercase tracking-wider">
              ⚡ ¡ÚLTIMO LOGRO DESBLOQUEADO!
            </span>

            {/* Big Trophy Image / Badge */}
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-tertiary-fixed via-surface-bright to-tertiary flex items-center justify-center shadow-lg relative my-2">
              <span className="material-symbols-outlined text-5xl text-on-primary material-symbols-fill">wb_sunny</span>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-lg font-bold">check</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-headline-md text-headline-md font-extrabold text-on-surface tracking-tight">
                Guerrero Matutino
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
                ¡Constancia legendaria! Despertaste temprano y completaste tu ritual matutino 7 días sin fallar.
              </p>
            </div>

            {/* Reward badges */}
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-surface-container-low w-full justify-around font-label-md text-label-md">
              <div className="flex items-center gap-1.5 text-primary font-bold">
                <span className="material-symbols-outlined text-lg material-symbols-fill">bolt</span>
                <span>+100 XP Acreditados</span>
              </div>
              <div className="flex items-center gap-1 text-tertiary font-bold">
                <span className="material-symbols-outlined text-lg material-symbols-fill">diamond</span>
                <span>+15 Gemas</span>
              </div>
            </div>

            <button 
              onClick={handleShare}
              className="w-full py-3 rounded-2xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              <span>Compartir Logro con Amigos</span>
            </button>
          </div>

          {/* Trophy Stats Bento */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Estadísticas de Trofeos</h3>
              <span className="material-symbols-outlined text-primary">insights</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">EFECTIVIDAD</span>
                <span className="font-display-hero text-headline-lg font-black text-on-surface">45%</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">18 de 40 totales</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase">XP OBTENIDA</span>
                <span className="font-display-hero text-headline-lg font-black text-primary">+2.4k</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">Vía insignias</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between text-label-sm font-label-sm mb-1.5">
                <span className="text-on-surface-variant">Progreso hacia Nivel 8:</span>
                <span className="font-bold text-on-surface">3,450 / 4,000 XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full rounded-full bg-primary-container" style={{ width: '86%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

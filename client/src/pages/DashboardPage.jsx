import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage({ habits, stats, onToggleHabit, onOpenNewHabit, onNavigateHabits }) {
  const { user, updateUser } = useAuth();
  const [filterTab, setFilterTab] = useState('todos'); // todos, pendientes, hechos

  const handleToggle = async (habit) => {
    try {
      const res = await onToggleHabit(habit.id);
      if (res.is_completed_today) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
      if (res.user) {
        updateUser(res.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pendingHabits = habits.filter(h => !h.is_completed_today);
  const completedHabits = habits.filter(h => h.is_completed_today);

  const displayedHabits = filterTab === 'todos' 
    ? habits 
    : filterTab === 'pendientes' 
      ? pendingHabits 
      : completedHabits;

  const level = user?.level || 7;
  const currentXp = user?.xp || 3450;
  const targetXp = user?.target_xp || 4000;
  const streak = user?.streak_days || 14;
  const gems = user?.gems || 240;
  const xpPercentage = Math.min(100, Math.round((currentXp / targetXp) * 100));

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Greeting & Momentum Summary */}
      <section className="w-full mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Lunes, 24 de Octubre
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Sincronizado en tiempo real</span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight flex items-center gap-2">
              ¡Buenos días, {user?.name ? user.name.split(' ')[0] : 'Laura'}! <span className="inline-block hover:rotate-12 transition-transform duration-300 origin-bottom-right">👋</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Hoy tienes <span className="font-semibold text-on-surface">{habits.length} hábitos programados</span>. Ya completaste <span className="font-bold text-primary">{completedHabits.length}</span> (<span className="font-bold text-secondary">{habits.length > 0 ? Math.round((completedHabits.length / habits.length) * 100) : 0}%</span> del día).
            </p>
          </div>

          {/* Quick Action Pill Group */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button 
              onClick={onNavigateHabits}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container transition-all" 
              type="button"
            >
              <span className="material-symbols-outlined text-base text-primary">tune</span>
              <span>Ajustar Rutinas</span>
            </button>
            <button 
              onClick={onOpenNewHabit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:opacity-95 active:scale-95 transition-all" 
              type="button"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>Ver Desafío Semanal</span>
            </button>
          </div>
        </div>

        {/* 4 Key Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1: Streak */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-tertiary-fixed/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Racha Activa</span>
              <span className="p-2 rounded-xl bg-tertiary-fixed text-tertiary">
                <span className="material-symbols-outlined text-xl material-symbols-fill">local_fire_department</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-display-hero text-display-hero text-on-surface leading-none tabular-nums font-black">{streak}</span>
              <span className="font-headline-sm text-headline-sm text-tertiary font-bold">Días</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-tertiary-fixed/40 text-tertiary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-xs">auto_awesome</span>
              <span>¡Tu mejor racha personal!</span>
            </div>
          </div>

          {/* Card 2: Level & XP */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-fixed/40 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Rango de Progresión</span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
                +150 XP hoy
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-1 text-on-surface">
              <span className="material-symbols-outlined text-xl text-primary material-symbols-fill">bolt</span>
              <h2 className="font-headline-sm text-headline-sm font-extrabold tracking-tight">Nivel {level} • Explorador</h2>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm mb-1.5 tabular-nums">
                <span className="font-semibold text-on-surface">{currentXp.toLocaleString()} XP</span>
                <span>{targetXp.toLocaleString()} XP (Nivel {level + 1})</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full rounded-full bg-primary-container transition-all duration-1000 ease-out" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>
          </div>

          {/* Card 3: Weekly Consistency Rate */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary-fixed/50 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Tasa Semanal</span>
              <span className="p-2 rounded-xl bg-surface-container-high text-secondary">
                <span className="material-symbols-outlined text-xl material-symbols-fill">trending_up</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-display-hero text-display-hero text-on-surface leading-none font-black">86%</span>
              <span className="font-label-sm text-label-sm text-secondary font-bold inline-flex items-center">
                <span className="material-symbols-outlined text-sm">arrow_upward</span> +4% vs sem. ant.
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              19 de 22 hábitos completados a tiempo.
            </p>
          </div>

          {/* Card 4: Gem Vault */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary-container/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Bóveda de Gemas</span>
              <span className="p-2 rounded-xl bg-secondary-fixed text-secondary">
                <span className="material-symbols-outlined text-xl material-symbols-fill">diamond</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-display-hero text-display-hero text-on-surface leading-none tabular-nums font-black">{gems}</span>
              <span className="font-headline-sm text-headline-sm text-secondary font-bold">Gemas</span>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
              <span>Canjeables en tienda</span>
              <span className="text-secondary font-label-sm text-label-sm font-bold flex items-center gap-0.5">
                Canjear <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Habits Stream & Routine Companion) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Header of Habits list */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-lowest shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">tune</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">Hábitos de Hoy</h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {completedHabits.length} finalizados • {pendingHabits.length} pendientes de registrar
                </span>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low">
              <button 
                onClick={() => setFilterTab('todos')}
                className={`px-3 py-1 rounded-lg font-label-md text-label-md font-bold transition-all ${
                  filterTab === 'todos' 
                    ? 'bg-primary-container text-on-primary shadow-xs' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Todos ({habits.length})
              </button>
              <button 
                onClick={() => setFilterTab('pendientes')}
                className={`px-3 py-1 rounded-lg font-label-md text-label-md font-bold transition-all ${
                  filterTab === 'pendientes' 
                    ? 'bg-primary-container text-on-primary shadow-xs' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Pendientes ({pendingHabits.length})
              </button>
              <button 
                onClick={() => setFilterTab('hechos')}
                className={`px-3 py-1 rounded-lg font-label-md text-label-md font-bold transition-all ${
                  filterTab === 'hechos' 
                    ? 'bg-primary-container text-on-primary shadow-xs' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Hechos ({completedHabits.length})
              </button>
            </div>
          </div>

          {/* Pending Habits Section */}
          {pendingHabits.length > 0 && (filterTab === 'todos' || filterTab === 'pendientes') && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                    Pendientes por Realizar
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  +{pendingHabits.reduce((acc, h) => acc + (h.xp_reward || 30), 0)} XP disponibles
                </span>
              </div>

              {pendingHabits.map(habit => {
                const isSalud = habit.category === 'salud';
                const isMente = habit.category === 'mente';
                const isFitness = habit.category === 'fitness';
                const isDescanso = habit.category === 'descanso';
                const icon = isSalud ? 'water_drop' : isMente ? 'psychology' : isFitness ? 'directions_run' : isDescanso ? 'bedtime' : 'menu_book';
                const iconBg = isSalud ? 'bg-secondary-fixed text-secondary' : isMente ? 'bg-primary-fixed text-primary' : isFitness ? 'bg-tertiary-fixed text-tertiary' : isDescanso ? 'bg-surface-variant text-secondary-container' : 'bg-primary-fixed text-primary';

                return (
                  <div 
                    key={habit.id}
                    className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                        <span className="material-symbols-outlined text-2xl">{icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                            {habit.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-[10px] font-bold">
                            🔥 {habit.current_streak || 0}d
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span> {habit.target_time || 'Diario'}
                          </span>
                          <span>•</span>
                          <span className="text-primary font-semibold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-sm material-symbols-fill">bolt</span> +{habit.xp_reward} XP
                          </span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded-md bg-surface-container-low font-label-sm text-[11px]">
                            {habit.subcategory || habit.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleToggle(habit)}
                      className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-md shadow-primary-container/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 self-end sm:self-auto"
                    >
                      <span className="material-symbols-outlined text-base">check</span>
                      <span>Completar (+{habit.xp_reward} XP)</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Completed Habits Section */}
          {completedHabits.length > 0 && (filterTab === 'todos' || filterTab === 'hechos') && (
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                    Completados Hoy ({completedHabits.length} de {habits.length})
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-emerald-600 font-bold">
                  ¡Excelente constancia!
                </span>
              </div>

              {completedHabits.map(habit => {
                const isSalud = habit.category === 'salud';
                const isMente = habit.category === 'mente';
                const isFitness = habit.category === 'fitness';
                const icon = isSalud ? 'water_drop' : isMente ? 'psychology' : isFitness ? 'directions_run' : 'check_circle';

                return (
                  <div 
                    key={habit.id}
                    className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-surface-container-high shadow-xs flex items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl material-symbols-fill">{icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold line-through opacity-80">
                            {habit.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-[10px] font-bold">
                            🔥 {habit.current_streak}d
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          +{habit.xp_reward} XP ganado hoy
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleToggle(habit)}
                      className="w-9 h-9 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-xs hover:opacity-90 transition-all shrink-0"
                      title="Desmarcar hábito"
                    >
                      <span className="material-symbols-outlined text-lg font-bold">check</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Routine Companion Banner Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <div className="flex flex-col gap-3 max-w-md">
              <span className="font-label-sm text-label-sm text-primary font-extrabold uppercase tracking-wider">
                Compañera de Rutina
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight leading-snug">
                La consistencia matutina acelera un 40% tus hábitos nocturnos
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Completar tus primeros 3 hitos antes de mediodía reduce la fricción cognitiva vespertina. ¡Estás encaminada al 100% de cumplimiento hoy!
              </p>
              <div className="flex items-center gap-2 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-secondary-fixed ring-2 ring-surface-container-lowest"></div>
                  <div className="w-6 h-6 rounded-full bg-tertiary-fixed ring-2 ring-surface-container-lowest"></div>
                </div>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  Laura y 1,420 usuarios completaron su meta matutina
                </span>
              </div>
            </div>

            <div className="relative w-full md:w-64 h-40 rounded-2xl overflow-hidden shrink-0 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80"
                alt="Workspace desk with coffee and laptop" 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-[11px] font-bold text-on-surface shadow-xs">
                Ritmo Óptimo
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Calendar, Recent Achievements, Quote, Flash Challenge) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Week Calendar Card */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-on-surface font-headline-sm text-headline-sm font-extrabold">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                <span>Semana Actual</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold">86% global</span>
            </div>

            {/* Days pills */}
            <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-label-sm font-bold">
              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
                <div key={d} className="text-on-surface-variant">{d}</div>
              ))}
              {[24, 25, 26, 27, 28, 29, 30].map((num, i) => {
                const isSelected = num === 24;
                return (
                  <div 
                    key={num}
                    className={`py-2 rounded-xl flex flex-col items-center justify-center font-bold ${
                      isSelected 
                        ? 'bg-primary-container text-on-primary shadow-xs' 
                        : 'text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{num}</span>
                    {isSelected && <span className="w-1 h-1 rounded-full bg-secondary-fixed mt-0.5"></span>}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-surface-container-high flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-sm">verified</span>
                <span>Promedio de puntualidad</span>
              </span>
              <span className="font-bold text-on-surface">94.2%</span>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-on-surface font-headline-sm text-headline-sm font-extrabold">
                <span className="material-symbols-outlined text-tertiary">military_tech</span>
                <span>Logros Recientes</span>
              </div>
              <button 
                onClick={() => onNavigateHabits('achievements')}
                className="font-label-sm text-label-sm text-primary font-bold hover:underline"
              >
                Ver todos (18)
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl material-symbols-fill">wb_sunny</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Guerrero Matutino</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Desbloqueado hace 2 días</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-tertiary">+100 XP</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl material-symbols-fill">water_drop</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Hidratación Nivel 3</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Desbloqueado ayer</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-secondary">+75 XP</span>
              </div>
            </div>
          </div>

          {/* Daily Wisdom Card */}
          <div className="p-6 rounded-2xl bg-primary-fixed/30 border border-primary-fixed flex flex-col gap-3">
            <div className="flex items-center justify-between text-primary">
              <span className="font-label-sm text-label-sm font-extrabold uppercase tracking-wider flex items-center gap-1">
                <span>❝</span> SABIDURÍA DIARIA
              </span>
              <span className="material-symbols-outlined text-lg">psychology</span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface font-extrabold leading-snug">
              “No nos elevamos al nivel de nuestras metas; caemos al nivel de nuestros sistemas.”
            </p>
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
              <span>— James Clear, Hábitos Atómicos</span>
              <button className="text-primary hover:opacity-80" title="Compartir cita">
                <span className="material-symbols-outlined text-base">share</span>
              </button>
            </div>
          </div>

          {/* Flash Challenge */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl material-symbols-fill">casino</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-surface">Reto Relámpago</span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">Completa la lectura y gana +20 gemas extra</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </div>
        </div>
      </div>
    </div>
  );
}

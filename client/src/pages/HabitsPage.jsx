import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';

export default function HabitsPage({ habits, onToggleHabit, onOpenNewHabit, onDeleteHabit }) {
  const { updateUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos'); // todos, activos, completados, pausados
  const [categoryFilter, setCategoryFilter] = useState('all'); // all, salud, mente, fitness, descanso, productividad
  const [activeMenuId, setActiveMenuId] = useState(null);

  const completedCount = habits.filter(h => h.is_completed_today).length;
  const totalCount = habits.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

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

  const filteredHabits = habits.filter(h => {
    // Search
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (h.subcategory && h.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category
    const matchesCategory = categoryFilter === 'all' || h.category === categoryFilter;

    // Status
    let matchesStatus = true;
    if (statusFilter === 'completados') matchesStatus = !!h.is_completed_today;
    if (statusFilter === 'activos') matchesStatus = !h.is_completed_today && h.is_active;
    if (statusFilter === 'pausados') matchesStatus = !h.is_active;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    { key: 'all', label: 'Todas', icon: null },
    { key: 'salud', label: 'Salud', icon: 'water_drop', color: 'text-secondary' },
    { key: 'mente', label: 'Mente', icon: 'psychology', color: 'text-primary' },
    { key: 'fitness', label: 'Fitness', icon: 'directions_run', color: 'text-tertiary' },
    { key: 'descanso', label: 'Descanso', icon: 'bedtime', color: 'text-secondary-container' },
    { key: 'productividad', label: 'Productividad', icon: 'timer', color: 'text-primary-fixed-dim' },
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Management Control Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm tracking-wider uppercase font-bold">
              Rendimiento Personal
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Ciclo Activo #42</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">Gestión de Hábitos</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Construye constancia diaria, acumula experiencia y desbloquea multiplicadores de racha.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Stats Pill Badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-surface-container-lowest shadow-sm">
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="material-symbols-outlined text-lg material-symbols-fill">local_fire_department</span>
              <span className="font-stat-numeric text-headline-sm text-tertiary font-extrabold">{totalCount}</span>
            </div>
            <div className="w-px h-6 bg-surface-container-high"></div>
            <div className="flex flex-col leading-none">
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">Hábitos Hoy</span>
              <span className="font-label-md text-label-md text-on-surface font-bold">
                {completedCount}/{totalCount} Listos ({percentage}%)
              </span>
            </div>
          </div>

          {/* Create Button Trigger */}
          <button 
            onClick={onOpenNewHabit}
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-lg shadow-primary-container/25 hover:shadow-xl hover:opacity-95 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-xl">add_circle</span>
            <span>Nuevo Hábito</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Deck */}
      <div className="flex flex-col gap-4 p-5 rounded-2xl bg-surface-container-lowest shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search field */}
          <div className="relative w-full md:w-96 flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-xl pointer-events-none">search</span>
            <input 
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
              placeholder="Buscar por hábito, tag o momento..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Segmented Controls */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low w-full md:w-auto overflow-x-auto">
            {[
              { key: 'todos', label: `Todos (${habits.length})` },
              { key: 'activos', label: `Activos (${habits.filter(h => !h.is_completed_today).length})` },
              { key: 'completados', label: `Completados (${completedCount})` },
              { key: 'pausados', label: 'Pausados (0)' },
            ].map(tab => (
              <button 
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap ${
                  statusFilter === tab.key 
                    ? 'bg-surface-container-lowest text-primary shadow-xs font-bold' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold mr-1 shrink-0">Categoría:</span>
          {categories.map(cat => {
            const isSelected = categoryFilter === cat.key;
            return (
              <button 
                key={cat.key}
                onClick={() => setCategoryFilter(cat.key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-label-md shrink-0 transition-all ${
                  isSelected 
                    ? 'bg-primary-container text-on-primary font-semibold shadow-xs' 
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                {cat.icon && <span className={`material-symbols-outlined text-sm ${isSelected ? 'text-on-primary' : cat.color}`}>{cat.icon}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Habits Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHabits.map((habit) => {
          const isSalud = habit.category === 'salud';
          const isMente = habit.category === 'mente';
          const isFitness = habit.category === 'fitness';
          const isDescanso = habit.category === 'descanso';

          const icon = isSalud ? 'water_drop' : isMente ? 'psychology' : isFitness ? 'directions_run' : isDescanso ? 'bedtime' : 'timer';
          const iconBg = isSalud ? 'bg-secondary-fixed text-secondary' : isMente ? 'bg-primary-fixed text-primary' : isFitness ? 'bg-tertiary-fixed text-tertiary' : isDescanso ? 'bg-surface-variant text-secondary-container' : 'bg-primary-fixed text-primary';
          const isDone = habit.is_completed_today;

          return (
            <article 
              key={habit.id}
              className="habit-card group flex flex-col justify-between p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <div>
                {/* Header zone: Category & Options */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shadow-xs shrink-0`}>
                      <span className="material-symbols-outlined text-2xl material-symbols-fill">{icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[10px] text-primary font-bold uppercase tracking-wider">
                        {habit.category} • {habit.subcategory || 'RUTINA'}
                      </span>
                      <h3 className={`font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight ${isDone ? 'line-through opacity-75' : ''}`}>
                        {habit.name}
                      </h3>
                    </div>
                  </div>

                  {/* 3 dots menu */}
                  <div className="relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === habit.id ? null : habit.id)}
                      className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">more_vert</span>
                    </button>
                    {activeMenuId === habit.id && (
                      <div className="absolute right-0 top-8 w-36 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high py-1 z-20">
                        <button 
                          onClick={() => {
                            onDeleteHabit(habit.id);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3 py-1.5 text-left font-label-md text-label-md text-error hover:bg-surface-container-low flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                          <span>Eliminar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subinfo pills: streak, time, days */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-bold">
                    <span className="material-symbols-outlined text-xs material-symbols-fill">local_fire_department</span>
                    <span>{habit.current_streak || 0} DÍAS</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    <span>{habit.target_time || 'Diario'}</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
                    {Array.isArray(habit.frequency_days) ? habit.frequency_days.join(' • ') : 'L • M • X • J • V'}
                  </span>
                </div>

                {/* Progress bar visual */}
                <div className="flex flex-col gap-1.5 mb-6">
                  <div className="flex items-center justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">
                      {isDone ? 'Meta completada al 100%' : 'Progreso de la sesión'}
                    </span>
                    <span className="font-bold text-on-surface">
                      {isDone ? '100%' : 'Pendiente'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isDone ? 'bg-secondary' : 'bg-primary-container'}`}
                      style={{ width: isDone ? '100%' : '35%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-sm material-symbols-fill">bolt</span>
                  +{habit.xp_reward} XP
                </span>

                <button 
                  onClick={() => handleToggle(habit)}
                  className={`px-4 py-2 rounded-xl font-label-md text-label-md font-bold transition-all flex items-center gap-1.5 ${
                    isDone 
                      ? 'bg-secondary text-on-secondary shadow-xs hover:opacity-90' 
                      : 'bg-primary-container text-on-primary shadow-md shadow-primary-container/20 hover:opacity-95 active:scale-95'
                  }`}
                >
                  <span className="material-symbols-outlined text-base font-bold">
                    {isDone ? 'check' : 'add_task'}
                  </span>
                  <span>{isDone ? 'Completado' : 'Marcar Hecho'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Multiplier active banner at bottom */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl text-tertiary-fixed material-symbols-fill">local_fire_department</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-headline-sm font-extrabold tracking-tight">
              ¡Multiplicador de Racha Activo: 1.5x XP!
            </h3>
            <p className="font-body-md text-body-md text-on-primary/80 mt-0.5">
              Completa 2 hábitos más el día de hoy para mantener tu racha invicta de 14 días y ganar un cofre dorado.
            </p>
          </div>
        </div>

        <button 
          onClick={onOpenNewHabit}
          className="px-6 py-3 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg font-extrabold shadow-md hover:bg-surface-container-low transition-all shrink-0 active:scale-95"
        >
          Agregar Nueva Meta
        </button>
      </div>
    </div>
  );
}

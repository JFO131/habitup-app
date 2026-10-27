import React, { useState } from 'react';

export default function NewHabitModal({ isOpen, onClose, onHabitCreated }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('salud');
  const [selectedDays, setSelectedDays] = useState(['L', 'M', 'X', 'J', 'V']);
  const [timeOfDay, setTimeOfDay] = useState('manana');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const categories = [
    { key: 'salud', label: 'Salud', icon: 'water_drop', activeBg: 'bg-secondary-fixed text-secondary' },
    { key: 'mente', label: 'Mente', icon: 'psychology', activeBg: 'bg-primary-fixed text-primary' },
    { key: 'fitness', label: 'Fitness', icon: 'directions_run', activeBg: 'bg-tertiary-fixed text-tertiary' },
    { key: 'descanso', label: 'Descanso', icon: 'bedtime', activeBg: 'bg-surface-variant text-on-surface' },
    { key: 'productividad', label: 'Productividad', icon: 'timer', activeBg: 'bg-surface-container-high text-primary-container' },
  ];

  const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const toggleDay = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, introduce un nombre para el hábito.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await onHabitCreated({
        name: name.trim(),
        category,
        frequency_days: selectedDays,
        time_of_day: timeOfDay,
        xp_reward: 35
      });
      setName('');
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar el hábito.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-surface-container-lowest shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 translate-x-0">
          <div>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-surface-container-high">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-2xl">add_task</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">Nuevo Hábito</h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Configura tu nueva rutina diaria</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form id="createHabitForm" onSubmit={handleSubmit} className="flex flex-col gap-6 pt-6">
              {/* Habit Name */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider" htmlFor="habitName">
                  Nombre del Hábito
                </label>
                <input 
                  id="habitName"
                  className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all"
                  placeholder="Ej. Lectura diaria, 2L de Agua..." 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              {/* Category Picker */}
              <div className="flex flex-col gap-2.5">
                <label className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                  Categoría
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {categories.map(cat => {
                    const isSelected = category === cat.key;
                    return (
                      <button 
                        key={cat.key}
                        type="button"
                        onClick={() => setCategory(cat.key)}
                        className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                          isSelected 
                            ? `${cat.activeBg} shadow-xs font-bold`
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-2xl ${isSelected ? 'material-symbols-fill' : ''}`}>
                          {cat.icon}
                        </span>
                        <span className="font-label-sm text-[11px] font-bold">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Frequency */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">Frecuencia</label>
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    {selectedDays.length} días seleccionados
                  </span>
                </div>
                <div className="flex items-center justify-between gap-1.5 p-1.5 rounded-2xl bg-surface-container-low">
                  {daysOfWeek.map(d => {
                    const isSelected = selectedDays.includes(d);
                    return (
                      <button 
                        key={d}
                        type="button"
                        onClick={() => toggleDay(d)}
                        className={`w-10 h-10 rounded-xl font-label-md text-label-md font-bold transition-all ${
                          isSelected
                            ? 'bg-primary-container text-on-primary shadow-xs'
                            : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time of Day */}
              <div className="flex flex-col gap-2.5">
                <label className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                  Horario / Momento del Día
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { key: 'manana', label: 'Mañana', icon: 'wb_sunny' },
                    { key: 'tarde', label: 'Tarde', icon: 'wb_twilight' },
                    { key: 'noche', label: 'Noche', icon: 'dark_mode' },
                  ].map(t => {
                    const isSelected = timeOfDay === t.key;
                    return (
                      <button 
                        key={t.key}
                        type="button"
                        onClick={() => setTimeOfDay(t.key)}
                        className={`p-3 rounded-2xl flex items-center justify-center gap-2 font-label-md text-label-md font-bold transition-all ${
                          isSelected
                            ? 'bg-secondary-fixed text-secondary shadow-xs'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gamified XP Reward Preview */}
              <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-xl material-symbols-fill">bolt</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">Recompensa Base</span>
                    <span className="font-headline-sm text-headline-sm text-tertiary font-extrabold">+35 XP / Sesión</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold shadow-xs">
                  <span className="material-symbols-outlined text-xs">trending_up</span> Multiplicador 1.5x
                </div>
              </div>
            </form>
          </div>

          {/* Action Footer */}
          <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center gap-3">
            <button 
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-1/3 py-3 rounded-2xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-lg text-label-lg font-bold"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              form="createHabitForm"
              disabled={loading}
              className="w-2/3 py-3 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-lg shadow-primary-container/25 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Guardando...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">save</span>
                  <span>Guardar Hábito</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

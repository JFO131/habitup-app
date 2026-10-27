import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ currentPath, setCurrentPath, onOpenNewHabit, mobileOpen, setMobileOpen }) {
  const { user } = useAuth();

  const navItems = [
    { path: 'dashboard', label: 'Inicio', icon: 'dashboard' },
    { path: 'habits', label: 'Mis Hábitos', icon: 'check_circle' },
    { path: 'progress', label: 'Progreso', icon: 'monitoring' },
    { path: 'achievements', label: 'Logros', icon: 'military_tech' },
    { path: 'profile', label: 'Perfil', icon: 'manage_accounts' },
  ];

  const level = user?.level || 7;
  const currentXp = user?.xp || 3450;
  const targetXp = user?.target_xp || 4000;
  const streakDays = user?.streak_days || 14;
  const xpPercentage = Math.min(100, Math.round((currentXp / targetXp) * 100));

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-6 px-4 transition-transform duration-300 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col gap-6">
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 px-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_16px_rgba(88,67,224,0.28)] shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[22px] material-symbols-fill">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">HabitUp</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">Evolución Diaria</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    setCurrentPath(item.path);
                    if (setMobileOpen) setMobileOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all group text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold shadow-md shadow-primary-container/20'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${isActive ? 'material-symbols-fill' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="font-label-lg text-label-lg">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Player Level Card */}
        <div className="flex flex-col gap-3 p-4 bg-surface-container-low rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary">
              <span className="material-symbols-outlined text-sm font-bold material-symbols-fill">local_fire_department</span>
              <span className="font-label-sm text-label-sm font-bold uppercase">{streakDays} DÍAS</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Nivel {level}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                {user?.title || 'Habit Master'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{xpPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary-container transition-all duration-700 ease-out"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm mt-0.5 tabular-nums">
              <span>{currentXp.toLocaleString()} XP</span>
              <span>{targetXp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

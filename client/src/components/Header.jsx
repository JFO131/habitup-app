import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header({ currentPath, onOpenNewHabit, onToggleMobileMenu }) {
  const { user } = useAuth();

  const pathTitles = {
    dashboard: 'Panel Activo',
    habits: 'Gestión de Hábitos',
    progress: 'Progreso y Métricas',
    achievements: 'Logros y Trofeos',
    profile: 'Perfil y Cuenta',
  };

  const level = user?.level || 7;
  const avatarUrl = user?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUOkeg1TR9-Gw7kAsCQfohpEDWJCT2lDE7OL-2Uk-QNF8T-ZaHIe7hg8RlTW0lx9AQiSv9jCNOvnqCMbqHWBf83HyNEmC01Pb5N5wtxwMoscYp7cPh6SH4TpxtVL6ulrhvo1nTWIwLnvOTauV0JqA8NZsZcALmrd4muLHzexOobEzA3ZzPM4fhUbSNsgfihC3wG75jjvgEfC_RUl5ny6YWr_Kv_FisfxtLK58h3On3Pfpz0r5ek96kBw';

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-8">
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container-high transition-colors"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div className="flex items-center text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
          <span className="text-on-surface-variant hidden sm:inline">HabitUp</span>
          <span className="material-symbols-outlined text-sm mx-1 hidden sm:inline">chevron_right</span>
          <span className="text-primary font-bold">{pathTitles[currentPath] || 'Panel Activo'}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="relative hidden md:flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg pointer-events-none">search</span>
          <input 
            className="w-56 lg:w-64 h-9 pl-9 pr-3 rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
            placeholder="Buscar hábitos, tags..." 
            type="text"
          />
        </div>

        {/* Notifications Icon with Red Dot */}
        <button 
          className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" 
          type="button"
          aria-label="Notificaciones"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
        </button>

        {/* New Habit Quick Button */}
        <button 
          onClick={onOpenNewHabit}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-95 transition-all" 
          type="button"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="hidden sm:inline">Nuevo Hábito</span>
        </button>

        {/* Avatar with Level Badge */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <div className="relative flex items-center">
            <img 
              alt={user?.name || 'Laura Gómez'} 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container/30" 
              src={avatarUrl}
            />
            <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-primary-container text-on-primary font-label-sm text-[10px] leading-tight font-extrabold">
              {level}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

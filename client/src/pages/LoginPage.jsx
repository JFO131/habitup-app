import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage({ onNavigateRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('carlos.mendoza@habitup.app');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen relative flex flex-col justify-between selection:bg-primary-container selection:text-on-primary">
      {/* Background ambient light orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-primary-fixed opacity-40 blur-[130px] rounded-full"></div>
        <div className="absolute -bottom-[20%] right-[10%] w-[500px] h-[450px] bg-surface-variant opacity-50 blur-[140px] rounded-full"></div>
      </div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_16px_rgba(88,67,224,0.28)] group-hover:scale-95 transition-transform duration-200">
              <span className="material-symbols-outlined text-on-primary text-[20px] material-symbols-fill">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none tracking-tight">HabitUp</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase mt-0.5">Evolución Diaria</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline font-body-sm text-body-sm text-on-surface-variant">¿Nuevo aquí o necesitas ayuda?</span>
            <button
              onClick={onNavigateRegister}
              className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-all font-label-md text-label-md flex items-center gap-2"
              type="button"
            >
              <span>Crear cuenta</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-10 relative z-10">
        <div className="flex flex-col w-full max-w-7xl mx-auto py-4">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Panel: Auth Form */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-10 shadow-xl shadow-on-surface/5 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-24 -left-24 w-56 h-56 bg-primary-fixed opacity-30 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  {/* Brand badge */}
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/30">
                      <span className="material-symbols-outlined text-on-primary text-[22px] material-symbols-fill">check_circle</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">HabitUp</span>
                      <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase mt-0.5 font-bold">Evolución Diaria</span>
                    </div>
                  </div>

                  {/* Title & subtitle */}
                  <div className="space-y-1 mb-6">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                      ¡Qué bueno verte de nuevo!
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Ingresa a tu cuenta para continuar tu racha de hábitos y reclamar tus recompensas diarias de XP.
                    </p>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <button 
                      type="button"
                      className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-surface-container-low hover:bg-surface-container transition-all duration-200 rounded-xl text-on-surface group"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                      </svg>
                      <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Google</span>
                    </button>

                    <button 
                      type="button"
                      className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-surface-container-low hover:bg-surface-container transition-all duration-200 rounded-xl text-on-surface group"
                    >
                      <svg className="w-5 h-5 flex-shrink-0 fill-current text-on-surface group-hover:text-primary transition-colors" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.6-0.73 1-1.74.89-2.75-.86.04-1.9.58-2.51 1.3-.54.63-.99 1.66-.86 2.64.96.08 1.9-.47 2.48-1.19z"></path>
                      </svg>
                      <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Apple</span>
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="relative flex items-center justify-center mb-5">
                    <div className="w-full h-px bg-surface-variant"></div>
                    <span className="absolute px-3 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant">
                      o ingresa con tu correo
                    </span>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm">
                      {error}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="login-email">
                        Correo electrónico
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">mail</span>
                        <input 
                          id="login-email"
                          className="w-full h-12 pl-11 pr-4 bg-surface-container-low text-on-surface rounded-xl font-body-md text-body-md shadow-sm outline-none transition-all duration-200 focus:bg-surface-bright focus:ring-2 focus:ring-primary-container"
                          placeholder="tu.nombre@ejemplo.com"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="login-password">
                          Contraseña
                        </label>
                        <a href="#recuperar" onClick={(e) => { e.preventDefault(); alert('Usa la contraseña demo: password123'); }} className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors">
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock</span>
                        <input 
                          id="login-password"
                          className="w-full h-12 pl-11 pr-11 bg-surface-container-low text-on-surface rounded-xl font-body-md text-body-md shadow-sm outline-none transition-all duration-200 focus:bg-surface-bright focus:ring-2 focus:ring-primary-container"
                          placeholder="Introduce tu contraseña"
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-outline hover:text-on-surface transition-colors p-1 flex items-center justify-center rounded-lg"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-xl text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[16px]">verified_user</span>
                      <span className="font-body-sm text-body-sm">Credenciales seguras cifradas de extremo a extremo.</span>
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input 
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-primary accent-primary cursor-pointer transition-colors"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                          Recordar mi sesión en este dispositivo
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-lg shadow-primary-container/25 hover:shadow-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Ingresando...</span>
                      ) : (
                        <>
                          <span>Iniciar sesión</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Register prompt */}
                  <div className="text-center mt-6">
                    <span className="font-body-md text-body-md text-on-surface-variant">¿No tienes una cuenta en HabitUp? </span>
                    <button 
                      onClick={onNavigateRegister}
                      className="font-label-md text-label-md text-primary font-bold hover:underline"
                    >
                      Regístrate gratis
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Gamified Showcase Card */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary p-8 sm:p-12 shadow-2xl flex flex-col justify-between min-h-[580px]">
                {/* Ambient glow halos */}
                <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none"></div>
                <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/20 blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Season Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-on-primary text-label-sm font-bold uppercase tracking-wider self-start shadow-sm">
                    <span className="material-symbols-outlined text-sm material-symbols-fill text-tertiary-fixed">star</span>
                    <span>TEMPORADA 2 • ASCENSO</span>
                  </div>

                  {/* Big Headline */}
                  <div className="space-y-3">
                    <h2 className="font-display-hero text-display-hero text-on-primary font-black tracking-tight leading-tight">
                      Convierte tus pequeñas acciones en grandes victorias
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-primary/80 max-w-lg">
                      Más de 15,000 personas construyen constancia inquebrantable, suben de nivel y desbloquean logros cada día con HabitUp.
                    </p>
                  </div>

                  {/* Gamified Live Preview Widgets */}
                  <div className="flex flex-col gap-3 mt-4">
                    {/* Widget 1: Streak */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md text-on-primary shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl material-symbols-fill">local_fire_department</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-headline-sm font-extrabold">Racha de 14 Días</span>
                            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-[10px] font-bold">Activa</span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-primary/75">Multiplicador 1.5x XP aplicado</span>
                        </div>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-tertiary-fixed font-black">+350 XP</span>
                    </div>

                    {/* Widget 2: Level Progress */}
                    <div className="p-4 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md text-on-primary shadow-sm flex flex-col gap-2">
                      <div className="flex items-center justify-between font-label-md text-label-md">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center font-bold text-xs">7</span>
                          <span className="font-bold">Explorador Imparable</span>
                        </div>
                        <span className="text-on-primary-container">3,450 / 4,000 XP (86%)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-on-primary/20 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-secondary-container via-surface-bright to-tertiary-fixed" style={{ width: '86%' }}></div>
                      </div>
                    </div>

                    {/* Widget 3: Quick Habit complete */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md text-on-primary shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl material-symbols-fill">water_drop</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg font-bold">Beber 2.5L de Agua</span>
                          <span className="font-label-sm text-label-sm text-on-primary/70">Completado hoy a las 09:30 AM</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-label-sm text-label-sm text-on-primary-container">+20 XP</span>
                        <div className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-lg font-bold">check</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community trust badge */}
                <div className="relative z-10 pt-6 mt-4 border-t border-on-primary/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-secondary-fixed ring-2 ring-primary"></div>
                      <div className="w-7 h-7 rounded-full bg-tertiary-fixed ring-2 ring-primary"></div>
                      <div className="w-7 h-7 rounded-full bg-primary-fixed ring-2 ring-primary"></div>
                    </div>
                    <div className="flex items-center gap-1 text-tertiary-fixed">
                      {"★".repeat(5)}
                      <span className="font-label-sm text-label-sm text-on-primary ml-1 font-bold">4.9/5 por la comunidad</span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-lowest/20 font-bold">
                    100% Constancia
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-8 border-t border-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
          <span>Todos los sistemas operativos en línea y sincronizados</span>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <a href="#problemas" className="hover:text-primary transition-colors">¿Problemas al ingresar?</a>
          <span>•</span>
          <a href="#terminos" className="hover:text-primary transition-colors">Términos de servicio</a>
          <span>•</span>
          <a href="#privacidad" className="hover:text-primary transition-colors">Privacidad</a>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ onNavigateLogin }) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength calculation
  const hasMinLength = password.length >= 8;
  const hasUpperAndNumber = /[A-Z]/.test(password) && /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let strengthScore = 0;
  if (password.length > 0) strengthScore++;
  if (hasMinLength) strengthScore++;
  if (hasUpperAndNumber) strengthScore++;
  if (hasSpecial && password.length >= 10) strengthScore++;

  const strengthLabels = ['', 'Débil', 'Media', 'Fuerte', 'Excelente'];
  const strengthLabel = strengthLabels[strengthScore] || 'Media';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Por favor, ingresa tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!termsAccepted) {
      setError('Debes aceptar los Términos y Condiciones para continuar.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register(fullName, email, password, termsAccepted);
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen relative flex flex-col justify-between selection:bg-primary-container selection:text-on-primary">
      {/* Background ambient light */}
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
            <span className="hidden sm:inline font-body-sm text-body-sm text-on-surface-variant">¿Ya tienes cuenta?</span>
            <button
              onClick={onNavigateLogin}
              className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-all font-label-md text-label-md flex items-center gap-2"
              type="button"
            >
              <span>Iniciar sesión</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-10 relative z-10">
        <div className="flex flex-col w-full max-w-7xl mx-auto py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-surface-container-lowest shadow-xl overflow-hidden min-h-[750px]">
            
            {/* Left Panel: Register Form */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-surface-container-lowest">
              <div>
                {/* Header Brand */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-on-primary text-[22px] material-symbols-fill">task_alt</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">HabitUp</span>
                    <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold">Evolución Diaria</span>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1 mb-6">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">Crea tu cuenta</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                    Únete hoy y comienza a construir hábitos duraderos ganando puntos de experiencia desde tu primer día.
                  </p>
                </div>

                {/* Social register */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <button 
                    type="button"
                    className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.98] group"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                    </svg>
                    <span className="font-label-lg text-label-lg text-on-surface">Registrarse con Google</span>
                  </button>

                  <button 
                    type="button"
                    className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.98] group"
                  >
                    <svg className="w-5 h-5 fill-current text-on-surface" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.66-.99 1.72-.88 2.74 1 .08 1.96-.49 2.58-1.24z"></path>
                    </svg>
                    <span className="font-label-lg text-label-lg text-on-surface">Registrarse con Apple</span>
                  </button>
                </div>

                {/* Separator */}
                <div className="relative flex items-center justify-center my-6">
                  <div className="w-full h-px bg-surface-container-high"></div>
                  <span className="absolute px-4 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant">
                    o completa tus datos
                  </span>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="reg-name">
                      Nombre completo
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">person</span>
                      <input 
                        id="reg-name"
                        className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all"
                        placeholder="Ej. Laura Gómez"
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="reg-email">
                      Correo electrónico
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">mail</span>
                      <input 
                        id="reg-email"
                        className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all"
                        placeholder="tu.correo@ejemplo.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="reg-password">
                      Contraseña
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">lock</span>
                      <input 
                        id="reg-password"
                        className="w-full h-12 pl-11 pr-11 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all"
                        placeholder="••••••••••••"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 p-1 text-on-surface-variant hover:text-on-surface focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    <div className="pt-1 space-y-1.5">
                      <div className="flex items-center justify-between text-label-sm font-label-sm">
                        <span className="text-on-surface-variant">Seguridad de la clave:</span>
                        <span className="text-on-surface font-label-md font-bold">{strengthLabel}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                        <div className={`rounded-full transition-all ${strengthScore >= 1 ? 'bg-secondary' : 'bg-surface-container-high'}`}></div>
                        <div className={`rounded-full transition-all ${strengthScore >= 2 ? 'bg-secondary' : 'bg-surface-container-high'}`}></div>
                        <div className={`rounded-full transition-all ${strengthScore >= 3 ? 'bg-secondary' : 'bg-surface-container-high'}`}></div>
                        <div className={`rounded-full transition-all ${strengthScore >= 4 ? 'bg-secondary' : 'bg-surface-container-high'}`}></div>
                      </div>
                      {/* Requirements */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 font-body-sm text-body-sm text-on-surface-variant">
                        <div className={`flex items-center gap-1.5 ${hasMinLength ? 'text-secondary font-semibold' : ''}`}>
                          <span className={`material-symbols-outlined text-[16px] ${hasMinLength ? 'material-symbols-fill' : ''}`}>
                            {hasMinLength ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>Mínimo 8 caracteres</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${hasUpperAndNumber ? 'text-secondary font-semibold' : ''}`}>
                          <span className={`material-symbols-outlined text-[16px] ${hasUpperAndNumber ? 'material-symbols-fill' : ''}`}>
                            {hasUpperAndNumber ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>Una mayúscula y un número</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="reg-confirm">
                      Confirmar contraseña
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none">verified</span>
                      <input 
                        id="reg-confirm"
                        className="w-full h-12 pl-11 pr-11 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all"
                        placeholder="••••••••••••"
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 p-1 text-on-surface-variant hover:text-on-surface focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showConfirmPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded text-primary accent-primary cursor-pointer transition-colors"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Acepto los <a href="#terminos" className="text-primary font-semibold hover:underline">Términos y Condiciones</a> y la <a href="#privacidad" className="text-primary font-semibold hover:underline">Política de Privacidad</a> de HabitUp.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-lg shadow-primary-container/25 hover:shadow-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {loading ? (
                      <span>Creando cuenta...</span>
                    ) : (
                      <>
                        <span>Crear cuenta y comenzar reto</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Login link */}
                <div className="text-center mt-6">
                  <span className="font-body-md text-body-md text-on-surface-variant">¿Ya tienes una cuenta? </span>
                  <button 
                    onClick={onNavigateLogin}
                    className="font-label-md text-label-md text-primary font-bold hover:underline"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel: Welcome Reward Showcase */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              {/* Halos */}
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-6">
                {/* Welcome Gift Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider self-start shadow-sm">
                  <span>🎁</span>
                  <span>REGALO DE BIENVENIDA</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-headline-lg text-headline-lg font-black tracking-tight leading-tight">
                    Tu viaje de evolución personal empieza en el Nivel 1
                  </h2>
                  <p className="font-body-md text-body-md text-on-primary/80">
                    Desbloquea tu potencial diario con dinámicas diseñadas para no perder la motivación jamás.
                  </p>
                </div>

                {/* 3 Perks */}
                <div className="flex flex-col gap-3 mt-2">
                  {/* Perk 1 */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl text-secondary-fixed material-symbols-fill">diamond</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold">+100 Gemas Iniciales</span>
                      <span className="font-body-sm text-[12px] text-on-primary/75">Bono para desbloquear tu avatar personal y paletas de color exclusivas.</span>
                    </div>
                  </div>

                  {/* Perk 2 */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl text-tertiary-fixed material-symbols-fill">local_fire_department</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold">Multiplicadores de Racha</span>
                      <span className="font-body-sm text-[12px] text-on-primary/75">Mantén el fuego encendido completando tus rutinas antes de las 11:00 AM.</span>
                    </div>
                  </div>

                  {/* Perk 3 */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed/30 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl text-primary-fixed material-symbols-fill">military_tech</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold">Bóveda de Logros</span>
                      <span className="font-body-sm text-[12px] text-on-primary/75">Más de 40 insignias coleccionables como 'Guerrero Matutino' y 'Lector Voraz'.</span>
                    </div>
                  </div>
                </div>

                {/* Quick Step Card */}
                <div className="p-4 rounded-xl bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold text-sm">
                      ⚡
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold">Meta rápida</span>
                      <span className="font-body-sm text-[12px] text-on-primary/75">Define 3 hábitos en menos de 2 minutos</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/30 font-label-sm text-label-sm font-bold">
                    Paso 1/3
                  </span>
                </div>
              </div>

              {/* Bottom security assurance */}
              <div className="relative z-10 pt-4 flex items-center justify-center gap-1.5 text-on-primary/80 font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Sin tarjeta de crédito requerida • 100% gratuito para empezar</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-8 border-t border-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <div>© 2026 HabitUp. Todos los derechos reservados.</div>
        <div className="flex items-center gap-4">
          <a href="#terminos" className="hover:text-primary transition-colors">Términos</a>
          <a href="#privacidad" className="hover:text-primary transition-colors">Privacidad</a>
          <a href="#soporte" className="hover:text-primary transition-colors">Soporte</a>
          <a href="#ayuda" className="hover:text-primary transition-colors">Ayuda con Acceso</a>
        </div>
      </footer>
    </div>
  );
}

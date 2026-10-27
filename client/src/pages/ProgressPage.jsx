import React, { useState } from 'react';

export default function ProgressPage({ habits, stats, heatmap, categories }) {
  const [timeRange, setTimeRange] = useState('month');

  const matrixDays = heatmap?.matrix || [];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Command & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider font-extrabold">
              <span className="material-symbols-outlined text-sm font-bold material-symbols-fill">insights</span>
              Analítica Avanzada
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">Actualizado hace 12 min</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">Progreso y Estadísticas</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Evolución cuantitativa de consistencia, rachas de fuego e impacto acumulado.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Segmented Control */}
          <div className="flex items-center p-1 rounded-full bg-surface-container-low shadow-sm">
            {[
              { key: 'week', label: 'Esta Semana' },
              { key: 'month', label: 'Este Mes' },
              { key: '3months', label: 'Últimos 3 Meses' },
              { key: 'year', label: 'Año Actual' },
            ].map(range => (
              <button 
                key={range.key}
                onClick={() => setTimeRange(range.key)}
                className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  timeRange === range.key
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Export Report Action */}
          <button 
            onClick={() => alert('Reporte generado y descargado en formato CSV.')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container-high transition-all active:scale-95" 
            type="button"
          >
            <span className="material-symbols-outlined text-lg text-primary">download</span>
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* KPI Bento Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* KPI 1: Tasa Global */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Tasa Cumplimiento Global</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-hero text-display-hero text-on-surface leading-none font-black">
                  88.4<span className="text-headline-md font-bold text-on-surface-variant">%</span>
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl material-symbols-fill">trending_up</span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between pt-2">
            <div className="flex items-center gap-1.5 text-secondary font-label-md text-label-md font-bold">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              <span>+5.2%</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm font-normal">vs. sem. previa</span>
            </div>
            {/* Sparkline SVG */}
            <svg className="w-24 h-9 text-secondary-container" fill="none" viewBox="0 0 100 36">
              <path d="M0 30 Q 15 28, 25 18 T 50 20 T 75 10 T 100 4" fill="none" stroke="#00B894" strokeLinecap="round" strokeWidth="2.5"></path>
              <path d="M0 30 Q 15 28, 25 18 T 50 20 T 75 10 T 100 4 L 100 36 L 0 36 Z" fill="#00B894" fillOpacity="0.12"></path>
            </svg>
          </div>
        </div>

        {/* KPI 2: Total Hábitos */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Completados Este Mes</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-hero text-display-hero text-on-surface leading-none font-black">142</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">hábitos</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl material-symbols-fill">task_alt</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-2">
            <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '82%' }}></div>
            </div>
            <span className="ml-3 font-label-sm text-label-sm text-on-surface-variant font-bold whitespace-nowrap">Meta: 170</span>
          </div>
        </div>

        {/* KPI 3: Racha Máxima */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Racha Histórica Máxima</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-hero text-display-hero text-on-surface leading-none font-black">24</span>
                <span className="font-label-md text-label-md text-tertiary-container font-extrabold uppercase">Días</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl material-symbols-fill">military_tech</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 pt-2">
            <span className="material-symbols-outlined text-lg text-tertiary material-symbols-fill">local_fire_department</span>
            <span className="font-label-md text-label-md text-tertiary font-bold">Trofeo de Constancia Nivel Plata</span>
          </div>
        </div>

        {/* KPI 4: Tiempo Total Invertido */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Tiempo Invertido</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-hero text-display-hero text-on-surface leading-none font-black">48</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">horas netas</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl material-symbols-fill">timelapse</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-2">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Equivale a 2.1 días de crecimiento</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed font-label-sm text-label-sm text-secondary font-bold">+6h</span>
          </div>
        </div>
      </div>

      {/* AI Coach Banner */}
      <div className="p-6 rounded-2xl bg-primary-fixed/20 border border-primary-fixed flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-2xl material-symbols-fill">smart_toy</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm font-extrabold text-primary uppercase tracking-wider">HABITUP AI COACH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">2 Patrones Detectados</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-1 font-body-md text-body-md text-on-surface">
              <span><strong>Momento óptimo:</strong> Mañanas con <strong>94% de efectividad</strong> antes de las 10:00 AM.</span>
              <span>•</span>
              <span><strong>Punto ciego:</strong> Los viernes baja tu hidratación. ¡Activa alarma sugerida a las 15:00!</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => alert('Recordatorios inteligentes optimizados según tu ritmo circadiano.')}
          className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:opacity-90 transition-all shrink-0 active:scale-95 shadow-xs"
        >
          Optimizar Recordatorios
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left: Weekly Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Consistencia Diaria de Hábitos</h3>
              <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary"></span> % Completado
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Porcentaje de éxito por día de la semana actual</p>

            {/* Custom Bar Chart Visual */}
            <div className="grid grid-cols-7 gap-4 items-end h-48 pt-4 pb-2 border-b border-surface-container-high">
              {[
                { day: 'Lun', pct: 100 },
                { day: 'Mar', pct: 85 },
                { day: 'Mié', pct: 90 },
                { day: 'Jue', pct: 75 },
                { day: 'Vie', pct: 100 },
                { day: 'Sáb', pct: 80 },
                { day: 'Dom', pct: 95 },
              ].map(item => (
                <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="font-label-sm text-[11px] font-bold text-on-surface group-hover:text-primary transition-colors">
                    {item.pct}%
                  </span>
                  <div className="w-full max-w-[36px] bg-surface-container-high rounded-full overflow-hidden flex flex-col justify-end h-36">
                    <div 
                      className="w-full bg-gradient-to-t from-primary via-primary-container to-secondary-container rounded-full transition-all duration-700"
                      style={{ height: `${item.pct}%` }}
                    ></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
            <span>Pico semanal: <strong>Lunes y Viernes</strong> con 100% de cumplimiento</span>
            <span>Promedio: <strong>89.3%</strong></span>
          </div>
        </div>

        {/* Right: Category Donut Chart Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Distribución por Categorías</h3>
              <span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Enfoque de energía en tu rutina activa</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              {/* Donut representation */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Circle background */}
                  <path className="text-surface-container-high" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Salud 35% */}
                  <path stroke="#0060A9" strokeWidth="4" strokeDasharray="35, 100" strokeDashoffset="0" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Mente 25% */}
                  <path stroke="#3F22C8" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-35" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Fitness 20% */}
                  <path stroke="#653F00" strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-60" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Productividad 15% */}
                  <path stroke="#3F9EFF" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-80" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-headline-md font-black text-on-surface leading-none">5</span>
                  <span className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant">PILARES</span>
                </div>
              </div>

              {/* Legend list */}
              <div className="flex flex-col gap-2 w-full max-w-[200px]">
                {[
                  { name: 'Salud & Nutrición', pct: '35%', color: 'bg-secondary' },
                  { name: 'Mente & Mindfulness', pct: '25%', color: 'bg-primary' },
                  { name: 'Fitness & Fuerza', pct: '20%', color: 'bg-tertiary' },
                  { name: 'Productividad', pct: '15%', color: 'bg-secondary-container' },
                  { name: 'Descanso & Sueño', pct: '5%', color: 'bg-tertiary-container' },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between text-body-sm text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      <span className="text-on-surface font-medium truncate max-w-[120px]">{item.name}</span>
                    </div>
                    <span className="font-bold text-on-surface">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-container-high flex items-center justify-between font-label-sm text-label-sm">
            <span className="text-on-surface-variant">Balance general: <strong className="text-on-surface">Equilibrado</strong></span>
            <span className="text-primary font-bold cursor-pointer hover:underline">Ver recomendaciones</span>
          </div>
        </div>
      </div>

      {/* 30-Day Activity Matrix */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Matriz de Hábitos Ininterrumpidos</h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-xs material-symbols-fill">local_fire_department</span>
              30 DÍAS
            </span>
          </div>
          <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
            <span>Menos</span>
            <span className="w-3 h-3 rounded bg-surface-container-high"></span>
            <span className="w-3 h-3 rounded bg-secondary-fixed"></span>
            <span className="w-3 h-3 rounded bg-secondary"></span>
            <span className="w-3 h-3 rounded bg-primary-container"></span>
            <span className="w-3 h-3 rounded bg-primary"></span>
            <span>Más Actividad</span>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5 text-center font-label-sm text-label-sm">
          {matrixDays.map((d, i) => {
            const isFull = d.completed === 5;
            const isToday = d.is_today;
            return (
              <div 
                key={i}
                className={`py-3 px-1 rounded-xl flex flex-col items-center justify-center font-bold transition-all shadow-xs ${
                  isToday 
                    ? 'bg-primary text-on-primary ring-2 ring-primary-container scale-105' 
                    : isFull 
                      ? 'bg-primary-container text-on-primary' 
                      : d.completed >= 4 
                        ? 'bg-secondary-container text-on-primary' 
                        : 'bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="text-[10px] opacity-75">{isToday ? 'HOY' : d.day_index}</span>
                <span className="text-xs font-black">{d.ratio_text}</span>
              </div>
            );
          })}
        </div>

        <div className="pt-4 mt-6 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-2 text-on-surface-variant font-label-sm text-label-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
            <span>Racha activa global sin interrupción: <strong>30 días seguidos</strong> con al menos 1 hábito realizado.</span>
          </div>
          <span className="font-bold text-primary">96.7% de días activos</span>
        </div>
      </div>

      {/* Individual Habit Performance Table */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">Rendimiento por Hábito Individual</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Analiza en detalle cada comportamiento específico de tu rutina.</p>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Filtrar Estado</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase font-bold">
                <th className="pb-3">Hábito / Categoría</th>
                <th className="pb-3">Tasa Éxito</th>
                <th className="pb-3">Racha Actual</th>
                <th className="pb-3">Racha Máx.</th>
                <th className="pb-3">Tendencia</th>
                <th className="pb-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {habits.map((h) => (
                <tr key={h.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg material-symbols-fill">
                        {h.category === 'salud' ? 'water_drop' : h.category === 'mente' ? 'psychology' : 'directions_run'}
                      </span>
                    </div>
                    <div>
                      <div className="font-label-md text-label-md font-bold text-on-surface">{h.name}</div>
                      <div className="text-[11px] text-on-surface-variant">{h.category} • {h.target_time}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface">96%</span>
                      <div className="w-20 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm font-bold">
                      🔥 {h.current_streak} días
                    </span>
                  </td>
                  <td className="py-4 text-on-surface font-semibold">{h.current_streak + 5} días</td>
                  <td className="py-4 text-emerald-600 font-bold inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span> +8%
                  </td>
                  <td className="py-4 text-right">
                    <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">chevron_right</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

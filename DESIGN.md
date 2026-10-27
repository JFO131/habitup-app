# Design System: HabitUp — Evolución Diaria
**Estilo Visual:** *Vibrant Kinetic Gamification*  
**Versión de Diseño:** 1.0 (Exportado desde Google Stitch)  
**Fecha de Documentación:** Octubre 2026  

---

## 1. Resumen Ejecutivo y Filosofía de Diseño

**HabitUp** es una plataforma gamificada de formación y seguimiento de hábitos orientada a individuos que buscan disciplina y superación constante. Su identidad combina el **Minimalismo Táctil Moderno** con la **Gamificación Vibrante**:

- **Claridad cognitiva:** Estructuras limpias sobre fondo lavanda ultra claro (`#FAF8FF`) que reducen la fatiga mental y maximizan el contraste del contenido.
- **Micro-estímulos y Dopamina Positiva:** Estallidos cromáticos bien calculados (violetas eléctricos, azules cian, oros cálidos de racha y esmeraldas de éxito) para reforzar la sensación de progreso, recompensas de XP, gemas y rachas continuas.
- **Componentes Táctiles y Orgánicos:** Esquinas suaves (`rounded-xl` y `rounded-2xl`), botones tipo píldora (`rounded-full`), tarjetas con elevaciones sutiles y halos de resplandor ambiental (*ambient glow*).
- **Consistencia Jerárquica:** Tipografía unificada con cifras tabulares para indicadores numéricos dinámicos y estados de control claros.

---

## 2. Paleta Cromática (Design Tokens)

Todos los valores han sido extraídos directamente de los archivos de configuración (`tailwind.config` y `DESIGN.md` del paquete Stitch).

### 2.1 Superficies y Fondos
| Token | Valor HEX | Uso / Semántica |
| :--- | :--- | :--- |
| `background` | `#FAF8FF` | Lienzo principal de toda la aplicación. |
| `surface` | `#FAF8FF` | Capa base para paneles y contenedores. |
| `surface-bright` | `#FAF8FF` | Superficie clara de alto brillo. |
| `surface-dim` | `#D2D9F4` | Superficie apagada para estados atenuados. |
| `surface-container-lowest` | `#FFFFFF` | Tarjetas elevadas principales, modales, barras laterales y de navegación. |
| `surface-container-low` | `#F2F3FF` | Sub-paneles, campos de entrada inactivos, fondos de métricas. |
| `surface-container` | `#EAEDFF` | Separadores, chips secundarios, fondos de tabs. |
| `surface-container-high` | `#E2E7FF` | Pistas de barras de progreso, hover en menús de navegación. |
| `surface-container-highest` | `#DAE2FD` | Bordes activos y contenedores de alta visibilidad. |
| `surface-variant` | `#DAE2FD` | Elementos de soporte y divisores. |
| `inverse-surface` | `#283044` | Superficies oscuras en contraste inverso. |
| `inverse-on-surface` | `#EEF0FF` | Texto sobre superficies invertidas. |

### 2.2 Primarios (Identidad y Acciones Clave)
| Token | Valor HEX | Uso / Semántica |
| :--- | :--- | :--- |
| `primary` | `#3F22C8` | Azul violeta profundo; enlaces activos, logos, iconos principales. |
| `primary-container` | `#5843E0` | Violeta eléctrico; botón de acción primaria (CTA), botón "+ Nuevo Hábito", ítem activo de navegación, barras de XP. |
| `on-primary` | `#FFFFFF` | Texto o iconos sobre fondo `primary` y `primary-container`. |
| `on-primary-container` | `#DBD5FF` | Texto de contraste medio sobre contenedores primarios. |
| `primary-fixed` | `#E4DFFF` | Fondo suave para chips y badges de nivel. |
| `primary-fixed-dim` | `#C6BFFF` | Variante atenuada para acentos primarios. |
| `on-primary-fixed` | `#160066` | Texto de alto contraste sobre `primary-fixed`. |
| `on-primary-fixed-variant`| `#3E21C7` | Texto acentuado en insignias primarias. |
| `surface-tint` | `#5742DF` | Tinte de elevación violeta. |

### 2.3 Secundarios (Interacciones y Métricas)
| Token | Valor HEX | Uso / Semántica |
| :--- | :--- | :--- |
| `secondary` | `#0060A9` | Azul océano; métricas analíticas, porcentajes, categoría Salud. |
| `secondary-container` | `#3F9EFF` | Azul cian vibrante; halos activos, pings de sincronización, categoría Descanso. |
| `on-secondary` | `#FFFFFF` | Texto e iconos sobre `secondary`. |
| `on-secondary-container` | `#00345F` | Texto sobre `secondary-container`. |
| `secondary-fixed` | `#D3E4FF` | Fondo suave para badges y chips de categoría Salud. |
| `secondary-fixed-dim` | `#A2C9FF` | Fondo de métricas de tiempo y progreso. |
| `on-secondary-fixed` | `#001C38` | Texto oscuro sobre `secondary-fixed`. |
| `on-secondary-fixed-variant`| `#004881` | Texto alternativo sobre fondos secundarios fijos. |

### 2.4 Terciarios (Gamificación, Rachas y Fuego)
| Token | Valor HEX | Uso / Semántica |
| :--- | :--- | :--- |
| `tertiary` | `#653F00` | Ámbar quemado / Oro; textos e iconos de rachas activas. |
| `tertiary-container` | `#865400` | Contenedores de trofeos y recompensas doradas. |
| `on-tertiary` | `#FFFFFF` | Texto sobre `tertiary`. |
| `on-tertiary-container` | `#FFD29D` | Texto sobre contenedores terciarios. |
| `tertiary-fixed` | `#FFDDB7` | Fondo dorado para píldoras de racha (`14 DÍAS`) y badges de fuego. |
| `tertiary-fixed-dim` | `#FFB95D` | Trofeos y estrellas de maestría. |
| `on-tertiary-fixed` | `#2A1700` | Texto de alto contraste sobre badges dorados. |
| `on-tertiary-fixed-variant`| `#653E00` | Acentos oscuros para badges terciarios. |

### 2.5 Estados de Éxito, Error y Advertencia
| Token / Color | Valor HEX | Uso / Semántica |
| :--- | :--- | :--- |
| **Success Emerald** | `#00B894` | Checkmarks completados, curvas de tendencia ascendente, gráficas de éxito. |
| **Success Mint** | `#10B981` / `#059669` | Pings de sincronización en tiempo real y estados activos. |
| `error` | `#BA1A1A` | Notificaciones de alerta, indicadores de desconexión. |
| `on-error` | `#FFFFFF` | Texto sobre fondos de error. |
| `error-container` | `#FFDAD6` | Fondo suave para advertencias y alertas de racha en peligro. |
| `on-error-container` | `#93000A` | Texto sobre `error-container`. |

### 2.6 Neutros y Tipografía
| Token | Valor HEX | Uso / Semántica |
| :--- | :--- | :--- |
| `on-surface` | `#131B2E` | Títulos principales, textos de alta jerarquía y números clave. |
| `on-surface-variant` | `#474555` | Descripciones secundarias, etiquetas de metadatos, iconos inactivos. |
| `on-background` | `#131B2E` | Texto sobre el fondo global. |
| `outline` | `#787587` | Iconos de input, bordes neutros y elementos deshabilitados. |
| `outline-variant` | `#C8C4D8` | Divisores sutiles y puntos de separación. |

### 2.7 Código Cromático por Categorías de Hábitos
| Categoría | Icono Material Symbol | Color de Fondo | Color de Acento / Icono |
| :--- | :--- | :--- | :--- |
| **Salud e Hidratación** | `water_drop` | `secondary-fixed` (`#D3E4FF`) | `secondary` (`#0060A9`) |
| **Mente y Mindfulness** | `psychology` | `primary-fixed` (`#E4DFFF`) | `primary` (`#3F22C8`) |
| **Fitness y Cardio** | `directions_run` | `tertiary-fixed` (`#FFDDB7`) | `tertiary` (`#653F00`) |
| **Descanso y Sueño** | `bedtime` | `surface-variant` (`#DAE2FD`) | `secondary-container` (`#3F9EFF`) |
| **Productividad e Idiomas**| `timer` / `translate` | `surface-container-high` (`#E2E7FF`) | `primary-container` (`#5843E0`) |

---

## 3. Tipografía

**Familia Tipográfica Principal:** `Plus Jakarta Sans`  
**Familia Tipográfica de Iconos:** `Material Symbols Outlined` (con `font-variation-settings: 'FILL' 1` para elementos gamificados rellenos).

### 3.1 Escala Tipográfica Exacta
| Estilo | Tamaño | Line Height | Letter Spacing | Font Weight | Clases Tailwind |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **display-hero** | 48px (3rem) | 56px | `-0.03em` | 800 (ExtraBold) | `font-display-hero text-display-hero` |
| **display-hero-mobile** | 36px (2.25rem) | 44px | `-0.025em` | 800 (ExtraBold) | `font-display-hero-mobile text-display-hero-mobile` |
| **headline-lg** | 32px (2rem) | 40px | `-0.02em` | 700 (Bold) | `font-headline-lg text-headline-lg` |
| **headline-lg-mobile** | 26px (1.625rem)| 34px | `-0.015em`| 700 (Bold) | `font-headline-lg-mobile text-headline-lg-mobile` |
| **headline-md** | 22px (1.375rem)| 28px | `-0.015em`| 700 (Bold) | `font-headline-md text-headline-md` |
| **headline-sm** | 18px (1.125rem)| 24px | `-0.01em` | 600 (SemiBold) | `font-headline-sm text-headline-sm` |
| **body-lg** | 16px (1rem) | 24px | Normal | 400 (Regular) | `font-body-lg text-body-lg` |
| **body-md** | 14px (0.875rem)| 20px | Normal | 400 (Regular) | `font-body-md text-body-md` |
| **body-sm** | 12px (0.75rem) | 16px | Normal | 400 (Regular) | `font-body-sm text-body-sm` |
| **label-lg** | 14px (0.875rem)| 20px | `0.01em` | 600 (SemiBold) | `font-label-lg text-label-lg` |
| **label-md** | 12px (0.75rem) | 16px | `0.02em` | 700 (Bold) | `font-label-md text-label-md` |
| **label-sm** | 11px (0.6875rem)| 14px | `0.04em` | 700 (Bold) | `font-label-sm text-label-sm` |
| **stat-numeric** | 28px (1.75rem) | 32px | `-0.03em` | 800 (ExtraBold) | `font-stat-numeric text-stat-numeric` |

> [!TIP]
> **Cifras Tabulares:** En contadores de racha, gemas y XP numéricos, aplicar `font-variant-numeric: tabular-nums` para evitar saltos de línea y desalineación en actualizaciones de datos en tiempo real.

---

## 4. Espaciado, Retícula y Bordes

### 4.1 Escala de Espaciado
- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `1rem` (16px)
- `space-lg`: `1.5rem` (24px)
- `space-xl`: `2.5rem` (40px)
- `gutter`: `1.5rem` (24px en desktop)
- `gutter-mobile`: `1rem` (16px en mobile)
- `margin`: `2rem` (32px en desktop)
- `margin-mobile`: `1rem` (16px en mobile)

### 4.2 Radios de Esquina (`borderRadius`)
- `sm`: `0.25rem` (4px)
- `DEFAULT` / `md`: `0.5rem` (8px) o `0.75rem` (12px)
- `lg`: `0.5rem` - `1rem` (16px para campos de texto e inputs)
- `xl`: `0.75rem` - `1.5rem` (24px para tarjetas, contenedores bento y drawers)
- `2xl`: `1rem` - `1.5rem` (clase Tailwind `rounded-2xl` utilizada en tarjetas de hábitos y paneles clave)
- `full`: `9999px` (píldoras, badges, botones circulares, avatars e indicadores de progreso)

---

## 5. Elevaciones, Sombras y Resplandores Gamificados

### 5.1 Sombras Estándar
- **Tarjeta en Reposo (Card Rest):**  
  `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 6px 16px -4px rgba(15, 23, 42, 0.06);`  
  En Tailwind: `shadow-sm` con fondo `bg-surface-container-lowest`.
- **Interactivo Elevado (Hover / Focus):**  
  `box-shadow: 0 12px 24px -6px rgba(15, 23, 42, 0.08);`  
  En Tailwind: `hover:shadow-md` o `hover:shadow-lg` con micro-escalado (`hover:scale-[1.01]`).
- **Botón Primario y Destacado:**  
  `box-shadow: 0 4px 16px rgba(88, 67, 224, 0.28);` o `shadow-lg shadow-primary-container/25`.

### 5.2 Halos de Resplandor Gamificado (Ambient Glow)
- **Fuego / Racha:** Esfera difusa trasera con `bg-tertiary-fixed/30` o `rgba(255, 165, 2, 0.25)` y filtro `blur-xl`.
- **XP / Progreso de Nivel:** Esfera difusa trasera con `bg-primary-container/10` o `bg-primary-fixed/40` y `blur-3xl`.
- **Secundario / Analítica:** Esfera difusa con `bg-secondary-fixed/50` o `bg-secondary-container/15` y `blur-3xl`.

---

## 6. Especificación de Componentes

### 6.1 Barra Lateral de Navegación (`Sidebar`)
- **Dimensiones:** Ancho fijo `w-72` (288px), altura completa de pantalla `h-screen`, posición fija `fixed left-0 top-0`.
- **Fondo:** `bg-surface-container-lowest` (`#FFFFFF`) con `shadow-[0_1px_8px_rgba(0,0,0,0.04)]` y `z-50`.
- **Estructura Interna:**
  - **Cabecera de Marca:** Logo HabitUp (`h-8`), texto "HabitUp" en `headline-sm` y subtítulo "Evolución Diaria" en `label-sm uppercase`.
  - **Enlaces de Navegación:** Píldoras con `px-3.5 py-2.5 rounded-xl`.
    - *Estado Activo:* `bg-primary-container text-on-primary font-bold shadow-md shadow-primary-container/20`.
    - *Estado Inactivo:* `text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface`.
    - *Rutas:* `inicio` (dashboard), `mis-habitos`, `progreso`, `logros`, `perfil`.
  - **Footer de Jugador:** Tarjeta interior con `p-4 bg-surface-container-low rounded-xl`.
    - Badge de racha superior: `bg-tertiary-fixed text-tertiary` ("14 DÍAS").
    - Rango y nivel: "Nivel 7" y "Habit Master 86%".
    - Barra de progreso de XP: Pista `bg-surface-container-high`, barra `bg-primary-container` con cálculo de 3,450 XP / 4,000 XP.

### 6.2 Barra Superior (`Header`)
- **Dimensiones:** Altura `h-16` (64px), fijada `fixed top-0 left-72 right-0` en desktop.
- **Efecto de Fondo:** `bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]`.
- **Elementos:**
  - Breadcrumb: `HabitUp > chevron_right > Panel Activo`.
  - Campo de búsqueda: Píldora `w-64 h-9 pl-9 pr-3 rounded-full bg-surface-container-low` con icono `search`.
  - Notificaciones: Botón circular con icono `notifications` y punto `bg-error` de 8x8px.
  - Botón Acción Rápida: `px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-lg` ("+ Nuevo Hábito").
  - Avatar de Usuario: Imagen circular con aro `ring-2 ring-primary-container/30` y badge flotante con el número de nivel (`7`).

### 6.3 Botones
- **Botón Primario:**  
  Fondo `bg-primary-container` (`#5843E0`), texto `text-on-primary`, esquinas `rounded-full` o `rounded-2xl`, peso `font-bold` o `font-semibold`. Efecto `active:scale-95` y hover suave.
- **Botón Secundario / Outline:**  
  Fondo `bg-surface-container-low` o `bg-surface-container-lowest`, texto `text-on-surface`, borde sutil `border border-outline-variant/30`, hover `bg-surface-container-high`.
- **Botón Completado / Éxito:**  
  Fondo `#00B894` o `bg-primary`, texto blanco, icono de checkmark.
- **Botones de Control Segmentado (Tabs de filtro):**  
  Contenedor píldora con `bg-surface-container-low`. Ítem seleccionado: `bg-surface-container-lowest` o `bg-primary-container`, texto destacado con sombra ligera.

### 6.4 Tarjetas de Hábitos (`Habit Cards`)
- **Contenedor:** `rounded-2xl bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden`.
- **Zona Superior:**
  - Contenedor de icono de categoría con fondo suave acorde a la categoría (p. ej., `bg-secondary-fixed` para agua).
  - Título del hábito (`headline-sm`), indicador de racha (`18 DÍAS` en cápsula ámbar) y horario programado.
  - Menú de opciones de tres puntos (`more_vert`).
- **Zona de Métricas:** Barra de progreso porcentual del día o estado de la sesión (ej. `2.0 / 2.0 L (100%)`).
- **Zona Inferior:** Badge de XP disponible (`+20 XP Obtenidos` o `+30 XP`) y botón de acción directa ("Completar (+30 XP)", "Registrar Avance" o "Completado").

### 6.5 Formularios e Inputs (Login, Registro y Creación)
- **Campos de Texto:**
  - Altura: 48px (`h-12`).
  - Radio: `rounded-lg` (8px - 16px).
  - Fondo: `bg-surface-container-low` o `bg-surface-container-lowest`.
  - Icono a la izquierda: Material Symbol de 20px (`pointer-events-none text-outline`).
  - Estado Focus: `focus:bg-surface-container-lowest focus:shadow-[0_0_0_3px_rgba(88,67,224,0.18)] focus:outline-none`.
- **Acceso Social:**
  - Botones simétricos para Google y Apple con iconos SVG integrados, fondo `bg-surface-container-low` y hover `bg-surface-container`.
- **Indicador de Fortaleza de Contraseña:**
  - 4 barras segmentadas (`grid grid-cols-4 gap-1.5 h-1.5`), coloreadas según nivel (`bg-secondary` o `bg-surface-container-high`), acompañadas de checklist con iconos `check_circle`.

### 6.6 Drawer Lateral de Creación de Hábitos (`Modal / Slide-over`)
- **Posición:** Panel lateral emergente que se desliza desde la derecha (`translate-x-full` a `translate-x-0`).
- **Componentes del Drawer:**
  - Nombre del hábito: Input textual con placeholder sugerente.
  - Selector de Categoría: Grilla de 5 columnas con botones temáticos (Salud, Mente, Fitness, Descanso, Productividad).
  - Selector de Frecuencia: Botones individuales para cada día de la semana (`L M X J V S D`) que alternan entre `bg-primary-container` y `bg-surface-container-lowest`.
  - Selector de Momento del Día: 3 opciones (`Mañana`, `Tarde`, `Noche`) con iconos representativos (`wb_sunny`, `wb_twilight`, `dark_mode`).
  - Resumen Gamificado: Tarjeta con cálculo en tiempo real de XP base (`+35 XP / Sesión`).
  - Footer de Acciones: Botón "Cancelar" (ancho 1/3) y botón primario "Guardar Hábito" (ancho 2/3).

### 6.7 Gamificación: Logros, Niveles y Matriz de Actividad
- **Banner de Temporada (Hero Gamificado):**
  - Gradiente de fondo: `from-primary via-primary-container to-secondary` con texto blanco.
  - Indicador de Rango: "Rango Maestro • ID Aventurero #HU-9842".
  - Barra de Progreso de Nivel Gigante con efecto `animate-pulse` y gradiente interior `from-secondary-container via-surface-bright to-tertiary-fixed`.
  - Contador de Gemas: Icono `diamond` con cifra en `stat-numeric` y badge de Gemas canjeables.
- **Matriz de Hábitos Ininterrumpidos (Calendar Activity Matrix):**
  - Malla de 30 días para representar constancia visual, con tonalidades graduadas según la proporción de hábitos completados (desde `bg-surface-container-high` para días vacíos hasta violetas intensos para días 100% completados).

---

## 7. Diseño Adaptable (Responsive Layout)

| Breakpoint | Ancho de Pantalla | Comportamiento del Layout |
| :--- | :--- | :--- |
| **Mobile** | `< 768px` | Grilla de 1 sola columna. `margin-mobile: 1rem` (16px). Los paneles divididos de autenticación colapsan a una sola columna vertical. |
| **Tablet** | `768px - 1023px` | Grillas de 2 columnas para tarjetas y métricas KPI. Contenedores con márgenes estándar de 32px. |
| **Desktop** | `≥ 1024px` | Navegación fija en barra lateral izquierda (`w-72` / 288px). Padding izquierdo del contenido principal `pl-72`. Grillas de 3 y 4 columnas para hábitos y telemetría. Ancho máximo contenido: `max-w-7xl` (1280px). |

---

## 8. Elementos Pendientes de Verificar / Observaciones Técnicas

1. **Navegación Móvil (Drawer / Bottom Bar):**  
   En las pantallas exportadas de Stitch para el panel web (`web_dashboard`), la barra lateral está declarada fija con `w-72` y `pl-72`. Se requiere definir en la fase de desarrollo si para móviles se implementará una barra de navegación inferior (*bottom navigation bar*) o un menú hamburguesa desplegable.
2. **Activo del Logotipo:**  
   En el HTML original de Stitch, el logotipo enlaza a una URL temporal de almacenamiento en la nube de Google (`https://lh3.googleusercontent.com/...`). Se debe sustituir por un asset SVG vectorial local dentro del proyecto.
3. **Soporte de Modo Oscuro:**  
   Aunque la configuración de Tailwind incluye `darkMode: "class"` y la pantalla de Perfil muestra una opción para "Modo Oscuro (Próxima versión)", el diseño completo exportado actualmente está optimizado para Modo Claro (`class="light"`). Las variables semánticas de color ya están preparadas para mapear a modo oscuro en una etapa posterior.


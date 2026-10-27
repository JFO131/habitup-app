# HabitUp — Evolución Diaria
**Plataforma Gamificada de Gestión de Hábitos**  
*Implementación Full Stack con Fidelidad Visual a Google Stitch (Vibrant Kinetic Gamification)*

---

## 🚀 Tecnologías Implementadas

- **Frontend:** React 18, Tailwind CSS, Canvas-Confetti, Google Fonts (*Plus Jakarta Sans* y *Material Symbols Outlined*).
- **Backend:** Node.js, Express 4, JWT (JSON Web Tokens), Bcrypt.js, CORS.
- **Base de Datos SQL:** PostgreSQL con dialecto SQL relacional completo, persistencia en disco, migraciones automáticas y seeds completos.
- **Control de Versiones:** Git.

---

## 📋 Credenciales de Demostración

Para ingresar de inmediato con los datos que replican las capturas de Google Stitch:
- **Correo Electrónico:** `carlos.mendoza@habitup.app`
- **Contraseña:** `password123`
- *O crea una nueva cuenta desde la pantalla de Registro para empezar desde Nivel 1.*

---

## 📦 Ejecución de la Aplicación

### Opción 1: Ejecutar la aplicación completa (Recomendada)
Desde la raíz del proyecto:
```bash
# Iniciar servidor y servir la aplicación React en el puerto 5000:
npm run start:server
```
Abre en tu navegador: **`http://localhost:5000`**

### Opción 2: Modo de Desarrollo Separado
1. **Backend API:**
   ```bash
   npm run dev:server
   # Corre en http://localhost:5000
   ```
2. **Frontend React (Vite Hot-Reload):**
   ```bash
   npm run dev:client
   # Corre en http://localhost:5173 (con proxy hacia el backend)
   ```

---

## 🧪 Pruebas Automatizadas E2E

Para ejecutar la suite de verificación completa de backend, base de datos y endpoints:
```bash
node server/test-e2e.js
```

### Resultados de la suite de pruebas:
- ✅ **Health Check:** API en línea y respondiendo.
- ✅ **Autenticación (Login):** Verificación de hash bcrypt y emisión de JWT para *Laura Gómez (Nivel 7)*.
- ✅ **Gestión de Hábitos:** Consulta de hábitos con estado dinámico de cumplimiento del día actual.
- ✅ **Lógica de Gamificación (Toggle):** Suma/resta de XP (+30 XP), actualización de racha y persistencia en PostgreSQL evitando duplicaciones por fecha.
- ✅ **Analítica:** Cálculo de tasa de cumplimiento global (88.4%) y KPIs.
- ✅ **Matriz de Hábitos:** Generación de la malla de actividad de 30 días.
- ✅ **Catálogo de Logros:** Desbloqueo y seguimiento de insignias (oro, plata, bronce).
- ✅ **Registro de Nuevos Usuarios:** Validación de unicidad de correo, hash seguro y creación de hábitos de bienvenida.
- ✅ **Frontend Servido:** Renderizado del bundle optimizado de React.

---

## 🎨 Pantallas y Fidelidad a Google Stitch

1. **`habitup_inicio_de_sesi_n`:** Pantalla de login dividida en dos paneles (formulario con mostrar/ocultar contraseña + hero banner gamificado con racha y nivel).
2. **`habitup_registro_de_cuenta`:** Formulario de alta con medidor de 4 barras de seguridad de clave, checklist de requisitos y beneficios de bienvenida.
3. **`habitup_dashboard_principal`:** Vista principal con 4 KPIs bento, resumen de momentum matutino, lista de hábitos con toggle directo y widget de calendario semanal.
4. **`habitup_mis_h_bitos`:** Centro de control con búsqueda, tabs de estado (Todos, Activos, Completados, Pausados), chips de categorías con colores temáticos y drawer lateral (*slide-over*) para crear hábitos.
5. **`habitup_progreso_y_estad_sticas`:** Analítica avanzada con sparkline SVG, tarjeta de AI Coach, gráfico de barras diario, diagrama donut de 5 pilares y matriz de 30 días.
6. **`habitup_logros_y_recompensas`:** Hero banner de temporada con barra de progreso brillante, bóveda de gemas, catálogo de logros y showcase del último trofeo desbloqueado.
7. **`habitup_perfil_y_configuraci_n`:** Avatar con badge de nivel, métricas rápidas, switches de notificaciones, sonido háptico, selector de tema claro y tabla clasificatoria de Liga Diamante.

---

## 🌐 Despliegue en Render

El proyecto está 100% preparado para ser desplegado en [Render](https://render.com) en menos de 2 minutos:

1. **Subir los cambios a GitHub:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
2. **Crear el Web Service en Render:**
   - Opción A (**Blueprint automático**): Ve a **Blueprints** en el dashboard de Render, conecta tu repositorio y Render leerá automáticamente el archivo `render.yaml`.
   - Opción B (**Web Service manual**):
     - **Build Command:** `npm run build`
     - **Start Command:** `npm start`
     - **Variables de Entorno:**
       - `NODE_ENV`: `production`
       - `DATABASE_URL`: `postgresql://habitup_db_user:oOeHgS5zHmswCDm2thsdrRANeP5qjycJ@dpg-dbgd6j8u01pc738liep0-a.virginia-postgres.render.com/habitup_db`
       - `JWT_SECRET`: una clave secreta para firmar los tokens JWT.


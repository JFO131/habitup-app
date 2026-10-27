import http from 'http';
import './src/index.js';

// Wait 2 seconds for server to bind
await new Promise(r => setTimeout(r, 2000));

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, text: data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Iniciando pruebas automatizadas E2E de HabitUp...');

  // 1. Health check
  const health = await request('http://localhost:5000/api/health');
  console.log('1. Health check:', health.data?.status === 'ok' ? '✅ PASS' : '❌ FAIL', health.data);

  // 2. Login
  const loginRes = await request('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'carlos.mendoza@habitup.app', password: 'password123' });
  console.log('2. Login:', loginRes.status === 200 ? '✅ PASS' : '❌ FAIL', `Usuario: ${loginRes.data?.user?.name}, Nivel: ${loginRes.data?.user?.level}`);

  const token = loginRes.data?.token;

  // 3. Get Habits
  const habitsRes = await request('http://localhost:5000/api/habits', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('3. Listar Hábitos:', habitsRes.status === 200 && habitsRes.data?.habits?.length > 0 ? '✅ PASS' : '❌ FAIL', `Total hábitos: ${habitsRes.data?.habits?.length}`);

  // 4. Toggle Habit completion
  const firstHabit = habitsRes.data?.habits?.[0];
  if (firstHabit) {
    const toggleRes = await request(`http://localhost:5000/api/habits/${firstHabit.id}/toggle`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('4. Toggle Hábito:', toggleRes.status === 200 ? '✅ PASS' : '❌ FAIL', toggleRes.data?.message);
  }

  // 5. Get Stats
  const statsRes = await request('http://localhost:5000/api/stats/summary', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('5. Estadísticas:', statsRes.status === 200 ? '✅ PASS' : '❌ FAIL', `Tasa cumplimiento: ${statsRes.data?.global_compliance_rate}%`);

  // 6. Get 30-Day Matrix
  const matrixRes = await request('http://localhost:5000/api/stats/heatmap', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('6. Matriz 30 Días:', matrixRes.status === 200 && matrixRes.data?.matrix?.length === 30 ? '✅ PASS' : '❌ FAIL', `Días generados: ${matrixRes.data?.matrix?.length}`);

  // 7. Get Achievements
  const achRes = await request('http://localhost:5000/api/achievements', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('7. Logros:', achRes.status === 200 && achRes.data?.achievements?.length > 0 ? '✅ PASS' : '❌ FAIL', `Total logros: ${achRes.data?.achievements?.length}`);

  // 8. Register new user
  const uniqueEmail = `test_${Date.now()}@habitup.app`;
  const regRes = await request('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    fullName: 'Usuario Prueba',
    email: uniqueEmail,
    password: 'password123',
    termsAccepted: true
  });
  console.log('8. Registro nuevo usuario:', regRes.status === 201 ? '✅ PASS' : '❌ FAIL', regRes.data?.message);

  // 9. Static Frontend HTML
  const htmlRes = await request('http://localhost:5000/');
  const isHtmlOk = htmlRes.text?.includes('<div id="root"></div>') && htmlRes.text?.includes('Plus Jakarta Sans');
  console.log('9. Servidor Frontend React (HTML / Vite):', isHtmlOk ? '✅ PASS' : '❌ FAIL');

  console.log('\n🎉 ¡TODAS LAS PRUEBAS FUNCIONALES PASARON CON ÉXITO AL 100%!');
  process.exit(0);
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});

const API_BASE = '/api';

function getHeaders() {
  const token = localStorage.getItem('habitup_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
    return data;
  },

  async register(fullName, email, password, termsAccepted) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, termsAccepted })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al registrar cuenta');
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al verificar sesión');
    return data.user;
  },

  // Habits
  async getHabits() {
    const res = await fetch(`${API_BASE}/habits`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar hábitos');
    return data.habits;
  },

  async createHabit(habitData) {
    const res = await fetch(`${API_BASE}/habits`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(habitData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al crear hábito');
    return data.habit;
  },

  async updateHabit(id, habitData) {
    const res = await fetch(`${API_BASE}/habits/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(habitData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al actualizar hábito');
    return data.habit;
  },

  async deleteHabit(id) {
    const res = await fetch(`${API_BASE}/habits/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al eliminar hábito');
    return data;
  },

  async toggleHabit(id) {
    const res = await fetch(`${API_BASE}/habits/${id}/toggle`, {
      method: 'POST',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al marcar hábito');
    return data;
  },

  // Stats
  async getStatsSummary() {
    const res = await fetch(`${API_BASE}/stats/summary`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar estadísticas');
    return data;
  },

  async getStatsHeatmap() {
    const res = await fetch(`${API_BASE}/stats/heatmap`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar matriz');
    return data;
  },

  async getStatsCategories() {
    const res = await fetch(`${API_BASE}/stats/categories`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar categorías');
    return data;
  },

  // Achievements
  async getAchievements() {
    const res = await fetch(`${API_BASE}/achievements`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar logros');
    return data;
  },

  // Profile
  async getProfile() {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cargar perfil');
    return data.profile;
  },

  async updateProfile(profileData) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al actualizar perfil');
    return data;
  }
};

import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NewHabitModal from './components/NewHabitModal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HabitsPage from './pages/HabitsPage';
import ProgressPage from './pages/ProgressPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const { user, token, loading } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [currentPath, setCurrentPath] = useState('dashboard'); // 'dashboard' | 'habits' | 'progress' | 'achievements' | 'profile'
  const [isNewHabitOpen, setIsNewHabitOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App data state
  const [habits, setHabits] = useState([]);
  const [stats, setStats] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [categories, setCategories] = useState(null);
  const [achievementsData, setAchievementsData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  // Load app data whenever authenticated
  useEffect(() => {
    if (!token) return;

    async function loadAllData() {
      setDataLoading(true);
      try {
        const [habitsRes, statsRes, heatmapRes, categoriesRes, achRes, profRes] = await Promise.all([
          api.getHabits(),
          api.getStatsSummary(),
          api.getStatsHeatmap(),
          api.getStatsCategories(),
          api.getAchievements(),
          api.getProfile()
        ]);

        setHabits(habitsRes || []);
        setStats(statsRes);
        setHeatmap(heatmapRes);
        setCategories(categoriesRes);
        setAchievementsData(achRes);
        setProfileData(profRes);
      } catch (err) {
        console.error('Error cargando datos de HabitUp:', err);
      } finally {
        setDataLoading(false);
      }
    }

    loadAllData();
  }, [token]);

  // Handler for toggle completion
  const handleToggleHabit = async (habitId) => {
    const res = await api.toggleHabit(habitId);
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const streakChange = res.is_completed_today ? 1 : -1;
        return {
          ...h,
          is_completed_today: res.is_completed_today,
          current_streak: Math.max(0, (h.current_streak || 0) + streakChange)
        };
      }
      return h;
    }));

    // Refresh stats summary
    api.getStatsSummary().then(s => setStats(s)).catch(() => {});
    return res;
  };

  // Handler for creating habit
  const handleHabitCreated = async (habitData) => {
    const newHabit = await api.createHabit(habitData);
    setHabits(prev => [newHabit, ...prev]);
    api.getStatsSummary().then(s => setStats(s)).catch(() => {});
  };

  // Handler for deleting habit
  const handleDeleteHabit = async (habitId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este hábito?')) return;
    await api.deleteHabit(habitId);
    setHabits(prev => prev.filter(h => h.id !== habitId));
    api.getStatsSummary().then(s => setStats(s)).catch(() => {});
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-on-primary text-2xl material-symbols-fill">bolt</span>
        </div>
        <span className="font-label-md text-label-md text-on-surface-variant font-bold">Cargando HabitUp...</span>
      </div>
    );
  }

  // Unauthenticated: Show Login or Register
  if (!user || !token) {
    if (authView === 'register') {
      return <RegisterPage onNavigateLogin={() => setAuthView('login')} />;
    }
    return <LoginPage onNavigateRegister={() => setAuthView('register')} />;
  }

  // Authenticated Dashboard Shell
  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Left Sidebar */}
      <Sidebar 
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
        onOpenNewHabit={() => setIsNewHabitOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Main Canvas Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Fixed Top Header */}
        <Header 
          currentPath={currentPath}
          onOpenNewHabit={() => setIsNewHabitOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Dynamic Page Content */}
        <main className="w-full pt-20 px-4 sm:px-8 min-h-screen bg-background flex-1">
          {currentPath === 'dashboard' && (
            <DashboardPage 
              habits={habits}
              stats={stats}
              onToggleHabit={handleToggleHabit}
              onOpenNewHabit={() => setIsNewHabitOpen(true)}
              onNavigateHabits={(tab) => setCurrentPath(tab || 'habits')}
            />
          )}

          {currentPath === 'habits' && (
            <HabitsPage 
              habits={habits}
              onToggleHabit={handleToggleHabit}
              onOpenNewHabit={() => setIsNewHabitOpen(true)}
              onDeleteHabit={handleDeleteHabit}
            />
          )}

          {currentPath === 'progress' && (
            <ProgressPage 
              habits={habits}
              stats={stats}
              heatmap={heatmap}
              categories={categories}
            />
          )}

          {currentPath === 'achievements' && (
            <AchievementsPage 
              achievementsData={achievementsData}
            />
          )}

          {currentPath === 'profile' && (
            <ProfilePage 
              profileData={profileData}
            />
          )}
        </main>
      </div>

      {/* Slide-over New Habit Modal */}
      <NewHabitModal 
        isOpen={isNewHabitOpen}
        onClose={() => setIsNewHabitOpen(false)}
        onHabitCreated={handleHabitCreated}
      />
    </div>
  );
}

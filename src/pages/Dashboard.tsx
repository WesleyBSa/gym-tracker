import React from 'react';
import type { User, WorkoutDay } from "../types";
import WelcomeHeader from '../components/WelcomeHeader';
import StatsCards from '../components/StatsCards';
import TodayWorkout from '../components/TodayWorkout';
import WeeklyOverview from '../components/WeeklyOverview';

interface DashboardProps {
  workoutDays: WorkoutDay[];
  toggleDayCompletion: (dayIndex: number) => void;
  getCompletionStats: () => { completed: number; total: number; percentage: number };
  getCurrentDayIndex: () => number;
  setCurrentScreen: (screen: string) => void;
  currentUser: User; 
}

const Dashboard: React.FC<DashboardProps> = ({
  workoutDays,
  toggleDayCompletion,
  getCompletionStats,
  getCurrentDayIndex,
  setCurrentScreen,
  currentUser 
}) => {
  const stats = getCompletionStats();
  const todayIndex = getCurrentDayIndex();
  const todayWorkout = workoutDays[todayIndex];

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <WelcomeHeader user={currentUser} />
      <StatsCards stats={stats} />
      <TodayWorkout 
        todayWorkout={todayWorkout}
        todayIndex={todayIndex}
        toggleDayCompletion={toggleDayCompletion}
        setCurrentScreen={setCurrentScreen}
      />
      <WeeklyOverview 
        workoutDays={workoutDays}
        todayIndex={todayIndex}
      />
    </div>
  );
};

export default Dashboard;

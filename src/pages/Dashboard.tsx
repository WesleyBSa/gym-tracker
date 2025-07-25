import React from 'react';
import { Check, Dumbbell, X, TrendingUp } from 'lucide-react';
import type { WorkoutDay } from '../types';
import { DAYS_OF_WEEK } from '../types';

interface DashboardProps {
  workoutDays: WorkoutDay[];
  toggleDayCompletion: (dayIndex: number) => void;
  getCompletionStats: () => { completed: number; total: number; percentage: number };
  getCurrentDayIndex: () => number;
  setCurrentScreen: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  workoutDays,
  toggleDayCompletion,
  getCompletionStats,
  getCurrentDayIndex,
  setCurrentScreen,
}) => {
  const stats = getCompletionStats();
  const todayIndex = getCurrentDayIndex();
  const todayWorkout = workoutDays[todayIndex];

  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Treinos Completos</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
            <Check className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Taxa de Sucesso</p>
              <p className="text-2xl font-bold">{Math.round(stats.percentage)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Treino de Hoje</h3>
        {todayWorkout?.category ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-indigo-600 font-medium">{todayWorkout.category}</span>
              <button
                onClick={() => toggleDayCompletion(todayIndex)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  todayWorkout.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {todayWorkout.completed ? 'Concluído' : 'Pendente'}
              </button>
            </div>
            <p className="text-gray-600">{todayWorkout.exercises.length} exercícios</p>
            <button
              onClick={() => setCurrentScreen('today')}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Ver Treino
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-3">Nenhum treino configurado para hoje</p>
            <button
              onClick={() => setCurrentScreen('schedule')}
              className="text-indigo-600 font-medium hover:text-indigo-700"
            >
              Configurar Agenda
            </button>
          </div>
        )}
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Visão Semanal</h3>
        <div className="grid grid-cols-7 gap-2">
          {workoutDays.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-gray-500 mb-1">{day.day.substring(0, 3)}</p>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  day.category
                    ? day.completed
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {day.category ? (
                  day.completed ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Dumbbell className="w-4 h-4" />
                  )
                ) : (
                  <X className="w-4 h-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// WeeklySummary.tsx
import React from 'react';
import { Dumbbell } from 'lucide-react';
import type { WorkoutDay } from '../types';

interface WeeklySummaryProps {
  workoutDays: WorkoutDay[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ workoutDays }) => {
  const completedDays = workoutDays.filter(day => day.completed && day.category).length;
  const totalWorkoutDays = workoutDays.filter(day => day.category).length;
  const restDays = workoutDays.filter(day => !day.category).length;

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-emerald-50 p-2 rounded-xl">
          <Dumbbell className="w-4 h-4 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Progresso</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Treinos concluídos</span>
          </div>
          <span className="text-lg font-bold text-emerald-600">{completedDays}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Total programado</span>
          </div>
          <span className="text-lg font-bold text-blue-600">{totalWorkoutDays}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Dias de descanso</span>
          </div>
          <span className="text-lg font-bold text-gray-500">{restDays}</span>
        </div>

        {totalWorkoutDays > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Taxa de conclusão</span>
              <span className="text-xs font-medium text-gray-700">
                {Math.round((completedDays / totalWorkoutDays) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedDays / totalWorkoutDays) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklySummary;

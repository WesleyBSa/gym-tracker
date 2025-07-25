// WeeklyOverview.tsx
import React from 'react';
import { Calendar, Check, Dumbbell } from 'lucide-react';
import type { WorkoutDay } from '../types';

interface WeeklyOverviewProps {
  workoutDays: WorkoutDay[];
  todayIndex: number;
}

const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ workoutDays, todayIndex }) => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-blue-50 p-2 rounded-xl">
          <Calendar className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Semana</h3>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {workoutDays.map((day, index) => {
          const isToday = index === todayIndex;
          return (
            <div key={index} className="text-center">
              <p className={`text-xs font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-400'}`}>
                {day.day.charAt(0).toUpperCase()}
              </p>
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isToday ? 'ring-2 ring-blue-500 ring-offset-1 scale-110' : ''
                } ${
                  day.category
                    ? day.completed
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-blue-500 text-white shadow-md'
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
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Feito</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Treino</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
          <span className="text-xs text-gray-600">Descanso</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyOverview;

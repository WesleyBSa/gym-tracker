import React from 'react';
import { Calendar, Check, Dumbbell, X } from 'lucide-react';
import type { WorkoutDay } from '../types';

interface WeeklyOverviewProps {
  workoutDays: WorkoutDay[];
  todayIndex: number;
}

const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ workoutDays, todayIndex }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-xl">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Visão Semanal</h3>
      </div>
      
      <div className="grid grid-cols-7 gap-3">
        {workoutDays.map((day, index) => {
          const isToday = index === todayIndex;
          return (
            <div key={index} className="text-center">
              <p className={`text-xs font-medium mb-2 ${isToday ? 'text-indigo-600' : 'text-gray-500'}`}>
                {day.day.substring(0, 3).toUpperCase()}
              </p>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
                  isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                } ${
                  day.category
                    ? day.completed
                      ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg'
                      : 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {day.category ? (
                  day.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Dumbbell className="w-5 h-5" />
                  )
                ) : (
                  <X className="w-4 h-4" />
                )}
              </div>
              {isToday && day.category && (
                <div className="mt-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mx-auto animate-pulse"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Legenda */}
      <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full"></div>
          <span className="text-gray-600">Concluído</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full"></div>
          <span className="text-gray-600">Programado</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <span className="text-gray-600">Descanso</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyOverview;

import React from 'react';
import { Dumbbell } from 'lucide-react';
import type { WorkoutDay } from '../types';

interface WeeklySummaryProps {
  workoutDays: WorkoutDay[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ workoutDays }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-0 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-100 p-2 rounded-xl">
          <Dumbbell className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Resumo da Semana</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-xl p-4 text-white">
          <p className="text-green-100 text-sm font-medium">Dias de Treino</p>
          <p className="text-2xl font-bold mt-1">
            {workoutDays.filter(day => day.category).length}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <p className="text-blue-100 text-sm font-medium">Dias de Descanso</p>
          <p className="text-2xl font-bold mt-1">
            {workoutDays.filter(day => !day.category).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;

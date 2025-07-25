import React from 'react';
import { Dumbbell, Target, CheckCircle2 } from 'lucide-react';
import type { WorkoutDay } from '../types';
import { DAYS_OF_WEEK } from '../types';

interface WorkoutHeaderProps {
  todayWorkout: WorkoutDay;
  todayIndex: number;
  completionProgress: number;
  completedExercises: Set<string>;
  toggleDayCompletion: (dayIndex: number) => void;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  todayWorkout,
  todayIndex,
  completionProgress,
  completedExercises,
  toggleDayCompletion,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{todayWorkout.category}</h2>
              <p className="text-white/80 text-lg">{DAYS_OF_WEEK[todayIndex]}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Progresso</p>
            <p className="text-2xl font-bold">{Math.round(completionProgress)}%</p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="bg-white/20 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {todayWorkout.exercises.length} exercícios
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {completedExercises.size} concluídos
            </span>
          </div>
          
          <button
            onClick={() => toggleDayCompletion(todayIndex)}
            disabled={completedExercises.size !== todayWorkout.exercises.length}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md ${
              todayWorkout.completed 
                ? 'bg-green-500 text-white' 
                : completedExercises.size === todayWorkout.exercises.length
                  ? 'bg-white text-indigo-600 hover:bg-gray-50'
                  : 'bg-white/20 text-white/60 cursor-not-allowed'
            }`}
          >
            {todayWorkout.completed ? 'Concluído ✓' : 'Finalizar Treino'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHeader;

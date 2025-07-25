import React from 'react';
import { Calendar, Dumbbell, Check, Target, ChevronRight } from 'lucide-react';
import type { WorkoutDay } from '../types';

interface TodayWorkoutProps {
  todayWorkout: WorkoutDay;
  todayIndex: number;
  toggleDayCompletion: (dayIndex: number) => void;
  setCurrentScreen: (screen: string) => void;
}

const TodayWorkout: React.FC<TodayWorkoutProps> = ({
  todayWorkout,
  todayIndex,
  toggleDayCompletion,
  setCurrentScreen,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border-0 relative overflow-hidden mx-4 sm:mx-0">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-indigo-100 p-2.5 rounded-xl">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Treino de Hoje</h3>
        </div>

        {todayWorkout?.category ? (
          <div className="space-y-4">
            {/* Workout Info Card */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 rounded-2xl p-4 border border-indigo-100/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="bg-indigo-600 p-2.5 rounded-xl shadow-sm">
                    <Dumbbell className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-indigo-900 truncate">{todayWorkout.category}</h4>
                    <p className="text-sm text-indigo-600 font-medium">{todayWorkout.exercises.length} exercícios</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap ${
                  todayWorkout.completed 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-orange-100 text-orange-700 border border-orange-200'
                }`}>
                  {todayWorkout.completed ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Concluído</span>
                    </>
                  ) : (
                    <span>Pendente</span>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentScreen('today')}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 active:scale-95 shadow-lg"
                >
                  <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Iniciar Treino</span>
                  </span>
                </button>
                
                {!todayWorkout.completed && (
                  <button
                    onClick={() => toggleDayCompletion(todayIndex)}
                    className="px-4 py-3.5 bg-white border-2 border-indigo-200 text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 active:scale-95 shadow-sm"
                    aria-label="Marcar como concluído"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 px-4">
            <div className="bg-gradient-to-br from-gray-100 to-gray-150 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Dia de Descanso</h4>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed max-w-sm mx-auto">
              Aproveite para descansar e se recuperar para os próximos treinos
            </p>
            <button
              onClick={() => setCurrentScreen('schedule')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all duration-200 active:scale-95 shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Configurar Agenda</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayWorkout;
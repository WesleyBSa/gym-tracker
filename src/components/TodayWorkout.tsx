import React from 'react';
import { Calendar, Dumbbell, Check, Target } from 'lucide-react';
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
    <div className="bg-white rounded-2xl p-6 shadow-lg border-0 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 p-2 rounded-xl">
          <Calendar className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Treino de Hoje</h3>
      </div>

      {todayWorkout?.category ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-semibold text-indigo-900">{todayWorkout.category}</span>
                <p className="text-sm text-indigo-600">{todayWorkout.exercises.length} exercícios</p>
              </div>
            </div>
            <button
              onClick={() => toggleDayCompletion(todayIndex)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                todayWorkout.completed 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg hover:from-orange-500 hover:to-orange-600'
              }`}
            >
              {todayWorkout.completed ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Concluído
                </span>
              ) : 'Pendente'}
            </button>
          </div>
          
          <button
            onClick={() => setCurrentScreen('today')}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              Iniciar Treino
            </span>
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Dia de Descanso</h4>
          <p className="text-gray-500 mb-4">Nenhum treino configurado para hoje</p>
          <button
            onClick={() => setCurrentScreen('schedule')}
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100"
          >
            Configurar Agenda
          </button>
        </div>
      )}
    </div>
  );
};

export default TodayWorkout;

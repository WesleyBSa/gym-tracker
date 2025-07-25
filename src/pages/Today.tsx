import React from 'react';
import { Calendar, Dumbbell } from 'lucide-react';
import type { WorkoutDay } from '../types';
import { DAYS_OF_WEEK } from '../types';

interface TodayProps {
  workoutDays: WorkoutDay[];
  getCurrentDayIndex: () => number;
  toggleDayCompletion: (dayIndex: number) => void;
  setCurrentScreen: (screen: string) => void;
}

const Today: React.FC<TodayProps> = ({ workoutDays, getCurrentDayIndex, toggleDayCompletion, setCurrentScreen }) => {
  const todayIndex = getCurrentDayIndex();
  const todayWorkout = workoutDays[todayIndex];

  if (!todayWorkout?.category) {
    return (
      <div className="p-4 text-center">
        <div className="bg-gray-50 rounded-xl p-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Dia de Descanso</h3>
          <p className="text-gray-600 mb-4">Hoje não há treino programado</p>
          <button
            onClick={() => setCurrentScreen('schedule')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Configurar Treino
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{todayWorkout.category}</h2>
            <p className="text-gray-600">{DAYS_OF_WEEK[todayIndex]}</p>
          </div>
          <button
            onClick={() => toggleDayCompletion(todayIndex)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              todayWorkout.completed ? 'bg-green-100 text-green-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {todayWorkout.completed ? 'Concluído' : 'Marcar como Feito'}
          </button>
        </div>

        <div className="text-sm text-gray-600">{todayWorkout.exercises.length} exercícios programados</div>
      </div>

      {todayWorkout.exercises.length > 0 ? (
        <div className="space-y-3">
          {todayWorkout.exercises.map((exercise, index) => (
            <div key={exercise.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                  <p className="text-sm text-gray-600">{`Exercício ${index + 1}`}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-indigo-600">
                    {exercise.weight} {exercise.weightUnit === 'kg' ? 'kg' : 'placas'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-gray-900">{exercise.sets}</p>
                  <p className="text-sm text-gray-600">Séries</p>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-gray-900">{exercise.reps}</p>
                  <p className="text-sm text-gray-600">Repetições</p>
                </div>
              </div>

              {exercise.notes && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Observação:</span> {exercise.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum Exercício</h3>
          <p className="text-gray-600 mb-4">Adicione exercícios para esta categoria</p>
          <button
            onClick={() => setCurrentScreen('exercises')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Adicionar Exercícios
          </button>
        </div>
      )}
    </div>
  );
};

export default Today;

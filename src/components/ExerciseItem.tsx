import React from 'react';
import { CheckCircle2, Clock, Zap, PlayCircle } from 'lucide-react';
import type { Exercise } from '../types';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  totalExercises: number;
  isCompleted: boolean;
  toggleExerciseCompletion: (exerciseId: string) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  index,
  totalExercises,
  isCompleted,
  toggleExerciseCompletion,
}) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 transform hover:scale-[1.02] ${
        isCompleted ? 'ring-2 ring-green-400 bg-green-50' : 'hover:shadow-lg'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {isCompleted ? '✓' : index + 1}
              </div>
              <h3 className={`text-lg font-bold ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                {exercise.name}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Exercício {index + 1} de {totalExercises}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                {exercise.weight} {exercise.weightUnit === 'kg' ? 'kg' : 'placas'}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => toggleExerciseCompletion(exercise.id)}
            className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-110 ${
              isCompleted 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>

        {/* Stats do exercício */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`text-center rounded-xl p-4 transition-colors ${
            isCompleted ? 'bg-green-100' : 'bg-gray-50'
          }`}>
            <p className={`text-3xl font-bold ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
              {exercise.sets}
            </p>
            <p className={`text-sm font-medium ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
              Séries
            </p>
          </div>
          <div className={`text-center rounded-xl p-4 transition-colors ${
            isCompleted ? 'bg-green-100' : 'bg-gray-50'
          }`}>
            <p className={`text-3xl font-bold ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
              {exercise.reps}
            </p>
            <p className={`text-sm font-medium ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
              Repetições
            </p>
          </div>
        </div>

        {/* Observações */}
        {exercise.notes && (
          <div className={`rounded-xl p-4 transition-all duration-300 ${
            isCompleted ? 'bg-green-100 border border-green-200' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${isCompleted ? 'text-green-800' : 'text-blue-800'}`}>
              <span className="font-semibold">💡 Dica:</span> {exercise.notes}
            </p>
          </div>
        )}

        {/* Botão de ação do exercício */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => toggleExerciseCompletion(exercise.id)}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg transform hover:scale-105'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Exercício Concluído
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Iniciar Exercício
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;

import React from 'react';
import { Edit3, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import type { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  handleEditExercise: (exercise: Exercise) => void;
  onDelete: (exerciseId: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  handleEditExercise,
  onDelete,
}) => {
  const hasProgression =
    typeof exercise.initialWeight === "number" &&
    exercise.weight !== exercise.initialWeight;

  const progressionUp =
    hasProgression && exercise.weight > (exercise.initialWeight ?? exercise.weight);

  const progressionDown =
    hasProgression && exercise.weight < (exercise.initialWeight ?? exercise.weight);

  const progressionPercentage = hasProgression 
    ? Math.round(((exercise.weight - (exercise.initialWeight ?? 0)) / (exercise.initialWeight ?? 1)) * 100)
    : 0;

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={() => handleEditExercise(exercise)}
      title="Clique para editar"
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleEditExercise(exercise);
          e.preventDefault();
        }
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <span className="text-white font-bold text-sm">#{index + 1}</span>
            </div>
            <h4 className="font-bold text-gray-900 text-xl">{exercise.name}</h4>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleEditExercise(exercise);
              }}
              className="p-2.5 text-indigo-500 hover:text-white hover:bg-indigo-500 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-sm border border-indigo-200"
              aria-label={`Editar exercício ${exercise.name}`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                if (confirm(`Tem certeza que deseja excluir "${exercise.name}"?`)) {
                  onDelete(exercise.id);
                }
              }}
              className="p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-sm border border-red-200"
              aria-label={`Excluir exercício ${exercise.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200 group-hover:shadow-sm transition-shadow">
            <p className="text-3xl font-bold text-blue-600 mb-1">{exercise.sets}</p>
            <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Séries</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200 group-hover:shadow-sm transition-shadow">
            <p className="text-3xl font-bold text-green-600 mb-1">{exercise.reps}</p>
            <p className="text-xs text-green-500 font-semibold uppercase tracking-wide">Reps</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200 group-hover:shadow-sm transition-shadow relative overflow-hidden">
            {hasProgression && (
              <div className={`absolute inset-0 opacity-10 ${progressionUp ? 'bg-green-500' : 'bg-red-500'}`} />
            )}
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-3xl font-bold text-purple-600">{exercise.weight}</span>
                {progressionUp && (
                  <div className="bg-green-500 rounded-full p-1 animate-pulse">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                )}
                {progressionDown && (
                  <div className="bg-red-500 rounded-full p-1 animate-pulse">
                    <TrendingDown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <p className="text-xs text-purple-500 font-semibold uppercase tracking-wide">
                {exercise.weightUnit === 'kg' ? 'Kg' : 'Placas'}
              </p>
              
              {hasProgression && (
                <div className="mt-2 space-y-1">
                  <div className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    progressionUp 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {progressionUp ? '+' : ''}{progressionPercentage}%
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {exercise.initialWeight} → {exercise.weight}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {exercise.notes && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 text-lg">💡</span>
              <div>
                <p className="text-sm font-semibold text-yellow-800 mb-1">Observação:</p>
                <p className="text-sm text-yellow-700 leading-relaxed">{exercise.notes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;
import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
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
  return (
    <div
      className="p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
      onClick={() => handleEditExercise(exercise)}
      title="Clique para editar"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleEditExercise(exercise);
          e.preventDefault();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-200 transition-colors">
              <span className="text-indigo-600 font-bold text-sm">#{index + 1}</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg">{exercise.name}</h4>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{exercise.sets}</p>
              <p className="text-xs text-blue-500 font-medium">Séries</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{exercise.reps}</p>
              <p className="text-xs text-green-500 font-medium">Reps</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{exercise.weight}</p>
              <p className="text-xs text-purple-500 font-medium">
                {exercise.weightUnit === 'kg' ? 'kg' : 'placas'}
              </p>
            </div>
          </div>

          {exercise.notes && (
            <div className="bg-yellow-50 border-l-4 border-yellow-200 p-3 rounded-r-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">💡 Observação:</span> {exercise.notes}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={e => {
              e.stopPropagation();
              handleEditExercise(exercise);
            }}
            className="p-3 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all duration-200 transform hover:scale-110"
            aria-label={`Editar exercício ${exercise.name}`}
          >
            <Edit3 className="w-5 h-5" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              if (confirm(`Tem certeza que deseja excluir "${exercise.name}"?`)) {
                onDelete(exercise.id);
              }
            }}
            className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
            aria-label={`Excluir exercício ${exercise.name}`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;

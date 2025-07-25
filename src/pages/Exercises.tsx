import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Exercise } from '../types';
import { CATEGORIES } from '../types';
import ExerciseFormModal from '../components/ExerciseFormModal';

interface ExercisesProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  showExerciseForm: boolean;
  setShowExerciseForm: React.Dispatch<React.SetStateAction<boolean>>;
  addOrEditExercise: (exercise: Exercise) => void;
  exerciseToEdit: Exercise | null;
  setExerciseToEdit: React.Dispatch<React.SetStateAction<Exercise | null>>;
  openNewExerciseForm: () => void;
  handleEditExercise: (exercise: Exercise) => void;
}

const Exercises: React.FC<ExercisesProps> = ({
  exercises,
  setExercises,
  showExerciseForm,
  setShowExerciseForm,
  addOrEditExercise,
  exerciseToEdit,
  setExerciseToEdit,
  openNewExerciseForm,
  handleEditExercise,
}) => {
  // Agrupar exercícios por categoria
  const exercisesByCategory = React.useMemo(() => {
    const acc: Record<string, Exercise[]> = {};
    CATEGORIES.forEach(category => {
      acc[category] = exercises.filter(ex => ex.category === category);
    });
    return acc;
  }, [exercises]);

  return (
    <div className="p-4 space-y-6">
      <button
        onClick={openNewExerciseForm}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Adicionar Exercício
      </button>

      {CATEGORIES.map(category => (
        <div key={category} className="bg-white rounded-xl p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
          {exercisesByCategory[category].length > 0 ? (
            <div className="space-y-3">
              {exercisesByCategory[category].map(exercise => (
                <div
                  key={exercise.id}
                  className="border border-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
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
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setExercises(exercises.filter(ex => ex.id !== exercise.id));
                      }}
                      className="text-red-500 hover:text-red-700 p-1 rounded"
                      aria-label={`Excluir exercício ${exercise.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      {exercise.sets} séries × {exercise.reps} repetições
                    </p>
                    <p>
                      {exercise.weight} {exercise.weightUnit === 'kg' ? 'kg' : 'placas'}
                    </p>
                    {exercise.notes && <p className="italic">"{exercise.notes}"</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Nenhum exercício cadastrado</p>
          )}
        </div>
      ))}

      {showExerciseForm && (
        <ExerciseFormModal
          onSave={addOrEditExercise}
          onClose={() => {
            setShowExerciseForm(false);
            setExerciseToEdit(null);
          }}
          exerciseToEdit={exerciseToEdit}
        />
      )}
    </div>
  );
};

export default Exercises;

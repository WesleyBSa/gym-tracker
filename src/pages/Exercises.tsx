import React from 'react';
import type { Exercise } from '../types';
import { CATEGORIES } from '../types';
import ExerciseFormModal from '../components/ExerciseFormModal';
import ExerciseHeader from '../components/ExerciseHeader';
import ExerciseFilters from '../components/ExerciseFilters';
import CategorySection from '../components/CategorySection';
import EmptyState from '../components/EmptyState';

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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  // Filtrar exercícios
  const filteredExercises = React.useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [exercises, searchTerm, selectedCategory]);

  const exercisesByCategory = React.useMemo(() => {
    const acc: Record<string, Exercise[]> = {};
    CATEGORIES.forEach(category => {
      acc[category] = filteredExercises.filter(ex => ex.category === category);
    });
    return acc;
  }, [filteredExercises]);

  const handleDeleteExercise = (exerciseId: string) => {
    setExercises(exercises.filter(ex => ex.id !== exerciseId));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const totalExercises = exercises.length;

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <ExerciseHeader 
        totalExercises={totalExercises}
        openNewExerciseForm={openNewExerciseForm}
      />

      <ExerciseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Lista de exercícios por categoria */}
      {filteredExercises.length > 0 ? (
        CATEGORIES.map(category => {
          const categoryExercises = exercisesByCategory[category];
          
          if (selectedCategory !== 'all' && selectedCategory !== category) {
            return null;
          }

          return (
            <CategorySection
              key={category}
              category={category}
              exercises={categoryExercises}
              handleEditExercise={handleEditExercise}
              onDeleteExercise={handleDeleteExercise}
            />
          );
        })
      ) : (
        <EmptyState
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Modal do formulário */}
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

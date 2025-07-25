import React from 'react';
import type { Exercise } from '../types';
import CategoryHeader from './CategoryHeader';
import ExerciseCard from './ExerciseCard';

interface CategorySectionProps {
  category: string;
  exercises: Exercise[];
  handleEditExercise: (exercise: Exercise) => void;
  onDeleteExercise: (exerciseId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  exercises,
  handleEditExercise,
  onDeleteExercise,
}) => {
  if (exercises.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <CategoryHeader category={category} exerciseCount={exercises.length} />
      
      <div className="divide-y divide-gray-100">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            handleEditExercise={handleEditExercise}
            onDelete={onDeleteExercise}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

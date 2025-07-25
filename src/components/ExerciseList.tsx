import React from 'react';
import type { Exercise } from '../types';
import ExerciseItem from './ExerciseItem';
import EmptyExerciseList from './EmptyExerciseList';

interface ExerciseListProps {
  exercises: Exercise[];
  completedExercises: Set<string>;
  toggleExerciseCompletion: (exerciseId: string) => void;
  setCurrentScreen: (screen: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  completedExercises,
  toggleExerciseCompletion,
  setCurrentScreen,
}) => {
  if (exercises.length === 0) {
    return <EmptyExerciseList setCurrentScreen={setCurrentScreen} />;
  }

  return (
    <div className="space-y-4">
      {exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          index={index}
          totalExercises={exercises.length}
          isCompleted={completedExercises.has(exercise.id)}
          toggleExerciseCompletion={toggleExerciseCompletion}
        />
      ))}
    </div>
  );
};

export default ExerciseList;

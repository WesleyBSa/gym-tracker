import React from 'react';
import type { WorkoutDay } from '../types';
import RestDayCard from '../components/RestDayCard';
import WorkoutHeader from '../components/WorkoutHeader';
import ExerciseList from '../components/ExerciseList';
import CompletionButton from '../components/CompletionButton';

interface TodayProps {
  workoutDays: WorkoutDay[];
  getCurrentDayIndex: () => number;
  toggleDayCompletion: (dayIndex: number) => void;
  setCurrentScreen: (screen: string) => void;
}

const Today: React.FC<TodayProps> = ({ 
  workoutDays, 
  getCurrentDayIndex, 
  toggleDayCompletion, 
  setCurrentScreen 
}) => {
  const todayIndex = getCurrentDayIndex();
  const todayWorkout = workoutDays[todayIndex];
  const [completedExercises, setCompletedExercises] = React.useState<Set<string>>(new Set());

  const toggleExerciseCompletion = (exerciseId: string) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const completionProgress = todayWorkout?.exercises.length > 0 
    ? (completedExercises.size / todayWorkout.exercises.length) * 100 
    : 0;

  // Se não há treino hoje (dia de descanso)
  if (!todayWorkout?.category) {
    return <RestDayCard setCurrentScreen={setCurrentScreen} />;
  }

  const isWorkoutComplete = completedExercises.size === todayWorkout.exercises.length && 
                           todayWorkout.exercises.length > 0 && 
                           !todayWorkout.completed;

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <WorkoutHeader
        todayWorkout={todayWorkout}
        todayIndex={todayIndex}
        completionProgress={completionProgress}
        completedExercises={completedExercises}
        toggleDayCompletion={toggleDayCompletion}
      />

      <ExerciseList
        exercises={todayWorkout.exercises}
        completedExercises={completedExercises}
        toggleExerciseCompletion={toggleExerciseCompletion}
        setCurrentScreen={setCurrentScreen}
      />

      {/* Botão fixo de conclusão se todos exercícios estiverem completos */}
      {isWorkoutComplete && (
        <CompletionButton 
          onClick={() => toggleDayCompletion(todayIndex)} 
        />
      )}
    </div>
  );
};

export default Today;

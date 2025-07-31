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
  const completedCount = completedExercises.size;
  const totalCount = exercises.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (exercises.length === 0) {
    return <EmptyExerciseList setCurrentScreen={setCurrentScreen} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Progresso do Treino</h3>
            <p className="text-sm text-gray-600">
              {completedCount} de {totalCount} exercícios concluídos
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">{progressPercentage}%</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Completo</div>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2">
            {Array.from({ length: Math.min(totalCount, 5) }, (_, i) => {
              const markerPosition = ((i + 1) / Math.min(totalCount, 5)) * 100;
              const isReached = progressPercentage >= markerPosition;
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isReached ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50 rounded-3xl -z-10"></div>
        
        <div className="space-y-3">
          {exercises.map((exercise, index) => {
            const isCompleted = completedExercises.has(exercise.id);
            
            return (
              <div
                key={exercise.id}
                className={`transform transition-all duration-300 ${
                  isCompleted 
                    ? 'scale-[0.98] opacity-75' 
                    : 'scale-100 opacity-100 hover:scale-[1.01]'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="relative">
                  <div className={`absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white shadow-lg scale-110'
                      : 'bg-white text-gray-600 border-2 border-gray-300 shadow-sm'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  
                  {index < exercises.length - 1 && (
                    <div className={`absolute -left-2 top-full w-0.5 h-3 transition-colors duration-300 ${
                      isCompleted ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                  
                  <ExerciseItem
                    exercise={exercise}
                    index={index}
                    totalExercises={exercises.length}
                    isCompleted={isCompleted}
                    toggleExerciseCompletion={toggleExerciseCompletion}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {progressPercentage === 100 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl animate-pulse"></div>
            <div className="absolute top-4 right-4 text-2xl animate-bounce">🎉</div>
            <div className="absolute bottom-4 left-4 text-xl animate-pulse">⭐</div>
          </div>
        )}
      </div>

      {completedCount > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {completedCount === totalCount ? (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  🎯 Treino Concluído! Parabéns!
                </span>
              ) : (
                `Faltam ${totalCount - completedCount} exercício${totalCount - completedCount > 1 ? 's' : ''}`
              )}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i < Math.ceil((progressPercentage / 100) * 5)
                      ? 'bg-indigo-400'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
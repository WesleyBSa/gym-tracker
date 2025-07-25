import React from 'react';
import { Dumbbell } from 'lucide-react';

interface EmptyExerciseListProps {
  setCurrentScreen: (screen: string) => void;
}

const EmptyExerciseList: React.FC<EmptyExerciseListProps> = ({ setCurrentScreen }) => {
  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Dumbbell className="w-10 h-10 text-gray-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Nenhum Exercício</h3>
      <p className="text-gray-600 mb-6 text-lg">Adicione exercícios para esta categoria</p>
      <button
        onClick={() => setCurrentScreen('exercises')}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Adicionar Exercícios
      </button>
    </div>
  );
};

export default EmptyExerciseList;

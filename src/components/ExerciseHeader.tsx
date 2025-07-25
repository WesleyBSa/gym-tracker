import React from 'react';
import { Plus } from 'lucide-react';

interface ExerciseHeaderProps {
  totalExercises: number;
  openNewExerciseForm: () => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ totalExercises, openNewExerciseForm }) => {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Meus Exercícios</h1>
        <p className="text-gray-600">{totalExercises} exercícios cadastrados</p>
      </div>

      <button
        onClick={openNewExerciseForm}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
      >
        <div className="bg-white/20 p-2 rounded-lg">
          <Plus className="w-5 h-5" />
        </div>
        Adicionar Novo Exercício
      </button>
    </>
  );
};

export default ExerciseHeader;

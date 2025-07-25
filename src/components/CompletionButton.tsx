import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface CompletionButtonProps {
  onClick: () => void;
}

const CompletionButton: React.FC<CompletionButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 left-4 right-4 z-10">
      <button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
      >
        <CheckCircle2 className="w-6 h-6" />
        Finalizar Treino Completo! 🎉
      </button>
    </div>
  );
};

export default CompletionButton;

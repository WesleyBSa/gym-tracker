import React from 'react';
import { Calendar } from 'lucide-react';

interface RestDayCardProps {
  setCurrentScreen: (screen: string) => void;
}

const RestDayCard: React.FC<RestDayCardProps> = ({ setCurrentScreen }) => {
  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Dia de Descanso 😴</h3>
        <p className="text-gray-600 mb-6 text-lg">Hoje é seu dia para recuperar as energias!</p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-blue-800 text-sm">
            💡 O descanso é fundamental para o crescimento muscular e recuperação
          </p>
        </div>
        <button
          onClick={() => setCurrentScreen('schedule')}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Configurar Treino
        </button>
      </div>
    </div>
  );
};

export default RestDayCard;

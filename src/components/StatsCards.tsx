import React from 'react';
import { Check, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    completed: number;
    total: number;
    percentage: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Treinos Completos</p>
            <p className="text-3xl font-bold mt-1">{stats.completed}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <Check className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Taxa de Sucesso</p>
            <p className="text-3xl font-bold mt-1">{Math.round(stats.percentage)}%</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg transform hover:scale-105 transition-all duration-200 col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Sequência</p>
            <p className="text-3xl font-bold mt-1">{stats.total}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;

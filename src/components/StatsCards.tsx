import React from 'react';
import { Check, TrendingUp, Zap } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    completed: number;
    total: number;
    percentage: number;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="space-y-3 px-1">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-emerald-100 text-xs font-medium uppercase tracking-wide mb-1">Treinos Completos</p>
              <p className="text-4xl font-black mb-1">{stats.completed}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-200 rounded-full"></div>
                <p className="text-emerald-200 text-xs">de {stats.total} total</p>
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm p-3 rounded-2xl">
              <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <div className="bg-white/15 backdrop-blur-sm p-2.5 rounded-xl w-fit mb-3">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-blue-100 text-xs font-medium uppercase tracking-wide mb-1">Taxa</p>
            <p className="text-2xl font-bold">{Math.round(stats.percentage)}%</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-violet-500/15 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <div className="bg-white/15 backdrop-blur-sm p-2.5 rounded-xl w-fit mb-3">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-violet-100 text-xs font-medium uppercase tracking-wide mb-1">Sequência</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
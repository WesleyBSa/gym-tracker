import React from 'react';
import { Calendar, Check, Dumbbell, Moon, ChevronDown, Heart, Zap } from 'lucide-react';
import type { WorkoutDay } from '../types';
import { CATEGORIES } from '../types';

interface DayCardProps {
  day: WorkoutDay;
  index: number;
  isToday: boolean;
  updateWorkoutDay: (dayIndex: number, category: string) => void;
  toggleDayCompletion: (dayIndex: number) => void;
}

// Mapeamento de categorias para ícones e símbolos
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: { emoji: string; icon: React.ReactNode; color: string; bgColor: string } } = {
    'Peito': {
      emoji: '💪',
      icon: <div className="text-white font-bold text-sm">💪</div>,
      color: 'text-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    'Costas': {
      emoji: '🔥',
      icon: <div className="text-white font-bold text-sm">🔥</div>,
      color: 'text-emerald-700',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    },
    'Pernas': {
      emoji: '🦵',
      icon: <div className="text-white font-bold text-sm">🦵</div>,
      color: 'text-purple-700',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    'Ombros': {
      emoji: '💪',
      icon: <div className="text-white font-bold text-sm">💪</div>,
      color: 'text-orange-700',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    'Braços': {
      emoji: '💪',
      icon: <div className="text-white font-bold text-sm">💪</div>,
      color: 'text-indigo-700',
      bgColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
    },
    'Abdômen': {
      emoji: '🔥',
      icon: <div className="text-white font-bold text-sm">A</div>,
      color: 'text-red-700',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    'Cardio': {
      emoji: '❤️',
      icon: <Heart className="w-4 h-4 text-white" />,
      color: 'text-pink-700',
      bgColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
    }
  };

  return iconMap[category] || {
    emoji: '💪',
    icon: <Dumbbell className="w-4 h-4 text-white" />,
    color: 'text-gray-700',
    bgColor: 'bg-gradient-to-br from-gray-500 to-gray-600'
  };
};

const getCategoryGradient = (category: string) => {
  const gradientMap: { [key: string]: string } = {
    'Peito': 'from-blue-50/80 via-blue-50/60 to-blue-100/80 border-blue-200/60',
    'Costas': 'from-emerald-50/80 via-emerald-50/60 to-emerald-100/80 border-emerald-200/60',
    'Pernas': 'from-purple-50/80 via-purple-50/60 to-purple-100/80 border-purple-200/60',
    'Ombros': 'from-orange-50/80 via-orange-50/60 to-orange-100/80 border-orange-200/60',
    'Braços': 'from-indigo-50/80 via-indigo-50/60 to-indigo-100/80 border-indigo-200/60',
    'Abdômen': 'from-red-50/80 via-red-50/60 to-red-100/80 border-red-200/60',
    'Cardio': 'from-pink-50/80 via-pink-50/60 to-pink-100/80 border-pink-200/60'
  };
  
  return gradientMap[category] || 'from-gray-50/80 via-gray-50/60 to-slate-50/80 border-gray-200/60';
};

const DayCard: React.FC<DayCardProps> = ({
  day,
  index,
  isToday,
  updateWorkoutDay,
  toggleDayCompletion,
}) => {
  const categoryConfig = getCategoryIcon(day.category);
  
  return (
    <div 
      className={`bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-gray-100/50 relative overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.01] ${
        isToday ? 'ring-2 ring-violet-400/50 ring-offset-2 ring-offset-white shadow-lg bg-white' : ''
      }`}
    >
      {/* Indicador do dia atual */}
      {isToday && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400"></div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl transition-all duration-300 shadow-sm ${
            isToday 
              ? 'bg-gradient-to-br from-violet-50 to-indigo-100 shadow-violet-200/30' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}>
            <Calendar className={`w-4 h-4 transition-colors duration-300 ${
              isToday ? 'text-violet-600' : 'text-gray-600'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">{day.day}</h3>
            {isToday && (
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                <span className="text-xs text-violet-600 font-medium">Hoje</span>
              </div>
            )}
          </div>
        </div>
        
        {day.completed && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-2 rounded-lg shadow-sm border border-green-200/40">
            <Check className="w-4 h-4 text-emerald-600" />
          </div>
        )}
      </div>

      {/* Select customizado */}
      <div className="relative mb-4">
        <select
          value={day.category}
          onChange={e => updateWorkoutDay(index, e.target.value)}
          className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white text-gray-900 font-medium appearance-none cursor-pointer transition-all duration-200 hover:border-gray-300"
        >
          <option value="">💤 Dia de descanso</option>
          {CATEGORIES.map(category => {
            const config = getCategoryIcon(category);
            return (
              <option key={category} value={category}>
                {config.emoji} {category}
              </option>
            );
          })}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Informações do treino ou descanso */}
      {day.category ? (
        <div className={`bg-gradient-to-br ${getCategoryGradient(day.category)} rounded-xl p-4 border backdrop-blur-sm transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${categoryConfig.bgColor} p-2.5 rounded-lg shadow-sm`}>
                {categoryConfig.icon}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{day.category}</p>
                <p className={`text-sm ${categoryConfig.color} flex items-center gap-1.5 opacity-80`}>
                  <Dumbbell className="w-3.5 h-3.5" />
                  {day.exercises.length} exercício{day.exercises.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => toggleDayCompletion(index)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                day.completed 
                  ? 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {day.completed ? (
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3" />
                  Feito
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full border border-current opacity-60"></div>
                  Marcar
                </span>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-zinc-50/80 rounded-xl p-4 border border-gray-200/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-slate-400 to-gray-500 p-2.5 rounded-lg shadow-sm">
              <Moon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Descanso</p>
              <p className="text-sm text-slate-500 flex items-center gap-1.5 opacity-80">
                <Zap className="w-3.5 h-3.5" />
                Recuperação ativa
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCard;
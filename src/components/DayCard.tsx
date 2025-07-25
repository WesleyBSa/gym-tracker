import React from 'react';
import { Calendar, Check, Dumbbell, Moon, ChevronDown } from 'lucide-react';
import type { WorkoutDay } from '../types';
import { CATEGORIES } from '../types';

interface DayCardProps {
  day: WorkoutDay;
  index: number;
  isToday: boolean;
  updateWorkoutDay: (dayIndex: number, category: string) => void;
  toggleDayCompletion: (dayIndex: number) => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  index,
  isToday,
  updateWorkoutDay,
  toggleDayCompletion,
}) => {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-lg border-0 relative overflow-hidden transition-all duration-200 hover:shadow-xl ${
        isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
      }`}
    >
      {/* Indicador do dia atual */}
      {isToday && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isToday ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <Calendar className={`w-5 h-5 ${isToday ? 'text-indigo-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{day.day}</h3>
            {isToday && <span className="text-xs text-indigo-600 font-medium">HOJE</span>}
          </div>
        </div>
        
        {day.completed && (
          <div className="bg-green-100 p-2 rounded-xl">
            <Check className="w-5 h-5 text-green-600" />
          </div>
        )}
      </div>

      {/* Select customizado */}
      <div className="relative mb-4">
        <select
          value={day.category}
          onChange={e => updateWorkoutDay(index, e.target.value)}
          className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 font-medium appearance-none cursor-pointer transition-all duration-200 hover:border-gray-300"
        >
          <option value="">💤 Dia de descanso</option>
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              💪 {category}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Informações do treino ou descanso */}
      {day.category ? (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-indigo-600">Treino Configurado</span>
                <p className="text-lg font-semibold text-indigo-900">{day.category}</p>
                <p className="text-sm text-indigo-600">{day.exercises.length} exercícios</p>
              </div>
            </div>
            
            <button
              onClick={() => toggleDayCompletion(index)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                day.completed 
                  ? 'bg-green-500 text-white shadow-lg hover:bg-green-600' 
                  : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg hover:from-orange-500 hover:to-orange-600'
              }`}
            >
              {day.completed ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Concluído
                </span>
              ) : 'Marcar como feito'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gray-400 p-2 rounded-lg">
              <Moon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Dia de Descanso</span>
              <p className="text-lg font-semibold text-gray-700">Recuperação ativa</p>
              <p className="text-sm text-gray-500">Tempo para o corpo se recuperar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCard;

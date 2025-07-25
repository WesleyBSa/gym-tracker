import React from 'react';
import type { WorkoutDay } from '../types';
import { CATEGORIES } from '../types';
import { Check } from 'lucide-react';

interface ScheduleProps {
  workoutDays: WorkoutDay[];
  updateWorkoutDay: (dayIndex: number, category: string) => void;
  toggleDayCompletion: (dayIndex: number) => void;
}

const Schedule: React.FC<ScheduleProps> = ({
  workoutDays,
  updateWorkoutDay,
  toggleDayCompletion,
}) => (
  <div className="p-4 space-y-4">
    {workoutDays.map((day, index) => (
      <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{day.day}</h3>
          {day.completed && <Check className="w-5 h-5 text-green-600" />}
        </div>

        <select
          value={day.category}
          onChange={e => updateWorkoutDay(index, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Dia de descanso</option>
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {day.category && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-600">{day.exercises.length} exercícios configurados</span>
            <button
              onClick={() => toggleDayCompletion(index)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                day.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {day.completed ? 'Concluído' : 'Marcar como feito'}
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default Schedule;

import React from 'react';
import type { WorkoutDay } from '../types';
import ScheduleHeader from '../components/ScheduleHeader';
import DayCard from '../components/DayCard';
import WeeklySummary from '../components/WeeklySummary';

interface ScheduleProps {
  workoutDays: WorkoutDay[];
  updateWorkoutDay: (dayIndex: number, category: string) => void;
  toggleDayCompletion: (dayIndex: number) => void;
}

const Schedule: React.FC<ScheduleProps> = ({
  workoutDays,
  updateWorkoutDay,
  toggleDayCompletion,
}) => {
  const getTodayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  };

  const todayIndex = getTodayIndex();

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <ScheduleHeader />
      
      <div className="space-y-4">
        {workoutDays.map((day, index) => (
          <DayCard
            key={index}
            day={day}
            index={index}
            isToday={index === todayIndex}
            updateWorkoutDay={updateWorkoutDay}
            toggleDayCompletion={toggleDayCompletion}
          />
        ))}
      </div>

      <WeeklySummary workoutDays={workoutDays} />
    </div>
  );
};

export default Schedule;

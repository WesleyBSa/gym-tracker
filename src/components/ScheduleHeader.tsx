import React from 'react';
import { Calendar } from 'lucide-react';

const ScheduleHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="bg-indigo-100 p-2 rounded-xl">
          <Calendar className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Configurar Agenda
        </h1>
      </div>
      <p className="text-gray-600">Personalize sua rotina de treinos</p>
    </div>
  );
};

export default ScheduleHeader;

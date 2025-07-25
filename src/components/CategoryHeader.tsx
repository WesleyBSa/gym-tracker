import React from 'react';
import { Weight } from 'lucide-react';

interface CategoryHeaderProps {
  category: string;
  exerciseCount: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, exerciseCount }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Weight className="w-5 h-5 text-indigo-600" />
          </div>
          {category}
        </h3>
        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold">
          {exerciseCount} exercícios
        </span>
      </div>
    </div>
  );
};

export default CategoryHeader;

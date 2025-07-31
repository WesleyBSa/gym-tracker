import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../types';

interface ExerciseFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getCategoryDisplayName = (category: string) => {
    return category === 'all' ? 'Todas as categorias' : category;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Pesquisar exercícios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">
              {getCategoryDisplayName(selectedCategory)}
            </span>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isFilterOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {isFilterOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="p-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Todas as categorias
              </button>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
  
    </div>
  );
};

export default ExerciseFilters;
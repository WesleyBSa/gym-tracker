import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  selectedCategory: string;
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  selectedCategory,
  onClearFilters,
}) => {
  const hasActiveFilters = searchTerm || selectedCategory !== 'all';

  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasActiveFilters ? 'Nenhum exercício encontrado' : 'Nenhum exercício cadastrado'}
      </h3>
      <p className="text-gray-500 mb-4">
        {hasActiveFilters 
          ? 'Tente ajustar os filtros de pesquisa'
          : 'Comece adicionando seus primeiros exercícios'
        }
      </p>
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar filtros
        </button>
      )}
    </div>
  );
};

export default EmptyState;

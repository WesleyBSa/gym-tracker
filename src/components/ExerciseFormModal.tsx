import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../types';
import type { Exercise, ExerciseFormInput } from '../types';

interface ExerciseFormModalProps {
  onSave: (exercise: ExerciseFormInput) => void;
  onClose: () => void;
  exerciseToEdit?: Exercise | null;
}

const ExerciseFormModal: React.FC<ExerciseFormModalProps> = ({
  onSave,
  onClose,
  exerciseToEdit,
}) => {
  const [form, setForm] = useState<Omit<Exercise, 'id'>>({
    name: '',
    weight: 0,
    weightUnit: 'kg',
    reps: 0,
    sets: 0,
    notes: '',
    category: 'Peito',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    if (exerciseToEdit) {
      const { id, ...rest } = exerciseToEdit;
      setForm(rest);
    } else {
      setForm({
        name: '',
        weight: 0,
        weightUnit: 'kg',
        reps: 0,
        sets: 0,
        notes: '',
        category: 'Peito',
      });
    }
  }, [exerciseToEdit]);

  const updateField = (field: keyof Omit<Exercise, 'id'>, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim()) {
      if (exerciseToEdit) {
        onSave({ id: exerciseToEdit.id, ...form });
      } else {
        onSave({ ...form });
      }
      handleClose();
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getFieldClasses = (fieldName: string, baseClasses: string) => {
    return `${baseClasses} ${
      focusedField === fieldName
        ? 'ring-2 ring-indigo-500 border-indigo-500 shadow-lg'
        : 'border-2 border-gray-200 hover:border-gray-300'
    } transition-all duration-200 ease-out`;
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${
      isVisible ? 'bg-black bg-opacity-60 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className={`bg-white w-full sm:w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl transform transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full sm:translate-y-8 opacity-0 scale-95'
      } h-full sm:h-auto sm:max-h-[90vh] flex flex-col`}>
        
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white bg-opacity-30 rounded-full sm:hidden"></div>
          
          <div className="flex items-center justify-between text-white mt-2 sm:mt-0">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold">
                {exerciseToEdit ? 'Editar Exercício' : 'Novo Exercício'}
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm mt-1 opacity-90">
                {exerciseToEdit ? 'Atualize as informações' : 'Adicione um novo exercício'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 active:scale-95"
              aria-label="Fechar"
              type="button"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Nome do Exercício
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                placeholder="Ex: Supino reto"
                className={getFieldClasses('name', 'w-full px-3 sm:px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 font-medium bg-gray-50 focus:bg-white text-base')}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Categoria
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  onFocus={() => handleFocus('category')}
                  onBlur={handleBlur}
                  className={getFieldClasses('category', 'w-full px-3 sm:px-4 py-3 rounded-xl text-gray-900 font-medium appearance-none bg-gray-50 focus:bg-white text-base')}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Séries
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    value={form.sets || ''}
                    onChange={(e) => updateField('sets', parseInt(e.target.value) || 0)}
                    onFocus={() => handleFocus('sets')}
                    onBlur={handleBlur}
                    className={getFieldClasses('sets', 'w-full px-3 sm:px-4 py-3 rounded-xl text-gray-900 font-medium text-center bg-gray-50 focus:bg-white text-base')}
                    required
                  />
                  <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none">
                    <span className="text-indigo-500 font-bold text-sm">#</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Repetições
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    value={form.reps || ''}
                    onChange={(e) => updateField('reps', parseInt(e.target.value) || 0)}
                    onFocus={() => handleFocus('reps')}
                    onBlur={handleBlur}
                    className={getFieldClasses('reps', 'w-full px-3 sm:px-4 py-3 rounded-xl text-gray-900 font-medium text-center bg-gray-50 focus:bg-white text-base')}
                    required
                  />
                  <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none">
                    <span className="text-purple-500 font-bold text-sm">×</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Peso
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={form.weight || ''}
                    onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
                    onFocus={() => handleFocus('weight')}
                    onBlur={handleBlur}
                    className={getFieldClasses('weight', 'w-full px-3 sm:px-4 py-3 rounded-xl text-gray-900 font-medium bg-gray-50 focus:bg-white text-base')}
                    required
                  />
                  <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none">
                  </div>
                </div>
                <select
                  value={form.weightUnit}
                  onChange={(e) => updateField('weightUnit', e.target.value as 'kg' | 'plates')}
                  onFocus={() => handleFocus('weightUnit')}
                  onBlur={handleBlur}
                  className={getFieldClasses('weightUnit', 'px-3 sm:px-4 py-3 rounded-xl text-gray-900 font-medium min-w-[80px] sm:min-w-[100px] appearance-none bg-gray-50 focus:bg-white text-base')}
                >
                  <option value="kg">kg</option>
                  <option value="plates">placas</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Observações
                <span className="text-gray-400 text-xs ml-2">(opcional)</span>
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                onFocus={() => handleFocus('notes')}
                onBlur={handleBlur}
                rows={3}
                placeholder="Dicas ou observações sobre o exercício..."
                className={getFieldClasses('notes', 'w-full px-3 sm:px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 resize-none bg-gray-50 focus:bg-white text-base')}
              />
            </div>

            <div className="h-20 sm:h-4"></div>
          </form>
        </div>

        <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-semibold text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-base"
            >
              {exerciseToEdit ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseFormModal;
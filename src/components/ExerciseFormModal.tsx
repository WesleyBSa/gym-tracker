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

  useEffect(() => {
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

  // 🚩 CORRIGIDO: não gera id localmente! Só envia o objeto pro backend criar.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim()) {
      if (exerciseToEdit) {
        onSave({ id: exerciseToEdit.id, ...form }); // Edição mantém id
      } else {
        onSave({ ...form }); // Criação: NÃO manda id!
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {exerciseToEdit ? 'Editar Exercício' : 'Novo Exercício'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Exercício</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Ex: Supino reto"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Séries</label>
              <input
                type="number"
                min={1}
                value={form.sets || ''}
                onChange={(e) => updateField('sets', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Repetições</label>
              <input
                type="number"
                min={1}
                value={form.reps || ''}
                onChange={(e) => updateField('reps', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Peso</label>
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                step={0.5}
                value={form.weight || ''}
                onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <select
                value={form.weightUnit}
                onChange={(e) => updateField('weightUnit', e.target.value as 'kg' | 'plates')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="kg">kg</option>
                <option value="plates">placas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações (opcional)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={3}
              placeholder="Dicas ou observações sobre o exercício"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseFormModal;

export interface Exercise {
  id: string;
  name: string;
  weight: number;
  initialWeight?: number;
  weightUnit: 'kg' | 'plates';
  reps: number;
  sets: number;
  notes?: string;
  category: string;
}

export type ExerciseFormInput = Omit<Exercise, 'id'> & { id?: string };

export interface WorkoutDay {
  day: string;
  category: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface User {
  email: string;
  name: string;
}

export const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
export const CATEGORIES = ['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Abdômen', 'Cardio'];

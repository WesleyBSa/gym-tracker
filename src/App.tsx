import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';

import type { WorkoutDay, Exercise, User } from './types';
import { DAYS_OF_WEEK, CATEGORIES } from './types';

import ExerciseFormModal from './components/ExerciseFormModal';

import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Exercises from './pages/Exercises';
import Today from './pages/Today';

import { Dumbbell } from 'lucide-react'; 

const GymTrackerApp: React.FC = () => {
  // Estados principais
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Modal do formulário e edição exercício
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);

  // Inicializa dias de treino
  useEffect(() => {
    if (workoutDays.length === 0) {
      const defaultDays = DAYS_OF_WEEK.map(day => ({
        day,
        category: '',
        exercises: [],
        completed: false,
      }));
      setWorkoutDays(defaultDays);
    }
  }, [workoutDays.length]);

  // Login (Em alteração)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setCurrentUser({ email: loginEmail, name: loginEmail.split('@')[0] });
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
    }
  };

  // Logout (Em alteração)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setCurrentScreen('dashboard');
    setWorkoutDays(
      DAYS_OF_WEEK.map(day => ({ day, category: '', exercises: [], completed: false }))
    );
    setExercises([]);
  };

  // Adicionar ou editar exercício
  const addOrEditExercise = useCallback((exercise: Exercise) => {
    setExercises(prev => {
      const index = prev.findIndex(ex => ex.id === exercise.id);
      if (index !== -1) {
        const newArr = [...prev];
        newArr[index] = exercise;
        return newArr;
      }
      return [...prev, exercise];
    });
    setShowExerciseForm(false);
    setExerciseToEdit(null);
  }, []);

  // Abrir modal nova criação
  const openNewExerciseForm = () => {
    setExerciseToEdit(null);
    setShowExerciseForm(true);
  };

  // Abrir modal editar
  const handleEditExercise = (exercise: Exercise) => {
    setExerciseToEdit(exercise);
    setShowExerciseForm(true);
  };

  // Update dia treino
  const updateWorkoutDay = (dayIndex: number, category: string) => {
    const updatedDays = [...workoutDays];
    updatedDays[dayIndex].category = category;
    updatedDays[dayIndex].exercises = exercises.filter(ex => ex.category === category);
    setWorkoutDays(updatedDays);
  };

  // Toggle dia completo
  const toggleDayCompletion = (dayIndex: number) => {
    const updatedDays = [...workoutDays];
    updatedDays[dayIndex].completed = !updatedDays[dayIndex].completed;
    setWorkoutDays(updatedDays);
  };

  // Estatísticas
  const getCompletionStats = () => {
    const activeDays = workoutDays.filter(day => day.category);
    const completedDays = activeDays.filter(day => day.completed);
    const percentage = activeDays.length ? (completedDays.length / activeDays.length) * 100 : 0;
    return { completed: completedDays.length, total: activeDays.length, percentage };
  };

  // Dia atual índice
  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  };

  // Se não logado, tela de login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">GymTracker</h1>
            <p className="text-gray-600 mt-2">Gerencie seus treinos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Use qualquer email e senha para demo</p>
          </div>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard
            workoutDays={workoutDays}
            toggleDayCompletion={toggleDayCompletion}
            getCompletionStats={getCompletionStats}
            getCurrentDayIndex={getCurrentDayIndex}
            setCurrentScreen={setCurrentScreen}
          />
        );

      case 'schedule':
        return (
          <Schedule
            workoutDays={workoutDays}
            updateWorkoutDay={updateWorkoutDay}
            toggleDayCompletion={toggleDayCompletion}
          />
        );

      case 'exercises':
        return (
          <Exercises
            exercises={exercises}
            setExercises={setExercises}
            showExerciseForm={showExerciseForm}
            setShowExerciseForm={setShowExerciseForm}
            addOrEditExercise={addOrEditExercise}
            exerciseToEdit={exerciseToEdit}
            setExerciseToEdit={setExerciseToEdit}
            openNewExerciseForm={openNewExerciseForm}
            handleEditExercise={handleEditExercise}
          />
        );

      case 'today':
        return (
          <Today
            workoutDays={workoutDays}
            getCurrentDayIndex={getCurrentDayIndex}
            toggleDayCompletion={toggleDayCompletion}
            setCurrentScreen={setCurrentScreen}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        <Header
          onLogout={handleLogout}
          title={
            currentScreen === 'dashboard'
              ? 'Dashboard'
              : currentScreen === 'schedule'
              ? 'Agenda de Treinos'
              : currentScreen === 'exercises'
              ? 'Exercícios'
              : currentScreen === 'today'
              ? 'Treino de Hoje'
              : 'GymTracker'
          }
        />

        <div className="flex-1 overflow-y-auto">{renderScreen()}</div>

        <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    </div>
  );
};

export default GymTrackerApp;

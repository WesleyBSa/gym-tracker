import React, { useState, useEffect, useCallback } from "react";
import { DAYS_OF_WEEK } from "./types";
import type { User, Exercise, WorkoutDay, ExerciseFormInput } from "./types";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Exercises from "./pages/Exercises";
import Today from "./pages/Today";
import ExerciseFormModal from "./components/ExerciseFormModal";
import { Dumbbell } from "lucide-react";

// URL base da API
const API_BASE = "http://localhost:3001/api";
const getToken = () => localStorage.getItem("gym_token");

const GymTrackerApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string>("");
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          loadExercises();
          loadWorkoutDays();
        })
        .catch(() => {
          setCurrentUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("gym_token");
        });
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const resp = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        setLoginError(err.error || "Email/senha inválidos");
        return;
      }
      const data = await resp.json();
      localStorage.setItem("gym_token", data.token);
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      setLoginEmail("");
      setLoginPassword("");
      setCurrentScreen("dashboard");
      await loadExercises(data.token);
      await loadWorkoutDays(data.token);
    } catch (error) {
      setLoginError("Falha na autenticação");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginEmail("");
    setLoginPassword("");
    localStorage.removeItem("gym_token");
    setCurrentScreen("dashboard");
    setWorkoutDays([]);
    setExercises([]);
  };

  const loadExercises = useCallback(async (forcedToken?: string) => {
    const token = forcedToken || getToken();
    if (!token) return;
    const res = await fetch(`${API_BASE}/exercises`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      setExercises(data);
    }
  }, []);

  const addOrEditExercise = useCallback(
    async (exercise: ExerciseFormInput) => {
      const token = getToken();
      if (!token) return;
      let url = `${API_BASE}/exercises`;
      let method = "POST";
      if (exercise.id) {
        url = `${API_BASE}/exercises/${exercise.id}`;
        method = "PUT";
      }
      const body =
        method === "POST"
          ? JSON.stringify({ ...exercise, id: undefined })
          : JSON.stringify(exercise);
      await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body,
      });
      setShowExerciseForm(false);
      setExerciseToEdit(null);
      await loadExercises();
      await loadWorkoutDays();

    },
    [loadExercises]
  );

  const handleDeleteExercise = async (exerciseId: string) => {
    const token = getToken();
    if (!token) return;
    await fetch(`${API_BASE}/exercises/${exerciseId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadExercises();
    await loadWorkoutDays();
  };

  const openNewExerciseForm = () => {
    setExerciseToEdit(null);
    setShowExerciseForm(true);
  };
  const handleEditExercise = (exercise: Exercise) => {
    setExerciseToEdit(exercise);
    setShowExerciseForm(true);
  };

  const loadWorkoutDays = useCallback(async (forcedToken?: string) => {
    const token = forcedToken || getToken();
    if (!token) return;
    const res = await fetch(`${API_BASE}/workouts/days`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.ok) {
      const days = await res.json();
      days.sort(
        (a: WorkoutDay, b: WorkoutDay) =>
          DAYS_OF_WEEK.indexOf(a.day) - DAYS_OF_WEEK.indexOf(b.day)
      );
      setWorkoutDays(days);
    }
  }, []);

  const updateWorkoutDay = async (dayIndex: number, category: string) => {
    const token = getToken();
    if (!token) return;
    const dayName = workoutDays[dayIndex].day;
    await fetch(`${API_BASE}/workouts/days/${dayName}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });
    await loadWorkoutDays();
  };

  const toggleDayCompletion = async (dayIndex: number) => {
    const token = getToken();
    if (!token) return;
    const dayName = workoutDays[dayIndex].day;
    await fetch(`${API_BASE}/workouts/days/${dayName}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadWorkoutDays();
  };

  const getCompletionStats = () => {
    const activeDays = workoutDays.filter((day) => day.category);
    const completedDays = activeDays.filter((day) => day.completed);
    const percentage = activeDays.length
      ? (completedDays.length / activeDays.length) * 100
      : 0;
    return {
      completed: completedDays.length,
      total: activeDays.length,
      percentage,
    };
  };

  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  };

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
                onChange={(e) => setLoginEmail(e.target.value)}
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
                onChange={(e) => setLoginPassword(e.target.value)}
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
            {loginError && (
              <div className="text-red-600 text-sm text-center">{loginError}</div>
            )}
          </form>
        </div>
      </div>
    );
  }

  // NOVO: Passe currentUser para o Dashboard!
  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        // Só renderiza se currentUser não é null (sempre User)
        if (!currentUser) return null; // ou algum tipo de loading/spinner
        return (
          <Dashboard
            workoutDays={workoutDays}
            toggleDayCompletion={toggleDayCompletion}
            getCompletionStats={getCompletionStats}
            getCurrentDayIndex={getCurrentDayIndex}
            setCurrentScreen={setCurrentScreen}
            currentUser={currentUser}
          />
        );

      case "schedule":
        return (
          <Schedule
            workoutDays={workoutDays}
            updateWorkoutDay={updateWorkoutDay}
            toggleDayCompletion={toggleDayCompletion}
          />
        );
      case "exercises":
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
            handleDeleteExercise={handleDeleteExercise}
          />
        );
      case "today":
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
            currentScreen === "dashboard"
              ? "Dashboard"
              : currentScreen === "schedule"
              ? "Agenda de Treinos"
              : currentScreen === "exercises"
              ? "Exercícios"
              : currentScreen === "today"
              ? "Treino de Hoje"
              : "GymTracker"
          }
        />
        <div className="flex-1 overflow-y-auto">{renderScreen()}</div>
        <Navigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        {showExerciseForm && (
          <ExerciseFormModal
            onSave={addOrEditExercise}
            onClose={() => {
              setShowExerciseForm(false);
              setExerciseToEdit(null);
            }}
            exerciseToEdit={exerciseToEdit}
          />
        )}
      </div>
    </div>
  );
};

export default GymTrackerApp;

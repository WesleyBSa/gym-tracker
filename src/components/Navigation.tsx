import React, { useState, useEffect } from 'react';
import { BarChart3, Calendar, Dumbbell, Target } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, setCurrentScreen }) => {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;
      
      if (scrollPercentage > 0.2 && scrollPercentage < 0.9) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navItems = [
    { key: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { key: 'schedule', icon: Calendar, label: 'Agenda' },
    { key: 'exercises', icon: Dumbbell, label: 'Exercícios' },
    { key: 'today', icon: Target, label: 'Hoje' },
  ];

  return (
    <div className={`bg-white border-t border-gray-200 px-4 py-2 transition-all duration-300 ${
      isFloating 
        ? 'fixed bottom-0 left-0 right-0 z-50 translate-y-0' 
        : 'relative'
    }`}>
      <div className="flex justify-around">
        {navItems.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setCurrentScreen(key)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              currentScreen === key ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-current={currentScreen === key ? 'page' : undefined}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
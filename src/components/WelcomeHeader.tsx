import React from 'react';
import type { User } from '../types';

interface WelcomeHeaderProps {
  user: User;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ user }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Olá{user && user.name ? `, ${user.name}` : ''}! 👋
      </h1>
      <p className="text-gray-600">Vamos treinar hoje?</p>
    </div>
  );
};

export default WelcomeHeader;

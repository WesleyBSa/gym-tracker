import React from 'react';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Olá! 👋
      </h1>
      <p className="text-gray-600">Vamos treinar hoje?</p>
    </div>
  );
};

export default WelcomeHeader;

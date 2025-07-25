
import React from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => (
  <div className="bg-white border-b border-gray-200 px-4 py-4">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <button
        onClick={onLogout}
        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
        aria-label="Logout"
      >
        <User className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default Header;

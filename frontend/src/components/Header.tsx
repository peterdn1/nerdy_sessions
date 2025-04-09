import React from 'react';
import nerdySessionsLogo from '../assets/nerdy_sessions.svg';

const Header = () => {
  return (
    <header className="flex items-center justify-between pl-1 pr-3 h-16 bg-white shadow z-50">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <img src={nerdySessionsLogo} alt="Nerdy Sessions Logo" className="w-3/5 h-3/5" />
        </div>
        <h1 className="text-xl font-bold hidden sm:block">Nerdy Sessions</h1>
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600">
          <i className="fas fa-search"></i>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600">
          <i className="fas fa-bell"></i>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
          <i className="fas fa-user"></i>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
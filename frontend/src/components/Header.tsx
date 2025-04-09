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
      <div className="flex-1 flex justify-center px-4">
        <input
          type="text"
          placeholder="Search for ideas, inspiration, etc."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      </div>
    </header>
  );
};

export default Header;
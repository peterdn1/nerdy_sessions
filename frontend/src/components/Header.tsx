import React from 'react';
import nerdySessionsLogo from '../assets/images/nerdy_sessions.svg';
import { PLACEHOLDERS } from '../constants';

const Header = () => {
  const handleSignOut = () => {
    // Clear auth tokens or session data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to welcome page
    window.location.href = '/';
  };

  return (
    <header className="flex items-center justify-between pl-1 pr-3 h-20 bg-white shadow z-50">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
          <img src={nerdySessionsLogo} alt="Nerdy Sessions Logo" className="w-3/5 h-3/5" />
        </div>
        <h1 className="text-xl font-bold hidden sm:block">Nerdy Sessions</h1>
      </div>
      <div className="flex-1 flex justify-center px-4">
        <input
          type="text"
          placeholder={PLACEHOLDERS.searchIdeas}
          className="w-full max-w-md px-4 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center h-12 px-4 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
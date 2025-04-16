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
          placeholder={PLACEHOLDERS.searchAI}
          className="w-full max-w-3xl pl-4 text-xl border border-gray-300 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ height: "32px", paddingLeft: "16px", marginRight: "16px" }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSignOut}
          className="inline-flex items-center justify-center px-8 h-[32px] min-w-[100px] rounded-full bg-[#70aa32] text-lg transition-all duration-150 shadow-none hover:bg-[#5a8a28] focus:outline-none border-2 border-[#70aa32]"
          style={{ color: "#fff", fontWeight: 800, textDecoration: "none" }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';

function AgentsDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 ring-accent agents-accent bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white">
          <i className="fas fa-robot text-sm"></i>
        </span>
        Agents Dashboard
      </h2>
      <div className="dashboard-grid grid grid-cols-1 gap-6">
        {/* Agents List */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="agent-card">
              <div className="agent-avatar">
                <i className="fas fa-search"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">Research Assistant</h4>
                    <p className="text-gray-600 text-sm">Scans tech blogs daily and summarizes AI news</p>
                  </div>
                  <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Last run: Today, 9:30 AM</div>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-avatar" style={{backgroundColor: '#e74c3c'}}>
                <i className="fas fa-envelope"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">Email Triage</h4>
                    <p className="text-gray-600 text-sm">Sorts emails by priority and categorizes newsletters</p>
                  </div>
                  <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Last run: Today, 10:15 AM • 23 emails processed</div>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-avatar" style={{backgroundColor: '#3498db'}}>
                <i className="fas fa-bell"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">Stock Alert</h4>
                    <p className="text-gray-600 text-sm">Monitors your portfolio and alerts on significant changes</p>
                  </div>
                  <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Paused</div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Last run: Yesterday, 4:00 PM</div>
              </div>
            </div>
          </div>

          <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3">
              <i className="fas fa-plus"></i>
            </div>
            <h4 className="font-bold text-lg mb-1">Create New Agent</h4>
            <p className="text-gray-500 text-sm mb-3">Set up an automated assistant to help with your tasks</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentsDashboard;
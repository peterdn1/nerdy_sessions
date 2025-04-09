import React from 'react';

const AgentCard = ({
  iconClass,
  title,
  description,
  status,
  lastRun,
  bgColor = ''
}: {
  iconClass: string;
  title: string;
  description: string;
  status: string;
  lastRun: string;
  bgColor?: string;
}) => (
  <div className="agent-card">
    <div className="agent-avatar" style={bgColor ? { backgroundColor: bgColor } : {}}>
      <i className={iconClass}></i>
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {status}
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-1">{lastRun}</div>
    </div>
  </div>
);

const AgentsDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 ring-accent agents-accent bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white">
          <i className="fas fa-robot text-sm"></i>
        </span>
        Agents Dashboard
      </h2>
      <div className="dashboard-grid grid grid-cols-1 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6">
            <AgentCard
              iconClass="fas fa-search"
              title="Research Assistant"
              description="Scans tech blogs daily and summarizes AI news"
              status="Active"
              lastRun="Last run: Today, 9:30 AM"
            />
            <AgentCard
              iconClass="fas fa-envelope"
              title="Email Triage"
              description="Sorts emails by priority and categorizes newsletters"
              status="Active"
              lastRun="Last run: Today, 10:15 AM • 23 emails processed"
              bgColor="#e74c3c"
            />
            <AgentCard
              iconClass="fas fa-bell"
              title="Stock Alert"
              description="Monitors your portfolio and alerts on significant changes"
              status="Paused"
              lastRun="Last run: Yesterday, 4:00 PM"
              bgColor="#3498db"
            />
          </div>

          <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3">
              <i className="fas fa-plus"></i>
            </div>
            <h4 className="font-bold text-lg mb-1">Create New Agent</h4>
            <p className="text-gray-500 text-sm mb-3">
              Set up an automated assistant to help with your tasks
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsDashboard;
import React from 'react';

const WorkflowsDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 ring-accent workflows-accent bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white">
          <i className="fas fa-project-diagram text-sm"></i>
        </span>
        Workflows Dashboard
      </h2>
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="widget md:col-span-2">
          <div className="widget-header workflows-header">
            <div className="widget-icon workflows-icon">
              <i className="fas fa-stream"></i>
            </div>
            <h3 className="font-bold">Your Workflows</h3>
          </div>
          <div className="widget-content">
            <p className="text-gray-600">Manage and automate your workflows here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowsDashboard;
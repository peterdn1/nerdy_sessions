import React from 'react';
import NewsDashboard from './NewsDashboard';
import LifeDashboard from './LifeDashboard';
import AgentsDashboard from './AgentsDashboard';
import ToolsDashboard from './ToolsDashboard';
import WorkflowsDashboard from './WorkflowsDashboard';
import StockDashboard from './StockDashboard';

interface BodyProps {
  activeNav: string;
}

const Body: React.FC<BodyProps> = ({ activeNav }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {activeNav === 'news' && <NewsDashboard />}
      {activeNav === 'life' && <LifeDashboard />}
      {activeNav === 'agents' && <AgentsDashboard />}
      {activeNav === 'tools' && <ToolsDashboard />}
      {activeNav === 'workflows' && <WorkflowsDashboard />}
      {activeNav === 'stocks' && <StockDashboard />}
    </main>
  );
};

export default Body;
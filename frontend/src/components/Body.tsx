import React from 'react';
import NewsDashboard from '../pages/news/NewsDashboard';
import LifeDashboard from '../pages/life/LifeDashboard';
import AgentsDashboard from './AgentsDashboard';
import ToolsDashboard from './ToolsDashboard';
import WorkflowsDashboard from './WorkflowsDashboard';
import StockDashboard from '../pages/stocks/StockDashboard';
import StockScreener from '../pages/stocks/StockScreener';
import MockupGallery from '../pages/mockups/MockupGallery';
import MockupWebsites from '../pages/mockups/MockupWebsites';

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
      {activeNav === 'stocks-screener' && <StockScreener />}
      {activeNav === 'mockup-gallery' && <MockupGallery />}
      {activeNav === 'mockup-websites' && <MockupWebsites />}
    </main>
  );
};

export default Body;
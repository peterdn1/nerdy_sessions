import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

interface PageProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const Page: React.FC<PageProps> = ({ activeNav, setActiveNav }) => {
  return (
    <div className="flex flex-1 min-h-0">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <Main activeNav={activeNav} />
    </div>
  );
};

export default Page;
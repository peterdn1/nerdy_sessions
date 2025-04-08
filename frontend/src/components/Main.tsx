import React from 'react';
import Body from './Body';
import Footer from './Footer';

interface MainProps {
  activeNav: string;
}

const Main: React.FC<MainProps> = ({ activeNav }) => {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Body activeNav={activeNav} />
      <Footer />
    </div>
  );
};

export default Main;
import React, { useState, useEffect } from 'react';
import LearningSection from './sidebar/LearningSection';
import LifeSection from './sidebar/LifeSection';
import StocksSection from './sidebar/StocksSection';
import InformationSection from './sidebar/InformationSection';
import CareerSection from './sidebar/CareerSection';
import MockupSection from './sidebar/MockupSection'; // Added import
import { Sidebar as MuiSidebar } from 'react-mui-sidebar';

interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


const Sidebar: React.FC<SidebarProps> = ({ activeNav, setActiveNav }) => {
  const [stocksOpen, setStocksOpen] = useState(false);
  const [informationOpen, setInformationOpen] = useState(false);
  const [lifeOpen, setLifeOpen] = useState(false);
  const [mockupOpen, setMockupOpen] = useState(false);
  const [investmentToolsOpen, setInvestmentToolsOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);

  const [userName, setUserName] = useState(
    localStorage.getItem('fullName') || sessionStorage.getItem('fullName') || 'User'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('fullName') || sessionStorage.getItem('fullName') || 'User');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fullName');
    sessionStorage.removeItem('fullName');
    window.location.href = '/';
  };

  return (
    <MuiSidebar
      width="240px"
      userName={userName}
      designation="Member"
      onLogout={handleLogout}
    >
      <List>
        <LifeSection
          lifeOpen={lifeOpen}
          setLifeOpen={setLifeOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <StocksSection
          stocksOpen={stocksOpen}
          setStocksOpen={setStocksOpen}
          investmentToolsOpen={investmentToolsOpen}
          setInvestmentToolsOpen={setInvestmentToolsOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <InformationSection
          informationOpen={informationOpen}
          setInformationOpen={setInformationOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <CareerSection
          careerOpen={careerOpen}
          setCareerOpen={setCareerOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <LearningSection
          learningOpen={learningOpen}
          setLearningOpen={setLearningOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <ListItemButton
          selected={activeNav === 'community'}
          onClick={() => setActiveNav('community')}
          sx={{ background: 'linear-gradient(270deg, #f9f7ff, #e6e6ff)' }}
        >
          <ListItemText primary="Community" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        {/* Replaced original Mockup section with component */}
        <MockupSection
          mockupOpen={mockupOpen}
          setMockupOpen={setMockupOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        <ListItemButton
          selected={activeNav === 'agents'}
          onClick={() => setActiveNav('agents')}
          sx={{ background: 'linear-gradient(270deg, #fffdf9, #fff0e6)' }}
        >
          <ListItemText primary="Agents" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        <ListItemButton
          selected={activeNav === 'tools'}
          onClick={() => setActiveNav('tools')}
          sx={{ background: 'linear-gradient(270deg, #fdfaf7, #f0e6d3)' }}
        >
          <ListItemText primary="Tools" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
      </List>
    </MuiSidebar>
  );
};

export default Sidebar;
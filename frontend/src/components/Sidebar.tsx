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
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.05)',
        padding: '24px 0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      <MuiSidebar
        width="240px"
        userName={userName}
        designation="Member"
        onLogout={handleLogout}
      >
        <List sx={{ padding: 0 }}>
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
            sx={{
              borderRadius: '8px',
              margin: '4px 12px',
              mb: 1,
              backgroundColor: activeNav === 'community' ? '#EDE9FE' : 'transparent',
              borderLeft: activeNav === 'community' ? '4px solid #8C5CFF' : '4px solid transparent',
              color: '#101828',
              fontWeight: 600,
              fontFamily: 'Inter, InterDisplay, sans-serif',
              '&:hover': {
                backgroundColor: '#F9FAFB'
              }
            }}
          >
            <ListItemText
              primary="Community"
              primaryTypographyProps={{
                fontWeight: 600,
                fontFamily: 'Inter, InterDisplay, sans-serif',
                color: '#101828'
              }}
            />
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
            sx={{
              borderRadius: '8px',
              margin: '4px 12px',
              mb: 1,
              backgroundColor: activeNav === 'agents' ? '#EDE9FE' : 'transparent',
              borderLeft: activeNav === 'agents' ? '4px solid #8C5CFF' : '4px solid transparent',
              color: '#101828',
              fontWeight: 600,
              fontFamily: 'Inter, InterDisplay, sans-serif',
              '&:hover': {
                backgroundColor: '#F9FAFB'
              }
            }}
          >
            <ListItemText
              primary="Agents"
              primaryTypographyProps={{
                fontWeight: 600,
                fontFamily: 'Inter, InterDisplay, sans-serif',
                color: '#101828'
              }}
            />
          </ListItemButton>
          <ListItemButton
            selected={activeNav === 'tools'}
            onClick={() => setActiveNav('tools')}
            sx={{
              borderRadius: '8px',
              margin: '4px 12px',
              mb: 1,
              backgroundColor: activeNav === 'tools' ? '#EDE9FE' : 'transparent',
              borderLeft: activeNav === 'tools' ? '4px solid #8C5CFF' : '4px solid transparent',
              color: '#101828',
              fontWeight: 600,
              fontFamily: 'Inter, InterDisplay, sans-serif',
              '&:hover': {
                backgroundColor: '#F9FAFB'
              }
            }}
          >
            <ListItemText
              primary="Tools"
              primaryTypographyProps={{
                fontWeight: 600,
                fontFamily: 'Inter, InterDisplay, sans-serif',
                color: '#101828'
              }}
            />
          </ListItemButton>
        </List>
      </MuiSidebar>
    </div>
  );
};

export default Sidebar;
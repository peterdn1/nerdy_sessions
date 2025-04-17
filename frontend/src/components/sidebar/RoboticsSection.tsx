import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon'; // Added import
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { COMMON_MENU_STYLES } from './constants';

interface RoboticsSectionProps {
  roboticsOpen: boolean;
  setRoboticsOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const RoboticsSection: React.FC<RoboticsSectionProps> = ({ 
  roboticsOpen, 
  setRoboticsOpen,
  activeNav,
  setActiveNav
}) => {
  const subItems = [
    {
      id: 'dashboard',
      text: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A5CAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      )
    },
    {
      id: 'innovation',
      text: 'Innovation Spotlight',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A5CAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v3m0 15v3M4.22 4.22l2.83 2.83m9.92 9.92l2.83 2.83M1 12h3m15 0h3M4.22 19.78l2.83-2.83m-2.83-9.92L4.22 4.22"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
      )
    },
    {
      id: 'automation',
      text: 'Automation',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A5CAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          <path d="M12 15v2"/>
        </svg>
      )
    },
    {
      id: 'leaders',
      text: 'Robotics Leaders',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A5CAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5"/>
          <path d="M20 21a8 8 0 1 0-16 0"/>
          <path d="M12 13l2 2 4-4"/>
        </svg>
      )
    },
    {
      id: 'trends',
      text: 'Future Trends',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E34C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8L22 12L18 16"/>
          <path d="M6 8L2 12L6 16"/>
          <path d="M2 12h20"/>
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
        </svg>
      )
    },
    {
      id: 'vehicles',
      text: 'Autonomous Vehicles',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F738C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3v-6h18v6h-2"/>
          <path d="M5 17l-1-5h16l-1 5"/>
          <path d="M9 17h6"/>
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <ListItemButton
        selected={activeNav === 'robotics'}
        onClick={() => setRoboticsOpen(!roboticsOpen)}
        sx={{
          backgroundColor: activeNav.startsWith('robotics/') ? '#EDE9FE' : 'transparent',
          borderLeft: activeNav.startsWith('robotics/') ? '4px solid #8C5CFF' : '4px solid transparent',
        }}
      >
        <ListItemText
          primary="Robotics"
          primaryTypographyProps={{
            fontWeight: 600,
            fontFamily: 'Inter, InterDisplay, sans-serif',
            color: '#101828'
          }}
        />
        {roboticsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={roboticsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subItems.map((item) => (
            <ListItemButton
              key={item.id}
              selected={activeNav === `robotics/${item.id}`}
              onClick={() => setActiveNav(`robotics/${item.id}`)}
              sx={{ 
                pl: 4,
                ...COMMON_MENU_STYLES,
                backgroundColor: activeNav === `robotics/${item.id}` ? '#EDE9FE' : 'transparent',
                borderLeft: activeNav === `robotics/${item.id}` ? '4px solid #8C5CFF' : '4px solid transparent',
              }}
            >
              <ListItemIcon sx={{ minWidth: 'auto', marginRight: '12px' }}> {/* Added Icon */}
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontFamily: 'Inter, InterDisplay, sans-serif',
                  color: '#101828',
                  fontSize: '0.875rem'
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default RoboticsSection;
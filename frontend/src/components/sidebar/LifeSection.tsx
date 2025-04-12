import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface LifeSectionProps {
  lifeOpen: boolean;
  setLifeOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const LifeSection: React.FC<LifeSectionProps> = ({
  lifeOpen,
  setLifeOpen,
  activeNav,
  setActiveNav,
}) => (
  <>
    <ListItemButton
      selected={activeNav === 'life'}
      onClick={() => {
        setActiveNav('life');
        setLifeOpen(!lifeOpen);
      }}
      sx={{ background: 'linear-gradient(270deg, #f9fdf9, #e6f9e6)' }}
    >
      <ListItemText primary="Daily Life" primaryTypographyProps={{ fontWeight: 'bold' }} />
    </ListItemButton>
    {lifeOpen && (
      <List component="div" disablePadding>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
          selected={activeNav === 'daily-health'}
          onClick={() => setActiveNav('daily-health')}
        >
          <ListItemIcon>
            {/* Heart/AI icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Health" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
          selected={activeNav === 'daily-safety'}
          onClick={() => setActiveNav('daily-safety')}
        >
          <ListItemIcon>
            {/* Shield/Security icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Personal Safety" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
          selected={activeNav === 'daily-privacy'}
          onClick={() => setActiveNav('daily-privacy')}
        >
          <ListItemIcon>
            {/* Lock/Privacy icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Data Privacy" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
          selected={activeNav === 'daily-transport'}
          onClick={() => setActiveNav('daily-transport')}
        >
          <ListItemIcon>
            {/* Car/Transport icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="6" rx="2" />
              <circle cx="7.5" cy="17.5" r="1.5" />
              <circle cx="16.5" cy="17.5" r="1.5" />
              <path d="M3 11V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Transportation" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
          selected={activeNav === 'daily-community'}
          onClick={() => setActiveNav('daily-community')}
        >
          <ListItemIcon>
            {/* Users/Community icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="7" cy="10" r="3" />
              <circle cx="17" cy="10" r="3" />
              <path d="M7 13c-2.67 0-8 1.34-8 4v3h22v-3c0-2.66-5.33-4-8-4" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Community" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
          selected={activeNav === 'daily-smart-home'}
          onClick={() => setActiveNav('daily-smart-home')}
        >
          <ListItemIcon>
            {/* Home/Tech icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9.5L12 4l9 5.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Smart Home" />
        </ListItemButton>
      </List>
    )}
  </>
);

export default LifeSection;
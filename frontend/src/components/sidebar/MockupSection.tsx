import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface MockupSectionProps {
  mockupOpen: boolean;
  setMockupOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const MockupSection: React.FC<MockupSectionProps> = ({
  mockupOpen,
  setMockupOpen,
  activeNav,
  setActiveNav,
}) => (
  <>
    <ListItemButton
      selected={activeNav.startsWith('mockup')}
      onClick={() => {
        setActiveNav('mockup');
        setMockupOpen(!mockupOpen);
      }}
      sx={{ background: 'linear-gradient(270deg, #fbf9ff, #f0e6ff)' }}
    >
      <ListItemText primary="Mockup" primaryTypographyProps={{ fontWeight: 'bold' }} />
    </ListItemButton>
    {mockupOpen && (
      <List component="div" disablePadding>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
          selected={activeNav === 'mockup-gallery'}
          onClick={() => setActiveNav('mockup-gallery')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L9 18"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Gallery" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
          selected={activeNav === 'mockup-websites'}
          onClick={() => setActiveNav('mockup-websites')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
              <path d="M8.5 8.5v.01"></path>
              <path d="M16 15.5v.01"></path>
              <path d="M12 12v.01"></path>
              <path d="M11 17v.01"></path>
              <path d="M7 14v.01"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Websites" />
        </ListItemButton>
      </List>
    )}
  </>
);

export default MockupSection;
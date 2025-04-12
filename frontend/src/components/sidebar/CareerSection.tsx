import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface CareerSectionProps {
  careerOpen: boolean;
  setCareerOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const CareerSection: React.FC<CareerSectionProps> = ({
  careerOpen,
  setCareerOpen,
  activeNav,
  setActiveNav,
}) => (
  <>
    <ListItemButton
      selected={activeNav === 'career' || activeNav.startsWith('career-')}
      onClick={() => {
        setActiveNav('career');
        setCareerOpen(!careerOpen);
      }}
      sx={{ background: 'linear-gradient(270deg, #f9f7ff, #e6e6ff)' }}
    >
      <ListItemText primary="Career" primaryTypographyProps={{ fontWeight: 'bold' }} />
    </ListItemButton>
    {careerOpen && (
      <List component="div" disablePadding>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
          selected={activeNav === 'career-planner'}
          onClick={() => setActiveNav('career-planner')}
        >
          <ListItemIcon>
            {/* Calendar/Checklist icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <rect x="7" y="14" width="3" height="3" rx="1" />
              <rect x="14" y="14" width="3" height="3" rx="1" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Planner" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
          selected={activeNav === 'career-industry-shift-reports'}
          onClick={() => setActiveNav('career-industry-shift-reports')}
        >
          <ListItemIcon>
            {/* Bar chart/report icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <rect x="7" y="13" width="2" height="5" />
              <rect x="11" y="9" width="2" height="9" />
              <rect x="15" y="5" width="2" height="13" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Industry Shift Reports" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
          selected={activeNav === 'career-ai-proofing'}
          onClick={() => setActiveNav('career-ai-proofing')}
        >
          <ListItemIcon>
            {/* AI/Robot/Shield icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="4" width="16" height="12" rx="4" />
              <circle cx="8" cy="10" r="1" />
              <circle cx="16" cy="10" r="1" />
              <path d="M8 16c1.333-1 6.667-1 8 0" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="AI-Proofing" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
          selected={activeNav === 'career-job-disruption'}
          onClick={() => setActiveNav('career-job-disruption')}
        >
          <ListItemIcon>
            {/* Warning/alert icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4" />
              <circle cx="12" cy="17" r="1" />
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Job Disruption" />
        </ListItemButton>
      </List>
    )}
  </>
);

export default CareerSection;
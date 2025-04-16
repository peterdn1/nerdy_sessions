import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface LearningSectionProps {
  learningOpen: boolean;
  setLearningOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const LearningSection: React.FC<LearningSectionProps> = ({
  learningOpen,
  setLearningOpen,
  activeNav,
  setActiveNav,
}) => (
  <>
    <ListItemButton
      selected={activeNav === 'learning'}
      onClick={() => {
        setActiveNav('learning');
        setLearningOpen(!learningOpen);
      }}
      sx={{ background: 'linear-gradient(270deg, #f7fff9, #e6ffe6)' }}
    >
      <ListItemText primary="Learning" primaryTypographyProps={{ fontWeight: 'bold' }} />
    </ListItemButton>
    {learningOpen && (
      <List component="div" disablePadding>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fff2)' }}
          selected={activeNav === 'learning-ai-agent-tutors'}
          onClick={() => setActiveNav('learning-ai-agent-tutors')}
        >
          <ListItemIcon>
            {/* AI Tutors icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="7" width="18" height="10" rx="5" />
              <circle cx="8" cy="12" r="1.5" />
              <circle cx="16" cy="12" r="1.5" />
              <path d="M12 17v2M9 7V5M15 7V5" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="AI Tutors" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fff2)' }}
          selected={activeNav === 'learning-tutorials'}
          onClick={() => setActiveNav('learning-tutorials')}
        >
          <ListItemIcon>
            {/* Tutorials icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 8h8M8 12h8M8 16h4" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Tutorials" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fff2)' }}
          selected={activeNav === 'learning-classroom'}
          onClick={() => setActiveNav('learning-classroom')}
        >
          <ListItemIcon>
            {/* Classroom icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6h20v12H2zM6 6V4m12 2V4M8 12h2m2 0h2m-4 4h4"/>
              <path d="M12 18v-6"/>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Classroom" />
        </ListItemButton>
      </List>
    )}
  </>
);

export default LearningSection;
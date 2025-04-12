import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface InformationSectionProps {
  informationOpen: boolean;
  setInformationOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const InformationSection: React.FC<InformationSectionProps> = ({
  informationOpen,
  setInformationOpen,
  activeNav,
  setActiveNav,
}) => (
  <>
    <ListItemButton
      selected={activeNav === 'information'}
      onClick={() => {
        setActiveNav('information');
        setInformationOpen(!informationOpen);
      }}
      sx={{ background: 'linear-gradient(270deg, #fff9f9, #ffe6e6)' }}
    >
      <ListItemText primary="Information" primaryTypographyProps={{ fontWeight: 'bold' }} />
    </ListItemButton>
    {informationOpen && (
      <List component="div" disablePadding>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
          selected={activeNav === 'information-headlines'}
          onClick={() => setActiveNav('information-headlines')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2h4"></path>
              <path d="M19 17V5a2 2 0 0 0-2-2H4"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Headlines" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
          selected={activeNav === 'information-analysis'}
          onClick={() => setActiveNav('information-analysis')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </ListItemIcon>
          <ListItemText primary="News Analysis" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
          selected={activeNav === 'information-misinformation'}
          onClick={() => setActiveNav('information-misinformation')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Misinformation" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
          selected={activeNav === 'information-podcasts'}
          onClick={() => setActiveNav('information-podcasts')}
        >
          <ListItemIcon>
            {/* Podcast/Microphone icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="8" y1="22" x2="16" y2="22" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Podcasts" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
          selected={activeNav === 'information-videos'}
          onClick={() => setActiveNav('information-videos')}
        >
          <ListItemIcon>
            {/* Play/Video icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polygon points="10,8 16,12 10,16" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Videos" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
          selected={activeNav === 'information-reports'}
          onClick={() => setActiveNav('information-reports')}
        >
          <ListItemIcon>
            {/* Document/Report icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="16" y2="10" />
              <line x1="8" y1="14" x2="12" y2="14" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </List>
    )}
  </>
);

export default InformationSection;
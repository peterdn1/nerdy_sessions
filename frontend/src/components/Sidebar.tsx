import React from 'react';
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
  return (
    <MuiSidebar width="240px">
      <List>
        <ListItemButton
          selected={activeNav === 'news'}
          onClick={() => setActiveNav('news')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="17" y2="12"></line>
              <line x1="7" y1="16" x2="13" y2="16"></line>
            </svg>
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItemButton>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={activeNav === 'news-dashboard'}
            onClick={() => setActiveNav('news-dashboard')}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={activeNav === 'news-feeds'}
            onClick={() => setActiveNav('news-feeds')}
          >
            <ListItemText primary="Feeds" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={activeNav === 'news-weekly-summaries'}
            onClick={() => setActiveNav('news-weekly-summaries')}
          >
            <ListItemText primary="Weekly Summaries" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={activeNav === 'news-configure'}
            onClick={() => setActiveNav('news-configure')}
          >
            <ListItemText primary="Configure" />
          </ListItemButton>
        </List>
        <ListItemButton
          selected={activeNav === 'life'}
          onClick={() => setActiveNav('life')}
        >
          
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Life" />
        </ListItemButton>
        <ListItemButton
          selected={activeNav === 'agents'}
          onClick={() => setActiveNav('agents')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M2 21c0-4 4-7 10-7s10 3 10 7"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Agents" />
        </ListItemButton>
        <ListItemButton
          selected={activeNav === 'tools'}
          onClick={() => setActiveNav('tools')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-7 7V21h2.3l7-7a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.3-2.3 2.3-2.3z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItemButton>
        <ListItemButton
          selected={activeNav === 'workflows'}
          onClick={() => setActiveNav('workflows')}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="18" r="3"></circle>
              <path d="M6 9v6M18 9v6M9 6h6M9 18h6"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Workflow" />
        </ListItemButton>
        <ListItemButton
            selected={activeNav === 'stocks'}
            onClick={() => setActiveNav('stocks')}
          >
            <ListItemIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 14 15 21 8" />
                <polyline points="4 12 4 17 9 17" />
              </svg>
            </ListItemIcon>
            <ListItemText primary="Stocks" />
          </ListItemButton>
      </List>
    </MuiSidebar>
  );
};

export default Sidebar;
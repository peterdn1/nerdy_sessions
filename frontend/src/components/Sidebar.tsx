import React, { useState, useEffect } from 'react';
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
  const [newsOpen, setNewsOpen] = useState(false);
  const [lifeOpen, setLifeOpen] = useState(false);
  const [mockupOpen, setMockupOpen] = useState(false);

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
        <ListItemButton
          selected={activeNav === 'life'}
          onClick={() => {
            setActiveNav('life');
            setLifeOpen(!lifeOpen);
          }}
          sx={{ background: 'linear-gradient(270deg, #f9fdf9, #e6f9e6)' }}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Life" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        {lifeOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-health'}
              onClick={() => setActiveNav('life-health')}
            >
              <ListItemText primary="Health" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-safety'}
              onClick={() => setActiveNav('life-safety')}
            >
              <ListItemText primary="Safety" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-family'}
              onClick={() => setActiveNav('life-family')}
            >
              <ListItemText primary="Family" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-career'}
              onClick={() => setActiveNav('life-career')}
            >
              <ListItemText primary="Career" />
            </ListItemButton>
          </List>
        )}
        <ListItemButton
            selected={activeNav === 'stocks'}
            onClick={() => {
              setActiveNav('stocks');
              setStocksOpen(!stocksOpen);
            }}
            sx={{ background: 'linear-gradient(270deg, #f9fbff, #e6f0ff)' }}
          >
            <ListItemIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 14 15 21 8" />
                <polyline points="4 12 4 17 9 17" />
              </svg>
            </ListItemIcon>
            <ListItemText primary="Stocks" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItemButton>
        {stocksOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-screener'}
              onClick={() => setActiveNav('stocks-screener')}
            >
              <ListItemText primary="Stock Screener" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-mock-trading'}
              onClick={() => setActiveNav('stocks-mock-trading')}
            >
              <ListItemText primary="Mock Trading" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-watchlist'}
              onClick={() => setActiveNav('stocks-watchlist')}
            >
              <ListItemText primary="Watchlist" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-leaderboard'}
              onClick={() => setActiveNav('stocks-leaderboard')}
            >
              <ListItemText primary="Leaderboard" />
            </ListItemButton>
          </List>
        )}
        <ListItemButton
          selected={activeNav === 'news'}
          onClick={() => {
            setActiveNav('news');
            setNewsOpen(!newsOpen);
          }}
          sx={{ background: 'linear-gradient(270deg, #fff9f9, #ffe6e6)' }}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="17" y2="12"></line>
              <line x1="7" y1="16" x2="13" y2="16"></line>
            </svg>
          </ListItemIcon>
          <ListItemText primary="News" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        {newsOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
              selected={activeNav === 'news-feeds'}
              onClick={() => setActiveNav('news-feeds')}
            >
              <ListItemText primary="Feeds" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
              selected={activeNav === 'news-weekly-summaries'}
              onClick={() => setActiveNav('news-weekly-summaries')}
            >
              <ListItemText primary="Weekly Summaries" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
              selected={activeNav === 'news-configure'}
              onClick={() => setActiveNav('news-configure')}
            >
              <ListItemText primary="Configure" />
            </ListItemButton>
          </List>
        )}
        <ListItemButton
          selected={activeNav.startsWith('mockup')}
          onClick={() => {
            setActiveNav('mockup');
            setMockupOpen(!mockupOpen);
          }}
          sx={{ background: 'linear-gradient(270deg, #fbf9ff, #f0e6ff)' }}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <path d="M3 9h18M9 21V9"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Mockup" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        {mockupOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
              selected={activeNav === 'mockup-gallery'}
              onClick={() => setActiveNav('mockup-gallery')}
            >
              <ListItemText primary="Gallery" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f7f2ff)' }}
              selected={activeNav === 'mockup-websites'}
              onClick={() => setActiveNav('mockup-websites')}
            >
              <ListItemText primary="Websites" />
            </ListItemButton>
          </List>
        )}
        <ListItemButton
          selected={activeNav === 'agents'}
          onClick={() => setActiveNav('agents')}
          sx={{ background: 'linear-gradient(270deg, #fffdf9, #fff0e6)' }}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M2 21c0-4 4-7 10-7s10 3 10 7"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Agents" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        <ListItemButton
          selected={activeNav === 'tools'}
          onClick={() => setActiveNav('tools')}
          sx={{ background: 'linear-gradient(270deg, #fdfaf7, #f0e6d3)' }}
        >
          <ListItemIcon>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-7 7V21h2.3l7-7a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.3-2.3 2.3-2.3z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Tools" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        <ListItemButton
          selected={activeNav === 'workflows'}
          onClick={() => setActiveNav('workflows')}
          sx={{ background: 'linear-gradient(270deg, #f9fbff, #e6f0ff)' }}
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
          <ListItemText primary="Workflow" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
      </List>
    </MuiSidebar>
  );
};

export default Sidebar;
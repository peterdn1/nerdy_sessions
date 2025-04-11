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
          <ListItemText primary="Life" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        {lifeOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-health'}
              onClick={() => setActiveNav('life-health')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Health" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-safety'}
              onClick={() => setActiveNav('life-safety')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Safety" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-family'}
              onClick={() => setActiveNav('life-family')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Family" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2fdf2)' }}
              selected={activeNav === 'life-career'}
              onClick={() => setActiveNav('life-career')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"></path>
                  <path d="m16 2 4 4-4 4"></path>
                  <path d="M17 8h5"></path>
                </svg>
              </ListItemIcon>
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
            <ListItemText primary="Stocks" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItemButton>
        {stocksOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-screener'}
              onClick={() => setActiveNav('stocks-screener')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18v18H3z"></path>
                  <path d="M21 9H3"></path>
                  <path d="M21 15H3"></path>
                  <path d="M12 3v18"></path>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Stock Screener" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-mock-trading'}
              onClick={() => setActiveNav('stocks-mock-trading')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2v14a2 2 0 0 0 2 2h14"></path>
                  <path d="M18 22V8a2 2 0 0 0-2-2H2"></path>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Mock Trading" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-watchlist'}
              onClick={() => setActiveNav('stocks-watchlist')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4"></path>
                  <path d="m19 5-3 3"></path>
                  <path d="m5 5 3 3"></path>
                  <path d="M18 12v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Watchlist" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
              selected={activeNav === 'stocks-leaderboard'}
              onClick={() => setActiveNav('stocks-leaderboard')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </ListItemIcon>
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
          <ListItemText primary="News" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItemButton>
        {newsOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
              selected={activeNav === 'news-feeds'}
              onClick={() => setActiveNav('news-feeds')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2h4"></path>
                  <path d="M19 17V5a2 2 0 0 0-2-2H4"></path>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Feeds" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
              selected={activeNav === 'news-weekly-summaries'}
              onClick={() => setActiveNav('news-weekly-summaries')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Weekly Summaries" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #fff2f2)' }}
              selected={activeNav === 'news-configure'}
              onClick={() => setActiveNav('news-configure')}
            >
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </ListItemIcon>
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
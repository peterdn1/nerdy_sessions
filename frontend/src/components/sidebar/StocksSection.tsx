import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface StocksSectionProps {
  stocksOpen: boolean;
  setStocksOpen: (open: boolean) => void;
  investmentToolsOpen: boolean;
  setInvestmentToolsOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const StocksSection: React.FC<StocksSectionProps> = ({
  stocksOpen,
  setStocksOpen,
  investmentToolsOpen,
  setInvestmentToolsOpen,
  activeNav,
  setActiveNav,
}) => (
  <>
    <ListItemButton
      selected={activeNav === 'stocks'}
      onClick={() => {
        setActiveNav('stocks');
        setStocksOpen(!stocksOpen);
      }}
      sx={{ background: 'linear-gradient(270deg, #f9fbff, #e6f0ff)' }}
    >
      <ListItemText primary="Investing & Finance" primaryTypographyProps={{ fontWeight: 'bold' }} />
    </ListItemButton>
    {stocksOpen && (
      <List component="div" disablePadding>
        <ListItemButton
          sx={{ pl: 4, background: 'linear-gradient(270deg, #ffffff, #f2f7ff)' }}
          selected={activeNav === 'stocks-investment-tools'}
          onClick={() => {
            setActiveNav('stocks-investment-tools');
            setInvestmentToolsOpen(!investmentToolsOpen);
          }}
        >
          <ListItemIcon>
            {/* Toolbox/Briefcase icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="13" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          </ListItemIcon>
          <ListItemText primary="Investment Tools" />
        </ListItemButton>
        {investmentToolsOpen && (
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 8, background: 'linear-gradient(270deg, #f7faff, #e6f0ff)' }}
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
              sx={{ pl: 8, background: 'linear-gradient(270deg, #f7faff, #e6f0ff)' }}
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
              <ListItemText primary="Screener" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, background: 'linear-gradient(270deg, #f7faff, #e6f0ff)' }}
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
              sx={{ pl: 8, background: 'linear-gradient(270deg, #f7faff, #e6f0ff)' }}
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
      </List>
    )}
  </>
);

export default StocksSection;
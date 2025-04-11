import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Page from './components/Page';
import SignIn from './components/SignIn';
import WelcomePage from './components/WelcomePage';
import SignUp from './components/SignUp';
import './App.css';
import VerifyEmail from './components/VerifyEmail';

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const App = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('news');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      params.delete('token');
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
      window.location.href = '/app';
    }
  }, []);

  const hideHeader = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      <div className="flex flex-1 pt-16 justify-center items-center">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<Page activeNav={activeNav} setActiveNav={setActiveNav} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppWrapper;

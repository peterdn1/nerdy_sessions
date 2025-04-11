import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Page from './components/Page';
import SignIn from './components/SignIn';
import WelcomePage from './components/WelcomePage';
import SignUp from './components/SignUp';
import './App.css';
import VerifyEmail from './components/VerifyEmail';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const App = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('news');

  React.useEffect(() => {
    // Prevent token processing/redirect on /reset-password route
    if (location.pathname === '/reset-password') return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const fullName = params.get('fullName');
    const username = params.get('username');

    if (token) {
      localStorage.setItem('authToken', token);
      params.delete('token');
    }

    if (fullName) {
      localStorage.setItem('fullName', fullName);
      params.delete('fullName');
    }

    if (username) {
      localStorage.setItem('username', username);
      params.delete('username');
    }

    if (token || fullName || username) {
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
      window.location.href = '/app';
    }
  }, [location.pathname]);

  const hideHeader = location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      <div className="flex flex-1 pt-16 justify-center items-center">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signin" element={<SignIn />} />
<Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<Page activeNav={activeNav} setActiveNav={setActiveNav} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppWrapper;

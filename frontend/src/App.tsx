import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Page from './components/Page';
import SignIn from './components/SignIn';
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

  const hideHeader = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      <div className="flex flex-1 pt-16 justify-center items-center">
        <Routes>
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

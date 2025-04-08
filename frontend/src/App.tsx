import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Page from './components/Page';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './App.css';

const App = () => {
  const [activeNav, setActiveNav] = useState('news');

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 pt-16">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Page activeNav={activeNav} setActiveNav={setActiveNav} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from 'react';
import Header from './components/Header';
import Page from './components/Page';
import './App.css';

const App = () => {
  const [activeNav, setActiveNav] = useState('news');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-16">
        <Page activeNav={activeNav} setActiveNav={setActiveNav} />
      </div>
    </div>
  );
};

export default App;

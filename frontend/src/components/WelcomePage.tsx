import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import nerdySessionsLogo from '../assets/images/nerdy_sessions.svg';
import robot1 from '../assets/videos/robot1.mp4';
import robot2 from '../assets/videos/robot2.mp4';
import robot3 from '../assets/videos/robot3.webm';
import robot4 from '../assets/videos/Robot4.mov';
import robot5 from '../assets/videos/Robot5.mov';
import robot6 from '../assets/videos/Robot6.mov';
import robot7 from '../assets/videos/Robot7.mov';
import { PLACEHOLDERS, BUTTON_LABELS } from '../constants';
import weAreHereImg from '../assets/images/WeAreHere.png';
import Footer from './Footer';

const videos = [robot1, robot2, robot3, robot4, robot5, robot6, robot7];

const WelcomePage: React.FC = () => {
  const [videoIndex, setVideoIndex] = useState(() => Math.floor(Math.random() * videos.length));

  const handleSeeMore = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex items-center justify-between py-3 bg-white shadow">
        <div className="flex items-center space-x-3 justify-start">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <img src={nerdySessionsLogo} alt="Nerdy Sessions Logo" className="w-3/5 h-3/5" />
          </div>
        </div>
        <div className="flex-1 flex justify-center px-4">
          <input
            type="text"
            placeholder={PLACEHOLDERS.searchAI}
            className="w-full max-w-3xl px-8 py-4 border border-gray-300 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={PLACEHOLDERS.searchAI}
          />
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/signin" className="inline-flex items-center justify-center px-8 py-3 rounded-md border border-gray-300 text-gray-700 bg-white font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">Log in</Link>
          <Link to="/signup" className="inline-flex items-center justify-center px-8 py-3 rounded-md border border-transparent bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">Sign up</Link>
        </div>
      </header>
      <div className="relative w-full flex-1 flex flex-col justify-center">
        <video
          src={videos[videoIndex]}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 flex flex-col items-center px-4 pt-20 pb-10">
          <img src={weAreHereImg} alt="We Are Here" className="rounded-lg opacity-70 w-1/6 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Change is coming.....</h1>
          <button
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={handleSeeMore}
            aria-label={BUTTON_LABELS.seeAnotherRobot}
          >
            See more
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
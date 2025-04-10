import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import nerdySessionsLogo from '../assets/nerdy_sessions.svg';
import robot1 from '../assets/robot1.mp4';
import robot2 from '../assets/robot2.mp4';
import robot3 from '../assets/robot3.webm';
import robot4 from '../assets/Robot4.mov';
import robot5 from '../assets/Robot5.mov';
import robot6 from '../assets/Robot6.mov';
import robot7 from '../assets/Robot7.mov';
import weAreHereImg from '../assets/WeAreHere.png';
import Footer from './Footer';

const WelcomePage: React.FC = () => {
  const videos = [robot1, robot2, robot3, robot4, robot5, robot6, robot7];
  const [videoIndex, setVideoIndex] = useState(0);

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
            placeholder="Search for AI impacts, Robotics companies, AI Stock Winners and Losers"
            className="w-full max-w-3xl px-4 py-4 border border-gray-300 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/signin" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">Log in</Link>
          <Link to="/signup" className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition">Sign up</Link>
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
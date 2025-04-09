import React from 'react';
import { Link } from 'react-router-dom';
import nerdySessionsLogo from '../assets/nerdy_sessions.svg';
import Footer from './Footer';

const WelcomePage: React.FC = () => {
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
            placeholder="Search for easy dinners, fashion, etc."
            className="w-full max-w-3xl px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/signin" className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">Log in</Link>
          <Link to="/signup" className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition">Sign up</Link>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center px-4 pt-20 pb-10 bg-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Explore the best of Your App</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 w-full max-w-6xl">
          {[
            { title: 'Bag charms', subtitle: 'Exclusively you', img: 'https://source.unsplash.com/400x400/?bag' },
            { title: 'Recipes with yogurt', subtitle: 'Sweet or savory', img: 'https://source.unsplash.com/400x400/?yogurt' },
            { title: 'Denim daze', subtitle: 'Fashion trends', img: 'https://source.unsplash.com/400x400/?denim' },
            { title: 'Home decor', subtitle: 'Inspire your space', img: 'https://source.unsplash.com/400x400/?decor' },
            { title: 'Travel ideas', subtitle: 'See the world', img: 'https://source.unsplash.com/400x400/?travel' },
            { title: 'Fitness tips', subtitle: 'Stay healthy', img: 'https://source.unsplash.com/400x400/?fitness' },
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 text-white">
                <p className="text-sm">{item.subtitle}</p>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </section>

        <button className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">See more</button>
      </main>
      <Footer />
    </div>
  );
};

export default WelcomePage;
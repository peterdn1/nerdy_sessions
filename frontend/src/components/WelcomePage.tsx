import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const WelcomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center px-4 pt-20 pb-10 bg-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Explore the best of Your App</h1>
        <div className="w-full max-w-xl mb-6">
          <input
            type="text"
            placeholder="Search for ideas, inspiration, etc."
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        </div>
        <div className="flex gap-4 mb-10">
          <Link to="/signup" className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition">Sign Up</Link>
          <Link to="/signin" className="px-6 py-2 rounded-full border border-gray-400 hover:bg-gray-100 text-gray-800 font-semibold transition">Log In</Link>
        </div>

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
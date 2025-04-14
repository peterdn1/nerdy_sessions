import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Mail, BrainCircuit, TrendingUp, Wrench, Users, ArrowRight } from 'lucide-react';

const NerdySessionsHome: NextPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Simulate subscription logic
    console.log('Subscribing with email:', email);
    setError('');
    setSubscribed(true);
    // In a real app, you'd send this to a server
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 text-gray-900">
      <Head>
        <title>Nerdy Sessions - Navigate the AI Revolution</title>
        <meta name="description" content="Empowering individuals to navigate and plan for the societal impacts of AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Nerdy Sessions</h1>
          <nav>
            <button className="text-gray-600 hover:text-blue-700 font-medium">Log In</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Navigate the AI Revolution with <span className="text-blue-600">Confidence</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Nerdy Sessions provides insightful analysis and pragmatic tools to help you understand and plan for the future shaped by artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2">
              Explore Insights <ArrowRight size={20} />
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg border border-blue-200 shadow-sm transition duration-300 ease-in-out">
              Learn More
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 md:mb-24">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BrainCircuit size={32} className="text-blue-600" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Insightful Analysis</h4>
              <p className="text-gray-600">Deep dives into AI trends, impacts, and ethical considerations.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full">
                  <TrendingUp size={32} className="text-teal-600" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Forward-Thinking Scenarios</h4>
              <p className="text-gray-600">Exploring potential futures shaped by AI advancements.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Wrench size={32} className="text-purple-600" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Pragmatic Planning Tools</h4>
              <p className="text-gray-600">Actionable guides and resources for personal and professional adaptation.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Users size={32} className="text-yellow-600" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Constructive Dialogue</h4>
              <p className="text-gray-600">Fostering community discussion on navigating AI's societal impact.</p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="bg-blue-600 text-white rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Ahead of the Curve</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">Subscribe to our newsletter for the latest insights, analysis, and updates on AI disruption.</p>
          
          {subscribed ? (
            <p className="text-lg font-semibold text-white bg-green-500/30 py-2 px-4 rounded-md inline-block">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
              <div className="relative flex-grow w-full sm:w-auto">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(''); // Clear error when user types
                  }}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500"
                  aria-label="Email address"
                />
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && <p className="text-red-300 mt-3 text-sm">{error}</p>}
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-16 md:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Nerdy Sessions. All rights reserved.</p>
          <p className="text-sm mt-1">Empowering a balanced perspective on AI's future.</p>
        </div>
      </footer>
    </div>
  );
};

export default NerdySessionsHome;

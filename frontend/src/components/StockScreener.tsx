// frontend/src/components/StockScreener.tsx
import React from 'react';
import { PLACEHOLDERS } from '../constants';

const StockScreener: React.FC = () => {
  // Mock data for the table - replace with actual data fetching later
  const stocks = [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', price: '$845.32', change: '+2.45%', aiScore: 92, aiScoreWidth: 46 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', price: '$420.17', change: '+1.20%', aiScore: 88, aiScoreWidth: 44 },
    { symbol: 'T', name: 'AT&T Inc.', sector: 'Communication', price: '$17.23', change: '-1.24%', aiScore: -82, aiScoreWidth: 41 },
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: '$178.45', change: '+0.65%', aiScore: 75, aiScoreWidth: 37.5 },
    { symbol: 'VZ', name: 'Verizon Communications', sector: 'Communication', price: '$39.67', change: '-0.92%', aiScore: -75, aiScoreWidth: 37.5 },
  ];

  // Function to determine score bar fill classes and styles
  const getScoreBarStyle = (score: number, width: number) => {
    if (score > 0) {
      return { positive: { width: `${width}%` }, negative: { width: '0%' } };
    } else if (score < 0) {
      return { positive: { width: '0%' }, negative: { width: `${width}%` } };
    } else {
      return { positive: { width: '0%' }, negative: { width: '0%' } };
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 24) return 'text-green-600';
    if (score < -24) return 'text-red-600';
    return 'text-gray-600'; // Neutral color
  };


  return (
    <div id="screener-content" className="tab-content">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Stock Screener</h2>

        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {/* Sector Filter */}
          <div className="w-full max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300">
              <option value="">All Sectors</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="consumer">Consumer Goods</option>
              <option value="communication">Communication</option>
              <option value="industrials">Industrials</option>
              <option value="energy">Energy</option>
            </select>
          </div>

          {/* Market Cap Filter */}
          <div className="w-full max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Market Cap</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300">
              <option value="">All Sizes</option>
              <option value="mega">Mega ($200B+)</option>
              <option value="large">Large ($10B-$200B)</option>
              <option value="mid">Mid ($2B-$10B)</option>
              <option value="small">Small ($300M-$2B)</option>
              <option value="micro">Micro (Under $300M)</option>
            </select>
          </div>

          {/* AI Impact Score Filter */}
          <div className="w-full max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">AI Impact Score</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300">
              <option value="">Any Score</option>
              <option value="winner_high">Strong Winners (75-100)</option>
              <option value="winner_med">Moderate Winners (25-74)</option>
              <option value="neutral">Neutral (-24-24)</option>
              <option value="loser_med">Moderate Losers (-25 to -74)</option>
              <option value="loser_high">Strong Losers (-75 to -100)</option>
            </select>
          </div>

          {/* Performance Filter */}
          <div className="w-full max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Performance (1Y)</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300">
              <option value="">Any Performance</option>
              <option value="up50">Up 50%+</option>
              <option value="up20">Up 20-50%</option>
              <option value="up0">Up 0-20%</option>
              <option value="down0">Down 0-20%</option>
              <option value="down20">Down 20%+</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="w-full max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="flex items-center space-x-2">
              <input type="number" placeholder={PLACEHOLDERS.min} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              <span>-</span>
              <input type="number" placeholder={PLACEHOLDERS.max} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
          </div>

          {/* Trading Volume Filter */}
          <div className="w-full max-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Trading Volume</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300">
              <option value="">Any Volume</option>
              <option value="high">High (10M+)</option>
              <option value="medium">Medium (1M-10M)</option>
              <option value="low">Low (Under 1M)</option>
            </select>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <button className="px-4 py-2 bg-[#5B3DFD] text-white rounded-md hover:bg-[#4a2ee0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5B3DFD]">
            Apply Filters
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
            Reset Filters
          </button>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Symbol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">Company Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Sector</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Change</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">AI Impact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stocks.map((stock) => {
                const scoreStyle = getScoreBarStyle(stock.aiScore, stock.aiScoreWidth);
                const scoreColor = getScoreColor(stock.aiScore);
                const scorePrefix = stock.aiScore > 0 ? '+' : '';

                const changeValue = parseFloat(stock.change.replace('%', ''));
                const changeColor = changeValue >= 0 ? 'text-green-600' : 'text-red-600';
                console.log(`Stock: ${stock.symbol}, Change: ${stock.change}, Parsed: ${changeValue}, Color: ${changeColor}`);

                return (
                  <tr key={stock.symbol}>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">{stock.symbol}</td>
                    <td className="px-4 py-4 whitespace-nowrap truncate">{stock.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap truncate">{stock.sector}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{stock.price}</td>
                    <td className={`px-4 py-4 whitespace-nowrap font-semibold ${changeColor}`}>{stock.change}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`mr-2 font-semibold ${scoreColor} w-8 text-right`}>{scorePrefix}{stock.aiScore}</span>
                        <div className="score-bar flex-1">
                           <div className="score-fill-positive" style={scoreStyle.positive}></div>
                           <div className="score-fill-negative" style={scoreStyle.negative}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button className="text-purple-800 hover:text-purple-900 mr-3" title="Add to Watchlist">
                        <i className="far fa-star"></i>
                      </button>
                      <button className="text-green-800 hover:text-green-900" title="Trade">
                        <i className="fas fa-shopping-cart"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">42</span> results {/* TODO: Update dynamically */}
          </div>
          <div className="flex justify-end">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm gap-2" aria-label="Pagination">
              <a href="#" style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="relative inline-flex items-center justify-center px-3 py-2 rounded border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <i className="fas fa-chevron-left h-5 w-5"></i>
              </a>
              {/* TODO: Generate pagination links dynamically */}
              <a href="#" aria-current="page" style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="z-10 bg-purple-50 border border-purple-500 text-purple-600 relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded">
                1
              </a>
              <a href="#" style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded">
                2
              </a>
              <a href="#" style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded">
                3
              </a>
              <span style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="relative inline-flex items-center justify-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 rounded">
                ...
              </span>
              <a href="#" style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded">
                8
              </a>
              <a href="#" style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded">
                9
              </a>
              <a href="#" style={{ margin: '4px', minWidth: '36px', minHeight: '36px' }} className="relative inline-flex items-center justify-center px-3 py-2 rounded border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <i className="fas fa-chevron-right h-5 w-5"></i>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockScreener;
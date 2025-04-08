import React from 'react';

function LifeDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 ring-accent life-accent bg-green-500 rounded-full mr-3 flex items-center justify-center text-white">
          <i className="fas fa-heart text-sm"></i>
        </span>
        Life Dashboard
      </h2>
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Life: Stocks Widget */}
        <div className="widget">
          <div className="widget-header life-header">
            <div className="widget-icon life-icon">
              <i className="fas fa-chart-pie"></i>
            </div>
            <h3 className="font-bold">Stocks & Investments</h3>
          </div>
          <div className="widget-content">
            <div className="stock-item">
              <div>
                <div className="font-bold">AAPL</div>
                <div className="text-xs text-gray-500">Apple Inc.</div>
              </div>
              <div>
                <div className="font-bold">$182.63</div>
                <div className="stock-change positive text-xs">+1.24%</div>
              </div>
            </div>
            <div className="stock-item">
              <div>
                <div className="font-bold">MSFT</div>
                <div className="text-xs text-gray-500">Microsoft Corp.</div>
              </div>
              <div>
                <div className="font-bold">$338.47</div>
                <div className="stock-change positive text-xs">+0.89%</div>
              </div>
            </div>
            <div className="stock-item">
              <div>
                <div className="font-bold">TSLA</div>
                <div className="text-xs text-gray-500">Tesla Inc.</div>
              </div>
              <div>
                <div className="font-bold">$213.76</div>
                <div className="stock-change negative text-xs">-1.42%</div>
              </div>
            </div>
            <div className="stock-item">
              <div>
                <div className="font-bold">AMZN</div>
                <div className="text-xs text-gray-500">Amazon.com Inc.</div>
              </div>
              <div>
                <div className="font-bold">$127.12</div>
                <div className="stock-change positive text-xs">+0.67%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Life: Weather & Safety Widget */}
        <div className="widget">
          <div className="widget-header life-header">
            <div className="widget-icon life-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3 className="font-bold">Safety & Weather</h3>
          </div>
          <div className="widget-content">
            <div className="weather-info mb-4">
              <div className="weather-temp">72°</div>
              <div>
                <div className="text-xl">Partly Cloudy</div>
                <div className="text-gray-500">San Francisco, CA</div>
              </div>
            </div>
            <div className="border-t pt-4 mt-2">
              <div className="text-yellow-600 font-semibold flex items-center mb-2">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <span>Weather Alert</span>
              </div>
              <p className="text-sm text-gray-700">Thunderstorms expected tonight in your area. Prepare for possible heavy rain and wind gusts.</p>
            </div>
          </div>
        </div>

        {/* Life: Health Tracker Widget */}
        <div className="widget">
          <div className="widget-header life-header">
            <div className="widget-icon life-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3 className="font-bold">Health Tracker</h3>
          </div>
          <div className="widget-content">
            <div className="flex items-center">
              <div className="circle-progress mr-4 relative">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle className="circle-bg" cx="30" cy="30" r="26" />
                  <circle className="circle-fill" style={{stroke: 'var(--life-color)', strokeDasharray: 163, strokeDashoffset: 49}} cx="30" cy="30" r="26" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">70%</div>
              </div>
              <div>
                <div className="font-semibold">Daily Activity</div>
                <div className="text-sm text-gray-500">7,542 steps today</div>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-center">
              <div>
                <div className="font-bold">67</div>
                <div className="text-xs text-gray-500">Heart Rate</div>
              </div>
              <div>
                <div className="font-bold">7h 12m</div>
                <div className="text-xs text-gray-500">Sleep</div>
              </div>
              <div>
                <div className="font-bold">3/8</div>
                <div className="text-xs text-gray-500">Water (cups)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Life: Travel Plans Widget */}
        <div className="widget">
          <div className="widget-header life-header">
            <div className="widget-icon life-icon">
              <i className="fas fa-plane"></i>
            </div>
            <h3 className="font-bold">Travel & Plans</h3>
          </div>
          <div className="widget-content">
            <div className="relative w-full h-32 bg-cover bg-center rounded-lg mb-3" style={{backgroundImage: "url('https://cdn.jsdelivr.net/gh/tailwindcss/heropatterns/triangles.svg')"}}>
              <div className="absolute inset-0 bg-blue-500 opacity-80 rounded-lg"></div>
              <div className="absolute inset-0 p-4 text-white flex flex-col justify-between">
                <div className="font-bold text-lg">Trip to Tokyo</div>
                <div className="flex justify-between items-end">
                  <div>March 15-22, 2024</div>
                  <div className="text-white bg-blue-700 px-2 py-1 rounded font-bold">12 days away</div>
                </div>
              </div>
            </div>
            <div className="text-sm">
              <div className="font-semibold mb-1">To-Do:</div>
              <ul className="text-gray-700">
                <li className="flex items-center mb-1">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Book flight tickets
                </li>
                <li className="flex items-center mb-1">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Reserve hotel
                </li>
                <li className="flex items-center mb-1">
                  <i className="far fa-circle text-gray-400 mr-2"></i>
                  Check passport expiration
                </li>
                <li className="flex items-center">
                  <i className="far fa-circle text-gray-400 mr-2"></i>
                  Research activities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LifeDashboard;
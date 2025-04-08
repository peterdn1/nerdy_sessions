import React from 'react';

function StockDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 ring-accent stock-accent bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white">
          <i className="fas fa-chart-line text-sm"></i> {/* Changed icon */}
        </span>
        Stock Dashboard
      </h2>
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stocks Widget */}
        <div className="widget">
          <div className="widget-header stock-header"> {/* Changed class */}
            <div className="widget-icon stock-icon"> {/* Changed class */}
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
        {/* Add more stock-related widgets here if needed */}
      </div>
    </div>
  );
}

export default StockDashboard;
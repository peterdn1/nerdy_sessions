import React from 'react';

function NewsDashboard() {
  return (
    <>
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-3 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="17" y2="12"></line>
              <line x1="7" y1="16" x2="13" y2="16"></line>
            </svg>
          </span>
          News Dashboard
        </h2>
        <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* News: Top Headlines Widget */}
          <div className="widget md:col-span-2">
            <div className="widget-header news-header">
              <div className="widget-icon news-icon">
                <i className="fas fa-fire"></i>
              </div>
              <h3 className="font-bold">Top Headlines</h3>
            </div>
            <div className="widget-content">
              <div className="headline-item">
                <span className="headline-source">CNN</span>
                <h4 className="font-semibold text-lg mb-1">Global Leaders Meet to Discuss Climate Change Solutions</h4>
                <p className="text-gray-600 text-sm">Leaders from over 40 countries gathered to address urgent climate concerns and discuss new initiatives...</p>
              </div>
              <div className="headline-item">
                <span className="headline-source">TechCrunch</span>
                <h4 className="font-semibold text-lg mb-1">New AI Model Achieves Human-Level Performance in Complex Tasks</h4>
                <p className="text-gray-600 text-sm">Researchers have announced a breakthrough in artificial intelligence that can solve complex problems...</p>
              </div>
              <div className="headline-item">
                <span className="headline-source">BBC</span>
                <h4 className="font-semibold text-lg mb-1">Economic Growth Exceeds Expectations in Q3</h4>
                <p className="text-gray-600 text-sm">Global markets responded positively as economic indicators showed stronger than anticipated growth...</p>
              </div>
              <div className="headline-item">
                <span className="headline-source">The Guardian</span>
                <h4 className="font-semibold text-lg mb-1">Major Breakthrough in Renewable Energy Storage</h4>
                <p className="text-gray-600 text-sm">Scientists have developed a new battery technology that could revolutionize how we store renewable energy...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">
          {/* News: Trending Topics Widget */}
          <div className="widget">
            <div className="widget-header news-header">
              <div className="widget-icon news-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="font-bold">Trending Topics</h3>
            </div>
            <div className="widget-content">
              <div className="flex flex-wrap">
                <div className="trending-tag">#ClimateAction</div>
                <div className="trending-tag">#AITech</div>
                <div className="trending-tag">#EconomicGrowth</div>
                <div className="trending-tag">#RenewableEnergy</div>
                <div className="trending-tag">#SpaceExploration</div>
                <div className="trending-tag">#DigitalPrivacy</div>
                <div className="trending-tag">#GlobalHealth</div>
                <div className="trending-tag">#SustainableDevelopment</div>
              </div>
            </div>
          </div>

          {/* News: AI Summary Widget */}
          <div className="widget">
            <div className="widget-header news-header">
              <div className="widget-icon news-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3 className="font-bold">AI Morning Brief</h3>
            </div>
            <div className="widget-content">
              <div className="flex items-start">
                <div className="mr-3 mt-1 bg-red-100 text-red-500 p-2 rounded-full">
                  <i className="fas fa-robot"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Today's Top Stories</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Climate summit produces new agreements on emissions reduction targets</li>
                    <li>Tech sector sees surge in AI investments and breakthrough announcements</li>
                    <li>Global markets rally following positive economic indicators</li>
                    <li>New energy storage technology could accelerate renewable adoption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsDashboard;
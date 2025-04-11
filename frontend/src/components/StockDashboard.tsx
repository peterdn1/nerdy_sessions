import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import { BUTTON_LABELS } from '../constants';

function StockDashboard() {
  const portfolioChartRef = useRef<HTMLCanvasElement | null>(null);
  const impactChartRef = useRef<HTMLCanvasElement | null>(null);
  const portfolioChartInstance = useRef<Chart | null>(null);
  const impactChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // --- Destroy existing charts before creating new ones ---
    if (portfolioChartInstance.current) {
      portfolioChartInstance.current.destroy();
    }
    if (impactChartInstance.current) {
      impactChartInstance.current.destroy();
    }

    // --- Portfolio performance chart ---
    if (portfolioChartRef.current) {
      const portfolioCtx = portfolioChartRef.current.getContext('2d');
      if (portfolioCtx) {
        try {
          portfolioChartInstance.current = new Chart(portfolioCtx, {
            type: 'line',
            data: {
              labels: ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 8', 'Apr 9'],
              datasets: [{
                label: 'Portfolio Value',
                data: [23450, 23200, 23650, 24100, 23950, 24600, 24857],
                borderColor: '#4F46E5', // Indigo color
                backgroundColor: 'rgba(79, 70, 229, 0.1)', // Light indigo fill
                fill: true,
                tension: 0.4
              }]
            },
            options: {
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: false }
              },
              responsive: true,
              maintainAspectRatio: false
            }
          });
        } catch (error) {
          console.error("Error initializing Portfolio Chart:", error);
          // Optionally display an error message in the UI
        }
      }
    } else {
      console.error("Canvas element for portfolioChart not found.");
    }

    // --- AI Impact Distribution chart ---
    if (impactChartRef.current) {
      const impactCtx = impactChartRef.current.getContext('2d');
      if (impactCtx) {
        try {
          impactChartInstance.current = new Chart(impactCtx, {
            type: 'doughnut',
            data: {
              labels: ['AI Winners', 'Neutral', 'AI Losers'],
              datasets: [{
                data: [68, 22, 10],
                backgroundColor: ['#10B981', '#9CA3AF', '#EF4444'],
                borderWidth: 0
              }]
            },
            options: {
              plugins: { legend: { display: false } },
              responsive: true,
              maintainAspectRatio: false,
              cutout: '70%'
            }
          });
        } catch (error) {
          console.error("Error initializing Impact Chart:", error);
          // Optionally display an error message in the UI
        }
      }
    } else {
      console.error("Canvas element for impactChart not found.");
    }

    // --- Cleanup function to destroy charts on component unmount ---
    return () => {
      if (portfolioChartInstance.current) {
        portfolioChartInstance.current.destroy();
      }
      if (impactChartInstance.current) {
        impactChartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      {/* Header - Keep the existing header style */}
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 ring-accent stock-accent bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white">
          <i className="fas fa-chart-line text-sm"></i>
        </span>
        Stock Dashboard
      </h2>

      {/* Migrated Dashboard Content */}
      <div id="dashboard-content" className="tab-content active">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Performance */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Portfolio Performance</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm rounded bg-indigo-100 text-indigo-700">{BUTTON_LABELS.oneWeek}</button>
                <button className="px-3 py-1 text-sm rounded">{BUTTON_LABELS.oneMonth}</button>
                <button className="px-3 py-1 text-sm rounded">{BUTTON_LABELS.threeMonths}</button>
                <button className="px-3 py-1 text-sm rounded">{BUTTON_LABELS.oneYear}</button>
              </div>
            </div>
            <div className="chart-container">
              <canvas ref={portfolioChartRef} id="portfolioChart"></canvas>
            </div>
          </div>

          {/* AI Impact Distribution */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">AI Impact Distribution</h2>
            <div className="chart-container">
              <canvas ref={impactChartRef} id="impactChart"></canvas>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">AI Winners</p>
                <p className="text-lg font-bold text-green-500">68%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Neutral</p>
                <p className="text-lg font-bold text-gray-500">22%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">AI Losers</p>
                <p className="text-lg font-bold text-red-500">10%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top AI Winners/Losers */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Winners */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top AI Winners</h2>
            <div className="space-y-3">
              {/* NVDA */}
              <div className="ai-positive p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">NVDA</span>
                    <span className="ml-2 text-sm text-gray-600">NVIDIA Corp</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-green-600 font-semibold">+2.45%</span>
                    <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">AI Score: +92</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$845.32</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
              {/* MSFT */}
              <div className="ai-positive p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">MSFT</span>
                    <span className="ml-2 text-sm text-gray-600">Microsoft Corp</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-green-600 font-semibold">+1.20%</span>
                    <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">AI Score: +88</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$420.17</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
              {/* GOOG */}
               <div className="ai-positive p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">GOOG</span>
                    <span className="ml-2 text-sm text-gray-600">Alphabet Inc</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-green-600 font-semibold">+0.85%</span>
                    <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">AI Score: +85</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$175.42</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
              {/* AMD */}
              <div className="ai-positive p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">AMD</span>
                    <span className="ml-2 text-sm text-gray-600">Advanced Micro Devices</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-green-600 font-semibold">+1.75%</span>
                    <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">AI Score: +79</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$158.93</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
            </div>
          </div>

          {/* Losers */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top AI Losers</h2>
            <div className="space-y-3">
              {/* T */}
              <div className="ai-negative p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">T</span>
                    <span className="ml-2 text-sm text-gray-600">AT&T Inc</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-red-600 font-semibold">-1.24%</span>
                    <span className="ml-3 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">AI Score: -82</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$17.23</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
              {/* VZ */}
              <div className="ai-negative p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">VZ</span>
                    <span className="ml-2 text-sm text-gray-600">Verizon Communications</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-red-600 font-semibold">-0.92%</span>
                    <span className="ml-3 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">AI Score: -75</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$39.67</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
              {/* PG */}
              <div className="ai-negative p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">PG</span>
                    <span className="ml-2 text-sm text-gray-600">Procter & Gamble Co</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-red-600 font-semibold">-0.58%</span>
                    <span className="ml-3 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">AI Score: -68</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$156.42</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
              {/* CVS */}
              <div className="ai-negative p-3 rounded-md flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold">CVS</span>
                    <span className="ml-2 text-sm text-gray-600">CVS Health Corp</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-red-600 font-semibold">-1.15%</span>
                    <span className="ml-3 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">AI Score: -62</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">$59.48</span>
                  <button className="mt-1 text-xs text-indigo-600 hover:text-indigo-800">{BUTTON_LABELS.addToWatchlist}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest AI Stock News */}
        <div className="mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Latest AI Stock News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* News Item 1 */}
              <div className="news-item border rounded-lg overflow-hidden">
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">NVDA</span>
                  <h3 className="font-bold text-lg mb-1">NVIDIA Announces New AI Chips for Data Centers</h3>
                  <p className="text-gray-600 text-sm mb-2">NVIDIA unveiled its next-generation AI processors, promising 3x performance improvement for large language models.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                    <a href="#" className="text-indigo-600 text-sm font-medium hover:text-indigo-800">Read More</a>
                  </div>
                </div>
              </div>
              {/* News Item 2 */}
              <div className="news-item border rounded-lg overflow-hidden">
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">MSFT</span>
                  <h3 className="font-bold text-lg mb-1">Microsoft Expands Azure AI Services</h3>
                  <p className="text-gray-600 text-sm mb-2">Microsoft is expanding its AI capabilities in Azure, adding new features for developers building AI applications.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">5 hours ago</span>
                    <a href="#" className="text-indigo-600 text-sm font-medium hover:text-indigo-800">Read More</a>
                  </div>
                </div>
              </div>
              {/* News Item 3 */}
              <div className="news-item border rounded-lg overflow-hidden">
                <div className="p-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full mb-2">T</span>
                  <h3 className="font-bold text-lg mb-1">AT&T Struggles to Compete in AI-Driven Market</h3>
                  <p className="text-gray-600 text-sm mb-2">Traditional telecom giants face disruption as AI-powered communication services gain market share.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">1 day ago</span>
                    <a href="#" className="text-indigo-600 text-sm font-medium hover:text-indigo-800">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDashboard;
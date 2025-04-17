import React, { useState, useMemo } from 'react';
import {
  FaChartLine,
  FaChartPie,
  FaArrowUp,
  FaArrowDown,
  FaNewspaper,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaBell,
  FaUser,
  FaSyncAlt,
  FaShieldAlt,
  FaInfoCircle,
  FaExternalLinkAlt,
  FaRobot,
  FaMicrochip,
  FaDatabase,
  FaCloudUploadAlt,
  FaCode,
  FaCog
} from 'react-icons/fa';

// TypeScript interfaces
interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  sector: string;
  aiCategory: string;
  logoUrl: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  imageUrl: string;
  relatedStocks: string[];
}

interface PortfolioStock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  profit: number;
  profitPercent: number;
  weight: number;
}

interface SectorImpact {
  sector: string;
  impact: number;
  growth: number;
  marketShare: number;
  color: string;
}

interface TimeRange {
  id: string;
  label: string;
}

function StockDashboard() {
  // State management
  const [timeRange, setTimeRange] = useState<string>('1M');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const portfolioValue = {
    current: 156730.42,
    previous: 148250.18,
    change: 8480.24,
    changePercent: 5.72
  };
  
  // Mock data - Time ranges
  const timeRanges: TimeRange[] = [
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '3M', label: '3M' },
    { id: '6M', label: '6M' },
    { id: '1Y', label: '1Y' },
    { id: 'YTD', label: 'YTD' },
    { id: 'ALL', label: 'ALL' }
  ];
  
  // Mock data - Sectors
  const sectors = [
    'all',
    'semiconductor',
    'software',
    'cloud',
    'robotics',
    'cybersecurity',
    'data analytics'
  ];
  
  // Mock data - AI Sector Impact
  const sectorImpacts: SectorImpact[] = [
    { 
      sector: 'Semiconductor', 
      impact: 85, 
      growth: 42.7, 
      marketShare: 28.3,
      color: '#4688F1' 
    },
    { 
      sector: 'Software', 
      impact: 75, 
      growth: 38.2, 
      marketShare: 23.5,
      color: '#6B5AED' 
    },
    { 
      sector: 'Cloud Services', 
      impact: 82, 
      growth: 45.6, 
      marketShare: 19.8,
      color: '#FB724A' 
    },
    { 
      sector: 'Robotics & Automation', 
      impact: 68, 
      growth: 32.4, 
      marketShare: 12.7,
      color: '#2AB7CA' 
    },
    { 
      sector: 'Cybersecurity', 
      impact: 72, 
      growth: 29.8, 
      marketShare: 8.5,
      color: '#FED766' 
    },
    { 
      sector: 'Data Analytics', 
      impact: 79, 
      growth: 36.5, 
      marketShare: 7.2,
      color: '#FE4A49' 
    }
  ];
  
  // Mock data - Portfolio stocks
  const portfolioStocks: PortfolioStock[] = [
    {
      id: '1',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      shares: 85,
      avgPrice: 476.25,
      currentPrice: 950.18,
      value: 80765.30,
      profit: 40285.55,
      profitPercent: 99.52,
      weight: 51.53
    },
    {
      id: '2',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 120,
      avgPrice: 305.87,
      currentPrice: 428.74,
      value: 51448.80,
      profit: 14744.40,
      profitPercent: 40.17,
      weight: 32.83
    },
    {
      id: '3',
      symbol: 'GOOG',
      name: 'Alphabet Inc',
      shares: 65,
      avgPrice: 135.42,
      currentPrice: 178.35,
      value: 11592.75,
      profit: 2790.95,
      profitPercent: 31.70,
      weight: 7.40
    },
    {
      id: '4',
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      shares: 150,
      avgPrice: 94.75,
      currentPrice: 146.38,
      value: 21957.00,
      profit: 7744.50,
      profitPercent: 54.49,
      weight: 14.01
    },
    {
      id: '5',
      symbol: 'CRM',
      name: 'Salesforce, Inc.',
      shares: 45,
      avgPrice: 218.65,
      currentPrice: 304.22,
      value: 13689.90,
      profit: 3850.65,
      profitPercent: 39.14,
      weight: 8.73
    }
  ];
  
  // Mock data - Top AI winners & losers
  const stocks: Stock[] = [
    {
      id: '1',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 950.18,
      change: 42.36,
      changePercent: 4.67,
      marketCap: '$2.34T',
      volume: '38.5M',
      sector: 'semiconductor',
      aiCategory: 'AI Chips & Hardware',
      logoUrl: 'https://logo.clearbit.com/nvidia.com'
    },
    {
      id: '2',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 428.74,
      change: 12.18,
      changePercent: 2.92,
      marketCap: '$3.19T',
      volume: '23.2M',
      sector: 'software',
      aiCategory: 'AI Software & Services',
      logoUrl: 'https://logo.clearbit.com/microsoft.com'
    },
    {
      id: '3',
      symbol: 'GOOG',
      name: 'Alphabet Inc',
      price: 178.35,
      change: 5.26,
      changePercent: 3.04,
      marketCap: '$2.23T',
      volume: '25.7M',
      sector: 'software',
      aiCategory: 'AI Software & Services',
      logoUrl: 'https://logo.clearbit.com/abc.xyz'
    },
    {
      id: '4',
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      price: 146.38,
      change: 7.85,
      changePercent: 5.67,
      marketCap: '$236.4B',
      volume: '62.8M',
      sector: 'semiconductor',
      aiCategory: 'AI Chips & Hardware',
      logoUrl: 'https://logo.clearbit.com/amd.com'
    },
    {
      id: '5',
      symbol: 'CRM',
      name: 'Salesforce, Inc.',
      price: 304.22,
      change: -2.45,
      changePercent: -0.80,
      marketCap: '$295.7B',
      volume: '14.3M',
      sector: 'software',
      aiCategory: 'AI Software & Services',
      logoUrl: 'https://logo.clearbit.com/salesforce.com'
    },
    {
      id: '6',
      symbol: 'PLTR',
      name: 'Palantir Technologies Inc.',
      price: 24.62,
      change: 1.85,
      changePercent: 8.12,
      marketCap: '$53.8B',
      volume: '82.5M',
      sector: 'data analytics',
      aiCategory: 'AI Analytics & Intelligence',
      logoUrl: 'https://logo.clearbit.com/palantir.com'
    },
    {
      id: '7',
      symbol: 'PATH',
      name: 'UiPath Inc.',
      price: 12.14,
      change: -1.02,
      changePercent: -7.75,
      marketCap: '$6.9B',
      volume: '12.8M',
      sector: 'robotics',
      aiCategory: 'AI Automation & Robotics',
      logoUrl: 'https://logo.clearbit.com/uipath.com'
    },
    {
      id: '8',
      symbol: 'CFLT',
      name: 'Confluent, Inc.',
      price: 32.84,
      change: -2.45,
      changePercent: -6.94,
      marketCap: '$10.5B',
      volume: '5.7M',
      sector: 'data analytics',
      aiCategory: 'AI Analytics & Intelligence',
      logoUrl: 'https://logo.clearbit.com/confluent.io'
    },
    {
      id: '9',
      symbol: 'NET',
      name: 'Cloudflare, Inc.',
      price: 95.42,
      change: 4.28,
      changePercent: 4.69,
      marketCap: '$32.1B',
      volume: '8.3M',
      sector: 'cloud',
      aiCategory: 'AI Infrastructure',
      logoUrl: 'https://logo.clearbit.com/cloudflare.com'
    },
    {
      id: '10',
      symbol: 'SNOW',
      name: 'Snowflake Inc.',
      price: 155.75,
      change: -8.24,
      changePercent: -5.02,
      marketCap: '$51.4B',
      volume: '7.8M',
      sector: 'data analytics',
      aiCategory: 'AI Analytics & Intelligence',
      logoUrl: 'https://logo.clearbit.com/snowflake.com'
    }
  ];

  // Mock data - News
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'NVIDIA Launches Next-Gen AI Chips, 3x Faster Than Previous Models',
      source: 'TechCrunch',
      date: 'Apr 16, 2025',
      summary: 'NVIDIA has unveiled its latest AI processing chips, claiming performance three times faster than its previous generation, further solidifying its dominant position in the AI hardware market.',
      url: '#',
      imageUrl: 'https://source.unsplash.com/random/800x500/?technology,chip',
      relatedStocks: ['NVDA']
    },
    {
      id: '2',
      title: 'Microsoft Expands AI Cloud Partnership with OpenAI in $5B Deal',
      source: 'Wall Street Journal',
      date: 'Apr 15, 2025',
      summary: 'Microsoft and OpenAI have announced an expanded partnership valued at $5 billion, focusing on integrating advanced AI models across Microsofts cloud services.',
      url: '#',
      imageUrl: 'https://source.unsplash.com/random/800x500/?cloud,data',
      relatedStocks: ['MSFT']
    },
    {
      id: '3',
      title: 'AI Chip Demand Expected to Triple by 2027, Report Shows',
      source: 'Bloomberg',
      date: 'Apr 14, 2025',
      summary: 'A new industry report predicts AI chip demand will triple by 2027, with semiconductor companies racing to increase production capacity amid persistent supply constraints.',
      url: '#',
      imageUrl: 'https://source.unsplash.com/random/800x500/?circuit,computer',
      relatedStocks: ['NVDA', 'AMD']
    },
    {
      id: '4',
      title: 'Salesforce Introduces AI-Powered Analytics Suite for Enterprise Customers',
      source: 'CNBC',
      date: 'Apr 13, 2025',
      summary: 'Salesforce has launched a new AI-powered analytics platform that promises to help enterprise customers derive actionable insights from their data with minimal technical expertise required.',
      url: '#',
      imageUrl: 'https://source.unsplash.com/random/800x500/?dashboard,analytics',
      relatedStocks: ['CRM']
    },
    {
      id: '5',
      title: 'Googles DeepMind Achieves Breakthrough in Quantum AI Applications',
      source: 'The Verge',
      date: 'Apr 12, 2025',
      summary: 'Googles DeepMind division has announced a significant breakthrough in applying AI to quantum computing problems, potentially accelerating development in both fields.',
      url: '#',
      imageUrl: 'https://source.unsplash.com/random/800x500/?quantum,future',
      relatedStocks: ['GOOG']
    }
  ];

  // Memoized filtered stocks
  const filteredStocks = useMemo(() => {
    let results = [...stocks];
    
    // Filter by sector
    if (selectedSector !== 'all') {
      results = results.filter((stock: Stock) => stock.sector === selectedSector);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter((stock: Stock) =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
      );
    }
    
    return results;
  }, [selectedSector, searchQuery, stocks]);

  // Get winners (positive change)
  const getWinners = (): Stock[] => {
    return filteredStocks
      .filter((stock: Stock) => stock.changePercent > 0)
      .sort((a: Stock, b: Stock) => b.changePercent - a.changePercent)
      .slice(0, 5);
  };

  // Get losers (negative change)
  const getLosers = (): Stock[] => {
    return filteredStocks
      .filter((stock: Stock) => stock.changePercent < 0)
      .sort((a: Stock, b: Stock) => a.changePercent - b.changePercent)
      .slice(0, 5);
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'exceptZero'
    }).format(value / 100);
  };
  
  // Format as compact number (e.g., 1.2M, 5K)

  return (
    <>
      <div className="investment-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="branding">
            <h1 className="dashboard-title"><FaRobot /> AI Investment Hub</h1>
          </div>
          
          <div className="header-actions">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="header-buttons">
              <button className="header-button">
                <FaCalendarAlt /> <span>Apr 16, 2025</span>
              </button>
              <button className="header-button notification">
                <FaBell />
                <span className="notification-badge">5</span>
              </button>
              <button className="header-button user">
                <FaUser />
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="dashboard-content">
          {/* Portfolio Performance Section */}
          <section className="portfolio-section">
            <div className="section-header">
              <h2><FaChartLine /> Portfolio Performance</h2>
              <div className="section-actions">
                <button className="refresh-button"><FaSyncAlt /> Refresh</button>
                <div className="time-range-selector">
                  {timeRanges.map(range => (
                    <button
                      key={range.id}
                      className={`time-range-button ${timeRange === range.id ? 'active' : ''}`}
                      onClick={() => setTimeRange(range.id)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="portfolio-overview">
              <div className="portfolio-value-card">
                <div className="value-label">Total Portfolio Value</div>
                <div className="value-amount">{formatCurrency(portfolioValue.current)}</div>
                <div className={`value-change ${portfolioValue.change >= 0 ? 'positive' : 'negative'}`}>
                  {portfolioValue.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {formatCurrency(Math.abs(portfolioValue.change))} ({formatPercentage(portfolioValue.changePercent)})
                </div>
              </div>
              
              <div className="portfolio-chart">
                {/* In a real application, this would be a chart component */}
                <div className="chart-placeholder">
                  <div className="chart-line"></div>
                  <div className="chart-markers">
                    <div className="chart-marker" style={{ left: '0%', height: '40%' }}></div>
                    <div className="chart-marker" style={{ left: '20%', height: '60%' }}></div>
                    <div className="chart-marker" style={{ left: '40%', height: '45%' }}></div>
                    <div className="chart-marker" style={{ left: '60%', height: '70%' }}></div>
                    <div className="chart-marker" style={{ left: '80%', height: '85%' }}></div>
                    <div className="chart-marker" style={{ left: '100%', height: '95%' }}></div>
                  </div>
                </div>
              </div>

              <div className="portfolio-stats">
                <div className="stat-card">
                  <div className="stat-label">AI Exposure</div>
                  <div className="stat-value">78.5%</div>
                  <div className="stat-progress">
                    <div className="progress-bar" style={{ width: '78.5%' }}></div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Growth YTD</div>
                  <div className="stat-value positive">+42.8%</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Volatility</div>
                  <div className="stat-value">High</div>
                </div>
              </div>
            </div>

            <div className="holdings-table">
              <div className="table-header">
                <h3>Portfolio Holdings</h3>
                <button className="view-all-button">View All <FaExternalLinkAlt /></button>
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Shares</th>
                    <th>Avg Price</th>
                    <th>Current Price</th>
                    <th>Value</th>
                    <th>Profit/Loss</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioStocks.map(stock => (
                    <tr key={stock.id}>
                      <td className="asset-cell">
                        <img src={`https://logo.clearbit.com/${stock.symbol.toLowerCase()}.com`} 
                          alt={stock.symbol} 
                          className="stock-logo"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/30?text=' + stock.symbol;
                          }}
                        />
                        <div className="asset-details">
                          <div className="asset-symbol">{stock.symbol}</div>
                          <div className="asset-name">{stock.name}</div>
                        </div>
                      </td>
                      <td>{stock.shares}</td>
                      <td>{formatCurrency(stock.avgPrice)}</td>
                      <td>{formatCurrency(stock.currentPrice)}</td>
                      <td>{formatCurrency(stock.value)}</td>
                      <td className={`${stock.profit >= 0 ? 'positive' : 'negative'}`}>
                        {formatCurrency(stock.profit)} ({formatPercentage(stock.profitPercent)})
                      </td>
                      <td>
                        <div className="weight-container">
                          <span>{stock.weight.toFixed(1)}%</span>
                          <div className="weight-bar">
                            <div className="weight-fill" style={{ width: `${stock.weight}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* AI Impact Distribution */}
          <section className="ai-impact-section">
            <div className="section-header">
              <h2><FaChartPie /> AI Impact Distribution</h2>
              <div className="section-info">
                <FaInfoCircle />
                <span className="tooltip">Shows how AI is impacting different market sectors</span>
              </div>
            </div>
            
            <div className="impact-container">
              <div className="impact-visualization">
                {/* In a real app, this would be a proper chart component */}
                <div className="pie-chart-placeholder">
                  {sectorImpacts.map((sector, index) => (
                    <div 
                      key={index}
                      className="pie-segment" 
                      style={{ 
                        backgroundColor: sector.color,
                        transform: `rotate(${index * 60}deg)`,
                        zIndex: 10 - index
                      }}
                    >
                      <div className="segment-label">{sector.sector}</div>
                    </div>
                  ))}
                  <div className="pie-center">AI<br/>Impact</div>
                </div>
              </div>
              
              <div className="impact-metrics">
                <div className="impact-metric-header">
                  <div>Sector</div>
                  <div>Impact Score</div>
                  <div>YoY Growth</div>
                  <div>Market Share</div>
                </div>
                
                {sectorImpacts.map((sector, index) => (
                  <div className="impact-metric-row" key={index}>
                    <div className="impact-sector">
                      <span className="sector-color" style={{ backgroundColor: sector.color }}></span>
                      {sector.sector}
                    </div>
                    <div className="impact-score">
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: `${sector.impact}%`, backgroundColor: sector.color }}></div>
                      </div>
                      <span>{sector.impact}/100</span>
                    </div>
                    <div className="impact-growth positive">+{sector.growth}%</div>
                    <div className="impact-share">{sector.marketShare}%</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Winners & Losers Section */}
          <div className="winners-losers-container">
            {/* Top AI Winners */}
            <section className="winners-section">
              <div className="section-header">
                <h2 className="positive"><FaArrowUp /> Top AI Winners</h2>
                <div className="filter-dropdown">
                  <button className="filter-button">
                    <FaFilter /> Filter
                  </button>
                  <div className="sector-filters">
                    {sectors.map(sector => (
                      <button
                        key={sector}
                        className={`sector-filter ${selectedSector === sector ? 'active' : ''}`}
                        onClick={() => setSelectedSector(sector)}
                      >
                        {sector.charAt(0).toUpperCase() + sector.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="stock-cards">
                {getWinners().map(stock => (
                  <div className="stock-card winner" key={stock.id}>
                    <div className="stock-card-header">
                      <img 
                        src={stock.logoUrl} 
                        alt={stock.symbol} 
                        className="stock-logo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/40?text=' + stock.symbol;
                        }}
                      />
                      <div className="stock-info">
                        <div className="stock-symbol">{stock.symbol}</div>
                        <div className="stock-name">{stock.name}</div>
                      </div>
                      <div className="stock-change positive">
                        <FaArrowUp />
                        {formatPercentage(stock.changePercent)}
                      </div>
                    </div>
                    <div className="stock-card-body">
                      <div className="stock-metrics">
                        <div className="metric">
                          <span className="metric-label">Price</span>
                          <span className="metric-value">{formatCurrency(stock.price)}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Change</span>
                          <span className="metric-value positive">+{formatCurrency(stock.change)}</span>
                        </div>
                      </div>
                      <div className="stock-metrics">
                        <div className="metric">
                          <span className="metric-label">Market Cap</span>
                          <span className="metric-value">{stock.marketCap}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Volume</span>
                          <span className="metric-value">{stock.volume}</span>
                        </div>
                      </div>
                    </div>
                    <div className="stock-card-footer">
                      <div className="stock-category">
                        {getSectorIcon(stock.sector)} {stock.aiCategory}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Top AI Losers */}
            <section className="losers-section">
              <div className="section-header">
                <h2 className="negative"><FaArrowDown /> Top AI Losers</h2>
              </div>
              
              <div className="stock-cards">
                {getLosers().map(stock => (
                  <div className="stock-card loser" key={stock.id}>
                    <div className="stock-card-header">
                      <img 
                        src={stock.logoUrl} 
                        alt={stock.symbol} 
                        className="stock-logo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/40?text=' + stock.symbol;
                        }}
                      />
                      <div className="stock-info">
                        <div className="stock-symbol">{stock.symbol}</div>
                        <div className="stock-name">{stock.name}</div>
                      </div>
                      <div className="stock-change negative">
                        <FaArrowDown />
                        {formatPercentage(Math.abs(stock.changePercent))}
                      </div>
                    </div>
                    <div className="stock-card-body">
                      <div className="stock-metrics">
                        <div className="metric">
                          <span className="metric-label">Price</span>
                          <span className="metric-value">{formatCurrency(stock.price)}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Change</span>
                          <span className="metric-value negative">{formatCurrency(stock.change)}</span>
                        </div>
                      </div>
                      <div className="stock-metrics">
                        <div className="metric">
                          <span className="metric-label">Market Cap</span>
                          <span className="metric-value">{stock.marketCap}</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Volume</span>
                          <span className="metric-value">{stock.volume}</span>
                        </div>
                      </div>
                    </div>
                    <div className="stock-category">
                        {getSectorIcon(stock.sector)} {stock.aiCategory}
                      </div>
                    </div>                  
                ))}
              </div>
            </section>
          </div>
          
          {/* Latest AI Stock News */}
          <section className="news-section">
            <div className="section-header">
              <h2><FaNewspaper /> Latest AI Stock News</h2>
              <button className="view-all-button">View All News <FaExternalLinkAlt /></button>
            </div>
            
            <div className="news-container">
              {newsItems.map(news => (
                <div className="news-card" key={news.id}>
                  <div className="news-image">
                    <img src={news.imageUrl} alt={news.title} />
                  </div>
                  <div className="news-content">
                    <h3 className="news-title">{news.title}</h3>
                    <div className="news-meta">
                      <span className="news-source">{news.source}</span>
                      <span className="news-date">{news.date}</span>
                    </div>
                    <p className="news-summary">{news.summary}</p>
                    <div className="news-footer">
                      <div className="related-stocks">
                        {news.relatedStocks.map(symbol => (
                          <span className="stock-tag" key={symbol}>{symbol}</span>
                        ))}
                      </div>
                      <a href={news.url} className="read-more">Read More</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        
        <footer className="dashboard-footer">
          <div className="footer-info">
            <p>© 2025 AI Investment Hub. All data is for informational purposes only.</p>
          </div>
          <div className="footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </footer>
        
        <style>{`
          /* Global Styles */
          .investment-dashboard {
            max-width: 1600px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            color: #333;
            background-color: #f7f9fc;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          h1, h2, h3, h4, h5, h6 {
            margin: 0;
          }
          
          button {
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .positive {
            color: #00c853;
          }
          
          .negative {
            color: #ff3d00;
          }
          
          /* Header Styles */
          .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
            margin-bottom: 25px;
          }
          
          .dashboard-title {
            font-size: 1.6rem;
            font-weight: 700;
            color: #172b4d;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .header-actions {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          
          .search-container {
            position: relative;
            width: 300px;
          }
          
          .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #8993a4;
          }
          
          .search-input {
            width: 100%;
            padding: 10px 10px 10px 35px;
            border: 1px solid #e0e4e9;
            border-radius: 8px;
            font-size: 0.9rem;
            outline: none;
            transition: all 0.2s ease;
          }
          
          .search-input:focus {
            border-color: #4688F1;
            box-shadow: 0 0 0 2px rgba(70, 136, 241, 0.1);
          }
          
          .header-buttons {
            display: flex;
            gap: 10px;
          }
          
          .header-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background-color: #f1f5f9;
            border: none;
            border-radius: 8px;
            color: #475569;
            font-size: 0.9rem;
            transition: all 0.2s ease;
          }
          
          .header-button:hover {
            background-color: #e2e8f0;
          }
          
          .header-button.notification {
            position: relative;
            padding: 8px;
          }
          
          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #ff3d00;
            color: #fff;
            font-size: 0.7rem;
            height: 18px;
            width: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .header-button.user {
            background-color: #4688F1;
            color: #fff;
            padding: 8px;
          }
          
          /* Main Content Styles */
          .dashboard-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .section-header h2 {
            font-size: 1.25rem;
            color: #172b4d;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .section-actions {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .refresh-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background-color: #f1f5f9;
            border: none;
            border-radius: 6px;
            color: #475569;
            font-size: 0.8rem;
          }
          
          .refresh-button:hover {
            background-color: #e2e8f0;
          }
          
          .time-range-selector {
            display: flex;
            background-color: #f1f5f9;
            border-radius: 6px;
            overflow: hidden;
          }
          
          .time-range-button {
            padding: 6px 10px;
            border: none;
            background-color: transparent;
            color: #475569;
            font-size: 0.8rem;
            font-weight: 500;
          }
          
          .time-range-button:hover {
            background-color: #e2e8f0;
          }
          
          .time-range-button.active {
            background-color: #4688F1;
            color: #fff;
          }
          
          /* Portfolio Section Styles */
          .portfolio-section {
            background-color: #fff;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          }
          
          .portfolio-overview {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          
          @media (max-width: 1024px) {
            .portfolio-overview {
              grid-template-columns: 1fr;
            }
          }
          
          .portfolio-value-card {
            background-color: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .value-label {
            font-size: 0.9rem;
            color: #64748b;
            margin-bottom: 10px;
          }
          
          .value-amount {
            font-size: 2rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 10px;
          }
          
          .value-change {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.95rem;
            font-weight: 500;
          }
          
          .portfolio-chart {
            background-color: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            position: relative;
            height: 180px;
          }
          
          .chart-placeholder {
            height: 100%;
            width: 100%;
            position: relative;
            display: flex;
            align-items: flex-end;
          }
          
          .chart-line {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 100%;
            background-color: #e2e8f0;
          }
          
          .chart-markers {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: flex-end;
          }
          
          .chart-marker {
            position: absolute;
            bottom: 0;
            width: 4px;
            background-color: #4688F1;
            border-radius: 4px 4px 0 0;
          }
          
          .portfolio-stats {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .stat-card {
            background-color: #f8fafc;
            border-radius: 10px;
            padding: 15px;
            flex: 1;
          }
          
          .stat-label {
            font-size: 0.85rem;
            color: #64748b;
            margin-bottom: 5px;
          }
          
          .stat-value {
            font-size: 1.25rem;
            font-weight: 600;
            color: #0f172a;
          }
          
          .stat-progress {
            margin-top: 8px;
            height: 6px;
            background-color: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
          }
          
          .progress-bar {
            height: 100%;
            background-color: #4688F1;
            border-radius: 3px;
          }
          
          .holdings-table {
            background-color: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            overflow-x: auto;
          }
          
          .table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .table-header h3 {
            font-size: 1.1rem;
            color: #0f172a;
          }
          
          .view-all-button {
            display: flex;
            align-items: center;
            gap: 6px;
            background-color: transparent;
            border: none;
            color: #4688F1;
            font-size: 0.85rem;
            font-weight: 500;
          }
          
          .view-all-button:hover {
            color: #2563eb;
            text-decoration: underline;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th {
            text-align: left;
            padding: 12px 15px;
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748b;
            border-bottom: 1px solid #e2e8f0;
          }
          
          td {
            padding: 15px;
            font-size: 0.9rem;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
          }
          
          tr:last-child td {
            border-bottom: none;
          }
          
          .asset-cell {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .stock-logo {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: contain;
            background-color: #fff;
            border: 1px solid #e2e8f0;
          }
          
          .asset-details {
            display: flex;
            flex-direction: column;
          }
          
          .asset-symbol {
            font-weight: 600;
            color: #0f172a;
          }
          
          .asset-name {
            font-size: 0.8rem;
            color: #64748b;
          }
          
          .weight-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .weight-bar {
            height: 4px;
            background-color: #e2e8f0;
            border-radius: 2px;
            width: 100%;
            overflow: hidden;
          }
          
          .weight-fill {
            height: 100%;
            background-color: #4688F1;
            border-radius: 2px;
          }
          
          /* AI Impact Section Styles */
          .ai-impact-section {
            background-color: #fff;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          }
          
          .section-info {
            position: relative;
            display: flex;
            align-items: center;
            color: #64748b;
            cursor: help;
          }
          
          .tooltip {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: #1e293b;
            color: #fff;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            width: 200px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            z-index: 10;
            transform: translateY(5px);
          }
          
          .section-info:hover .tooltip {
            opacity: 1;
          }
          
          .impact-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          
          @media (max-width: 1024px) {
            .impact-container {
              grid-template-columns: 1fr;
            }
          }
          
          .impact-visualization {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }
          
          .pie-chart-placeholder {
            position: relative;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            overflow: hidden;
          }
          
          .pie-segment {
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 50%;
            transform-origin: bottom right;
            transform: rotate(0deg);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          
          .segment-label {
            position: absolute;
            font-size: 0.8rem;
            color: #fff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            transform: rotate(-45deg) translateX(-60px) translateY(-20px);
            white-space: nowrap;
          }
          
          .pie-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background-color: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-weight: 600;
            color: #0f172a;
            font-size: 1rem;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            z-index: 20;
          }
          
          .impact-metrics {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .impact-metric-header {
            display: grid;
            grid-template-columns: 1.5fr 1.5fr 0.7fr 0.7fr;
            gap: 10px;
            padding: 0 10px 10px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 0.85rem;
            font-weight: 600;
            color: #64748b;
          }
          
          .impact-metric-row {
            display: grid;
            grid-template-columns: 1.5fr 1.5fr 0.7fr 0.7fr;
            gap: 10px;
            padding: 12px 10px;
            border-bottom: 1px solid #f1f5f9;
            align-items: center;
            font-size: 0.9rem;
          }
          
          .impact-metric-row:last-child {
            border-bottom: none;
          }
          
          .impact-sector {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
          }
          
          .sector-color {
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 3px;
          }
          
          .impact-score {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .score-bar {
            flex: 1;
            height: 8px;
            background-color: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
          }
          
          .score-fill {
            height: 100%;
            border-radius: 4px;
          }
          
          .impact-growth, .impact-share {
            font-weight: 500;
          }
          
          /* Winners & Losers Sections */
          .winners-losers-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
          }
          
          @media (max-width: 1024px) {
            .winners-losers-container {
              grid-template-columns: 1fr;
            }
          }
          
          .winners-section, .losers-section {
            background-color: #fff;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          }
          
          .filter-dropdown {
            position: relative;
          }
          
          .filter-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background-color: #f1f5f9;
            border: none;
            border-radius: 6px;
            color: #475569;
            font-size: 0.8rem;
          }
          
          .filter-button:hover {
            background-color: #e2e8f0;
          }
          
          .sector-filters {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 10px;
            display: none;
            z-index: 10;
            margin-top: 5px;
            width: 200px;
          }
          
          .filter-dropdown:hover .sector-filters {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .sector-filter {
            padding: 8px 12px;
            text-align: left;
            background-color: transparent;
            border: none;
            border-radius: 6px;
            font-size: 0.9rem;
            color: #475569;
          }
          
          .sector-filter:hover {
            background-color: #f1f5f9;
          }
          
          .sector-filter.active {
            background-color: #4688F1;
            color: #fff;
          }
          
          .stock-cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
            margin-top: 20px;
          }
          
          .stock-card {
            background-color: #f8fafc;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .stock-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
          }
          
          .stock-card.winner {
            border-left: 4px solid #00c853;
          }
          
          .stock-card.loser {
            border-left: 4px solid #ff3d00;
          }
          
          .stock-card-header {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #f1f5f9;
          }
          
          .stock-info {
            flex: 1;
            margin-left: 10px;
          }
          
          .stock-symbol {
            font-weight: 600;
            font-size: 1rem;
            color: #0f172a;
          }
          
          .stock-name {
            font-size: 0.8rem;
            color: #64748b;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 150px;
          }
          
          .stock-change {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 600;
            font-size: 0.95rem;
          }
          
          .stock-card-body {
            padding: 15px;
          }
          
          .stock-metrics {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          
          .metric {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .metric-label {
            font-size: 0.75rem;
            color: #64748b;
          }
          
          .metric-value {
            font-size: 0.95rem;
            font-weight: 500;
            color: #0f172a;
          }
          
          .stock-card-footer {
            padding: 10px 15px;
            background-color: #f1f5f9;
          }
          
          .stock-category {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            color: #475569;
          }
          
          /* News Section Styles */
          .news-section {
            background-color: #fff;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          }
          
          .news-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 20px;
          }
          
          @media (max-width: 768px) {
            .news-container {
              grid-template-columns: 1fr;
            }
          }
          
          .news-card {
            display: flex;
            background-color: #f8fafc;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .news-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
          }
          
          .news-image {
            width: 120px;
            overflow: hidden;
          }
          
          .news-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .news-content {
            flex: 1;
            padding: 15px;
            display: flex;
            flex-direction: column;
          }
          
          .news-title {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #0f172a;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .news-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #64748b;
            margin-bottom: 10px;
          }
          
          .news-summary {
            font-size: 0.85rem;
            color: #475569;
            margin: 0 0 10px 0;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .news-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .related-stocks {
            display: flex;
            gap: 5px;
          }
          
          .stock-tag {
            padding: 3px 8px;
            background-color: #e2e8f0;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
            color: #475569;
          }
          
          .read-more {
            font-size: 0.8rem;
            color: #4688F1;
            text-decoration: none;
            font-weight: 500;
          }
          
          .read-more:hover {
            text-decoration: underline;
          }
          
          /* Footer Styles */
          .dashboard-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
            padding: 20px 0;
            border-top: 1px solid #e2e8f0;
            font-size: 0.85rem;
            color: #64748b;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .footer-info p {
            margin: 0;
          }
          
          .footer-links {
            display: flex;
            gap: 20px;
          }
          
          .footer-links a {
            color: #64748b;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          
          .footer-links a:hover {
            color: #4688F1;
            text-decoration: underline;
          }
        `}</style>
      </div>
    </>
  );
}

// Helper function to get icon based on sector
function getSectorIcon(sector: string) {
  switch (sector) {
    case 'semiconductor':
      return <FaMicrochip />;
    case 'software':
      return <FaCode />;
    case 'cloud':
      return <FaCloudUploadAlt />;
    case 'robotics':
      return <FaRobot />;
    case 'cybersecurity':
      return <FaShieldAlt />;
    case 'data analytics':
      return <FaDatabase />;
    default:
      return <FaCog />;
  }
}

export default StockDashboard;
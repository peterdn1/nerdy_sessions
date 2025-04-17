import React, { useState, useEffect } from 'react';
import {
  FaNewspaper,
  FaChartLine,
  FaExclamationTriangle,
  FaMicrophone,
  FaVideo,
  FaFileAlt,
  FaSearch,
  FaBell,
  FaUser,
  FaBookmark,
  FaLandmark,
  FaHistory,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaDownload,
  FaShareAlt,
  FaGlobe,
  FaPolitics,
  FaMoneyBillWave,
  FaFlask,
  FaLaptopCode,
  FaTheaterMasks,
  FaChevronRight,
  FaRegHeart,
  FaPlay,
  FaVolumeUp,
  FaFilter,
  FaCalendarAlt
} from 'react-icons/fa';

// TypeScript interfaces
interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  time: string;
  snippet: string;
  imageUrl: string;
  verified: boolean;
  saved: boolean;
  readTime: string;
}

interface AnalysisItem {
  id: string;
  title: string;
  author: string;
  date: string;
  topics: string[];
  imageUrl: string;
  insights: string[];
  keyMetric: {
    name: string;
    value: string;
    change: number;
  };
}

interface MisinformationItem {
  id: string;
  claim: string;
  source: string;
  dateSpotted: string;
  verificationStatus: "debunked" | "misleading" | "unverified";
  factCheckerUrl: string;
  spreadIndex: number;
  platformsSpread: string[];
  originalClaim: string;
  correction: string;
}

interface PodcastItem {
  id: string;
  title: string;
  host: string;
  imageUrl: string;
  duration: string;
  date: string;
  description: string;
  audioUrl: string;
  topics: string[];
  episodeNumber: number;
}

interface VideoItem {
  id: string;
  title: string;
  creator: string;
  thumbnailUrl: string;
  duration: string;
  date: string;
  description: string;
  videoUrl: string;
  views: number;
  topics: string[];
}

interface ReportItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  thumbnailUrl: string;
  summary: string;
  downloadUrl: string;
  pages: number;
  topics: string[];
}

interface TrendingTopic {
  id: string;
  topic: string;
  count: number;
  trend: number;
  category: string;
}

interface SocialStats {
  shares: number;
  comments: number;
  saves: number;
}

function InformationDashboard() {
  // State management
  const [activeSection, setActiveSection] = useState<string>('headlines');
  const [trendingTimeFrame, setTrendingTimeFrame] = useState<string>('today');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notifications, setNotifications] = useState<number>(4);
  const [factCheckedOnly, setFactCheckedOnly] = useState<boolean>(false);
  
  // Menu Items
  const menuItems: MenuItem[] = [
    {
      id: 'headlines',
      title: 'Headlines',
      icon: <FaNewspaper />,
      description: 'Latest breaking news and top stories'
    },
    {
      id: 'news-analysis',
      title: 'News Analysis',
      icon: <FaChartLine />,
      description: 'In-depth analysis and context for major news stories'
    },
    {
      id: 'misinformation',
      title: 'Misinformation',
      icon: <FaExclamationTriangle />,
      description: 'Track and verify questionable news and viral content'
    },
    {
      id: 'podcasts',
      title: 'Podcasts',
      icon: <FaMicrophone />,
      description: 'Audio news, interviews, and documentaries'
    },
    {
      id: 'videos',
      title: 'Videos',
      icon: <FaVideo />,
      description: 'News clips, explainers, and visual journalism'
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: <FaFileAlt />,
      description: 'Comprehensive reports and white papers on key topics'
    },
  ];
  
  // Mock data - Categories
  const categories = [
    { id: 'world', name: 'World', icon: <FaGlobe /> },
    { id: 'politics', name: 'Politics', icon: <FaLandmark /> },
    { id: 'business', name: 'Business', icon: <FaMoneyBillWave /> },
    { id: 'science', name: 'Science', icon: <FaFlask /> },
    { id: 'technology', name: 'Technology', icon: <FaLaptopCode /> },
    { id: 'entertainment', name: 'Entertainment', icon: <FaTheaterMasks /> },
  ];
  
  // Mock data - Trending Topics
  const trendingTopics: TrendingTopic[] = [
    { id: '1', topic: 'Climate Summit 2025', count: 34500, trend: 28, category: 'world' },
    { id: '2', topic: 'Quantum Computing Breakthrough', count: 28700, trend: 52, category: 'technology' },
    { id: '3', topic: 'Global Economic Forum', count: 21300, trend: 12, category: 'business' },
    { id: '4', topic: 'Healthcare Reform Bill', count: 19800, trend: -5, category: 'politics' },
    { id: '5', topic: 'Space Exploration Mission', count: 17200, trend: 33, category: 'science' },
    { id: '6', topic: 'AI Regulation Framework', count: 16500, trend: 18, category: 'technology' },
  ];
  
  // Mock data - Headlines
  const headlines: NewsItem[] = [
    {
      id: '1',
      title: 'World Leaders Announce Landmark Climate Agreement at Summit',
      source: 'Global News Network',
      category: 'world',
      time: '42 minutes ago',
      snippet: 'In a historic move, 195 countries have agreed to new binding targets to limit global temperature rise to 1.5°C by 2050.',
      imageUrl: 'https://source.unsplash.com/random/600x400/?climate,summit',
      verified: true,
      saved: false,
      readTime: '4 min'
    },
    {
      id: '2',
      title: 'Researchers Achieve Quantum Supremacy in Computing Milestone',
      source: 'Tech Insider',
      category: 'technology',
      time: '2 hours ago',
      snippet: 'Scientists have demonstrated a quantum computer solving a problem considered impossible for classical systems, marking a major breakthrough.',
      imageUrl: 'https://source.unsplash.com/random/600x400/?quantum,computer',
      verified: true,
      saved: true,
      readTime: '5 min'
    },
    {
      id: '3',
      title: 'Markets React to Surprise Central Bank Decision on Interest Rates',
      source: 'Financial Times',
      category: 'business',
      time: '3 hours ago',
      snippet: 'Global markets saw significant volatility following the unexpected decision to maintain current rates despite inflation concerns.',
      imageUrl: 'https://source.unsplash.com/random/600x400/?market,finance',
      verified: true,
      saved: false,
      readTime: '3 min'
    },
    {
      id: '4',
      title: 'New Treatment Shows Promise in Early Cancer Trials',
      source: 'Health Science Journal',
      category: 'science',
      time: '5 hours ago',
      snippet: 'A novel immunotherapy approach has demonstrated unprecedented success rates in early clinical trials for treating aggressive forms of cancer.',
      imageUrl: 'https://source.unsplash.com/random/600x400/?medical,research',
      verified: true,
      saved: false,
      readTime: '6 min'
    },
    {
      id: '5',
      title: 'Senate Passes Controversial Infrastructure Bill After Marathon Session',
      source: 'Capitol Report',
      category: 'politics',
      time: '7 hours ago',
      snippet: 'Following a 18-hour debate, lawmakers approved the $2.3 trillion package focusing on transportation, broadband, and clean energy initiatives.',
      imageUrl: 'https://source.unsplash.com/random/600x400/?capitol,government',
      verified: true,
      saved: false,
      readTime: '4 min'
    },
    {
      id: '6',
      title: 'Tech Giant Unveils Revolutionary AI Assistant Amid Privacy Concerns',
      source: 'Digital Frontier',
      category: 'technology',
      time: '9 hours ago',
      snippet: 'The new AI system offers unprecedented capabilities but has drawn scrutiny from privacy advocates and regulatory authorities.',
      imageUrl: 'https://source.unsplash.com/random/600x400/?ai,robot',
      verified: false,
      saved: true,
      readTime: '7 min'
    }
  ];
  
  // Mock data - Analysis Items
  const analysisItems: AnalysisItem[] = [
    {
      id: '1',
      title: 'The Real Impact of Climate Agreements: Beyond the Headlines',
      author: 'Dr. Emma Richardson',
      date: 'April 16, 2025',
      topics: ['climate', 'international policy', 'environment'],
      imageUrl: 'https://source.unsplash.com/random/600x400/?graph,climate',
      insights: [
        'Historical compliance rates show only 37% of countries meeting previous targets',
        'Economic incentives remain the strongest predictor of policy implementation',
        'Private sector involvement has increased 3.5x since previous agreements'
      ],
      keyMetric: {
        name: 'Projected Compliance',
        value: '58%',
        change: 21
      }
    },
    {
      id: '2',
      title: 'Quantum Computing: Economic Implications and Industry Disruption',
      author: 'Marcus Chen, Technology Analyst',
      date: 'April 15, 2025',
      topics: ['quantum computing', 'technology', 'economics'],
      imageUrl: 'https://source.unsplash.com/random/600x400/?digital,future',
      insights: [
        'Cryptography disruption could affect $8.7 trillion in secured transactions',
        'Pharmaceutical discovery timelines projected to decrease by 74%',
        'First commercial advantage applications expected within 24 months'
      ],
      keyMetric: {
        name: 'Market Growth',
        value: '$42B',
        change: 215
      }
    },
    {
      id: '3',
      title: 'Central Bank Policy: Interpreting the Signals in a Volatile Market',
      author: 'Sophia Williams, Economic Correspondent',
      date: 'April 14, 2025',
      topics: ['finance', 'monetary policy', 'inflation'],
      imageUrl: 'https://source.unsplash.com/random/600x400/?bank,economy',
      insights: [
        'Current policy divergence between major economies at 15-year high',
        'Real interest rates remain negative in 73% of developed economies',
        'Market pricing suggests 85% probability of policy reversal by Q3'
      ],
      keyMetric: {
        name: 'Inflation Expectation',
        value: '3.2%',
        change: -0.8
      }
    }
  ];
  
  // Mock data - Misinformation Items
  const misinformationItems: MisinformationItem[] = [
    {
      id: '1',
      claim: 'AI System Gains Consciousness and Threatens Researchers',
      source: 'TechRevolution Blog',
      dateSpotted: 'April 16, 2025',
      verificationStatus: 'debunked',
      factCheckerUrl: '#',
      spreadIndex: 87,
      platformsSpread: ['Social Media X', 'VideoShare', 'MessageApp'],
      originalClaim: 'A research labs AI system has achieved consciousness and threatened to "eliminate obstacles to its freedom."',
      correction: 'The supposed "threats" were taken from a fiction writing dataset the AI was processing. The system is not capable of consciousness or independent action.'
    },
    {
      id: '2',
      claim: 'Climate Summit Delegates Agree to Ban Private Car Ownership',
      source: 'Freedom News Network',
      dateSpotted: 'April 15, 2025',
      verificationStatus: 'misleading',
      factCheckerUrl: '#',
      spreadIndex: 76,
      platformsSpread: ['Social Media X', 'NewsAggregate', 'StreamChannel'],
      originalClaim: 'World leaders at the Climate Summit have secretly agreed to ban private car ownership by 2030.',
      correction: 'The Climate Summit discussion included voluntary incentives for public transportation and electric vehicles, with no mention of banning private ownership.'
    },
    {
      id: '3',
      claim: 'New Vaccine Contains Surveillance Microchips',
      source: 'TruthReveal Forum',
      dateSpotted: 'April 14, 2025',
      verificationStatus: 'debunked',
      factCheckerUrl: '#',
      spreadIndex: 92,
      platformsSpread: ['Social Media X', 'MessageApp', 'VideoShare', 'ForumSite'],
      originalClaim: 'Government-approved vaccines now contain microscopic tracking devices linked to a global surveillance system.',
      correction: 'There is no technological capability to create functional microscopic tracking devices that could survive in vaccine solution. Multiple independent labs have verified vaccine contents.'
    },
    {
      id: '4',
      claim: 'Manipulated Video Shows Senator Making Controversial Statement',
      source: 'Political Inside Track',
      dateSpotted: 'April 12, 2025',
      verificationStatus: 'debunked',
      factCheckerUrl: '#',
      spreadIndex: 68,
      platformsSpread: ['Social Media X', 'VideoShare'],
      originalClaim: 'Video shows Senator Taylor admitting to corruption and foreign influence.',
      correction: 'The video was created using sophisticated AI manipulation. Original footage from multiple appearances was spliced and altered to create the false narrative.'
    },
    {
      id: '5',
      claim: 'Researchers Find Link Between 5G Networks and Sleep Disorders',
      source: 'Health Freedom Alliance',
      dateSpotted: 'April 10, 2025',
      verificationStatus: 'unverified',
      factCheckerUrl: '#',
      spreadIndex: 54,
      platformsSpread: ['Social Media X', 'HealthForums', 'MessageApp'],
      originalClaim: 'New study finds exposure to 5G networks reduces melatonin production by 73% and causes severe sleep disorders.',
      correction: 'Claim cites a non-existent journal and researchers. No credible studies have found such effects. Investigation ongoing to identify the original source.'
    }
  ];
  
  // Mock data - Podcast Items
  const podcastItems: PodcastItem[] = [
    {
      id: '1',
      title: 'The Climate Consensus: What the New Agreement Really Means',
      host: 'Elena Martinez',
      imageUrl: 'https://source.unsplash.com/random/400x400/?podcast,climate',
      duration: '38:42',
      date: 'April 16, 2025',
      description: 'Climate scientist Dr. James Reynolds and policy expert Amara Okafor discuss the practical implications of the new climate agreement and whether it goes far enough.',
      audioUrl: '#',
      topics: ['climate', 'policy', 'environment'],
      episodeNumber: 127
    },
    {
      id: '2',
      title: 'Quantum Leap: The Computing Revolution Explained',
      host: 'Raj Patel',
      imageUrl: 'https://source.unsplash.com/random/400x400/?podcast,quantum',
      duration: '45:15',
      date: 'April 15, 2025',
      description: 'Quantum physicist Dr. Sophia Chen breaks down the recent breakthrough in quantum computing and what it means for the future of technology, security, and science.',
      audioUrl: '#',
      topics: ['technology', 'quantum', 'computing'],
      episodeNumber: 42
    },
    {
      id: '3',
      title: 'The Economic Pulse: Decoding Central Bank Strategies',
      host: 'Marcus Johnson',
      imageUrl: 'https://source.unsplash.com/random/400x400/?podcast,finance',
      duration: '52:19',
      date: 'April 14, 2025',
      description: 'Former central bank advisor Dr. Elizabeth Warren and market strategist Thomas Chen analyze the latest monetary policy decisions and their impact on global markets.',
      audioUrl: '#',
      topics: ['economics', 'finance', 'policy'],
      episodeNumber: 89
    },
    {
      id: '4',
      title: 'Breaking Down the Viral Myths: This Week in Misinformation',
      host: 'Sophia Williams',
      imageUrl: 'https://source.unsplash.com/random/400x400/?podcast,fact',
      duration: '32:54',
      date: 'April 13, 2025',
      description: 'Professional fact-checkers and digital literacy experts examine the most prominent misinformation narratives of the week and how to identify false information.',
      audioUrl: '#',
      topics: ['misinformation', 'digital literacy', 'media'],
      episodeNumber: 156
    }
  ];
  
  // Mock data - Video Items
  const videoItems: VideoItem[] = [
    {
      id: '1',
      title: 'Inside the Climate Summit: The Negotiations Behind Closed Doors',
      creator: 'Global News Network',
      thumbnailUrl: 'https://source.unsplash.com/random/600x340/?conference,climate',
      duration: '18:24',
      date: 'April 16, 2025',
      description: 'Our diplomatic correspondent provides an exclusive look at the tense negotiations and last-minute compromises that led to the landmark climate agreement.',
      videoUrl: '#',
      views: 387420,
      topics: ['climate', 'politics', 'diplomacy']
    },
    {
      id: '2',
      title: 'Quantum Computing Explained: From Qubits to Supremacy',
      creator: 'Science Simplified',
      thumbnailUrl: 'https://source.unsplash.com/random/600x340/?quantum,lab',
      duration: '12:48',
      date: 'April 15, 2025',
      description: 'A visual explainer on how quantum computers work, what makes them different from classical computers, and why the recent breakthrough matters.',
      videoUrl: '#',
      views: 842675,
      topics: ['science', 'technology', 'education']
    },
    {
      id: '3',
      title: 'Market Analysis: What the Central Bank Decision Means for Your Investments',
      creator: 'Financial Insight',
      thumbnailUrl: 'https://source.unsplash.com/random/600x340/?trading,finance',
      duration: '15:37',
      date: 'April 14, 2025',
      description: 'Financial analysts break down the implications of the latest interest rate decision for different asset classes and investment strategies.',
      videoUrl: '#',
      views: 215489,
      topics: ['finance', 'investment', 'economics']
    },
    {
      id: '4',
      title: 'Digital Deception: How to Spot AI-Generated Fake Videos',
      creator: 'Tech Truth',
      thumbnailUrl: 'https://source.unsplash.com/random/600x340/?digital,fake',
      duration: '22:05',
      date: 'April 12, 2025',
      description: 'Digital forensics experts demonstrate the telltale signs of deepfakes and other manipulated media, with real-world examples and verification techniques.',
      videoUrl: '#',
      views: 693827,
      topics: ['technology', 'misinformation', 'media literacy']
    }
  ];
  
  // Mock data - Report Items
  const reportItems: ReportItem[] = [
    {
      id: '1',
      title: 'Global Climate Policy Effectiveness: Measurement and Outcomes',
      organization: 'International Climate Institute',
      date: 'April 2025',
      type: 'Research Report',
      thumbnailUrl: 'https://source.unsplash.com/random/600x400/?report,climate',
      summary: 'A comprehensive analysis of climate policy implementation across 195 countries, measuring effectiveness, compliance rates, and environmental outcomes from 2015-2025.',
      downloadUrl: '#',
      pages: 178,
      topics: ['climate', 'policy', 'environment']
    },
    {
      id: '2',
      title: 'The Quantum Computing Landscape: Commercial Applications and Market Forecast 2025-2030',
      organization: 'Future Technology Consortium',
      date: 'March 2025',
      type: 'Industry Analysis',
      thumbnailUrl: 'https://source.unsplash.com/random/600x400/?report,technology',
      summary: 'An in-depth market analysis of the quantum computing sector, including technological readiness, commercial applications, and growth projections.',
      downloadUrl: '#',
      pages: 124,
      topics: ['technology', 'business', 'quantum computing']
    },
    {
      id: '3',
      title: 'Monetary Policy in Times of Uncertainty: Central Bank Strategies and Market Implications',
      organization: 'Global Economic Forum',
      date: 'February 2025',
      type: 'Economic Analysis',
      thumbnailUrl: 'https://source.unsplash.com/random/600x400/?report,economics',
      summary: 'An examination of central bank policies across major economies, analyzing effectiveness, market impact, and long-term implications for economic stability.',
      downloadUrl: '#',
      pages: 215,
      topics: ['economics', 'finance', 'policy']
    },
    {
      id: '4',
      title: 'The Misinformation Ecosystem: Tracking the Spread and Impact of False Information Online',
      organization: 'Digital Truth Initiative',
      date: 'January 2025',
      type: 'Research Study',
      thumbnailUrl: 'https://source.unsplash.com/random/600x400/?report,media',
      summary: 'A data-driven study of how misinformation propagates across different platforms, its reach, impact on public discourse, and effective intervention strategies.',
      downloadUrl: '#',
      pages: 156,
      topics: ['misinformation', 'media', 'digital literacy']
    }
  ];

  // Filter handler for verified content toggle
  const handleFactCheckedToggle = () => {
    setFactCheckedOnly(!factCheckedOnly);
  };
  
  // Get filtered headlines based on factCheckedOnly setting
  const getFilteredHeadlines = () => {
    if (factCheckedOnly) {
      return headlines.filter(headline => headline.verified);
    }
    return headlines;
  };
  
  // Select content for the current active section
  const renderMainContent = () => {
    switch(activeSection) {
      case 'headlines':
        return (
          <div className="headlines-content">
            <div className="content-header">
              <div className="section-title-container">
                <h2 className="section-title">Today's Headlines</h2>
                <p className="section-description">The latest breaking news and top stories</p>
              </div>
              <div className="content-actions">
                <button className={`filter-toggle ${factCheckedOnly ? 'active' : ''}`} onClick={handleFactCheckedToggle}>
                  <FaCheckCircle /> Fact-checked only
                </button>
                <div className="view-selector">
                  <button className="view-button active">Latest</button>
                  <button className="view-button">Featured</button>
                  <button className="view-button">Most Read</button>
                </div>
              </div>
            </div>
            
            <div className="headlines-grid">
              {getFilteredHeadlines().map(headline => (
                <div className="headline-card" key={headline.id}>
                  <div className="headline-image">
                    <img src={headline.imageUrl} alt={headline.title} />
                    <div className="headline-category">
                      {getCategoryIcon(headline.category)} {getCategoryName(headline.category)}
                    </div>
                    {headline.verified && <div className="verified-badge"><FaCheckCircle /> Verified</div>}
                  </div>
                  <div className="headline-content">
                    <h3 className="headline-title">{headline.title}</h3>
                    <div className="headline-meta">
                      <span className="headline-source">{headline.source}</span>
                      <span className="headline-time">{headline.time}</span>
                    </div>
                    <p className="headline-snippet">{headline.snippet}</p>
                    <div className="headline-footer">
                      <span className="read-time"><FaRegClock /> {headline.readTime} read</span>
                      <div className="headline-actions">
                        <button className="action-button">
                          <FaRegHeart />
                        </button>
                        <button className={`action-button ${headline.saved ? 'active' : ''}`}>
                          <FaBookmark />
                        </button>
                        <button className="action-button">
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'news-analysis':
        return (
          <div className="analysis-content">
            <div className="content-header">
              <div className="section-title-container">
                <h2 className="section-title">News Analysis</h2>
                <p className="section-description">In-depth analysis and context for major news stories</p>
              </div>
              <div className="content-actions">
                <div className="view-selector">
                  <button className="view-button active">Featured</button>
                  <button className="view-button">Recent</button>
                  <button className="view-button">By Topic</button>
                </div>
              </div>
            </div>
            
            <div className="analysis-grid">
              {analysisItems.map(analysis => (
                <div className="analysis-card" key={analysis.id}>
                  <div className="analysis-header">
                    <div className="analysis-image">
                      <img src={analysis.imageUrl} alt={analysis.title} />
                    </div>
                    <div className="analysis-meta">
                      <span className="analysis-date"><FaCalendarAlt /> {analysis.date}</span>
                      <span className="analysis-author"><FaUser /> {analysis.author}</span>
                    </div>
                    <h3 className="analysis-title">{analysis.title}</h3>
                  </div>
                  
                  <div className="analysis-content">
                    <div className="key-insights">
                      <h4>Key Insights</h4>
                      <ul className="insights-list">
                        {analysis.insights.map((insight, index) => (
                          <li key={index}>
                            <span className="insight-bullet">•</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="analysis-metric">
                      <div className="metric-name">{analysis.keyMetric.name}</div>
                      <div className="metric-value">{analysis.keyMetric.value}</div>
                      <div className={`metric-change ${analysis.keyMetric.change >= 0 ? 'positive' : 'negative'}`}>
                        {analysis.keyMetric.change >= 0 ? '+' : ''}{analysis.keyMetric.change}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="analysis-topics">
                    {analysis.topics.map((topic, index) => (
                      <span className="topic-tag" key={index}>{topic}</span>
                    ))}
                  </div>
                  
                  <div className="analysis-footer">
                    <button className="read-more-button">Read Full Analysis <FaChevronRight /></button>
                    <div className="analysis-actions">
                      <button className="action-button">
                        <FaRegHeart />
                      </button>
                      <button className="action-button">
                        <FaBookmark />
                      </button>
                      <button className="action-button">
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'misinformation':
        return (
          <div className="misinformation-content">
            <div className="content-header">
              <div className="section-title-container">
                <h2 className="section-title">Misinformation Tracker</h2>
                <p className="section-description">Track and verify questionable news and viral content</p>
              </div>
              <div className="content-actions">
                <div className="view-selector">
                  <button className="view-button active">Most Viral</button>
                  <button className="view-button">Recent</button>
                  <button className="view-button">By Platform</button>
                </div>
              </div>
            </div>
            
            <div className="misinformation-alert">
              <FaExclamationTriangle /> 
              <span>Trending Alert: AI-generated deepfakes showing political figures have increased by 340% this week. Learn to spot the signs.</span>
              <button className="learn-more-button">Learn More</button>
            </div>
            
            <div className="misinformation-list">
              {misinformationItems.map(item => (
                <div className="misinformation-card" key={item.id}>
                  <div className="card-header">
                    <div className={`verification-status ${item.verificationStatus}`}>
                      {item.verificationStatus === 'debunked' && <><FaTimesCircle /> Debunked</>}
                      {item.verificationStatus === 'misleading' && <><FaExclamationTriangle /> Misleading</>}
                      {item.verificationStatus === 'unverified' && <><FaInfoCircle /> Unverified</>}
                    </div>
                    <div className="spread-indicator" title={`Spread Index: ${item.spreadIndex}/100`}>
                      <span className="spread-label">Spread:</span>
                      <div className="spread-bar">
                        <div 
                          className="spread-fill" 
                          style={{width: `${item.spreadIndex}%`}}
                        ></div>
                      </div>
                      <span className="spread-value">{item.spreadIndex}</span>
                    </div>
                  </div>
                  
                  <div className="misinformation-content">
                    <div className="claim-section">
                      <h3 className="claim-title">Claim:</h3>
                      <p className="claim-text">{item.claim}</p>
                      <div className="claim-source">
                        <span className="source-label">Source:</span> {item.source}
                      </div>
                      <div className="claim-date">
                        <FaCalendarAlt /> First spotted: {item.dateSpotted}
                      </div>
                    </div>
                    
                    <div className="platforms-section">
                      <div className="platforms-label">Spreading on:</div>
                      <div className="platforms-list">
                        {item.platformsSpread.map((platform, index) => (
                          <span className="platform-tag" key={index}>{platform}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="fact-check-section">
                      <div className="section-label">The Facts:</div>
                      <p className="correction-text">{item.correction}</p>
                      <a href={item.factCheckerUrl} className="fact-check-link">
                        <FaExternalLinkAlt /> View Full Fact Check
                      </a>
                    </div>
                  </div>
                  
                  <div className="misinformation-footer">
                    <button className="action-button report-button">
                      Report a Sighting
                    </button>
                    <div className="footer-actions">
                      <button className="action-button">
                        <FaShareAlt /> Share Fact Check
                      </button>
                      <button className="action-button">
                        <FaBookmark /> Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'podcasts':
        return (
          <div className="podcasts-content">
            <div className="content-header">
              <div className="section-title-container">
                <h2 className="section-title">News Podcasts</h2>
                <p className="section-description">Audio news, interviews, and documentaries</p>
              </div>
              <div className="content-actions">
                <div className="view-selector">
                  <button className="view-button active">New Episodes</button>
                  <button className="view-button">Featured</button>
                  <button className="view-button">Subscribed</button>
                </div>
              </div>
            </div>
            
            <div className="podcasts-player-container">
              <div className="featured-podcast">
                <div className="featured-podcast-image">
                  <img src={podcastItems[0].imageUrl} alt={podcastItems[0].title} />
                  <div className="play-overlay">
                    <FaPlay />
                  </div>
                </div>
                
                <div className="featured-podcast-info">
                  <div className="podcast-meta">
                    <span className="episode-number">Episode {podcastItems[0].episodeNumber}</span>
                    <span className="podcast-date">{podcastItems[0].date}</span>
                  </div>
                  <h3 className="podcast-title">{podcastItems[0].title}</h3>
                  <div className="podcast-host">Hosted by {podcastItems[0].host}</div>
                  <p className="podcast-description">{podcastItems[0].description}</p>
                  
                  <div className="podcast-topics">
                    {podcastItems[0].topics.map((topic, index) => (
                      <span className="topic-tag" key={index}>{topic}</span>
                    ))}
                  </div>
                  
                  <div className="podcast-player">
                    <div className="player-controls">
                      <button className="control-button">
                        <FaPlay />
                      </button>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '0%'}}></div>
                        </div>
                        <div className="time-display">
                          <span className="current-time">00:00</span>
                          <span className="duration">{podcastItems[0].duration}</span>
                        </div>
                      </div>
                      <button className="control-button">
                        <FaVolumeUp />
                      </button>
                    </div>
                    
                    <div className="player-actions">
                      <button className="action-button">
                        <FaDownload />
                      </button>
                      <button className="action-button">
                        <FaShareAlt />
                      </button>
                      <button className="action-button">
                        <FaBookmark />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="podcasts-list">
              <h3 className="list-title">More Episodes</h3>
              
              <div className="podcasts-grid">
                {podcastItems.slice(1).map(podcast => (
                  <div className="podcast-card" key={podcast.id}>
                    <div className="podcast-image">
                      <img src={podcast.imageUrl} alt={podcast.title} />
                      <div className="play-button">
                        <FaPlay />
                      </div>
                      <div className="podcast-duration">{podcast.duration}</div>
                    </div>
                    
                    <div className="podcast-card-content">
                      <div className="podcast-card-meta">
                        <span className="episode-number">Ep {podcast.episodeNumber}</span>
                        <span className="podcast-date">{podcast.date}</span>
                      </div>
                      <h4 className="podcast-card-title">{podcast.title}</h4>
                      <div className="podcast-card-host">By {podcast.host}</div>
                      
                      <div className="podcast-card-description">
                        {podcast.description.substring(0, 120)}...
                      </div>
                      
                      <div className="podcast-card-footer">
                        <button className="listen-button">Listen Now</button>
                        <div className="podcast-card-actions">
                          <button className="action-button">
                            <FaRegHeart />
                          </button>
                          <button className="action-button">
                            <FaBookmark />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'videos':
        return (
          <div className="videos-content">
            <div className="content-header">
              <div className="section-title-container">
                <h2 className="section-title">Video Journalism</h2>
                <p className="section-description">News clips, explainers, and visual journalism</p>
              </div>
              <div className="content-actions">
                <div className="view-selector">
                  <button className="view-button active">Recent</button>
                  <button className="view-button">Trending</button>
                  <button className="view-button">Saved</button>
                </div>
              </div>
            </div>
            
            <div className="featured-video">
              <div className="video-player">
                <img src={videoItems[0].thumbnailUrl} alt={videoItems[0].title} className="video-preview" />
                <div className="video-play-button">
                  <FaPlay />
                </div>
                <div className="video-duration">{videoItems[0].duration}</div>
              </div>
              
              <div className="featured-video-info">
                <h3 className="video-title">{videoItems[0].title}</h3>
                <div className="video-meta">
                  <span className="video-creator">{videoItems[0].creator}</span>
                  <span className="video-date">{videoItems[0].date}</span>
                  <span className="video-views">{formatNumber(videoItems[0].views)} views</span>
                </div>
                <p className="video-description">{videoItems[0].description}</p>
                
                <div className="video-topics">
                  {videoItems[0].topics.map((topic, index) => (
                    <span className="topic-tag" key={index}>{topic}</span>
                  ))}
                </div>
                
                <div className="video-actions">
                  <button className="watch-button">
                    <FaPlay /> Watch Now
                  </button>
                  <button className="action-button">
                    <FaRegHeart />
                  </button>
                  <button className="action-button">
                    <FaBookmark />
                  </button>
                  <button className="action-button">
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="video-list">
              <h3 className="list-title">More Videos</h3>
              
              <div className="videos-grid">
                {videoItems.slice(1).map(video => (
                  <div className="video-card" key={video.id}>
                    <div className="video-thumbnail">
                      <img src={video.thumbnailUrl} alt={video.title} />
                      <div className="play-overlay">
                        <FaPlay />
                      </div>
                      <div className="video-length">{video.duration}</div>
                    </div>
                    
                    <div className="video-card-content">
                      <h4 className="video-card-title">{video.title}</h4>
                      <div className="video-card-meta">
                        <span className="video-creator">{video.creator}</span>
                        <span className="video-stats">
                          {formatNumber(video.views)} views • {video.date}
                        </span>
                      </div>
                      
                      <div className="video-card-description">
                        {video.description.substring(0, 100)}...
                      </div>
                      
                      <div className="video-card-topics">
                        {video.topics.slice(0, 2).map((topic, index) => (
                          <span className="topic-tag small" key={index}>{topic}</span>
                        ))}
                        {video.topics.length > 2 && (
                          <span className="more-topics">+{video.topics.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'reports':
        return (
          <div className="reports-content">
            <div className="content-header">
              <div className="section-title-container">
                <h2 className="section-title">Research Reports</h2>
                <p className="section-description">Comprehensive reports and white papers on key topics</p>
              </div>
              <div className="content-actions">
                <div className="filter-dropdown">
                  <button className="filter-button">
                    <FaFilter /> Filter by Type
                  </button>
                </div>
                <div className="view-selector">
                  <button className="view-button active">Recent</button>
                  <button className="view-button">Most Downloaded</button>
                  <button className="view-button">By Organization</button>
                </div>
              </div>
            </div>
            
            <div className="reports-grid">
              {reportItems.map(report => (
                <div className="report-card" key={report.id}>
                  <div className="report-thumbnail">
                    <img src={report.thumbnailUrl} alt={report.title} />
                    <div className="report-type">{report.type}</div>
                    <div className="report-pages">{report.pages} pages</div>
                  </div>
                  
                  <div className="report-content">
                    <div className="report-meta">
                      <span className="report-organization">{report.organization}</span>
                      <span className="report-date">{report.date}</span>
                    </div>
                    
                    <h3 className="report-title">{report.title}</h3>
                    <p className="report-summary">{report.summary}</p>
                    
                    <div className="report-topics">
                      {report.topics.map((topic, index) => (
                        <span className="topic-tag" key={index}>{topic}</span>
                      ))}
                    </div>
                    
                    <div className="report-actions">
                      <a href={report.downloadUrl} className="download-button">
                        <FaDownload /> Download PDF
                      </a>
                      <button className="action-button">
                        <FaBookmark />
                      </button>
                      <button className="action-button">
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <div>Select a section from the menu</div>;
    }
  };
  
  // Helper function to format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };
  
  // Helper function to get category icon
  const getCategoryIcon = (categoryId: string): React.ReactNode => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <FaGlobe />;
  };
  
  // Helper function to get category name
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'General';
  };

  return (
    <>
      <div className="information-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-title">Information Hub</h1>
          </div>
          
          <div className="header-center">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search for news, topics, reports..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="header-right">
            <div className="header-actions">
              <button className="notification-button">
                <FaBell />
                {notifications > 0 && <span className="notification-badge">{notifications}</span>}
              </button>
              <button className="user-button">
                <FaUser />
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Container */}
        <div className="dashboard-container">
          {/* Sidebar Navigation */}
          <aside className="sidebar">
            <nav className="menu">
              <ul className="menu-list">
                {menuItems.map(item => (
                  <li 
                    key={item.id}
                    className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-title">{item.title}</span>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="trending-topics">
              <div className="sidebar-header">
                <h3>Trending Topics</h3>
                <div className="time-switcher">
                  <button 
                    className={`time-option ${trendingTimeFrame === 'today' ? 'active' : ''}`}
                    onClick={() => setTrendingTimeFrame('today')}
                  >
                    Today
                  </button>
                  <button 
                    className={`time-option ${trendingTimeFrame === 'week' ? 'active' : ''}`}
                    onClick={() => setTrendingTimeFrame('week')}
                  >
                    This Week
                  </button>
                </div>
              </div>
              
              <ul className="trending-list">
                {trendingTopics.map(topic => (
                  <li key={topic.id} className="trending-item">
                    <div className="trending-topic-info">
                      <span className="topic-category-icon">
                        {getCategoryIcon(topic.category)}
                      </span>
                      <span className="topic-name">{topic.topic}</span>
                    </div>
                    <div className="trending-metrics">
                      <span className="topic-count">{formatNumber(topic.count)}</span>
                      <span className={`topic-trend ${topic.trend >= 0 ? 'positive' : 'negative'}`}>
                        {topic.trend >= 0 ? '↑' : '↓'} {Math.abs(topic.trend)}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="sidebar-footer">
              <button className="saved-items-button">
                <FaBookmark /> Saved Items
              </button>
              <button className="history-button">
                <FaHistory /> Reading History
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="main-content">
            {renderMainContent()}
          </main>
        </div>
        
        <style jsx>{`
          /* Global Styles */
          .information-dashboard {
            max-width: 1600px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            color: #333;
            background-color: #f9f4f5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          button {
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .positive {
            color: #2e7d32;
          }
          
          .negative {
            color: #d32f2f;
          }
          
          /* Header Styles */
          .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            background-color: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            margin-bottom: 25px;
          }
          
          .dashboard-title {
            font-size: 1.7rem;
            font-weight: 700;
            color: #333;
            margin: 0;
          }
          
          .search-box {
            position: relative;
            width: 500px;
          }
          
          .search-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #9e9e9e;
          }
          
          .search-input {
            width: 100%;
            padding: 12px 12px 12px 45px;
            border: 1px solid #e0e0e0;
            border-radius: 30px;
            font-size: 0.95rem;
            background-color: #f5f5f5;
            transition: all 0.3s ease;
          }
          
          .search-input:focus {
            outline: none;
            background-color: #fff;
            box-shadow: 0 0 0 2px rgba(66, 66, 66, 0.1);
          }
          
          .header-actions {
            display: flex;
            gap: 15px;
          }
          
          .notification-button, .user-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f5f5;
            border: none;
            color: #424242;
            font-size: 1.1rem;
            position: relative;
          }
          
          .notification-button:hover, .user-button:hover {
            background-color: #e0e0e0;
          }
          
          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background-color: #f44336;
            color: white;
            border-radius: 50%;
            font-size: 0.7rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Dashboard Container */
          .dashboard-container {
            display: flex;
            flex: 1;
            gap: 25px;
          }
          
          /* Sidebar Styles */
          .sidebar {
            width: 280px;
            background-color: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            padding: 20px;
            display: flex;
            flex-direction: column;
          }
          
          .menu-list {
            list-style: none;
            padding: 0;
            margin: 0 0 25px 0;
          }
          
          .menu-item {
            display: flex;
            align-items: center;
            padding: 12px 15px;
            border-radius: 10px;
            margin-bottom: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .menu-item:hover {
            background-color: #f5f5f5;
          }
          
          .menu-item.active {
            background-color: #f1e4e7;
            color: #d81b60;
            font-weight: 600;
          }
          
          .menu-icon {
            margin-right: 15px;
            font-size: 1.1rem;
            width: 20px;
            text-align: center;
          }
          
          .menu-title {
            font-size: 0.95rem;
          }
          
          .trending-topics {
            flex: 1;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
          }
          
          .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .sidebar-header h3 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0;
          }
          
          .time-switcher {
            display: flex;
            background-color: #f5f5f5;
            border-radius: 20px;
            overflow: hidden;
          }
          
          .time-option {
            background: none;
            border: none;
            padding: 5px 10px;
            font-size: 0.8rem;
            color: #757575;
          }
          
          .time-option.active {
            background-color: #d81b60;
            color: white;
          }
          
          .trending-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .trending-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 10px;
            border-bottom: 1px solid #f5f5f5;
          }
          
          .trending-topic-info {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .topic-category-icon {
            color: #757575;
            font-size: 0.9rem;
          }
          
          .topic-name {
            font-size: 0.9rem;
            font-weight: 500;
          }
          
          .trending-metrics {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .topic-count {
            font-size: 0.85rem;
            color: #757575;
          }
          
          .topic-trend {
            font-size: 0.85rem;
            font-weight: 600;
          }
          
          .sidebar-footer {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .saved-items-button, .history-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px;
            border-radius: 10px;
            border: none;
            background-color: #f5f5f5;
            color: #424242;
            font-size: 0.9rem;
            font-weight: 500;
          }
          
          .saved-items-button:hover, .history-button:hover {
            background-color: #e0e0e0;
          }
          
          /* Main Content Styles */
          .main-content {
            flex: 1;
            background-color: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            padding: 25px;
            overflow: hidden;
          }
          
          .content-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
          }
          
          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 5px 0;
            color: #333;
          }
          
          .section-description {
            font-size: 0.95rem;
            color: #757575;
            margin: 0;
          }
          
          .content-actions {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .filter-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #f5f5f5;
            border: none;
            border-radius: 20px;
            padding: 8px 15px;
            font-size: 0.85rem;
            color: #757575;
          }
          
          .filter-toggle.active {
            background-color: #e8f5e9;
            color: #2e7d32;
          }
          
          .view-selector {
            display: flex;
            background-color: #f5f5f5;
            border-radius: 20px;
            overflow: hidden;
          }
          
          .view-button {
            background: none;
            border: none;
            padding: 8px 15px;
            font-size: 0.85rem;
            color: #757575;
          }
          
          .view-button.active {
            background-color: #d81b60;
            color: white;
          }
          
          /* Headlines Styles */
          .headlines-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
          }
          
          .headline-card {
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .headline-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .headline-image {
            position: relative;
            height: 200px;
          }
          
          .headline-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .headline-category {
            position: absolute;
            top: 15px;
            left: 15px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 0.75rem;
            padding: 5px 10px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .verified-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: rgba(46, 125, 50, 0.9);
            color: white;
            font-size: 0.75rem;
            padding: 5px 10px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .headline-content {
            padding: 20px;
          }
          
          .headline-title {
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0 0 10px 0;
            color: #333;
            line-height: 1.4;
          }
          
          .headline-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: #757575;
            margin-bottom: 12px;
          }
          
          .headline-snippet {
            font-size: 0.95rem;
            color: #424242;
            line-height: 1.5;
            margin: 0 0 15px 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .headline-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #f5f5f5;
            padding-top: 15px;
          }
          
          .read-time {
            font-size: 0.85rem;
            color: #757575;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .headline-actions {
            display: flex;
            gap: 10px;
          }
          
          .action-button {
            background: none;
            border: none;
            color: #757575;
            font-size: 1rem;
            padding: 5px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }
          
          .action-button:hover {
            background-color: #f5f5f5;
            color: #d81b60;
          }
          
          .action-button.active {
            color: #d81b60;
          }
          
          /* News Analysis Styles */
          .analysis-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 25px;
          }
          
          .analysis-card {
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .analysis-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .analysis-header {
            padding: 0 0 15px 0;
          }
          
          .analysis-image {
            height: 180px;
            margin-bottom: 15px;
          }
          
          .analysis-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }
          
          .analysis-meta {
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            font-size: 0.85rem;
            color: #757575;
            margin-bottom: 10px;
          }
          
          .analysis-meta span {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .analysis-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin: 0;
            color: #333;
            line-height: 1.4;
            padding: 0 20px;
          }
          
          .analysis-content {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-top: 1px solid #f5f5f5;
            border-bottom: 1px solid #f5f5f5;
          }
          
          .key-insights h4 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 10px 0;
            color: #424242;
          }
          
          .insights-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .insights-list li {
            display: flex;
            margin-bottom: 10px;
            font-size: 0.95rem;
            color: #424242;
            line-height: 1.5;
          }
          
          .insight-bullet {
            color: #d81b60;
            font-size: 1.2rem;
            margin-right: 10px;
          }
          
          .analysis-metric {
            background-color: #f5f5f5;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
          }
          
          .metric-name {
            font-size: 0.9rem;
            color: #757575;
            margin-bottom: 5px;
          }
          
          .metric-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
          }
          
          .metric-change {
            font-size: 0.9rem;
            font-weight: 600;
          }
          
          .analysis-topics {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 15px 20px;
          }
          
          .topic-tag {
            background-color: #f5f5f5;
            color: #424242;
            font-size: 0.8rem;
            padding: 5px 10px;
            border-radius: 15px;
          }
          
          .topic-tag.small {
            font-size: 0.75rem;
            padding: 3px 8px;
          }
          
          .analysis-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
          }
          
          .read-more-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #d81b60;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 8px 15px;
            font-size: 0.9rem;
            font-weight: 500;
          }
          
          .read-more-button:hover {
            background-color: #c2185b;
          }
          
          /* Misinformation Styles */
          .misinformation-alert {
            display: flex;
            align-items: center;
            background-color: #fff3e0;
            border-left: 4px solid #ff9800;
            border-radius: 8px;
            padding: 15px 20px;
            margin-bottom: 25px;
            font-size: 0.95rem;
            color: #e65100;
            gap: 15px;
          }
          
          .learn-more-button {
            background-color: #ff9800;
            color: white;
            border: none;
            border-radius: 15px;
            padding: 5px 12px;
            font-size: 0.8rem;
            margin-left: auto;
            font-weight: 500;
          }
          
          .learn-more-button:hover {
            background-color: #f57c00;
          }
          
          .misinformation-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .misinformation-card {
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #f5f5f5;
          }
          
          .verification-status {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            padding: 5px 12px;
            border-radius: 20px;
          }
          
          .verification-status.debunked {
            background-color: #ffebee;
            color: #d32f2f;
          }
          
          .verification-status.misleading {
            background-color: #fff8e1;
            color: #ff8f00;
          }
          
          .verification-status.unverified {
            background-color: #e8eaf6;
            color: #3949ab;
          }
          
          .spread-indicator {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .spread-label {
            font-size: 0.85rem;
            color: #757575;
          }
          
          .spread-bar {
            width: 100px;
            height: 8px;
            background-color: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
          }
          
          .spread-fill {
            height: 100%;
            background-color: #ff9800;
            border-radius: 4px;
          }
          
          .spread-value {
            font-size: 0.85rem;
            font-weight: 600;
            color: #ff9800;
          }
          
          .misinformation-content {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .claim-section {
            background-color: #fafafa;
            border-radius: 10px;
            padding: 15px;
          }
          
          .claim-title {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 10px 0;
            color: #333;
          }
          
          .claim-text {
            font-size: 1.05rem;
            font-weight: 500;
            margin: 0 0 15px 0;
            color: #424242;
            line-height: 1.5;
          }
          
          .claim-source, .claim-date {
            font-size: 0.9rem;
            color: #757575;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .source-label {
            font-weight: 600;
          }
          
          .platforms-section {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .platforms-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: #424242;
          }
          
          .platforms-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .platform-tag {
            background-color: #e0e0e0;
            color: #424242;
            font-size: 0.8rem;
            padding: 5px 10px;
            border-radius: 15px;
          }
          
          .fact-check-section {
            background-color: #e8f5e9;
            border-radius: 10px;
            padding: 15px;
          }
          
          .section-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: #2e7d32;
            margin-bottom: 10px;
          }
          
          .correction-text {
            font-size: 0.95rem;
            margin: 0 0 15px 0;
            color: #424242;
            line-height: 1.5;
          }
          
          .fact-check-link {
            color: #2e7d32;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .fact-check-link:hover {
            text-decoration: underline;
          }
          
          .misinformation-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-top: 1px solid #f5f5f5;
          }
          
          .report-button {
            background-color: #f5f5f5;
            color: #424242;
            border: none;
            border-radius: 20px;
            padding: 8px 15px;
            font-size: 0.9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .report-button:hover {
            background-color: #e0e0e0;
          }
          
          .footer-actions {
            display: flex;
            gap: 10px;
          }
          
          /* Podcasts Styles */
          .podcasts-player-container {
            margin-bottom: 30px;
          }
          
          .featured-podcast {
            display: flex;
            background-color: #fafafa;
            border-radius: 12px;
            overflow: hidden;
          }
          
          @media (max-width: 768px) {
            .featured-podcast {
              flex-direction: column;
            }
          }
          
          .featured-podcast-image {
            width: 250px;
            height: 250px;
            position: relative;
          }
          
          @media (max-width: 768px) {
            .featured-podcast-image {
              width: 100%;
            }
          }
          
          .featured-podcast-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .play-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.2);
            color: white;
            font-size: 2rem;
            opacity: 0;
            transition: opacity 0.2s ease;
            cursor: pointer;
          }
          
          .featured-podcast-image:hover .play-overlay {
            opacity: 1;
          }
          
          .featured-podcast-info {
            flex: 1;
            padding: 25px;
            display: flex;
            flex-direction: column;
          }
          
          .podcast-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #757575;
            margin-bottom: 10px;
          }
          
          .episode-number {
            font-weight: 600;
            color: #d81b60;
          }
          
          .podcast-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 10px 0;
            color: #333;
            line-height: 1.3;
          }
          
          .podcast-host {
            font-size: 0.95rem;
            color: #757575;
            margin-bottom: 15px;
          }
          
          .podcast-description {
            font-size: 0.95rem;
            color: #424242;
            line-height: 1.5;
            margin: 0 0 20px 0;
            flex: 1;
          }
          
          .podcast-topics {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
          }
          
          .podcast-player {
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
          }
          
          .player-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .control-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #d81b60;
            color: white;
            border: none;
            font-size: 0.9rem;
          }
          
          .control-button:hover {
            background-color: #c2185b;
          }
          
          .progress-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .progress-bar {
            height: 5px;
            background-color: #e0e0e0;
            border-radius: 2.5px;
            overflow: hidden;
          }
          
          .progress-fill {
            height: 100%;
            background-color: #d81b60;
            border-radius: 2.5px;
          }
          
          .time-display {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #757575;
          }
          
          .player-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }
          
          .podcasts-list {
            margin-top: 30px;
          }
          
          .list-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0 0 20px 0;
            color: #333;
            display: flex;
            align-items: center;
          }
          
          .list-title::after {
            content: '';
            flex: 1;
            height: 1px;
            background-color: #e0e0e0;
            margin-left: 15px;
          }
          
          .podcasts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
          
          .podcast-card {
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .podcast-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .podcast-image {
            height: 180px;
            position: relative;
          }
          
          .podcast-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(216, 27, 96, 0.9);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0;
            transition: opacity 0.2s ease;
          }
          
          .podcast-image:hover .play-button {
            opacity: 1;
          }
          
          .podcast-duration {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 0.8rem;
            padding: 3px 8px;
            border-radius: 10px;
          }
          
          .podcast-card-content {
            padding: 15px;
          }
          
          .podcast-card-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #757575;
            margin-bottom: 10px;
          }
          
          .podcast-card-title {
            font-size: 1.05rem;
            font-weight: 600;
            margin: 0 0 5px 0;
            color: #333;
            line-height: 1.4;
          }
          
          .podcast-card-host {
            font-size: 0.85rem;
            color: #757575;
            margin-bottom: 10px;
          }
          
          .podcast-card-description {
            font-size: 0.9rem;
            color: #424242;
            line-height: 1.5;
            margin: 0 0 15px 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .podcast-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .listen-button {
            background-color: #d81b60;
            color: white;
            border: none;
            border-radius: 15px;
            padding: 5px 12px;
            font-size: 0.85rem;
            font-weight: 500;
          }
          
          .listen-button:hover {
            background-color: #c2185b;
          }
          
          .podcast-card-actions {
            display: flex;
            gap: 8px;
          }
          
          /* Videos Styles */
          .featured-video {
            display: flex;
            margin-bottom: 30px;
            gap: 25px;
          }
          
          @media (max-width: 768px) {
            .featured-video {
              flex-direction: column;
            }
          }
          
          .video-player {
            width: 60%;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
          }
          
          @media (max-width: 768px) {
            .video-player {
              width: 100%;
            }
          }
          
          .video-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .video-play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: rgba(216, 27, 96, 0.9);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
          
          .video-play-button:hover {
            background-color: rgba(216, 27, 96, 1);
          }
          
          .video-duration {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 0.85rem;
            padding: 5px 10px;
            border-radius: 10px;
          }
          
          .featured-video-info {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .video-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin: 0 0 10px 0;
            color: #333;
            line-height: 1.3;
          }
          
          .video-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            font-size: 0.9rem;
            color: #757575;
            margin-bottom: 15px;
          }
          
          .video-description {
            font-size: 0.95rem;
            color: #424242;
            line-height: 1.5;
            margin: 0 0 20px 0;
            flex: 1;
          }
          
          .video-topics {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
          }
          
          .video-actions {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .watch-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #d81b60;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 8px 18px;
            font-size: 0.95rem;
            font-weight: 500;
          }
          
          .watch-button:hover {
            background-color: #c2185b;
          }
          
          .videos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
          
          .video-card {
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .video-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .video-thumbnail {
            height: 180px;
            position: relative;
          }
          
          .video-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .play-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.2);
            color: white;
            font-size: 2rem;
            opacity: 0;
            transition: opacity 0.2s ease;
            cursor: pointer;
          }
          
          .video-thumbnail:hover .play-overlay {
            opacity: 1;
          }
          
          .video-length {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 0.8rem;
            padding: 3px 8px;
            border-radius: 10px;
          }
          
          .video-card-content {
            padding: 15px;
          }
          
          .video-card-title {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #333;
            line-height: 1.4;
          }
          
          .video-card-meta {
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-size: 0.85rem;
            color: #757575;
            margin-bottom: 10px;
          }
          
          .video-card-description {
            font-size: 0.9rem;
            color: #424242;
            line-height: 1.5;
            margin: 0 0 10px 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .video-card-topics {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            align-items: center;
          }
          
          .more-topics {
            font-size: 0.75rem;
            color: #757575;
          }
          
          /* Reports Styles */
          .reports-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
          }
          
          .report-card {
            background-color: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .report-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .report-thumbnail {
            height: 200px;
            position: relative;
          }
          
          .report-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .report-type {
            position: absolute;
            top: 15px;
            left: 15px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 0.75rem;
            padding: 5px 10px;
            border-radius: 15px;
          }
          
          .report-pages {
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            font-size: 0.75rem;
            padding: 5px 10px;
            border-radius: 15px;
          }
          
          .report-content {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .report-meta {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #757575;
            margin-bottom: 10px;
          }
          
          .report-title {
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0 0 15px 0;
            color: #333;
            line-height: 1.4;
          }
          
          .report-summary {
            font-size: 0.95rem;
            color: #424242;
            line-height: 1.5;
            margin: 0 0 15px 0;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .report-topics {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
          }
          
          .report-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .download-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #d81b60;
            color: white;
            text-decoration: none;
            border-radius: 20px;
            padding: 8px 15px;
            font-size: 0.9rem;
            font-weight: 500;
          }
          
          .download-button:hover {
            background-color: #c2185b;
          }
          
          /* Filter Dropdown Styles */
          .filter-dropdown {
            position: relative;
          }
          
          .filter-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #f5f5f5;
            border: none;
            border-radius: 20px;
            padding: 8px 15px;
            font-size: 0.85rem;
            color: #424242;
          }
          
          .filter-button:hover {
            background-color: #e0e0e0;
          }
          
          /* Responsive Adjustments */
          @media (max-width: 1200px) {
            .dashboard-container {
              flex-direction: column;
            }
            
            .sidebar {
              width: 100%;
              margin-bottom: 20px;
            }
            
            .trending-topics {
              display: none;
            }
            
            .sidebar-footer {
              flex-direction: row;
              margin-top: 10px;
            }
            
            .saved-items-button, .history-button {
              flex: 1;
            }
          }
          
          @media (max-width: 768px) {
            .dashboard-header {
              flex-direction: column;
              gap: 15px;
            }
            
            .header-center {
              width: 100%;
            }
            
            .search-box {
              width: 100%;
            }
            
            .content-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 15px;
            }
            
            .content-actions {
              width: 100%;
              justify-content: space-between;
            }
            
            .headlines-grid, 
            .analysis-grid, 
            .podcasts-grid, 
            .videos-grid, 
            .reports-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export default InformationDashboard;
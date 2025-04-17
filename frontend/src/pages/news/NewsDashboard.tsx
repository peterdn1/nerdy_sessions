import React, { useState, useMemo } from 'react';
import { 
  FaGlobeAmericas, 
  FaLandmark, 
  FaMicrochip, 
  FaChartLine, 
  FaHeartbeat, 
  FaFilm, 
  FaFutbol, 
  FaSearch, 
  FaBookmark, 
  FaRegBookmark, 
  FaEye, 
  FaRegEye, 
  FaBell, 
  FaUser, 
  FaFire, 
  FaClock, 
  FaCalendarAlt 
} from 'react-icons/fa';

// TypeScript interfaces
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  trending: boolean;
  bookmarked: boolean;
  read: boolean;
}

interface NewsCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  trendingTopics: string[];
  stats: {
    articles: number;
    trending: number;
    readTime: number;
  }
}

function NewsDashboard() {
  // State management
  const [activeCategory, setActiveCategory] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBookmarked, setShowBookmarked] = useState<boolean>(false);
  const [showUnread, setShowUnread] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // News categories
  const categories: NewsCategory[] = [
    {
      id: 'world',
      title: 'World',
      icon: <FaGlobeAmericas />,
      color: '#4dabf7',
      description: 'Global news and international events shaping our world today.',
      trendingTopics: ['Climate Summit', 'International Relations', 'Global Economy', 'Humanitarian Crises'],
      stats: {
        articles: 42,
        trending: 8,
        readTime: 6
      }
    },
    {
      id: 'politics',
      title: 'Politics',
      icon: <FaLandmark />,
      color: '#f783ac',
      description: 'Political developments, policy changes, and governance updates.',
      trendingTopics: ['Election Coverage', 'Legislative Updates', 'Political Analysis', 'Policy Debates'],
      stats: {
        articles: 38,
        trending: 12,
        readTime: 8
      }
    },
    {
      id: 'technology',
      title: 'Technology',
      icon: <FaMicrochip />,
      color: '#63e6be',
      description: 'Latest innovations, tech industry news, and digital trends.',
      trendingTopics: ['AI Advancements', 'Tech Industry Updates', 'Digital Privacy', 'New Product Launches'],
      stats: {
        articles: 45,
        trending: 18,
        readTime: 5
      }
    },
    {
      id: 'business',
      title: 'Business',
      icon: <FaChartLine />,
      color: '#74c0fc',
      description: 'Business trends, market updates, and economic developments.',
      trendingTopics: ['Market Analysis', 'Corporate News', 'Economic Forecasts', 'Startup Ecosystem'],
      stats: {
        articles: 36,
        trending: 7,
        readTime: 7
      }
    },
    {
      id: 'health',
      title: 'Health',
      icon: <FaHeartbeat />,
      color: '#a9e34b',
      description: 'Healthcare news, medical research, and wellness updates.',
      trendingTopics: ['Medical Breakthroughs', 'Public Health', 'Wellness Trends', 'Healthcare Policy'],
      stats: {
        articles: 29,
        trending: 6,
        readTime: 6
      }
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      icon: <FaFilm />,
      color: '#da77f2',
      description: 'Latest in movies, music, arts, and celebrity news.',
      trendingTopics: ['Film Releases', 'Music Industry', 'Streaming Content', 'Celebrity Updates'],
      stats: {
        articles: 52,
        trending: 14,
        readTime: 4
      }
    },
    {
      id: 'sports',
      title: 'Sports',
      icon: <FaFutbol />,
      color: '#ffa94d',
      description: 'Sports updates, game results, and athlete profiles.',
      trendingTopics: ['Game Results', 'Player Transfers', 'Tournament Coverage', 'Team Updates'],
      stats: {
        articles: 48,
        trending: 16,
        readTime: 5
      }
    }
  ];

  // Sample articles
  const articles: Article[] = [
    {
      id: '1',
      title: 'Global Climate Summit Announces Ambitious Carbon Reduction Targets',
      summary: 'World leaders agree on new targets to combat climate change at the latest global summit.',
      content: 'In a historic agreement at the Global Climate Summit, 195 countries have committed to reducing carbon emissions by 50% before 2030. The landmark decision comes after intense negotiations and represents the most ambitious climate target to date. Environmental activists have cautiously welcomed the announcement while emphasizing the need for concrete action plans and accountability measures.',
      category: 'world',
      author: 'Emma Rodriguez',
      date: 'Apr 16, 2025',
      readTime: '6 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?climate',
      trending: true,
      bookmarked: false,
      read: false
    },
    {
      id: '2',
      title: 'Tech Giant Unveils Revolutionary Quantum Computing Breakthrough',
      summary: 'A major leap forward in quantum computing promises to transform industries and solve complex problems.',
      content: 'Quantum Innovations Inc. has announced a breakthrough in quantum computing technology that could exponentially increase computing power for complex calculations. The new quantum processor, dubbed "Quantum Nexus," demonstrated the ability to maintain quantum coherence for unprecedented periods, solving problems in minutes that would take traditional supercomputers thousands of years. Experts suggest this development could accelerate advancements in drug discovery, weather prediction, and artificial intelligence.',
      category: 'technology',
      author: 'Alex Chen',
      date: 'Apr 15, 2025',
      readTime: '5 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?quantum',
      trending: true,
      bookmarked: true,
      read: false
    },
    {
      id: '3',
      title: 'Market Rally Continues as Inflation Numbers Show Positive Trend',
      summary: 'Global markets respond positively to latest economic indicators suggesting inflation is easing.',
      content: 'Stock markets worldwide experienced significant gains today as the latest inflation data showed a cooling trend for the third consecutive month. The S&P 500 climbed 2.3%, while European and Asian markets also posted strong performances. Economists attribute the positive trend to a combination of effective monetary policy, easing supply chain constraints, and stabilizing energy prices. Investors now anticipate a potential shift in central bank policies, with some analysts predicting a pause in interest rate hikes.',
      category: 'business',
      author: 'Michael Winters',
      date: 'Apr 14, 2025',
      readTime: '4 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?stocks',
      trending: false,
      bookmarked: false,
      read: true
    },
    {
      id: '4',
      title: 'Groundbreaking Medical Research Could Transform Treatment of Alzheimer\'s Disease',
      summary: 'Scientists report promising results from clinical trials of a new approach to treating Alzheimer\'s.',
      content: 'A collaborative research team from leading medical institutions has published results from a Phase II clinical trial showing significant cognitive improvements in Alzheimer\'s patients. The novel treatment combines targeted immunotherapy with neural regeneration techniques, addressing both the symptoms and underlying causes of the disease. Patients in the treatment group demonstrated a 40% reduction in cognitive decline compared to the control group. While researchers caution that larger studies are needed, the medical community is cautiously optimistic about what could be the first major breakthrough in Alzheimer\'s treatment in decades.',
      category: 'health',
      author: 'Dr. Sarah Johnson',
      date: 'Apr 16, 2025',
      readTime: '7 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?medical',
      trending: true,
      bookmarked: true,
      read: false
    },
    {
      id: '5',
      title: 'Election Results Signal Major Political Shift in European Parliament',
      summary: 'Recent elections reshape the political landscape with surprising gains for centrist coalitions.',
      content: 'The latest European Parliament elections have resulted in a significant shift in the continent\'s political landscape, with centrist coalitions gaining ground against both far-right and far-left parties. Voter turnout reached a 25-year high at 62%, reflecting increased public engagement with European governance. Political analysts attribute the results to growing concern over economic stability, climate policy, and international security. The new parliament configuration will likely affect upcoming decisions on EU expansion, climate legislation, and digital regulation.',
      category: 'politics',
      author: 'Thomas Weber',
      date: 'Apr 15, 2025',
      readTime: '6 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?election',
      trending: true,
      bookmarked: false,
      read: false
    },
    {
      id: '6',
      title: 'Streaming Platform\'s Original Series Breaks Viewership Records',
      summary: 'The latest season of a popular streaming show has become the most-watched series in platform history.',
      content: 'StreamVerse\'s flagship original series "Chrono Chronicles" has shattered all previous viewership records, with over 90 million households watching the season premiere within the first 72 hours of release. The science fiction drama, now in its third season, has become a global cultural phenomenon, spawning merchandise lines, fan conventions, and widespread social media engagement. Industry analysts note that the show\'s success represents a continuing shift in entertainment consumption patterns, with streaming platforms increasingly dominating the cultural conversation previously held by traditional television and film studios.',
      category: 'entertainment',
      author: 'Leila Washington',
      date: 'Apr 14, 2025',
      readTime: '4 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?streaming',
      trending: true,
      bookmarked: false,
      read: true
    },
    {
      id: '7',
      title: 'Underdog Team Completes Remarkable Championship Run',
      summary: 'Against all odds, an unexpected contender has claimed the championship title in a stunning upset.',
      content: 'In one of the most remarkable underdog stories in recent sports history, FC Northstar has claimed the championship title after a season that began with them as 100-1 outsiders. The team, which narrowly avoided relegation last season, completed their improbable run with a 2-1 victory in the final against perennial powerhouse Athletic United. Coach Maria Sanchez, who took over management just 18 months ago, has been widely praised for transforming the team\'s playing style and culture. "This is a victory for everyone who\'s ever been told they don\'t belong at the top level," Sanchez said in the post-match press conference that has already become widely shared across social media.',
      category: 'sports',
      author: 'James Robertson',
      date: 'Apr 13, 2025',
      readTime: '5 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?soccer',
      trending: false,
      bookmarked: true,
      read: false
    },
    {
      id: '8',
      title: 'New Archaeological Discovery Challenges Understanding of Ancient Civilization',
      summary: 'Researchers uncover evidence that may rewrite the history of a sophisticated early society.',
      content: 'An international archaeological team has unearthed a previously unknown urban complex dating back approximately 5,000 years, challenging existing timelines for advanced civilization development. The site, located in a remote region previously thought to be uninhabited during that period, contains evidence of sophisticated urban planning, advanced metallurgy, and potentially an early form of writing. "This discovery fundamentally alters our understanding of how and where complex societies emerged," said lead archaeologist Dr. Amara Nkosi. The team\'s findings suggest that technological and social developments may have occurred independently in multiple regions rather than spreading from a single origin point as previously believed.',
      category: 'world',
      author: 'Dr. Marcus Lee',
      date: 'Apr 12, 2025',
      readTime: '8 min',
      imageUrl: 'https://source.unsplash.com/random/800x500/?archaeology',
      trending: false,
      bookmarked: false,
      read: false
    }
  ];

  // Filter articles based on active category, search query, and filters
  const filteredArticles = useMemo(() => {
    let results = [...articles];
    
    // Filter by category
    if (activeCategory !== 'featured') {
      results = results.filter(article => article.category === activeCategory);
    } else {
      // For featured, prioritize trending articles
      results.sort((a, b) => {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return 0;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.summary.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
      );
    }
    
    // Filter bookmarked articles
    if (showBookmarked) {
      results = results.filter(article => article.bookmarked);
    }
    
    // Filter unread articles
    if (showUnread) {
      results = results.filter(article => !article.read);
    }
    
    return results;
  }, [activeCategory, searchQuery, showBookmarked, showUnread, articles]);

  // Handle category selection
  const handleCategorySelect = (categoryId: string): void => {
    setActiveCategory(categoryId);
    setSelectedArticle(null);
  };

  // Handle article selection
  const handleArticleSelect = (article: Article): void => {
    setSelectedArticle(article);
  };

  // Toggle bookmark status
  const toggleBookmark = (e: React.MouseEvent, articleId: string): void => {
    e.stopPropagation();
    // In a real app, this would update state or call an API
    console.log(`Toggled bookmark for article ${articleId}`);
  };

  // Toggle read status
  const toggleRead = (e: React.MouseEvent, articleId: string): void => {
    e.stopPropagation();
    // In a real app, this would update state or call an API
    console.log(`Toggled read status for article ${articleId}`);
  };

  // Get active category
  const getActiveCategory = (): NewsCategory | undefined => {
    if (activeCategory === 'featured') {
      // Create a virtual category for featured content
      return {
        id: 'featured',
        title: 'Featured Stories',
        icon: <FaFire />,
        color: '#ff6b6b',
        description: 'Our top picks and trending stories from across all categories.',
        trendingTopics: [
          'Climate Action',
          'Technology Innovation',
          'Global Politics',
          'Healthcare Advancements'
        ],
        stats: {
          articles: articles.length,
          trending: articles.filter(a => a.trending).length,
          readTime: Math.round(articles.reduce((sum, a) => sum + parseInt(a.readTime), 0) / articles.length)
        }
      };
    }
    return categories.find(category => category.id === activeCategory);
  };

  // Get stats for visualization
  const getCurrentCategoryStats = () => {
    const category = getActiveCategory();
    return category ? category.stats : { articles: 0, trending: 0, readTime: 0 };
  };

  return (
    <>
      <div className="news-dashboard">
        {/* Header Section */}
        <header className="header">
          <div className="title-section">
            <h1 className="logo">NewsInsight</h1>
            <p className="subtitle">Your personalized window to what matters in the world</p>
          </div>
          
          <div className="nav-and-search">
            <div className="search-bar">
              <span className="search-icon"><FaSearch /></span>
              <input 
                className="search-input"
                type="text" 
                placeholder="Search for news..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="nav-actions">
              <button
                className={`filter-button ${showBookmarked ? 'active' : ''}`}
                onClick={() => setShowBookmarked(!showBookmarked)}
              >
                {showBookmarked ? <FaBookmark /> : <FaRegBookmark />} Bookmarked
              </button>
              <button
                className={`filter-button ${showUnread ? 'active' : ''}`}
                onClick={() => setShowUnread(!showUnread)}
              >
                {showUnread ? <FaEye /> : <FaRegEye />} Unread
              </button>
              <button className="nav-button">
                <FaBell />
                <span className="notification-badge">3</span>
              </button>
              <button className="user-button">
                <FaUser />
              </button>
            </div>
          </div>

          <nav className="category-nav">
            <button
              className={`category-button ${activeCategory === 'featured' ? 'active' : ''}`}
              style={activeCategory === 'featured' ? { backgroundColor: '#ff6b6b', color: 'white', borderColor: '#ff6b6b' } : {}}
              onClick={() => handleCategorySelect('featured')}
            >
              <FaFire /> Featured
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                style={activeCategory === category.id ? { backgroundColor: category.color, color: 'white', borderColor: category.color } : {}}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.icon} {category.title}
              </button>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {selectedArticle ? (
            <div className="article-detail">
              <button className="back-button" onClick={() => setSelectedArticle(null)}>← Back to list</button>
              <div className="article-detail-header">
                <span className="category-tag" style={{ backgroundColor: categories.find(c => c.id === selectedArticle.category)?.color }}>
                  {categories.find(c => c.id === selectedArticle.category)?.title}
                </span>
                <h1 className="article-detail-title">{selectedArticle.title}</h1>
                <div className="article-meta">
                  <div className="author-date">By {selectedArticle.author} • {selectedArticle.date}</div>
                  <div className="read-time"><FaClock /> {selectedArticle.readTime} read</div>
                </div>
              </div>
              <img className="article-image" src={selectedArticle.imageUrl} alt={selectedArticle.title} />
              <div className="article-content">
                <p>{selectedArticle.content}</p>
              </div>
              <div className="article-actions">
                <button
                  className={`action-button ${selectedArticle.bookmarked ? 'active' : ''}`}
                  style={selectedArticle.bookmarked ? { backgroundColor: categories.find(c => c.id === selectedArticle.category)?.color, color: 'white' } : { color: categories.find(c => c.id === selectedArticle.category)?.color, borderColor: categories.find(c => c.id === selectedArticle.category)?.color }}
                  onClick={(e) => toggleBookmark(e, selectedArticle.id)}
                >
                  {selectedArticle.bookmarked ? <FaBookmark /> : <FaRegBookmark />} 
                  {selectedArticle.bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button
                  className={`action-button ${selectedArticle.read ? 'active' : ''}`}
                  style={selectedArticle.read ? { backgroundColor: categories.find(c => c.id === selectedArticle.category)?.color, color: 'white' } : { color: categories.find(c => c.id === selectedArticle.category)?.color, borderColor: categories.find(c => c.id === selectedArticle.category)?.color }}
                  onClick={(e) => toggleRead(e, selectedArticle.id)}
                >
                  {selectedArticle.read ? <FaEye /> : <FaRegEye />} 
                  {selectedArticle.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Category Header */}
              <div className="category-header">
                <div className="category-info">
                  <div className="category-icon" style={{ color: getActiveCategory()?.color }}>
                    {getActiveCategory()?.icon}
                  </div>
                  <div>
                    <h2 className="category-title">{getActiveCategory()?.title}</h2>
                    <p className="category-description">{getActiveCategory()?.description}</p>
                  </div>
                </div>
                <div className="category-stats">
                  <div className="stat-item">
                    <div className="stat-label">Articles</div>
                    <div className="stat-value">{getCurrentCategoryStats().articles}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Trending</div>
                    <div className="stat-value">{getCurrentCategoryStats().trending}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Avg. Read Time</div>
                    <div className="stat-value">{getCurrentCategoryStats().readTime} min</div>
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="articles-grid">
                  {filteredArticles.map(article => (
                    <div 
                      key={article.id}
                      className={`article-card ${article.trending ? 'featured' : ''} ${article.read ? 'read' : ''}`}
                      style={article.trending ? { borderTop: `3px solid ${categories.find(c => c.id === article.category)?.color}` } : {}}
                      onClick={() => handleArticleSelect(article)}
                    >
                      <div className="article-image-container">
                        <img className="article-card-image" src={article.imageUrl} alt={article.title} />
                        <div className="article-image-overlay">
                          <span className="category-label" style={{ backgroundColor: categories.find(c => c.id === article.category)?.color }}>
                            {categories.find(c => c.id === article.category)?.title}
                          </span>
                          {article.trending && <span className="trending-tag"><FaFire /> Trending</span>}
                        </div>
                      </div>
                      <div className="article-card-content">
                        <h3 className="article-title">{article.title}</h3>
                        <p className="article-summary">{article.summary}</p>
                        <div className="article-card-footer">
                          <div className="article-date">
                            <FaCalendarAlt /> {article.date}
                          </div>
                          <div className="article-actions">
                            <button 
                              className={`action-icon-button ${article.bookmarked ? 'active' : ''}`}
                              style={article.bookmarked ? { color: categories.find(c => c.id === article.category)?.color } : {}}
                              onClick={(e) => toggleBookmark(e, article.id)}
                            >
                              {article.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                            </button>
                            <button 
                              className={`action-icon-button ${article.read ? 'active' : ''}`}
                              style={article.read ? { color: categories.find(c => c.id === article.category)?.color } : {}}
                              onClick={(e) => toggleRead(e, article.id)}
                            >
                              {article.read ? <FaEye /> : <FaRegEye />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <h3>No articles found</h3>
                  <p>Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </>
          )}

          {/* Sidebar - Trending Topics */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Trending Topics</h3>
              <div className="trending-topics-list">
                {getActiveCategory()?.trendingTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="trending-topic"
                    style={{ 
                      background: `${getActiveCategory()?.color}10`, 
                      color: getActiveCategory()?.color 
                    }}
                  >
                    <FaFire /> {topic}
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Category Insights</h3>
              <div className="insight-chart">
                <h4 className="chart-title">Article Distribution</h4>
                {categories.map(category => (
                  <div key={category.id} className="chart-item">
                    <div className="chart-label">{category.title}</div>
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar"
                        style={{ 
                          width: `${(category.stats.articles / Math.max(...categories.map(c => c.stats.articles))) * 100}%`,
                          backgroundColor: category.color 
                        }}
                      />
                    </div>
                    <div className="chart-value">{category.stats.articles}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>

        {/* Footer Section */}
        <footer className="footer">
          <p>© 2025 NewsInsight Dashboard. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </footer>
        
        <style>{`
          /* Global Styles */
          .news-dashboard {
            max-width: 1600px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            color: #333;
            background-color: #f8f9fa;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          /* Header Styles */
          .header {
            margin-bottom: 30px;
          }
          
          .title-section {
            text-align: center;
            padding: 20px 0;
          }
          
          .logo {
            font-size: 2.8rem;
            margin: 0;
            color: #2c3e50;
            font-weight: 800;
            letter-spacing: -1px;
          }
          
          .subtitle {
            font-size: 1.1rem;
            color: #7f8c8d;
            margin: 10px auto 0;
            max-width: 600px;
          }
          
          .nav-and-search {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .search-bar {
            display: flex;
            align-items: center;
            background: white;
            border-radius: 30px;
            padding: 8px 16px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #eee;
          }
          
          @media (max-width: 768px) {
            .search-bar {
              max-width: 100%;
            }
          }
          
          .search-icon {
            color: #adb5bd;
            margin-right: 10px;
          }
          
          .search-input {
            border: none;
            outline: none;
            font-size: 0.95rem;
            flex: 1;
            color: #495057;
          }
          
          .search-input::placeholder {
            color: #adb5bd;
          }
          
          .nav-actions {
            display: flex;
            gap: 10px;
            align-items: center;
          }
          
          .filter-button {
            display: flex;
            align-items: center;
            gap: 6px;
            background: white;
            color: #495057;
            border: 1px solid #e9ecef;
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .filter-button:hover {
            background: #f1f3f5;
            border-color: #dee2e6;
          }
          
          .filter-button.active {
            background: #4dabf7;
            color: white;
            border-color: #4dabf7;
          }
          
                    .filter-button.active:hover {
            background: #339af0;
            border-color: #339af0;
          }
          
          @media (max-width: 768px) {
            .filter-button {
              padding: 8px 12px;
              font-size: 0.8rem;
            }
          }
          
          .nav-button {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            color: #495057;
            transition: all 0.2s ease;
          }
          
          .nav-button:hover {
            background: #f1f3f5;
            border-color: #dee2e6;
          }
          
          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff6b6b;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          
          .user-button {
            background: #f1f3f5;
            border: 1px solid #e9ecef;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #495057;
            transition: all 0.2s ease;
          }
          
          .user-button:hover {
            background: #e9ecef;
          }
          
          .category-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
          }
          
          .category-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            color: #495057;
            border: 1px solid #e9ecef;
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .category-button:hover {
            background: #f1f3f5;
            border-color: #dee2e6;
          }
          
          .category-button.active {
            color: white;
          }
          
          @media (max-width: 768px) {
            .category-button {
              padding: 8px 12px;
              font-size: 0.8rem;
            }
          }
          
          /* Main Content Styles */
          .main-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          @media (min-width: 1024px) {
            .main-content {
              grid-template-columns: 3fr 1fr;
              grid-template-areas: "content sidebar";
            }
            
            .article-detail {
              grid-column: 1 / -1;
            }
          }
          
          .category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .category-info {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .category-icon {
            font-size: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .category-title {
            margin: 0 0 5px 0;
            font-size: 1.4rem;
            color: #2c3e50;
          }
          
          .category-description {
            margin: 0;
            font-size: 0.95rem;
            color: #7f8c8d;
            max-width: 500px;
          }
          
          .category-stats {
            display: flex;
            gap: 20px;
          }
          
          .stat-item {
            text-align: center;
          }
          
          .stat-label {
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-bottom: 5px;
          }
          
          .stat-value {
            font-size: 1.3rem;
            font-weight: bold;
            color: #2c3e50;
          }
          
          .articles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
          
          .article-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          .article-card.read {
            opacity: 0.8;
          }
          
          .article-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          }
          
          .article-image-container {
            position: relative;
            height: 180px;
            overflow: hidden;
          }
          
          .article-card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          
          .article-card:hover .article-card-image {
            transform: scale(1.05);
          }
          
          .article-image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          
          .category-label {
            color: white;
            font-size: 0.75rem;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 500;
          }
          
          .trending-tag {
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(255, 107, 107, 0.9);
            color: white;
            font-size: 0.75rem;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 500;
          }
          
          .article-card-content {
            padding: 20px;
          }
          
          .article-title {
            margin: 0 0 10px 0;
            font-size: 1.1rem;
            line-height: 1.4;
            color: #2c3e50;
            min-height: 3em;
          }
          
          .article-summary {
            margin: 0 0 15px 0;
            font-size: 0.9rem;
            color: #7f8c8d;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .article-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #f1f3f5;
          }
          
          .article-date {
            font-size: 0.8rem;
            color: #adb5bd;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .article-actions {
            display: flex;
            gap: 8px;
          }
          
          .action-icon-button {
            background: transparent;
            border: none;
            color: #adb5bd;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            font-size: 1rem;
            transition: all 0.2s ease;
          }
          
          .action-icon-button:hover {
            color: #3498db;
          }
          
          .action-icon-button.active {
            color: #3498db;
          }
          
          .no-results {
            text-align: center;
            padding: 50px;
            color: #7f8c8d;
          }
          
          .no-results h3 {
            margin: 0 0 10px 0;
            color: #2c3e50;
          }
          
          .no-results p {
            margin: 0;
          }
          
          /* Article Detail Styles */
          .article-detail {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          .back-button {
            background: transparent;
            border: none;
            color: #3498db;
            cursor: pointer;
            padding: 0;
            font-size: 0.95rem;
            margin-bottom: 20px;
            display: inline-block;
            transition: all 0.2s ease;
          }
          
          .back-button:hover {
            color: #2980b9;
            text-decoration: underline;
          }
          
          .article-detail-header {
            margin-bottom: 20px;
          }
          
          .category-tag {
            display: inline-block;
            color: white;
            font-size: 0.8rem;
            padding: 4px 10px;
            border-radius: 4px;
            margin-bottom: 15px;
          }
          
          .article-detail-title {
            margin: 0 0 15px 0;
            font-size: 2.2rem;
            line-height: 1.3;
            color: #2c3e50;
          }
          
          .article-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .author-date {
            font-size: 0.95rem;
            color: #7f8c8d;
          }
          
          .read-time {
            font-size: 0.9rem;
            color: #7f8c8d;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .article-image {
            width: 100%;
            max-height: 500px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 25px;
          }
          
          .article-content {
            font-size: 1.05rem;
            line-height: 1.7;
            color: #4a4a4a;
          }
          
          .article-content p {
            margin: 0 0 20px 0;
          }
          
          .article-content p:last-child {
            margin-bottom: 0;
          }
          
          .article-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
          }
          
          .action-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            color: #3498db;
            border: 1px solid #3498db;
            border-radius: 5px;
            padding: 8px 16px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .action-button:hover {
            background: #f1f9fe;
          }
          
          .action-button.active {
            background: #3498db;
            color: white;
          }
          
          .action-button.active:hover {
            background: #2980b9;
          }
          
          /* Sidebar Styles */
          .sidebar {
            grid-area: sidebar;
          }
          
          @media (max-width: 1023px) {
            .sidebar {
              grid-column: 1 / -1;
            }
          }
          
          .sidebar-section {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          .sidebar-title {
            margin: 0 0 15px 0;
            font-size: 1.2rem;
            color: #2c3e50;
            padding-bottom: 10px;
            border-bottom: 1px solid #f1f3f5;
          }
          
          .trending-topics-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .trending-topic {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.95rem;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .trending-topic:hover {
            opacity: 0.9;
          }
          
          .insight-chart {
            margin-top: 15px;
          }
          
          .chart-title {
            margin: 0 0 15px 0;
            font-size: 1rem;
            color: #7f8c8d;
          }
          
          .chart-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }
          
          .chart-label {
            width: 100px;
            font-size: 0.85rem;
            color: #495057;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .chart-bar-container {
            flex: 1;
            height: 8px;
            background: #f1f3f5;
            border-radius: 4px;
            overflow: hidden;
          }
          
          .chart-bar {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease-in-out;
          }
          
          .chart-value {
            width: 30px;
            font-size: 0.85rem;
            font-weight: 500;
            color: #495057;
            text-align: right;
          }
          
          /* Footer Styles */
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 50px;
            padding: 20px 0;
            border-top: 1px solid #e9ecef;
            color: #adb5bd;
            font-size: 0.9rem;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .footer p {
            margin: 0;
          }
          
          .footer-links {
            display: flex;
            gap: 20px;
          }
          
          .footer-link {
            color: #adb5bd;
            text-decoration: none;
            transition: all 0.2s ease;
          }
          
          .footer-link:hover {
            color: #495057;
            text-decoration: underline;
          }
        `}</style>
      </div>
    </>
  );
}

export default NewsDashboard;
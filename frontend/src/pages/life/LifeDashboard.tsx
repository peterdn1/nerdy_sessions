import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

type TopicKey = 'health' | 'safety' | 'privacy' | 'transport' | 'community' | 'home';

const topicData: Record<TopicKey, {
  title: string;
  opportunities: string[];
  risks: string[];
}> = {
  health: {
    title: "Health & AI",
    opportunities: [
      "Early disease detection through AI analysis of medical data and symptoms",
      "Personalized treatment plans based on individual genetic profiles and health history",
      "24/7 health monitoring through AI-powered wearables and home devices",
      "Reduced healthcare costs through AI-optimized resource allocation",
      "Improved healthcare access for underserved communities through telehealth"
    ],
    risks: [
      "Potential misdiagnosis due to incomplete training data or algorithm limitations",
      "Privacy concerns with sensitive health information collection and analysis",
      "Digital divide excluding vulnerable populations from AI health benefits",
      "Over-reliance on AI systems potentially replacing human medical expertise",
      "Algorithm bias affecting quality of care for certain demographic groups"
    ]
  },
  safety: {
    title: "Personal Safety & AI",
    opportunities: [
      "Real-time threat detection systems providing advance warning of dangers",
      "AI-powered emergency response with faster, more efficient coordination",
      "Enhanced home security with intelligent monitoring and anomaly detection",
      "Wearable safety devices with predictive alert capabilities",
      "Improved public safety through pattern recognition in security footage"
    ],
    risks: [
      "False security alarms causing unnecessary anxiety and emergency responses",
      "Excessive surveillance leading to privacy violations and constant monitoring",
      "Safety discrimination based on algorithmic biases in threat assessment",
      "Increased vulnerability to hacking of integrated safety systems",
      "Decreased human vigilance due to over-reliance on automated safety"
    ]
  },
  privacy: {
    title: "Data Privacy & AI",
    opportunities: [
      "Advanced encryption and anonymization to better protect personal information",
      "AI-powered privacy assistants that manage consent and data sharing preferences",
      "Improved detection of unauthorized access and data breaches",
      "Transparent data usage reporting through automated monitoring",
      "Smarter data collection minimizing unnecessary personal information exposure"
    ],
    risks: [
      "Unprecedented levels of personal data collection for AI training",
      "Sophisticated data analysis making it easier to identify individuals from anonymized data",
      "Complex privacy policies that are difficult for average users to understand",
      "Cross-platform tracking creating comprehensive profiles of individual behavior",
      "Potential government and corporate surveillance using AI capabilities"
    ]
  },
  transport: {
    title: "Transportation & AI",
    opportunities: [
      "Autonomous vehicles reducing accident rates through constant vigilance",
      "Traffic flow optimization reducing congestion and commute times",
      "Reduced transportation costs through route optimization and vehicle efficiency",
      "Enhanced mobility for elderly, disabled, and non-driving populations",
      "Environmental benefits from more efficient driving patterns and resource use"
    ],
    risks: [
      "Job displacement for professional drivers and related service industries",
      "Complex ethical dilemmas in autonomous vehicle decision-making during accidents",
      "Infrastructure challenges requiring significant investment for AI transportation",
      "Cybersecurity vulnerabilities in connected vehicle networks",
      "Potential for transportation inequality based on technology access"
    ]
  },
  community: {
    title: "Community & AI",
    opportunities: [
      "Smart city infrastructure improving public service delivery and efficiency",
      "AI-facilitated community engagement through personalized local information",
      "More equitable resource allocation based on comprehensive needs analysis",
      "Improved emergency services through predictive response systems",
      "Enhanced public spaces with adaptive lighting, safety, and accessibility features"
    ],
    risks: [
      "Algorithmic bias affecting public resource distribution and services",
      "Digital divides creating two-tier communities based on technology access",
      "Reduced face-to-face interaction as services become more automated",
      "Privacy concerns with public monitoring systems in community spaces",
      "Over-optimization potentially removing valuable serendipity and diversity"
    ]
  },
  home: {
    title: "Smart Home & AI",
    opportunities: [
      "Energy optimization reducing utility costs and environmental impact",
      "Personalized home environments adapting to individual preferences and needs",
      "Enhanced security through intelligent monitoring and threat detection",
      "Time savings through automation of routine home management tasks",
      "Improved accessibility for elderly and disabled residents through voice control"
    ],
    risks: [
      "Home privacy erosion with always-on listening and monitoring devices",
      "Increased cybersecurity vulnerabilities through connected home systems",
      "Technology dependency reducing resilience during power outages or outages",
      "Cost barriers potentially creating smart home inequality",
      "Technical complexity creating frustration and potential abandonment of systems"
    ]
  }
};

const topicKeys: { key: TopicKey; label: string; icon: string; cardClass: string; iconClass: string }[] = [
  { key: 'health', label: 'Health', icon: 'fa-heartbeat', cardClass: 'health-card', iconClass: 'health-icon' },
  { key: 'safety', label: 'Personal Safety', icon: 'fa-shield-alt', cardClass: 'safety-card', iconClass: 'safety-icon' },
  { key: 'privacy', label: 'Data Privacy', icon: 'fa-user-shield', cardClass: 'privacy-card', iconClass: 'privacy-icon' },
  { key: 'transport', label: 'Transportation', icon: 'fa-car', cardClass: 'transport-card', iconClass: 'transport-icon' },
  { key: 'community', label: 'Community', icon: 'fa-users', cardClass: 'community-card', iconClass: 'community-icon' },
  { key: 'home', label: 'Smart Home', icon: 'fa-home', cardClass: 'home-card', iconClass: 'home-icon' }
];

function LifeDashboard() {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const [highlight, setHighlight] = useState<'opportunities' | 'risks' | null>(null);
  const adoptionChartRef = useRef<HTMLCanvasElement | null>(null);
  const perceptionChartRef = useRef<HTMLCanvasElement | null>(null);
  const adoptionChartInstance = useRef<any>(null);
  const perceptionChartInstance = useRef<any>(null);

  useEffect(() => {
    // Adoption Chart
    if (adoptionChartRef.current) {
      if (adoptionChartInstance.current) adoptionChartInstance.current.destroy();
      adoptionChartInstance.current = new Chart(adoptionChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Healthcare', 'Safety', 'Privacy', 'Transportation', 'Community', 'Smart Home'],
          datasets: [{
            label: 'Current Adoption (%)',
            data: [48, 35, 42, 32, 28, 55],
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, max: 100 } }
        }
      });
    }
    // Perception Chart
    if (perceptionChartRef.current) {
      if (perceptionChartInstance.current) perceptionChartInstance.current.destroy();
      perceptionChartInstance.current = new Chart(perceptionChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Positive', 'Neutral', 'Negative'],
          datasets: [{
            data: [54, 28, 18],
            backgroundColor: [
              'rgba(16, 185, 129, 0.7)',
              'rgba(99, 102, 241, 0.7)',
              'rgba(239, 68, 68, 0.7)'
            ],
            borderColor: [
              'rgba(16, 185, 129, 1)',
              'rgba(99, 102, 241, 1)',
              'rgba(239, 68, 68, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
    // Cleanup
    return () => {
      if (adoptionChartInstance.current) adoptionChartInstance.current.destroy();
      if (perceptionChartInstance.current) perceptionChartInstance.current.destroy();
    };
  }, []);

  const handleShowDetails = (topic: TopicKey, section: 'opportunities' | 'risks') => {
    setSelectedTopic(topic);
    setHighlight(section);
    setTimeout(() => {
      const el = document.getElementById('visualization-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="w-full bg-white py-12 mb-8 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            Life with AI: Preparing for Tomorrow
          </h1>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto mb-8 font-medium leading-snug">
            Exploring how AI will shape daily life—<br className="hidden sm:inline" />
            understand the opportunities and navigate the risks.
          </p>
          {/* Navigation Menu */}
          <nav className="flex flex-wrap justify-center gap-4">
            {topicKeys.map(({ key, label }) => (
              <span
                key={key}
                className="inline-block mb-2"
              >
                <a
                  href={`#${key}`}
                  className="px-7 py-3 rounded-full text-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow-sm transition-all"
                  style={{ minWidth: 140, display: 'inline-block', textAlign: 'center' }}
                >
                  {label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-2 sm:px-4 md:px-8 py-8">
        {/* Topic Cards Section */}
        <section className="mb-16">
          <h2 className="sr-only">AI Impact Areas</h2>
          <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 3 } }}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              sx={{ width: '100%', margin: 0 }}
            >
              {topicKeys.map(({ key, label, icon, cardClass, iconClass }) => (
                <Grid item xs={12} sm={6} md={2} key={key} sx={{ display: 'flex' }}>
                  <div
                    id={key}
                    className={`bg-white p-6 flex flex-col rounded-2xl shadow-md border-t-4 w-full h-full ${
                      key === 'health' ? 'border-blue-400' :
                      key === 'safety' ? 'border-cyan-400' :
                      key === 'privacy' ? 'border-gray-400' :
                      key === 'transport' ? 'border-green-400' :
                      key === 'community' ? 'border-pink-400' :
                      key === 'home' ? 'border-purple-400' : ''
                    }`}
                    style={{
                      aspectRatio: '1 / 1',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                      minWidth: 0,
                      minHeight: 0,
                      height: '100%',
                    }}
                  >
                    <div>
                      <div className="flex items-center mb-4">
                        <div
                          className={`flex items-center justify-center mr-4`}
                          style={{
                            background:
                              key === 'health' ? '#e0edff' :
                              key === 'safety' ? '#e0f7fa' :
                              key === 'privacy' ? '#f3f4f6' :
                              key === 'transport' ? '#e6f9f0' :
                              key === 'community' ? '#fce7f3' :
                              key === 'home' ? '#ede9fe' : '#f3f4f6',
                            color:
                              key === 'health' ? '#3b82f6' :
                              key === 'safety' ? '#0ea5e9' :
                              key === 'privacy' ? '#6b7280' :
                              key === 'transport' ? '#10b981' :
                              key === 'community' ? '#ec4899' :
                              key === 'home' ? '#8b5cf6' : '#6b7280',
                            borderRadius: '50%',
                            width: 48,
                            height: 48,
                          }}
                        >
                          <i className={`fas ${icon} text-2xl`}></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{label}</h3>
                      </div>
                      <p className="text-gray-600 mb-8 text-left text-base leading-relaxed">
                        {key === 'health' && "AI is transforming healthcare with personalized treatments, early disease detection, and virtual health assistants to monitor your well-being 24/7."}
                        {key === 'safety' && "AI safety systems can monitor for potential hazards, provide early warnings, and enhance physical security through advanced threat detection."}
                        {key === 'privacy' && "AI systems interact with your personal data daily, from content recommendations to monitoring your digital footprint across services."}
                        {key === 'transport' && "Autonomous vehicles and AI-optimized traffic systems are revolutionizing how we travel, commute, and transport goods in our daily lives."}
                        {key === 'community' && "AI is reshaping social connections, public spaces, and community services through smart city infrastructure and social recommendation systems."}
                        {key === 'home' && "AI-powered homes adapt to your preferences, manage energy usage, and automate daily tasks from security to entertainment and climate control."}
                      </p>
                    </div>
                    <div className="flex space-x-3 mt-auto">
                      <button
                        className="px-6 py-2 rounded-full text-base font-semibold inline-block"
                        style={{
                          background: '#ecfdf5',
                          color: '#059669',
                          border: 'none',
                          boxShadow: 'none',
                          minWidth: 150,
                        }}
                        onClick={() => handleShowDetails(key, 'opportunities')}
                      >
                        Opportunities
                      </button>
                      <button
                        className="px-6 py-2 rounded-full text-base font-semibold inline-block"
                        style={{
                          background: '#fef2f2',
                          color: '#ef4444',
                          border: 'none',
                          boxShadow: 'none',
                          minWidth: 150,
                        }}
                        onClick={() => handleShowDetails(key, 'risks')}
                      >
                        Risks
                      </button>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </section>

        {/* Interactive Visualizations Section */}
        <section id="visualization-section" className="mb-16 bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Impact Insights</h2>
          <p id="visualization-description" className="text-gray-600 mb-8 text-center">
            Click on any topic card above to explore the specific opportunities and risks of AI in that area.
          </p>
          {/* Topic Details Section */}
          {selectedTopic && (
            <div className="mb-10 animate-fadeIn">
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                  {selectedTopic && topicData[selectedTopic].title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Opportunities Column */}
                  <div className={`bg-white p-6 rounded-lg shadow-sm highlight-container ${highlight === 'opportunities' ? 'highlight-opportunities' : ''}`}>
                    <h4 className="font-semibold text-lg mb-4 text-green-600 flex items-center">
                      <i className="fas fa-lightbulb mr-2"></i> Opportunities
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {selectedTopic && topicData[selectedTopic].opportunities.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {/* Risks Column */}
                  <div className={`bg-white p-6 rounded-lg shadow-sm highlight-container ${highlight === 'risks' ? 'highlight-risks' : ''}`}>
                    <h4 className="font-semibold text-lg mb-4 text-red-600 flex items-center">
                      <i className="fas fa-exclamation-triangle mr-2"></i> Risks
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {selectedTopic && topicData[selectedTopic].risks.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">AI Adoption Projections by Sector</h3>
              <div className="chart-container" style={{ position: 'relative', height: 300, width: '100%' }}>
                <canvas ref={adoptionChartRef}></canvas>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Public Perception of AI Impact</h3>
              <div className="chart-container" style={{ position: 'relative', height: 300, width: '100%' }}>
                <canvas ref={perceptionChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Prepare Yourself</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Take the next step to understand and adapt to the changing landscape of AI in daily life. 
            Explore in-depth resources or get personalized recommendations based on your specific needs and concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="btn-primary px-6 py-3 text-white font-medium rounded-lg shadow-sm">
              Explore Detailed Impacts
            </a>
            <a href="#" className="btn-secondary px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-300">
              Get Personalized Recommendations
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Life with AI Initiative. All information is provided for educational purposes.</p>
        </div>
      </footer>

      {/* Custom styles for highlight and animation */}
      <style>{`
        .card { transition: all 0.3s ease; border-radius: 12px; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
        .btn-primary { transition: all 0.3s ease; background-color: #6366f1; }
        .btn-primary:hover { background-color: #4f46e5; transform: translateY(-2px); }
        .btn-secondary { transition: all 0.3s ease; }
        .btn-secondary:hover { transform: translateY(-2px); }
        .opportunity-btn { background-color: #ecfdf5; color: #059669; }
        .opportunity-btn:hover { background-color: #d1fae5; }
        .risk-btn { background-color: #fef2f2; color: #ef4444; }
        .risk-btn:hover { background-color: #fee2e2; }
        .health-icon { background-color: #dbeafe; color: #3b82f6; }
        .safety-icon { background-color: #e0f2fe; color: #0ea5e9; }
        .privacy-icon { background-color: #f3f4f6; color: #6b7280; }
        .transport-icon { background-color: #d1fae5; color: #10b981; }
        .community-icon { background-color: #fce7f3; color: #ec4899; }
        .home-icon { background-color: #ede9fe; color: #8b5cf6; }
        .health-card { border-top: 4px solid #3b82f6; }
        .safety-card { border-top: 4px solid #0ea5e9; }
        .privacy-card { border-top: 4px solid #6b7280; }
        .transport-card { border-top: 4px solid #10b981; }
        .community-card { border-top: 4px solid #ec4899; }
        .home-card { border-top: 4px solid #8b5cf6; }
        .highlight-container { transition: all 0.3s ease; }
        .highlight-opportunities { box-shadow: 0 0 0 2px rgba(16,185,129,0.3); }
        .highlight-risks { box-shadow: 0 0 0 2px rgba(239,68,68,0.3); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease forwards; }
      `}</style>
    </div>
  );
}

export default LifeDashboard;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHeartbeat, FaShieldAlt, FaLock, FaCar, FaCity, FaHome, FaChartLine, FaChevronRight } from 'react-icons/fa';

// TypeScript interfaces
interface TopicStat {
  adoption: number;
  impact: number;
  concern: number;
}

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  opportunities: string[];
  risks: string[];
  stats: TopicStat;
}

interface InfoTabProps {
  active: boolean;
  color?: string;
}

interface CardProps {
  active?: boolean;
  accentColor?: string;
}

interface NavItemProps {
  active?: boolean;
  color?: string;
}

interface BarProps {
  height: string;
  color?: string;
}

interface InfoHeaderProps {
  color?: string;
}

interface CTAButtonProps {
  primary?: boolean;
}

// Main component
const LifeWithAIDashboard: React.FC = () => {
  // State for active card and info type
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [infoType, setInfoType] = useState<'opportunities' | 'risks'>('opportunities');
  const [chartData, setChartData] = useState<string>('overall');

  // Topic data
  const topics: Topic[] = [
    {
      id: 'health',
      title: 'Health',
      icon: <FaHeartbeat />,
      color: '#4dabf7',
      description: 'AI is transforming healthcare through personalized medicine, early disease detection, and remote monitoring systems.',
      opportunities: [
        'Personalized treatment plans based on individual health data',
        'AI-powered early detection of diseases through pattern recognition',
        'Remote patient monitoring reducing hospital visits',
        'Virtual health assistants providing 24/7 care guidance'
      ],
      risks: [
        'Privacy concerns with sensitive medical data collection',
        'Potential for diagnostic errors if AI systems are flawed',
        'Digital divide limiting access to AI health benefits',
        'Overreliance on technology rather than human medical expertise'
      ],
      stats: {
        adoption: 68,
        impact: 75,
        concern: 62
      }
    },
    {
      id: 'safety',
      title: 'Personal Safety',
      icon: <FaShieldAlt />,
      color: '#f783ac',
      description: 'AI-powered systems are enhancing personal safety through threat detection, emergency response, and predictive security.',
      opportunities: [
        'Enhanced threat detection in public and private spaces',
        'Faster emergency response through automated systems',
        'Predictive security identifying potential threats before they occur',
        'Personalized safety recommendations based on individual patterns'
      ],
      risks: [
        'Over-reliance on technology potentially creating new vulnerabilities',
        'False alarms leading to unnecessary anxiety or responses',
        'Privacy concerns with surveillance technologies',
        'Potential for security systems to be hacked or compromised'
      ],
      stats: {
        adoption: 55,
        impact: 68,
        concern: 70
      }
    },
    {
      id: 'privacy',
      title: 'Data Privacy',
      icon: <FaLock />,
      color: '#74c0fc',
      description: 'AI is both challenging and enhancing data privacy through advanced security systems, while raising concerns about data collection.',
      opportunities: [
        'Advanced security protocols protecting personal information',
        'Personalized privacy settings based on individual preferences',
        'Enhanced control over personal data sharing and usage',
        'AI systems detecting and preventing privacy breaches'
      ],
      risks: [
        'Extensive data collection without transparent consent',
        'Algorithmic bias affecting privacy protection equality',
        'Potential for unauthorized access to sensitive information',
        'Difficulty in fully understanding complex AI privacy policies'
      ],
      stats: {
        adoption: 45,
        impact: 72,
        concern: 85
      }
    },
    {
      id: 'transportation',
      title: 'Transportation',
      icon: <FaCar />,
      color: '#63e6be',
      description: 'Autonomous vehicles and smart traffic systems are revolutionizing how we move, offering efficiency and safety benefits.',
      opportunities: [
        'Autonomous vehicles reducing accidents and improving safety',
        'Smart traffic management reducing congestion and travel times',
        'Environmental benefits through optimized routes and reduced emissions',
        'Enhanced mobility for elderly and disabled populations'
      ],
      risks: [
        'Job displacement for professional drivers',
        'Technical failures potentially causing accidents',
        'Cybersecurity vulnerabilities in connected transportation',
        'Ethical dilemmas in autonomous vehicle decision-making'
      ],
      stats: {
        adoption: 42,
        impact: 78,
        concern: 65
      }
    },
    {
      id: 'community',
      title: 'Community',
      icon: <FaCity />,
      color: '#a9e34b',
      description: 'Smart cities and AI-driven community planning are creating more efficient, sustainable, and connected urban environments.',
      opportunities: [
        'Smart city infrastructure optimizing resource usage',
        'Improved community services through data-driven planning',
        'Enhanced civic engagement through digital platforms',
        'Sustainable development through AI-optimized resource allocation'
      ],
      risks: [
        'Digital divide potentially excluding vulnerable populations',
        'Privacy concerns with public surveillance systems',
        'Loss of human connection in highly automated environments',
        'Potential for algorithmic bias in community resource allocation'
      ],
      stats: {
        adoption: 38,
        impact: 65,
        concern: 58
      }
    },
    {
      id: 'home',
      title: 'Smart Home',
      icon: <FaHome />,
      color: '#ffa94d',
      description: 'AI-powered homes are increasing convenience, energy efficiency, and security while raising questions about privacy and dependency.',
      opportunities: [
        'Automated home management increasing convenience and comfort',
        'Energy efficiency through smart monitoring and optimization',
        'Enhanced home security through AI surveillance and pattern recognition',
        'Personalized environments adapting to individual preferences'
      ],
      risks: [
        'Privacy intrusions through always-on listening devices',
        'Security vulnerabilities potentially allowing unauthorized access',
        'Dependency on technology for basic home functions',
        'Complexity issues creating frustration with smart systems'
      ],
      stats: {
        adoption: 62,
        impact: 58,
        concern: 72
      }
    }
  ];

  // Handle card click
  const handleCardClick = (id: string): void => {
    setActiveCard(id);
    setChartData(id);
  };

  // Handle info type selection
  const handleInfoTypeClick = (type: 'opportunities' | 'risks'): void => {
    setInfoType(type);
  };

  // Reset to overall view
  const handleResetView = (): void => {
    setActiveCard(null);
    setChartData('overall');
  };

  // Get overall stats (averaged)
  const getOverallStats = (): TopicStat => {
    const adoption = topics.reduce((sum, topic) => sum + topic.stats.adoption, 0) / topics.length;
    const impact = topics.reduce((sum, topic) => sum + topic.stats.impact, 0) / topics.length;
    const concern = topics.reduce((sum, topic) => sum + topic.stats.concern, 0) / topics.length;
    return { adoption, impact, concern };
  };

  // Get current stats to display
  const getCurrentStats = (): TopicStat => {
    if (chartData === 'overall') {
      return getOverallStats();
    }
    const currentTopic = topics.find(topic => topic.id === chartData);
    return currentTopic ? currentTopic.stats : getOverallStats();
  };

  // Effect for animations when chart data changes
  useEffect(() => {
    // Animation code would go here in a production environment
  }, [chartData]);

  // Get active topic details
  const getActiveTopic = (): Topic | undefined => {
    return topics.find(topic => topic.id === activeCard);
  };

  return (
    <DashboardContainer>
      {/* Header Section */}
      <Header>
        <TitleSection>
          <Title>Life with AI: Preparing for Tomorrow</Title>
          <Subtitle>
            Exploring how AI will shape daily life—understand the opportunities and navigate the risks.
          </Subtitle>
        </TitleSection>
        <Nav>
          {topics.map(topic => (
            <NavItem 
              key={topic.id}
              onClick={() => handleCardClick(topic.id)}
              active={activeCard === topic.id}
              color={topic.color}
            >
              {topic.title}
            </NavItem>
          ))}
          <NavItem onClick={handleResetView}>Overview</NavItem>
        </Nav>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Topic Cards Section */}
        <CardsSection>
          {topics.map(topic => (
            <TopicCard 
              key={topic.id}
              onClick={() => handleCardClick(topic.id)}
              active={activeCard === topic.id}
              accentColor={topic.color}
            >
              <CardIcon color={topic.color}>{topic.icon}</CardIcon>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
              <CardButtons>
                <CardButton 
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleCardClick(topic.id);
                    handleInfoTypeClick('opportunities');
                  }}
                  color={topic.color}
                >
                  Opportunities
                </CardButton>
                <CardButton 
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleCardClick(topic.id);
                    handleInfoTypeClick('risks');
                  }}
                  color={topic.color}
                  isRisk
                >
                  Risks
                </CardButton>
              </CardButtons>
            </TopicCard>
          ))}
        </CardsSection>

        {/* Information Section */}
        <InfoSection>
          {activeCard ? (
            <>
              <InfoHeader color={getActiveTopic()?.color}>
                <h2>{getActiveTopic()?.title}: {infoType === 'opportunities' ? 'Opportunities' : 'Risks'}</h2>
                <InfoTabs>
                  <InfoTab 
                    onClick={() => handleInfoTypeClick('opportunities')}
                    active={infoType === 'opportunities'}
                    color={getActiveTopic()?.color}
                  >
                    Opportunities
                  </InfoTab>
                  <InfoTab 
                    onClick={() => handleInfoTypeClick('risks')}
                    active={infoType === 'risks'}
                    color={getActiveTopic()?.color}
                  >
                    Risks
                  </InfoTab>
                </InfoTabs>
              </InfoHeader>
              <InfoContent>
                <ul>
                  {infoType === 'opportunities' 
                    ? getActiveTopic()?.opportunities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    : getActiveTopic()?.risks.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                  }
                </ul>
              </InfoContent>
            </>
          ) : (
            <WelcomeInfo>
              <h2>Welcome to Your AI Future Preparation Dashboard</h2>
              <p>Select a category to explore how AI will impact different aspects of daily life, or explore the opportunities and risks in each area.</p>
            </WelcomeInfo>
          )}
        </InfoSection>

        {/* Visualization Section */}
        <VisualizationSection>
          <VisualizationHeader>
            <h2>
              {chartData === 'overall' 
                ? 'Overall AI Impact Metrics' 
                : `${topics.find(t => t.id === chartData)?.title} AI Impact Metrics`}
            </h2>
          </VisualizationHeader>
          <ChartContainer>
            <BarChart>
              <ChartAxis>
                <span>Adoption Rate</span>
                <span>Potential Impact</span>
                <span>Public Concern</span>
              </ChartAxis>
              <BarsContainer>
                <Bar 
                  height={`${getCurrentStats().adoption}%`} 
                  color={chartData === 'overall' ? '#3498db' : topics.find(t => t.id === chartData)?.color}
                >
                  <BarLabel>{Math.round(getCurrentStats().adoption)}%</BarLabel>
                </Bar>
                <Bar 
                  height={`${getCurrentStats().impact}%`} 
                  color={chartData === 'overall' ? '#3498db' : topics.find(t => t.id === chartData)?.color}
                >
                  <BarLabel>{Math.round(getCurrentStats().impact)}%</BarLabel>
                </Bar>
                <Bar 
                  height={`${getCurrentStats().concern}%`} 
                  color={chartData === 'overall' ? '#3498db' : topics.find(t => t.id === chartData)?.color}
                >
                  <BarLabel>{Math.round(getCurrentStats().concern)}%</BarLabel>
                </Bar>
              </BarsContainer>
            </BarChart>
          </ChartContainer>
        </VisualizationSection>
      </MainContent>

      {/* Call to Action Section */}
      <CTASection>
        <CTAHeader>Prepare Yourself</CTAHeader>
        <CTADescription>
          Take the next step in preparing for your AI-enhanced future. Explore detailed impacts or get personalized recommendations based on your lifestyle and needs.
        </CTADescription>
        <CTAButtons>
          <CTAButton>
            <span>Explore Detailed Impacts</span>
            <FaChevronRight />
          </CTAButton>
          <CTAButton primary>
            <span>Get Personalized Recommendations</span>
            <FaChevronRight />
          </CTAButton>
        </CTAButtons>
      </CTASection>

      {/* Footer */}
      <Footer>
        <p>© 2025 Life with AI: Preparing for Tomorrow. All rights reserved.</p>
      </Footer>
    </DashboardContainer>
  );
};

// Styled Components with TypeScript props
const DashboardContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  margin-bottom: 40px;
`;

const TitleSection = styled.div`
  text-align: center;
  padding: 30px 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
`;

const NavItem = styled.button<NavItemProps>`
  background: ${props => props.active ? (props.color || '#3498db') : 'transparent'};
  color: ${props => props.active ? 'white' : '#555'};
  border: 1px solid ${props => props.active ? (props.color || '#3498db') : '#ddd'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.color || '#3498db'};
    color: white;
  }
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 3fr 2fr;
    grid-template-areas:
      "cards info"
      "visualization visualization";
  }
`;

const CardsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  grid-area: cards;
`;

const TopicCard = styled.div<CardProps>`
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border-top: 5px solid ${props => props.accentColor || '#3498db'};
  transform: ${props => props.active ? 'translateY(-5px)' : 'none'};
  box-shadow: ${props => props.active ? 
    '0 8px 15px rgba(0, 0, 0, 0.1)' : 
    '0 4px 6px rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardIcon = styled.div<{ color?: string }>`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: ${props => props.color || '#3498db'};
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 15px;
  color: #2c3e50;
`;

const CardDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CardButtons = styled.div`
  display: flex;
  gap: 10px;
`;

interface CardButtonProps {
  color?: string;
  isRisk?: boolean;
}

const CardButton = styled.button<CardButtonProps>`
  background: ${props => props.isRisk ? 'white' : props.color || '#3498db'};
  color: ${props => props.isRisk ? (props.color || '#3498db') : 'white'};
  border: 1px solid ${props => props.color || '#3498db'};
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85rem;
  flex: 1;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isRisk ? (props.color || '#3498db') : 'white'};
    color: ${props => props.isRisk ? 'white' : (props.color || '#3498db')};
  }
`;

const InfoSection = styled.section`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  grid-area: info;
`;

const InfoHeader = styled.div<InfoHeaderProps>`
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: ${props => props.color ? `${props.color}10` : '#f8f9fa'};
  
  h2 {
    margin: 0 0 15px 0;
    color: ${props => props.color || '#2c3e50'};
    font-size: 1.3rem;
  }
`;

const InfoTabs = styled.div`
  display: flex;
  gap: 10px;
`;

const InfoTab = styled.button<InfoTabProps>`
  background: ${props => props.active ? (props.color || '#3498db') : 'white'};
  color: ${props => props.active ? 'white' : (props.color || '#3498db')};
  border: 1px solid ${props => props.color || '#3498db'};
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.color || '#3498db'};
    color: white;
  }
`;

const InfoContent = styled.div`
  padding: 20px;
  
  ul {
    margin: 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 12px;
      line-height: 1.5;
      font-size: 0.95rem;
    }
  }
`;

const WelcomeInfo = styled.div`
  padding: 30px;
  text-align: center;
  
  h2 {
    margin: 0 0 20px 0;
    color: #2c3e50;
  }
  
  p {
    color: #7f8c8d;
    line-height: 1.6;
    font-size: 1rem;
  }
`;

const VisualizationSection = styled.section`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  grid-area: visualization;
  padding: 25px;
`;

const VisualizationHeader = styled.div`
  margin-bottom: 25px;
  
  h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.3rem;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  padding: 20px;
`;

const BarChart = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
`;

const ChartAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 15px;
  text-align: right;
  height: 100%;
  
  span {
    font-size: 0.85rem;
    color: #7f8c8d;
    transform: translateY(50%);
  }
`;

const BarsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const Bar = styled.div<BarProps>`
  width: 80px;
  height: ${props => props.height || '50%'};
  background-color: ${props => props.color || '#3498db'};
  border-radius: 5px 5px 0 0;
  transition: height 0.5s ease-in-out;
  position: relative;
  margin: 0 10px;
`;

const BarLabel = styled.span`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  font-weight: bold;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #2c3e50, #4b6cb7);
  border-radius: 10px;
  padding: 40px;
  color: white;
  text-align: center;
  margin: 40px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

const CTAHeader = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 15px 0;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
  opacity: 0.9;
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const CTAButton = styled.button<CTAButtonProps>`
  background: ${props => props.primary ? 'white' : 'transparent'};
  color: ${props => props.primary ? '#2c3e50' : 'white'};
  border: 2px solid white;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  span {
    margin-right: 10px;
  }
  
  &:hover {
    background: ${props => props.primary ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)'};
    transform: translateY(-3px);
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
  margin-top: auto;
  font-size: 0.9rem;
`;

export default LifeWithAIDashboard;

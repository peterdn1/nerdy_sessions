import React, { useState, useEffect } from 'react';
import {
  FaRobot,
  FaLightbulb,
  FaCogs,
  FaChartLine,
  FaIndustry,
  FaUsers,
  FaCarAlt,
  FaMicrochip,
  FaArrowRight,
  FaSearch,
  FaBell,
  FaUser,
  FaCalendarAlt,
  FaSyncAlt,
  FaExternalLinkAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaPlus,
  FaMinus,
  FaChevronDown,
  FaChevronUp,
  FaEllipsisV,
  FaInfoCircle,
  FaPlay,
  FaDownload
} from 'react-icons/fa';

// TypeScript interfaces
interface Innovation {
  id: string;
  title: string;
  description: string;
  company: string;
  category: string;
  readinessLevel: number;
  imageUrl: string;
  videoUrl?: string;
  impact: number;
  releaseDate: string;
  keyFeatures: string[];
}

interface AutomationSolution {
  id: string;
  title: string;
  sector: string;
  description: string;
  provider: string;
  efficiency: number;
  costReduction: number;
  implementationTime: string;
  imageUrl: string;
  caseStudies: number;
}

interface RoboticsCompany {
  id: string;
  name: string;
  specialty: string;
  marketShare: number;
  founded: string;
  headquarters: string;
  revenueGrowth: number;
  flagshipProduct: string;
  employeeCount: string;
  logoUrl: string;
  description: string;
}

interface FutureTrend {
  id: string;
  title: string;
  category: string;
  description: string;
  timeframe: string;
  impact: number; // 1-100
  disruptionLevel: string;
  readinessLevel: number; // 1-10
  adoptionRate: number; // percentage
  keyPlayers: string[];
  imageUrl: string;
}

interface AutonomousVehicle {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  autonomyLevel: number; // 1-5
  range: string;
  topSpeed: string;
  sensorSuite: string[];
  deploymentStatus: string;
  imageUrl: string;
  description: string;
  keyFeatures: string[];
}

interface TimelineEvent {
  year: number;
  event: string;
  impact: string;
}

function RoboticsDashboard() {
  // State management
  const [activeCategory, setActiveCategory] = useState<string>('innovation');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [innovationFilter, setInnovationFilter] = useState<string>('all');
  const [automationFilter, setAutomationFilter] = useState<string>('all');
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  
  // Robotics categories for navigation
  const categories = [
    { id: 'innovation', name: 'Innovation Spotlight', icon: <FaLightbulb /> },
    { id: 'automation', name: 'Automation', icon: <FaCogs /> },
    { id: 'leaders', name: 'Robotics Leaders', icon: <FaUsers /> },
    { id: 'trends', name: 'Future Trends', icon: <FaChartLine /> },
    { id: 'vehicles', name: 'Autonomous Vehicles', icon: (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ) }
  ];
  
  // Innovation categories for filtering
  const innovationCategories = [
    'all',
    'industrial',
    'medical',
    'consumer',
    'research',
    'military',
    'space'
  ];
  
  // Automation sectors for filtering
  const automationSectors = [
    'all',
    'manufacturing',
    'logistics',
    'healthcare',
    'agriculture',
    'retail',
    'energy'
  ];
  
  // Autonomous vehicle types for filtering
  const vehicleTypes = [
    'all',
    'passenger car',
    'truck',
    'drone',
    'marine',
    'industrial'
  ];
  
  // Mock data - Innovations
  const innovations: Innovation[] = [
    {
      id: '1',
      title: 'NeuroBridge Brain-Computer Interface',
      description: 'Revolutionary neural interface that allows direct brain control of robotic limbs with unprecedented precision, offering new mobility solutions for paralyzed patients.',
      company: 'NeuroLink Systems',
      category: 'medical',
      readinessLevel: 7,
      imageUrl: 'https://source.unsplash.com/random/800x600/?robotics,neural',
      impact: 92,
      releaseDate: 'Q3 2025',
      keyFeatures: [
        'Sub-millimeter neural signal detection',
        'AI-enhanced motor intent prediction',
        'Wireless operation with 72-hour battery life',
        'Self-calibrating adaptive algorithms'
      ]
    },
    {
      id: '2',
      title: 'Quantum Fabricator 7000',
      description: 'Next-generation industrial manufacturing robot utilizing quantum computing principles for complex materials assembly at the molecular level.',
      company: 'QuantumBot Industries',
      category: 'industrial',
      readinessLevel: 6,
      imageUrl: 'https://source.unsplash.com/random/800x600/?robotics,manufacturing',
      videoUrl: 'https://example.com/videos/quantum-fabricator',
      impact: 85,
      releaseDate: 'Q2 2025',
      keyFeatures: [
        'Molecular-level assembly precision',
        'Multi-material fabrication capability',
        'Quantum-based error correction',
        'Zero-waste processing'
      ]
    },
    {
      id: '3',
      title: 'Housekeeper Pro',
      description: 'AI-powered domestic robot capable of complex household tasks including cleaning, cooking, and organization with human-like dexterity.',
      company: 'HomeTech Robotics',
      category: 'consumer',
      readinessLevel: 8,
      imageUrl: 'https://source.unsplash.com/random/800x600/?robotics,home',
      impact: 78,
      releaseDate: 'Q1 2025',
      keyFeatures: [
        'Advanced object recognition and manipulation',
        'Emotional intelligence for family interaction',
        'Voice-controlled operation in 17 languages',
        'Self-charging and maintenance'
      ]
    },
    {
      id: '4',
      title: 'DeepExplorer Submersible',
      description: 'Autonomous deep-sea exploration robot capable of operating at extreme depths with advanced sampling and analysis capabilities.',
      company: 'OceanTech Solutions',
      category: 'research',
      readinessLevel: 9,
      imageUrl: 'https://source.unsplash.com/random/800x600/?robotics,underwater',
      impact: 82,
      releaseDate: 'Q1 2025',
      keyFeatures: [
        'Operates at depths up to 11,000 meters',
        'Advanced sonar and lidar mapping',
        'On-board sample analysis laboratory',
        'Mesh network communication with surface'
      ]
    },
    {
      id: '5',
      title: 'Exo-Titan Combat Frame',
      description: 'Military-grade exoskeleton offering enhanced strength, protection, and battlefield awareness for infantry operations.',
      company: 'DefenseTech Systems',
      category: 'military',
      readinessLevel: 7,
      imageUrl: 'https://source.unsplash.com/random/800x600/?robotics,exoskeleton',
      impact: 88,
      releaseDate: 'Q4 2025',
      keyFeatures: [
        '400% strength augmentation',
        'Integrated tactical awareness system',
        'Self-sealing armor with reactive elements',
        '72-hour continuous operation capability'
      ]
    },
    {
      id: '6',
      title: 'AstroBuilder Construction Bot',
      description: 'Autonomous construction robot designed for extraterrestrial deployment, capable of building structures using local materials on the Moon or Mars.',
      company: 'SpaceWorks Engineering',
      category: 'space',
      readinessLevel: 5,
      imageUrl: 'https://source.unsplash.com/random/800x600/?robotics,space',
      impact: 95,
      releaseDate: 'Q1 2026',
      keyFeatures: [
        'In-situ resource utilization technology',
        'Radiation and vacuum hardened systems',
        'Autonomous operation for months without maintenance',
        'Multi-robot coordination capabilities'
      ]
    }
  ];
  
  // Mock data - Automation Solutions
  const automationSolutions: AutomationSolution[] = [
    {
      id: '1',
      title: 'SmartFactory Assembly Line',
      sector: 'manufacturing',
      description: 'End-to-end automated assembly system with real-time quality control and predictive maintenance capabilities.',
      provider: 'AutomationX',
      efficiency: 87,
      costReduction: 42,
      implementationTime: '4-6 months',
      imageUrl: 'https://source.unsplash.com/random/800x600/?factory,automation',
      caseStudies: 24
    },
    {
      id: '2',
      title: 'MedDispense Autonomous Pharmacy',
      sector: 'healthcare',
      description: 'Fully automated medication dispensing and inventory management system for hospitals and pharmacies.',
      provider: 'HealthTech Automation',
      efficiency: 93,
      costReduction: 38,
      implementationTime: '2-3 months',
      imageUrl: 'https://source.unsplash.com/random/800x600/?pharmacy,robot',
      caseStudies: 47
    },
    {
      id: '3',
      title: 'AgriBot Harvesting System',
      sector: 'agriculture',
      description: 'Autonomous crop monitoring and harvesting solution using computer vision and precision robotics.',
      provider: 'FarmTech Solutions',
      efficiency: 78,
      costReduction: 52,
      implementationTime: '3-5 months',
      imageUrl: 'https://source.unsplash.com/random/800x600/?agriculture,robot',
      caseStudies: 36
    },
    {
      id: '4',
      title: 'WarehouseNav Fleet Management',
      sector: 'logistics',
      description: 'Autonomous warehouse robot fleet coordination system with AI-optimized routing and order fulfillment.',
      provider: 'LogisticsPro',
      efficiency: 91,
      costReduction: 58,
      implementationTime: '2-4 months',
      imageUrl: 'https://source.unsplash.com/random/800x600/?warehouse,robot',
      caseStudies: 52
    },
    {
      id: '5',
      title: 'RetailAssist Customer Experience',
      sector: 'retail',
      description: 'In-store robotic customer assistance and inventory management system with integrated analytics.',
      provider: 'ShopTech Innovations',
      efficiency: 74,
      costReduction: 29,
      implementationTime: '1-2 months',
      imageUrl: 'https://source.unsplash.com/random/800x600/?retail,robot',
      caseStudies: 18
    },
    {
      id: '6',
      title: 'PowerGrid Inspection Drones',
      sector: 'energy',
      description: 'Autonomous drone system for power infrastructure inspection and preventative maintenance.',
      provider: 'EnergyTech Solutions',
      efficiency: 85,
      costReduction: 63,
      implementationTime: '2-3 months',
      imageUrl: 'https://source.unsplash.com/random/800x600/?drone,power',
      caseStudies: 31
    }
  ];
  
  // Mock data - Robotics Companies
  const roboticsCompanies: RoboticsCompany[] = [
    {
      id: '1',
      name: 'Boston Dynamics',
      specialty: 'Dynamic Humanoid & Quadruped Robots',
      marketShare: 12.7,
      founded: '1992',
      headquarters: 'Waltham, Massachusetts, USA',
      revenueGrowth: 41.3,
      flagshipProduct: 'Atlas Humanoid Robot',
      employeeCount: '1,200+',
      logoUrl: 'https://logo.clearbit.com/bostondynamics.com',
      description: 'Boston Dynamics is a world leader in mobile robotics, creating advanced machines with remarkable mobility, dexterity, and intelligence. Their robots navigate the real world with exceptional balance and mobility, including challenging terrains and obstacles. Notable products include Atlas (humanoid), Spot (quadruped), and Stretch (logistics).'
    },
    {
      id: '2',
      name: 'ABB Robotics',
      specialty: 'Industrial Automation & Manufacturing',
      marketShare: 18.4,
      founded: '1988',
      headquarters: 'Zurich, Switzerland',
      revenueGrowth: 22.8,
      flagshipProduct: 'YuMi Collaborative Robot',
      employeeCount: '8,500+',
      logoUrl: 'https://logo.clearbit.com/abb.com',
      description: 'ABB Robotics is a global leader in industrial automation and robotics, providing comprehensive solutions for manufacturing, automotive, and electronics industries. Their robotics portfolio includes collaborative robots, painting robots, welding systems, and specialized solutions for diverse industrial applications, enabling enhanced productivity and precision in manufacturing processes.'
    },
    {
      id: '3',
      name: 'Intuitive Surgical',
      specialty: 'Surgical Robotics & Healthcare',
      marketShare: 7.9,
      founded: '1995',
      headquarters: 'Sunnyvale, California, USA',
      revenueGrowth: 27.5,
      flagshipProduct: 'da Vinci Surgical System',
      employeeCount: '5,700+',
      logoUrl: 'https://logo.clearbit.com/intuitivesurgical.com',
      description: 'Intuitive Surgical is the pioneer and global leader in robotic-assisted, minimally invasive surgery. Their da Vinci Surgical System enables surgeons to perform complex procedures with enhanced precision and control through smaller incisions, resulting in reduced patient recovery times and improved clinical outcomes across various surgical specialties.'
    },
    {
      id: '4',
      name: 'FANUC',
      specialty: 'Industrial Robots & CNC Systems',
      marketShare: 24.1,
      founded: '1972',
      headquarters: 'Yamanashi, Japan',
      revenueGrowth: 18.9,
      flagshipProduct: 'R-2000i Series',
      employeeCount: '9,200+',
      logoUrl: 'https://logo.clearbit.com/fanuc.com',
      description: 'FANUC is a global leader in factory automation, specializing in CNC systems, industrial robots, and manufacturing solutions. With the largest installed base of industrial robots worldwide, they serve diverse industries including automotive, electronics, and general manufacturing with a reputation for reliability, precision, and technological innovation in automated production systems.'
    },
    {
      id: '5',
      name: 'Anduril Industries',
      specialty: 'Defense & Security Systems',
      marketShare: 5.2,
      founded: '2017',
      headquarters: 'Costa Mesa, California, USA',
      revenueGrowth: 87.6,
      flagshipProduct: 'Lattice AI Platform',
      employeeCount: '950+',
      logoUrl: 'https://logo.clearbit.com/anduril.com',
      description: 'Anduril Industries is a defense technology company focusing on autonomous systems and AI for military and border security applications. Their integrated hardware and software platforms, including autonomous surveillance towers, underwater vehicles, and counter-drone systems, utilize advanced AI to transform defense capabilities with modern, cost-effective technologies.'
    },
    {
      id: '6',
      name: 'UiPath',
      specialty: 'Robotic Process Automation',
      marketShare: 9.8,
      founded: '2005',
      headquarters: 'New York, USA',
      revenueGrowth: 32.7,
      flagshipProduct: 'UiPath Enterprise Platform',
      employeeCount: '4,200+',
      logoUrl: 'https://logo.clearbit.com/uipath.com',
      description: 'UiPath is a global software company and leader in robotic process automation (RPA), providing an end-to-end platform for automating business processes. Their technology enables organizations to automate repetitive digital tasks, enhancing productivity and accuracy while freeing human workers to focus on higher-value activities across industries including finance, healthcare, and manufacturing.'
    }
  ];
  
  // Mock data - Future Trends
  const futureTrends: FutureTrend[] = [
    {
      id: '1',
      title: 'Quantum Robotics',
      category: 'Advanced Computing',
      description: 'Quantum computing principles applied to robotics control systems, enabling unprecedented processing power for real-time decision making and complex environment modeling.',
      timeframe: '2027-2030',
      impact: 92,
      disruptionLevel: 'Transformative',
      readinessLevel: 4,
      adoptionRate: 12,
      keyPlayers: ['IBM Quantum', 'QuantumScape', 'D-Wave Systems', 'Google Quantum AI'],
      imageUrl: 'https://source.unsplash.com/random/800x600/?quantum,computer'
    },
    {
      id: '2',
      title: 'Self-Healing Robotics',
      category: 'Materials Science',
      description: 'Robots with integrated self-repair capabilities using advanced materials that can detect and fix damage autonomously, greatly extending operational lifespans in remote or hazardous environments.',
      timeframe: '2026-2028',
      impact: 85,
      disruptionLevel: 'High',
      readinessLevel: 5,
      adoptionRate: 18,
      keyPlayers: ['MIT Materials Lab', 'SelfMend Technologies', 'Advanced Robotics Corp'],
      imageUrl: 'https://source.unsplash.com/random/800x600/?robot,repair'
    },
    {
      id: '3',
      title: 'Swarm Intelligence',
      category: 'Collective Robotics',
      description: 'Large-scale deployment of simple robotic units working together with collective intelligence, similar to insect colonies, capable of complex coordinated tasks without centralized control.',
      timeframe: '2025-2027',
      impact: 88,
      disruptionLevel: 'High',
      readinessLevel: 7,
      adoptionRate: 24,
      keyPlayers: ['SwarmTech', 'Collective Robotics Initiative', 'Festo Bionic'],
      imageUrl: 'https://source.unsplash.com/random/800x600/?swarm,robots'
    },
    {
      id: '4',
      title: 'Neuromorphic Robotics',
      category: 'AI & Computing',
      description: 'Robots with brain-inspired computing architectures that learn and adapt like biological systems, enabling more intuitive interaction with humans and natural environments.',
      timeframe: '2026-2029',
      impact: 90,
      disruptionLevel: 'Transformative',
      readinessLevel: 5,
      adoptionRate: 15,
      keyPlayers: ['Intel Neuromorphic', 'BrainChip', 'SynSense', 'NeurobotX'],
      imageUrl: 'https://source.unsplash.com/random/800x600/?neural,network'
    },
    {
      id: '5',
      title: 'Soft Robotics Revolution',
      category: 'Biomimetic Design',
      description: 'Widespread adoption of robots constructed from flexible, compliant materials inspired by biological organisms, revolutionizing human-robot interaction and enabling applications impossible with rigid systems.',
      timeframe: '2025-2026',
      impact: 82,
      disruptionLevel: 'High',
      readinessLevel: 8,
      adoptionRate: 32,
      keyPlayers: ['Soft Robotics Inc', 'Harvard Biodesign Lab', 'OctopusBot'],
      imageUrl: 'https://source.unsplash.com/random/800x600/?soft,robot'
    },
    {
      id: '6',
      title: 'Social Robotics Mainstreaming',
      category: 'Human-Robot Interaction',
      description: 'Integration of robots with advanced emotional intelligence and social capabilities into everyday environments, serving as companions, assistants, and caregivers with intuitive human interaction.',
      timeframe: '2025-2027',
      impact: 78,
      disruptionLevel: 'Moderate',
      readinessLevel: 7,
      adoptionRate: 28,
      keyPlayers: ['Sony AI', 'Hanson Robotics', 'Embodied Inc', 'SocialBots'],
      imageUrl: 'https://source.unsplash.com/random/800x600/?social,robot'
    }
  ];
  
  // Mock data - Autonomous Vehicles
  const autonomousVehicles: AutonomousVehicle[] = [
    {
      id: '1',
      name: 'Waymo One',
      manufacturer: 'Waymo (Alphabet)',
      type: 'passenger car',
      autonomyLevel: 4,
      range: '300 miles',
      topSpeed: '70 mph',
      sensorSuite: ['Lidar', 'Radar', 'Cameras', 'Ultrasonic'],
      deploymentStatus: 'Commercial service in multiple cities',
      imageUrl: 'https://source.unsplash.com/random/800x600/?self-driving,car',
      description: 'Waymo One is one of the world\'s most advanced autonomous ride-hailing services, offering fully driverless rides in designated service areas. The vehicles feature an integrated sensor suite providing 360-degree awareness and can navigate complex urban environments while adhering to traffic rules and handling unexpected road situations.',
      keyFeatures: [
        'Rider-only service (no safety driver)',
        'AI-powered navigation system',
        'Handles complex urban environments',
        'Remote assistance capabilities'
      ]
    },
    {
      id: '2',
      name: 'TuSimple Autonomous Truck',
      manufacturer: 'TuSimple',
      type: 'truck',
      autonomyLevel: 4,
      range: '750 miles',
      topSpeed: '65 mph',
      sensorSuite: ['Lidar', 'Radar', 'HD Cameras', 'Thermal Cameras'],
      deploymentStatus: 'Commercial pilot programs',
      imageUrl: 'https://source.unsplash.com/random/800x600/?autonomous,truck',
      description: 'TuSimple\'s autonomous trucks are designed for long-haul freight transportation, operating on highways and interstate routes with minimal human intervention. Their proprietary perception system can detect obstacles up to 1,000 meters away, and the vehicles have completed numerous coast-to-coast autonomous freight deliveries.',
      keyFeatures: [
        'Long-range perception (1,000m)',
        'Fuel efficiency improvements up to 10%',
        'Continuous operation capability',
        'Integration with logistics networks'
      ]
    },
    {
      id: '3',
      name: 'Skydio X10',
      manufacturer: 'Skydio',
      type: 'drone',
      autonomyLevel: 5,
      range: '5 miles',
      topSpeed: '45 mph',
      sensorSuite: ['Visual SLAM', '360° Cameras', 'IR Sensors'],
      deploymentStatus: 'Available commercially',
      imageUrl: 'https://source.unsplash.com/random/800x600/?autonomous,drone',
      description: 'The Skydio X10 represents the pinnacle of autonomous drone technology, featuring advanced obstacle avoidance, subject tracking, and mission planning capabilities. Used in industrial inspection, public safety, and creative applications, it can navigate complex environments and perform tasks without human piloting input.',
      keyFeatures: [
        'AI-powered obstacle avoidance',
        'Autonomous subject tracking',
        'High-resolution 8K video capture',
        '35-minute flight time'
      ]
    },
    {
      id: '4',
      name: 'AutoX RoboTaxi',
      manufacturer: 'AutoX',
      type: 'passenger car',
      autonomyLevel: 4,
      range: '280 miles',
      topSpeed: '75 mph',
      sensorSuite: ['Lidar', 'Radar', 'Camera Array', 'Ultrasonic'],
      deploymentStatus: 'Operational in select cities',
      imageUrl: 'https://source.unsplash.com/random/800x600/?robotaxi,autonomous',
      description: 'AutoX has developed a fully autonomous RoboTaxi service deployed in multiple Asian cities, featuring a comprehensive sensor suite and proprietary AI driving technology. The vehicles operate without safety drivers in designated areas and are accessible through a smartphone app for on-demand transportation.',
      keyFeatures: [
        'Full driverless operation capability',
        'Real-time HD mapping',
        'Handles complex Asian urban traffic',
        'All-weather operation'
      ]
    },
    {
      id: '5',
      name: 'Sea Machines SM400',
      manufacturer: 'Sea Machines Robotics',
      type: 'marine',
      autonomyLevel: 4,
      range: 'Unlimited (diesel-electric)',
      topSpeed: '25 knots',
      sensorSuite: ['Marine Radar', 'AIS', 'Cameras', 'Sonar'],
      deploymentStatus: 'Commercial deployment',
      imageUrl: 'https://source.unsplash.com/random/800x600/?autonomous,boat',
      description: 'The Sea Machines SM400 is an advanced autonomous control system for commercial marine vessels, enabling autonomous navigation, obstacle avoidance, and remote operation capabilities. It has been deployed on container ships, work boats, and survey vessels to improve efficiency and safety in maritime operations.',
      keyFeatures: [
        'Autonomous navigation in open waters',
        'Collision avoidance with COLREGS compliance',
        'Remote vessel monitoring and control',
        'Path planning and optimization'
      ]
    },
    {
      id: '6',
      name: 'Agilox IXO',
      manufacturer: 'Agilox',
      type: 'industrial',
      autonomyLevel: 5,
      range: '12 hours operation',
      topSpeed: '5 mph',
      sensorSuite: ['Lidar', 'ToF Cameras', 'Inertial Navigation'],
      deploymentStatus: 'Widely deployed in industry',
      imageUrl: 'https://source.unsplash.com/random/800x600/?warehouse,robot',
      description: 'The Agilox IXO is an autonomous mobile robot for industrial logistics, featuring swarm intelligence capabilities that allow multiple units to coordinate without central control. Designed for warehouse and factory environments, these vehicles autonomously transport materials and adapt to changing facility layouts and tasks.',
      keyFeatures: [
        'Swarm intelligence for multi-unit coordination',
        'No infrastructure requirements',
        'Autonomous charging management',
        'Dynamic path finding in changing environments'
      ]
    }
  ];
  
  // Mock data - Timeline Events
  const timelineEvents: TimelineEvent[] = [
    { year: 2022, event: 'First commercially available general-purpose humanoid robot', impact: 'Medium' },
    { year: 2023, event: 'AI-based robot control systems reach human-level dexterity for basic tasks', impact: 'High' },
    { year: 2024, event: 'Robotaxi services without safety drivers launch in major urban centers', impact: 'Transformative' },
    { year: 2025, event: 'Projected: International standards established for AI robotics safety', impact: 'High' },
    { year: 2026, event: 'Projected: Self-healing robotic materials enter commercial applications', impact: 'Medium' },
    { year: 2027, event: 'Projected: Neuromorphic computing becomes standard in advanced robots', impact: 'Transformative' },
    { year: 2028, event: 'Projected: First moon base construction robots deployed', impact: 'High' },
    { year: 2030, event: 'Projected: Human-robot collaborative workforce exceeds 30% in manufacturing', impact: 'Transformative' }
  ];
  
  // Filter data based on active category and search/filters
  const getFilteredInnovations = () => {
    let filtered = [...innovations];
    
    if (innovationFilter !== 'all') {
      filtered = filtered.filter(item => item.category === innovationFilter);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.company.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const getFilteredAutomation = () => {
    let filtered = [...automationSolutions];
    
    if (automationFilter !== 'all') {
      filtered = filtered.filter(item => item.sector === automationFilter);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.provider.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const getFilteredVehicles = () => {
    let filtered = [...autonomousVehicles];
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.manufacturer.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  // Format functions
  const formatReadinessLevel = (level: number): string => {
    const labels = [
      'Concept',
      'Research',
      'Development',
      'Prototype',
      'Testing',
      'Pilot',
      'Limited Production',
      'Commercial',
      'Established',
      'Ubiquitous'
    ];
    
    return labels[level - 1] || 'Unknown';
  };
  
  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };
  
  const formatAutonomyLevel = (level: number): string => {
    const labels = [
      'Level 1: Driver Assistance',
      'Level 2: Partial Automation',
      'Level 3: Conditional Automation',
      'Level 4: High Automation',
      'Level 5: Full Automation'
    ];
    
    return labels[level - 1] || 'Unknown';
  };
  
  // Toggle company expansion
  // Toggle company expansion
  const toggleCompanyExpansion = (id: string) => {
    if (expandedCompany === id) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(id);
    }
  };
  
  // Select vehicle for detail view
  const toggleVehicleSelection = (id: string) => {
    if (selectedVehicle === id) {
      setSelectedVehicle(null);
    } else {
      setSelectedVehicle(id);
    }
  };
  
  // Get icon for innovation category
  const getInnovationCategoryIcon = (category: string) => {
    switch (category) {
      case 'industrial':
        return <FaIndustry />;
      case 'medical':
        return <FaHeartbeat />;
      case 'consumer':
        return <FaUser />;
      case 'research':
        return <FaFlask />;
      case 'military':
        return <FaShield />;
      case 'space':
        return <FaRocket />;
      default:
        return <FaLightbulb />;
    }
  };
  
  // Get icon for vehicle type
  const getVehicleTypeIcon = (type: string) => {
    switch (type) {
      case 'passenger car':
        return <FaCarAlt />;
      case 'truck':
        return <FaTruck />;
      case 'drone':
        return <FaDrone />;
      case 'marine':
        return <FaShip />;
      case 'industrial':
        return <FaIndustry />;
      default:
        return <FaRobot />;
    }
  };

  return (
    <>
      <div className="robotics-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="branding">
            <h1 className="dashboard-title">
              <FaRobot /> Robotics Innovation Dashboard
            </h1>
          </div>
          
          <div className="header-actions">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search robotics innovations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="header-buttons">
              <button className="header-button">
                <FaCalendarAlt /> <span>Apr 17, 2025</span>
              </button>
              <button className="header-button notification">
                <FaBell />
                <span className="notification-badge">3</span>
              </button>
              <button className="header-button user">
                <FaUser />
              </button>
            </div>
          </div>
        </header>
        
        {/* Navigation Sidebar */}
        <aside className="sidebar">
          <nav className="main-nav">
            {categories.map(category => (
              <button
                key={category.id}
                className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="nav-icon">{category.icon}</span>
                <span className="nav-text">{category.name}</span>
              </button>
            ))}
          </nav>
          
          {/* Timeline display */}
          <div className="timeline">
            <h3 className="timeline-title">Robotics Evolution Timeline</h3>
            <div className="timeline-events">
              {timelineEvents.map((event, index) => (
                <div className="timeline-event" key={index}>
                  <div className="event-year">{event.year}</div>
                  <div className="event-content">
                    <div className="event-description">{event.event}</div>
                    <div className={`event-impact ${event.impact.toLowerCase()}`}>
                      Impact: {event.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Innovation Spotlight Section */}
          {activeCategory === 'innovation' && (
            <section className="content-section">
              <div className="section-header">
                <h2><FaLightbulb /> Innovation Spotlight</h2>
                <div className="filter-controls">
                  <span className="filter-label">Filter by Category:</span>
                  <div className="filter-buttons">
                    {innovationCategories.map(category => (
                      <button
                        key={category}
                        className={`filter-button ${innovationFilter === category ? 'active' : ''}`}
                        onClick={() => setInnovationFilter(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="innovation-grid">
                {getFilteredInnovations().map(innovation => (
                  <div className="innovation-card" key={innovation.id}>
                    <div className="innovation-image">
                      <img src={innovation.imageUrl} alt={innovation.title} />
                      <div className="innovation-category">
                        {getInnovationCategoryIcon(innovation.category)}
                        {innovation.category.charAt(0).toUpperCase() + innovation.category.slice(1)}
                      </div>
                    </div>
                    <div className="innovation-content">
                      <h3 className="innovation-title">{innovation.title}</h3>
                      <div className="innovation-company">{innovation.company}</div>
                      <p className="innovation-description">{innovation.description}</p>
                      <div className="innovation-details">
                        <div className="detail-item">
                          <span className="detail-label">Readiness:</span>
                          <div className="readiness-meter">
                            <div className="meter-bar">
                              <div 
                                className="meter-fill" 
                                style={{ width: `${innovation.readinessLevel * 10}%` }}
                              ></div>
                            </div>
                            <span className="meter-label">
                              {formatReadinessLevel(innovation.readinessLevel)}
                            </span>
                          </div>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Impact Score:</span>
                          <span className="detail-value high">{innovation.impact}/100</span>
                        </div>
                      </div>
                      <div className="innovation-features">
                        <h4>Key Features</h4>
                        <ul>
                          {innovation.keyFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="innovation-footer">
                        <div className="release-date">Expected: {innovation.releaseDate}</div>
                        {innovation.videoUrl && (
                          <button className="video-button">
                            <FaPlay /> Watch Demo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Automation Section */}
          {activeCategory === 'automation' && (
            <section className="content-section">
              <div className="section-header">
                <h2><FaCogs /> Automation Solutions</h2>
                <div className="filter-controls">
                  <span className="filter-label">Filter by Sector:</span>
                  <div className="filter-buttons">
                    {automationSectors.map(sector => (
                      <button
                        key={sector}
                        className={`filter-button ${automationFilter === sector ? 'active' : ''}`}
                        onClick={() => setAutomationFilter(sector)}
                      >
                        {sector.charAt(0).toUpperCase() + sector.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="automation-grid">
                {getFilteredAutomation().map(solution => (
                  <div className="automation-card" key={solution.id}>
                    <div className="automation-header">
                      <div className="sector-badge">
                        {solution.sector.charAt(0).toUpperCase() + solution.sector.slice(1)}
                      </div>
                      <h3 className="automation-title">{solution.title}</h3>
                      <div className="provider">{solution.provider}</div>
                    </div>
                    <div className="automation-image">
                      <img src={solution.imageUrl} alt={solution.title} />
                    </div>
                    <div className="automation-content">
                      <p className="automation-description">{solution.description}</p>
                      <div className="metrics-grid">
                        <div className="metric">
                          <div className="metric-label">Efficiency Gain</div>
                          <div className="metric-value">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${solution.efficiency}%` }}
                              ></div>
                            </div>
                            <span>{solution.efficiency}%</span>
                          </div>
                        </div>
                        <div className="metric">
                          <div className="metric-label">Cost Reduction</div>
                          <div className="metric-value">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${solution.costReduction}%` }}
                              ></div>
                            </div>
                            <span>{solution.costReduction}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="automation-footer">
                        <div className="implementation">
                          <span className="label">Implementation:</span>
                          <span className="value">{solution.implementationTime}</span>
                        </div>
                        <div className="case-studies">
                          <span className="label">Case Studies:</span>
                          <span className="value">{solution.caseStudies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Robotics Leaders Section */}
          {activeCategory === 'leaders' && (
            <section className="content-section">
              <div className="section-header">
                <h2><FaUsers /> Robotics Industry Leaders</h2>
                <div className="view-controls">
                  <button className="refresh-button">
                    <FaSyncAlt /> Refresh Data
                  </button>
                </div>
              </div>
              
              <div className="market-summary">
                <div className="summary-card">
                  <div className="summary-title">Global Robotics Market</div>
                  <div className="summary-value">$142.5B</div>
                  <div className="summary-change positive">+24.7% YoY</div>
                </div>
                <div className="summary-card">
                  <div className="summary-title">Industry Growth Forecast</div>
                  <div className="summary-value">31.2%</div>
                  <div className="summary-subtext">CAGR 2025-2030</div>
                </div>
                <div className="summary-card">
                  <div className="summary-title">Top 10 Companies</div>
                  <div className="summary-value">71.8%</div>
                  <div className="summary-subtext">Market Share</div>
                </div>
              </div>
              
              <div className="companies-list">
                {roboticsCompanies.map(company => (
                  <div 
                    className={`company-card ${expandedCompany === company.id ? 'expanded' : ''}`} 
                    key={company.id}
                  >
                    <div 
                      className="company-header"
                      onClick={() => toggleCompanyExpansion(company.id)}
                    >
                      <img 
                        src={company.logoUrl} 
                        alt={company.name} 
                        className="company-logo"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/40?text=${company.name.charAt(0)}`;
                        }}
                      />
                      <div className="company-info">
                        <h3 className="company-name">{company.name}</h3>
                        <div className="company-specialty">{company.specialty}</div>
                      </div>
                      <div className="company-metrics">
                        <div className="metric">
                          <div className="metric-label">Market Share</div>
                          <div className="metric-value">{formatPercentage(company.marketShare)}</div>
                        </div>
                        <div className="metric">
                          <div className="metric-label">Growth</div>
                          <div className="metric-value positive">+{formatPercentage(company.revenueGrowth)}</div>
                        </div>
                      </div>
                      <div className="expansion-toggle">
                        {expandedCompany === company.id ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>
                    
                    {expandedCompany === company.id && (
                      <div className="company-details">
                        <div className="company-description">
                          {company.description}
                        </div>
                        <div className="details-grid">
                          <div className="detail-item">
                            <span className="detail-label">Founded:</span>
                            <span className="detail-value">{company.founded}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Headquarters:</span>
                            <span className="detail-value">{company.headquarters}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Employees:</span>
                            <span className="detail-value">{company.employeeCount}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Flagship Product:</span>
                            <span className="detail-value">{company.flagshipProduct}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Future Trends Section */}
          {activeCategory === 'trends' && (
            <section className="content-section">
              <div className="section-header">
                <h2><FaChartLine /> Future Trends in Robotics</h2>
                <div className="info-tag">
                  <FaInfoCircle />
                  <span className="info-tooltip">Based on industry forecasts and expert analysis</span>
                </div>
              </div>
              
              <div className="trend-timeline">
                <div className="timeline-labels">
                  <div>2025</div>
                  <div>2026</div>
                  <div>2027</div>
                  <div>2028</div>
                  <div>2029</div>
                  <div>2030</div>
                </div>
                <div className="timeline-track"></div>
              </div>
              
              <div className="trends-grid">
                {futureTrends.map(trend => (
                  <div className="trend-card" key={trend.id}>
                    <div className="trend-header">
                      <h3 className="trend-title">{trend.title}</h3>
                      <div className="trend-category">{trend.category}</div>
                    </div>
                    <p className="trend-description">{trend.description}</p>
                    <div className="trend-metrics">
                      <div className="trend-metric">
                        <div className="metric-label">Potential Impact</div>
                        <div className="impact-meter">
                          <div className="meter-bar">
                            <div 
                              className="meter-fill" 
                              style={{ 
                                width: `${trend.impact}%`,
                                backgroundColor: trend.impact > 85 ? '#ff6b6b' : '#4dabf7'
                              }}
                            ></div>
                          </div>
                          <span className="meter-value">{trend.impact}/100</span>
                        </div>
                        <div className="disruption-level">
                          {trend.disruptionLevel} Disruption
                        </div>
                      </div>
                      <div className="trend-metric">
                        <div className="metric-label">Technology Readiness</div>
                        <div className="readiness-level">
                          Level {trend.readinessLevel}/10
                        </div>
                        <div className="adoption-rate">
                          {formatPercentage(trend.adoptionRate)} Current Adoption
                        </div>
                      </div>
                    </div>
                    <div className="trend-timeframe">
                      <div className="timeframe-label">Expected Mainstream:</div>
                      <div className="timeframe-value">{trend.timeframe}</div>
                    </div>
                    <div className="key-players">
                      <h4>Key Players</h4>
                      <div className="players-list">
                        {trend.keyPlayers.map((player, index) => (
                          <span className="player-tag" key={index}>{player}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Autonomous Vehicles Section */}
          {activeCategory === 'vehicles' && (
            <section className="content-section vehicles-section">
              <div className="section-header">
                <h2><FaCarAlt /> Autonomous Vehicles</h2>
                <div className="filter-controls">
                  <span className="filter-label">Filter by Type:</span>
                  <div className="filter-buttons">
                    {vehicleTypes.map(type => (
                      <button
                        key={type}
                        className={`filter-button ${type === 'all' ? 'active' : ''}`}
                        onClick={() => {}}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedVehicle ? (
                <div className="vehicle-detail">
                  <button 
                    className="back-button"
                    onClick={() => setSelectedVehicle(null)}
                  >
                    ← Back to all vehicles
                  </button>
                  
                  {autonomousVehicles.filter(v => v.id === selectedVehicle).map(vehicle => (
                    <div className="vehicle-detail-content" key={vehicle.id}>
                      <div className="detail-header">
                        <h3 className="vehicle-name">{vehicle.name}</h3>
                        <div className="vehicle-manufacturer">{vehicle.manufacturer}</div>
                      </div>
                      
                      <div className="detail-grid">
                        <div className="detail-image">
                          <img src={vehicle.imageUrl} alt={vehicle.name} />
                          <div className="vehicle-type-tag">
                            {getVehicleTypeIcon(vehicle.type)} {vehicle.type}
                          </div>
                        </div>
                        
                        <div className="detail-info">
                          <p className="vehicle-description">{vehicle.description}</p>
                          
                          <div className="vehicle-specs">
                            <div className="spec-item">
                              <span className="spec-label">Autonomy Level:</span>
                              <span className="spec-value">
                                {formatAutonomyLevel(vehicle.autonomyLevel)}
                              </span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Range:</span>
                              <span className="spec-value">{vehicle.range}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Top Speed:</span>
                              <span className="spec-value">{vehicle.topSpeed}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Deployment Status:</span>
                              <span className="spec-value">{vehicle.deploymentStatus}</span>
                            </div>
                          </div>
                          
                          <div className="sensor-suite">
                            <h4>Sensor Suite</h4>
                            <div className="sensor-tags">
                              {vehicle.sensorSuite.map((sensor, index) => (
                                <span className="sensor-tag" key={index}>{sensor}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="key-features">
                            <h4>Key Features</h4>
                            <ul>
                              {vehicle.keyFeatures.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="vehicles-grid">
                  {getFilteredVehicles().map(vehicle => (
                    <div 
                      className="vehicle-card" 
                      key={vehicle.id}
                      onClick={() => toggleVehicleSelection(vehicle.id)}
                    >
                      <div className="vehicle-image">
                        <img src={vehicle.imageUrl} alt={vehicle.name} />
                        <div className="autonomy-level">
                          Level {vehicle.autonomyLevel}
                        </div>
                      </div>
                      <div className="vehicle-content">
                        <div className="vehicle-type">
                          {getVehicleTypeIcon(vehicle.type)} {vehicle.type}
                        </div>
                        <h3 className="vehicle-name">{vehicle.name}</h3>
                        <div className="vehicle-manufacturer">{vehicle.manufacturer}</div>
                        <p className="vehicle-summary">
                          {vehicle.description.substring(0, 120)}...
                        </p>
                        <div className="vehicle-stats">
                          <div className="stat">
                            <span className="stat-label">Range:</span>
                            <span className="stat-value">{vehicle.range}</span>
                          </div>
                          <div className="stat">
                            <span className="stat-label">Status:</span>
                            <span className="stat-value">{vehicle.deploymentStatus}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
        
        <footer className="dashboard-footer">
          <div className="footer-info">
            <p>© 2025 Robotics Innovation Dashboard. Data updated: April 17, 2025</p>
          </div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Data Sources</a>
            <a href="#">Contact</a>
          </div>
        </footer>
        
        <style jsx>{`
          /* Global Styles */
          .robotics-dashboard {
            max-width: 1800px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 260px 1fr;
            grid-template-rows: auto 1fr auto;
            grid-template-areas:
              "header header"
              "sidebar main"
              "footer footer";
            min-height: 100vh;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            color: #333;
            background-color: #f7f9fc;
            gap: 25px;
            padding: 20px;
          }
          
          button {
            cursor: pointer;
            border: none;
            background: none;
            transition: all 0.2s ease;
          }
          
          h1, h2, h3, h4, h5, h6 {
            margin: 0;
          }
          
          .positive {
            color: #2ed573;
          }
          
          .negative {
            color: #ff6b6b;
          }
          
          .high {
            color: #5352ed;
          }
          
          /* Header Styles */
          .dashboard-header {
            grid-area: header;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          }
          
          .dashboard-title {
            font-size: 1.6rem;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #2c3e50;
          }
          
          .header-actions {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          
          .search-container {
            position: relative;
            width: 350px;
          }
          
          .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
          }
          
          .search-input {
            width: 100%;
            padding: 10px 10px 10px 35px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.9rem;
            outline: none;
            transition: all 0.2s ease;
          }
          
          .search-input:focus {
            border-color: #4299e1;
            box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
          }
          
          .header-buttons {
            display: flex;
            gap: 10px;
          }
          
          .header-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 8px 12px;
            background: #f7fafc;
            border-radius: 8px;
            color: #4a5568;
            font-size: 0.9rem;
          }
          
          .header-button:hover {
            background: #e2e8f0;
          }
          
          .header-button.notification {
            position: relative;
            padding: 8px;
          }
          
          .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff6b6b;
            color: white;
            font-size: 0.7rem;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .header-button.user {
            background: #4299e1;
            color: white;
            padding: 8px;
          }
          
          /* Sidebar Styles */
          .sidebar {
            grid-area: sidebar;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
          
          .main-nav {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 15px;
            border-radius: 8px;
            font-size: 0.95rem;
            color: #4a5568;
            transition: all 0.2s ease;
          }
          
          .nav-item:hover {
            background: #f7fafc;
            color: #2c5282;
          }
          
          .nav-item.active {
            background: #ebf8ff;
            color: #3182ce;
            font-weight: 500;
          }
          
          .nav-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
          }
          
          .timeline {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
          }
          
          .timeline-title {
            font-size: 1rem;
            margin-bottom: 15px;
            color: #2d3748;
          }
          
          .timeline-events {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .timeline-event {
            display: flex;
            gap: 10px;
            font-size: 0.85rem;
          }
          
          .event-year {
            width: 45px;
            padding: 3px 0;
            background: #4299e1;
            color: white;
            border-radius: 4px;
            text-align: center;
            font-weight: 500;
          }
          
          .event-content {
            flex: 1;
          }
          
          .event-description {
            margin-bottom: 5px;
          }
          
          .event-impact {
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .event-impact.high {
            color: #3182ce;
          }
          
          .event-impact.medium {
            color: #38b2ac;
          }
          
          .event-impact.transformative {
            color: #805ad5;
          }
          
          /* Main Content Styles */
          .main-content {
            grid-area: main;
            display: flex;
            flex-direction: column;
            gap: 25px;
          }
          
          .content-section {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
            padding: 25px;
          }
          
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .section-header h2 {
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #2d3748;
          }
            .filter-controls {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .filter-label {
            font-size: 0.9rem;
            color: #718096;
          }
          
          .filter-buttons {
            display: flex;
            background: #f7fafc;
            border-radius: 8px;
            overflow: hidden;
          }
          
          .filter-button {
            padding: 8px 12px;
            font-size: 0.85rem;
            color: #4a5568;
            transition: all 0.2s ease;
          }
          
          .filter-button:hover {
            background: #edf2f7;
          }
          
          .filter-button.active {
            background: #4299e1;
            color: white;
          }
          
          .view-controls {
            display: flex;
            gap: 10px;
          }
          
          .refresh-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            background: #f7fafc;
            border-radius: 6px;
            color: #4a5568;
            font-size: 0.85rem;
          }
          
          .refresh-button:hover {
            background: #edf2f7;
          }
          
          .info-tag {
            position: relative;
            color: #718096;
            display: flex;
            align-items: center;
            cursor: help;
          }
          
          .info-tooltip {
            position: absolute;
            top: 100%;
            right: 0;
            background: #2d3748;
            color: white;
            font-size: 0.8rem;
            padding: 8px 12px;
            border-radius: 6px;
            width: 250px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            z-index: 10;
            margin-top: 5px;
          }
          
          .info-tag:hover .info-tooltip {
            opacity: 1;
          }
          
          /* Innovation Section Styles */
          .innovation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
          }
          
          .innovation-card {
            background: #f8fafc;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .innovation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
          }
          
          .innovation-image {
            position: relative;
            height: 180px;
            overflow: hidden;
          }
          
          .innovation-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .innovation-category {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .innovation-content {
            padding: 20px;
          }
          
          .innovation-title {
            font-size: 1.2rem;
            margin-bottom: 5px;
            color: #2d3748;
          }
          
          .innovation-company {
            font-size: 0.9rem;
            color: #718096;
            margin-bottom: 15px;
          }
          
          .innovation-description {
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 15px;
            color: #4a5568;
          }
          
          .innovation-details {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 15px;
          }
          
          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-bottom: 10px;
          }
          
          .detail-item:last-child {
            margin-bottom: 0;
          }
          
          .detail-label {
            font-size: 0.8rem;
            color: #718096;
          }
          
          .detail-value {
            font-size: 0.95rem;
            font-weight: 500;
          }
          
          .readiness-meter {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .meter-bar {
            flex: 1;
            height: 6px;
            background: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
          }
          
          .meter-fill {
            height: 100%;
            background: #4299e1;
            border-radius: 3px;
          }
          
          .meter-label {
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
          }
          
          .innovation-features {
            margin-bottom: 15px;
          }
          
          .innovation-features h4 {
            font-size: 0.9rem;
            margin-bottom: 8px;
            color: #2d3748;
          }
          
          .innovation-features ul {
            padding-left: 20px;
            margin: 0;
          }
          
          .innovation-features li {
            font-size: 0.85rem;
            margin-bottom: 5px;
            color: #4a5568;
          }
          
          .innovation-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
          }
          
          .release-date {
            font-size: 0.85rem;
            color: #718096;
          }
          
          .video-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: #4299e1;
            color: white;
            border-radius: 6px;
            font-size: 0.85rem;
          }
          
          .video-button:hover {
            background: #3182ce;
          }
          
          /* Automation Section Styles */
          .automation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
          }
          
          .automation-card {
            background: #f8fafc;
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .automation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
          }
          
          .automation-header {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .sector-badge {
            display: inline-block;
            padding: 4px 8px;
            background: #4299e1;
            color: white;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-bottom: 10px;
          }
          
          .automation-title {
            font-size: 1.1rem;
            margin-bottom: 5px;
            color: #2d3748;
          }
          
          .provider {
            font-size: 0.9rem;
            color: #718096;
          }
          
          .automation-image {
            height: 180px;
            overflow: hidden;
          }
          
          .automation-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .automation-content {
            padding: 20px;
          }
          
          .automation-description {
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 15px;
            color: #4a5568;
          }
          
          .metrics-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .metric {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .metric-label {
            font-size: 0.8rem;
            color: #718096;
          }
          
          .metric-value {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .progress-bar {
            flex: 1;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
          }
          
          .progress-fill {
            height: 100%;
            background: #4299e1;
            border-radius: 4px;
          }
          
          .automation-footer {
            display: flex;
            justify-content: space-between;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            font-size: 0.85rem;
          }
          
          .implementation, .case-studies {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .label {
            color: #718096;
          }
          
          .value {
            font-weight: 500;
            color: #2d3748;
          }
          
          /* Robotics Leaders Section Styles */
          .market-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          
          .summary-card {
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .summary-title {
            font-size: 1rem;
            color: #718096;
            margin-bottom: 10px;
          }
          
          .summary-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 5px;
            color: #2d3748;
          }
          
          .summary-change {
            font-size: 1rem;
            font-weight: 500;
          }
          
          .summary-subtext {
            font-size: 0.85rem;
            color: #718096;
          }
          
          .companies-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          
          .company-card {
            background: #f8fafc;
            border-radius: 10px;
            overflow: hidden;
            transition: all 0.2s ease;
          }
          
          .company-card.expanded {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
          }
          
          .company-header {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 20px;
            cursor: pointer;
          }
          
          .company-header:hover {
            background: #f1f5f9;
          }
          
          .company-logo {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            object-fit: contain;
            background: white;
            padding: 5px;
            border: 1px solid #e2e8f0;
          }
          
          .company-info {
            flex: 1;
          }
          
          .company-name {
            font-size: 1.1rem;
            margin-bottom: 5px;
            color: #2d3748;
          }
          
          .company-specialty {
            font-size: 0.85rem;
            color: #718096;
          }
          
          .company-metrics {
            display: flex;
            gap: 25px;
          }
          
          .expansion-toggle {
            color: #718096;
            font-size: 0.9rem;
          }
          
          .company-details {
            padding: 0 20px 20px;
            border-top: 1px solid #e2e8f0;
          }
          
          .company-description {
            font-size: 0.9rem;
            line-height: 1.6;
            color: #4a5568;
            margin-bottom: 15px;
            margin-top: 15px;
          }
          
          .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            background: #f1f5f9;
            padding: 15px;
            border-radius: 8px;
          }
          
          /* Future Trends Section Styles */
          .trend-timeline {
            margin-bottom: 25px;
          }
          
          .timeline-labels {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 0.9rem;
            color: #718096;
          }
          
          .timeline-track {
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            position: relative;
          }
          
          .timeline-track::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 40%;
            background: linear-gradient(to right, #4299e1, #805ad5);
            border-radius: 2px;
          }
          
          .trends-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
          }
          
          .trend-card {
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .trend-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
          }
          
          .trend-header {
            margin-bottom: 15px;
          }
          
          .trend-title {
            font-size: 1.2rem;
            margin-bottom: 5px;
            color: #2d3748;
          }
          
          .trend-category {
            font-size: 0.85rem;
            color: #718096;
          }
          
          .trend-description {
            font-size: 0.9rem;
            line-height: 1.5;
            color: #4a5568;
            margin-bottom: 15px;
          }
          
          .trend-metrics {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .trend-metric {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 12px;
          }
          
          .impact-meter {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 10px 0;
          }
          
          .disruption-level {
            font-size: 0.85rem;
            font-weight: 500;
            color: #2d3748;
          }
          
          .readiness-level, .adoption-rate {
            font-size: 0.9rem;
            margin: 5px 0;
            color: #2d3748;
          }
          
          .trend-timeframe {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .timeframe-label {
            font-size: 0.9rem;
            color: #718096;
          }
          
          .timeframe-value {
            font-size: 0.9rem;
            font-weight: 500;
            color: #2d3748;
          }
          
          .key-players h4 {
            font-size: 0.95rem;
            margin-bottom: 10px;
            color: #2d3748;
          }
          
          .players-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .player-tag {
            padding: 5px 10px;
            background: #e2e8f0;
            border-radius: 5px;
            font-size: 0.8rem;
            color: #4a5568;
          }
          
          /* Autonomous Vehicles Section Styles */
          .vehicles-section {
            display: flex;
            flex-direction: column;
          }
          
          .vehicles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;
          }
          
          .vehicle-card {
            background: #f8fafc;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .vehicle-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
          }
          
          .vehicle-image {
            position: relative;
            height: 180px;
            overflow: hidden;
          }
          
          .vehicle-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .autonomy-level {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
          }
          
          .vehicle-content {
            padding: 20px;
          }
          
          .vehicle-type {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.85rem;
            color: #718096;
            margin-bottom: 10px;
          }
          
          .vehicle-name {
            font-size: 1.2rem;
            margin-bottom: 5px;
            color: #2d3748;
          }
          
          .vehicle-manufacturer {
            font-size: 0.9rem;
            color: #718096;
            margin-bottom: 10px;
          }
          
          .vehicle-summary {
            font-size: 0.9rem;
            line-height: 1.5;
            color: #4a5568;
            margin-bottom: 15px;
          }
          
          .vehicle-stats {
            display: flex;
            gap: 20px;
          }
          
          .stat {
            font-size: 0.85rem;
          }
          
          .stat-label {
            color: #718096;
            margin-right: 5px;
          }
          
          .stat-value {
            font-weight: 500;
            color: #2d3748;
          }
          
          .vehicle-detail {
            display: flex;
            flex-direction: column;
          }
          
          .back-button {
            align-self: flex-start;
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 6px;
            color: #4299e1;
            font-size: 0.9rem;
            margin-bottom: 20px;
          }
          
          .back-button:hover {
            background: #f7fafc;
          }
          
          .detail-header {
            margin-bottom: 20px;
          }
          
          .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          
          @media (max-width: 1024px) {
            .detail-grid {
              grid-template-columns: 1fr;
            }
          }
          
          .detail-image {
            position: relative;
          }
          
          .detail-image img {
            width: 100%;
            height: auto;
            border-radius: 10px;
          }
          
          .vehicle-type-tag {
            position: absolute;
            bottom: 15px;
            left: 15px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
          }
          
          .detail-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .vehicle-description {
            font-size: 0.95rem;
            line-height: 1.6;
            color: #4a5568;
          }
          
          .vehicle-specs {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 15px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .spec-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          
          .spec-label {
            font-size: 0.8rem;
            color: #718096;
          }
          
          .spec-value {
            font-size: 0.9rem;
            font-weight: 500;
            color: #2d3748;
          }
          
          .sensor-suite h4, .key-features h4 {
            font-size: 1rem;
            margin-bottom: 10px;
            color: #2d3748;
          }
          
          .sensor-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .sensor-tag {
            padding: 5px 10px;
            background: #e2e8f0;
            border-radius: 5px;
            font-size: 0.85rem;
            color: #4a5568;
          }
          
          .key-features ul {
            padding-left: 20px;
            margin: 0;
          }
          
          .key-features li {
            margin-bottom: 5px;
            font-size: 0.9rem;
            color: #4a5568;
          }
          
          /* Footer Styles */
          .dashboard-footer {
            grid-area: footer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            margin-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 0.9rem;
            color: #718096;
          }
          
          .footer-info p {
            margin: 0;
          }
          
          .footer-links {
            display: flex;
            gap: 20px;
          }
          
          .footer-links a {
            color: #718096;
            text-decoration: none;
          }
          
          .footer-links a:hover {
            color: #4299e1;
            text-decoration: underline;
          }
          
          /* Responsive Styles */
          @media (max-width: 1200px) {
            .robotics-dashboard {
              grid-template-columns: 220px 1fr;
            }
          }
          
          @media (max-width: 991px) {
            .robotics-dashboard {
              grid-template-columns: 1fr;
              grid-template-areas:
                "header"
                "sidebar"
                "main"
                "footer";
            }
            
            .sidebar {
              padding: 15px;
            }
            
            .main-nav {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            
            .timeline {
              padding-top: 15px;
              margin-top: 15px;
            }
          }
          
          @media (max-width: 768px) {
            .dashboard-header {
              flex-direction: column;
              gap: 15px;
              padding: 15px;
            }
            
            .header-actions {
              width: 100%;
              flex-direction: column;
              gap: 15px;
            }
            
            .search-container {
              width: 100%;
            }
            
            .header-buttons {
              width: 100%;
              justify-content: space-between;
            }
            
            .filter-controls {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
            
            .filter-buttons {
              width: 100%;
              overflow-x: auto;
              padding-bottom: 5px;
            }
            
            .company-header {
              flex-wrap: wrap;
            }
            
            .company-metrics {
              width: 100%;
              margin-top: 10px;
              justify-content: space-between;
            }
            
            .trend-metrics {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
}

// Helper components for missing icons
const FaHeartbeat = (props) => {
  return <span className="icon" {...props}>❤️</span>;
};

const FaFlask = (props) => {
  return <span className="icon" {...props}>🧪</span>;
};

const FaShield = (props) => {
  return <span className="icon" {...props}>🛡️</span>;
};

const FaRocket = (props) => {
  return <span className="icon" {...props}>🚀</span>;
};

const FaTruck = (props) => {
  return <span className="icon" {...props}>🚚</span>;
};

const FaShip = (props) => {
  return <span className="icon" {...props}>🚢</span>;
};

export default RoboticsDashboard;
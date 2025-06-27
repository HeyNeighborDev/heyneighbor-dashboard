// @ts-nocheck
import React, { useState, useEffect } from 'react';
import ResidentPlatform from './ResidentPlatform'; // Adjust path as needed
import HeyNeighborLogo from './Assets/heyneighbor-logo.svg';
import PoolPartyImage from './Assets/pool-party.png';
import NavySofaImage from './Assets/navy-sofa.png';
import { 
  Users, 
  AlertTriangle, 
  Calendar,
  MessageSquare,
  MessageCircle,
  Shield,
  Bell,
  Search,
  Plus,
  MoreHorizontal,
  Home,
  Settings,
  BarChart3,
  UserPlus,
  Send,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  Activity,
  Phone,
  Mail,
  MapPin,
  X,
  ChevronRight,
  Star,
  Heart,
  Camera,
  FileText,
  Video,
  Upload,
  Edit3,
  Trash2,
  TrendingUp, 
  Brain, 
  Zap,
  ChevronLeft,
  Share2,
} from 'lucide-react';

// Custom Nora SVG Icon Component
const NoraIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Circle - AI Core */}
    <circle cx="12" cy="12" r="10" fill="url(#noraGradient)" stroke="currentColor" strokeWidth="0.5"/>
    
    {/* Neural Network Pattern */}
    <circle cx="8" cy="8" r="1.5" fill="rgba(255,255,255,0.9)"/>
    <circle cx="16" cy="8" r="1.5" fill="rgba(255,255,255,0.9)"/>
    <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,1)"/>
    <circle cx="7" cy="16" r="1" fill="rgba(255,255,255,0.8)"/>
    <circle cx="17" cy="16" r="1" fill="rgba(255,255,255,0.8)"/>
    
    {/* Connection Lines */}
    <path d="M8 8 L12 12 L16 8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none"/>
    <path d="M12 12 L7 16" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none"/>
    <path d="M12 12 L17 16" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none"/>
    
    {/* AI Brain Waves */}
    <path d="M4 6 Q6 4 8 6 T12 6" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none"/>
    <path d="M12 6 Q14 4 16 6 T20 6" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none"/>
    <path d="M4 18 Q6 20 8 18 T12 18" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none"/>
    <path d="M12 18 Q14 20 16 18 T20 18" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none"/>
    
    {/* Gradient Definition */}
    <defs>
      <linearGradient id="noraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea"/>
        <stop offset="100%" stopColor="#764ba2"/>
      </linearGradient>
    </defs>
  </svg>
);

// Add these functions after NoraIcon component
const generateCommunityHealthData = (timeRange) => {
  const periods = timeRange === '30d' ? 30 : timeRange === '90d' ? 12 : 12;
  const data = [];
  
  for (let i = 0; i < periods; i++) {
    const baseScore = 75 + Math.random() * 15; // Base 75-90%
    
    // Add realistic events that affect community health
    let eventBoost = 0;
    let eventDescription = '';
    
    // Coffee hours boost (recent periods)
    if (timeRange === '30d' && i >= 20) {
      eventBoost = 5 + Math.random() * 3;
      eventDescription = 'Coffee hours launched';
    }
    
    // Pool maintenance dip
    if (timeRange === '30d' && i >= 10 && i <= 15) {
      eventBoost = -4;
      eventDescription = 'Pool maintenance issues';
    }
    
    // New resident move-ins boost
    if (i % 8 === 0) {
      eventBoost = 2;
      eventDescription = 'New residents welcomed';
    }
    
    const finalScore = Math.min(95, Math.max(65, baseScore + eventBoost));
    
    data.push({
      period: i + 1,
      score: finalScore,
      date: timeRange === '30d' 
        ? new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
        : new Date(Date.now() - (periods - i - 1) * 30 * 24 * 60 * 60 * 1000),
      components: {
        satisfaction: 70 + Math.random() * 25,
        safety: 80 + Math.random() * 15,
        engagement: 60 + Math.random() * 35,
        maintenance: 75 + Math.random() * 20
      },
      events: eventDescription ? [eventDescription] : [],
      isNoraImpacted: eventBoost > 3
    });
  }
  
  return data;
};

// Updated Community Health Trends Component
const CommunityHealthTrends = ({ analyticsTimeRange, setAnalyticsTimeRange }) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const healthData = generateCommunityHealthData(analyticsTimeRange);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 relative">
      <div className="absolute top-4 right-4">
        <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-purple-700 font-medium">Nora analyzing</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Community Health Trends</h2>
          <p className="text-sm text-gray-500 mt-1">AI-powered performance analysis and predictions</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setAnalyticsTimeRange('30d')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              analyticsTimeRange === '30d' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            30d
          </button>
          <button 
            onClick={() => setAnalyticsTimeRange('90d')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              analyticsTimeRange === '90d' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            90d
          </button>
          <button 
            onClick={() => setAnalyticsTimeRange('1y')}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
              analyticsTimeRange === '1y' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            1y
          </button>
        </div>
      </div>
      
      {/* Interactive Chart */}
      <div 
        className="h-52 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-gray-100 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredBar(null)}
      >
        
        {/* Chart Bars */}
        <div className="absolute inset-4">
          <div className="flex items-end justify-between h-full">
            {healthData.map((dataPoint, index) => (
              <div
                key={index}
                className={`${dataPoint.isNoraImpacted ? 'bg-green-500' : 'bg-blue-400'} opacity-70 rounded-t-sm hover:opacity-100 transition-all cursor-pointer relative`}
                style={{ 
                  width: analyticsTimeRange === '30d' ? '8px' : '16px',
                  height: `${(dataPoint.score / 100) * 100}%`,
                  marginRight: '2px'
                }}
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {hoveredBar === index && (
                  <div 
                    className="fixed bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50 pointer-events-none"
                    style={{
                      left: mousePosition.x + 10,
                      top: mousePosition.y - 10,
                      transform: 'translateY(-100%)'
                    }}
                  >
                    <div className="font-bold">{dataPoint.score.toFixed(1)}% Health Score</div>
                    <div className="text-gray-300">
                      {analyticsTimeRange === '30d' 
                        ? dataPoint.date.toLocaleDateString()
                        : `Period ${dataPoint.period}`}
                    </div>
                    {dataPoint.events.length > 0 && (
                      <div className="text-yellow-300 mt-1">{dataPoint.events[0]}</div>
                    )}
                    <div className="mt-1 text-xs">
                      <div>Satisfaction: {dataPoint.components.satisfaction.toFixed(0)}%</div>
                      <div>Safety: {dataPoint.components.safety.toFixed(0)}%</div>
                      <div>Engagement: {dataPoint.components.engagement.toFixed(0)}%</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Chart Legend */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>
          <span className="font-medium">Community Health Score:</span> Combination of satisfaction, safety, engagement & maintenance metrics
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded"></div>
            <span>Baseline</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded"></div>
            <span>AI Enhanced</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagementDashboard = () => {
  const [greeting, setGreeting] = useState('Good morning, Sarah! ☀️');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activityFilter, setActivityFilter] = useState('all');
  const [showAddResident, setShowAddResident] = useState(false);
  const [residentFilter, setResidentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState(null);
  const [showResidentProfile, setShowResidentProfile] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [safetyFilter, setSafetyFilter] = useState('all');
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showEditIncidentModal, setShowEditIncidentModal] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [updateText, setUpdateText] = useState('');
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');
  const [escalationLevel, setEscalationLevel] = useState('supervisor');
  const [showReportModal, setShowReportModal] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    type: 'maintenance',
    priority: 'medium',
    location: '',
    description: '',
    reportedBy: 'Property Manager'
  });
  const [newResident, setNewResident] = useState({
    name: '',
    unit: '',
    building: 'Building A',
    email: '',
    phone: '',
    moveInDate: '',
    leaseEndDate: '',
    emergencyContact: '',
    notes: ''
  });
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastData, setBroadcastData] = useState({
    title: '',
    message: '',
    recipients: 'all',
    buildings: [],
    deliveryMethods: ['email'],
    priority: 'normal',
    scheduleType: 'now',
    scheduledDate: '',
    scheduledTime: '',
    attachImage: false,
    imageFile: null
  });
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    maxAttendees: '',
    rsvpRequired: true,
    category: 'social'
  });

  // Events page state
  const [eventsFilter, setEventsFilter] = useState('all');
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  // Communications page state
  const [commFilter, setCommFilter] = useState('center');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showDirectMessageModal, setShowDirectMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showMessageDetailModal, setShowMessageDetailModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);
  // Navigation states
const [searchQuery, setSearchQuery] = useState('');
const [showNotifications, setShowNotifications] = useState(false);
const [showProfileMenu, setShowProfileMenu] = useState(false);
// Analytics Interactive States  
const [selectedKpi, setSelectedKpi] = useState(null);
const [showKpiModal, setShowKpiModal] = useState(false);
const [hoveredMetric, setHoveredMetric] = useState(null);
const [analyticsTimeRange, setAnalyticsTimeRange] = useState('30d');
const [analyticsTab, setAnalyticsTab] = useState('executive');
// Nora AI Interactive States
const [showNoraChat, setShowNoraChat] = useState(false);
const [noraMessages, setNoraMessages] = useState([
  {
    id: 1,
    type: 'nora',
    message: "Hi! I'm Nora, your AI property assistant. I've been analyzing your community data and noticed some interesting patterns. How can I help you today?",
    timestamp: new Date(),
    context: 'greeting'
  }
]);
const [noraNotifications, setNoraNotifications] = useState([
  {
    id: 1,
    type: 'urgent',
    title: 'Sarah Chen Intervention Needed',
    message: 'Renewal probability dropped to 25.3%. Recommend scheduling 1-on-1 within 48 hours.',
    timestamp: new Date(),
    seen: false,
    action: 'schedule_meeting'
  }
]);
const [noraLearning, setNoraLearning] = useState({
  interactions: 0,
  preferences: ['community_health', 'renewal_focus'],
  lastContext: 'dashboard_view',
  userPersonality: 'data_driven'
});
// Settings Page States
const [settingsTab, setSettingsTab] = useState('property');
const [propertySettings, setPropertySettings] = useState({
  name: 'Sunset Gardens Apartments',
  type: 'apartment',
  address: '123 Main Street, Atlanta, GA 30309',
  totalUnits: '120',
  yearBuilt: '2018',
  officeHours: 'Monday-Friday 9AM-6PM, Saturday 10AM-4PM',
  emergencyContact: '(555) 123-4567',
  quietHours: '10:00 PM - 8:00 AM',
  petPolicy: 'Pets welcome with deposit. 2 pet maximum, weight limit 50lbs each.',
  guestPolicy: 'Guests welcome for up to 14 consecutive days. Overnight parking requires permit.'
});
const [unitTypes, setUnitTypes] = useState([
  { type: 'Studio', sqft: 650, bedrooms: 0, bathrooms: 1, rent: 1200, available: 2, total: 15 },
  { type: '1 Bedroom', sqft: 850, bedrooms: 1, bathrooms: 1, rent: 1450, available: 5, total: 45 },
  { type: '2 Bedroom', sqft: 1200, bedrooms: 2, bathrooms: 2, rent: 1850, available: 3, total: 40 },
  { type: '3 Bedroom', sqft: 1450, bedrooms: 3, bathrooms: 2, rent: 2200, available: 1, total: 20 }
]);
const [amenities, setAmenities] = useState([
  { name: 'Swimming Pool', icon: '🏊', enabled: true },
  { name: 'Fitness Center', icon: '💪', enabled: true },
  { name: 'Parking Garage', icon: '🚗', enabled: true },
  { name: 'Pet Park', icon: '🐕', enabled: false },
  { name: 'Business Center', icon: '💼', enabled: true },
  { name: 'Rooftop Deck', icon: '🏙️', enabled: true }
]);
const [noraSettings, setNoraSettings] = useState({
  personality: 'Friendly & Casual',
  responseSpeed: 'thoughtful',
  confidenceThreshold: 75,
  learningEnabled: true,
  autoActions: {
    scheduleFollowups: true,
    sendReminders: true,
    escalateIssues: false,
    generateReports: true
  }
});
const [showAddUnitModal, setShowAddUnitModal] = useState(false);

// User Role State (for management vs resident features)  
const [userRole, setUserRole] = useState('management'); // 'management' or 'resident'

// Social Feed States
const [activeCategory, setActiveCategory] = useState('All Posts');
const [showStoryModal, setShowStoryModal] = useState(false);
const [currentStory, setCurrentStory] = useState(null);
const [showPostComposer, setShowPostComposer] = useState(false);
const [composerType, setComposerType] = useState('');
const [showComments, setShowComments] = useState({});
const [newComment, setNewComment] = useState('');

const [showReportIncidentModal, setShowReportIncidentModal] = useState(false);
const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'maintenance',
    content: ''
  });

  // Amenities Management States
const [amenitiesFilter, setAmenitiesFilter] = useState('all');
const [selectedBooking, setSelectedBooking] = useState(null);
const [showBookingModal, setShowBookingModal] = useState(false);
const [showAmenitySettingsModal, setShowAmenitySettingsModal] = useState(false);
const [selectedAmenityForSettings, setSelectedAmenityForSettings] = useState(null);

// Dynamic greeting system
useEffect(() => {
  const hour = new Date().getHours();
  let newGreeting = 'Good morning, Sarah! ☀️';
  
  if (hour >= 12 && hour < 17) {
    newGreeting = 'Hey there, Sarah! 👋';
  } else if (hour >= 17) {
    newGreeting = 'Good evening, Sarah! 🌙';
  }
  
  setGreeting(newGreeting);
}, []);

  // Mock data
  const communityStats = {
    activeResidents: { count: 342, change: '+12' },
    engagementScore: { score: 8.7, change: '+0.3' },
    incidentReports: { count: 3, change: '-2' },
    safetyRequests: { count: 12, change: '+4' }
  };

  const recentActivity = [
    {
      id: 1,
      type: 'safety',
      title: 'Package theft reported in Building A',
      time: '2 mins ago',
      priority: 'high',
      user: 'Jessica M.',
      status: 'investigating',
      description: 'Resident reported missing package from lobby area.',
      location: 'Building A - Lobby'
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Pool maintenance scheduled for tomorrow',
      time: '15 mins ago',
      priority: 'medium',
      user: 'Maintenance Team',
      status: 'scheduled',
      description: 'Quarterly pool cleaning and chemical balancing.',
      location: 'Community Pool'
    },
    {
      id: 3,
      type: 'community',
      title: 'New resident welcome party planned',
      time: '1 hour ago',
      priority: 'low',
      user: 'Community Team',
      status: 'approved',
      description: 'Welcome party for new residents this month.',
      location: 'Clubhouse'
    },
    {
      id: 4,
      type: 'safety',
      title: 'Security patrol completed - all clear',
      time: '2 hours ago',
      priority: 'low',
      user: 'Security Team',
      status: 'completed',
      description: 'Nightly security patrol completed.',
      location: 'All Buildings'
    }
  ];

  // Mock communications data
  const communicationsData = [
    {
      id: 1,
      title: 'Pool Maintenance Notice',
      type: 'maintenance',
      status: 'delivered',
      preview: 'Scheduled pool cleaning and maintenance this weekend.',
      recipients: 342,
      deliveryMethod: 'Email + SMS',
      openRate: 87.6,
      sentBy: 'Property Manager',
      sentDate: '6/20/2024 at 10:30:00 AM',
      content: 'The community pool will be closed for maintenance this weekend from Saturday 8 AM to Sunday 6 PM. We will be performing deep cleaning, chemical balancing, and equipment inspections. We apologize for any inconvenience.'
    },
    {
      id: 2,
      title: 'Emergency - Water Main Break',
      type: 'emergency',
      status: 'delivered',
      preview: 'Water service will be interrupted for approximately 4 hours.',
      recipients: 120,
      deliveryMethod: 'All Channels',
      openRate: 95.8,
      sentBy: 'Property Manager',
      sentDate: '6/20/2024 at 8:15:00 AM',
      content: 'URGENT: Water main break on Oak Street will affect water service to Building A and B from 10 AM to 2 PM today. Emergency water will be provided in the lobby. We will update you as repairs progress.'
    },
    {
      id: 3,
      title: 'Summer BBQ Event Invitation',
      type: 'event',
      status: 'delivered',
      preview: 'Join us for our annual summer BBQ on July 4th!',
      recipients: 342,
      deliveryMethod: 'Email',
      openRate: 75.7,
      sentBy: 'Community Team',
      sentDate: '6/19/2024 at 4:45:00 PM',
      content: 'You are invited to our annual Summer BBQ celebration on July 4th starting at 3 PM at the community pool area. Food, drinks, and entertainment will be provided. Please RSVP by June 30th.'
    },
    {
      id: 4,
      title: 'Parking Policy Reminder',
      type: 'administrative',
      status: 'scheduled',
      preview: 'Reminder about guest parking regulations.',
      recipients: 203,
      deliveryMethod: 'Email',
      openRate: 0,
      sentBy: 'Property Manager',
      sentDate: '6/22/2024 at 9:00:00 AM',
      content: 'Reminder: All guest vehicles must be registered at the front desk and display a visitor pass. Unregistered vehicles may be towed at owner expense. Please inform your guests of this policy.'
    }
  ];

  const announcementsData = [
    {
      id: 1,
      title: 'Pool Hours Extended for Summer',
      content: 'Great news! Pool hours are now extended through Labor Day. New hours: 6 AM - 10 PM daily.',
      date: '6/19/2024',
      priority: 'medium',
      recipients: 342,
      engagement: 76,
      views: 298,
      likes: 45,
      category: 'amenities'
    },
    {
      id: 2,
      title: 'Parking Policy Reminder',
      content: 'Please remember to register all vehicles with management. Unregistered vehicles may be towed.',
      date: '6/18/2024',
      priority: 'high',
      recipients: 203,
      engagement: 65,
      views: 187,
      likes: 12,
      category: 'policy'
    },
    {
      id: 3,
      title: 'New Fitness Equipment Installed',
      content: 'Check out our new cardio equipment in the fitness center! Open 24/7 for residents.',
      date: '6/15/2024',
      priority: 'low',
      recipients: 342,
      engagement: 82,
      views: 256,
      likes: 67,
      category: 'amenities'
    }
  ];

  const templatesData = [
    {
      id: 1,
      name: 'Maintenance Notification',
      description: 'Standard template for maintenance announcements',
      category: 'maintenance',
      usageCount: 45,
      lastUsed: '6/20/2024',
      content: 'We will be performing maintenance on [ITEM] on [DATE] from [START_TIME] to [END_TIME]. This may cause [EXPECTED_IMPACT]. We apologize for any inconvenience and appreciate your patience.'
    },
    {
      id: 2,
      name: 'Event Invitation',
      description: 'Template for community event invitations',
      category: 'events',
      usageCount: 23,
      lastUsed: '6/19/2024',
      content: 'You are invited to [EVENT_NAME] on [DATE] at [TIME] in [LOCATION]. [EVENT_DESCRIPTION]. Please RSVP by [RSVP_DATE]. We look forward to seeing you there!'
    },
    {
      id: 3,
      name: 'Payment Reminder',
      description: 'Monthly payment reminder template',
      category: 'administrative',
      usageCount: 67,
      lastUsed: '6/18/2024',
      content: 'This is a friendly reminder that your monthly payment of $[AMOUNT] is due on [DUE_DATE]. Please submit payment through the resident portal or contact the office if you have any questions.'
    },
    {
      id: 4,
      name: 'Welcome New Resident',
      description: 'Welcome message for new community members',
      category: 'administrative',
      usageCount: 12,
      lastUsed: '6/17/2024',
      content: 'Welcome to [COMMUNITY_NAME]! We are excited to have you as part of our community. Your move-in date is [DATE]. Please contact the office to schedule your orientation and key pickup.'
    },
    {
      id: 5,
      name: 'Safety Alert',
      description: 'Emergency safety notification template',
      category: 'safety',
      usageCount: 8,
      lastUsed: '6/16/2024',
      content: 'SAFETY ALERT: [INCIDENT_TYPE] reported in [LOCATION]. Please [ACTION_REQUIRED]. If you see anything suspicious, contact security immediately at [PHONE]. Your safety is our priority.'
    },
    {
      id: 6,
      name: 'Policy Update',
      description: 'Template for community policy updates',
      category: 'policy',
      usageCount: 34,
      lastUsed: '6/15/2024',
      content: 'Important policy update regarding [POLICY_AREA]. Effective [DATE], [NEW_POLICY]. This change is being implemented to [REASON]. Please review the updated community guidelines.'
    }
  ];

  // Amenities booking data
const amenityBookings = [
  {
    id: 1,
    amenity: 'Pool Deck',
    resident: 'Sarah Martinez',
    unit: 'A-301',
    date: '2024-06-25',
    startTime: '14:00',
    endTime: '16:00',
    status: 'pending',
    requestedDate: '2024-06-20T10:30:00',
    partySize: 6,
    specialRequests: 'Birthday party setup',
    contact: 'sarah.martinez@email.com'
  },
  {
    id: 2,
    amenity: 'Fitness Center',
    resident: 'Mike Rodriguez',
    unit: 'B-205',
    date: '2024-06-24',
    startTime: '06:00',
    endTime: '07:00',
    status: 'approved',
    requestedDate: '2024-06-18T09:15:00',
    partySize: 1,
    specialRequests: 'None',
    contact: 'mike.rodriguez@email.com'
  },
  {
    id: 3,
    amenity: 'Community Lounge',
    resident: 'Emily Davis',
    unit: 'B-308',
    date: '2024-06-26',
    startTime: '19:00',
    endTime: '22:00',
    status: 'approved',
    requestedDate: '2024-06-19T14:20:00',
    partySize: 12,
    specialRequests: 'Book club meeting - need tables arranged',
    contact: 'emily.davis@email.com'
  },
  {
    id: 4,
    amenity: 'Rooftop Terrace',
    resident: 'David Kim',
    unit: 'C-102',
    date: '2024-06-28',
    startTime: '18:00',
    endTime: '21:00',
    status: 'pending',
    requestedDate: '2024-06-21T16:45:00',
    partySize: 8,
    specialRequests: 'Anniversary dinner - need romantic lighting',
    contact: 'david.kim@email.com'
  },
  {
    id: 5,
    amenity: 'Game Room',
    resident: 'Lisa Chen',
    unit: 'A-205',
    date: '2024-06-23',
    startTime: '15:00',
    endTime: '17:00',
    status: 'declined',
    requestedDate: '2024-06-22T11:30:00',
    partySize: 15,
    specialRequests: 'Kids birthday party',
    contact: 'lisa.chen@email.com',
    declineReason: 'Exceeds maximum capacity for game room'
  }
];

const amenitySettings = [
  {
    name: 'Pool Deck',
    icon: '🏊‍♀️',
    maxCapacity: 8,
    bookingWindow: 14, // days in advance
    maxDuration: 4, // hours
    availableHours: '10:00-20:00',
    requiresApproval: true,
    bookingFee: 150, // Updated realistic fee
    rules: ['No glass containers', 'Music volume limits apply', 'Children must be supervised']
  },
  {
    name: 'Fitness Center',
    icon: '💪',
    maxCapacity: 6,
    bookingWindow: 7,
    maxDuration: 2,
    availableHours: '05:00-23:00',
    requiresApproval: false,
    bookingFee: 0, // Usually free for residents
    rules: ['Wipe down equipment after use', 'No personal trainers without permission', 'Proper workout attire required']
  },
  {
    name: 'Community Lounge',
    icon: '🛋️',
    maxCapacity: 20,
    bookingWindow: 30,
    maxDuration: 6,
    availableHours: '08:00-22:00',
    requiresApproval: true,
    bookingFee: 300, // Premium clubhouse pricing like Bell Alpharetta
    rules: ['No smoking', 'Clean up after events', 'Decorations must be approved']
  },
  {
    name: 'Rooftop Terrace',
    icon: '🌆',
    maxCapacity: 15,
    bookingWindow: 21,
    maxDuration: 4,
    availableHours: '16:00-22:00',
    requiresApproval: true,
    bookingFee: 250, // Premium outdoor space
    rules: ['Weather dependent', 'No open flames', 'Music cutoff at 10 PM']
  },
  {
    name: 'Game Room',
    icon: '🎮',
    maxCapacity: 12,
    bookingWindow: 14,
    maxDuration: 3,
    availableHours: '10:00-22:00',
    requiresApproval: true,
    bookingFee: 75, // Moderate fee for game room
    rules: ['Adult supervision required for children', 'No food or drinks near equipment', 'Report any damage immediately']
  }
];

  const directMessagesData = [
    {
      id: 1,
      resident: { name: 'Jessica Martinez', unit: 'A-301', building: 'Building A', avatar: 'JM' },
      lastMessage: 'Thank you for clarifying the new pool hours!',
      lastActivity: '6/20/2024',
      unreadCount: 0,
      status: 'resolved'
    },
    {
      id: 2,
      resident: { name: 'Michael Chen', unit: 'B-205', building: 'Building B', avatar: 'MC' },
      lastMessage: 'I will check with the towing company about the fees.',
      lastActivity: '6/20/2024',
      unreadCount: 1,
      status: 'active'
    },
    {
      id: 3,
      resident: { name: 'Sarah Johnson', unit: 'C-102', building: 'Building C', avatar: 'SJ' },
      lastMessage: 'The issue has been resolved, thank you.',
      lastActivity: '6/19/2024',
      unreadCount: 0,
      status: 'closed'
    },
    {
      id: 4,
      resident: { name: 'Emily Davis', unit: 'B-308', building: 'Building B', avatar: 'ED' },
      lastMessage: 'When can I schedule a time to discuss renewal terms?',
      lastActivity: '6/19/2024',
      unreadCount: 1,
      status: 'pending'
    }
  ];

  const deliveryReportsData = [
    {
      id: 1,
      messageTitle: 'Pool Maintenance Notice',
      sentDate: '6/20/2024 at 10:30:00 AM',
      stats: { sent: 342, delivered: 340, opened: 298, clicked: 45 },
      openRate: 87.6,
      clickRate: 15.1,
      deliveryRate: 99.4
    },
    {
      id: 2,
      messageTitle: 'Emergency - Water Main Break',
      sentDate: '6/20/2024 at 8:15:00 AM',
      stats: { sent: 120, delivered: 120, opened: 115, clicked: 28 },
      openRate: 95.8,
      clickRate: 24.3,
      deliveryRate: 100
    },
    {
      id: 3,
      messageTitle: 'Summer BBQ Event',
      sentDate: '6/19/2024 at 4:45:00 PM',
      stats: { sent: 342, delivered: 338, opened: 256, clicked: 89 },
      openRate: 75.7,
      clickRate: 34.8,
      deliveryRate: 98.8
    }
  ];

  // Mock events data
  const eventsData = [
    {
      id: 1,
      title: 'Summer BBQ & Pool Party',
      date: '2024-07-15',
      time: '15:00',
      endTime: '20:00',
      location: 'Community Pool & Grilling Area',
      description: 'Join us for our annual summer BBQ with grilled food, music, and pool activities. Perfect for families and a great way to meet your neighbors!',
      category: 'social',
      status: 'upcoming',
      maxAttendees: 100,
      currentAttendees: 67,
      rsvpRequired: true,
      organizer: 'Community Team',
      createdBy: 'Property Manager',
      createdDate: '2024-06-15T10:00:00',
      image: null,
      attendees: [
        { name: 'Jessica Martinez', unit: 'A-301', rsvpDate: '2024-06-16T14:30:00' },
        { name: 'Michael Chen', unit: 'B-205', rsvpDate: '2024-06-16T15:45:00' },
        { name: 'Sarah Johnson', unit: 'C-102', rsvpDate: '2024-06-17T09:20:00' }
      ]
    },
    {
      id: 2,
      title: 'Yoga in the Garden',
      date: '2024-06-25',
      time: '07:00',
      endTime: '08:00',
      location: 'Community Garden',
      description: 'Start your day with peaceful yoga among the flowers. All levels welcome. Please bring your own mat.',
      category: 'wellness',
      status: 'upcoming',
      maxAttendees: 20,
      currentAttendees: 14,
      rsvpRequired: true,
      organizer: 'Wellness Committee',
      createdBy: 'Jessica Martinez',
      createdDate: '2024-06-10T12:00:00',
      image: null,
      attendees: []
    },
    {
      id: 3,
      title: 'Building A Fire Safety Training',
      date: '2024-06-22',
      time: '10:00',
      endTime: '11:30',
      location: 'Building A - Community Room',
      description: 'Mandatory fire safety training for all Building A residents. Learn about evacuation procedures and fire prevention.',
      category: 'safety',
      status: 'upcoming',
      maxAttendees: 50,
      currentAttendees: 23,
      rsvpRequired: true,
      organizer: 'Safety Team',
      createdBy: 'Property Manager',
      createdDate: '2024-06-05T16:00:00',
      image: null,
      attendees: []
    },
    {
      id: 4,
      title: 'Wine Tasting Evening',
      date: '2024-06-18',
      time: '19:00',
      endTime: '21:00',
      location: 'Clubhouse',
      description: 'An elegant wine tasting event featuring local wines and artisanal cheeses. Ages 21+ only.',
      category: 'social',
      status: 'completed',
      maxAttendees: 30,
      currentAttendees: 28,
      rsvpRequired: true,
      organizer: 'Social Committee',
      createdBy: 'Property Manager',
      createdDate: '2024-05-20T14:00:00',
      image: null,
      attendees: []
    },
    {
      id: 5,
      title: 'Kids Movie Night: Moana',
      date: '2024-07-05',
      time: '19:30',
      endTime: '21:30',
      location: 'Clubhouse',
      description: 'Family-friendly movie night with popcorn and snacks. Perfect for kids and parents to enjoy together.',
      category: 'family',
      status: 'upcoming',
      maxAttendees: 40,
      currentAttendees: 31,
      rsvpRequired: true,
      organizer: 'Family Committee',
      createdBy: 'Emily Davis',
      createdDate: '2024-06-12T11:00:00',
      image: null,
      attendees: []
    },
    {
      id: 6,
      title: 'Monthly Maintenance Meeting',
      date: '2024-06-30',
      time: '14:00',
      endTime: '15:00',
      location: 'Building B - Conference Room',
      description: 'Monthly meeting to discuss maintenance issues, upcoming projects, and resident concerns.',
      category: 'maintenance',
      status: 'upcoming',
      maxAttendees: 15,
      currentAttendees: 8,
      rsvpRequired: false,
      organizer: 'Maintenance Team',
      createdBy: 'Property Manager',
      createdDate: '2024-06-01T09:00:00',
      image: null,
      attendees: []
    }
  ];

  // Mock safety incidents data
  const safetyIncidents = [
    {
      id: 1,
      incidentId: 'INC-2024-001',
      title: 'Package theft reported in Building A lobby',
      type: 'theft',
      priority: 'high',
      status: 'investigating',
      reportedBy: 'Jessica Martinez',
      reportedDate: '2024-06-20T14:30:00',
      location: 'Building A - Lobby',
      description: 'Resident reported missing package that was delivered this morning. Security camera footage is being reviewed.',
      assignedTo: 'Security Team',
      evidence: [
        { name: 'Security footage', type: 'video', url: '#' },
        { name: 'Delivery confirmation', type: 'document', url: '#' }
      ],
      updates: [
        { date: '2024-06-20T14:30:00', update: 'Initial report filed', by: 'Jessica Martinez' },
        { date: '2024-06-20T15:00:00', update: 'Security team notified', by: 'Property Manager' },
        { date: '2024-06-20T15:30:00', update: 'Reviewing camera footage', by: 'Security Team' }
      ]
    },
    {
      id: 2,
      incidentId: 'INC-2024-002',
      title: 'Broken exterior lighting in parking garage',
      type: 'maintenance',
      priority: 'medium',
      status: 'scheduled',
      reportedBy: 'Michael Chen',
      reportedDate: '2024-06-19T18:45:00',
      location: 'Parking Garage - Level 2',
      description: 'Multiple light fixtures are out, creating dark spots that could be safety hazards.',
      assignedTo: 'Maintenance Team',
      evidence: [
        { name: 'Photos of dark areas', type: 'image', url: '#' }
      ],
      updates: [
        { date: '2024-06-19T18:45:00', update: 'Report submitted', by: 'Michael Chen' },
        { date: '2024-06-19T19:00:00', update: 'Work order created', by: 'Property Manager' },
        { date: '2024-06-20T09:00:00', update: 'Scheduled for repair tomorrow', by: 'Maintenance Team' }
      ]
    },
    {
      id: 3,
      incidentId: 'INC-2024-003',
      title: 'Suspicious person loitering near Building C',
      type: 'security',
      priority: 'high',
      status: 'resolved',
      reportedBy: 'Sarah Johnson',
      reportedDate: '2024-06-18T22:15:00',
      location: 'Building C - Entrance',
      description: 'Unknown individual observed loitering near entrance for extended period.',
      assignedTo: 'Security Team',
      evidence: [
        { name: 'Witness statement', type: 'document', url: '#' },
        { name: 'Security footage', type: 'video', url: '#' }
      ],
      updates: [
        { date: '2024-06-18T22:15:00', update: 'Report received', by: 'Sarah Johnson' },
        { date: '2024-06-18T22:30:00', update: 'Security dispatched', by: 'Security Team' },
        { date: '2024-06-18T23:00:00', update: 'Individual identified as delivery driver', by: 'Security Team' },
        { date: '2024-06-18T23:15:00', update: 'Incident resolved - false alarm', by: 'Security Team' }
      ]
    },
    {
      id: 4,
      incidentId: 'INC-2024-004',
      title: 'Slip and fall incident in lobby',
      type: 'accident',
      priority: 'high',
      status: 'documenting',
      reportedBy: 'Emily Davis',
      reportedDate: '2024-06-17T10:30:00',
      location: 'Building B - Main Lobby',
      description: 'Elderly resident slipped on wet floor. Minor injuries reported. Ambulance called as precaution.',
      assignedTo: 'Property Manager',
      evidence: [
        { name: 'Incident photos', type: 'image', url: '#' },
        { name: 'Medical report', type: 'document', url: '#' },
        { name: 'Witness statements', type: 'document', url: '#' }
      ],
      updates: [
        { date: '2024-06-17T10:30:00', update: 'Incident occurred', by: 'Emily Davis' },
        { date: '2024-06-17T10:35:00', update: 'Ambulance called', by: 'Front Desk' },
        { date: '2024-06-17T11:00:00', update: 'Resident released from hospital', by: 'Property Manager' },
        { date: '2024-06-17T14:00:00', update: 'Insurance notified', by: 'Property Manager' }
      ]
    },
    {
      id: 5,
      incidentId: 'INC-2024-005',
      title: 'Fire alarm malfunction in Building A',
      type: 'system',
      priority: 'medium',
      status: 'completed',
      reportedBy: 'Automated System',
      reportedDate: '2024-06-16T03:45:00',
      location: 'Building A - Floor 3',
      description: 'False alarm triggered by faulty smoke detector. System reset required.',
      assignedTo: 'Fire Safety Co.',
      evidence: [
        { name: 'System logs', type: 'document', url: '#' },
        { name: 'Technician report', type: 'document', url: '#' }
      ],
      updates: [
        { date: '2024-06-16T03:45:00', update: 'Alarm triggered', by: 'System' },
        { date: '2024-06-16T04:00:00', update: 'Fire department responded', by: 'Emergency Services' },
        { date: '2024-06-16T04:15:00', update: 'False alarm confirmed', by: 'Fire Department' },
        { date: '2024-06-16T09:00:00', update: 'Technician dispatched', by: 'Property Manager' },
        { date: '2024-06-16T11:30:00', update: 'Detector replaced', by: 'Fire Safety Co.' }
      ]
    }
  ];

  // Mock residents data
  const residentsData = [
    {
      id: 1,
      name: 'Jessica Martinez',
      unit: 'A-301',
      building: 'Building A',
      email: 'jessica.martinez@email.com',
      phone: '(555) 123-4567',
      status: 'active',
      moveInDate: '2023-03-15',
      moveOutDate: null,
      predictedMoveOut: '2025-03-15',
      leaseEndDate: '2025-03-14',
      lastActivity: '2 hours ago',
      avatar: 'JM',
      emergencyContact: 'Maria Martinez - (555) 987-6543',
      notes: 'Preferred contact via email. Has one small dog.',
      interests: ['Yoga', 'Community Garden', 'Pet Care', 'Sustainability'],
      groups: ['Pet Owners Club', 'Garden Committee', 'Wellness Group'],
      communityScore: 8.5
    },
    {
      id: 2,
      name: 'Michael Chen',
      unit: 'B-205',
      building: 'Building B',
      email: 'michael.chen@email.com',
      phone: '(555) 234-5678',
      status: 'active',
      moveInDate: '2022-11-20',
      moveOutDate: null,
      predictedMoveOut: '2026-11-20',
      leaseEndDate: '2025-11-19',
      lastActivity: '1 day ago',
      avatar: 'MC',
      emergencyContact: 'Lisa Chen - (555) 876-5432',
      notes: 'Board member. Available for community events.',
      interests: ['Technology', 'Board Games', 'Cooking', 'Community Events'],
      groups: ['Resident Board', 'Tech Club', 'Game Night Organizers'],
      communityScore: 9.2
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      unit: 'C-102',
      building: 'Building C',
      email: 'sarah.johnson@email.com',
      phone: '(555) 345-6789',
      status: 'active',
      moveInDate: '2024-01-10',
      moveOutDate: null,
      predictedMoveOut: '2025-01-10',
      leaseEndDate: '2025-01-09',
      lastActivity: '30 minutes ago',
      avatar: 'SJ',
      emergencyContact: 'David Johnson - (555) 765-4321',
      notes: 'New resident. Recently moved from California.',
      interests: ['Fitness', 'Photography', 'Travel', 'Wine Tasting'],
      groups: ['Fitness Club', 'Photography Group', 'New Residents'],
      communityScore: 7.8
    },
    {
      id: 4,
      name: 'Robert Wilson',
      unit: 'A-105',
      building: 'Building A',
      email: 'robert.wilson@email.com',
      phone: '(555) 456-7890',
      status: 'pending',
      moveInDate: '2024-07-01',
      moveOutDate: null,
      predictedMoveOut: null,
      leaseEndDate: '2025-06-30',
      lastActivity: 'Never',
      avatar: 'RW',
      emergencyContact: 'Jennifer Wilson - (555) 654-3210',
      notes: 'Lease signed, moving in next month.',
      interests: ['Sports', 'Music', 'Grilling'],
      groups: ['Pending Residents'],
      communityScore: null
    },
    {
      id: 5,
      name: 'Emily Davis',
      unit: 'B-308',
      building: 'Building B',
      email: 'emily.davis@email.com',
      phone: '(555) 567-8901',
      status: 'active',
      moveInDate: '2023-08-22',
      moveOutDate: null,
      predictedMoveOut: '2024-12-31',
      leaseEndDate: '2024-08-21',
      lastActivity: '1 week ago',
      avatar: 'ED',
      emergencyContact: 'James Davis - (555) 543-2109',
      notes: 'Works from home. Participates in community garden.',
      interests: ['Gardening', 'Remote Work', 'Meditation', 'Book Club'],
      groups: ['Garden Committee', 'Book Club', 'Remote Workers'],
      communityScore: 8.1
    },
    {
      id: 6,
      name: 'David Thompson',
      unit: 'C-401',
      building: 'Building C',
      email: 'david.thompson@email.com',
      phone: '(555) 678-9012',
      status: 'inactive',
      moveInDate: '2022-05-15',
      moveOutDate: '2024-08-15',
      predictedMoveOut: null,
      leaseEndDate: '2024-05-14',
      lastActivity: '3 months ago',
      avatar: 'DT',
      emergencyContact: 'Susan Thompson - (555) 432-1098',
      notes: 'Extended travel. Unit temporarily vacant.',
      interests: ['Travel', 'Photography', 'Adventure Sports'],
      groups: ['Travel Enthusiasts'],
      communityScore: 6.5
    }
  ];

  const allActivity = [
    ...recentActivity,
    {
      id: 5,
      type: 'maintenance',
      title: 'Elevator inspection completed',
      time: '3 hours ago',
      priority: 'medium',
      user: 'Elevator Services',
      status: 'completed',
      description: 'Monthly elevator safety inspection passed.',
      location: 'Building C'
    },
    {
      id: 6,
      type: 'community',
      title: 'Yoga class registration opened',
      time: '4 hours ago',
      priority: 'low',
      user: 'Recreation Team',
      status: 'active',
      description: 'New morning yoga classes available.',
      location: 'Fitness Center'
    }
  ];

  // Helper functions
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'investigating': return <Eye className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Activity className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'safety': return <Shield className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'safety': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'community': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventCategoryColor = (category) => {
    switch (category) {
      case 'social': return 'bg-blue-100 text-blue-800';
      case 'wellness': return 'bg-green-100 text-green-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'family': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommTypeColor = (type) => {
    switch (type) {
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'administrative': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTemplateTypeColor = (category) => {
    switch (category) {
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'events': return 'bg-green-100 text-green-800';
      case 'administrative': return 'bg-purple-100 text-purple-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'policy': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConversationStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFilteredActivity = () => {
    switch (activityFilter) {
      case 'safety':
        return allActivity.filter(activity => activity.type === 'safety');
      case 'maintenance':
        return allActivity.filter(activity => activity.type === 'maintenance');
      case 'community':
        return allActivity.filter(activity => activity.type === 'community');
      case 'high-priority':
        return allActivity.filter(activity => activity.priority === 'high');
      default:
        return allActivity;
    }
  };

  const getFilteredResidents = () => {
    let filtered = residentsData;
    
    // Filter by status
    if (residentFilter !== 'all') {
      filtered = filtered.filter(resident => resident.status === residentFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resident => 
        resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getFilteredEvents = () => {
    let filtered = eventsData;
    
    // Filter by status/category
    if (eventsFilter !== 'all') {
      if (eventsFilter === 'upcoming') {
        filtered = filtered.filter(event => event.status === 'upcoming');
      } else if (eventsFilter === 'completed') {
        filtered = filtered.filter(event => event.status === 'completed');
      } else {
        filtered = filtered.filter(event => event.category === eventsFilter);
      }
    }
    
    // Filter by search term
    if (eventSearchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(eventSearchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };
  // Settings Helper Functions
  const toggleAmenity = (index) => {
    const newAmenities = [...amenities];
    newAmenities[index].enabled = !newAmenities[index].enabled;
    setAmenities(newAmenities);
  };

  const toggleNoraAction = (actionKey) => {
    setNoraSettings({
      ...noraSettings,
      autoActions: {
        ...noraSettings.autoActions,
        [actionKey]: !noraSettings.autoActions[actionKey]
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResidentStats = () => {
    const total = residentsData.length;
    const active = residentsData.filter(r => r.status === 'active').length;
    const pending = residentsData.filter(r => r.status === 'pending').length;
    const occupancyRate = Math.round((active / total) * 100);
    
    return { total, active, pending, occupancyRate };
  };

  const getEventStats = () => {
    const total = eventsData.length;
    const upcoming = eventsData.filter(e => e.status === 'upcoming').length;
    const completed = eventsData.filter(e => e.status === 'completed').length;
    const totalAttendees = eventsData.reduce((sum, event) => sum + event.currentAttendees, 0);
    const avgAttendance = total > 0 ? Math.round(totalAttendees / total) : 0;
    
    return { total, upcoming, completed, avgAttendance };
  };

  const handleViewProfile = (resident) => {
    setSelectedResident(resident);
    setShowResidentProfile(true);
  };

  const handleSendMessage = (resident) => {
    setSelectedResident(resident);
    setShowMessageModal(true);
    setMessageContent('');
  };

  const handleSendMessageSubmit = () => {
    // Here you would integrate with your notification API
    console.log('Sending message to:', selectedResident?.name);
    console.log('Message:', messageContent);
    setShowMessageModal(false);
    setMessageContent('');
    setSelectedResident(null);
  };

  const getFilteredIncidents = () => {
    switch (safetyFilter) {
      case 'high-priority':
        return safetyIncidents.filter(incident => incident.priority === 'high');
      case 'open':
        return safetyIncidents.filter(incident => ['investigating', 'scheduled', 'documenting'].includes(incident.status));
      case 'resolved':
        return safetyIncidents.filter(incident => ['resolved', 'completed'].includes(incident.status));
      case 'theft':
        return safetyIncidents.filter(incident => incident.type === 'theft');
      case 'security':
        return safetyIncidents.filter(incident => incident.type === 'security');
      case 'maintenance':
        return safetyIncidents.filter(incident => incident.type === 'maintenance');
      default:
        return safetyIncidents;
    }
  };

  const getSafetyStats = () => {
    const total = safetyIncidents.length;
    const open = safetyIncidents.filter(i => ['investigating', 'scheduled', 'documenting'].includes(i.status)).length;
    const highPriority = safetyIncidents.filter(i => i.priority === 'high').length;
    const resolved = safetyIncidents.filter(i => ['resolved', 'completed'].includes(i.status)).length;
    
    return { total, open, highPriority, resolved };
  };

  const getIncidentTypeColor = (type) => {
    switch (type) {
      case 'theft': return 'bg-red-100 text-red-800';
      case 'security': return 'bg-orange-100 text-orange-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'accident': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIncidentStatusIcon = (status) => {
    switch (status) {
      case 'investigating': return <Eye className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'documenting': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleViewIncident = (incident) => {
    setSelectedIncident(incident);
    setShowIncidentModal(true);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEventData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      maxAttendees: event.maxAttendees.toString(),
      rsvpRequired: event.rsvpRequired,
      category: event.category
    });
    setShowEditEventModal(true);
  };

  const handleStatClick = (filterType) => {
    setSafetyFilter(filterType);
  };

  const handleEventStatClick = (filterType) => {
    setEventsFilter(filterType);
  };

  const handleAddUpdate = () => {
    if (updateText.trim()) {
      const newUpdate = {
        date: new Date().toISOString(),
        update: updateText,
        by: 'Property Manager'
      };
      
      
      // In real app, this would update the database
      console.log('Adding update:', newUpdate);
      setUpdateText('');
      setShowAddUpdate(false);
    }
  };

  const handleViewEvidence = (evidence) => {
    setSelectedEvidence(evidence);
    setShowEvidenceModal(true);
  };

  const handleMessageResident = (residentName) => {
    // Find resident and open message modal
    const resident = residentsData.find(r => r.name === residentName);
    if (resident) {
      handleSendMessage(resident);
    }
  };

  const handleEscalate = () => {
    setShowEscalateModal(true);
  };

  const handleEscalateSubmit = () => {
    if (escalationReason.trim() && selectedIncident) {
      const escalationUpdate = {
        date: new Date().toISOString(),
        update: `ESCALATED to ${escalationLevel}: ${escalationReason}`,
        by: 'Property Manager'
      };
      
      // In real app, this would update the incident status and notify higher-ups
      console.log('Escalating incident:', selectedIncident.incidentId);
      console.log('Escalation level:', escalationLevel);
      console.log('Reason:', escalationReason);
      
      setEscalationReason('');
      setEscalationLevel('supervisor');
      setShowEscalateModal(false);
    }
  };

  const handleReportIncident = () => {
    setShowReportIncidentModal(true);
  };

  const handleSubmitIncident = () => {
    if (newIncident.title.trim() && newIncident.description.trim()) {
      const incidentData = {
        ...newIncident,
        id: Date.now(),
        incidentId: `INC-2024-${String(safetyIncidents.length + 1).padStart(3, '0')}`,
        status: 'investigating',
        reportedDate: new Date().toISOString(),
        assignedTo: getAssignedTeam(newIncident.type),
        evidence: [],
        updates: [
          {
            date: new Date().toISOString(),
            update: 'Initial incident report filed',
            by: newIncident.reportedBy
          }
        ]
      };
      
      // In real app, this would create the incident in the database
      console.log('Creating new incident:', incidentData);
      
      // Reset form
      setNewIncident({
        title: '',
        type: 'maintenance',
        priority: 'medium',
        location: '',
        description: '',
        reportedBy: 'Property Manager'
      });
      
      setShowReportModal(false);
    }
  };

  const handleAddResident = () => {
    if (newResident.name.trim() && newResident.email.trim() && newResident.unit.trim()) {
      const residentData = {
        ...newResident,
        id: Date.now(),
        status: 'pending',
        lastActivity: 'Never',
        avatar: newResident.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        interests: [],
        groups: ['New Residents'],
        communityScore: null
      };
      
      // In real app, this would create the resident in the database
      console.log('Creating new resident:', residentData);
      
      // Reset form
      setNewResident({
        name: '',
        unit: '',
        building: 'Building A',
        email: '',
        phone: '',
        moveInDate: '',
        leaseEndDate: '',
        emergencyContact: '',
        notes: ''
      });
      
      setShowAddResident(false);
    }
  };

  const handleCreateEvent = () => {
    if (eventData.title.trim() && eventData.date && eventData.time && eventData.location.trim()) {
      const newEvent = {
        ...eventData,
        id: Date.now(),
        endTime: '',
        status: 'upcoming',
        maxAttendees: parseInt(eventData.maxAttendees) || 50,
        currentAttendees: 0,
        organizer: 'Property Manager',
        createdBy: 'Property Manager',
        createdDate: new Date().toISOString(),
        image: null,
        attendees: []
      };
      
      // In real app, this would create the event in the database
      console.log('Creating new event:', newEvent);
      
      // Reset form
      setEventData({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        maxAttendees: '',
        rsvpRequired: true,
        category: 'social'
      });
      
      setShowCreateEventModal(false);
    }
  };

  const handleUpdateEvent = () => {
    if (eventData.title.trim() && eventData.date && eventData.time && eventData.location.trim()) {
      const updatedEvent = {
        ...selectedEvent,
        ...eventData,
        maxAttendees: parseInt(eventData.maxAttendees) || selectedEvent.maxAttendees
      };
      
      // In real app, this would update the event in the database
      console.log('Updating event:', updatedEvent);
      
      setShowEditEventModal(false);
      setSelectedEvent(null);
    }
  };

  // Communications Handlers
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowMessageDetailModal(true);
  };

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    // Pre-fill broadcast modal with template content
    setBroadcastData({
      ...broadcastData,
      title: template.name,
      message: template.content
    });
    setShowBroadcastModal(true);
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setNewTemplate({
      name: template.name,
      category: template.category,
      content: template.content
    });
    setShowCreateTemplateModal(true);
  };

  const handleCreateTemplate = () => {
    if (newTemplate.name.trim() && newTemplate.content.trim()) {
      const templateData = {
        ...newTemplate,
        id: Date.now(),
        description: `${newTemplate.category} template`,
        usageCount: 0,
        lastUsed: new Date().toLocaleDateString()
      };
      
      console.log('Creating new template:', templateData);
      
      // Reset form
      setNewTemplate({
        name: '',
        category: 'maintenance',
        content: ''
      });
      
      setShowCreateTemplateModal(false);
    }
  };

  const handleOpenConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowDirectMessageModal(true);
  };

  const handleViewAnalytics = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowAnalyticsModal(true);
  };

  const handleMessageOptions = (message) => {
    console.log('Message options for:', message.title);
    // You can add a dropdown menu here for additional options
  };

  const handleAnnouncementOptions = (announcement) => {
    console.log('Announcement options for:', announcement.title);
    // You can add a dropdown menu here for additional options
  };

  const getAssignedTeam = (type) => {
    switch (type) {
      case 'theft': return 'Security Team';
      case 'security': return 'Security Team';
      case 'maintenance': return 'Maintenance Team';
      case 'accident': return 'Property Manager';
      case 'system': return 'Technical Team';
      default: return 'Property Manager';
    }
  };

  // Booking Detail Modal Handler
const handleBookingDetails = (booking) => {
  setSelectedBooking(booking);
  setShowBookingModal(true);
};

// Booking Approval Handler
const handleApproveBooking = (bookingId) => {
  // In a real app, this would make an API call
  console.log('Approving booking:', bookingId);
  // You could update state here to reflect the approval
  alert(`Booking ${bookingId} approved! Email notification sent to resident.`);
};

// Booking Decline Handler  
const handleDeclineBooking = (booking) => {
  setSelectedBooking(booking);
  setShowBookingModal(true);
};

// Amenity Settings Handler
const handleManageAmenitySettings = (amenity = null) => {
  setSelectedAmenityForSettings(amenity);
  setShowAmenitySettingsModal(true);
};

// Smart Mock Response System for Demo
const getSmartMockResponse = (userMessage, propertyContext) => {
  const q = userMessage.toLowerCase();
  
  // Occupancy and Performance Questions
  if (q.includes('occupancy') || q.includes('92%') || q.includes('performance')) {
    return `Your occupancy rate of ${propertyContext.occupancyRate} is excellent! That's above the national average of 85%. This strong performance is likely due to your amenities like ${propertyContext.amenities.slice(0, 2).join(' and ')}, plus effective resident retention strategies.`;
  }
  
  // Maintenance and Work Orders
  if (q.includes('maintenance') || q.includes('work order') || q.includes('repair')) {
    if (propertyContext.pendingMaintenance > 0) {
      return `You currently have ${propertyContext.pendingMaintenance} pending maintenance requests. Recent issues include: ${propertyContext.recentIssues.slice(0, 2).join(', ')}. I recommend prioritizing any HVAC or plumbing issues as they most impact resident satisfaction.`;
    } else {
      return `Great news! You have no pending maintenance requests right now. Your proactive maintenance approach is keeping residents happy and preventing major issues.`;
    }
  }
  
  // At-Risk Residents and Retention
  if (q.includes('at-risk') || q.includes('renewal') || q.includes('retention')) {
    if (propertyContext.atRiskResidents > 0) {
      return `You have ${propertyContext.atRiskResidents} residents at renewal risk. I recommend scheduling one-on-one meetings to understand their concerns. Consider offering renewal incentives like amenity credits or minor unit upgrades.`;
    } else {
      return `Excellent! No residents are currently flagged as at-risk for renewal. Your resident satisfaction strategies are working well. Keep up the community engagement and responsive maintenance.`;
    }
  }
  
  // Amenities and Bookings
  if (q.includes('amenity') || q.includes('booking') || q.includes('pool') || q.includes('gym') || q.includes('community')) {
    if (propertyContext.pendingBookings > 0) {
      return `You have ${propertyContext.pendingBookings} pending amenity bookings. Your available amenities (${propertyContext.amenities.join(', ')}) are clearly popular! Consider expanding booking hours or adding capacity for high-demand amenities.`;
    } else {
      return `Your amenities (${propertyContext.amenities.join(', ')}) are available for booking. Consider promoting them more to increase resident engagement and justify premium pricing.`;
    }
  }
  
  // Events and Community
  if (q.includes('event') || q.includes('community') || q.includes('social')) {
    if (propertyContext.upcomingEvents.length > 0) {
      return `Great community engagement! You have upcoming events: ${propertyContext.upcomingEvents.join(', ')}. Events like these boost retention by 15-20% and create a sense of community that residents value.`;
    } else {
      return `Consider planning some community events! Coffee mornings, yoga classes, or seasonal celebrations can significantly improve resident satisfaction and reduce turnover.`;
    }
  }
  
  // Revenue and Financial
  if (q.includes('revenue') || q.includes('financial') || q.includes('rent') || q.includes('income')) {
    const estimatedRevenue = Math.round(parseInt(propertyContext.totalUnits) * 1420 * 0.92);
    return `Based on your ${propertyContext.occupancyRate} occupancy across ${propertyContext.totalUnits} units, your estimated monthly revenue is around $${estimatedRevenue.toLocaleString()}. With this strong occupancy, consider 3-5% rent increases for new leases.`;
  }
  
  // Notifications and Alerts
  if (q.includes('notification') || q.includes('alert') || q.includes('urgent')) {
    if (propertyContext.hasNotifications) {
      return `You have important notifications that need attention. These could include lease renewals, maintenance priorities, or resident concerns. I recommend reviewing them to stay ahead of any issues.`;
    } else {
      return `No urgent notifications right now! Your property management is running smoothly. This is a great time to focus on proactive initiatives like resident engagement or preventive maintenance.`;
    }
  }
  
  // General property questions
  if (q.includes('property') || q.includes('overview') || q.includes('summary')) {
    return `${propertyContext.name} is performing well with ${propertyContext.occupancyRate} occupancy across ${propertyContext.totalUnits} units. You have ${propertyContext.pendingMaintenance} maintenance items and ${propertyContext.atRiskResidents} at-risk residents to monitor. Your amenities (${propertyContext.amenities.slice(0, 3).join(', ')}) are key value drivers.`;
  }
  
  // Specific recommendations
  if (q.includes('recommend') || q.includes('suggest') || q.includes('advice') || q.includes('improve')) {
    const recommendations = [
      `Focus on your ${propertyContext.atRiskResidents} at-risk residents with personalized outreach`,
      `Promote your underutilized amenities: ${propertyContext.amenities.slice(-2).join(' and ')}`,
      `Consider hosting monthly community events to boost engagement`,
      `Implement preventive maintenance schedules to reduce emergency repairs`
    ];
    return `Here are my top recommendations: ${recommendations.slice(0, 2).join('. ')}. These initiatives typically improve retention by 10-15%.`;
  }
  
  // Greeting responses
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q === '') {
    return `Hi there! I'm Nora, your AI assistant for ${propertyContext.name}. I can help you analyze your ${propertyContext.occupancyRate} occupancy, manage your ${propertyContext.pendingMaintenance} maintenance items, or discuss strategies for your ${propertyContext.atRiskResidents} at-risk residents. What would you like to explore?`;
  }
  
  // Fallback responses that still use property context
  const fallbacks = [
    `That's an interesting question about ${propertyContext.name}! With your current ${propertyContext.occupancyRate} occupancy and ${propertyContext.amenities.length} amenities, there are several ways I can help. Could you be more specific?`,
    `I'd love to help you with that! Based on your property data - ${propertyContext.totalUnits} units with ${propertyContext.pendingMaintenance} maintenance items - what specific aspect interests you most?`,
    `Great question! Your property is performing well overall (${propertyContext.occupancyRate} occupancy), and I can provide insights on retention, maintenance, amenities, or financial performance. What would you like to dive into?`
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

// Modified askNora function for demo - CORRECTED VERSION
const askNora = async (userMessage) => {
  try {
    // Build property context using YOUR ACTUAL DATA VARIABLES
    const propertyContext = {
      name: propertySettings.name || "your property",
      totalUnits: propertySettings.totalUnits || "120",
      address: propertySettings.address || "Atlanta, GA",

      // Current dashboard stats using YOUR existing data
      occupancyRate: "92%",
      pendingMaintenance: safetyIncidents.filter(i => ['investigating', 'scheduled', 'documenting'].includes(i.status)).length || 3,
      atRiskResidents: residentsData.filter(r => r.status === 'active').length > 50 ? 3 : 5, // Mock at-risk logic

      // Recent activity using YOUR existing data
      recentIssues: safetyIncidents.slice(0, 3).map(i => i.title) || ["Pool heater repair", "Parking gate malfunction", "Elevator inspection"],
      upcomingEvents: eventsData.filter(e => e.status === 'upcoming').slice(0, 2).map(e => e.title) || [],

      // Amenities from YOUR existing settings
      amenities: amenitySettings.map(a => a.name) || ['Pool', 'Fitness Center', 'Community Lounge'],

      // Recent bookings from YOUR existing data
      pendingBookings: amenityBookings.filter(b => b.status === 'pending').length || 0,

      // AI insights context using YOUR existing data
      hasNotifications: noraNotifications.filter(n => !n.seen).length > 0,
      
      // Additional context from your data
      totalResidents: residentsData.length || 120,
      activeResidents: residentsData.filter(r => r.status === 'active').length || 110,
      totalEvents: eventsData.length || 6,
      upcomingEventsCount: eventsData.filter(e => e.status === 'upcoming').length || 3,
      totalIncidents: safetyIncidents.length || 5,
      openIncidents: safetyIncidents.filter(i => ['investigating', 'scheduled', 'documenting'].includes(i.status)).length || 2
    };

    // DEMO VERSION: Use smart mock responses
    const response = getSmartMockResponse(userMessage, propertyContext);
    
    // Add slight delay to feel more natural
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    return response;
    
    /* PRODUCTION VERSION: Uncomment this when ready for real AI
    const prompt = `You are Nora, the friendly AI property management assistant for ${propertyContext.name}.

PROPERTY CONTEXT:
- ${propertyContext.totalUnits} units at ${propertyContext.address}
- Currently ${propertyContext.occupancyRate} occupied
- ${propertyContext.pendingMaintenance} pending maintenance requests
- ${propertyContext.atRiskResidents} residents at renewal risk
- ${propertyContext.pendingBookings} pending amenity bookings

AVAILABLE AMENITIES: ${propertyContext.amenities.join(', ')}

RECENT ACTIVITY:
- Issues: ${propertyContext.recentIssues.join(', ') || 'None'}
- Events: ${propertyContext.upcomingEvents.join(', ') || 'None'}

USER MESSAGE: "${userMessage}"

INSTRUCTIONS:
- Respond as Nora, the helpful AI assistant who knows this property intimately
- Be conversational, friendly, and specific to this property
- Reference actual data when relevant (occupancy, maintenance, events, etc.)
- Offer actionable insights and suggestions
- Keep responses under 150 words
- If asked about specific residents or sensitive data, be helpful but maintain privacy

Respond naturally as Nora would:`;

    const response = await window.claude.complete(prompt);
    return response;
    */
    
  } catch (error) {
    console.error('Nora AI Error:', error);
    return "I'm having trouble connecting right now, but I'm here to help! Could you try asking me again in a moment?";
  }
};

// Enhanced message handler with loading state
const handleNoraMessage = async (userInput) => {
  // Add user message immediately
  const userMessage = {
    id: Date.now(),
    type: 'user',
    message: userInput,
    timestamp: new Date(),
    context: 'user_input'
  };
  setNoraMessages(prev => [...prev, userMessage]);
  
  // Add loading message
  const loadingMessage = {
    id: Date.now() + 1,
    type: 'nora',
    message: "Analyzing your request...",
    timestamp: new Date(),
    context: 'loading',
    isLoading: true
  };
  setNoraMessages(prev => [...prev, loadingMessage]);
  
  try {
    // Get real AI response
    const aiResponse = await askNora(userInput);
    
    // Replace loading message with real response
    const noraResponse = {
      id: Date.now() + 2,
      type: 'nora',
      message: aiResponse,
      timestamp: new Date(),
      context: 'ai_response'
    };
    
    setNoraMessages(prev => prev.filter(m => !m.isLoading).concat([noraResponse]));
    
  } catch (error) {
    // Replace loading with error message
    const errorResponse = {
      id: Date.now() + 3,
      type: 'nora',
      message: "I'm experiencing some technical difficulties. Please try again in a moment!",
      timestamp: new Date(),
      context: 'error_response'
    };
    
    setNoraMessages(prev => prev.filter(m => !m.isLoading).concat([errorResponse]));
  }
};

  if (currentPage === 'resident-home') {
    return <ResidentPlatform onBackToManagement={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
<img 
  src={HeyNeighborLogo} 
  alt="HeyNeighbor Logo" 
  className="h-10 w-auto"
/>
</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setCurrentPage('residents')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'residents' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Residents</span>
          </button>
          <button 
            onClick={() => setCurrentPage('safety')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'safety' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Safety</span>
          </button>
          <button 
            onClick={() => setCurrentPage('communications')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'communications' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Communications</span>
          </button>
          <button 
            onClick={() => setCurrentPage('social')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'social' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Social Feed</span>
          </button>
          <button 
            onClick={() => setCurrentPage('events')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'events' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </button>
          <button 
            onClick={() => setCurrentPage('analytics')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'analytics' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>

          <button 
            onClick={() => setCurrentPage('amenities')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'amenities' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Building className="w-5 h-5" />
            <span>Amenities</span>
          </button>


          <button 
            onClick={() => setCurrentPage('settings')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
          onClick={() => setCurrentPage('resident-home')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'resident-home' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Resident View</span>
          </button>
        </nav>

        {/* Emergency Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Send Emergency Alert</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">
                {currentPage === 'dashboard' ? greeting : 
                 currentPage === 'activity' ? 'Recent Activity' :
                 currentPage === 'residents' ? 'Resident Management' :
                 currentPage === 'safety' ? 'Safety & Security' :
                 currentPage === 'communications' ? 'Communications' :
                 currentPage === 'events' ? 'Events & Activities' :
                 currentPage === 'analytics' ? 'Analytics & Reports' :
                 currentPage === 'amenities' ? 'Amenities Management' :
                 currentPage === 'settings' ? 'Settings' : greeting}
              </h1>
              <p className="text-gray-600 mt-1">
                {currentPage === 'dashboard' ? "Here's what's happening in your community today" :
                 currentPage === 'activity' ? 'Complete activity feed and incident tracking' :
                 currentPage === 'residents' ? 'Manage residents and community members' :
                 currentPage === 'safety' ? 'Monitor incidents and safety reports' :
                 currentPage === 'events' ? 'Organize and manage community events' :
                 currentPage === 'amenities' ? 'Manage bookings, settings, and amenity access' :
                 'Complete activity feed and incident tracking'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search residents, reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button 
              onClick={() => setShowNotifications(true)} 
              className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button 
  onClick={() => setShowProfileMenu(true)}
  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
>
                <span className="text-white font-medium text-sm">S</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 space-y-4">
          {/* Dashboard Page */}
          {currentPage === 'dashboard' && (
            <>
{/* System Health Command Center */}
      <div className="bg-green-50 border-green-200 rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">All systems healthy</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Community mood: <span className="font-medium text-green-600">87% positive</span></span>
                <span>Social sentiment: <span className="font-medium text-green-600">Positive trending</span></span>
                <span>2 topics trending</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
  onClick={() => setCurrentPage('analytics')}
  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
>
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-28 h-28 flex flex-col relative">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <Users className="w-3 h-3 text-blue-600" />
            </div>
            <div className="text-blue-600 text-xs font-medium">{communityStats.activeResidents.change}</div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-xl font-bold text-gray-900 mb-0.5">{communityStats.activeResidents.count}</div>
            <div className="text-xs text-gray-600 leading-tight">Active Residents</div>
          </div>
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-28 h-28 flex flex-col relative">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
              <Activity className="w-3 h-3 text-green-600" />
            </div>
            <div className="text-green-600 text-xs font-medium">{communityStats.engagementScore.change}</div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-xl font-bold text-gray-900 mb-0.5">{communityStats.engagementScore.score}</div>
            <div className="text-xs text-gray-600 leading-tight">Engagement Score</div>
          </div>
          <div className="absolute bottom-1 right-1 text-xs text-green-600 font-medium">
            +Social
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-28 h-28 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-orange-600" />
            </div>
            <div className="text-green-600 text-xs font-medium">{communityStats.incidentReports.change}</div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-xl font-bold text-gray-900 mb-0.5">{communityStats.incidentReports.count}</div>
            <div className="text-xs text-gray-600 leading-tight">Open Incidents</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-28 h-28 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
              <Shield className="w-3 h-3 text-red-600" />
            </div>
            <div className="text-red-600 text-xs font-medium">{communityStats.safetyRequests.change}</div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-xl font-bold text-gray-900 mb-0.5">{communityStats.safetyRequests.count}</div>
            <div className="text-xs text-gray-600 leading-tight">Safety Requests</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Recent Activity */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">AI Prioritized</span>
                  <button 
                    onClick={() => setCurrentPage('activity')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </span>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                        <span className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded">
                          3 social mentions
                        </span>
                      </div>
                      <h4 className="text-gray-900 font-medium mb-1">{activity.title}</h4>
                      <p className="text-gray-600 text-sm">Reported by {activity.user}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="flex items-center space-x-1 text-gray-500">
                        {getStatusIcon(activity.status)}
                        <span className="text-sm capitalize">{activity.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Insights */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-200">
            <div className="p-4 border-b border-purple-200">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-semibold text-gray-900">AI Insights</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Pool Schedule Discussion</h4>
                    <p className="text-xs text-gray-600 mb-2">23 residents discussing extended hours</p>
                    <div className="flex items-center justify-between">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Review Request
                      </button>
                      <span className="text-xs text-gray-500">23 posts</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Renewal Risk Detected</h4>
                    <p className="text-xs text-gray-600 mb-2">Unit 4B social engagement dropped 67%</p>
                    <div className="flex items-center justify-between">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Schedule Check-in
                      </button>
                      <span className="text-xs text-gray-500">89% confidence</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Community Win</h4>
                    <p className="text-xs text-gray-600 mb-2">BBQ event generated 34 positive posts</p>
                    <div className="flex items-center justify-between">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Schedule Follow-up
                      </button>
                      <span className="text-xs text-gray-500">+12% satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              <button 
                onClick={() => setShowBroadcastModal(true)}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Send className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900 text-sm">Send Notification</span>
              </button>
              <button 
                onClick={() => setShowCreateEventModal(true)}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-gray-900 text-sm">Create Event</span>
              </button>
              <button 
                onClick={() => setShowAddResidentModal(true)}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium text-gray-900 text-sm">Add Resident</span>
              </button>
              <button 
                onClick={() => setCurrentPage('social')}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                </div>
                <span className="font-medium text-gray-900 text-sm">View Social Feed</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
)}

          {/* Activity Page */}
          {currentPage === 'activity' && (
            <>
            {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium">Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">All Recent Activity</h1>
      </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">All Recent Activity</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActivityFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All
                      </button>
                      <button 
                        onClick={() => setActivityFilter('safety')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === 'safety' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Safety
                      </button>
                      <button 
                        onClick={() => setActivityFilter('maintenance')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === 'maintenance' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Maintenance
                      </button>
                      <button 
                        onClick={() => setActivityFilter('community')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === 'community' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Community
                      </button>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {getFilteredActivity().map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                              {activity.type}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                              {activity.priority}
                            </span>
                            <span className="text-gray-500 text-sm">{activity.time}</span>
                          </div>
                          <h4 className="text-gray-900 font-medium mb-1">{activity.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {activity.location}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 ml-4">
                          <div className="flex items-center space-x-1 text-gray-500">
                            {getStatusIcon(activity.status)}
                            <span className="text-sm capitalize">{activity.status}</span>
                          </div>
                          <span className="text-sm text-gray-600">by {activity.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Events Page */}
          {currentPage === 'events' && (
            <>
              {/* Events Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => handleEventStatClick('all')}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Events</p>
                      <p className="text-2xl font-bold text-gray-900">{getEventStats().total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleEventStatClick('upcoming')}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-blue-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Upcoming Events</p>
                      <p className="text-2xl font-bold text-blue-600">{getEventStats().upcoming}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleEventStatClick('completed')}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-green-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{getEventStats().completed}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </button>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Avg Attendance</p>
                      <p className="text-2xl font-bold text-purple-600">{getEventStats().avgAttendance}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search events, locations..."
                        value={eventSearchTerm}
                        onChange={(e) => setEventSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => setEventsFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          eventsFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All ({eventsData.length})
                      </button>
                      <button 
                        onClick={() => setEventsFilter('upcoming')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          eventsFilter === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Upcoming ({getEventStats().upcoming})
                      </button>
                      <button 
                        onClick={() => setEventsFilter('social')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          eventsFilter === 'social' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Social
                      </button>
                      <button 
                        onClick={() => setEventsFilter('wellness')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          eventsFilter === 'wellness' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Wellness
                      </button>
                      <button 
                        onClick={() => setEventsFilter('safety')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          eventsFilter === 'safety' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Safety
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowCreateEventModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredEvents().map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventCategoryColor(event.category)}`}>
                              {event.category}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {event.currentAttendees}/{event.maxAttendees} attending
                        </div>
                      </div>
                      
                      {/* Attendance Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Attendance</span>
                          <span>{Math.round((event.currentAttendees / event.maxAttendees) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min((event.currentAttendees / event.maxAttendees) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewEvent(event)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => handleEditEvent(event)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {getFilteredEvents().length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-600">No events match the selected filters.</p>
                </div>
              )}
            </>
          )}
          {/* Analytics Page */}
          {currentPage === 'analytics' && (
            <>
              {/* Analytics Tab Navigation */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-6">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setAnalyticsTab('executive')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      analyticsTab === 'executive' 
                        ? 'bg-blue-100 text-blue-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">📈</span>
                    <span>Executive Overview</span>
                  </button>
                  <button
                    onClick={() => setAnalyticsTab('residents')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      analyticsTab === 'residents' 
                        ? 'bg-blue-100 text-blue-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">🏠</span>
                    <span>Resident Analytics</span>
                  </button>
                  <button
                    onClick={() => setAnalyticsTab('community')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      analyticsTab === 'community' 
                        ? 'bg-blue-100 text-blue-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">🏘️</span>
                    <span>Community Insights</span>
                  </button>
                  <button
                    onClick={() => setAnalyticsTab('communication')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      analyticsTab === 'communication' 
                        ? 'bg-blue-100 text-blue-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">💬</span>
                    <span>Communication</span>
                  </button>
                  <button
                    onClick={() => setAnalyticsTab('ai')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      analyticsTab === 'ai' 
                        ? 'bg-blue-100 text-blue-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <NoraIcon size={20} className="text-purple-600" />
                    <span>AI Hub</span>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              
              {/* Executive Overview Tab */}
              {analyticsTab === 'executive' && (
                <>
                  {/* Nora Proactive Notifications */}
                  {noraNotifications.filter(n => !n.seen).length > 0 && (
                    <div className="mb-6">
                      {noraNotifications.filter(n => !n.seen).map((notification) => (
                        <div key={notification.id} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl shadow-lg mb-4 animate-slide-down">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <NoraIcon size={24} className="text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-bold text-white">Nora AI Alert</h4>
                                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                                    {notification.type === 'urgent' ? '🚨 Urgent' : '💡 Insight'}
                                  </span>
                                </div>
                                <h5 className="font-semibold text-blue-100">{notification.title}</h5>
                                <p className="text-sm text-blue-100 mt-1">{notification.message}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  if (notification.action === 'schedule_meeting') {
                                    setSelectedKpi({
                                      type: 'ai-action',
                                      title: 'Schedule Meeting with Sarah Chen',
                                      description: 'AI-recommended intervention based on declining renewal probability and engagement patterns.',
                                      details: [
                                        { label: 'Current Risk Level', value: 'High (25.3% renewal chance)', trend: '↓ Declining rapidly' },
                                        { label: 'Primary Issues', value: 'Noise complaints, low engagement', trend: 'Multiple factors' },
                                        { label: 'Recommended Action', value: 'In-person meeting within 48 hours', trend: 'Time-sensitive' },
                                        { label: 'Expected Outcome', value: '89% success rate if addressed now', trend: 'High confidence' },
                                        { label: 'Alternative Actions', value: 'Phone call (67% success) or email (23% success)', trend: 'Less effective' }
                                      ]
                                    });
                                    setShowKpiModal(true);
                                  }
                                }}
                                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                              >
                                Take Action
                              </button>
                              <button
                                onClick={() => {
                                  setNoraNotifications(prev => 
                                    prev.map(n => n.id === notification.id ? {...n, seen: true} : n)
                                  );
                                }}
                                className="text-white hover:text-blue-200 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Executive KPI Cards */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    
                    {/* Community Health KPI */}
                    <div 
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 min-w-56 hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] relative"
                      onClick={() => {
                        setSelectedKpi({
                          type: 'health',
                          title: 'Community Health Analysis',
                          value: '91.7%',
                          trend: '+5.2%',
                          description: 'Nora has analyzed 47 data points to calculate your community health score.',
                          details: [
                            { label: 'Resident Satisfaction', value: '94.2%', trend: '↗ +3.1% (12 positive reviews)' },
                            { label: 'Safety Score', value: '89.5%', trend: '↗ +7.2% (Fewer incidents this month)' },
                            { label: 'Engagement Rate', value: '91.3%', trend: '↗ +5.8% (Coffee hours working!)' },
                            { label: 'Nora Confidence', value: '96.7%', trend: 'High accuracy prediction' }
                          ]
                        });
                        setShowKpiModal(true);
                      }}
                      onMouseEnter={() => setHoveredMetric('health')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      {hoveredMetric === 'health' && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium z-10">
                          Nora: "Strong upward trend! 🎉"
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-gray-500 text-sm font-medium">Community Health</p>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Nora is monitoring"></div>
                          </div>
                          <p className="text-3xl font-bold text-green-600 mt-1">91.7%</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-green-600 font-medium">↗ +5.2% this month</p>
                            <p className="text-xs text-purple-500 font-medium">Nora: Excellent!</p>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex items-end space-x-1 h-8">
                              {[65, 68, 72, 75, 78, 82, 85, 87, 89, 91.7].map((value, index) => (
                                <div
                                  key={index}
                                  className="bg-green-200 rounded-sm flex-1 transition-all duration-300 hover:bg-green-400"
                                  style={{ height: `${(value / 100) * 32}px` }}
                                  title={`Day ${index + 1}: ${value}%`}
                                ></div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">30-day trend • Nora confidence: 96%</p>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center ml-4">
                          <BarChart3 className="w-7 h-7 text-green-600" />
                        </div>
                      </div>
                    </div>

                    {/* Renewal Probability KPI */}
                    <div 
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 min-w-56 hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] relative"
                      onClick={() => {
                        setSelectedKpi({
                          type: 'renewal',
                          title: 'Nora\'s Renewal Prediction Model',
                          value: '86.3%',
                          trend: '+3.1%',
                          description: 'Advanced AI analysis of 23 behavioral indicators to predict lease renewals.',
                          details: [
                            { label: 'High Confidence Renewals (>80%)', value: '47 residents', trend: '+2 from last month' },
                            { label: 'Medium Risk (60-80%)', value: '8 residents', trend: 'Stable, monitoring closely' },
                            { label: 'Action Required (<60%)', value: '5 residents', trend: 'Nora has intervention plans' },
                            { label: 'AI Model Accuracy', value: '94.2%', trend: 'Based on 2 years of data' }
                          ]
                        });
                        setShowKpiModal(true);
                      }}
                      onMouseEnter={() => setHoveredMetric('renewal')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      {hoveredMetric === 'renewal' && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium z-10">
                          Nora: "3 residents need attention 🎯"
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-gray-500 text-sm font-medium">Renewal Probability</p>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" title="AI actively predicting"></div>
                          </div>
                          <p className="text-3xl font-bold text-blue-600 mt-1">86.3%</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-blue-600 font-medium">↗ +3.1% this quarter</p>
                            <p className="text-xs text-purple-500 font-medium">AI: 94% accuracy</p>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex items-end space-x-1 h-8">
                              {[78, 79, 81, 82, 80, 83, 84, 85, 85.1, 86.3].map((value, index) => (
                                <div
                                  key={index}
                                  className="bg-blue-200 rounded-sm flex-1 transition-all duration-300 hover:bg-blue-400"
                                  style={{ height: `${(value / 100) * 32}px` }}
                                  title={`Period ${index + 1}: ${value}%`}
                                ></div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Quarterly trend • Nora AI model</p>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center ml-4">
                          <Users className="w-7 h-7 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    {/* At-Risk Residents KPI */}
                    <div 
                      className="bg-white p-6 rounded-xl shadow-md border border-yellow-200 flex-1 min-w-56 hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] relative"
                      onClick={() => {
                        setSelectedKpi({
                          type: 'risk',
                          title: 'High-Risk Resident Intelligence',
                          value: '3',
                          trend: 'Stable - Immediate action required',
                          description: 'Nora has identified critical patterns requiring immediate intervention.',
                          details: [
                            { 
                              label: 'Sarah Chen (Unit 4B)', 
                              value: '25.3% renewal chance', 
                              trend: '🚨 Critical: Schedule meeting within 48hrs'
                            },
                            { 
                              label: 'Mike Rodriguez (Unit 12A)', 
                              value: '34.7% renewal chance', 
                              trend: '⚠️ High Risk: Maintenance intervention needed'
                            },
                            { 
                              label: 'Lisa Park (Unit 8C)', 
                              value: '38.9% renewal chance', 
                              trend: '⚠️ Medium Risk: Proactive engagement recommended'
                            }
                          ]
                        });
                        setShowKpiModal(true);
                      }}
                      onMouseEnter={() => setHoveredMetric('risk')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      {hoveredMetric === 'risk' && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium z-10">
                          Nora: "Urgent: Sarah needs help! 🚨"
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-gray-500 text-sm font-medium">At-Risk Residents</p>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Critical alerts active"></div>
                          </div>
                          <p className="text-3xl font-bold text-yellow-600 mt-1">3</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-red-600 font-medium">🚨 1 Critical, 2 High Risk</p>
                            <p className="text-xs text-purple-500 font-medium">Nora: Act now!</p>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex space-x-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Sarah Chen - Critical"></div>
                              <div className="w-3 h-3 bg-red-400 rounded-full" title="Mike Rodriguez - High Risk"></div>
                              <div className="w-3 h-3 bg-yellow-400 rounded-full" title="Lisa Park - Medium Risk"></div>
                              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">AI risk distribution • 89% intervention success rate</p>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center ml-4 relative">
                          <AlertTriangle className="w-7 h-7 text-yellow-600" />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Engagement Score KPI */}
                    <div 
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 min-w-56 hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] relative"
                      onClick={() => {
                        setSelectedKpi({
                          type: 'engagement',
                          title: 'Community Engagement Intelligence',
                          value: '84.2%',
                          trend: '+8.4%',
                          description: 'Nora\'s recommendations drove significant engagement improvements this month.',
                          details: [
                            { label: 'Coffee Hour Impact', value: '87.3% attendance', trend: '↗ +12.1% (Nora\'s suggestion!)' },
                            { label: 'Message Response Rate', value: '82.1%', trend: '↗ +6.8% (Improved timing)' },
                            { label: 'Community App Usage', value: '91.7%', trend: '↗ +15.2% (New features working)' },
                            { label: 'Nora Success Score', value: '94.7%', trend: 'Recommendations driving results!' }
                          ]
                        });
                        setShowKpiModal(true);
                      }}
                      onMouseEnter={() => setHoveredMetric('engagement')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      {hoveredMetric === 'engagement' && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium z-10">
                          Nora: "My suggestions are working! 🎉"
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-gray-500 text-sm font-medium">Engagement Score</p>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Nora optimization active"></div>
                          </div>
                          <p className="text-3xl font-bold text-purple-600 mt-1">84.2%</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-purple-600 font-medium">↗ +8.4% this month</p>
                            <p className="text-xs text-green-600 font-medium">Nora impact!</p>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex items-end space-x-1 h-8">
                              {[68, 71, 69, 74, 76, 78, 79, 81, 82, 84.2].map((value, index) => (
                                <div
                                  key={index}
                                  className={`rounded-sm flex-1 transition-all duration-300 hover:bg-purple-400 ${
                                    index >= 7 ? 'bg-green-400' : 'bg-purple-200'
                                  }`}
                                  style={{ height: `${(value / 100) * 32}px` }}
                                  title={`Day ${index + 1}: ${value}% ${index >= 7 ? '(Nora recommendations impact)' : ''}`}
                                ></div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">30-day trend • Green = Nora impact</p>
                          </div>
                        </div>
                        <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center ml-4">
                          <MessageSquare className="w-7 h-7 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Improved Community Health Trends */}
                  <CommunityHealthTrends 
                    analyticsTimeRange={analyticsTimeRange} 
                    setAnalyticsTimeRange={setAnalyticsTimeRange} 
                  />
                  </>
                  )}

              {/* Resident Analytics Tab */}
              {analyticsTab === 'residents' && (
                <>
                  {/* AI-Enhanced Renewal Risk Analysis */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
                    <div className="mb-6">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-bold text-gray-900">Renewal Risk Analysis</h2>
                        <div className="bg-purple-100 px-3 py-1 rounded-full">
                          <span className="text-xs text-purple-700 font-bold">
                            <NoraIcon size={14} className="text-purple-700 inline mr-1" /> AI-Powered
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Nora's advanced prediction model with 94.2% accuracy</p>
                    </div>
                    <div className="space-y-6">
                      
                      {/* Critical Risk */}
                      <div 
                        className="border-l-4 border-red-400 bg-red-50 p-6 rounded-r-xl hover:bg-red-100 transition-colors cursor-pointer relative"
                        onClick={() => {
                          setSelectedKpi({
                            type: 'critical-intervention',
                            title: 'Nora\'s Critical Intervention Plan',
                            description: 'AI-generated action plan for high-risk residents based on behavioral analysis.',
                            details: [
                              { 
                                label: 'Sarah Chen - Primary Intervention', 
                                value: 'Schedule 1-on-1 meeting',
                                additional: 'Nora Analysis: Noise complaints (3x), engagement drop (67%), rent concern signals. Success rate: 89% if addressed within 48 hours.'
                              },
                              { 
                                label: 'Mike Rodriguez - Service Recovery', 
                                value: 'Expedite maintenance + follow-up',
                                additional: 'Nora Analysis: 5 delayed work orders causing frustration. Quick resolution + personal apology could improve renewal chance from 34.7% to 78%.'
                              },
                              { 
                                label: 'Predictive Timeline', 
                                value: 'Next 7 days critical window',
                                additional: 'Nora Model: Intervention success drops 23% after day 7. Optimal timing: Tuesday-Thursday 2-4 PM based on resident schedule analysis.'
                              }
                            ]
                          });
                          setShowKpiModal(true);
                        }}
                      >
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold text-red-800">🚨 Critical - AI Intervention Plan</h3>
                              <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-bold">Nora Ready</span>
                            </div>
                            <p className="text-sm text-red-700 mt-2">3 residents need immediate action - Nora has specific intervention strategies</p>
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center justify-between bg-white bg-opacity-60 p-3 rounded-lg hover:bg-white transition-colors">
                                <div className="flex-1">
                                  <span className="text-sm font-semibold text-red-800">Sarah Chen (Unit 4B)</span>
                                  <p className="text-xs text-red-600">Nora: Schedule meeting within 48hrs</p>
                                </div>
                                <span className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium">25.3% → 89%</span>
                              </div>
                              <div className="flex items-center justify-between bg-white bg-opacity-60 p-3 rounded-lg hover:bg-white transition-colors">
                                <div className="flex-1">
                                  <span className="text-sm font-semibold text-red-800">Mike Rodriguez (Unit 12A)</span>
                                  <p className="text-xs text-red-600">Nora: Expedite maintenance orders</p>
                                </div>
                                <span className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium">34.7% → 78%</span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 text-red-600">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Medium Risk */}
                      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-6 rounded-r-xl hover:bg-yellow-100 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold text-yellow-800">⚠️ Medium Risk - Nora Monitoring</h3>
                              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                            </div>
                            <p className="text-sm text-yellow-700 mt-2">5 residents under AI surveillance - proactive engagement scheduled</p>
                            <div className="mt-3 bg-yellow-100 p-3 rounded-lg">
                              <p className="text-xs text-yellow-800 font-medium">
                                <NoraIcon size={14} className="text-yellow-800 inline mr-1" /> Nora's Plan: Automated check-in calls this week + community event invitations
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full font-bold">5 residents</span>
                            <Eye className="w-5 h-5 text-yellow-600" />
                          </div>
                        </div>
                      </div>

                      {/* Low Risk */}
                      <div className="border-l-4 border-green-400 bg-green-50 p-6 rounded-r-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold text-green-800">✅ Low Risk - Nora Success</h3>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-sm text-green-700 mt-2">47 residents likely to renew - Nora's engagement strategies working!</p>
                            <div className="mt-3 bg-green-100 p-3 rounded-lg">
                              <p className="text-xs text-green-800 font-medium">🎉 Recent Nora wins: Coffee hours (+15% satisfaction), personalized communications (+12% response)</p>
                            </div>
                          </div>
                          <span className="text-sm bg-green-200 text-green-800 px-4 py-2 rounded-full font-bold">47 residents</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resident Lifecycle */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <div className="mb-6">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-bold text-gray-900">🏠 Resident Lifecycle</h2>
                        <div className="bg-purple-100 px-2 py-1 rounded-full">
                          <span className="text-xs text-purple-700 font-bold">AI Insights</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Nora's predictive tenant analytics</p>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-5 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
                          <p className="text-2xl font-bold text-blue-600">2.8 yrs</p>
                          <p className="text-sm text-gray-600 font-medium">Avg Lease Length</p>
                          <p className="text-xs text-green-600 mt-1">↗ +0.3 yrs (AI retention)</p>
                        </div>
                        <div className="text-center p-5 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors cursor-pointer">
                          <p className="text-2xl font-bold text-green-600">18 days</p>
                          <p className="text-sm text-gray-600 font-medium">Avg Vacancy</p>
                          <p className="text-xs text-green-600 mt-1">↓ -3 days (Smart marketing)</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="font-bold text-gray-900 mb-4">AI-Analyzed Move-out Patterns</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <span className="text-sm font-medium text-gray-700">Job Relocation</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-gray-900">45%</span>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Predictable</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <span className="text-sm font-medium text-gray-700">Rent Increase</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-gray-900">25%</span>
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Preventable</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <span className="text-sm font-medium text-gray-700">Lifestyle Change</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-gray-900">20%</span>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Natural</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <span className="text-sm font-medium text-gray-700">Other</span>
                            <span className="text-sm font-bold text-gray-900">10%</span>
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg mt-4">
                          <p className="text-xs text-purple-800 font-medium">
                            <NoraIcon size={14} className="text-purple-800 inline mr-1" /> Nora's Pattern Recognition:
                          </p>
                          <p className="text-xs text-purple-700 mt-1">70% of "rent increase" departures are preventable with early engagement. AI suggests proactive conversations 60 days before lease renewal.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Community Insights Tab */}
              {analyticsTab === 'community' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    
                    {/* Safety Heat Map */}
                    <div 
                      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedKpi({
                          type: 'safety-heat-map',
                          title: 'Safety Heat Map Analysis',
                          description: 'Comprehensive incident pattern analysis with location-based risk assessment and timing insights.',
                          details: [
                            { label: 'Peak Risk Hours', value: '10 PM - 2 AM', trend: 'Consistent pattern' },
                            { label: 'High-Risk Zones', value: 'Parking Garage (Zone 4), Pool Area (Zone 7)', trend: 'Requires attention' },
                            { label: 'Incident Reduction', value: '23% decrease since security upgrade', trend: 'Positive trend' },
                            { label: 'Response Time', value: 'Average 4.2 minutes', trend: 'Within target' },
                            { label: 'Predicted Risk', value: 'Low risk next 7 days', trend: 'Stable conditions' }
                          ]
                        });
                        setShowKpiModal(true);
                      }}
                    >
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          <h2 className="text-xl font-bold text-gray-900">Safety Heat Map</h2>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">AI pattern analysis • Nora monitoring</p>
                      </div>
                      <div className="h-36 bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 rounded-xl flex items-center justify-center border border-gray-100 relative">
                        
                        <div className="absolute inset-4 grid grid-cols-8 grid-rows-4 gap-1">
                          {Array.from({length: 32}).map((_, index) => {
                            const intensity = Math.random();
                            const bgColor = intensity > 0.7 ? 'bg-red-300' : intensity > 0.4 ? 'bg-yellow-300' : 'bg-green-300';
                            return (
                              <div
                                key={index}
                                className={`${bgColor} rounded-sm hover:scale-110 transition-transform cursor-pointer`}
                                title={`Zone ${index + 1}: ${intensity > 0.7 ? 'High' : intensity > 0.4 ? 'Medium' : 'Low'} Risk • Nora: ${intensity > 0.7 ? 'Increase patrols' : intensity > 0.4 ? 'Monitor' : 'Optimal'}`}
                              ></div>
                            );
                          })}
                        </div>
                        
                        <div className="text-center relative z-10 bg-white bg-opacity-90 rounded-lg p-3">
                          <Shield className="w-8 h-8 mx-auto mb-1 text-green-600" />
                          <p className="text-sm font-semibold text-gray-700">Peak: 6-8 PM</p>
                          <p className="text-xs text-purple-600">Nora: Add patrols</p>
                        </div>
                      </div>
                    </div>

                    {/* Event Impact Score */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          <h2 className="text-xl font-bold text-gray-900">Event Impact Score</h2>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Nora's optimization results</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Coffee Hours</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Nora's pick!</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-20 bg-gray-200 rounded-full h-2.5">
                              <div className="w-16 bg-green-500 h-2.5 rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-green-600">+12.1%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="text-sm font-medium text-gray-700">Pool Parties</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-20 bg-gray-200 rounded-full h-2.5">
                              <div className="w-14 bg-blue-500 h-2.5 rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-blue-600">+8.7%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="text-sm font-medium text-gray-700">Game Nights</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-20 bg-gray-200 rounded-full h-2.5">
                              <div className="w-10 bg-purple-500 h-2.5 rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-purple-600">+5.3%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Sentiment Analysis */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <h2 className="text-xl font-bold text-gray-900">💭 AI Sentiment Analysis</h2>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">Overall Mood</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">😊</span>
                          <div className="text-right">
                            <span className="text-xs text-green-600 font-bold">Positive</span>
                            <p className="text-xs text-gray-500">↗ +12% this week</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">Trending Topics</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">Pool maintenance</span>
                          <span className="text-xs text-purple-600">AI tracked</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">Satisfaction Score</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                          <div className="text-right">
                            <span className="text-sm font-bold text-gray-700">4.6/5</span>
                            <p className="text-xs text-green-600">↗ +0.2</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-purple-800 font-medium">
                          <NoraIcon size={14} className="text-purple-800 inline mr-1" /> Nora's Insight:
                        </p>
                        <p className="text-xs text-purple-700 mt-1">Sentiment analysis shows coffee hours are creating positive social connections. Recommend increasing frequency to bi-weekly.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Communication Tab */}
              {analyticsTab === 'communication' && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <div className="mb-6">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-bold text-gray-900">📱 Communication Analytics</h2>
                      <div className="bg-green-100 px-2 py-1 rounded-full">
                        <span className="text-xs text-green-700 font-bold">AI Optimized</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Nora's timing and personalization improvements</p>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
                        <p className="text-2xl font-bold text-blue-600">87.3%</p>
                        <p className="text-sm text-gray-600 font-medium">Message Open Rate</p>
                        <p className="text-xs text-green-600 mt-1">↗ +2.1% (Nora timing)</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
                        <p className="text-2xl font-bold text-green-600">73.1%</p>
                        <p className="text-sm text-gray-600 font-medium">Response Rate</p>
                        <p className="text-xs text-green-600 mt-1">↗ +5.3% (AI personalization)</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer">
                        <p className="text-2xl font-bold text-purple-600">4.2s</p>
                        <p className="text-sm text-gray-600 font-medium">Avg Response Time</p>
                        <p className="text-xs text-purple-600 mt-1">↓ -0.8s (Smart routing)</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-bold text-gray-900 mb-4">AI-Enhanced Channel Performance</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">App Notifications</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Nora optimized</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-3">
                              <div className="w-22 bg-blue-500 h-3 rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-gray-900">92.1%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                          <span className="text-sm font-medium text-gray-700">Email</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-3">
                              <div className="w-17 bg-green-500 h-3 rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-gray-900">73.4%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                          <span className="text-sm font-medium text-gray-700">SMS</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-3">
                              <div className="w-20 bg-yellow-500 h-3 rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-gray-900">85.7%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Hub Tab */}
              {analyticsTab === 'ai' && (
                <div className="space-y-6">
                  
                  {/* Enhanced Nora AI Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute w-32 h-32 bg-white rounded-full -top-16 -right-16 animate-pulse"></div>
                      <div className="absolute w-20 h-20 bg-white rounded-full -bottom-10 -left-10 animate-pulse delay-1000"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                          <NoraIcon size={28} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">Nora AI Assistant</h2>
                          <div className="flex items-center space-x-2">
                            <p className="text-blue-100 text-sm">Smart recommendations</p>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-200">Active</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-15 rounded-xl p-4">
                        <p className="text-sm font-medium">Your community health improved 5.2% this month! I've identified the key drivers and have new optimization strategies ready.</p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-blue-100">Confidence: 96.7% • Last updated 2h ago</p>
                          <button
                            onClick={() => setShowNoraChat(true)}
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full text-xs font-bold transition-colors"
                          >
                            Chat with Nora
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Smart Priority Actions */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <h2 className="text-xl font-bold text-gray-900">🎯 AI Priority Actions</h2>
                        <div className="bg-purple-100 px-2 py-1 rounded-full">
                          <span className="text-xs text-purple-700 font-bold">Smart Queue</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        
                        {/* Critical Action */}
                        <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-xl hover:bg-red-100 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-red-800">🚨 Critical Priority</h3>
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full font-bold">89% success rate</span>
                          </div>
                          <p className="text-sm text-red-700 mb-2 font-medium">Schedule urgent meeting with Sarah Chen (Unit 4B)</p>
                          <div className="bg-red-100 p-3 rounded-lg mb-4">
                            <p className="text-xs text-red-800 font-medium">
                              <NoraIcon size={14} className="text-purple-600 inline mr-1" /> Nora's Analysis:
                            </p>
                            <p className="text-xs text-red-700 mt-1">Behavioral pattern shows 3 noise complaints + 67% engagement drop + rent inquiry = 94% move-out probability. Intervention within 48hrs increases retention to 89%.</p>
                          </div>
                          <button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center space-x-2"
                            onClick={() => {
                              setNoraMessages(prev => [...prev, {
                                id: Date.now(),
                                type: 'nora',
                                message: "Great choice! I'll help you prepare for Sarah's meeting. Based on her profile, she responds best to solution-focused conversations. I've drafted talking points about noise mitigation and community benefits.",
                                timestamp: new Date(),
                                context: 'meeting_assist'
                              }]);
                              setShowNoraChat(true);
                            }}
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Schedule with Nora's Help</span>
                          </button>
                        </div>

                        {/* High Impact Action */}
                        <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-xl hover:bg-blue-100 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-blue-800">📈 High Impact</h3>
                            <span className="text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-bold">67% success rate</span>
                          </div>
                          <p className="text-sm text-blue-700 mb-2 font-medium">Host coffee hour this Thursday at 6 PM</p>
                          <div className="bg-blue-100 p-3 rounded-lg mb-4">
                            <p className="text-xs text-blue-800 font-medium">
                              <NoraIcon size={14} className="text-purple-600 inline mr-1" /> Nora's Optimization:
                            </p>
                            <p className="text-xs text-blue-700 mt-1">Historical data shows Thursday 6 PM gets 23% higher attendance. 12 residents likely to attend based on calendar analysis.</p>
                          </div>
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Create Optimized Event</span>
                          </button>
                        </div>

                        {/* Smart Opportunity */}
                        <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-xl hover:bg-green-100 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-green-800">💡 Smart Opportunity</h3>
                            <span className="text-xs bg-green-200 text-green-800 px-3 py-1 rounded-full font-bold">45% success rate</span>
                          </div>
                          <p className="text-sm text-green-700 mb-2 font-medium">Send personalized appreciation gifts to 5 long-term residents</p>
                          <div className="bg-green-100 p-3 rounded-lg mb-4">
                            <p className="text-xs text-green-800 font-medium">
                              <NoraIcon size={14} className="text-purple-600 inline mr-1" /> Nora's Personalization:
                            </p>
                            <p className="text-xs text-green-700 mt-1">Target residents: 3+ years tenure, high satisfaction. Gift suggestions: Local coffee shop cards. Cost: $150, retention value: $12,000.</p>
                          </div>
                          <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center space-x-2">
                            <Send className="w-4 h-4" />
                            <span>Send Smart Gifts</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Predictive Insights */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <h2 className="text-xl font-bold text-gray-900">🔮 Nora's Predictions</h2>
                        <div className="bg-purple-100 px-2 py-1 rounded-full">
                          <span className="text-xs text-purple-700 font-bold">96% Accuracy</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        
                        <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedKpi({
                              type: 'ai-forecast',
                              title: 'Nora\'s Advanced Forecast Model',
                              description: 'Machine learning predictions based on 47 behavioral indicators and 2 years of historical data.',
                              details: [
                                { label: 'Move-out Predictions', value: '2 notices expected (Units 4B, 12A)', trend: 'High confidence (94.3%)' },
                                { label: 'Pool Party Impact', value: '+15.2% engagement boost', trend: 'Summer correlation analysis' },
                                { label: 'Maintenance Spike', value: '+23% requests in Week 3', trend: 'Weather pattern prediction' },
                                { label: 'Optimal Interventions', value: '3 scheduled, 89% success rate', trend: 'AI-timed for maximum impact' }
                              ]
                            });
                            setShowKpiModal(true);
                          }}
                        >
                          <h3 className="font-bold text-purple-800 mb-3">Next Month Intelligence</h3>
                          <ul className="text-sm text-purple-700 space-y-2 font-medium">
                            <li>• 2 move-out notices expected (94% confidence)</li>
                            <li>• Pool party will boost engagement +15.2%</li>
                            <li>• Maintenance requests spike predicted Week 3</li>
                            <li>• 3 AI interventions scheduled for optimal timing</li>
                          </ul>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-purple-600">Click for detailed AI analysis</p>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                          <h3 className="font-bold text-blue-800 mb-3">Smart Recommendations</h3>
                          <ul className="text-sm text-blue-700 space-y-2 font-medium">
                            <li>• Tuesday 6 PM: 78% better event attendance</li>
                            <li>• Weekend newsletters: 73.4% open rate peak</li>
                            <li>• Security patrols after 8 PM reduce incidents 34%</li>
                            <li>• Personalized messages increase response 2.3x</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Keep all existing modals and chat components */}
              {showKpiModal && selectedKpi && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-gray-900">{selectedKpi.title}</h3>
                          {selectedKpi.type.includes('ai') || selectedKpi.type.includes('nora') ? (
                            <div className="bg-purple-100 px-3 py-1 rounded-full">
                              <span className="text-xs text-purple-700 font-bold">
                                <NoraIcon size={14} className="text-purple-700 inline mr-1" /> AI Powered
                              </span>
                            </div>
                          ) : null}
                        </div>
                        <button 
                          onClick={() => setShowKpiModal(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6">
                        <p className="text-gray-600 mb-4">{selectedKpi.description}</p>
                        {selectedKpi.value && (
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-gray-900">Current Value:</span>
                              <span className="text-2xl font-bold text-blue-600">{selectedKpi.value}</span>
                            </div>
                            {selectedKpi.trend && (
                              <p className="text-sm text-gray-600 mt-2">Trend: {selectedKpi.trend}</p>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-semibold text-gray-900">Detailed Analysis</h4>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        </div>
                        {selectedKpi.details.map((detail, index) => (
                          <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{detail.label}</p>
                              {detail.additional && (
                                <p className="text-sm text-gray-600 mt-2 bg-white p-3 rounded-lg">{detail.additional}</p>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <p className="font-bold text-gray-900">{detail.value}</p>
                              {detail.trend && (
                                <p className="text-sm text-gray-600">{detail.trend}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-3 mt-6">
                        <button
                          onClick={() => setShowKpiModal(false)}
                          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => {
                            setShowKpiModal(false);
                            setNoraMessages(prev => [...prev, {
                              id: Date.now(),
                              type: 'nora',
                              message: `I've exported the ${selectedKpi.title} data to your dashboard. Would you like me to create an action plan based on these insights?`,
                              timestamp: new Date(),
                              context: 'export_followup'
                            }]);
                            setShowNoraChat(true);
                          }}
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Export & Get AI Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Nora Chat Widget */}
              {showNoraChat && (
                <div className="fixed bottom-4 right-4 w-80 h-[28rem] sm:w-80 sm:h-[30rem] md:w-96 md:h-[32rem] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                          <NoraIcon size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">Nora AI Assistant</h4>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-200">Online</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowNoraChat(false)}
                        className="text-white hover:text-blue-200 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {noraMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'nora' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs p-3 rounded-lg ${
                          message.type === 'nora' 
                            ? 'bg-blue-100 text-blue-900' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
<div className="px-4 pb-4 bg-white border-t border-gray-100">
  <div className="text-xs font-medium text-gray-600 mb-3 flex items-center space-x-2">
    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
    <span>Quick insights</span>
  </div>
  <div className="grid grid-cols-1 gap-2">
    <button
      onClick={() => {
        const input = document.querySelector('input[placeholder="Ask Nora anything..."]');
        if (input) {
          input.value = "Explain this month's performance";
          input.focus();
        }
      }}
      className="w-full text-left px-3 py-2.5 text-sm bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 rounded-lg flex items-center space-x-3 transition-all duration-200 group"
    >
      <div className="w-6 h-6 bg-white group-hover:bg-purple-200 rounded-md flex items-center justify-center transition-colors border border-purple-200">
        <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
      </div>
      <span className="text-gray-700">Explain this month's performance</span>
    </button>
    
    <button
      onClick={() => {
        const input = document.querySelector('input[placeholder="Ask Nora anything..."]');
        if (input) {
          input.value = "What's driving occupancy changes?";
          input.focus();
        }
      }}
      className="w-full text-left px-3 py-2.5 text-sm bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 rounded-lg flex items-center space-x-3 transition-all duration-200 group"
    >
      <div className="w-6 h-6 bg-white group-hover:bg-purple-200 rounded-md flex items-center justify-center transition-colors border border-purple-200">
        <Building className="w-3.5 h-3.5 text-purple-600" />
      </div>
      <span className="text-gray-700">What's driving occupancy changes?</span>
    </button>
    
    <button
      onClick={() => {
        const input = document.querySelector('input[placeholder="Ask Nora anything..."]');
        if (input) {
          input.value = "Show me at-risk residents";
          input.focus();
        }
      }}
      className="w-full text-left px-3 py-2.5 text-sm bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 rounded-lg flex items-center space-x-3 transition-all duration-200 group"
    >
      <div className="w-6 h-6 bg-white group-hover:bg-purple-200 rounded-md flex items-center justify-center transition-colors border border-purple-200">
        <Users className="w-3.5 h-3.5 text-purple-600" />
      </div>
      <span className="text-gray-700">Show me at-risk residents</span>
    </button>
  </div>
</div>

                                  


                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ask Nora anything..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            const userInput = e.target.value.trim();
                            handleNoraMessage(userInput);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="Ask Nora anything..."]');
                          if (input && input.value.trim()) {
                            handleNoraMessage(input.value.trim());
                            input.value = '';
                          }
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Nora Quick Actions Button */}
              {!showNoraChat && (
                <button
                  onClick={() => setShowNoraChat(true)}
                  className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 z-40 flex items-center justify-center"
                >
                  <NoraIcon size={28} className="text-purple-600" />
                  {noraNotifications.filter(n => !n.seen).length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{noraNotifications.filter(n => !n.seen).length}</span>
                    </div>
                  )}
                </button>
              )}
            </>
          )}

          {/* Amenities Management Page */}
          {currentPage === 'amenities' && (
            <>
              {/* Amenities Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending Requests</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {amenityBookings.filter(booking => booking.status === 'pending').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Approved Bookings</p>
                      <p className="text-2xl font-bold text-green-600">
                        {amenityBookings.filter(booking => booking.status === 'approved').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">This Week</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {amenityBookings.filter(booking => {
                          const bookingDate = new Date(booking.date);
                          const now = new Date();
                          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                          const weekEnd = new Date(weekStart);
                          weekEnd.setDate(weekEnd.getDate() + 6);
                          return bookingDate >= weekStart && bookingDate <= weekEnd;
                        }).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Revenue (Est.)</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${amenityBookings.filter(booking => booking.status === 'approved').reduce((total, booking) => {
                          const amenitySetting = amenitySettings.find(setting => setting.name === booking.amenity);
                          return total + (amenitySetting ? amenitySetting.bookingFee : 0);
                        }, 0)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setAmenitiesFilter('all')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        amenitiesFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Bookings ({amenityBookings.length})
                    </button>
                    <button 
                      onClick={() => setAmenitiesFilter('pending')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        amenitiesFilter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Pending ({amenityBookings.filter(b => b.status === 'pending').length})
                    </button>
                    <button 
                      onClick={() => setAmenitiesFilter('approved')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        amenitiesFilter === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Approved ({amenityBookings.filter(b => b.status === 'approved').length})
                    </button>
                    <button 
                      onClick={() => setAmenitiesFilter('declined')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        amenitiesFilter === 'declined' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Declined ({amenityBookings.filter(b => b.status === 'declined').length})
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleManageAmenitySettings()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Manage Settings</span>
                  </button>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Booking Requests - Left Column (2/3 width) */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {amenitiesFilter === 'all' ? 'All Booking Requests' :
                         amenitiesFilter === 'pending' ? 'Pending Requests' :
                         amenitiesFilter === 'approved' ? 'Approved Bookings' :
                         'Declined Requests'}
                      </h3>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {amenityBookings
                        .filter(booking => amenitiesFilter === 'all' || booking.status === amenitiesFilter)
                        .map((booking) => (
                        <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-2xl">
                                  {amenitySettings.find(a => a.name === booking.amenity)?.icon || '🏢'}
                                </span>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{booking.amenity}</h4>
                                  <p className="text-sm text-gray-600">{booking.resident} • {booking.unit}</p>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                                <div>
                                  <span className="font-medium">Date:</span><br />
                                  {new Date(booking.date).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="font-medium">Time:</span><br />
                                  {booking.startTime} - {booking.endTime}
                                </div>
                                <div>
                                  <span className="font-medium">Party Size:</span><br />
                                  {booking.partySize} people
                                </div>
                                <div>
                                  <span className="font-medium">Requested:</span><br />
                                  {new Date(booking.requestedDate).toLocaleDateString()}
                                </div>
                              </div>
                              
                              {booking.specialRequests && booking.specialRequests !== 'None' && (
                                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                                  <span className="text-sm font-medium text-blue-800">Special Requests:</span>
                                  <p className="text-sm text-blue-700 mt-1">{booking.specialRequests}</p>
                                </div>
                              )}
                              
                              {booking.status === 'declined' && booking.declineReason && (
                                <div className="bg-red-50 p-3 rounded-lg mb-3">
                                  <span className="text-sm font-medium text-red-800">Decline Reason:</span>
                                  <p className="text-sm text-red-700 mt-1">{booking.declineReason}</p>
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <MessageSquare className="w-4 h-4" />
                                <span>{booking.contact}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col space-y-2 ml-4">
                              {booking.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleApproveBooking(booking.id)}                                                                      
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Approve</span>
                                  </button>
                                  <button 
                                    onClick={() => handleDeclineBooking(booking)}                                
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                                  >
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Decline</span>
                                  </button>
                                </>
                              )}
                              <button 
                                onClick={() => handleBookingDetails(booking)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Details</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {amenityBookings.filter(booking => amenitiesFilter === 'all' || booking.status === amenitiesFilter).length === 0 && (
                      <div className="text-center py-12">
                        <Building className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600">No bookings match the selected filter.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Sidebar - Amenity Settings & Quick Stats */}
                <div className="space-y-6">
                  
                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => handleManageAmenitySettings()}
                        className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Settings className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">Manage Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          alert('Calendar View:\n\n📅 Coming Soon!\n\n- Weekly/Monthly calendar view\n- Drag & drop booking management\n- Conflict detection\n- Availability blocking\n\nThis feature is in development!');
                      }}
                        className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">View Calendar</span>
                      </button>
                      <button
                        onClick={() => {
                          alert('Usage Analytics:\n\n📊 Coming Soon!\n\n- Booking trends & patterns\n- Revenue analytics\n- Popular time slots\n- Resident usage statistics\n- Capacity utilization\n\nThis feature is in development!');
                        }}
                        className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">Usage Analytics</span>
                      </button>
                    </div>
                  </div>

                  {/* Popular Amenities */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Amenities</h3>
                    <div className="space-y-3">
                      {amenitySettings
                        .map(amenity => ({
                          ...amenity,
                          bookingCount: amenityBookings.filter(booking => booking.amenity === amenity.name).length
                        }))
                        .sort((a, b) => b.bookingCount - a.bookingCount)
                        .slice(0, 5)
                        .map((amenity, index) => (
                        <div key={amenity.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{amenity.icon}</span>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{amenity.name}</p>
                              <p className="text-xs text-gray-500">{amenity.bookingCount} bookings</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ 
                                  width: `${Math.min((amenity.bookingCount / Math.max(...amenitySettings.map(a => amenityBookings.filter(b => b.amenity === a.name).length))) * 100, 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {amenityBookings
                        .sort((a, b) => new Date(b.requestedDate) - new Date(a.requestedDate))
                        .slice(0, 4)
                        .map((booking) => (
                        <div key={booking.id} className="flex items-start space-x-3">
                          <span className="text-sm">
                            {amenitySettings.find(a => a.name === booking.amenity)?.icon || '🏢'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{booking.resident}</span> requested {booking.amenity}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(booking.requestedDate).toLocaleDateString()} • {booking.status}
                            </p>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${
                            booking.status === 'pending' ? 'bg-yellow-400' :
                            booking.status === 'approved' ? 'bg-green-400' :
                            'bg-red-400'
                          }`}></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Booking Details Modal */}
{showBookingModal && selectedBooking && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {amenitySettings.find(a => a.name === selectedBooking.amenity)?.icon || '🏢'}
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedBooking.amenity} Booking</h3>
              <p className="text-gray-600">{selectedBooking.resident} • {selectedBooking.unit}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              selectedBooking.status === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {selectedBooking.status}
            </span>
          </div>
          <button 
            onClick={() => setShowBookingModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date(selectedBooking.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedBooking.startTime} - {selectedBooking.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Party Size:</span>
                <span className="font-medium">{selectedBooking.partySize} people</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Requested:</span>
                <span className="font-medium">{new Date(selectedBooking.requestedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Fee:</span>
                <span className="font-medium text-green-600">
                  ${amenitySettings.find(a => a.name === selectedBooking.amenity)?.bookingFee || 0}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{selectedBooking.contact}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Unit {selectedBooking.unit}</span>
              </div>
            </div>
          </div>
        </div>
        
        {selectedBooking.specialRequests && selectedBooking.specialRequests !== 'None' && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Special Requests</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">{selectedBooking.specialRequests}</p>
            </div>
          </div>
        )}
        
        {selectedBooking.status === 'declined' && selectedBooking.declineReason && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Decline Reason</h4>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800">{selectedBooking.declineReason}</p>
            </div>
          </div>
        )}
        
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Amenity Rules</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {amenitySettings.find(a => a.name === selectedBooking.amenity)?.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="flex space-x-3">
          {selectedBooking.status === 'pending' && (
            <>
              <button
                onClick={() => {
                  handleApproveBooking(selectedBooking.id);
                  setShowBookingModal(false);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve Booking</span>
              </button>
              <button
                onClick={() => {
                  const reason = prompt('Please provide a reason for declining this booking:');
                  if (reason) {
                    console.log('Declining booking:', selectedBooking.id, 'Reason:', reason);
                    alert(`Booking declined. Reason: ${reason}\nEmail notification sent to resident.`);
                    setShowBookingModal(false);
                  }
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Decline Booking</span>
              </button>
            </>
          )}
          <button
            onClick={() => setShowBookingModal(false)}
            className="flex-1 px-4 py-3 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* Amenity Settings Modal */}
{showAmenitySettingsModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Amenity Settings Management</h3>
          <button 
            onClick={() => setShowAmenitySettingsModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenitySettings.map((amenity) => (
            <div key={amenity.name} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{amenity.icon}</span>
                <h4 className="font-semibold text-gray-900">{amenity.name}</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Capacity:</span>
                  <span className="font-medium">{amenity.maxCapacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Hours:</span>
                  <span className="font-medium">{amenity.availableHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Fee:</span>
                  <span className="font-medium text-green-600">${amenity.bookingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Advance Booking:</span>
                  <span className="font-medium">{amenity.bookingWindow} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Duration:</span>
                  <span className="font-medium">{amenity.maxDuration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Requires Approval:</span>
                  <span className={`font-medium ${amenity.requiresApproval ? 'text-yellow-600' : 'text-green-600'}`}>
                    {amenity.requiresApproval ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => {
                    alert(`Edit ${amenity.name} settings:\n\n- Update capacity, hours, fees\n- Modify booking rules\n- Set availability\n\n(Feature coming soon!)`);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

          {/* Settings Page */}
{currentPage === 'settings' && (
  <>
    {/* Settings Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings & Configuration</h1>
      <p className="text-gray-600 mt-2">Manage your property settings, units, amenities, and AI preferences</p>
    </div>

    {/* Settings Navigation Tabs */}
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSettingsTab('property')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              settingsTab === 'property' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Property Details
          </button>
          <button
            onClick={() => setSettingsTab('units')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              settingsTab === 'units' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Unit Management
          </button>
          <button
            onClick={() => setSettingsTab('amenities')}
          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
            settingsTab === 'amenities' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
>
            Amenities & Policies
          </button>
          <button
            onClick={() => setSettingsTab('nora')}
          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
            settingsTab === 'nora' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <NoraIcon 
              size={16} 
            className={`inline mr-1 ${
              settingsTab === 'nora' ? 'text-blue-600' : 'text-gray-500'
            }`} 
          /> 
          Nora AI
        </button>
        </nav>
      </div>
    </div>

    {/* Property Details Tab */}
    {settingsTab === 'property' && (
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Property Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
              <input
                type="text"
                value={propertySettings.name}
                onChange={(e) => setPropertySettings({...propertySettings, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Sunset Gardens Apartments"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={propertySettings.type}
                onChange={(e) => setPropertySettings({...propertySettings, type: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="apartment">Apartment Complex</option>
                <option value="condo">Condominium</option>
                <option value="townhouse">Townhouse Community</option>
                <option value="single_family">Single Family Homes</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={propertySettings.address}
                onChange={(e) => setPropertySettings({...propertySettings, address: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Main Street, Atlanta, GA 30309"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Units</label>
              <input
                type="number"
                value={propertySettings.totalUnits}
                onChange={(e) => setPropertySettings({...propertySettings, totalUnits: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
              <input
                type="number"
                value={propertySettings.yearBuilt}
                onChange={(e) => setPropertySettings({...propertySettings, yearBuilt: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="2018"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Office Hours</label>
                <input
                  type="text"
                  value={propertySettings.officeHours}
                  onChange={(e) => setPropertySettings({...propertySettings, officeHours: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Monday-Friday 9AM-6PM, Saturday 10AM-4PM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  value={propertySettings.emergencyContact}
                  onChange={(e) => setPropertySettings({...propertySettings, emergencyContact: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Unit Management Tab */}
    {settingsTab === 'units' && (
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Unit Configuration</h2>
            <button
              onClick={() => setShowAddUnitModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Unit Type</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unitTypes.map((unit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{unit.type}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Square Feet:</span>
                    <span className="font-medium">{unit.sqft} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-medium">{unit.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-medium">{unit.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Rent:</span>
                    <span className="font-medium text-green-600">${unit.rent}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Units:</span>
                    <span className="font-medium">{unit.available} of {unit.total}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>92% occupied</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Amenities & Policies Tab */}
    {settingsTab === 'amenities' && (
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Property Amenities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${amenity.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {amenity.icon}
                  </div>
                  <span className="font-medium text-gray-900">{amenity.name}</span>
                </div>
                
                <button
                  onClick={() => toggleAmenity(index)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    amenity.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      amenity.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Property Policies</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours</label>
              <input
                type="text"
                value={propertySettings.quietHours}
                onChange={(e) => setPropertySettings({...propertySettings, quietHours: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="10:00 PM - 8:00 AM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pet Policy</label>
              <textarea
                value={propertySettings.petPolicy}
                onChange={(e) => setPropertySettings({...propertySettings, petPolicy: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Pets welcome with deposit. 2 pet maximum, weight limit 50lbs each."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guest Policy</label>
              <textarea
                value={propertySettings.guestPolicy}
                onChange={(e) => setPropertySettings({...propertySettings, guestPolicy: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Guests welcome for up to 14 consecutive days. Overnight parking requires permit."
              />
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Nora AI Tab */}
    {settingsTab === 'nora' && (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <NoraIcon size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nora AI Configuration</h2>
              <p className="text-purple-600 font-medium">Customize your AI assistant's behavior and preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">AI Personality</label>
                <div className="space-y-2">
                  {['Professional & Formal', 'Friendly & Casual', 'Empathetic & Supportive'].map((personality) => (
                    <label key={personality} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="aiPersonality"
                        value={personality}
                        checked={noraSettings.personality === personality}
                        onChange={(e) => setNoraSettings({...noraSettings, personality: e.target.value})}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{personality}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Response Speed</label>
                <select
                  value={noraSettings.responseSpeed}
                  onChange={(e) => setNoraSettings({...noraSettings, responseSpeed: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="instant">Instant Response</option>
                  <option value="thoughtful">Thoughtful (2-3 seconds)</option>
                  <option value="detailed">Detailed Analysis (5+ seconds)</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Confidence Threshold</label>
                <div className="px-3">
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={noraSettings.confidenceThreshold}
                    onChange={(e) => setNoraSettings({...noraSettings, confidenceThreshold: e.target.value})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span className="font-medium text-purple-600">{noraSettings.confidenceThreshold}%</span>
                    <span>95%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Higher threshold = more conservative recommendations</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Auto-Actions Enabled</label>
                <div className="space-y-3">
                  {[
                    { key: 'scheduleFollowups', label: 'Schedule Follow-up Meetings' },
                    { key: 'sendReminders', label: 'Send Renewal Reminders' },
                    { key: 'escalateIssues', label: 'Escalate Urgent Issues' },
                    { key: 'generateReports', label: 'Generate Weekly Reports' }
                  ].map((action) => (
                    <div key={action.key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{action.label}</span>
                      <button
                        onClick={() => toggleNoraAction(action.key)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          noraSettings.autoActions[action.key] ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            noraSettings.autoActions[action.key] ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Nora Learning Mode</h3>
                <p className="text-sm text-gray-600">Allow Nora to learn from your interactions and improve over time</p>
              </div>
              <button
                onClick={() => setNoraSettings({...noraSettings, learningEnabled: !noraSettings.learningEnabled})}
                className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  noraSettings.learningEnabled ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    noraSettings.learningEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Save Changes Button */}
    <div className="flex justify-end space-x-4 pt-6">
      <button
        onClick={() => {
          // Reset to defaults logic here
        }}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Reset to Defaults
      </button>
      <button
        onClick={() => {
          // Save settings logic here
          alert('Settings saved successfully!');
        }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  </>
)}
{/* Social Feed Page */}
{currentPage === 'social' && (
  <div className="max-w-2xl mx-auto space-y-4">
      {/* Stories Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stories</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {[
            { id: 1, title: 'Pool Party', emoji: '🏊‍♀️', gradient: 'from-blue-400 to-cyan-500', content: 'Get ready for our amazing pool party this Saturday!' },
            { id: 2, title: 'BBQ Event', emoji: '🍖', gradient: 'from-green-400 to-emerald-500', content: 'Community BBQ was a huge success! Thanks to everyone who came.' },
            { id: 3, title: 'New Neighbors', emoji: '👋', gradient: 'from-purple-400 to-pink-500', content: 'Welcome to all our new residents who joined us this month!' },
            { id: 4, title: 'Safety Updates', emoji: '🛡️', gradient: 'from-orange-400 to-red-500', content: 'Important safety updates and emergency procedures for all residents.' }
          ].map((story) => (
            <button
              key={story.id}
              onClick={() => {
                setCurrentStory(story);
                setShowStoryModal(true);
              }}
              className="flex-shrink-0 text-center group cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${story.gradient} rounded-full flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}>
                <span className="text-white text-xl">{story.emoji}</span>
              </div>
              <p className="text-xs text-gray-600 group-hover:text-blue-500">{story.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Section - Sarah's Composer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">S</span>
          </div>
          <input 
            type="text" 
            placeholder="Share something with your neighbors..."
            className="flex-1 px-4 py-2 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onClick={() => {
              setComposerType('text');
              setShowPostComposer(true);
            }}
            readOnly
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                setComposerType('photo');
                setShowPostComposer(true);
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span className="text-sm">Photo</span>
            </button>
            <button 
              onClick={() => {
                setComposerType('event');
                setShowPostComposer(true);
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Event</span>
            </button>
            <button 
              onClick={() => {
                setComposerType('safety');
                setShowPostComposer(true);
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">Safety Alert</span>
            </button>
          </div>
          <button 
            onClick={() => {
              setComposerType('share');
              setShowPostComposer(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="flex space-x-2">
          {['All Posts', 'Events', 'Recommendations', 'Safety', 'Marketplace'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Social Feed Posts */}
      <div className="space-y-4">
        {/* Community Event Post */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">CT</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Community Team</h4>
                <p className="text-sm text-gray-600">2 hours ago • Unit Management</p>
              </div>
              <div className="flex items-center space-x-2">
                {userRole === 'management' && (
                  <div className="flex space-x-1">
                    <button 
                      className="text-gray-400 hover:text-blue-500 p-1 rounded transition-colors" 
                      title="Pin Post"
                    >
                      📌
                    </button>
                    <button 
                      className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors" 
                      title="Delete Post"
                    >
                      🗑️
                    </button>
                    <button 
                      className="text-gray-400 hover:text-yellow-500 p-1 rounded transition-colors" 
                      title="Flag Post"
                    >
                      ⚠️
                    </button>
                  </div>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-800 mb-3">
              🎉 Pool Party this Saturday at 2 PM! Join us for food, music, and fun by the pool. Bring your swimsuit and appetite! #CommunityEvent #PoolParty
            </p>
          </div>
          <div className="aspect-square overflow-hidden rounded-lg">
  <img 
    src={PoolPartyImage} 
    alt="Community Pool Party"
    className="w-full h-full object-cover"
  />
</div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">24</span>
                </button>
                <button 
                  onClick={() => setShowComments(prev => ({ ...prev, 1: !prev[1] }))}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">8</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Going</span>
                </button>
              </div>
              <span className="text-sm text-gray-500">24 likes • 8 comments</span>
            </div>
            
            {/* Comments Section */}
            {showComments[1] && (
              <div className="border-t pt-3 space-y-3">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-semibold">SM</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">Sarah M</p>
                      <p className="text-sm text-gray-700">Can't wait! Should I bring anything?</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
                
                {/* Add Comment */}
                <div className="flex items-center space-x-3 pt-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">S</span>
                  </div>
                  <div className="flex-1 flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newComment.trim()) {
                          // Add comment logic here
                          setNewComment('');
                        }
                      }}
                    />
                    <button className="px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Safety Alert Post */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Safety Alert</h4>
                <p className="text-sm text-gray-600">1 hour ago • Management</p>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                URGENT
              </span>
            </div>
            <p className="text-gray-800 mb-3">
              ⚠️ <strong>Slippery conditions at pool deck</strong> - Maintenance is addressing the issue. Please use caution when walking in the area. Expected to be resolved by 3 PM today.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-medium">Seen by 47</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Acknowledged</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Neighbor Recommendation Post */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">MR</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Mike Rodriguez</h4>
                <p className="text-sm text-gray-600">3 hours ago • Unit 7A</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                Recommendation
              </span>
            </div>
            <p className="text-gray-800 mb-3">
              🍕 Just tried Tony's Pizza for delivery - amazing! They deliver to our building in under 30 minutes. Highly recommend the pepperoni! Anyone else tried them?
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">12</span>
                </button>
                <button 
                  onClick={() => setShowComments(prev => ({ ...prev, 3: !prev[3] }))}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">5</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <span className="text-sm font-medium">👍 Helpful</span>
                </button>
              </div>
              <span className="text-sm text-gray-500">12 likes • 5 comments</span>
            </div>
          </div>
        </div>

        {/* New Neighbor Welcome Post */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">LB</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Lisa Brown</h4>
                <p className="text-sm text-gray-600">5 hours ago • Unit 3C</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                New Neighbor
              </span>
            </div>
            <p className="text-gray-800 mb-3">
              👋 Hi everyone! Just moved into Unit 3C with my family. Excited to be part of this community! Any recommendations for the best coffee shops nearby? ☕
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">18</span>
                </button>
                <button 
                  onClick={() => setShowComments(prev => ({ ...prev, 4: !prev[4] }))}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">12</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 transition-colors">
                  <span className="text-sm font-medium">🏠 Welcome</span>
                </button>
              </div>
              <span className="text-sm text-gray-500">18 likes • 12 comments</span>
            </div>
          </div>
        </div>

        {/* Marketplace Post */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">JM</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Jessica Martinez</h4>
                <p className="text-sm text-gray-600">8 hours ago • Unit 4B</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                For Sale
              </span>
            </div>
            <p className="text-gray-800 mb-3">
              🛋️ Moving sale! Selling a beautiful navy blue sofa - barely used, originally $800, asking $400. Perfect for anyone just moving in! DM me if interested.
            </p>
            <div className="aspect-square rounded-lg overflow-hidden mb-3 cursor-pointer hover:opacity-90 transition-opacity">
  <img 
    src={NavySofaImage} 
    alt="Navy Blue Sofa for Sale"
    className="w-full h-full object-cover"
  />
</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">6</span>
                </button>
                <button 
                  onClick={() => setShowComments(prev => ({ ...prev, 5: !prev[5] }))}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">3</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <span className="text-sm font-medium">💰 Interested</span>
                </button>
              </div>
              <span className="text-sm text-gray-500">$400</span>
            </div>
          </div>
        </div>
      </div>

      {/* Load More */}
      <div className="text-center py-6">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          Load More Posts
        </button>
      </div>

      {/* Story Modal */}
      {showStoryModal && currentStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative max-w-md w-full mx-4">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className={`bg-gradient-to-br ${currentStory.gradient} rounded-2xl p-8 text-center text-white`}>
              <div className="text-6xl mb-4">{currentStory.emoji}</div>
              <h3 className="text-2xl font-bold mb-4">{currentStory.title}</h3>
              <p className="text-lg opacity-90">{currentStory.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Post Composer Modal */}
      {showPostComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {composerType === 'photo' && '📸 Share Photo'}
                {composerType === 'event' && '📅 Create Event'}
                {composerType === 'safety' && '🚨 Safety Alert'}
                {composerType === 'share' && '🔗 Share Content'}
                {composerType === 'text' && '✍️ Create Post'}
              </h3>
              <button
                onClick={() => setShowPostComposer(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              {composerType === 'photo' && (
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Drop photos here or click to upload</p>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Upload Photos
                  </button>
                </div>
              )}
              
              {composerType === 'event' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Event title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Event description"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Create Event
                  </button>
                </div>
              )}
              
              {composerType === 'safety' && (
                <div className="space-y-4">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>Select Priority Level</option>
                    <option>🟢 Low Priority</option>
                    <option>🟡 Medium Priority</option>
                    <option>🔴 High Priority</option>
                    <option>🚨 URGENT</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Alert title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Describe the safety issue or alert"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  ></textarea>
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Send Safety Alert
                  </button>
                </div>
              )}
              
              {(composerType === 'share' || composerType === 'text') && (
                <div className="space-y-4">
                  <textarea
                    placeholder="What's on your mind?"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">Photos</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Location</span>
                    </button>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Share Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
)}
          {/* Safety Page */}
          {currentPage === 'safety' && (
            <>
              {/* Safety Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => handleStatClick('all')}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Incidents</p>
                      <p className="text-2xl font-bold text-gray-900">{getSafetyStats().total}</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleStatClick('open')}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-orange-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Open Cases</p>
                      <p className="text-2xl font-bold text-orange-600">{getSafetyStats().open}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleStatClick('high-priority')}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-red-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">High Priority</p>
                      <p className="text-2xl font-bold text-red-600">{getSafetyStats().highPriority}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleStatClick('resolved')}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-green-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Resolved</p>
                      <p className="text-2xl font-bold text-green-600">{getSafetyStats().resolved}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Incident Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => setSafetyFilter('all')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All ({safetyIncidents.length})
                    </button>
                    <button 
                      onClick={() => setSafetyFilter('open')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === 'open' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Open ({getSafetyStats().open})
                    </button>
                    <button 
                      onClick={() => setSafetyFilter('high-priority')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === 'high-priority' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      High Priority ({getSafetyStats().highPriority})
                    </button>
                    <button 
                      onClick={() => setSafetyFilter('theft')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === 'theft' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Theft
                    </button>
                    <button 
                      onClick={() => setSafetyFilter('security')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === 'security' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Security
                    </button>
                    <button 
                      onClick={() => setSafetyFilter('maintenance')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === 'maintenance' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Maintenance
                    </button>
                    <button 
                      onClick={() => setSafetyFilter('resolved')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Resolved ({getSafetyStats().resolved})
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleReportIncident}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Report Incident</span>
                  </button>
                </div>
              </div>

              {/* Incidents List */}
              <div className="space-y-4">
                {getFilteredIncidents().map((incident) => (
                  <div key={incident.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIncidentTypeColor(incident.type)}`}>
                            {incident.type}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                            {incident.priority} priority
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(incident.reportedDate).toLocaleDateString()} at {new Date(incident.reportedDate).toLocaleTimeString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{incident.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{incident.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Location:</span>
                            <span className="ml-2 text-gray-900">{incident.location}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Reported by:</span>
                            <span className="ml-2 text-gray-900">{incident.reportedBy}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Assigned to:</span>
                            <span className="ml-2 text-gray-900">{incident.assignedTo}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        <div className="flex items-center space-x-1 text-gray-500">
                          {getIncidentStatusIcon(incident.status)}
                          <span className="text-sm capitalize">{incident.status}</span>
                        </div>
                        <button 
                          onClick={() => handleViewIncident(incident)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    
                    {incident.updates && incident.updates.length > 0 && (
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Latest update:</span>
                          <span className="text-sm text-gray-900">
                            {incident.updates[incident.updates.length - 1].update} 
                            <span className="text-gray-500 ml-2">by {incident.updates[incident.updates.length - 1].by}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {getFilteredIncidents().length === 0 && (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents found</h3>
                  <p className="text-gray-600">No incidents match the selected filters.</p>
                </div>
              )}
            </>
          )}

          {/* Residents Page */}
          {currentPage === 'residents' && (
            <>
              {/* Residents Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                
  <button
  onClick={() => setResidentFilter('all')}
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-blue-50 hover:shadow-md transition-all cursor-pointer"
>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Residents</p>
                      <p className="text-2xl font-bold text-gray-900">{getResidentStats().total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </button>
                
                <button
  onClick={() => setResidentFilter('active')}
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-green-50 hover:shadow-md transition-all cursor-pointer"
>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Residents</p>
                      <p className="text-2xl font-bold text-green-600">{getResidentStats().active}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </button>
                
                <button
  onClick={() => setResidentFilter('pending')}
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-yellow-50 hover:shadow-md transition-all cursor-pointer"
>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending Move-ins</p>
                      <p className="text-2xl font-bold text-yellow-600">{getResidentStats().pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </button>
                
                <button
 
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 transition-all"
>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{getResidentStats().occupancyRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
              </button>
            </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search residents, units, buildings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setResidentFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          residentFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All ({residentsData.length})
                      </button>
                      <button 
                        onClick={() => setResidentFilter('active')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          residentFilter === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Active ({getResidentStats().active})
                      </button>
                      <button 
                        onClick={() => setResidentFilter('pending')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          residentFilter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Pending ({getResidentStats().pending})
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowAddResidentModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Resident</span>
                  </button>
                </div>
              </div>

              {/* Residents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFilteredResidents().map((resident) => (
                  <div key={resident.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{resident.avatar}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{resident.name}</h3>
                          <p className="text-sm text-gray-600">{resident.unit}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resident.status)}`}>
                        {resident.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {resident.building}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {resident.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {resident.phone}
                      </div>
                    </div>
                    
                    {resident.communityScore && (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Community Score</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{resident.communityScore}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewProfile(resident)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={() => handleSendMessage(resident)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {getFilteredResidents().length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No residents found</h3>
                  <p className="text-gray-600">No residents match the selected filters.</p>
                </div>
              )}
            </>
          )}

          {/* Communications Page */}
          {currentPage === 'communications' && (
            <>
              {/* Communications Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Messages</p>
                      <p className="text-2xl font-bold text-gray-900">847</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Open Rate</p>
                      <p className="text-2xl font-bold text-green-600">94.2%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Templates</p>
                      <p className="text-2xl font-bold text-purple-600">12</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending Messages</p>
                      <p className="text-2xl font-bold text-orange-600">3</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Communications Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setCommFilter('center')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        commFilter === 'center' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Message Center
                    </button>
                    <button 
                      onClick={() => setCommFilter('announcements')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        commFilter === 'announcements' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Announcements
                    </button>
                    <button 
                      onClick={() => setCommFilter('templates')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        commFilter === 'templates' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Templates
                    </button>
                    <button 
                      onClick={() => setCommFilter('direct')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        commFilter === 'direct' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Direct Messages
                    </button>
                    <button 
                      onClick={() => setCommFilter('reports')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        commFilter === 'reports' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Delivery Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Message Center */}
              {commFilter === 'center' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">All Communications</h3>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowBroadcastModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>New Message</span>
                      </button>
                      <button 
                        onClick={() => setShowTemplateModal(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Use Template</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {communicationsData.map((comm) => (
                      <div key={comm.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCommTypeColor(comm.type)}`}>
                                {comm.type}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCommStatusColor(comm.status)}`}>
                                {comm.status}
                              </span>
                              <span className="text-gray-500 text-sm">{comm.sentDate}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{comm.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{comm.preview}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Recipients:</span>
                                <span className="ml-2 text-gray-900">{comm.recipients}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Delivery:</span>
                                <span className="ml-2 text-gray-900">{comm.deliveryMethod}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Open Rate:</span>
                                <span className="ml-2 text-gray-900">{comm.openRate}%</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Sent by:</span>
                                <span className="ml-2 text-gray-900">{comm.sentBy}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 ml-4">
                            <button 
                              onClick={() => handleViewMessage(comm)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleMessageOptions(comm)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Announcements History */}
              {commFilter === 'announcements' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Community Announcements</h3>
                    <button 
                      onClick={() => setShowBroadcastModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Bell className="w-4 h-4" />
                      <span>New Announcement</span>
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {announcementsData.map((announcement) => (
                      <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
                              <Bell className="w-5 h-5 text-green-600" />
                              <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                                {announcement.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{announcement.content}</p>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span>📅 {announcement.date}</span>
                              <span>👥 {announcement.recipients} recipients</span>
                              <span>📊 {announcement.engagement}% engagement</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewAnalytics(announcement)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                            >
                              View Analytics
                            </button>
                            <button 
                              onClick={() => handleAnnouncementOptions(announcement)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Templates */}
              {commFilter === 'templates' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Message Templates</h3>
                    <button 
                      onClick={() => setShowCreateTemplateModal(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Template</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templatesData.map((template) => (
                      <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTemplateTypeColor(template.category)}`}>
                                {template.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500">Usage count:</span>
                                <span className="text-gray-900">{template.usageCount}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500">Last used:</span>
                                <span className="text-gray-900">{template.lastUsed}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 mb-4">
                          <p className="text-gray-600 text-sm italic line-clamp-3">"{template.content}"</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleUseTemplate(template)}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Use Template
                          </button>
                          <button 
                            onClick={() => handleEditTemplate(template)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Messages */}
              {commFilter === 'direct' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Direct Messages</h3>
                    <button 
                      onClick={() => setShowDirectMessageModal(true)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Conversation</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {directMessagesData.map((conversation) => (
                      <div key={conversation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleOpenConversation(conversation)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">{conversation.resident.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{conversation.resident.name}</h3>
                                <span className="text-gray-500 text-sm">•</span>
                                <span className="text-gray-500 text-sm">{conversation.resident.unit}</span>
                                <span className="text-gray-500 text-sm">•</span>
                                <span className="text-gray-500 text-sm">{conversation.resident.building}</span>
                              </div>
                              <p className="text-gray-600 text-sm">{conversation.lastMessage}</p>
                              <p className="text-gray-500 text-xs mt-1">Last activity: {conversation.lastActivity}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {conversation.unreadCount > 0 && (
                              <div className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                {conversation.unreadCount}
                              </div>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConversationStatusColor(conversation.status)}`}>
                              {conversation.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Reports */}
              {commFilter === 'reports' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Delivery Reports</h3>
                  </div>

                  <div className="space-y-4">
                    {deliveryReportsData.map((report) => (
                      <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.messageTitle}</h3>
                            <p className="text-gray-600 text-sm mb-4">Sent on {report.sentDate}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">{report.stats.sent}</p>
                                <p className="text-sm text-gray-600">Sent</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">{report.stats.delivered}</p>
                                <p className="text-sm text-gray-600">Delivered</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">{report.stats.opened}</p>
                                <p className="text-sm text-gray-600">Opened</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-purple-600">{report.stats.clicked}</p>
                                <p className="text-sm text-gray-600">Clicked</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Delivery Rate:</span>
                                <span className="font-medium text-green-600">{report.deliveryRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Open Rate:</span>
                                <span className="font-medium text-blue-600">{report.openRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Click Rate:</span>
                                <span className="font-medium text-purple-600">{report.clickRate}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bars */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Delivery Rate</span>
                              <span>{report.deliveryRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${report.deliveryRate}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Open Rate</span>
                              <span>{report.openRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${report.openRate}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Click Rate</span>
                              <span>{report.clickRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${report.clickRate}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          

        </div>
      </div>

      {/* All Modals */}
      
      {/* Broadcast Message Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
                <button 
                  onClick={() => setShowBroadcastModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Title</label>
                <input
                  type="text"
                  value={broadcastData.title}
                  onChange={(e) => setBroadcastData({...broadcastData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter message title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                <textarea
                  value={broadcastData.message}
                  onChange={(e) => setBroadcastData({...broadcastData, message: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your message..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <select
                    value={broadcastData.recipients}
                    onChange={(e) => setBroadcastData({...broadcastData, recipients: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Residents</option>
                    <option value="building-a">Building A Only</option>
                    <option value="building-b">Building B Only</option>
                    <option value="building-c">Building C Only</option>
                    <option value="active">Active Residents Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={broadcastData.priority}
                    onChange={(e) => setBroadcastData({...broadcastData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Methods</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={broadcastData.deliveryMethods.includes('email')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBroadcastData({...broadcastData, deliveryMethods: [...broadcastData.deliveryMethods, 'email']});
                        } else {
                          setBroadcastData({...broadcastData, deliveryMethods: broadcastData.deliveryMethods.filter(m => m !== 'email')});
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={broadcastData.deliveryMethods.includes('sms')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBroadcastData({...broadcastData, deliveryMethods: [...broadcastData.deliveryMethods, 'sms']});
                        } else {
                          setBroadcastData({...broadcastData, deliveryMethods: broadcastData.deliveryMethods.filter(m => m !== 'sms')});
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={broadcastData.deliveryMethods.includes('push')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBroadcastData({...broadcastData, deliveryMethods: [...broadcastData.deliveryMethods, 'push']});
                        } else {
                          setBroadcastData({...broadcastData, deliveryMethods: broadcastData.deliveryMethods.filter(m => m !== 'push')});
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Push Notification</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowBroadcastModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  console.log('Sending broadcast:', broadcastData);
                  setShowBroadcastModal(false);
                  setBroadcastData({
                    title: '',
                    message: '',
                    recipients: 'all',
                    buildings: [],
                    deliveryMethods: ['email'],
                    priority: 'normal',
                    scheduleType: 'now',
                    scheduledDate: '',
                    scheduledTime: '',
                    attachImage: false,
                    imageFile: null
                  });
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create New Event</h3>
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => setEventData({...eventData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({...eventData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) => setEventData({...eventData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event location..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event description..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={eventData.category}
                    onChange={(e) => setEventData({...eventData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="social">Social</option>
                    <option value="wellness">Wellness</option>
                    <option value="safety">Safety</option>
                    <option value="family">Family</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                  <input
                    type="number"
                    value={eventData.maxAttendees}
                    onChange={(e) => setEventData({...eventData, maxAttendees: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={eventData.rsvpRequired}
                    onChange={(e) => setEventData({...eventData, rsvpRequired: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">RSVP Required</span>
                </label>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreateEventModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateEvent}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTemplate ? 'Edit Template' : 'Create New Template'}
                </h3>
                <button 
                  onClick={() => {
                    setShowCreateTemplateModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter template name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="events">Events</option>
                  <option value="administrative">Administrative</option>
                  <option value="safety">Safety</option>
                  <option value="policy">Policy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Content</label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter template content... Use [VARIABLE_NAME] for placeholders."
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2"><strong>Available Variables:</strong></p>
                <p className="text-xs text-gray-500">
                  [DATE], [TIME], [LOCATION], [EVENT_NAME], [RESIDENT_NAME], [AMOUNT], [DUE_DATE], [COMMUNITY_NAME], [PHONE]
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowCreateTemplateModal(false);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleCreateTemplate();
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                {selectedTemplate ? 'Update Template' : 'Create Template'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Select a Template</h3>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templatesData.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 cursor-pointer transition-colors" onClick={() => handleUseTemplate(template)}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTemplateTypeColor(template.category)}`}>
                        {template.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                    <p className="text-gray-500 text-xs italic line-clamp-3">"{template.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Direct Message Modal */}
{showDirectMessageModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">New Conversation</h3>
          <button
            onClick={() => setShowDirectMessageModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Recipient Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
          <select 
            value={selectedMessage?.recipient || ''}
            onChange={(e) => setSelectedMessage({...selectedMessage, recipient: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a resident...</option>
            <option value="sarah_chen">Sarah Chen - Unit 4B</option>
            <option value="mike_rodriguez">Mike Rodriguez - Unit 12A</option>
            <option value="emily_johnson">Emily Johnson - Unit 7C</option>
            <option value="david_kim">David Kim - Unit 15D</option>
            <option value="lisa_garcia">Lisa Garcia - Unit 3A</option>
            <option value="james_wilson">James Wilson - Unit 9B</option>
            <option value="maria_lopez">Maria Lopez - Unit 11E</option>
            <option value="robert_brown">Robert Brown - Unit 6F</option>
          </select>
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            value={selectedMessage?.subject || ''}
            onChange={(e) => setSelectedMessage({...selectedMessage, subject: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter message subject..."
          />
        </div>

        {/* Message Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <div className="flex space-x-3">
            {['Low', 'Normal', 'High', 'Urgent'].map((priority) => (
              <label key={priority} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={priority.toLowerCase()}
                  checked={(selectedMessage?.priority || 'normal') === priority.toLowerCase()}
                  onChange={(e) => setSelectedMessage({...selectedMessage, priority: e.target.value})}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className={`ml-2 text-sm font-medium ${
                  priority === 'Urgent' ? 'text-red-600' : 
                  priority === 'High' ? 'text-orange-600' : 
                  'text-gray-700'
                }`}>
                  {priority}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Message Composer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            value={selectedMessage?.content || ''}
            onChange={(e) => setSelectedMessage({...selectedMessage, content: e.target.value})}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Type your message here..."
          />
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>📎 Attach files (optional)</span>
            <span>{selectedMessage?.content?.length || 0}/1000 characters</span>
          </div>
        </div>

        {/* Quick Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quick Templates</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedMessage({
                ...selectedMessage, 
                content: "Hi! I hope you're doing well. I wanted to follow up regarding your recent request. Please let me know if you have any questions or need assistance with anything."
              })}
              className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">Follow-up Message</div>
              <div className="text-xs text-gray-500">General follow-up template</div>
            </button>
            <button
              onClick={() => setSelectedMessage({
                ...selectedMessage, 
                content: "Thank you for bringing this to our attention. We take all maintenance requests seriously and will address this promptly. Our team will contact you within 24 hours to schedule a convenient time."
              })}
              className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">Maintenance Response</div>
              <div className="text-xs text-gray-500">Standard maintenance reply</div>
            </button>
            <button
              onClick={() => setSelectedMessage({
                ...selectedMessage, 
                content: "We appreciate you as a valued resident of our community. Your feedback helps us improve our services. If you have any suggestions or concerns, please don't hesitate to reach out."
              })}
              className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">Appreciation Note</div>
              <div className="text-xs text-gray-500">Thank you message</div>
            </button>
            <button
              onClick={() => setSelectedMessage({
                ...selectedMessage, 
                content: "I wanted to check in and see how everything is going with your recent move-in. Please let us know if you need assistance with anything or have questions about the community amenities."
              })}
              className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900">New Resident Check-in</div>
              <div className="text-xs text-gray-500">Welcome and check-in</div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
        <button
          onClick={() => setShowDirectMessageModal(false)}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Save draft functionality
            console.log('Message saved as draft:', selectedMessage);
            setShowDirectMessageModal(false);
          }}
          className="px-4 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
        >
          Save Draft
        </button>
        <button
          onClick={() => {
            // Send message functionality
            if (selectedMessage?.recipient && selectedMessage?.content) {
              console.log('Sending message:', selectedMessage);
              // Here you would typically send the message via API
              setShowDirectMessageModal(false);
              setSelectedMessage({});
              // Show success notification
              alert('Message sent successfully!');
            } else {
              alert('Please select a recipient and enter a message.');
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Send size={16} />
          <span>Send Message</span>
        </button>
      </div>
    </div>
  </div>
)}

      {/* Message Detail Modal */}
      {showMessageDetailModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.title}</h3>
                <button 
                  onClick={() => setShowMessageDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCommTypeColor(selectedMessage.type)}`}>
                  {selectedMessage.type}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCommStatusColor(selectedMessage.status)}`}>
                  {selectedMessage.status}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">{selectedMessage.content}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Sent to:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.recipients} recipients</span>
                </div>
                <div>
                  <span className="text-gray-500">Delivery method:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.deliveryMethod}</span>
                </div>
                <div>
                  <span className="text-gray-500">Open rate:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.openRate}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Sent by:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.sentBy}</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                Sent on {selectedMessage.sentDate}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Analytics: {selectedAnnouncement.title}</h3>
                <button 
                  onClick={() => setShowAnalyticsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{selectedAnnouncement.views}</p>
                  <p className="text-sm text-gray-600">Total Views</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{selectedAnnouncement.engagement}%</p>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{selectedAnnouncement.likes}</p>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>View Rate</span>
                    <span>{Math.round((selectedAnnouncement.views / selectedAnnouncement.recipients) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.round((selectedAnnouncement.views / selectedAnnouncement.recipients) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Engagement Rate</span>
                    <span>{selectedAnnouncement.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${selectedAnnouncement.engagement}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Like Rate</span>
                    <span>{Math.round((selectedAnnouncement.likes / selectedAnnouncement.views) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${Math.round((selectedAnnouncement.likes / selectedAnnouncement.views) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add Resident Modal */}
      {showAddResidentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Resident</h3>
                <button 
                  onClick={() => setShowAddResidentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter resident's full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4B, 205, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddResidentModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAddResidentModal(false);
                    // Add resident logic here
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add Resident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Report Incident Modal */}
      {showReportIncidentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Report Safety Incident</h3>
                <button 
                  onClick={() => setShowReportIncidentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Security Concern</option>
                  <option>Safety Hazard</option>
                  <option>Emergency</option>
                  <option>Maintenance Issue</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Building, floor, unit number..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the incident in detail..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowReportIncidentModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowReportIncidentModal(false);
                    // Add incident reporting logic here
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Report Incident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Resident Profile Modal */}
      {showResidentProfile && selectedResident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Resident Profile</h3>
                <button 
                  onClick={() => setShowResidentProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {selectedResident.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedResident.name}</h4>
                  <p className="text-gray-600">{selectedResident.unit}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    selectedResident.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedResident.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedResident.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> {selectedResident.email}</p>
                    <p><strong>Phone:</strong> {selectedResident.phone}</p>
                    <p><strong>Emergency Contact:</strong> {selectedResident.emergency || 'Not provided'}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Lease Information</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Lease Start:</strong> {selectedResident.leaseStart || 'N/A'}</p>
                    <p><strong>Lease End:</strong> {selectedResident.leaseEnd || 'N/A'}</p>
                    <p><strong>Rent:</strong> ${selectedResident.rent || 'N/A'}/month</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowResidentProfile(false);
                    setShowMessageModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setShowResidentProfile(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Message Modal */}
      {showMessageModal && selectedResident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-600">
                    {selectedResident.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedResident.name}</p>
                  <p className="text-sm text-gray-600">{selectedResident.unit}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessageSubmit}
                  disabled={!messageContent.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">New Resident Added</p>
                    <p className="text-sm text-gray-600">John Smith has been added to Unit 4B</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Safety Incident Report</p>
                    <p className="text-sm text-gray-600">Security concern reported in parking garage</p>
                    <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Event Created</p>
                    <p className="text-sm text-gray-600">Community BBQ scheduled for this weekend</p>
                    <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowNotifications(false)}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Profile Menu Modal */}
      {showProfileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Profile Menu</h3>
                <button 
                  onClick={() => setShowProfileMenu(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">S</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Property Manager</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Account Settings</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Notification Preferences</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
                  <span className="w-5 h-5 text-red-500">🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600"><strong>Date:</strong> {selectedEvent.date}</p>
                    <p className="text-gray-600"><strong>Time:</strong> {selectedEvent.time}</p>
                    <p className="text-gray-600"><strong>Location:</strong> {selectedEvent.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Category:</strong> {selectedEvent.category}</p>
                    <p className="text-gray-600"><strong>Max Attendees:</strong> {selectedEvent.maxAttendees}</p>
                    <p className="text-gray-600"><strong>Current Attendees:</strong> {selectedEvent.currentAttendees}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                <p className="text-gray-600">{selectedEvent.description}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Attendance Progress</h5>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Registered</span>
                  <span>{selectedEvent.currentAttendees} / {selectedEvent.maxAttendees}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all" 
                    style={{ width: `${Math.min((selectedEvent.currentAttendees / selectedEvent.maxAttendees) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setShowEditEventModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Edit Event
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Event Modal */}
      {showEditEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Event</h3>
                <button 
                  onClick={() => setShowEditEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={eventData.title}
                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={eventData.category}
                    onChange={(e) => setEventData({...eventData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="social">Social</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="meeting">Meeting</option>
                    <option value="fitness">Fitness</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({...eventData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) => setEventData({...eventData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees</label>
                <input
                  type="number"
                  value={eventData.maxAttendees}
                  onChange={(e) => setEventData({...eventData, maxAttendees: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEditEventModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowEditEventModal(false);
                    // Add event update logic here
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Incident Details Modal */}
      {showIncidentModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Incident Details</h3>
                <button 
                  onClick={() => setShowIncidentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{selectedIncident.title}</h4>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getIncidentTypeColor(selectedIncident.type)}`}>
                      {selectedIncident.type}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedIncident.priority)}`}>
                      {selectedIncident.priority} priority
                    </span>
                    <div className="flex items-center space-x-1 text-gray-600">
                      {getIncidentStatusIcon(selectedIncident.status)}
                      <span className="text-sm capitalize">{selectedIncident.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Incident Details</h5>
                  <div className="space-y-2 text-sm">
                    <p><strong>Reported:</strong> {new Date(selectedIncident.reportedDate).toLocaleDateString()} at {new Date(selectedIncident.reportedDate).toLocaleTimeString()}</p>
                    <p><strong>Location:</strong> {selectedIncident.location}</p>
                    <p><strong>Reported by:</strong> {selectedIncident.reportedBy}</p>
                    <p><strong>Assigned to:</strong> {selectedIncident.assignedTo}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                  <p className="text-gray-600 text-sm">{selectedIncident.description}</p>
                </div>
              </div>
              
              {selectedIncident.updates && selectedIncident.updates.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Updates Timeline</h5>
                  <div className="space-y-3">
                    {selectedIncident.updates.map((update, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{update.update}</p>
                          <p className="text-xs text-gray-500 mt-1">by {update.by} • {update.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowIncidentModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
  setShowIncidentModal(false);
  setShowEditIncidentModal(true);
}}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Edit Incident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Incident Modal */}
      {showEditIncidentModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Incident</h3>
                <button 
                  onClick={() => setShowEditIncidentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incident Title</label>
                  <input
                    type="text"
                    defaultValue={selectedIncident.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    defaultValue={selectedIncident.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="theft">Theft</option>
                    <option value="security">Security</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="accident">Accident</option>
                    <option value="system">System</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    defaultValue={selectedIncident.priority}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    defaultValue={selectedIncident.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="investigating">Investigating</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="documenting">Documenting</option>
                    <option value="resolved">Resolved</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  defaultValue={selectedIncident.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  defaultValue={selectedIncident.description}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  type="text"
                  defaultValue={selectedIncident.assignedTo}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEditIncidentModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowEditIncidentModal(false);
                    // Add incident update logic here
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementDashboard;

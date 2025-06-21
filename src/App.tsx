// @ts-nocheck
import React, { useState, useEffect } from 'react';
import HeyNeighborLogo from './Assets/heyneighbor-logo.svg';
import { 
  Users, 
  AlertTriangle, 
  Calendar,
  MessageSquare,
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
  Trash2
} from 'lucide-react';

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
  const [showReportIncidentModal, setShowReportIncidentModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'maintenance',
    content: ''
  });

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
            onClick={() => setCurrentPage('settings')}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
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
                 currentPage === 'settings' ? 'Settings' : greeting}
              </h1>
              <p className="text-gray-600 mt-1">
                {currentPage === 'dashboard' ? "Here's what's happening in your community today" :
                 currentPage === 'activity' ? 'Complete activity feed and incident tracking' :
                 currentPage === 'residents' ? 'Manage residents and community members' :
                 currentPage === 'safety' ? 'Monitor incidents and safety reports' :
                 currentPage === 'events' ? 'Organize and manage community events' :
                 'Complete activity feed and incident tracking'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search residents, reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">S</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 space-y-4">
          {/* Dashboard Page */}
          {currentPage === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-28 h-28 flex flex-col">
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
                </div>

                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-28 h-28 flex flex-col">
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
                {/* Recent Activity */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        <button 
                          onClick={() => setCurrentPage('activity')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View All
                        </button>
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

                {/* Quick Actions Sidebar */}
                <div className="lg:col-span-1 space-y-6">
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Activity Page */}
          {currentPage === 'activity' && (
            <>
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
  onClick={() => handleResidentStatClick('all')}
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
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
  onClick={() => handleResidentStatClick('active')}
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
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
  onClick={() => handleResidentStatClick('pending')}
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
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
  onClick={() => handleResidentStatClick('occupancy')}
  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
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
    </div>
  );
};

export default ManagementDashboard;

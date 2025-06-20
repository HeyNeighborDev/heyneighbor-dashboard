import React, { useState, useEffect } from 'react';
import { 
  Users, AlertTriangle, Calendar, MessageSquare, Shield, Bell, Search, Plus, 
  MoreHorizontal, Home, Settings, BarChart3, UserPlus, Send, Eye, Clock, 
  CheckCircle, AlertCircle, Building2, MapPin, Phone, Mail, Edit, Trash2, 
  Filter, Download, Upload, FileText, Tag, TrendingUp, Activity, DollarSign, 
  Zap, ChevronDown, ChevronRight, Star, Heart, ThumbsUp, Reply, Forward, 
  Archive, MoreVertical, X, CalendarDays, Users2, PartyPopper, Wrench, 
  Coffee, Gamepad2, BookOpen, Music, Car, Utensils, Gift 
} from 'lucide-react';

// Types
interface Resident {
  id: string;
  name: string;
  unit: string;
  phone: string;
  email: string;
  moveInDate: string;
  leaseEnd: string;
  status: 'active' | 'inactive' | 'pending';
  emergencyContact: string;
  emergencyPhone: string;
  rentAmount: number;
  lastPayment: string;
  balance: number;
}

interface SafetyIncident {
  id: string;
  type: 'maintenance' | 'security' | 'emergency' | 'noise';
  title: string;
  description: string;
  location: string;
  reportedBy: string;
  date: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  resolution?: string;
  attachments?: string[];
}

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: string;
  recipients: string[];
  timestamp: string;
  type: 'announcement' | 'direct' | 'emergency';
  status: 'draft' | 'sent' | 'delivered' | 'read';
  priority: 'low' | 'medium' | 'high';
  category: string;
  attachments?: string[];
  readBy?: string[];
  deliveryReport?: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  };
}

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  variables: string[];
  lastUsed?: string;
  useCount: number;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
  }[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: 'social' | 'maintenance' | 'meeting' | 'holiday' | 'fitness' | 'educational' | 'food' | 'entertainment';
  organizer: string;
  maxAttendees?: number;
  rsvpRequired: boolean;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  visibility: 'public' | 'residents-only' | 'board-only';
  attendees: {
    userId: string;
    name: string;
    status: 'going' | 'maybe' | 'not-going' | 'pending';
    rsvpDate: string;
  }[];
  reminders: {
    type: 'email' | 'sms' | 'push';
    time: '1-day' | '1-hour' | '30-min';
    sent: boolean;
  }[];
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    endDate?: string;
  };
  cost?: number;
  requirements?: string[];
  attachments?: string[];
}

interface EventStats {
  thisMonth: number;
  upcoming: number;
  totalAttendees: number;
  avgAttendance: number;
}

type Page = 'dashboard' | 'residents' | 'safety' | 'communications' | 'events';
type CommTab = 'messages' | 'announcements' | 'templates' | 'direct' | 'reports';
type EventTab = 'calendar' | 'list' | 'analytics';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modal states
  const [showAddResident, setShowAddResident] = useState<boolean>(false);
  const [showEditResident, setShowEditResident] = useState<boolean>(false);
  const [showResidentDetails, setShowResidentDetails] = useState<boolean>(false);
  const [showAddIncident, setShowAddIncident] = useState<boolean>(false);
  const [showEditIncident, setShowEditIncident] = useState<boolean>(false);
  const [showIncidentDetails, setShowIncidentDetails] = useState<boolean>(false);
  const [showCreateMessage, setShowCreateMessage] = useState<boolean>(false);
  const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState<boolean>(false);
  const [showEditTemplate, setShowEditTemplate] = useState<boolean>(false);
  const [showConversation, setShowConversation] = useState<boolean>(false);
  const [showCreateEvent, setShowCreateEvent] = useState<boolean>(false);
  const [showEditEvent, setShowEditEvent] = useState<boolean>(false);
  const [showEventDetails, setShowEventDetails] = useState<boolean>(false);

  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Communications state
  const [activeCommTab, setActiveCommTab] = useState<CommTab>('messages');
  
  // Events state
  const [activeEventTab, setActiveEventTab] = useState<EventTab>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');

  // Sample data
  const residents: Resident[] = [
    {
      id: '1',
      name: 'John Smith',
      unit: 'A101',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      moveInDate: '2023-01-15',
      leaseEnd: '2024-01-15',
      status: 'active',
      emergencyContact: 'Jane Smith',
      emergencyPhone: '(555) 987-6543',
      rentAmount: 1200,
      lastPayment: '2024-01-01',
      balance: 0
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      unit: 'B205',
      phone: '(555) 234-5678',
      email: 'sarah.johnson@email.com',
      moveInDate: '2023-03-20',
      leaseEnd: '2024-03-20',
      status: 'active',
      emergencyContact: 'Mike Johnson',
      emergencyPhone: '(555) 876-5432',
      rentAmount: 1350,
      lastPayment: '2024-01-01',
      balance: 0
    },
    {
      id: '3',
      name: 'Mike Wilson',
      unit: 'C301',
      phone: '(555) 345-6789',
      email: 'mike.wilson@email.com',
      moveInDate: '2023-06-10',
      leaseEnd: '2024-06-10',
      status: 'active',
      emergencyContact: 'Lisa Wilson',
      emergencyPhone: '(555) 765-4321',
      rentAmount: 1100,
      lastPayment: '2023-12-01',
      balance: 1100
    }
  ];

  const safetyIncidents: SafetyIncident[] = [
    {
      id: '1',
      type: 'maintenance',
      title: 'Broken elevator in Building A',
      description: 'The elevator is making strange noises and stopped working.',
      location: 'Building A - Elevator',
      reportedBy: 'John Smith',
      date: '2024-01-15',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Maintenance Team'
    },
    {
      id: '2',
      type: 'security',
      title: 'Suspicious activity in parking lot',
      description: 'Unknown person was seen trying car door handles.',
      location: 'Parking Lot B',
      reportedBy: 'Sarah Johnson',
      date: '2024-01-14',
      status: 'resolved',
      priority: 'medium',
      assignedTo: 'Security',
      resolution: 'Security footage reviewed. Person identified as delivery driver looking for correct vehicle.'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      subject: 'Building Maintenance Notice',
      content: 'We will be performing routine maintenance on the HVAC system this weekend.',
      sender: 'Property Management',
      recipients: ['All Residents'],
      timestamp: '2024-01-15T10:00:00Z',
      type: 'announcement',
      status: 'sent',
      priority: 'medium',
      category: 'maintenance',
      deliveryReport: {
        sent: 150,
        delivered: 148,
        opened: 89,
        clicked: 12
      }
    },
    {
      id: '2',
      subject: 'Welcome to the Community!',
      content: 'Welcome to our community! Here is everything you need to know about your new home.',
      sender: 'Property Management',
      recipients: ['New Residents'],
      timestamp: '2024-01-14T14:30:00Z',
      type: 'direct',
      status: 'delivered',
      priority: 'low',
      category: 'welcome'
    }
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Maintenance Notice',
      subject: 'Scheduled Maintenance - {{DATE}}',
      content: 'Dear {{RESIDENT_NAME}},\n\nWe will be performing maintenance on {{MAINTENANCE_TYPE}} on {{DATE}} from {{START_TIME}} to {{END_TIME}}.\n\nPlease ensure access to {{ACCESS_AREAS}}.\n\nThank you for your cooperation.',
      category: 'maintenance',
      variables: ['RESIDENT_NAME', 'DATE', 'MAINTENANCE_TYPE', 'START_TIME', 'END_TIME', 'ACCESS_AREAS'],
      lastUsed: '2024-01-10',
      useCount: 25
    },
    {
      id: '2',
      name: 'Rent Reminder',
      subject: 'Rent Due Reminder - {{MONTH}}',
      content: 'Dear {{RESIDENT_NAME}},\n\nThis is a friendly reminder that your rent payment of ${{AMOUNT}} is due on {{DUE_DATE}}.\n\nYour current balance is ${{BALANCE}}.\n\nThank you!',
      category: 'billing',
      variables: ['RESIDENT_NAME', 'MONTH', 'AMOUNT', 'DUE_DATE', 'BALANCE'],
      useCount: 87
    },
    {
      id: '3',
      name: 'Welcome Package',
      subject: 'Welcome to {{COMMUNITY_NAME}}!',
      content: 'Dear {{RESIDENT_NAME}},\n\nWelcome to your new home at {{COMMUNITY_NAME}}!\n\nYour unit {{UNIT_NUMBER}} is ready for move-in on {{MOVE_IN_DATE}}.\n\nImportant information:\n- Office hours: {{OFFICE_HOURS}}\n- Emergency contact: {{EMERGENCY_CONTACT}}\n- WiFi password: {{WIFI_PASSWORD}}\n\nWe are excited to have you as part of our community!',
      category: 'welcome',
      variables: ['RESIDENT_NAME', 'COMMUNITY_NAME', 'UNIT_NUMBER', 'MOVE_IN_DATE', 'OFFICE_HOURS', 'EMERGENCY_CONTACT', 'WIFI_PASSWORD'],
      useCount: 12
    },
    {
      id: '4',
      name: 'Lease Renewal',
      subject: 'Lease Renewal Opportunity - {{UNIT_NUMBER}}',
      content: 'Dear {{RESIDENT_NAME}},\n\nYour current lease for unit {{UNIT_NUMBER}} expires on {{LEASE_END_DATE}}.\n\nWe would love to have you continue as part of our community! Your renewal terms:\n- New rent: ${{NEW_RENT}}\n- Lease term: {{LEASE_TERM}}\n- Move-in incentives: {{INCENTIVES}}\n\nPlease respond by {{RESPONSE_DEADLINE}} to secure your renewal.',
      category: 'leasing',
      variables: ['RESIDENT_NAME', 'UNIT_NUMBER', 'LEASE_END_DATE', 'NEW_RENT', 'LEASE_TERM', 'INCENTIVES', 'RESPONSE_DEADLINE'],
      useCount: 8
    },
    {
      id: '5',
      name: 'Community Event',
      subject: 'You are Invited: {{EVENT_NAME}}',
      content: 'Dear {{RESIDENT_NAME}},\n\nYou are invited to {{EVENT_NAME}}!\n\nWhen: {{EVENT_DATE}} at {{EVENT_TIME}}\nWhere: {{EVENT_LOCATION}}\nWhat to bring: {{BRING_ITEMS}}\n\n{{EVENT_DESCRIPTION}}\n\nRSVP by {{RSVP_DEADLINE}} to {{RSVP_CONTACT}}.\n\nWe hope to see you there!',
      category: 'events',
      variables: ['RESIDENT_NAME', 'EVENT_NAME', 'EVENT_DATE', 'EVENT_TIME', 'EVENT_LOCATION', 'BRING_ITEMS', 'EVENT_DESCRIPTION', 'RSVP_DEADLINE', 'RSVP_CONTACT'],
      useCount: 15
    },
    {
      id: '6',
      name: 'Policy Update',
      subject: 'Important Policy Update - {{POLICY_AREA}}',
      content: 'Dear {{RESIDENT_NAME}},\n\nWe are updating our {{POLICY_AREA}} policy, effective {{EFFECTIVE_DATE}}.\n\nKey changes:\n{{POLICY_CHANGES}}\n\nReason for change: {{CHANGE_REASON}}\n\nFull policy document is available at {{POLICY_LINK}}.\n\nQuestions? Contact us at {{CONTACT_INFO}}.',
      category: 'policy',
      variables: ['RESIDENT_NAME', 'POLICY_AREA', 'EFFECTIVE_DATE', 'POLICY_CHANGES', 'CHANGE_REASON', 'POLICY_LINK', 'CONTACT_INFO'],
      useCount: 3
    }
  ];

  const conversations: Conversation[] = [
    {
      id: '1',
      participants: ['Property Management', 'John Smith'],
      lastMessage: 'Thank you for the quick response!',
      lastMessageTime: '2024-01-15T16:30:00Z',
      unreadCount: 0,
      messages: [
        {
          id: '1',
          sender: 'John Smith',
          content: 'Hi, I am having issues with my heating unit.',
          timestamp: '2024-01-15T15:00:00Z',
          status: 'read'
        },
        {
          id: '2',
          sender: 'Property Management',
          content: 'I will send maintenance to check it out this afternoon.',
          timestamp: '2024-01-15T15:15:00Z',
          status: 'read'
        },
        {
          id: '3',
          sender: 'John Smith',
          content: 'Thank you for the quick response!',
          timestamp: '2024-01-15T16:30:00Z',
          status: 'read'
        }
      ]
    },
    {
      id: '2',
      participants: ['Property Management', 'Sarah Johnson'],
      lastMessage: 'I will be out of town that weekend.',
      lastMessageTime: '2024-01-14T12:45:00Z',
      unreadCount: 1,
      messages: [
        {
          id: '1',
          sender: 'Property Management',
          content: 'We are planning a community BBQ next weekend. Are you interested?',
          timestamp: '2024-01-14T12:00:00Z',
          status: 'read'
        },
        {
          id: '2',
          sender: 'Sarah Johnson',
          content: 'I will be out of town that weekend.',
          timestamp: '2024-01-14T12:45:00Z',
          status: 'delivered'
        }
      ]
    }
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'Community BBQ',
      description: 'Join us for a fun community barbecue! Food, drinks, and great company.',
      date: '2024-01-20',
      startTime: '12:00',
      endTime: '16:00',
      location: 'Community Pool Area',
      category: 'social',
      organizer: 'Property Management',
      maxAttendees: 50,
      rsvpRequired: true,
      status: 'scheduled',
      visibility: 'public',
      attendees: [
        { userId: '1', name: 'John Smith', status: 'going', rsvpDate: '2024-01-15T10:00:00Z' },
        { userId: '2', name: 'Sarah Johnson', status: 'maybe', rsvpDate: '2024-01-16T14:30:00Z' },
        { userId: '3', name: 'Mike Wilson', status: 'going', rsvpDate: '2024-01-16T16:45:00Z' }
      ],
      reminders: [
        { type: 'email', time: '1-day', sent: false },
        { type: 'sms', time: '1-hour', sent: false }
      ],
      cost: 5,
      requirements: ['Bring your own drinks', 'Kids under 12 must be supervised']
    },
    {
      id: '2',
      title: 'Board Meeting',
      description: 'Monthly board meeting to discuss community matters and upcoming projects.',
      date: '2024-01-25',
      startTime: '19:00',
      endTime: '21:00',
      location: 'Community Room',
      category: 'meeting',
      organizer: 'Board of Directors',
      rsvpRequired: false,
      status: 'scheduled',
      visibility: 'residents-only',
      attendees: [],
      reminders: [
        { type: 'email', time: '1-day', sent: false }
      ]
    },
    {
      id: '3',
      title: 'Elevator Maintenance',
      description: 'Scheduled maintenance for Building A elevator. Service will be unavailable.',
      date: '2024-01-22',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Building A',
      category: 'maintenance',
      organizer: 'Maintenance Team',
      rsvpRequired: false,
      status: 'scheduled',
      visibility: 'public',
      attendees: [],
      reminders: [
        { type: 'email', time: '1-day', sent: false }
      ]
    },
    {
      id: '4',
      title: 'Yoga Class',
      description: 'Weekly yoga class for all skill levels. Bring your own mat!',
      date: '2024-01-24',
      startTime: '18:00',
      endTime: '19:00',
      location: 'Community Room',
      category: 'fitness',
      organizer: 'Wellness Committee',
      maxAttendees: 15,
      rsvpRequired: true,
      status: 'scheduled',
      visibility: 'public',
      attendees: [
        { userId: '2', name: 'Sarah Johnson', status: 'going', rsvpDate: '2024-01-18T09:00:00Z' }
      ],
      reminders: [
        { type: 'email', time: '1-day', sent: false }
      ],
      recurring: {
        frequency: 'weekly'
      },
      requirements: ['Bring yoga mat', 'Wear comfortable clothes']
    },
    {
      id: '5',
      title: 'New Year Party',
      description: 'Celebrate the New Year with your neighbors! DJ, dancing, and midnight toast.',
      date: '2023-12-31',
      startTime: '21:00',
      endTime: '01:00',
      location: 'Community Center',
      category: 'holiday',
      organizer: 'Social Committee',
      maxAttendees: 100,
      rsvpRequired: true,
      status: 'completed',
      visibility: 'public',
      attendees: [
        { userId: '1', name: 'John Smith', status: 'going', rsvpDate: '2023-12-15T10:00:00Z' },
        { userId: '2', name: 'Sarah Johnson', status: 'going', rsvpDate: '2023-12-16T14:30:00Z' },
        { userId: '3', name: 'Mike Wilson', status: 'not-going', rsvpDate: '2023-12-18T16:45:00Z' }
      ],
      reminders: [
        { type: 'email', time: '1-day', sent: true },
        { type: 'sms', time: '1-hour', sent: true }
      ],
      cost: 10
    }
  ];

  // Utility functions
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString: string): string => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEventIcon = (category: Event['category']) => {
    switch (category) {
      case 'social': return PartyPopper;
      case 'maintenance': return Wrench;
      case 'meeting': return Users2;
      case 'holiday': return Gift;
      case 'fitness': return Activity;
      case 'educational': return BookOpen;
      case 'food': return Utensils;
      case 'entertainment': return Music;
      default: return Calendar;
    }
  };

  const getEventColor = (category: Event['category']): string => {
    switch (category) {
      case 'social': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'holiday': return 'bg-red-100 text-red-800';
      case 'fitness': return 'bg-green-100 text-green-800';
      case 'educational': return 'bg-indigo-100 text-indigo-800';
      case 'food': return 'bg-yellow-100 text-yellow-800';
      case 'entertainment': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Event['status']): string => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRSVPStatusColor = (status: string): string => {
    switch (status) {
      case 'going': return 'text-green-600';
      case 'maybe': return 'text-yellow-600';
      case 'not-going': return 'text-red-600';
      case 'pending': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: string): Event[] => {
    return events.filter((event: Event) => event.date === date);
  };

  const getEventStats = (): EventStats => {
    const now = new Date();
    const thisMonth = events.filter((event: Event) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    });

    const upcoming = events.filter((event: Event) => {
      const eventDate = new Date(event.date);
      return eventDate > now && event.status === 'scheduled';
    });

    const totalAttendees = events.reduce((sum: number, event: Event) => 
      sum + event.attendees.filter((a) => a.status === 'going').length, 0
    );

    const completedEvents = events.filter((e: Event) => e.status === 'completed');
    const avgAttendance = completedEvents.length > 0 ? 
      completedEvents.reduce((sum: number, event: Event) => 
        sum + event.attendees.filter((a) => a.status === 'going').length, 0
      ) / completedEvents.length : 0;

    return {
      thisMonth: thisMonth.length,
      upcoming: upcoming.length,
      totalAttendees,
      avgAttendance: Math.round(avgAttendance)
    };
  };

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleEventFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setEventFilter(e.target.value);
  };

  const handlePageChange = (page: Page): void => {
    setCurrentPage(page);
  };

  const handleCommTabChange = (tab: CommTab): void => {
    setActiveCommTab(tab);
  };

  const handleEventTabChange = (tab: EventTab): void => {
    setActiveEventTab(tab);
  };

  const handleDateChange = (date: string): void => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: Event): void => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleCloseModal = (): void => {
    setShowAddResident(false);
    setShowEditResident(false);
    setShowResidentDetails(false);
    setShowAddIncident(false);
    setShowEditIncident(false);
    setShowIncidentDetails(false);
    setShowCreateMessage(false);
    setShowMessageDetails(false);
    setShowCreateTemplate(false);
    setShowEditTemplate(false);
    setShowConversation(false);
    setShowCreateEvent(false);
    setShowEditEvent(false);
    setShowEventDetails(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    // Handle button click
  };

  // Navigation component
  const Navigation: React.FC = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PropertyHub</span>
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => handlePageChange('dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
                type="button"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => handlePageChange('residents')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'residents' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
                type="button"
              >
                <Users className="h-4 w-4" />
                <span>Residents</span>
              </button>
              <button
                onClick={() => handlePageChange('safety')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'safety' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
                type="button"
              >
                <Shield className="h-4 w-4" />
                <span>Safety</span>
              </button>
              <button
                onClick={() => handlePageChange('communications')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'communications' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
                type="button"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Communications</span>
              </button>
              <button
                onClick={() => handlePageChange('events')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'events' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
                type="button"
              >
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-500" type="button">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500" type="button">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  // Dashboard page component
  const DashboardPage: React.FC = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here is what is happening in your property.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Residents</p>
              <p className="text-2xl font-semibold text-gray-900">{residents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Incidents</p>
              <p className="text-2xl font-semibold text-gray-900">
                {safetyIncidents.filter((incident: SafetyIncident) => incident.status !== 'resolved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Outstanding Balance</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${residents.reduce((sum: number, resident: Resident) => sum + resident.balance, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
              <p className="text-2xl font-semibold text-gray-900">
                {events.filter((event: Event) => new Date(event.date) > new Date() && event.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New resident moved in</p>
                <p className="text-sm text-gray-500">Mike Wilson - Unit C301</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New incident reported</p>
                <p className="text-sm text-gray-500">Broken elevator in Building A</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Incident resolved</p>
                <p className="text-sm text-gray-500">Suspicious activity in parking lot</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events
              .filter((event: Event) => new Date(event.date) > new Date() && event.status === 'scheduled')
              .slice(0, 3)
              .map((event: Event) => {
                const IconComponent = getEventIcon(event.category);
                return (
                  <div key={event.id} className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getEventColor(event.category)}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(event.date)} at {formatTime(event.startTime)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );

  // Events page component
  const EventsPage: React.FC = () => {
    const eventStats = getEventStats();
    const currentDate = new Date(selectedDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const filteredEvents = events.filter((event: Event) => {
      if (eventFilter === 'all') return true;
      return event.category === eventFilter;
    });

    const renderCalendar = (): JSX.Element => {
      const days: JSX.Element[] = [];
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(
          <div key={`empty-${i}`} className="h-32 bg-gray-50 border border-gray-200"></div>
        );
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = getEventsForDate(dateStr);
        const isToday = dateStr === new Date().toISOString().split('T')[0];
        const isSelected = dateStr === selectedDate;

        days.push(
          <div
            key={day}
            className={`h-32 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
              isToday ? 'bg-blue-50' : 'bg-white'
            } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handleDateChange(dateStr)}
          >
            <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
              {day}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 2).map((event: Event) => {
                const IconComponent = getEventIcon(event.category);
                return (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate ${getEventColor(event.category)}`}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <IconComponent className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{event.title}</span>
                    </div>
                  </div>
                );
              })}
              {dayEvents.length > 2 && (
                <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
              )}
            </div>
          </div>
        );
      }

      const handlePrevMonth = (): void => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate.toISOString().split('T')[0]);
      };

      const handleNextMonth = (): void => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate.toISOString().split('T')[0]);
      };

      return (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <ChevronDown className="h-4 w-4 transform rotate-90" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <ChevronDown className="h-4 w-4 transform -rotate-90" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: string) => (
              <div key={day} className="p-4 text-center text-sm font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
                {day}
              </div>
            ))}
            {days}
          </div>
        </div>
      );
    };

    const renderEventList = (): JSX.Element => (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">All Events</h2>
            <div className="flex items-center space-x-4">
              <select
                value={eventFilter}
                onChange={handleEventFilterChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="social">Social</option>
                <option value="maintenance">Maintenance</option>
                <option value="meeting">Meeting</option>
                <option value="holiday">Holiday</option>
                <option value="fitness">Fitness</option>
                <option value="educational">Educational</option>
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredEvents.map((event: Event) => {
            const IconComponent = getEventIcon(event.category);
            const attendingCount = event.attendees.filter((a) => a.status === 'going').length;
            
            return (
              <div
                key={event.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${getEventColor(event.category)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                    <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      {event.rsvpRequired && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{attendingCount} attending</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

    const renderAnalytics = (): JSX.Element => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">{eventStats.thisMonth}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-semibold text-gray-900">{eventStats.upcoming}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Attendees</p>
                <p className="text-2xl font-semibold text-gray-900">{eventStats.totalAttendees}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Attendance</p>
                <p className="text-2xl font-semibold text-gray-900">{eventStats.avgAttendance}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Category</h3>
            <div className="space-y-3">
              {(['social', 'maintenance', 'meeting', 'holiday', 'fitness'] as const).map((category) => {
                const count = events.filter((e: Event) => e.category === category).length;
                const percentage = events.length > 0 ? (count / events.length) * 100 : 0;
                const IconComponent = getEventIcon(category);
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {events
                .filter((e: Event) => e.status === 'completed')
                .slice(0, 5)
                .map((event: Event) => {
                  const IconComponent = getEventIcon(event.category);
                  const attendingCount = event.attendees.filter((a) => a.status === 'going').length;
                  
                  return (
                    <div key={event.id} className="flex items-center space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getEventColor(event.category)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(event.date)} • {attendingCount} attended
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Events</h1>
              <p className="text-gray-600">Manage community events and activities</p>
            </div>
            <button
              onClick={() => setShowCreateEvent(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
              type="button"
            >
              <Plus className="h-4 w-4" />
              <span>Create Event</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => handleEventTabChange('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeEventTab === 'calendar' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Calendar
            </button>
            <button
              onClick={() => handleEventTabChange('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeEventTab === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              List View
            </button>
            <button
              onClick={() => handleEventTabChange('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeEventTab === 'analytics' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Analytics
            </button>
          </div>
        </div>

        {activeEventTab === 'calendar' && renderCalendar()}
        {activeEventTab === 'list' && renderEventList()}
        {activeEventTab === 'analytics' && renderAnalytics()}
      </div>
    );
  };

  // Residents page component
  const ResidentsPage: React.FC = () => (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Residents</h1>
            <p className="text-gray-600">Manage your property residents and their information</p>
          </div>
          <button
            onClick={() => setShowAddResident(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            type="button"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Resident</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {residents
                .filter((resident: Resident) => 
                  resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  resident.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  resident.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((resident: Resident) => (
                <tr key={resident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {resident.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                        <div className="text-sm text-gray-500">{resident.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resident.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{resident.phone}</div>
                    <div>{resident.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Move-in: {formatDate(resident.moveInDate)}</div>
                    <div>Lease ends: {formatDate(resident.leaseEnd)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={resident.balance > 0 ? 'text-red-600' : 'text-green-600'}>
                      ${resident.balance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      resident.status === 'active' ? 'bg-green-100 text-green-800' :
                      resident.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {resident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedResident(resident);
                        setShowResidentDetails(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedResident(resident);
                        setShowEditResident(true);
                      }}
                      className="text-gray-600 hover:text-gray-900 mr-2"
                      type="button"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" type="button">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Safety page component
  const SafetyPage: React.FC = () => (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Safety & Incidents</h1>
            <p className="text-gray-600">Track and manage safety incidents and maintenance requests</p>
          </div>
          <button
            onClick={() => setShowAddIncident(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            type="button"
          >
            <Plus className="h-4 w-4" />
            <span>Report Incident</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Critical</p>
              <p className="text-2xl font-semibold text-gray-900">
                {safetyIncidents.filter((incident: SafetyIncident) => incident.priority === 'critical').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">High Priority</p>
              <p className="text-2xl font-semibold text-gray-900">
                {safetyIncidents.filter((incident: SafetyIncident) => incident.priority === 'high').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900">
                {safetyIncidents.filter((incident: SafetyIncident) => incident.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">
                {safetyIncidents.filter((incident: SafetyIncident) => incident.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {safetyIncidents
                .filter((incident: SafetyIncident) => 
                  incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((incident: SafetyIncident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                    <div className="text-sm text-gray-500">{incident.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.type === 'emergency' ? 'bg-red-100 text-red-800' :
                      incident.type === 'security' ? 'bg-yellow-100 text-yellow-800' :
                      incident.type === 'maintenance' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {incident.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.reportedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      incident.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      incident.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      incident.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      incident.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedIncident(incident);
                        setShowIncidentDetails(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIncident(incident);
                        setShowEditIncident(true);
                      }}
                      className="text-gray-600 hover:text-gray-900 mr-2"
                      type="button"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" type="button">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Communications page component
  const CommunicationsPage: React.FC = () => {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
              <p className="text-gray-600">Manage messages, announcements, and resident communications</p>
            </div>
            <button
              onClick={() => setShowCreateMessage(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
              type="button"
            >
              <Send className="h-4 w-4" />
              <span>New Message</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => handleCommTabChange('messages')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCommTab === 'messages' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Message Center
            </button>
            <button
              onClick={() => handleCommTabChange('announcements')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCommTab === 'announcements' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Announcements
            </button>
            <button
              onClick={() => handleCommTabChange('templates')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCommTab === 'templates' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Templates
            </button>
            <button
              onClick={() => handleCommTabChange('direct')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCommTab === 'direct' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Direct Messages
            </button>
            <button
              onClick={() => handleCommTabChange('reports')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeCommTab === 'reports' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Delivery Reports
            </button>
          </div>
        </div>

        {activeCommTab === 'messages' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {messages.map((message: Message) => (
                <div
                  key={message.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedMessage(message);
                    setShowMessageDetails(true);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900">{message.subject}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          message.priority === 'high' ? 'bg-red-100 text-red-800' :
                          message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {message.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          message.type === 'emergency' ? 'bg-red-100 text-red-800' :
                          message.type === 'announcement' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {message.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>To: {message.recipients.join(', ')}</span>
                        <span>From: {message.sender}</span>
                        <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        message.status === 'sent' ? 'bg-green-100 text-green-800' :
                        message.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                        message.status === 'read' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {message.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600" type="button">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCommTab === 'announcements' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Community Announcements</h2>
                <button
                  onClick={() => setShowCreateMessage(true)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  type="button"
                >
                  Create Announcement
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {messages.filter((m: Message) => m.type === 'announcement').map((message: Message) => (
                <div key={message.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{message.subject}</h3>
                      <p className="text-gray-600 mt-2">{message.content}</p>
                      <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{message.deliveryReport?.opened || 0} opened</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{message.deliveryReport?.delivered || 0} delivered</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600" type="button">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" type="button">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCommTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Message Templates</h2>
                <p className="text-sm text-gray-600">Pre-built templates for common communications</p>
              </div>
              <button
                onClick={() => setShowCreateTemplate(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                type="button"
              >
                <Plus className="h-4 w-4" />
                <span>Create Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template: Template) => (
                <div key={template.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{template.category}</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-3">{template.content}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <span>Used {template.useCount} times</span>
                        {template.lastUsed && <span>Last used {formatDate(template.lastUsed)}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowEditTemplate(true);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        type="button"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" type="button">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700" type="button">
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCommTab === 'direct' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Conversations</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {conversations.map((conversation: Conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {conversation.participants.filter((p: string) => p !== 'Property Management').join(', ')}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(conversation.lastMessageTime).toLocaleDateString()}
                        </p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-lg shadow">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedConversation.participants.filter((p: string) => p !== 'Property Management').join(', ')}
                    </h3>
                  </div>
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'Property Management' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'Property Management'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === 'Property Management' ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button 
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeCommTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Send className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Messages Sent</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {messages.reduce((sum: number, msg: Message) => sum + (msg.deliveryReport?.sent || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Delivered</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {messages.reduce((sum: number, msg: Message) => sum + (msg.deliveryReport?.delivered || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Eye className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Opened</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {messages.reduce((sum: number, msg: Message) => sum + (msg.deliveryReport?.opened || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Open Rate</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {Math.round(
                        (messages.reduce((sum: number, msg: Message) => sum + (msg.deliveryReport?.opened || 0), 0) /
                        Math.max(messages.reduce((sum: number, msg: Message) => sum + (msg.deliveryReport?.delivered || 0), 0), 1)) * 100
                      )}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Message Performance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivered
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Opened
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Open Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.filter((m: Message) => m.deliveryReport).map((message: Message) => (
                      <tr key={message.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{message.subject}</div>
                          <div className="text-sm text-gray-500">{message.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {message.deliveryReport?.sent || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {message.deliveryReport?.delivered || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {message.deliveryReport?.opened || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.round(
                            ((message.deliveryReport?.opened || 0) /
                            Math.max(message.deliveryReport?.delivered || 1, 1)) * 100
                          )}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Modal components
  const AddResidentModal: React.FC = () => (
    showAddResident && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Resident</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Resident
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );

  const CreateEventModal: React.FC = () => (
    showCreateEvent && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Event</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Community BBQ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="social">Social</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="meeting">Meeting</option>
                    <option value="holiday">Holiday</option>
                    <option value="fitness">Fitness</option>
                    <option value="educational">Educational</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your event..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Community Pool Area"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Attendees</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave empty for unlimited"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rsvp-required"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rsvp-required" className="ml-2 block text-sm text-gray-900">
                    RSVP Required
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="recurring"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">
                    Recurring Event
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visibility</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="public">Public (All residents)</option>
                  <option value="residents-only">Residents Only</option>
                  <option value="board-only">Board Members Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements/Notes</label>
                <textarea
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Bring your own drinks, Kids must be supervised"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );

  const EventDetailsModal: React.FC = () => (
    showEventDetails && selectedEvent && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getEventColor(selectedEvent.category)}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
                  <p className="text-sm text-gray-600">{selectedEvent.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setShowEventDetails(false);
                    setShowEditEvent(true);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Event Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{formatDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>Organized by {selectedEvent.organizer}</span>
                    </div>
                    {selectedEvent.cost && (
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span>${selectedEvent.cost}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                    {selectedEvent.description}
                  </p>
                </div>

                {selectedEvent.requirements && selectedEvent.requirements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
                    <ul className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 space-y-1">
                      {selectedEvent.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      RSVPs ({selectedEvent.attendees.length})
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                  </div>
                  
                  {selectedEvent.rsvpRequired ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                        <div>
                          <div className="text-lg font-semibold text-green-600">
                            {selectedEvent.attendees.filter((a) => a.status === 'going').length}
                          </div>
                          <div className="text-xs text-gray-500">Going</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-yellow-600">
                            {selectedEvent.attendees.filter((a) => a.status === 'maybe').length}
                          </div>
                          <div className="text-xs text-gray-500">Maybe</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-red-600">
                            {selectedEvent.attendees.filter((a) => a.status === 'not-going').length}
                          </div>
                          <div className="text-xs text-gray-500">Not Going</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {selectedEvent.attendees.map((attendee) => (
                          <div key={attendee.userId} className="flex items-center justify-between">
                            <span className="text-sm text-gray-900">{attendee.name}</span>
                            <span className={`text-xs font-medium ${getRSVPStatusColor(attendee.status)}`}>
                              {attendee.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-500">RSVP not required for this event</p>
                    </div>
                  )}
                </div>

                {selectedEvent.reminders.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Reminders</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {selectedEvent.reminders.map((reminder, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {reminder.type} reminder - {reminder.time} before
                          </span>
                          <span className={`text-xs ${reminder.sent ? 'text-green-600' : 'text-gray-400'}`}>
                            {reminder.sent ? 'Sent' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.recurring && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recurring</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        Repeats {selectedEvent.recurring.frequency}
                        {selectedEvent.recurring.endDate && 
                          ` until ${formatDate(selectedEvent.recurring.endDate)}`
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                type="button"
              >
                Close
              </button>
              {selectedEvent.status === 'scheduled' && (
                <>
                  <button 
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                    type="button"
                  >
                    Send Reminder
                  </button>
                  <button
                    onClick={() => {
                      setShowEventDetails(false);
                      setShowEditEvent(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    type="button"
                  >
                    Edit Event
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Render the appropriate page
  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'residents':
        return <ResidentsPage />;
      case 'safety':
        return <SafetyPage />;
      case 'communications':
        return <CommunicationsPage />;
      case 'events':
        return <EventsPage />;
      default:
        return <DashboardPage />;
    }
  };

  // Fix the IconComponent reference in EventDetailsModal
  const IconComponent = selectedEvent ? getEventIcon(selectedEvent.category) : Calendar;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderPage()}
      
      {/* Modals */}
      <AddResidentModal />
      <CreateEventModal />
      <EventDetailsModal />
    </div>
  );
};

export default App;

{/* Create Template Modal */}
        {showCreateTemplateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedTemplate ? 'Edit Template' : 'Create New Template'}
                  </h3>
                  <button 
                    onClick={() => {
                      setShowCreateTemplateModal(false);
                      setSelectedTemplate(null);
                      setNewTemplate({
                        name: '',
                        description: '',
                        category: 'general',
                        subject: '',
                        content: ''
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter template name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="events">Events</option>
                      <option value="billing">Billing</option>
                      <option value="onboarding">Onboarding</option>
                      <option value="safety">Safety</option>
                      <option value="administrative">Administrative</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of this template"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email subject line (use [VARIABLES] for dynamic content)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
                  <textarea
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    rows={8}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Template content (use [VARIABLES] for dynamic content like [RESIDENT_NAME], [DATE], [LOCATION], etc.)"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Available Variables:</h4>
                  <div className="text-sm textimport React, { useState, useEffect } from 'react';
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
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [showResidentProfile, setShowResidentProfile] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [safetyFilter, setSafetyFilter] = useState('all');
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [updateText, setUpdateText] = useState('');
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);
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
    recipients: 'all', // all, building, specific
    buildings: [] as string[],
    deliveryMethods: ['email'] as string[],
    priority: 'normal', // normal, urgent
    scheduleType: 'now', // now, later
    scheduledDate: '',
    scheduledTime: '',
    attachImage: false,
    imageFile: null as File | null
  });
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  
  // Communications states
  const [commFilter, setCommFilter] = useState('center');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showDirectMessageModal, setShowDirectMessageModal] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'general',
    subject: '',
    content: ''
  });
  const [directMessageData, setDirectMessageData] = useState({
    recipientId: '',
    subject: '',
    message: ''
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

  // Communications mock data
  const communicationsData = [
    {
      id: 1,
      type: "announcement",
      title: "Pool Maintenance Scheduled for Tomorrow",
      preview: "The community pool will be closed from 8 AM to 4 PM for quarterly maintenance and cleaning.",
      recipients: "All Residents (342)",
      deliveryMethod: "Email + SMS",
      openRate: 96.5,
      sentBy: "Property Manager",
      sentDate: "2024-06-20 09:00 AM",
      status: "delivered",
      content: "Dear Residents, We wanted to inform you that our community pool will be temporarily closed tomorrow, June 21st, from 8:00 AM to 4:00 PM for our quarterly maintenance and cleaning.",
      attachments: []
    },
    {
      id: 2,
      type: "alert",
      title: "Security Update - Package Theft Prevention",
      preview: "Important security measures being implemented to prevent package theft in Building A lobby.",
      recipients: "Building A Residents (114)",
      deliveryMethod: "Email + In-App + SMS",
      openRate: 98.2,
      sentBy: "Security Team",
      sentDate: "2024-06-19 02:30 PM",
      status: "delivered",
      content: "Following recent package theft incidents, we are implementing enhanced security measures including additional cameras.",
      attachments: ["security_guidelines.pdf"]
    }
  ];

  const announcementsData = [
    {
      id: 1,
      title: "Summer Community BBQ Event",
      content: "Join us for our annual summer BBQ on July 4th at the community pavilion.",
      date: "June 20, 2024",
      priority: "medium",
      recipients: 342,
      engagement: 89.5,
      type: "event"
    }
  ];

  const templatesData = [
    {
      id: 1,
      name: "Maintenance Notification",
      description: "Standard template for scheduled maintenance announcements",
      category: "maintenance",
      usageCount: 24,
      subject: "Scheduled Maintenance - [LOCATION]",
      content: "Dear Residents, We wanted to inform you of scheduled maintenance that will take place on [DATE] at [TIME]."
    }
  ];

  const directMessagesData = [
    {
      id: 1,
      resident: {
        name: "Jessica Martinez",
        unit: "A-301",
        building: "Building A",
        avatar: "JM"
      },
      lastMessage: "Thank you for resolving the heating issue so quickly!",
      lastActivity: "2 hours ago",
      unreadCount: 0,
      status: "resolved",
      messageCount: 8
    }
  ];

  const deliveryReportsData = [
    {
      id: 1,
      messageTitle: "Pool Maintenance Scheduled for Tomorrow",
      sentDate: "June 20, 2024 at 9:00 AM",
      stats: {
        sent: 342,
        delivered: 340,
        opened: 328,
        clicked: 89
      },
      openRate: 96.5,
      clickRate: 26.2,
      deliveryRate: 99.4
    }
  ];

  // Helper functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'investigating': return <Eye className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Activity className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'safety': return <Shield className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'safety': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'community': return 'bg-green-100 text-green-800';
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

  const getStatusColor = (status: string) => {
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

  const handleViewProfile = (resident: any) => {
    setSelectedResident(resident);
    setShowResidentProfile(true);
  };

  const handleSendMessage = (resident: any) => {
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

  const getIncidentTypeColor = (type: string) => {
    switch (type) {
      case 'theft': return 'bg-red-100 text-red-800';
      case 'security': return 'bg-orange-100 text-orange-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'accident': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIncidentStatusIcon = (status: string) => {
    switch (status) {
      case 'investigating': return <Eye className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'documenting': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleViewIncident = (incident: any) => {
    setSelectedIncident(incident);
    setShowIncidentModal(true);
  };

  const handleStatClick = (filterType: string) => {
    setSafetyFilter(filterType);
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

  const handleViewEvidence = (evidence: any) => {
    setSelectedEvidence(evidence);
    setShowEvidenceModal(true);
  };

  const handleMessageResident = (residentName: string) => {
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
    setShowReportModal(true);
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

  const getAssignedTeam = (type: string) => {
    switch (type) {
      case 'theft': return 'Security Team';
      case 'security': return 'Security Team';
      case 'maintenance': return 'Maintenance Team';
      case 'accident': return 'Property Manager';
      case 'system': return 'Technical Team';
      default: return 'Property Manager';
    }
  };

  // Communications helper functions
  const getCommTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCommStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTemplateTypeColor = (category: string) => {
    switch (category) {
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'events': return 'bg-green-100 text-green-800';
      case 'billing': return 'bg-blue-100 text-blue-800';
      case 'onboarding': return 'bg-purple-100 text-purple-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'administrative': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConversationStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Communications handlers
  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setShowTemplateModal(true);
  };

  const handleUseTemplate = (template: any) => {
    setSelectedTemplate(template);
    setBroadcastData({
      ...broadcastData,
      title: template.subject,
      message: template.content
    });
    setShowBroadcastModal(true);
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    setNewTemplate({
      name: template.name,
      description: template.description,
      category: template.category,
      subject: template.subject,
      content: template.content
    });
    setShowCreateTemplateModal(true);
  };

  const handleOpenConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    setShowConversationModal(true);
  };

  const handleCreateTemplate = () => {
    if (newTemplate.name.trim() && newTemplate.content.trim()) {
      const templateData = {
        ...newTemplate,
        id: Date.now(),
        usageCount: 0
      };
      
      console.log('Creating template:', templateData);
      
      setNewTemplate({
        name: '',
        description: '',
        category: 'general',
        subject: '',
        content: ''
      });
      
      setShowCreateTemplateModal(false);
    }
  };

  const handleSendDirectMessage = () => {
    if (directMessageData.recipientId && directMessageData.message.trim()) {
      console.log('Sending direct message:', directMessageData);
      
      setDirectMessageData({
        recipientId: '',
        subject: '',
        message: ''
      });
      
      setShowDirectMessageModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-lg">HeyNeighbor</h1>
              <p className="text-xs text-gray-500">Management</p>
            </div>
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
                 currentPage === 'communications' ? 'Manage community communications and messaging' :
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
                      {recentActivity.map((activity: any) => (
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
                        onClick={() => setShowAddResident(true)}
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
                  {getFilteredActivity().map((activity: any) => (
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
                {getFilteredIncidents().map((incident: any) => (
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
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Residents</p>
                      <p className="text-2xl font-bold text-gray-900">{getResidentStats().total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Residents</p>
                      <p className="text-2xl font-bold text-green-600">{getResidentStats().active}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending Move-ins</p>
                      <p className="text-2xl font-bold text-yellow-600">{getResidentStats().pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Occupancy Rate</p>
                      <p className="text-2xl font-bold text-blue-600">{getResidentStats().occupancyRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
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
                    onClick={() => setShowAddResident(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Resident</span>
                  </button>
                </div>
              </div>

              {/* Residents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFilteredResidents().map((resident: any) => (
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
                    {communicationsData.map((comm: any) => (
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
                            <button className="text-gray-400 hover:text-gray-600">
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
                    {announcementsData.map((announcement: any) => (
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
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              View Analytics
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
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
                    {templatesData.map((template: any) => (
                      <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTemplateTypeColor(template.category)}`}>
                                {template.category}
                              </span>
                              <span>Used {template.usageCount} times</span>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
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
                    <h3 className="text-lg font-semibold text-gray-900">Direct Message Conversations</h3>
                    <button 
                      onClick={() => setShowDirectMessageModal(true)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>New Conversation</span>
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {directMessagesData.map((conversation: any) => (
                      <div key={conversation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                           onClick={() => handleOpenConversation(conversation)}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">{conversation.resident.avatar}</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{conversation.resident.name}</h3>
                              <p className="text-gray-600 text-sm">{conversation.resident.unit} • {conversation.resident.building}</p>
                              <p className="text-gray-500 text-sm mt-1">{conversation.lastMessage}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              {conversation.unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                  {conversation.unreadCount}
                                </span>
                              )}
                              <span className="text-sm text-gray-500">{conversation.lastActivity}</span>
                            </div>
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
                  <h3 className="text-lg font-semibold text-gray-900">Delivery & Engagement Reports</h3>
                  
                  <div className="grid gap-6">
                    {deliveryReportsData.map((report: any) => (
                      <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.messageTitle}</h3>
                            <p className="text-gray-600 text-sm">Sent on {report.sentDate}</p>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Download Report
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{report.stats.sent}</p>
                            <p className="text-sm text-gray-600">Sent</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{report.stats.delivered}</p>
                            <p className="text-sm text-gray-600">Delivered</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">{report.stats.opened}</p>
                            <p className="text-sm text-gray-600">Opened</p>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <p className="text-2xl font-bold text-orange-600">{report.stats.clicked}</p>
                            <p className="text-sm text-gray-600">Clicked</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Open Rate: <span className="font-semibold text-gray-900">{report.openRate}%</span></span>
                          <span className="text-gray-600">Click Rate: <span className="font-semibold text-gray-900">{report.clickRate}%</span></span>
                          <span className="text-gray-600">Delivery Rate: <span className="font-semibold text-gray-900">{report.deliveryRate}%</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Other Pages Placeholder */}
          {(currentPage === 'events' || currentPage === 'analytics' || currentPage === 'settings') && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                {currentPage === 'events' && <Calendar className="w-8 h-8 text-gray-400" />}
                {currentPage === 'analytics' && <BarChart3 className="w-8 h-8 text-gray-400" />}
                {currentPage === 'settings' && <Settings className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Coming Soon
              </h3>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          )}

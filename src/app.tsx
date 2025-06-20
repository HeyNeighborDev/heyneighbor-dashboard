import React, { useState, useEffect } from 'react';
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
  Activity
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
    console.log('Sending message to:', selectedResident.name);
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

  const handleStatClick = (filterType) => {
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
    if (escalationReason.trim()) {
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
      
      // Optionally close the incident modal too
      // setShowIncidentModal(false);
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
                      <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Send className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">Send Notification</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Plus className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">Create Event</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
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

          {/* Report Incident Modal */}
          {showReportModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8" style={{zIndex: 9999}}>
              <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Report New Incident</h2>
                    </div>
                    <button 
                      onClick={() => setShowReportModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto px-4 py-3">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Incident Title</label>
                      <input
                        type="text"
                        value={newIncident.title}
                        onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Brief description of the incident"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                        <select 
                          value={newIncident.type}
                          onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                          value={newIncident.priority}
                          onChange={(e) => setNewIncident({...newIncident, priority: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={newIncident.location}
                        onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Building A - Lobby, Parking Garage Level 2, etc."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                      <textarea
                        rows={4}
                        value={newIncident.description}
                        onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Provide detailed information about what happened, when it occurred, and any other relevant details..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                      <input
                        type="text"
                        value={newIncident.reportedBy}
                        onChange={(e) => setNewIncident({...newIncident, reportedBy: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Name of person reporting the incident"
                      />
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Automatic Assignment</h4>
                      <p className="text-xs text-gray-600">
                        This incident will be automatically assigned to: <span className="font-medium">{getAssignedTeam(newIncident.type)}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-3 border-t border-gray-200 flex-shrink-0">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitIncident}
                      disabled={!newIncident.title.trim() || !newIncident.description.trim()}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Submit Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Escalate Modal */}
          {showEscalateModal && selectedIncident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8" style={{zIndex: 9999}}>
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900">Escalate Incident</h2>
                    </div>
                    <button 
                      onClick={() => setShowEscalateModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">Escalating Incident</p>
                          <p className="text-xs text-amber-700">#{selectedIncident.incidentId}: {selectedIncident.title}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Escalate To</label>
                      <select 
                        value={escalationLevel}
                        onChange={(e) => setEscalationLevel(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="supervisor">Direct Supervisor</option>
                        <option value="manager">Property Manager</option>
                        <option value="regional">Regional Manager</option>
                        <option value="emergency">Emergency Services</option>
                        <option value="legal">Legal Department</option>
                        <option value="insurance">Insurance Provider</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Escalation Reason</label>
                      <textarea
                        rows={4}
                        value={escalationReason}
                        onChange={(e) => setEscalationReason(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Explain why this incident needs to be escalated..."
                      />
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Current Status</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Priority: <span className="font-medium capitalize">{selectedIncident.priority}</span></div>
                        <div>Status: <span className="font-medium capitalize">{selectedIncident.status}</span></div>
                        <div>Assigned to: <span className="font-medium">{selectedIncident.assignedTo}</span></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => setShowEscalateModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEscalateSubmit}
                      disabled={!escalationReason.trim()}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Escalate Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Update Modal */}
          {showAddUpdate && selectedIncident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8" style={{zIndex: 9999}}>
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Add Update</h2>
                    <button 
                      onClick={() => setShowAddUpdate(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Incident</label>
                      <p className="text-sm text-gray-600">#{selectedIncident.incidentId}: {selectedIncident.title}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Update Details</label>
                      <textarea
                        rows={4}
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the update or action taken..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                      <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                        <Plus className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Click to add photos, documents, or other evidence</p>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => setShowAddUpdate(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddUpdate}
                      disabled={!updateText.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Add Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Evidence Preview Modal */}
          {showEvidenceModal && selectedEvidence && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8" style={{zIndex: 9999}}>
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Evidence Preview</h2>
                    <button 
                      onClick={() => setShowEvidenceModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      {selectedEvidence.type === 'video' && <span className="text-4xl">🎥</span>}
                      {selectedEvidence.type === 'image' && <span className="text-4xl">📷</span>}
                      {selectedEvidence.type === 'document' && <span className="text-4xl">📄</span>}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedEvidence.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedEvidence.type === 'video' && 'Video evidence file'}
                      {selectedEvidence.type === 'image' && 'Photographic evidence'}
                      {selectedEvidence.type === 'document' && 'Document evidence'}
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-8 mb-4">
                      <p className="text-sm text-gray-500 italic">
                        {selectedEvidence.type === 'video' && 'Video player would appear here in the actual application'}
                        {selectedEvidence.type === 'image' && 'High-resolution image would be displayed here'}
                        {selectedEvidence.type === 'document' && 'Document viewer or download option would appear here'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowEvidenceModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
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

          {/* Incident Detail Modal */}
          {showIncidentModal && selectedIncident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-96 overflow-hidden flex flex-col">
                {/* Fixed Header */}
                <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h2 className="text-base font-semibold text-gray-900">{selectedIncident.title}</h2>
                        <span className="text-xs text-gray-500">#{selectedIncident.incidentId}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getIncidentTypeColor(selectedIncident.type)}`}>
                          {selectedIncident.type}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(selectedIncident.priority)}`}>
                          {selectedIncident.priority}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                          {selectedIncident.status}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowIncidentModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 py-3">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1">Description</h3>
                      <p className="text-xs text-gray-600">{selectedIncident.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs font-medium text-gray-700 mb-1">Location</h3>
                        <p className="text-xs text-gray-600">{selectedIncident.location}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-gray-700 mb-1">Reported By</h3>
                        <p className="text-xs text-gray-600">{selectedIncident.reportedBy}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs font-medium text-gray-700 mb-1">Date Reported</h3>
                        <p className="text-xs text-gray-600">
                          {new Date(selectedIncident.reportedDate).toLocaleDateString()} at {new Date(selectedIncident.reportedDate).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-gray-700 mb-1">Assigned To</h3>
                        <p className="text-xs text-gray-600">{selectedIncident.assignedTo}</p>
                      </div>
                    </div>

                    {selectedIncident.evidence && selectedIncident.evidence.length > 0 && (
                      <div>
                        <h3 className="text-xs font-medium text-gray-700 mb-1">Evidence</h3>
                        <div className="flex flex-wrap gap-1">
                          {selectedIncident.evidence.map((item, index) => (
                            <button 
                              key={index}
                              onClick={() => handleViewEvidence(item)}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                            >
                              {item.type === 'video' && '🎥'}
                              {item.type === 'image' && '📷'}
                              {item.type === 'document' && '📄'}
                              <span className="ml-1">{item.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-2">Timeline</h3>
                      <div className="space-y-2">
                        {selectedIncident.updates && selectedIncident.updates.map((update, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-900">{update.update}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(update.date).toLocaleDateString()} at {new Date(update.date).toLocaleTimeString()} by {update.by}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Fixed Footer */}
                <div className="px-4 py-3 border-t border-gray-200 flex-shrink-0">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowAddUpdate(true)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add Update
                    </button>
                    <button 
                      onClick={handleEscalate}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Escalate
                    </button>
                    <button
                      onClick={() => setShowIncidentModal(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                {getFilteredResidents().map((resident) => (
                  <div key={resident.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{resident.avatar}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{resident.name}</h3>
                          <p className="text-gray-600 text-sm">{resident.unit}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(resident.status)}`}>
                        {resident.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {resident.building}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {resident.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Moved in {new Date(resident.moveInDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Last activity</span>
                        <span className="text-gray-900 font-medium">{resident.lastActivity}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
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
                  <p className="text-gray-600 mb-4">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No residents match the selected filters.'}
                  </p>
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Add Resident Modal */}
          {showAddResident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Add New Resident</h2>
                    <button 
                      onClick={() => setShowAddResident(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter resident's full name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="A-301"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Building A</option>
                          <option>Building B</option>
                          <option>Building C</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="resident@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Move-in Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Name - Phone Number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any additional notes about the resident..."
                      />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddResident(false)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Add Resident
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Resident Profile Modal */}
          {showResidentProfile && selectedResident && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg h-96 overflow-hidden flex flex-col">
                {/* Fixed Header */}
                <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-xs">{selectedResident.avatar}</span>
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">{selectedResident.name}</h2>
                        <p className="text-gray-600 text-xs">{selectedResident.unit} • {selectedResident.building}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowResidentProfile(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 py-3">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1">Contact</h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>{selectedResident.email}</div>
                        <div>{selectedResident.phone}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1">Emergency Contact</h3>
                      <div className="text-xs text-gray-600">{selectedResident.emergencyContact}</div>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1">Interests</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedResident.interests && selectedResident.interests.map((interest, index) => (
                          <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1">Groups</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedResident.groups && selectedResident.groups.map((group, index) => (
                          <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-green-100 text-green-800">
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1">Residency</h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Move-in:</span>
                          <span>{new Date(selectedResident.moveInDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lease End:</span>
                          <span>{new Date(selectedResident.leaseEndDate).toLocaleDateString()}</span>
                        </div>
                        {selectedResident.predictedMoveOut && (
                          <div className="flex justify-between">
                            <span>Predicted Move-out:</span>
                            <span className="text-orange-600">{new Date(selectedResident.predictedMoveOut).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Last Activity:</span>
                          <span>{selectedResident.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {selectedResident.communityScore && (
                      <div>
                        <h3 className="text-xs font-medium text-gray-700 mb-1">Engagement Score</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${(selectedResident.communityScore / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-blue-600">{selectedResident.communityScore}/10</span>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-1">Notes</h3>
                      <p className="text-xs text-gray-600">{selectedResident.notes}</p>
                    </div>
                  </div>
                </div>
                
                {/* Fixed Footer */}
                <div className="px-4 py-3 border-t border-gray-200 flex-shrink-0">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowResidentProfile(false);
                        handleSendMessage(selectedResident);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Send Message
                    </button>
                    <button
                      onClick={() => setShowResidentProfile(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
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
              <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Send Message</h2>
                      <p className="text-gray-600 mt-1">to {selectedResident.name} ({selectedResident.unit})</p>
                    </div>
                    <button 
                      onClick={() => setShowMessageModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <AlertCircle className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>General Information</option>
                        <option>Maintenance Update</option>
                        <option>Community Event</option>
                        <option>Lease Related</option>
                        <option>Emergency</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter message subject"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={5}
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Type your message here..."
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start">
                        <Bell className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Delivery Options</p>
                          <p className="text-xs text-blue-600 mt-1">Message will be sent via email and in-app notification</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => setShowMessageModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendMessageSubmit}
                      disabled={!messageContent.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Page */}
          {currentPage === 'activity' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filter Activity</h3>
                  <button 
                    onClick={() => setCurrentPage('dashboard')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActivityFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activityFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setActivityFilter('safety')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activityFilter === 'safety' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Safety
                  </button>
                  <button 
                    onClick={() => setActivityFilter('maintenance')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activityFilter === 'maintenance' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Maintenance
                  </button>
                  <button 
                    onClick={() => setActivityFilter('community')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activityFilter === 'community' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Community
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {getFilteredActivity().map((activity) => (
                    <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${getTypeColor(activity.type)}`}>
                          {getTypeIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                              {activity.priority}
                            </span>
                            <span className="text-gray-500 text-sm">{activity.time}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 text-sm">{activity.location}</span>
                          </div>
                          <h4 className="text-gray-900 font-semibold mb-2">{activity.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm">Reported by {activity.user}</p>
                            <div className="flex items-center space-x-1 text-gray-500">
                              {getStatusIcon(activity.status)}
                              <span className="text-sm capitalize">{activity.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other pages */}
          {currentPage !== 'dashboard' && currentPage !== 'activity' && currentPage !== 'residents' && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                {currentPage === 'safety' && <Shield className="w-16 h-16" />}
                {currentPage === 'communications' && <MessageSquare className="w-16 h-16" />}
                {currentPage === 'events' && <Calendar className="w-16 h-16" />}
                {currentPage === 'analytics' && <BarChart3 className="w-16 h-16" />}
                {currentPage === 'settings' && <Settings className="w-16 h-16" />}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page
              </h3>
              <p className="text-gray-600">Coming soon - Full functionality</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;
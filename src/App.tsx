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
  Filter,
  Download,
  Archive,
  Reply,
  Forward,
  Paperclip,
  Image,
  Smile,
  MoreVertical,
  ExternalLink,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

const ManagementDashboard = () => {
  const [greeting, setGreeting] = useState("Good morning, Sarah! ☀️");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activityFilter, setActivityFilter] = useState("all");
  const [showAddResident, setShowAddResident] = useState(false);
  const [residentFilter, setResidentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState<any>(null);
  const [showResidentProfile, setShowResidentProfile] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [safetyFilter, setSafetyFilter] = useState("all");
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalationReason, setEscalationReason] = useState("");
  const [escalationLevel, setEscalationLevel] = useState("supervisor");
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Communications state variables
  const [communicationsTab, setCommunicationsTab] = useState("message-center");
  const [messageFilter, setMessageFilter] = useState("all");
  const [messageSearch, setMessageSearch] = useState("");
  const [announcementFilter, setAnnouncementFilter] = useState("all");
  const [templateCategory, setTemplateCategory] = useState("all");
  const [conversationFilter, setConversationFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [showEditTemplate, setShowEditTemplate] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [showMessageDetails, setShowMessageDetails] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "maintenance",
    subject: "",
    content: "",
    variables: [] as string[]
  });
  const [newMessage, setNewMessage] = useState({
    title: "",
    content: "",
    type: "announcement",
    priority: "normal",
    recipients: "all",
    scheduleType: "now",
    scheduledDate: "",
    scheduledTime: ""
  });

  const [newIncident, setNewIncident] = useState({
    title: "",
    type: "maintenance",
    priority: "medium",
    location: "",
    description: "",
    reportedBy: "Property Manager"
  });
  const [newResident, setNewResident] = useState({
    name: "",
    unit: "",
    building: "Building A",
    email: "",
    phone: "",
    moveInDate: "",
    leaseEndDate: "",
    emergencyContact: "",
    notes: ""
  });
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastData, setBroadcastData] = useState({
    title: "",
    message: "",
    recipients: "all", // all, building, specific
    buildings: [] as string[],
    deliveryMethods: ["email"] as string[],
    priority: "normal", // normal, urgent
    scheduleType: "now", // now, later
    scheduledDate: "",
    scheduledTime: "",
    attachImage: false,
    imageFile: null as File | null
  });
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });

  // Dynamic greeting system
  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting = "Good morning, Sarah! ☀️";
    
    if (hour >= 12 && hour < 17) {
      newGreeting = "Hey there, Sarah! 👋";
    } else if (hour >= 17) {
      newGreeting = "Good evening, Sarah! 🌙";
    }
    
    setGreeting(newGreeting);
  }, []);

  // Mock data
  const communityStats = {
    activeResidents: { count: 342, change: "+12" },
    engagementScore: { score: 8.7, change: "+0.3" },
    incidentReports: { count: 3, change: "-2" },
    safetyRequests: { count: 12, change: "+4" }
  };

  const recentActivity = [
    {
      id: 1,
      type: "safety",
      title: "Package theft reported in Building A",
      time: "2 mins ago",
      priority: "high",
      user: "Jessica M.",
      status: "investigating",
      description: "Resident reported missing package from lobby area.",
      location: "Building A - Lobby"
    },
    {
      id: 2,
      type: "maintenance",
      title: "Pool maintenance scheduled for tomorrow",
      time: "15 mins ago",
      priority: "medium",
      user: "Maintenance Team",
      status: "scheduled",
      description: "Quarterly pool cleaning and chemical balancing.",
      location: "Community Pool"
    },
    {
      id: 3,
      type: "community",
      title: "New resident welcome party planned",
      time: "1 hour ago",
      priority: "low",
      user: "Community Team",
      status: "approved",
      description: "Welcome party for new residents this month.",
      location: "Clubhouse"
    },
    {
      id: 4,
      type: "safety",
      title: "Security patrol completed - all clear",
      time: "2 hours ago",
      priority: "low",
      user: "Security Team",
      status: "completed",
      description: "Nightly security patrol completed.",
      location: "All Buildings"
    }
  ];

  // Communications Mock Data
  const communicationsStats = {
    totalMessages: { count: 1247, change: "+23" },
    openRate: { percentage: 87.5, change: "+2.1" },
    activeTemplates: { count: 12, change: "+2" },
    pendingMessages: { count: 8, change: "-3" }
  };

  const communicationsData = [
    {
      id: 1,
      title: "Pool Maintenance Notice",
      type: "maintenance",
      content: "The community pool will be closed for maintenance on June 25th from 8 AM to 2 PM.",
      sentDate: "2024-06-20T10:30:00",
      recipients: 342,
      delivered: 340,
      opened: 298,
      clicked: 45,
      status: "sent",
      priority: "normal",
      sentBy: "Property Manager"
    },
    {
      id: 2,
      title: "Emergency - Water Main Break",
      type: "emergency",
      content: "Water service will be interrupted in Building A from 2-6 PM today due to emergency repairs.",
      sentDate: "2024-06-20T08:15:00",
      recipients: 120,
      delivered: 120,
      opened: 115,
      clicked: 28,
      status: "sent",
      priority: "high",
      sentBy: "Emergency Team"
    },
    {
      id: 3,
      title: "Summer BBQ Event",
      type: "event",
      content: "Join us for our annual summer BBQ on July 4th at the community pool area!",
      sentDate: "2024-06-19T16:45:00",
      recipients: 342,
      delivered: 338,
      opened: 256,
      clicked: 89,
      status: "sent",
      priority: "normal",
      sentBy: "Community Team"
    },
    {
      id: 4,
      title: "Monthly Newsletter",
      type: "announcement",
      content: "Your June community newsletter is now available with updates and upcoming events.",
      sentDate: "2024-06-18T09:00:00",
      recipients: 342,
      delivered: 339,
      opened: 267,
      clicked: 67,
      status: "sent",
      priority: "normal",
      sentBy: "Community Team"
    }
  ];

  const announcementsData = [
    {
      id: 1,
      title: "New Fitness Equipment Installed",
      category: "amenity",
      content: "We have installed new cardio equipment in the fitness center.",
      publishDate: "2024-06-20T14:00:00",
      views: 89,
      likes: 24,
      priority: "normal",
      recipients: 342,
      engagement: 78
    },
    {
      id: 2,
      title: "Updated Pool Hours",
      category: "policy",
      content: "Pool hours have been extended for summer season.",
      publishDate: "2024-06-19T11:30:00",
      views: 156,
      likes: 43,
      priority: "normal",
      recipients: 342,
      engagement: 89
    },
    {
      id: 3,
      title: "Parking Policy Reminder",
      category: "administrative",
      content: "Please remember to register all vehicles with management.",
      publishDate: "2024-06-18T08:00:00",
      views: 203,
      likes: 15,
      priority: "normal",
      recipients: 342,
      engagement: 65
    }
  ];

  const templatesData = [
    {
      id: 1,
      name: "Maintenance Notification",
      category: "maintenance",
      subject: "Scheduled Maintenance - [LOCATION]",
      content: "Dear [RESIDENT_NAME], we will be performing maintenance at [LOCATION] on [DATE] from [TIME]. Please plan accordingly.",
      variables: ["RESIDENT_NAME", "LOCATION", "DATE", "TIME"],
      lastUsed: "2024-06-20T10:30:00",
      timesUsed: 45
    },
    {
      id: 2,
      name: "Event Invitation",
      category: "events",
      subject: "You are invited to [EVENT_NAME]",
      content: "Dear [RESIDENT_NAME], you are invited to [EVENT_NAME] on [DATE] at [LOCATION]. We hope to see you there!",
      variables: ["RESIDENT_NAME", "EVENT_NAME", "DATE", "LOCATION"],
      lastUsed: "2024-06-19T16:45:00",
      timesUsed: 23
    },
    {
      id: 3,
      name: "Payment Reminder",
      category: "administrative",
      subject: "Payment Reminder - [AMOUNT] Due",
      content: "Dear [RESIDENT_NAME], this is a reminder that your payment of [AMOUNT] is due on [DUE_DATE].",
      variables: ["RESIDENT_NAME", "AMOUNT", "DUE_DATE"],
      lastUsed: "2024-06-18T09:00:00",
      timesUsed: 67
    },
    {
      id: 4,
      name: "Welcome New Resident",
      category: "administrative",
      subject: "Welcome to [COMMUNITY_NAME]!",
      content: "Dear [RESIDENT_NAME], welcome to our community! We are excited to have you in [UNIT_NUMBER].",
      variables: ["RESIDENT_NAME", "COMMUNITY_NAME", "UNIT_NUMBER"],
      lastUsed: "2024-06-17T14:20:00",
      timesUsed: 12
    },
    {
      id: 5,
      name: "Safety Alert",
      category: "safety",
      subject: "Important Safety Alert - [ALERT_TYPE]",
      content: "Dear residents, we want to inform you about [ALERT_DESCRIPTION]. Please take necessary precautions.",
      variables: ["ALERT_TYPE", "ALERT_DESCRIPTION"],
      lastUsed: "2024-06-16T08:15:00",
      timesUsed: 8
    },
    {
      id: 6,
      name: "Policy Update",
      category: "policy",
      subject: "Important Policy Update - [POLICY_NAME]",
      content: "Dear [RESIDENT_NAME], we are updating our [POLICY_NAME]. Please review the changes effective [EFFECTIVE_DATE].",
      variables: ["RESIDENT_NAME", "POLICY_NAME", "EFFECTIVE_DATE"],
      lastUsed: "2024-06-15T13:45:00",
      timesUsed: 34
    }
  ];

  const conversationsData = [
    {
      id: 1,
      resident: "Jessica Martinez",
      subject: "Pool Hours Question",
      lastMessage: "Thank you for clarifying the new pool hours!",
      lastActivity: "2024-06-20T15:30:00",
      status: "resolved",
      messageCount: 3,
      unread: false
    },
    {
      id: 2,
      resident: "Michael Chen",
      subject: "Parking Issue",
      lastMessage: "I will check with the towing company about the fees.",
      lastActivity: "2024-06-20T14:45:00",
      status: "active",
      messageCount: 5,
      unread: true
    },
    {
      id: 3,
      resident: "Sarah Johnson",
      subject: "Noise Complaint",
      lastMessage: "The issue has been resolved, thank you.",
      lastActivity: "2024-06-19T18:20:00",
      status: "closed",
      messageCount: 7,
      unread: false
    },
    {
      id: 4,
      resident: "Emily Davis",
      subject: "Lease Renewal",
      lastMessage: "When can I schedule a time to discuss renewal terms?",
      lastActivity: "2024-06-19T11:15:00",
      status: "pending",
      messageCount: 2,
      unread: true
    }
  ];

  const deliveryReports = [
    {
      id: 1,
      messageTitle: "Pool Maintenance Notice",
      sentDate: "2024-06-20T10:30:00",
      totalRecipients: 342,
      delivered: 340,
      opened: 298,
      clicked: 45,
      bounced: 2,
      deliveryRate: 99.4,
      openRate: 87.6,
      clickRate: 15.1
    },
    {
      id: 2,
      messageTitle: "Emergency - Water Main Break",
      sentDate: "2024-06-20T08:15:00",
      totalRecipients: 120,
      delivered: 120,
      opened: 115,
      clicked: 28,
      bounced: 0,
      deliveryRate: 100,
      openRate: 95.8,
      clickRate: 24.3
    },
    {
      id: 3,
      messageTitle: "Summer BBQ Event",
      sentDate: "2024-06-19T16:45:00",
      totalRecipients: 342,
      delivered: 338,
      opened: 256,
      clicked: 89,
      bounced: 4,
      deliveryRate: 98.8,
      openRate: 75.7,
      clickRate: 34.8
    }
  ];

  // Mock safety incidents data
  const safetyIncidents = [
    {
      id: 1,
      incidentId: "INC-2024-001",
      title: "Package theft reported in Building A lobby",
      type: "theft",
      priority: "high",
      status: "investigating",
      reportedBy: "Jessica Martinez",
      reportedDate: "2024-06-20T14:30:00",
      location: "Building A - Lobby",
      description: "Resident reported missing package that was delivered this morning. Security camera footage is being reviewed.",
      assignedTo: "Security Team",
      evidence: [
        { name: "Security footage", type: "video", url: "#" },
        { name: "Delivery confirmation", type: "document", url: "#" }
      ],
      updates: [
        { date: "2024-06-20T14:30:00", update: "Initial report filed", by: "Jessica Martinez" },
        { date: "2024-06-20T15:00:00", update: "Security team notified", by: "Property Manager" },
        { date: "2024-06-20T15:30:00", update: "Reviewing camera footage", by: "Security Team" }
      ]
    },
    {
      id: 2,
      incidentId: "INC-2024-002",
      title: "Broken exterior lighting in parking garage",
      type: "maintenance",
      priority: "medium",
      status: "scheduled",
      reportedBy: "Michael Chen",
      reportedDate: "2024-06-19T18:45:00",
      location: "Parking Garage - Level 2",
      description: "Multiple light fixtures are out, creating dark spots that could be safety hazards.",
      assignedTo: "Maintenance Team",
      evidence: [
        { name: "Photos of dark areas", type: "image", url: "#" }
      ],
      updates: [
        { date: "2024-06-19T18:45:00", update: "Report submitted", by: "Michael Chen" },
        { date: "2024-06-19T19:00:00", update: "Work order created", by: "Property Manager" },
        { date: "2024-06-20T09:00:00", update: "Scheduled for repair tomorrow", by: "Maintenance Team" }
      ]
    },
    {
      id: 3,
      incidentId: "INC-2024-003",
      title: "Suspicious person loitering near Building C",
      type: "security",
      priority: "high",
      status: "resolved",
      reportedBy: "Sarah Johnson",
      reportedDate: "2024-06-18T22:15:00",
      location: "Building C - Entrance",
      description: "Unknown individual observed loitering near entrance for extended period.",
      assignedTo: "Security Team",
      evidence: [
        { name: "Witness statement", type: "document", url: "#" },
        { name: "Security footage", type: "video", url: "#" }
      ],
      updates: [
        { date: "2024-06-18T22:15:00", update: "Report received", by: "Sarah Johnson" },
        { date: "2024-06-18T22:30:00", update: "Security dispatched", by: "Security Team" },
        { date: "2024-06-18T23:00:00", update: "Individual identified as delivery driver", by: "Security Team" },
        { date: "2024-06-18T23:15:00", update: "Incident resolved - false alarm", by: "Security Team" }
      ]
    },
    {
      id: 4,
      incidentId: "INC-2024-004",
      title: "Slip and fall incident in lobby",
      type: "accident",
      priority: "high",
      status: "documenting",
      reportedBy: "Emily Davis",
      reportedDate: "2024-06-17T10:30:00",
      location: "Building B - Main Lobby",
      description: "Elderly resident slipped on wet floor. Minor injuries reported. Ambulance called as precaution.",
      assignedTo: "Property Manager",
      evidence: [
        { name: "Incident photos", type: "image", url: "#" },
        { name: "Medical report", type: "document", url: "#" },
        { name: "Witness statements", type: "document", url: "#" }
      ],
      updates: [
        { date: "2024-06-17T10:30:00", update: "Incident occurred", by: "Emily Davis" },
        { date: "2024-06-17T10:35:00", update: "Ambulance called", by: "Front Desk" },
        { date: "2024-06-17T11:00:00", update: "Resident released from hospital", by: "Property Manager" },
        { date: "2024-06-17T14:00:00", update: "Insurance notified", by: "Property Manager" }
      ]
    },
    {
      id: 5,
      incidentId: "INC-2024-005",
      title: "Fire alarm malfunction in Building A",
      type: "system",
      priority: "medium",
      status: "completed",
      reportedBy: "Automated System",
      reportedDate: "2024-06-16T03:45:00",
      location: "Building A - Floor 3",
      description: "False alarm triggered by faulty smoke detector. System reset required.",
      assignedTo: "Fire Safety Co.",
      evidence: [
        { name: "System logs", type: "document", url: "#" },
        { name: "Technician report", type: "document", url: "#" }
      ],
      updates: [
        { date: "2024-06-16T03:45:00", update: "Alarm triggered", by: "System" },
        { date: "2024-06-16T04:00:00", update: "Fire department responded", by: "Emergency Services" },
        { date: "2024-06-16T04:15:00", update: "False alarm confirmed", by: "Fire Department" },
        { date: "2024-06-16T09:00:00", update: "Technician dispatched", by: "Property Manager" },
        { date: "2024-06-16T11:30:00", update: "Detector replaced", by: "Fire Safety Co." }
      ]
    }
  ];

  // Mock residents data
  const residentsData = [
    {
      id: 1,
      name: "Jessica Martinez",
      unit: "A-301",
      building: "Building A",
      email: "jessica.martinez@email.com",
      phone: "(555) 123-4567",
      status: "active",
      moveInDate: "2023-03-15",
      moveOutDate: null,
      predictedMoveOut: "2025-03-15",
      leaseEndDate: "2025-03-14",
      lastActivity: "2 hours ago",
      avatar: "JM",
      emergencyContact: "Maria Martinez - (555) 987-6543",
      notes: "Preferred contact via email. Has one small dog.",
      interests: ["Yoga", "Community Garden", "Pet Care", "Sustainability"],
      groups: ["Pet Owners Club", "Garden Committee", "Wellness Group"],
      communityScore: 8.5
    },
    {
      id: 2,
      name: "Michael Chen",
      unit: "B-205",
      building: "Building B",
      email: "michael.chen@email.com",
      phone: "(555) 234-5678",
      status: "active",
      moveInDate: "2022-11-20",
      moveOutDate: null,
      predictedMoveOut: "2026-11-20",
      leaseEndDate: "2025-11-19",
      lastActivity: "1 day ago",
      avatar: "MC",
      emergencyContact: "Lisa Chen - (555) 876-5432",
      notes: "Board member. Available for community events.",
      interests: ["Technology", "Board Games", "Cooking", "Community Events"],
      groups: ["Resident Board", "Tech Club", "Game Night Organizers"],
      communityScore: 9.2
    },
    {
      id: 3,
      name: "Sarah Johnson",
      unit: "C-102",
      building: "Building C",
      email: "sarah.johnson@email.com",
      phone: "(555) 345-6789",
      status: "active",
      moveInDate: "2024-01-10",
      moveOutDate: null,
      predictedMoveOut: "2025-01-10",
      leaseEndDate: "2025-01-09",
      lastActivity: "30 minutes ago",
      avatar: "SJ",
      emergencyContact: "David Johnson - (555) 765-4321",
      notes: "New resident. Recently moved from California.",
      interests: ["Fitness", "Photography", "Travel", "Wine Tasting"],
      groups: ["Fitness Club", "Photography Group", "New Residents"],
      communityScore: 7.8
    },
    {
      id: 4,
      name: "Robert Wilson",
      unit: "A-105",
      building: "Building A",
      email: "robert.wilson@email.com",
      phone: "(555) 456-7890",
      status: "pending",
      moveInDate: "2024-07-01",
      moveOutDate: null,
      predictedMoveOut: null,
      leaseEndDate: "2025-06-30",
      lastActivity: "Never",
      avatar: "RW",
      emergencyContact: "Jennifer Wilson - (555) 654-3210",
      notes: "Lease signed, moving in next month.",
      interests: ["Sports", "Music", "Grilling"],
      groups: ["Pending Residents"],
      communityScore: null
    },
    {
      id: 5,
      name: "Emily Davis",
      unit: "B-308",
      building: "Building B",
      email: "emily.davis@email.com",
      phone: "(555) 567-8901",
      status: "active",
      moveInDate: "2023-08-22",
      moveOutDate: null,
      predictedMoveOut: "2024-12-31",
      leaseEndDate: "2024-08-21",
      lastActivity: "1 week ago",
      avatar: "ED",
      emergencyContact: "James Davis - (555) 543-2109",
      notes: "Works from home. Participates in community garden.",
      interests: ["Gardening", "Remote Work", "Meditation", "Book Club"],
      groups: ["Garden Committee", "Book Club", "Remote Workers"],
      communityScore: 8.1
    },
    {
      id: 6,
      name: "David Thompson",
      unit: "C-401",
      building: "Building C",
      email: "david.thompson@email.com",
      phone: "(555) 678-9012",
      status: "inactive",
      moveInDate: "2022-05-15",
      moveOutDate: "2024-08-15",
      predictedMoveOut: null,
      leaseEndDate: "2024-05-14",
      lastActivity: "3 months ago",
      avatar: "DT",
      emergencyContact: "Susan Thompson - (555) 432-1098",
      notes: "Extended travel. Unit temporarily vacant.",
      interests: ["Travel", "Photography", "Adventure Sports"],
      groups: ["Travel Enthusiasts"],
      communityScore: 6.5
    }
  ];

  const allActivity = [
    ...recentActivity,
    {
      id: 5,
      type: "maintenance",
      title: "Elevator inspection completed",
      time: "3 hours ago",
      priority: "medium",
      user: "Elevator Services",
      status: "completed",
      description: "Monthly elevator safety inspection passed.",
      location: "Building C"
    },
    {
      id: 6,
      type: "community",
      title: "Yoga class registration opened",
      time: "4 hours ago",
      priority: "low",
      user: "Recreation Team",
      status: "active",
      description: "New morning yoga classes available.",
      location: "Fitness Center"
    }
  ];

  // Helper functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "investigating": return <Eye className="w-4 h-4" />;
      case "scheduled": return <Clock className="w-4 h-4" />;
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "active": return <Activity className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "safety": return <Shield className="w-4 h-4" />;
      case "maintenance": return <Settings className="w-4 h-4" />;
      case "community": return <Users className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "safety": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-blue-100 text-blue-800";
      case "community": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFilteredActivity = () => {
    switch (activityFilter) {
      case "safety":
        return allActivity.filter(activity => activity.type === "safety");
      case "maintenance":
        return allActivity.filter(activity => activity.type === "maintenance");
      case "community":
        return allActivity.filter(activity => activity.type === "community");
      case "high-priority":
        return allActivity.filter(activity => activity.priority === "high");
      default:
        return allActivity;
    }
  };

  const getFilteredResidents = () => {
    let filtered = residentsData;
    
    // Filter by status
    if (residentFilter !== "all") {
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
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getResidentStats = () => {
    const total = residentsData.length;
    const active = residentsData.filter(r => r.status === "active").length;
    const pending = residentsData.filter(r => r.status === "pending").length;
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
    setMessageContent("");
  };

  const handleSendMessageSubmit = () => {
    // Here you would integrate with your notification API
    console.log("Sending message to:", selectedResident?.name);
    console.log("Message:", messageContent);
    setShowMessageModal(false);
    setMessageContent("");
    setSelectedResident(null);
  };

  const getFilteredIncidents = () => {
    switch (safetyFilter) {
      case "high-priority":
        return safetyIncidents.filter(incident => incident.priority === "high");
      case "open":
        return safetyIncidents.filter(incident => ["investigating", "scheduled", "documenting"].includes(incident.status));
      case "resolved":
        return safetyIncidents.filter(incident => ["resolved", "completed"].includes(incident.status));
      case "theft":
        return safetyIncidents.filter(incident => incident.type === "theft");
      case "security":
        return safetyIncidents.filter(incident => incident.type === "security");
      case "maintenance":
        return safetyIncidents.filter(incident => incident.type === "maintenance");
      default:
        return safetyIncidents;
    }
  };

  const getSafetyStats = () => {
    const total = safetyIncidents.length;
    const open = safetyIncidents.filter(i => ["investigating", "scheduled", "documenting"].includes(i.status)).length;
    const highPriority = safetyIncidents.filter(i => i.priority === "high").length;
    const resolved = safetyIncidents.filter(i => ["resolved", "completed"].includes(i.status)).length;
    
    return { total, open, highPriority, resolved };
  };

  const getIncidentTypeColor = (type: string) => {
    switch (type) {
      case "theft": return "bg-red-100 text-red-800";
      case "security": return "bg-orange-100 text-orange-800";
      case "maintenance": return "bg-blue-100 text-blue-800";
      case "accident": return "bg-purple-100 text-purple-800";
      case "system": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getIncidentStatusIcon = (status: string) => {
    switch (status) {
      case "investigating": return <Eye className="w-4 h-4" />;
      case "scheduled": return <Clock className="w-4 h-4" />;
      case "documenting": return <AlertCircle className="w-4 h-4" />;
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
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
        by: "Property Manager"
      };
      
      // In real app, this would update the database
      console.log("Adding update:", newUpdate);
      setUpdateText("");
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
        by: "Property Manager"
      };
      
      // In real app, this would update the incident status and notify higher-ups
      console.log("Escalating incident:", selectedIncident.incidentId);
      console.log("Escalation level:", escalationLevel);
      console.log("Reason:", escalationReason);
      
      setEscalationReason("");
      setEscalationLevel("supervisor");
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
        incidentId: `INC-2024-${String(safetyIncidents.length + 1).padStart(3, "0")}`,
        status: "investigating",
        reportedDate: new Date().toISOString(),
        assignedTo: getAssignedTeam(newIncident.type),
        evidence: [],
        updates: [
          {
            date: new Date().toISOString(),
            update: "Initial incident report filed",
            by: newIncident.reportedBy
          }
        ]
      };
      
      // In real app, this would create the incident in the database
      console.log("Creating new incident:", incidentData);
      
      // Reset form
      setNewIncident({
        title: "",
        type: "maintenance",
        priority: "medium",
        location: "",
        description: "",
        reportedBy: "Property Manager"
      });
      
      setShowReportModal(false);
    }
  };

  const handleAddResident = () => {
    if (newResident.name.trim() && newResident.email.trim() && newResident.unit.trim()) {
      const residentData = {
        ...newResident,
        id: Date.now(),
        status: "pending",
        lastActivity: "Never",
        avatar: newResident.name.split(" ").map(n => n[0]).join("").toUpperCase(),
        interests: [],
        groups: ["New Residents"],
        communityScore: null
      };
      
      // In real app, this would create the resident in the database
      console.log("Creating new resident:", residentData);
      
      // Reset form
      setNewResident({
        name: "",
        unit: "",
        building: "Building A",
        email: "",
        phone: "",
        moveInDate: "",
        leaseEndDate: "",
        emergencyContact: "",
        notes: ""
      });
      
      setShowAddResident(false);
    }
  };

  const getAssignedTeam = (type: string) => {
    switch (type) {
      case "theft": return "Security Team";
      case "security": return "Security Team";
      case "maintenance": return "Maintenance Team";
      case "accident": return "Property Manager";
      case "system": return "Technical Team";
      default: return "Property Manager";
    }
  };

  // Communications Helper Functions
  const getFilteredMessages = () => {
    let filtered = communicationsData;
    
    if (messageFilter !== "all") {
      filtered = filtered.filter(message => message.type === messageFilter);
    }
    
    if (messageSearch) {
      filtered = filtered.filter(message => 
        message.title.toLowerCase().includes(messageSearch.toLowerCase()) ||
        message.content.toLowerCase().includes(messageSearch.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getFilteredAnnouncements = () => {
    if (announcementFilter === "all") {
      return announcementsData;
    }
    return announcementsData.filter(announcement => announcement.category === announcementFilter);
  };

  const getFilteredTemplates = () => {
    if (templateCategory === "all") {
      return templatesData;
    }
    return templatesData.filter(template => template.category === templateCategory);
  };

  const getFilteredConversations = () => {
    if (conversationFilter === "all") {
      return conversationsData;
    }
    return conversationsData.filter(conversation => conversation.status === conversationFilter);
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "emergency": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-blue-100 text-blue-800";
      case "event": return "bg-green-100 text-green-800";
      case "announcement": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConversationStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCommunicationsStats = () => {
    const totalMessages = communicationsData.length;
    const pendingMessages = conversationsData.filter(c => c.status === "pending").length;
    const activeTemplates = templatesData.length;
    const avgOpenRate = communicationsData.reduce((acc, msg) => acc + ((msg.opened / msg.delivered) * 100), 0) / totalMessages;
    
    return { totalMessages, pendingMessages, activeTemplates, avgOpenRate: Math.round(avgOpenRate * 10) / 10 };
  };

  const handleCreateTemplate = () => {
    if (newTemplate.name.trim() && newTemplate.content.trim()) {
      const templateData = {
        ...newTemplate,
        id: Date.now(),
        lastUsed: new Date().toISOString(),
        timesUsed: 0
      };
      
      console.log("Creating new template:", templateData);
      
      setNewTemplate({
        name: "",
        category: "maintenance",
        subject: "",
        content: "",
        variables: []
      });
      
      setShowCreateTemplate(false);
    }
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    setNewTemplate({
      name: template.name,
      category: template.category,
      subject: template.subject,
      content: template.content,
      variables: template.variables
    });
    setShowEditTemplate(true);
  };

  const handleUpdateTemplate = () => {
    if (newTemplate.name.trim() && newTemplate.content.trim()) {
      console.log("Updating template:", selectedTemplate.id, newTemplate);
      
      setNewTemplate({
        name: "",
        category: "maintenance",
        subject: "",
        content: "",
        variables: []
      });
      
      setSelectedTemplate(null);
      setShowEditTemplate(false);
    }
  };

  const handleSendNewMessage = () => {
    if (newMessage.title.trim() && newMessage.content.trim()) {
      const messageData = {
        ...newMessage,
        id: Date.now(),
        sentDate: new Date().toISOString(),
        recipients: 342,
        delivered: 340,
        opened: 0,
        clicked: 0,
        status: "sent",
        sentBy: "Property Manager"
      };
      
      console.log("Sending new message:", messageData);
      
      setNewMessage({
        title: "",
        content: "",
        type: "announcement",
        priority: "normal",
        recipients: "all",
        scheduleType: "now",
        scheduledDate: "",
        scheduledTime: ""
      });
      
      setShowSendMessage(false);
    }
  };

  const handleViewMessageDetails = (message: any) => {
    setSelectedMessage(message);
    setShowMessageDetails(true);
  };

  const handleViewConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    setShowConversationModal(true);
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
            onClick={() => setCurrentPage("dashboard")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === "dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setCurrentPage("residents")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === "residents" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Residents</span>
          </button>
          <button 
            onClick={() => setCurrentPage("safety")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === "safety" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Safety</span>
          </button>
          <button 
            onClick={() => setCurrentPage("communications")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === "communications" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Communications</span>
          </button>
          <button 
            onClick={() => setCurrentPage("events")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === "events" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </button>
          <button 
            onClick={() => setCurrentPage("analytics")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === "analytics" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
          <button 
            onClick={() => setCurrentPage("settings")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
              currentPage === "settings" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
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
                {currentPage === "dashboard" ? greeting : 
                 currentPage === "activity" ? "Recent Activity" :
                 currentPage === "residents" ? "Resident Management" :
                 currentPage === "safety" ? "Safety & Security" :
                 currentPage === "communications" ? "Communications" :
                 currentPage === "events" ? "Events & Activities" :
                 currentPage === "analytics" ? "Analytics & Reports" :
                 currentPage === "settings" ? "Settings" : greeting}
              </h1>
              <p className="text-gray-600 mt-1">
                {currentPage === "dashboard" ? "Here's what's happening in your community today" :
                 currentPage === "activity" ? "Complete activity feed and incident tracking" :
                 currentPage === "residents" ? "Manage residents and community members" :
                 currentPage === "safety" ? "Monitor incidents and safety reports" :
                 currentPage === "communications" ? "Manage community communications and messaging" :
                 "Complete activity feed and incident tracking"}
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
          {currentPage === "dashboard" && (
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
                          onClick={() => setCurrentPage("activity")}
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
          {currentPage === "activity" && (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">All Recent Activity</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActivityFilter("all")}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All
                      </button>
                      <button 
                        onClick={() => setActivityFilter("safety")}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === "safety" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Safety
                      </button>
                      <button 
                        onClick={() => setActivityFilter("maintenance")}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === "maintenance" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Maintenance
                      </button>
                      <button 
                        onClick={() => setActivityFilter("community")}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          activityFilter === "community" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

          {/* Communications Page */}
          {currentPage === "communications" && (
            <>
              {/* Communications Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Messages</p>
                      <p className="text-2xl font-bold text-gray-900">{getCommunicationsStats().totalMessages}</p>
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
                      <p className="text-2xl font-bold text-green-600">{getCommunicationsStats().avgOpenRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-48">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Templates</p>
                      <p className="text-2xl font-bold text-purple-600">{getCommunicationsStats().activeTemplates}</p>
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
                      <p className="text-2xl font-bold text-orange-600">{getCommunicationsStats().pendingMessages}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Communications Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: "message-center", label: "Message Center", icon: MessageSquare },
                      { id: "announcements", label: "Announcements", icon: Bell },
                      { id: "templates", label: "Templates", icon: FileText },
                      { id: "conversations", label: "Direct Messages", icon: Reply },
                      { id: "reports", label: "Delivery Reports", icon: BarChart3 }
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setCommunicationsTab(id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          communicationsTab === id
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Message Center Tab */}
                  {communicationsTab === "message-center" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                          <div className="relative flex-1 max-w-md">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search messages..."
                              value={messageSearch}
                              onChange={(e) => setMessageSearch(e.target.value)}
                              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setMessageFilter("all")}
                              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                messageFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              All
                            </button>
                            <button 
                              onClick={() => setMessageFilter("announcement")}
                              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                messageFilter === "announcement" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              Announcements
                            </button>
                            <button 
                              onClick={() => setMessageFilter("emergency")}
                              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                messageFilter === "emergency" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              Emergency
                            </button>
                            <button 
                              onClick={() => setMessageFilter("event")}
                              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                messageFilter === "event" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              Events
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setShowSendMessage(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {getFilteredMessages().map((message: any) => (
                          <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMessageTypeColor(message.type)}`}>
                                    {message.type}
                                  </span>
                                  <span className="text-gray-500 text-sm">
                                    {new Date(message.sentDate).toLocaleDateString()} at {new Date(message.sentDate).toLocaleTimeString()}
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{message.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{message.content}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Recipients:</span>
                                    <span className="ml-2 text-gray-900 font-medium">{message.recipients}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Delivered:</span>
                                    <span className="ml-2 text-gray-900 font-medium">{message.delivered}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Opened:</span>
                                    <span className="ml-2 text-gray-900 font-medium">{message.opened}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Clicked:</span>
                                    <span className="ml-2 text-gray-900 font-medium">{message.clicked}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <button 
                                onClick={() => handleViewMessageDetails(message)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                View Details
                              </button>
                            </div>
                            
                            <div className="border-t pt-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Sent by: {message.sentBy}</span>
                                <div className="flex items-center space-x-4">
                                  <span className="text-gray-500">
                                    Open Rate: {Math.round((message.opened / message.delivered) * 100)}%
                                  </span>
                                  <span className="text-gray-500">
                                    Click Rate: {Math.round((message.clicked / message.opened) * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Announcements Tab */}
                  {communicationsTab === "announcements" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setAnnouncementFilter("all")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              announcementFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            All Categories
                          </button>
                          <button 
                            onClick={() => setAnnouncementFilter("amenity")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              announcementFilter === "amenity" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Amenities
                          </button>
                          <button 
                            onClick={() => setAnnouncementFilter("policy")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              announcementFilter === "policy" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Policies
                          </button>
                          <button 
                            onClick={() => setAnnouncementFilter("administrative")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              announcementFilter === "administrative" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Administrative
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => setShowSendMessage(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>New Announcement</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {getFilteredAnnouncements().map((announcement: any) => (
                          <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMessageTypeColor(announcement.category)}`}>
                                    {announcement.category}
                                  </span>
                                  <span className="text-gray-500 text-sm">
                                    {new Date(announcement.publishDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{announcement.content}</p>
                                
                                <div className="flex items-center space-x-6 text-sm">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{announcement.views} views</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Heart className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{announcement.likes} likes</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Engagement: {announcement.engagement}%</span>
                                  </div>
                                </div>
                              </div>
                              
                              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                                Edit
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Templates Tab */}
                  {communicationsTab === "templates" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setTemplateCategory("all")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              templateCategory === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            All Templates
                          </button>
                          <button 
                            onClick={() => setTemplateCategory("maintenance")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              templateCategory === "maintenance" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Maintenance
                          </button>
                          <button 
                            onClick={() => setTemplateCategory("events")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              templateCategory === "events" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Events
                          </button>
                          <button 
                            onClick={() => setTemplateCategory("administrative")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              templateCategory === "administrative" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Administrative
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => setShowCreateTemplate(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Create Template</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getFilteredTemplates().map((template: any) => (
                          <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMessageTypeColor(template.category)}`}>
                                    {template.category}
                                  </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">{template.subject}</p>
                                <p className="text-xs text-gray-500 mb-3 line-clamp-3">{template.content}</p>
                                
                                <div className="text-xs text-gray-500 space-y-1">
                                  <p>Used {template.timesUsed} times</p>
                                  <p>Last used: {new Date(template.lastUsed).toLocaleDateString()}</p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2 ml-2">
                                <button 
                                  onClick={() => handleEditTemplate(template)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                              Use Template
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conversations Tab */}
                  {communicationsTab === "conversations" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setConversationFilter("all")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              conversationFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            All
                          </button>
                          <button 
                            onClick={() => setConversationFilter("active")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              conversationFilter === "active" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Active
                          </button>
                          <button 
                            onClick={() => setConversationFilter("pending")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              conversationFilter === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Pending
                          </button>
                          <button 
                            onClick={() => setConversationFilter("resolved")}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              conversationFilter === "resolved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Resolved
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {getFilteredConversations().map((conversation: any) => (
                          <div key={conversation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-medium text-gray-900">{conversation.resident}</h3>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConversationStatusColor(conversation.status)}`}>
                                    {conversation.status}
                                  </span>
                                  {conversation.unread && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm font-medium text-gray-700 mb-1">{conversation.subject}</p>
                                <p className="text-sm text-gray-600 mb-2">{conversation.lastMessage}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>{conversation.messageCount} messages</span>
                                  <span>Last activity: {new Date(conversation.lastActivity).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              <button 
                                onClick={() => handleViewConversation(conversation)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                View Chat
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reports Tab */}
                  {communicationsTab === "reports" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Delivery Reports</h3>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Export Reports</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {deliveryReports.map((report: any) => (
                          <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{report.messageTitle}</h3>
                                <p className="text-sm text-gray-600">
                                  Sent on {new Date(report.sentDate).toLocaleDateString()} at {new Date(report.sentDate).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{report.totalRecipients}</div>
                                <div className="text-sm text-gray-600">Recipients</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{report.delivered}</div>
                                <div className="text-sm text-gray-600">Delivered</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{report.opened}</div>
                                <div className="text-sm text-gray-600">Opened</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">{report.clicked}</div>
                                <div className="text-sm text-gray-600">Clicked</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Delivery Rate:</span>
                                <span className="ml-2 font-medium text-green-600">{report.deliveryRate}%</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Open Rate:</span>
                                <span className="ml-2 font-medium text-blue-600">{report.openRate}%</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Click Rate:</span>
                                <span className="ml-2 font-medium text-purple-600">{report.clickRate}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Safety Page */}
          {currentPage === "safety" && (
            <>
              {/* Safety Stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => handleStatClick("all")}
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
                  onClick={() => handleStatClick("open")}
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
                  onClick={() => handleStatClick("high-priority")}
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
                  onClick={() => handleStatClick("resolved")}
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
                      onClick={() => setSafetyFilter("all")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All ({safetyIncidents.length})
                    </button>
                    <button 
                      onClick={() => setSafetyFilter("open")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === "open" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Open ({getSafetyStats().open})
                    </button>
                    <button 
                      onClick={() => setSafetyFilter("high-priority")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === "high-priority" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      High Priority ({getSafetyStats().highPriority})
                    </button>
                    <button 
                      onClick={() => setSafetyFilter("theft")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === "theft" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Theft
                    </button>
                    <button 
                      onClick={() => setSafetyFilter("resolved")}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        safetyFilter === "resolved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          {currentPage === "residents" && (
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
                        onClick={() => setResidentFilter("all")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          residentFilter === "all" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All ({residentsData.length})
                      </button>
                      <button 
                        onClick={() => setResidentFilter("active")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          residentFilter === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Active ({getResidentStats().active})
                      </button>
                      <button 
                        onClick={() => setResidentFilter("pending")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          residentFilter === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

          {/* Other Pages Placeholder */}
          {(currentPage === "events" || currentPage === "analytics" || currentPage === "settings") && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                {currentPage === "events" && <Calendar className="w-8 h-8 text-gray-400" />}
                {currentPage === "analytics" && <BarChart3 className="w-8 h-8 text-gray-400" />}
                {currentPage === "settings" && <Settings className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Coming Soon
              </h3>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Resident Modal */}
      {showAddResident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Resident</h3>
                <button 
                  onClick={() => setShowAddResident(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newResident.name}
                    onChange={(e) => setNewResident({...newResident, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter resident's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                  <input
                    type="text"
                    value={newResident.unit}
                    onChange={(e) => setNewResident({...newResident, unit: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., A-301"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                  <select
                    value={newResident.building}
                    onChange={(e) => setNewResident({...newResident, building: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Building A">Building A</option>
                    <option value="Building B">Building B</option>
                    <option value="Building C">Building C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newResident.email}
                    onChange={(e) => setNewResident({...newResident, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="resident@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newResident.phone}
                    onChange={(e) => setNewResident({...newResident, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Move-in Date</label>
                  <input
                    type="date"
                    value={newResident.moveInDate}
                    onChange={(e) => setNewResident({...newResident, moveInDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lease End Date</label>
                  <input
                    type="date"
                    value={newResident.leaseEndDate}
                    onChange={(e) => setNewResident({...newResident, leaseEndDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  <input
                    type="text"
                    value={newResident.emergencyContact}
                    onChange={(e) => setNewResident({...newResident, emergencyContact: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Name - Phone Number"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newResident.notes}
                  onChange={(e) => setNewResident({...newResident, notes: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Any additional notes about the resident..."
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowAddResident(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddResident}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Resident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Incident Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Report New Incident</h3>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incident Title</label>
                  <input
                    type="text"
                    value={newIncident.title}
                    onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the incident"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newIncident.type}
                    onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="theft">Theft</option>
                    <option value="security">Security</option>
                    <option value="accident">Accident</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newIncident.priority}
                    onChange={(e) => setNewIncident({...newIncident, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newIncident.location}
                    onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Where did this incident occur?"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Provide detailed information about the incident..."
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitIncident}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Report Incident
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedResident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Send Message to {selectedResident.name}
                </h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex space-x-3 mt-4">
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendMessageSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resident Profile Modal */}
      {showResidentProfile && selectedResident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-xl">{selectedResident.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedResident.name}</h3>
                    <p className="text-gray-600">{selectedResident.unit} • {selectedResident.building}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowResidentProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900">{selectedResident.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-900">{selectedResident.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Lease Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Move-in:</span> {new Date(selectedResident.moveInDate).toLocaleDateString()}</p>
                    <p><span className="text-gray-500">Lease End:</span> {new Date(selectedResident.leaseEndDate).toLocaleDateString()}</p>
                    <p><span className="text-gray-500">Last Activity:</span> {selectedResident.lastActivity}</p>
                  </div>
                </div>
              </div>
              
              {selectedResident.interests && selectedResident.interests.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResident.interests.map((interest: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedResident.groups && selectedResident.groups.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Community Groups</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResident.groups.map((group: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedResident.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedResident.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Incident Detail Modal */}
      {showIncidentModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedIncident.title}</h3>
                  <p className="text-gray-600 mt-1">Incident ID: {selectedIncident.incidentId}</p>
                </div>
                <button 
                  onClick={() => setShowIncidentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{selectedIncident.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Updates Timeline</h4>
                    <div className="space-y-3">
                      {selectedIncident.updates.map((update: any, index: number) => (
                        <div key={index} className="flex space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{update.update}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(update.date).toLocaleString()} by {update.by}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedIncident.evidence && selectedIncident.evidence.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Evidence</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedIncident.evidence.map((evidence: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => handleViewEvidence(evidence)}
                            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            {evidence.type === "video" && <Video className="w-5 h-5 text-blue-600" />}
                            {evidence.type === "image" && <Camera className="w-5 h-5 text-green-600" />}
                            {evidence.type === "document" && <FileText className="w-5 h-5 text-orange-600" />}
                            <span className="text-sm text-gray-900">{evidence.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Sidebar */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Incident Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getIncidentTypeColor(selectedIncident.type)}`}>
                          {selectedIncident.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Priority:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedIncident.priority)}`}>
                          {selectedIncident.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className="text-gray-900 capitalize">{selectedIncident.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span className="text-gray-900">{selectedIncident.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reported by:</span>
                        <span className="text-gray-900">{selectedIncident.reportedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Assigned to:</span>
                        <span className="text-gray-900">{selectedIncident.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => setShowAddUpdate(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Update</span>
                    </button>
                    
                    <button 
                      onClick={() => handleMessageResident(selectedIncident.reportedBy)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Message Reporter</span>
                    </button>
                    
                    <button 
                      onClick={handleEscalate}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Escalate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Update Modal */}
      {showAddUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add Update</h3>
                <button 
                  onClick={() => setShowAddUpdate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                placeholder="Enter update details..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex space-x-3 mt-4">
                <button 
                  onClick={() => setShowAddUpdate(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddUpdate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Escalate Incident</h3>
                <button 
                  onClick={() => setShowEscalateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Escalate to</label>
                <select
                  value={escalationLevel}
                  onChange={(e) => setEscalationLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="supervisor">Supervisor</option>
                  <option value="management">Management</option>
                  <option value="corporate">Corporate</option>
                  <option value="legal">Legal Department</option>
                </select>
              </div>
              <textarea
                value={escalationReason}
                onChange={(e) => setEscalationReason(e.target.value)}
                placeholder="Reason for escalation..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex space-x-3 mt-4">
                <button 
                  onClick={() => setShowEscalateModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEscalateSubmit}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communications Modals */}

      {/* Create Template Modal */}
      {showCreateTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create New Template</h3>
                <button 
                  onClick={() => setShowCreateTemplate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
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
                    <option value="maintenance">Maintenance</option>
                    <option value="events">Events</option>
                    <option value="administrative">Administrative</option>
                    <option value="safety">Safety</option>
                    <option value="policy">Policy</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                <input
                  type="text"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email subject line"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Content</label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter your template content here. Use variables like [RESIDENT_NAME], [DATE], [LOCATION] for personalization."
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Available Variables: [RESIDENT_NAME], [DATE], [TIME], [LOCATION], [AMOUNT], [DUE_DATE], [EVENT_NAME], [COMMUNITY_NAME], [UNIT_NUMBER]</p>
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowCreateTemplate(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateTemplate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Template Modal */}
      {showEditTemplate && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Template</h3>
                <button 
                  onClick={() => setShowEditTemplate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
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
                    <option value="maintenance">Maintenance</option>
                    <option value="events">Events</option>
                    <option value="administrative">Administrative</option>
                    <option value="safety">Safety</option>
                    <option value="policy">Policy</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                <input
                  type="text"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email subject line"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Content</label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter your template content here. Use variables like [RESIDENT_NAME], [DATE], [LOCATION] for personalization."
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowEditTemplate(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateTemplate}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Update Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showSendMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
                <button 
                  onClick={() => setShowSendMessage(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message Title</label>
                  <input
                    type="text"
                    value={newMessage.title}
                    onChange={(e) => setNewMessage({...newMessage, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter message title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
                  <select
                    value={newMessage.type}
                    onChange={(e) => setNewMessage({...newMessage, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="event">Event</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter your message content here..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newMessage.priority}
                    onChange={(e) => setNewMessage({...newMessage, priority: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                  <select
                    value={newMessage.recipients}
                    onChange={(e) => setNewMessage({...newMessage, recipients: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Residents</option>
                    <option value="building-a">Building A</option>
                    <option value="building-b">Building B</option>
                    <option value="building-c">Building C</option>
                    <option value="active">Active Residents Only</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowSendMessage(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendNewMessage}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Details Modal */}
      {showMessageDetails && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
                <button 
                  onClick={() => setShowMessageDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{selectedMessage.title}</h4>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMessageTypeColor(selectedMessage.type)}`}>
                      {selectedMessage.type}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Sent on {new Date(selectedMessage.sentDate).toLocaleDateString()} at {new Date(selectedMessage.sentDate).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedMessage.content}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{selectedMessage.recipients}</div>
                    <div className="text-sm text-gray-600">Recipients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{selectedMessage.delivered}</div>
                    <div className="text-sm text-gray-600">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{selectedMessage.opened}</div>
                    <div className="text-sm text-gray-600">Opened</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{selectedMessage.clicked}</div>
                    <div className="text-sm text-gray-600">Clicked</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Delivery Rate:</span>
                    <span className="ml-2 font-medium text-green-600">{Math.round((selectedMessage.delivered / selectedMessage.recipients) * 100)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Open Rate:</span>
                    <span className="ml-2 font-medium text-blue-600">{Math.round((selectedMessage.opened / selectedMessage.delivered) * 100)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Click Rate:</span>
                    <span className="ml-2 font-medium text-purple-600">{Math.round((selectedMessage.clicked / selectedMessage.opened) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conversation Modal */}
      {showConversationModal && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Conversation with {selectedConversation.resident}</h3>
                  <p className="text-gray-600 text-sm">{selectedConversation.subject}</p>
                </div>
                <button 
                  onClick={() => setShowConversationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">R</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{selectedConversation.resident}</p>
                      <p className="text-sm text-gray-700 mt-1">Hello, I have a question about the new pool hours. Can you please clarify what time the pool closes on weekends?</p>
                      <p className="text-xs text-gray-500 mt-2">2 days ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">M</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Property Manager</p>
                      <p className="text-sm text-gray-700 mt-1">Hi! The pool is open until 10 PM on weekends. The new hours are: Monday-Friday 6 AM - 9 PM, Saturday-Sunday 7 AM - 10 PM. Hope this helps!</p>
                      <p className="text-xs text-gray-500 mt-2">1 day ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">R</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{selectedConversation.resident}</p>
                      <p className="text-sm text-gray-700 mt-1">{selectedConversation.lastMessage}</p>
                      <p className="text-xs text-gray-500 mt-2">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Send
                  </button>
                </div>
                <div className="flex items-center space-x-4 mt-3">
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Mark as Resolved
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Send Community Notification</h3>
                <button 
                  onClick={() => setShowBroadcastModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Message Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
                <input
                  type="text"
                  value={broadcastData.title}
                  onChange={(e) => setBroadcastData({...broadcastData, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter notification title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={broadcastData.message}
                  onChange={(e) => setBroadcastData({...broadcastData, message: e.target.value})}
                  placeholder="Type your notification message here..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recipients"
                      value="all"
                      checked={broadcastData.recipients === "all"}
                      onChange={(e) => setBroadcastData({...broadcastData, recipients: e.target.value})}
                      className="mr-2"
                    />
                    <span className="text-sm">All Residents</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recipients"
                      value="building"
                      checked={broadcastData.recipients === "building"}
                      onChange={(e) => setBroadcastData({...broadcastData, recipients: e.target.value})}
                      className="mr-2"
                    />
                    <span className="text-sm">Specific Buildings</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recipients"
                      value="active"
                      checked={broadcastData.recipients === "active"}
                      onChange={(e) => setBroadcastData({...broadcastData, recipients: e.target.value})}
                      className="mr-2"
                    />
                    <span className="text-sm">Active Residents Only</span>
                  </label>
                </div>
                
                {broadcastData.recipients === "building" && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Buildings</label>
                    <div className="flex gap-2">
                      {["Building A", "Building B", "Building C"].map((building: string) => (
                        <label key={building} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={broadcastData.buildings.includes(building)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setBroadcastData({
                                  ...broadcastData, 
                                  buildings: [...broadcastData.buildings, building]
                                });
                              } else {
                                setBroadcastData({
                                  ...broadcastData, 
                                  buildings: broadcastData.buildings.filter(b => b !== building)
                                });
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm">{building}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Methods</label>
                <div className="flex gap-4">
                  {[
                    { value: "email", label: "Email", icon: Mail },
                    { value: "sms", label: "SMS/Text", icon: MessageSquare },
                    { value: "app", label: "In-App", icon: Bell },
                    { value: "phone", label: "Phone Call", icon: Phone }
                  ].map(({value, label, icon: Icon}) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={broadcastData.deliveryMethods.includes(value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBroadcastData({
                              ...broadcastData, 
                              deliveryMethods: [...broadcastData.deliveryMethods, value]
                            });
                          } else {
                            setBroadcastData({
                              ...broadcastData, 
                              deliveryMethods: broadcastData.deliveryMethods.filter(m => m !== value)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <Icon className="w-4 h-4 mr-1" />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select
                  value={broadcastData.priority}
                  onChange={(e) => setBroadcastData({...broadcastData, priority: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              {/* Scheduling */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">When to Send</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="now"
                      checked={broadcastData.scheduleType === "now"}
                      onChange={(e) => setBroadcastData({...broadcastData, scheduleType: e.target.value})}
                      className="mr-2"
                    />
                    <span className="text-sm">Send Now</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="later"
                      checked={broadcastData.scheduleType === "later"}
                      onChange={(e) => setBroadcastData({...broadcastData, scheduleType: e.target.value})}
                      className="mr-2"
                    />
                    <span className="text-sm">Schedule for Later</span>
                  </label>
                  
                  {broadcastData.scheduleType === "later" && (
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Date</label>
                        <input
                          type="date"
                          value={broadcastData.scheduledDate}
                          onChange={(e) => setBroadcastData({...broadcastData, scheduledDate: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Time</label>
                        <input
                          type="time"
                          value={broadcastData.scheduledTime}
                          onChange={(e) => setBroadcastData({...broadcastData, scheduledTime: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Attachment */}
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={broadcastData.attachImage}
                    onChange={(e) => setBroadcastData({...broadcastData, attachImage: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Attach Image</span>
                </label>
                
                {broadcastData.attachImage && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBroadcastData({...broadcastData, imageFile: e.target.files?.[0] || null})}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload image</p>
                      {broadcastData.imageFile && (
                        <p className="text-xs text-blue-600 mt-1">{broadcastData.imageFile.name}</p>
                      )}
                    </label>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    setShowBroadcastModal(false);
                    setBroadcastData({
                      title: "",
                      message: "",
                      recipients: "all",
                      buildings: [],
                      deliveryMethods: ["email"],
                      priority: "normal",
                      scheduleType: "now",
                      scheduledDate: "",
                      scheduledTime: "",
                      attachImage: false,
                      imageFile: null
                    });
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    console.log("Broadcasting notification:", broadcastData);
                    setBroadcastData({
                      title: "",
                      message: "",
                      recipients: "all",
                      buildings: [],
                      deliveryMethods: ["email"],
                      priority: "normal",
                      scheduleType: "now",
                      scheduledDate: "",
                      scheduledTime: "",
                      attachImage: false,
                      imageFile: null
                    });
                    setShowBroadcastModal(false);
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors text-white ${
                    broadcastData.priority === "emergency" 
                      ? "bg-red-600 hover:bg-red-700" 
                      : broadcastData.priority === "urgent"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {broadcastData.scheduleType === "now" ? "Send Notification" : "Schedule Notification"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create Community Event</h3>
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={eventData.title}
                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({...eventData, time: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={eventData.location}
                    onChange={(e) => setEventData({...eventData, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Where will this event take place?"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Provide details about the event..."
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    console.log("Creating event:", eventData);
                    setEventData({ title: "", date: "", time: "", location: "", description: "" });
                    setShowCreateEventModal(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Event
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

// Force deployment with all assets
import React, { useState } from 'react';
import PoolPartyImage from './Assets/pool-party.png';
import NavySofaImage from './Assets/navy-sofa.png';
// Marketplace Images
import sectionalSofa from './Assets/marketplace-sectional-sofa.png';
import mountainBike from './Assets/marketplace-mountain-bike.png';
import coffeeTable from './Assets/marketplace-coffee-table.png';
import airFryer from './Assets/marketplace-air-fryer.png';
import textbooks from './Assets/marketplace-textbooks.png';
import plantStand from './Assets/marketplace-plant-stand.png';

// Amenity Images
import poolDeck from './Assets/amenity-pool-deck.png';
import fitnessCenter from './Assets/amenity-fitness-center.png';
import rooftopTerrace from './Assets/amenity-rooftop-terrace.png';
import communityLounge from './Assets/amenity-community-lounge.png';
import gameRoom from './Assets/amenity-game-room.png';
import businessCenter from './Assets/amenity-business-center.png';
import { 
  Home, Heart, MessageCircle, Users, Calendar, Building, 
  ShoppingBag, Phone, AlertTriangle, Bell, Search, Plus,
  MapPin, Clock, Camera, Zap, Coffee, Dumbbell, Waves,
  Car, Package, Shield, Star, TrendingUp, UserPlus, Menu,
  X, Settings, LogOut, Edit, Share2, Bookmark, Filter, ChevronLeft,
  MoreHorizontal, CheckCircle, Send
} from 'lucide-react';

const ResidentPlatform = ({ onBackToManagement }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSharePhotoModal, setShowSharePhotoModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [showSellItemModal, setShowSellItemModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [showPostComposer, setShowPostComposer] = useState(false);
  const [composerType, setComposerType] = useState('');
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showNeighborProfile, setShowNeighborProfile] = useState(false);
  const [selectedNeighbor, setSelectedNeighbor] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [neighborFilter, setNeighborFilter] = useState('All Neighbors');
  const [friendRequests, setFriendRequests] = useState(['mike_r', 'lisa_b']);
  const [friends, setFriends] = useState(['sarah_m', 'jessica_m']);
  const [myGroups, setMyGroups] = useState(['book_club', 'dog_owners']);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupFilter, setGroupFilter] = useState('All Groups');
  const [selectedAmenity, setSelectedAmenity] = useState('pool');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [myBookings, setMyBookings] = useState([
    { id: 1, amenity: 'Pool Deck', date: 'Dec 28', time: '2:00 PM - 4:00 PM', status: 'confirmed' },
    { id: 2, amenity: 'Fitness Center', date: 'Dec 30', time: '7:00 AM - 8:00 AM', status: 'confirmed' }
  ]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: 'direct',
      name: 'Sarah Martinez',
      avatar: 'SM',
      lastMessage: 'Thanks for the yoga class recommendation!',
      timestamp: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2, 
      type: 'group',
      name: 'Book Club',
      avatar: '📚',
      lastMessage: 'Jessica: What did everyone think of chapter 5?',
      timestamp: '15m ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      type: 'announcement',
      name: 'Community Management',
      avatar: 'CT',
      lastMessage: 'Pool maintenance scheduled for tomorrow',
      timestamp: '1h ago',
      unread: 1,
      online: false
    },
    {
      id: 4,
      type: 'direct',
      name: 'Mike Rodriguez', 
      avatar: 'MR',
      lastMessage: 'Hey! Are you going to the pool party?',
      timestamp: '2h ago',
      unread: 0,
      online: true
    }
  ]);

  const marketplaceItems = [
    {
      id: 1,
      title: "Navy Blue Sectional Sofa",
      condition: "Like new condition",
      unit: "Unit 4B",
      price: "$450",
      description: "Comfortable sectional sofa, perfect for a living room. Barely used, moving out of state.",
      image: sectionalSofa
    },
    {
      id: 2,
      title: "Trek Mountain Bike",
      condition: "Good condition",
      unit: "Unit 2A", 
      price: "$280",
      description: "21-speed mountain bike, great for trails. Well maintained, some wear on tires.",
      image: mountainBike
    },
    {
      id: 3,
      title: "Glass Coffee Table",
      condition: "Fair condition",
      unit: "Unit 1C",
      price: "$85",
      description: "Modern glass coffee table with metal legs. Small scratch on surface but very functional.",
      image: coffeeTable
    },
    {
      id: 4,
      title: "Ninja Air Fryer",
      condition: "Brand new",
      unit: "Unit 3A",
      price: "$120", 
      description: "Never used air fryer, still in box. Received as gift but already have one.",
      image: airFryer
    },
    {
      id: 5,
      title: "College Textbooks (Set of 4)",
      condition: "Good condition",
      unit: "Unit 5A",
      price: "$75",
      description: "Business and economics textbooks from Georgia Tech. Some highlighting but great condition.",
      image: textbooks
    },
    {
      id: 6,
      title: "Wooden Plant Stand",
      condition: "Like new",
      unit: "Unit 2C", 
      price: "$35",
      description: "Beautiful wooden plant stand with 3 tiers. Perfect for displaying plants indoors.",
      image: plantStand
    }
  ];

  // Amenities data array
const amenities = [
  {
    id: 1,
    name: "Pool Deck",
    status: "Available",
    hours: "6 AM - 10 PM",
    maxPeople: "8 people per slot",
    timeSlots: "2-hour time slots",
    image: poolDeck,
    buttonText: "Book Pool Deck",
    buttonColor: "bg-blue-500 hover:bg-blue-600"
  },
  {
    id: 2,
    name: "Fitness Center", 
    status: "Available",
    hours: "5 AM - 11 PM",
    maxPeople: "6 people per slot",
    timeSlots: "1-hour time slots",
    image: fitnessCenter,
    buttonText: "Book Fitness Center",
    buttonColor: "bg-green-500 hover:bg-green-600"
  },
  {
    id: 3,
    name: "Rooftop Terrace",
    status: "Popular",
    hours: "8 AM - 10 PM", 
    maxPeople: "15 people per slot",
    timeSlots: "3-hour time slots",
    image: rooftopTerrace,
    buttonText: "Book Rooftop",
    buttonColor: "bg-purple-500 hover:bg-purple-600"
  },
  {
    id: 4,
    name: "Community Lounge",
    status: "Available",
    hours: "24/7",
    maxPeople: "20 people per slot", 
    timeSlots: "2-hour time slots",
    image: communityLounge,
    buttonText: "Book Lounge",
    buttonColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    id: 5,
    name: "Game Room",
    status: "Maintenance",
    hours: "10 AM - 10 PM",
    maxPeople: "8 people per slot",
    timeSlots: "Under maintenance",
    image: gameRoom,
    buttonText: "Temporarily Unavailable",
    buttonColor: "bg-gray-400 cursor-not-allowed"
  },
  {
    id: 6,
    name: "Business Center",
    status: "Available", 
    hours: "6 AM - 10 PM",
    maxPeople: "4 people per slot",
    timeSlots: "1-hour time slots",
    image: businessCenter,
    buttonText: "Book Business Center",
    buttonColor: "bg-gray-500 hover:bg-gray-600"
  }
];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen w-full">
        {/* Desktop Sidebar - Hidden on Mobile */}
        <div className="hidden md:flex md:w-64 md:flex-col md:relative">
          <div className="flex flex-col flex-1 bg-white border-r border-gray-200">
            {/* Profile Section */}
            <div className="flex items-center px-4 py-6 border-b border-gray-200">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">S</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Unit 3B</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'home' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                Home
              </button>

              <button
                onClick={() => setActiveTab('feed')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'feed' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5 mr-3" />
                Feed
              </button>

              <button
                onClick={() => setActiveTab('neighbors')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'neighbors' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Neighbors
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'events' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Events
              </button>

              <button
                onClick={() => setActiveTab('groups')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'groups' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Building className="w-5 h-5 mr-3" />
                Groups
              </button>

              <button
                onClick={() => setActiveTab('marketplace')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'marketplace' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Marketplace
              </button>

              <button
                onClick={() => setActiveTab('amenities')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'amenities' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Waves className="w-5 h-5 mr-3" />
                Amenities
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'messages' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Messages
              </button>
            </nav>

            {/* Desktop Navigation - Bottom */}
            <div className="mt-auto border-t border-gray-200 p-4 space-y-2">
              <button 
                onClick={onBackToManagement}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 w-full px-3 py-2 rounded-lg transition-colors font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Management</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full px-3 py-2 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-40">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">HeyNeighbor</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">S</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-3 space-y-1">
                <button
                  onClick={() => { onBackToManagement(); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 bg-blue-50"
                >
                  <ChevronLeft className="w-5 h-5 mr-3" />
                  Back to Management
                </button>
                <div className="border-t border-gray-200 my-2"></div>
                <button
                  onClick={() => { setActiveTab('home'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </button>
                <button
                  onClick={() => { setActiveTab('feed'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Feed
                </button>
                <button
                  onClick={() => { setActiveTab('neighbors'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Users className="w-5 h-5 mr-3" />
                  Neighbors
                </button>
                <button
                  onClick={() => { setActiveTab('events'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Events
                </button>
                <button
                  onClick={() => { setActiveTab('groups'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Building className="w-5 h-5 mr-3" />
                  Groups
                </button>
                <button
                  onClick={() => { setActiveTab('marketplace'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Marketplace
                </button>
                <button
                  onClick={() => { setActiveTab('amenities'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Waves className="w-5 h-5 mr-3" />
                  Amenities
                </button>
                <button
                  onClick={() => { setActiveTab('messages'); setShowMobileMenu(false); }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Messages
                </button>
                <div className="border-t border-gray-200 my-2"></div>
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
<div className="flex-1 flex flex-col min-w-0 bg-gray-50 w-full md:ml-0">
  <div className="flex-1 relative overflow-y-auto md:pb-0 pb-16 mt-16 md:mt-0 w-full">
            <div className="py-6">
              <div className="w-full md:max-w-7xl md:mx-auto px-4 sm:px-6 md:px-8">
                
                {/* Home Tab Content */}
                {activeTab === 'home' && (
                  <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Good morning, Sarah! 👋</h1>
                          <p className="text-gray-600">Ready to connect with your community?</p>
                        </div>
                        <div className="hidden md:flex items-center space-x-2">
                          <Bell className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-500">3 new notifications</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button 
                            onClick={() => setShowSharePhotoModal(true)}
                            className="flex flex-col items-center p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors"
                        >   
                          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-2">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Share Photo</span>
                        </button>
                        
                        <button 
                            onClick={() => setShowCreateEventModal(true)}
                            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                        >
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-2">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Create Event</span>
                        </button>
                        
                        <button 
                            onClick={() => setShowReportIssueModal(true)}
                            className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                        >
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-2">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Report Issue</span>
                        </button>
                        
                        <button 
                            onClick={() => setShowSellItemModal(true)}
                            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                        >
                          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-2">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Sell Item</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Community Buzz */}
                      <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Community Buzz</h2>
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                          </div>
                          <div className="p-6 space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-sm">MR</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm font-medium text-gray-900">Mike Rodriguez</p>
                                  <span className="text-xs text-gray-500">(4B)</span>
                                  <span className="text-xs text-gray-500">shared a photo from the BBQ</span>
                                </div>
                                <p className="text-xs text-gray-500">2h ago</p>
                                <button className="mt-2 text-sm text-gray-600 hover:text-red-500 flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>12 likes</span>
                                </button>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-sm">LC</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm font-medium text-gray-900">Lisa Chen</p>
                                  <span className="text-xs text-gray-500">(2A)</span>
                                  <span className="text-xs text-gray-500">created Yoga Group</span>
                                </div>
                                <p className="text-xs text-gray-500">4h ago</p>
                                <button className="mt-2 text-sm text-gray-600 hover:text-red-500 flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>8 likes</span>
                                </button>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-sm">CT</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm font-medium text-gray-900">Community Team</p>
                                  <span className="text-xs text-blue-600">(Management)</span>
                                  <span className="text-xs text-gray-500">posted about maintenance</span>
                                </div>
                                <p className="text-xs text-gray-500">6h ago</p>
                                <button className="mt-2 text-sm text-gray-600 hover:text-red-500 flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>24 likes</span>
                                </button>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-sm">AJ</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                                  <span className="text-xs text-gray-500">(1C)</span>
                                  <span className="text-xs text-gray-500">is selling a dining table</span>
                                </div>
                                <p className="text-xs text-gray-500">8h ago</p>
                                <button className="mt-2 text-sm text-gray-600 hover:text-red-500 flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>5 likes</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Calendar</button>
                          </div>
                          <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Pool Party</p>
                                    <p className="text-xs text-gray-500">Today 2:00 PM • 📍 Pool Deck</p>
                                    <p className="text-xs text-gray-600">24 people going</p>
                                  </div>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Going ✓
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Dumbbell className="w-6 h-6 text-purple-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Yoga Class</p>
                                    <p className="text-xs text-gray-500">Tomorrow 7:00 AM • 📍 Rooftop</p>
                                    <p className="text-xs text-gray-600">12 people going</p>
                                  </div>
                                  <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                                    Join
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Users className="w-6 h-6 text-green-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Game Night</p>
                                    <p className="text-xs text-gray-500">Friday 7:00 PM • 📍 Lounge</p>
                                    <p className="text-xs text-gray-600">8 people going</p>
                                  </div>
                                  <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                                    Join
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Sidebar */}
                      <div className="space-y-6">
                        {/* Amenity Status */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Amenity Status</h2>
                          </div>
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Waves className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Pool</span>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                available
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <Dumbbell className="w-4 h-4 text-orange-600" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900">Gym</span>
                                  <p className="text-xs text-gray-500">Next: 3:00 PM</p>
                                </div>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                busy
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <Coffee className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Lounge</span>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                available
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                  <Car className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-900">Parking</span>
                                  <p className="text-xs text-gray-500">Next: 8:00 AM</p>
                                </div>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                full
                              </span>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                              Book Amenity
                            </button>
                          </div>
                        </div>

                        {/* Community Stats */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Community Stats</h2>
                          </div>
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-600">Active Neighbors</span>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">127</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-600">Events This Month</span>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">8</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4 text-purple-600" />
                                <span className="text-sm text-gray-600">Active Groups</span>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">12</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <ShoppingBag className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-gray-600">Marketplace Items</span>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">23</span>
                            </div>
                          </div>
                        </div>

                        {/* Weather Widget */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                          <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Today's Weather</h2>
                          </div>
                          <div className="p-6">
                            <div className="text-center">
                              <div className="text-4xl mb-2">☀️</div>
                              <div className="text-2xl font-bold text-gray-900 mb-1">75°F</div>
                              <p className="text-sm text-gray-600 mb-2">Perfect for pool time!</p>
                              <div className="flex items-center justify-center text-xs text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                Sunrise Apartments
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'marketplace' && (
  <div className="space-y-6">
    {/* Marketplace Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Marketplace</h1>
          <p className="text-gray-600">Buy and sell with your neighbors</p>
        </div>
        <button 
          onClick={() => setShowSellItemModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Sell Item</span>
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search marketplace..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
          <option value="">All Categories</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="appliances">Appliances</option>
          <option value="books">Books</option>
          <option value="clothing">Clothing</option>
          <option value="sports">Sports & Recreation</option>
        </select>
      </div>
    </div>

    {/* Marketplace Items Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {marketplaceItems.map(item => (
    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.condition} • {item.unit}</p>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">{item.price}</span>
          <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
            Contact Seller
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{activeTab === 'feed' && (
  <div className="max-w-2xl mx-auto space-y-4">
    {/* Stories Section */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stories</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {[
          { id: 1, title: 'Pool Party', emoji: '🏊‍♀️', gradient: 'from-blue-400 to-cyan-500', content: 'Get ready for our amazing pool party this Saturday!' },
          { id: 2, title: 'BBQ Event', emoji: '🍖', gradient: 'from-green-400 to-emerald-500', content: 'Community BBQ was a huge success! Thanks to everyone who came.' },
          { id: 3, title: 'New Neighbors', emoji: '👋', gradient: 'from-purple-400 to-pink-500', content: 'Welcome to all our new residents who joined us this month!' },
          { id: 4, title: 'Recommendations', emoji: '⭐', gradient: 'from-orange-400 to-red-500', content: 'Check out the latest neighbor recommendations and reviews!' }
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

    {/* Create Post Section */}
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
            onClick={() => setShowSellItemModal(true)}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm">Sell Item</span>
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
        {['All Posts', 'Events', 'Recommendations', 'Marketplace', 'Welcome'].map((category) => (
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
  {/* Filter posts based on activeCategory */}
  {(() => {
    const allPosts = [
      {
        id: 1,
        category: 'Events',
        content: (
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
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-800 mb-3">
                🎉 Pool Party this Saturday at 2 PM! Join us for food, music, and fun by the pool. Bring your swimsuit and appetite! #CommunityEvent #PoolParty
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img 
                src={PoolPartyImage} 
                alt="Community Pool Party"
                className="w-full h-auto"
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
        )
      },
      {
        id: 2,
        category: 'Recommendations',
        content: (
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
                    onClick={() => setShowComments(prev => ({ ...prev, 2: !prev[2] }))}
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
        )
      },
      {
        id: 3,
        category: 'Welcome',
        content: (
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
                    onClick={() => setShowComments(prev => ({ ...prev, 3: !prev[3] }))}
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
        )
      },
      {
        id: 4,
        category: 'Marketplace',
        content: (
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
                    onClick={() => setShowComments(prev => ({ ...prev, 4: !prev[4] }))}
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
        )
      }
    ];

    // Filter posts based on activeCategory
    const filteredPosts = activeCategory === 'All Posts' 
      ? allPosts 
      : allPosts.filter(post => post.category === activeCategory);

    return filteredPosts.map(post => (
      <div key={post.id}>
        {post.content}
      </div>
    ));
  })()}

{/* Load More */}
  <div className="text-center py-6">
    <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
      Load More Posts
    </button>
  </div>
</div>
  </div>
)}

{activeTab === 'events' && (
  <div className="space-y-6">
    {/* Events Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Events</h1>
          <p className="text-gray-600">Discover and join neighborhood activities</p>
        </div>
        <button 
          onClick={() => setShowCreateEventModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>
      
      {/* Event Categories */}
      <div className="mt-6 flex flex-wrap gap-2">
        {['All Events', 'This Week', 'Social', 'Fitness', 'Maintenance', 'Holiday'].map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
    </div>

    {/* Upcoming Events */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming This Week</h2>
      <div className="space-y-4">
        {/* Pool Party Event */}
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-2xl">🏊‍♀️</div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">Pool Party</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Social</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Join us for food, music, and fun by the pool!</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Saturday, Dec 28</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>2:00 PM - 6:00 PM</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Pool Deck</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-sm text-gray-600 mb-2">24 attending</div>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors">
              Going ✓
            </button>
          </div>
        </div>

        {/* Yoga Class Event */}
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-2xl">🧘‍♀️</div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">Morning Yoga</h3>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Fitness</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Start your day with peaceful yoga by the rooftop garden</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Monday, Dec 30</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>7:00 AM - 8:00 AM</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Rooftop</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-sm text-gray-600 mb-2">8 attending</div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
              RSVP
            </button>
          </div>
        </div>

        {/* Game Night Event */}
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-2xl">🎮</div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">Game Night</h3>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">Social</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Board games, video games, and snacks in the community lounge</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Wednesday, Jan 1</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>7:00 PM - 10:00 PM</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Community Lounge</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-sm text-gray-600 mb-2">12 attending</div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
              RSVP
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Monthly Calendar Preview */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">December 2024</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {/* Calendar Days */}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`p-3 text-center text-sm rounded-lg transition-colors ${
              day === 28 || day === 30 || day === 1
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 cursor-pointer hover:bg-blue-100'
                : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            {day}
            {day === 28 && <div className="text-xs text-blue-600 mt-1">Pool</div>}
            {day === 30 && <div className="text-xs text-purple-600 mt-1">Yoga</div>}
            {day === 1 && <div className="text-xs text-orange-600 mt-1">Games</div>}
          </div>
        ))}
      </div>
    </div>

    {/* Past Events */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h2>
      <div className="space-y-3">
        <div className="flex items-center space-x-4 p-3 border border-gray-100 rounded-lg opacity-75">
          <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-gray-600 text-lg">🍖</div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Community BBQ</h3>
            <p className="text-sm text-gray-500">Dec 21 • 32 attended</p>
          </div>
          <span className="text-xs text-gray-400">Completed</span>
        </div>
        
        <div className="flex items-center space-x-4 p-3 border border-gray-100 rounded-lg opacity-75">
          <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-gray-600 text-lg">🎄</div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Holiday Party</h3>
            <p className="text-sm text-gray-500">Dec 15 • 45 attended</p>
          </div>
          <span className="text-xs text-gray-400">Completed</span>
        </div>
      </div>
    </div>
  </div>
)}

{activeTab === 'neighbors' && (
  <div className="space-y-6">
    {/* Neighbors Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Neighbors</h1>
          <p className="text-gray-600">Connect with your community</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Privacy Settings</span>
          </button>
        </div>
      </div>
      
      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Friend Requests ({friendRequests.length})</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MR</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Mike Rodriguez</h4>
                  <p className="text-sm text-gray-600">Wants to connect</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Accept
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {['All Neighbors', 'Friends', 'New Residents', 'Active'].map((filter) => (
          <button
            key={filter}
            onClick={() => setNeighborFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              neighborFilter === filter
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>

    {/* Neighbors Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Friend - Sarah (Unit Visible) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold">SM</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Sarah Martinez</h3>
              <p className="text-sm text-gray-600">Unit 2B</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs text-green-600">Friends</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Dog lover, yoga enthusiast. Always happy to help neighbors!</p>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedNeighbor({
                name: 'Sarah Martinez',
                unit: 'Unit 2B',
                bio: 'Dog lover, yoga enthusiast. Always happy to help neighbors!',
                isFriend: true,
                avatar: 'SM'
              });
              setShowNeighborProfile(true);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            View Profile
          </button>
          <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Message
          </button>
        </div>
      </div>

      {/* Friend - Jessica (Unit Visible) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JM</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Jessica Martinez</h3>
              <p className="text-sm text-gray-600">Unit 4B</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs text-green-600">Friends</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Moving soon. Selling furniture and looking for new friendships!</p>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedNeighbor({
                name: 'Jessica Martinez',
                unit: 'Unit 4B',
                bio: 'Moving soon. Selling furniture and looking for new friendships!',
                isFriend: true,
                avatar: 'JM'
              });
              setShowNeighborProfile(true);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            View Profile
          </button>
          <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Message
          </button>
        </div>
      </div>

      {/* Not Friend - Mike (Unit Hidden) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">MR</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mike Rodriguez</h3>
              <p className="text-sm text-gray-500">Unit Hidden</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span className="text-xs text-yellow-600">Pending</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Pizza enthusiast and friendly neighbor. Just moved in!</p>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedNeighbor({
                name: 'Mike Rodriguez',
                unit: 'Unit Hidden',
                bio: 'Pizza enthusiast and friendly neighbor. Just moved in!',
                isFriend: false,
                avatar: 'MR'
              });
              setShowNeighborProfile(true);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            View Profile
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Friend Request Sent
          </button>
        </div>
      </div>

      {/* Not Friend - Lisa (Unit Hidden) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">LB</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Lisa Brown</h3>
              <p className="text-sm text-gray-500">Unit Hidden</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-xs text-blue-600">New</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Coffee lover seeking local recommendations. New to the area!</p>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedNeighbor({
                name: 'Lisa Brown',
                unit: 'Unit Hidden',
                bio: 'Coffee lover seeking local recommendations. New to the area!',
                isFriend: false,
                avatar: 'LB'
              });
              setShowNeighborProfile(true);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            View Profile
          </button>
          <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
            Send Request
          </button>
        </div>
      </div>

      {/* Private Profile - Tom */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow opacity-75">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Private Profile</h3>
              <p className="text-sm text-gray-500">Unit Hidden</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
            <span className="text-xs text-gray-600">Private</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 italic">This neighbor has chosen to keep their profile private.</p>
        
        <div className="flex items-center justify-between">
          <button className="px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed" disabled>
            Profile Hidden
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed" disabled>
            Unavailable
          </button>
        </div>
      </div>

      {/* Current User (You) */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-blue-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">S</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Sarah Johnson (You)</h3>
              <p className="text-sm text-gray-600">Unit 3B</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs text-green-600">Online</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Your profile is currently public. You have 2 friends.</p>
        
        <div className="flex items-center justify-between">
          <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
            Edit Profile
          </button>
          <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Privacy Settings
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{activeTab === 'groups' && (
  <div className="space-y-6">
    {/* Groups Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Groups</h1>
          <p className="text-gray-600">Connect with neighbors who share your interests</p>
        </div>
        <button 
          onClick={() => setShowCreateGroupModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>
      
      {/* My Groups Summary */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Users className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">My Groups ({myGroups.length})</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-medium border border-purple-200">
            📚 Book Club
          </span>
          <span className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-medium border border-purple-200">
            🐕 Dog Owners
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {['All Groups', 'My Groups', 'Popular', 'New Groups', 'Activities', 'Committees'].map((filter) => (
          <button
            key={filter}
            onClick={() => setGroupFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              groupFilter === filter
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>

    {/* Groups Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Book Club - Member */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-purple-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">📚</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Book Club</h3>
              <p className="text-sm text-gray-600">12 members</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
            Member
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Monthly discussions of bestsellers and classics. Currently reading "The Seven Husbands of Evelyn Hugo"</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Next: Thu 7 PM • Community Lounge</span>
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedGroup({
                name: 'Book Club',
                members: 12,
                description: 'Monthly discussions of bestsellers and classics. Currently reading "The Seven Husbands of Evelyn Hugo"',
                isMember: true,
                isPrivate: false,
                emoji: '📚'
              });
              setShowGroupDetails(true);
            }}
            className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
          >
            View Group
          </button>
          <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
            Leave
          </button>
        </div>
      </div>

      {/* Dog Owners - Member */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-purple-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🐕</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Dog Owners</h3>
              <p className="text-sm text-gray-600">18 members</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
            Member
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Share tips, organize playdates, and help each other with pet care. Dog park meetups every weekend!</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Next meetup: Sat 10 AM • Nearby Park</span>
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedGroup({
                name: 'Dog Owners',
                members: 18,
                description: 'Share tips, organize playdates, and help each other with pet care. Dog park meetups every weekend!',
                isMember: true,
                isPrivate: false,
                emoji: '🐕'
              });
              setShowGroupDetails(true);
            }}
            className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
          >
            View Group
          </button>
          <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
            Leave
          </button>
        </div>
      </div>

      {/* Fitness Group - Not Member */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">💪</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Fitness Group</h3>
              <p className="text-sm text-gray-600">24 members</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Popular
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Morning workouts, running partners, and fitness challenges. All levels welcome!</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span>Daily: 6 AM • Fitness Center</span>
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedGroup({
                name: 'Fitness Group',
                members: 24,
                description: 'Morning workouts, running partners, and fitness challenges. All levels welcome!',
                isMember: false,
                isPrivate: false,
                emoji: '💪'
              });
              setShowGroupDetails(true);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            View Group
          </button>
          <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Join Group
          </button>
        </div>
      </div>

      {/* Cooking Club - Not Member */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👨‍🍳</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Cooking Club</h3>
              <p className="text-sm text-gray-600">15 members</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            New
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Share recipes, host potlucks, and learn new cuisines together. Monthly themed dinners!</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Next: Fri 6 PM • Community Kitchen</span>
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedGroup({
                name: 'Cooking Club',
                members: 15,
                description: 'Share recipes, host potlucks, and learn new cuisines together. Monthly themed dinners!',
                isMember: false,
                isPrivate: false,
                emoji: '👨‍🍳'
              });
              setShowGroupDetails(true);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            View Group
          </button>
          <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Join Group
          </button>
        </div>
      </div>

      {/* Safety Committee - Private */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Safety Committee</h3>
              <p className="text-sm text-gray-600">8 members</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            Private
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Building safety initiatives and emergency preparedness. Invitation only.</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Shield className="w-4 h-4 mr-1" />
          <span>Monthly meetings • Private</span>
        </div>
        
        <div className="flex items-center justify-between">
          <button className="px-3 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed" disabled>
            Private Group
          </button>
          <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
            Request Join
          </button>
        </div>
      </div>

      {/* Game Night - Not Member */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🎮</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Game Night</h3>
              <p className="text-sm text-gray-600">21 members</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            Active
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Board games, card games, and video games every Wednesday. Snacks provided!</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Every Wed 7 PM • Community Lounge</span>
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              setSelectedGroup({
                name: 'Game Night',
                members: 21,
                description: 'Board games, card games, and video games every Wednesday. Snacks provided!',
                isMember: false,
                isPrivate: false,
                emoji: '🎮'
              });
              setShowGroupDetails(true);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            View Group
          </button>
          <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
            Join Group
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{activeTab === 'amenities' && (
  <div className="space-y-6">
    {/* Amenities Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Amenity Booking</h1>
          <p className="text-gray-600">Reserve community spaces and facilities</p>
        </div>
        <button 
          onClick={() => setShowBookingModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Quick Book</span>
        </button>
      </div>
      
      {/* My Bookings Summary */}
      {myBookings.length > 0 && (
        <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            <h3 className="font-semibold text-teal-900">My Upcoming Bookings ({myBookings.length})</h3>
          </div>
          <div className="space-y-2">
            {myBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{booking.amenity}</p>
                  <p className="text-sm text-gray-600">{booking.date} • {booking.time}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Amenities Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {amenities.map(amenity => (
    <div key={amenity.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={amenity.image} 
          alt={amenity.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{amenity.name}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            amenity.status === 'Available' ? 'bg-green-100 text-green-800' :
            amenity.status === 'Popular' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {amenity.status}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>Hours: {amenity.hours}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{amenity.maxPeople}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            {amenity.status === 'Maintenance' ? (
              <AlertTriangle className="w-4 h-4 mr-2" />
            ) : (
              <Calendar className="w-4 h-4 mr-2" />
            )}
            <span>{amenity.timeSlots}</span>
          </div>
        </div>
        
        <button 
          onClick={() => {
            if (amenity.status !== 'Maintenance') {
              setSelectedAmenity(amenity.name.toLowerCase().replace(' ', ''));
              setShowBookingModal(true);
            }
          }}
          className={`w-full px-4 py-2 text-white rounded-lg font-medium transition-colors ${amenity.buttonColor}`}
          disabled={amenity.status === 'Maintenance'}
        >
          {amenity.buttonText}
        </button>
      </div>
    </div>
  ))}
</div>

    {/* Booking Rules */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Guidelines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Advanced Booking</p>
              <p className="text-sm text-gray-600">Reserve up to 7 days in advance</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Cancellation Policy</p>
              <p className="text-sm text-gray-600">Cancel up to 2 hours before your booking</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Guest Policy</p>
                <p className="text-sm text-gray-600">Residents are responsible for their guests</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Clean Up Required</p>
                <p className="text-sm text-gray-600">Leave spaces clean for the next resident</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Noise Policy</p>
                <p className="text-sm text-gray-600">Respect quiet hours: 10 PM - 8 AM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Equipment Care</p>
                <p className="text-sm text-gray-600">Report any damage or maintenance issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)}

{activeTab === 'messages' && (
  <div className="space-y-6">
    {/* Messages Header */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Stay connected with your community</p>
        </div>
        <button 
          onClick={() => setShowNewMessageModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Message</span>
        </button>
      </div>
      
      {/* Search */}
      <div className="mt-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text"
          placeholder="Search conversations..."
          value={messageSearch}
          onChange={(e) => setMessageSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversations List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Conversations</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {conversations
              .filter(conv => 
                messageSearch === '' || 
                conv.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
                conv.lastMessage.toLowerCase().includes(messageSearch.toLowerCase())
              )
              .map((conversation) => (
              <div 
                key={conversation.id}
                onClick={() => setActiveConversation(conversation)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  activeConversation?.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      conversation.avatar === 'SM' ? 'bg-gray-300' :
                      conversation.avatar === 'MR' ? 'bg-purple-500' :
                      conversation.avatar === 'CT' ? 'bg-blue-600' :
                      conversation.type === 'group' ? 'bg-purple-500' : 'bg-gray-400'
                    }`}>
                      <span className={`font-semibold text-sm ${
                        conversation.avatar === 'SM' ? 'text-gray-600' : 
                        conversation.type === 'group' ? 'text-white text-lg' : 'text-white'
                      }`}>
                        {conversation.type === 'group' ? conversation.avatar : conversation.avatar}
                      </span>
                    </div>
                    {conversation.online && conversation.type === 'direct' && (
                      <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                      <div className="flex items-center space-x-2">
                        {conversation.unread > 0 && (
                          <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                    {conversation.type === 'announcement' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                        📢 Announcement
                      </span>
                    )}
                    {conversation.type === 'group' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                        👥 Group Chat
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Conversation */}
      <div className="lg:col-span-2">
        {activeConversation ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex flex-col">
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeConversation.avatar === 'SM' ? 'bg-gray-300' :
                    activeConversation.avatar === 'MR' ? 'bg-purple-500' :
                    activeConversation.avatar === 'CT' ? 'bg-blue-600' :
                    activeConversation.type === 'group' ? 'bg-purple-500' : 'bg-gray-400'
                  }`}>
                    <span className={`font-semibold text-sm ${
                      activeConversation.avatar === 'SM' ? 'text-gray-600' : 
                      activeConversation.type === 'group' ? 'text-white text-lg' : 'text-white'
                    }`}>
                      {activeConversation.type === 'group' ? activeConversation.avatar : activeConversation.avatar}
                    </span>
                  </div>
                  {activeConversation.online && activeConversation.type === 'direct' && (
                    <div className="absolute -bottom-0 -right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{activeConversation.name}</h4>
                  {activeConversation.online && activeConversation.type === 'direct' && (
                    <p className="text-xs text-green-600">Online</p>
                  )}
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* Sample Messages */}
              <div className="flex space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeConversation.avatar === 'SM' ? 'bg-gray-300' :
                  activeConversation.avatar === 'MR' ? 'bg-purple-500' :
                  activeConversation.avatar === 'CT' ? 'bg-blue-600' : 'bg-gray-400'
                }`}>
                  <span className={`font-semibold text-xs ${
                    activeConversation.avatar === 'SM' ? 'text-gray-600' : 'text-white'
                  }`}>
                    {activeConversation.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                    <p className="text-sm text-gray-900">{activeConversation.lastMessage}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{activeConversation.timestamp}</p>
                </div>
              </div>

              <div className="flex space-x-3 justify-end">
                <div className="flex-1"></div>
                <div>
                  <div className="bg-blue-500 rounded-lg px-3 py-2 max-w-xs">
                    <p className="text-sm text-white">
                      {activeConversation.type === 'direct' && activeConversation.name === 'Sarah Martinez' && "You're welcome! Let me know how it goes 😊"}
                      {activeConversation.type === 'direct' && activeConversation.name === 'Mike Rodriguez' && "Yes! Looking forward to it 🏊‍♀️"}
                      {activeConversation.type === 'group' && "I loved the character development!"}
                      {activeConversation.type === 'announcement' && "Thanks for the heads up!"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">Just now</p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      setNewMessage('');
                    }
                  }}
                />
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

{activeTab !== 'home' && activeTab !== 'marketplace' && activeTab !== 'feed' && activeTab !== 'events' && activeTab !== 'neighbors' && activeTab !== 'groups' && activeTab !== 'amenities' && activeTab !== 'messages' && (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
    <div className="text-gray-400 mb-4">
      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
        <Clock className="w-8 h-8" />
      </div>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
    <p className="text-gray-600">This feature is currently in development.</p>
  </div>
)}

              </div>
            </div>
          </div>
          {/* Share Photo Modal */}
        {showSharePhotoModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowSharePhotoModal(false)}>
            <div 
                className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto"
                onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Share Photo</h3>
                <button 
                  onClick={() => setShowSharePhotoModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Choose File
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                  <textarea 
                    placeholder="What's happening in your community?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows="3"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowSharePhotoModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors">
                    Share Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Event Modal */}
        {showCreateEventModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowCreateEventModal(false)}>
            <div 
              className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create Event</h3>
                <button 
                  onClick={() => setShowCreateEventModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input 
                    type="text"
                    placeholder="Pool Party, Yoga Class, Game Night..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input 
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input 
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select location...</option>
                    <option value="pool">Pool Deck</option>
                    <option value="rooftop">Rooftop</option>
                    <option value="lounge">Community Lounge</option>
                    <option value="gym">Fitness Center</option>
                    <option value="courtyard">Courtyard</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Tell your neighbors about this event..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees (Optional)</label>
                  <input 
                    type="number"
                    placeholder="Leave blank for unlimited"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowCreateEventModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Issue Modal */}
        {showReportIssueModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowReportIssueModal(false)}>
            <div 
              className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Report Issue</h3>
                <button 
                  onClick={() => setShowReportIssueModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select issue type...</option>
                    <option value="maintenance">Maintenance Request</option>
                    <option value="noise">Noise Complaint</option>
                    <option value="amenity">Broken Amenity</option>
                    <option value="safety">Safety Concern</option>
                    <option value="parking">Parking Issue</option>
                    <option value="plumbing">Plumbing Problem</option>
                    <option value="electrical">Electrical Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="low">Low - Can wait a few days</option>
                    <option value="medium">Medium - Should be addressed soon</option>
                    <option value="high">High - Needs immediate attention</option>
                    <option value="emergency">Emergency - Urgent safety issue</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    type="text"
                    placeholder="Unit 3B, Pool Area, Lobby, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Please describe the issue in detail..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    rows="4"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Best Time to Contact</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="anytime">Anytime</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                    <option value="weekend">Weekends only</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowReportIssueModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sell Item Modal */}
        {showSellItemModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowSellItemModal(false)}>
            <div 
              className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Sell Item</h3>
                <button 
                  onClick={() => setShowSellItemModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input 
                    type="text"
                    placeholder="Dining Table, Couch, Bike, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option value="">Select category...</option>
                      <option value="furniture">Furniture</option>
                      <option value="electronics">Electronics</option>
                      <option value="appliances">Appliances</option>
                      <option value="books">Books</option>
                      <option value="clothing">Clothing</option>
                      <option value="sports">Sports & Recreation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input 
                      type="number"
                      placeholder="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="new">Brand New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good Condition</option>
                    <option value="fair">Fair Condition</option>
                    <option value="poor">Needs Work</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Describe your item, its condition, and any details..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                    rows="3"
                  />
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Add photos (optional)</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                    Choose Photos
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Preference</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="message">Message through app</option>
                    <option value="email">Email me directly</option>
                    <option value="phone">Phone call preferred</option>
                    <option value="knock">Just knock on my door</option>
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowSellItemModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Post Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowPostComposer(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {composerType === 'photo' && '📸 Share Photo'}
                  {composerType === 'event' && '📅 Create Event'}
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
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-2">Drop photos here or click to upload</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Choose Photos
                      </button>
                    </div>
                    <textarea
                      placeholder="What's happening in your community?"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Share Photo
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
        {/* Neighbor Profile Modal */}
        {showNeighborProfile && selectedNeighbor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowNeighborProfile(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Neighbor Profile</h3>
                <button
                  onClick={() => setShowNeighborProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedNeighbor.avatar === 'SM' ? 'bg-gray-300' :
                    selectedNeighbor.avatar === 'JM' ? 'bg-orange-500' :
                    selectedNeighbor.avatar === 'MR' ? 'bg-purple-500' :
                    selectedNeighbor.avatar === 'LB' ? 'bg-pink-500' : 'bg-gray-400'
                  }`}>
                    <span className={`font-semibold text-xl ${
                      selectedNeighbor.avatar === 'SM' ? 'text-gray-600' : 'text-white'
                    }`}>
                      {selectedNeighbor.avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedNeighbor.name}</h4>
                    <p className="text-gray-600">{selectedNeighbor.unit}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${
                        selectedNeighbor.isFriend ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                      <span className={`text-xs ${
                        selectedNeighbor.isFriend ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {selectedNeighbor.isFriend ? 'Friends' : 'Not Connected'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-2">About</h5>
                  <p className="text-gray-600">{selectedNeighbor.bio}</p>
                </div>
                
                {selectedNeighbor.isFriend && (
                  <div className="mb-6">
                    <h5 className="font-medium text-gray-900 mb-3">Contact Options</h5>
                    <div className="space-y-2">
                      <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>Send Message</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                        <Phone className="w-5 h-5" />
                        <span>Request Phone Number</span>
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  {selectedNeighbor.isFriend ? (
                    <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors">
                      ✓ Friends
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Send Friend Request
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setShowNeighborProfile(false);
                      setShowReportModal(true);
                    }}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                  >
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Neighbor Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowReportModal(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-red-700">Report Neighbor</h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">Safety First</h4>
                  </div>
                  <p className="text-sm text-red-700">
                    Reports are taken seriously and will be reviewed by management. Please only report genuine safety concerns or policy violations.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Report</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select reason...</option>
                    <option value="harassment">Harassment or Inappropriate Behavior</option>
                    <option value="threats">Threats or Intimidation</option>
                    <option value="noise">Excessive Noise Complaints</option>
                    <option value="safety">Safety Concerns</option>
                    <option value="spam">Spam or Inappropriate Content</option>
                    <option value="violation">Community Policy Violation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                  <textarea 
                    placeholder="Please provide specific details about the incident..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                    rows="4"
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Your Privacy</h5>
                      <p className="text-sm text-gray-600">
                        Your report will be handled confidentially by management. The reported neighbor will not know who submitted the report.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input type="checkbox" id="block-neighbor" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  <label htmlFor="block-neighbor" className="text-sm text-gray-700">
                    Also block this neighbor from contacting me
                  </label>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Group Details Modal */}
        {showGroupDetails && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowGroupDetails(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Group Details</h3>
                <button
                  onClick={() => setShowGroupDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl">{selectedGroup.emoji}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedGroup.name}</h4>
                    <p className="text-gray-600">{selectedGroup.members} members</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${
                        selectedGroup.isMember ? 'bg-purple-500' : 'bg-gray-400'
                      }`}></span>
                      <span className={`text-xs ${
                        selectedGroup.isMember ? 'text-purple-600' : 'text-gray-600'
                      }`}>
                        {selectedGroup.isMember ? 'Member' : 'Not a Member'}
                      </span>
                      {selectedGroup.isPrivate && (
                        <>
                          <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                          <span className="text-xs text-gray-600">Private Group</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-2">About This Group</h5>
                  <p className="text-gray-600">{selectedGroup.description}</p>
                </div>
                
                {selectedGroup.isMember && (
                  <div className="mb-6">
                    <h5 className="font-medium text-gray-900 mb-3">Member Benefits</h5>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">Access to group chat</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg">
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm">Event notifications</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg">
                        <Users className="w-5 h-5" />
                        <span className="text-sm">Meet other members</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Recent Activity</h5>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs">SM</span>
                      </div>
                      <div>
                        <p className="text-gray-900">Sarah shared a new post</p>
                        <p className="text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">MR</span>
                      </div>
                      <div>
                        <p className="text-gray-900">Mike joined the group</p>
                        <p className="text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {selectedGroup.isMember ? (
                    <>
                      <button className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                        Open Group Chat
                      </button>
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
                        Leave Group
                      </button>
                    </>
                  ) : selectedGroup.isPrivate ? (
                    <>
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed" disabled>
                        Private Group
                      </button>
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                        Request to Join
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      Join Group
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Group Modal */}
        {showCreateGroupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowCreateGroupModal(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-purple-700">Create New Group</h3>
                <button
                  onClick={() => setShowCreateGroupModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Build Community</h4>
                  </div>
                  <p className="text-sm text-purple-700">
                    Create a group to connect neighbors with shared interests and organize activities together.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                  <input 
                    type="text"
                    placeholder="Walking Club, Book Lovers, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option value="">Select group type...</option>
                    <option value="social">Social & Entertainment</option>
                    <option value="fitness">Fitness & Wellness</option>
                    <option value="hobbies">Hobbies & Interests</option>
                    <option value="professional">Professional & Networking</option>
                    <option value="family">Family & Kids</option>
                    <option value="volunteer">Volunteer & Community Service</option>
                    <option value="committee">Building Committee</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Describe your group's purpose, activities, and what members can expect..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Every 2 weeks</option>
                    <option value="monthly">Monthly</option>
                    <option value="asneeded">As needed</option>
                    <option value="irregular">Irregular schedule</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Setting</label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="privacy" value="public" className="text-purple-600 focus:ring-purple-500" defaultChecked />
                      <div>
                        <p className="font-medium text-gray-900">Public Group</p>
                        <p className="text-sm text-gray-600">Anyone in the community can join</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="privacy" value="private" className="text-purple-600 focus:ring-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900">Private Group</p>
                        <p className="text-sm text-gray-600">Members must be approved to join</p>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Icon</label>
                  <div className="grid grid-cols-6 gap-2">
                    {['📚', '🏃‍♀️', '🎮', '🍳', '🎨', '🎵', '🐕', '🌱', '💪', '🍷', '⚽', '🧘‍♀️'].map((emoji) => (
                      <button
                        key={emoji}
                        className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-lg flex items-center justify-center text-lg transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowCreateGroupModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                    Create Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Amenity Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowBookingModal(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-teal-700">Book Amenity</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <h4 className="font-semibold text-teal-800">Reserve Your Spot</h4>
                  </div>
                  <p className="text-sm text-teal-700">
                    Book community amenities up to 7 days in advance. All bookings require confirmation.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Amenity</label>
                  <select 
                    value={selectedAmenity}
                    onChange={(e) => setSelectedAmenity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="pool">🏊‍♀️ Pool Deck</option>
                    <option value="fitness">💪 Fitness Center</option>
                    <option value="rooftop">🌆 Rooftop Terrace</option>
                    <option value="lounge">🛋️ Community Lounge</option>
                    <option value="business">💼 Business Center</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                    <select 
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Select time...</option>
                      <option value="6:00 AM - 8:00 AM">6:00 AM - 8:00 AM</option>
                      <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</option>
                      <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                      <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                      <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
                      <option value="8:00 PM - 10:00 PM">8:00 PM - 10:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="1">Just me</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                    <option value="6">6+ people</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purpose (Optional)</label>
                  <textarea 
                    placeholder="Birthday party, workout session, business meeting, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                    rows="2"
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Booking Summary</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amenity:</span>
                      <span className="text-gray-900">
                        {selectedAmenity === 'pool' && '🏊‍♀️ Pool Deck'}
                        {selectedAmenity === 'fitness' && '💪 Fitness Center'}
                        {selectedAmenity === 'rooftop' && '🌆 Rooftop Terrace'}
                        {selectedAmenity === 'lounge' && '🛋️ Community Lounge'}
                        {selectedAmenity === 'business' && '💼 Business Center'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="text-gray-900">{selectedDate || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="text-gray-900">{selectedTime || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900">Booking Fee:</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Cancellation Policy</p>
                      <p className="text-xs text-yellow-700">
                        Cancel up to 2 hours before your booking time to avoid penalties.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedDate && selectedTime 
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Message Modal */}
        {showNewMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowNewMessageModal(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto mx-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-700">New Message</h3>
                <button
                  onClick={() => setShowNewMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Start a Conversation</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Send a message to a neighbor or create a group conversation.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="direct">Direct Message</option>
                    <option value="group">Group Message</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select recipient...</option>
                    <option value="sarah_m">Sarah Martinez (Unit 2B)</option>
                    <option value="jessica_m">Jessica Martinez (Unit 4B)</option>
                    <option value="mike_r">Mike Rodriguez</option>
                    <option value="lisa_b">Lisa Brown</option>
                    <option value="book_club">📚 Book Club</option>
                    <option value="dog_owners">🐕 Dog Owners</option>
                    <option value="fitness_group">💪 Fitness Group</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject (Optional)</label>
                  <input 
                    type="text"
                    placeholder="What's this message about?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    placeholder="Type your message here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows="4"
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Safe Messaging</h5>
                      <p className="text-sm text-gray-600">
                        All messages are monitored for community safety. Be respectful and follow community guidelines.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => setShowNewMessageModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
            <div className="flex justify-around">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-xs mt-1">Home</span>
              </button>
              
              <button
                onClick={() => setActiveTab('feed')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'feed' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="text-xs mt-1">Feed</span>
              </button>
              
              <button
                onClick={() => setActiveTab('neighbors')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'neighbors' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="text-xs mt-1">Neighbors</span>
              </button>
              
              <button
                onClick={() => setActiveTab('events')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'events' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="text-xs mt-1">Events</span>
              </button>
              
              <button
                onClick={() => setActiveTab('create')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'create' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Plus className="w-5 h-5" />
                <span className="text-xs mt-1">Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentPlatform;

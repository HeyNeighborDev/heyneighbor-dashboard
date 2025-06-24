import React, { useState } from 'react';
import { 
  Home, Heart, MessageCircle, Users, Calendar, Building, 
  ShoppingBag, Phone, AlertTriangle, Bell, Search, Plus,
  MapPin, Clock, Camera, Zap, Coffee, Dumbbell, Waves,
  Car, Package, Shield, Star, TrendingUp, UserPlus, Menu,
  X, Settings, LogOut, Edit, Share2, Bookmark, Filter
} from 'lucide-react';

const ResidentPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  const [quickActions, setQuickActions] = useState([
    { id: 1, icon: Camera, label: 'Share Photo', color: 'bg-pink-500', action: () => console.log('Camera opened') },
    { id: 2, icon: Calendar, label: 'Create Event', color: 'bg-blue-500', action: () => console.log('Event creator opened') },
    { id: 3, icon: AlertTriangle, label: 'Report Issue', color: 'bg-red-500', action: () => console.log('Report form opened') },
    { id: 4, icon: Package, label: 'Sell Item', color: 'bg-green-500', action: () => console.log('Marketplace opened') }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: 'Pool Party', time: 'Today 2:00 PM', attendees: 24, going: true, location: 'Pool Deck' },
    { id: 2, title: 'Yoga Class', time: 'Tomorrow 7:00 AM', attendees: 12, going: false, location: 'Rooftop' },
    { id: 3, title: 'Game Night', time: 'Friday 7:00 PM', attendees: 8, going: false, location: 'Lounge' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'Mike Rodriguez', unit: '4B', action: 'shared a photo from the BBQ', time: '2h ago', avatar: 'MR' },
    { id: 2, user: 'Lisa Chen', unit: '2A', action: 'created Yoga Group', time: '4h ago', avatar: 'LC' },
    { id: 3, user: 'Community Team', unit: 'Management', action: 'posted about maintenance', time: '6h ago', avatar: 'CT' },
    { id: 4, user: 'Alex Johnson', unit: '1C', action: 'is selling a dining table', time: '8h ago', avatar: 'AJ' }
  ]);

  const [amenityStatus, setAmenityStatus] = useState([
    { name: 'Pool', status: 'available', icon: Waves, color: 'text-blue-500', nextAvailable: null },
    { name: 'Gym', status: 'busy', icon: Dumbbell, color: 'text-orange-500', nextAvailable: '3:00 PM' },
    { name: 'Lounge', status: 'available', icon: Coffee, color: 'text-green-500', nextAvailable: null },
    { name: 'Parking', status: 'full', icon: Car, color: 'text-red-500', nextAvailable: '8:00 AM' }
  ]);

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', page: 'home' },
    { id: 'feed', icon: MessageCircle, label: 'Feed', page: 'feed' },
    { id: 'neighbors', icon: Users, label: 'Neighbors', page: 'neighbors' },
    { id: 'events', icon: Calendar, label: 'Events', page: 'events' },
    { id: 'groups', icon: Building, label: 'Groups', page: 'groups' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace', page: 'marketplace' },
    { id: 'amenities', icon: Dumbbell, label: 'Amenities', page: 'amenities' },
    { id: 'messages', icon: Phone, label: 'Messages', page: 'messages' }
  ];

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setShowMobileMenu(false);
  };

  const toggleEventAttendance = (eventId) => {
    setUpcomingEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, going: !event.going, attendees: event.going ? event.attendees - 1 : event.attendees + 1 }
          : event
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-lg border-r fixed h-full overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Sarah Johnson</h2>
              <p className="text-sm text-gray-600">Unit 3B</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.page)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.page
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">HeyNeighbor</h1>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">S</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Good morning, Sarah! 👋</h1>
                <p className="text-gray-600">Ready to connect with your community?</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Greeting */}
        <div className="lg:hidden bg-white border-l-4 border-blue-500 shadow-sm mx-4 mt-4 px-4 py-6 rounded-r-lg">
          <h2 className="text-xl font-bold text-gray-900">Good morning, Sarah! 👋</h2>
          <p className="text-gray-600 mt-1">Ready to connect with your community?</p>
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Quick Actions - More Prominent on Mobile */}
            <div className="bg-white rounded-xl shadow-sm border mb-6">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="flex flex-col items-center p-4 lg:p-6 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                    >
                      <div className={`w-14 h-14 lg:w-16 lg:h-16 ${action.color} rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
                        <action.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <span className="text-sm lg:text-base font-medium text-gray-700 text-center">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Recent Community Activity */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Community Buzz</h2>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">
                              {activity.avatar}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800">
                              <span className="font-medium">{activity.user}</span>
                              <span className="text-gray-500 ml-1">({activity.unit})</span>
                              <span className="ml-1">{activity.action}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        View Calendar
                      </button>
                    </div>
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                <p className="text-sm text-gray-600">{event.time}</p>
                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {event.location}
                                </p>
                              </div>
                            </div>
                            <button 
                              onClick={() => toggleEventAttendance(event.id)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                                event.going 
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              }`}
                            >
                              {event.going ? 'Going ✓' : 'Join'}
                            </button>
                          </div>
                          <p className="text-xs text-gray-600">{event.attendees} people going</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Amenity Status */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-4 lg:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenity Status</h2>
                    <div className="space-y-3">
                      {amenityStatus.map((amenity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <amenity.icon className={`w-5 h-5 ${amenity.color}`} />
                            <div>
                              <span className="font-medium text-gray-700 block">{amenity.name}</span>
                              {amenity.nextAvailable && (
                                <span className="text-xs text-gray-500">Next: {amenity.nextAvailable}</span>
                              )}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            amenity.status === 'available' 
                              ? 'bg-green-100 text-green-700'
                              : amenity.status === 'busy'
                              ? 'bg-orange-100 text-orange-700'  
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {amenity.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors active:scale-95">
                      Book Amenity
                    </button>
                  </div>
                </div>

                {/* Community Stats */}
                <div className="bg-white rounded-xl shadow-sm border">
                  <div className="p-4 lg:p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                      {[
                        { icon: Users, label: 'Active Neighbors', value: '127', color: 'text-blue-600' },
                        { icon: Calendar, label: 'Events This Month', value: '8', color: 'text-green-600' },
                        { icon: Building, label: 'Active Groups', value: '12', color: 'text-purple-600' },
                        { icon: ShoppingBag, label: 'Marketplace Items', value: '23', color: 'text-orange-600' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center lg:text-left">
                          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            <span className="text-sm text-gray-700">{stat.label}</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weather Widget */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-200">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold text-gray-900">Today's Weather</h2>
                      <span className="text-3xl">☀️</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-gray-900">75°F</p>
                      <p className="text-gray-600">Perfect for pool time!</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>Sunrise Apartments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'feed', icon: MessageCircle, label: 'Feed' },
            { id: 'neighbors', icon: Users, label: 'Neighbors' },
            { id: 'events', icon: Calendar, label: 'Events' },
            { id: 'create', icon: Plus, label: 'Create' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex flex-col items-center p-2 min-w-0 ${
                currentPage === item.id ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1 truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Sarah Johnson</h2>
                    <p className="text-sm text-gray-600">Unit 3B</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <nav className="p-4 flex-1 overflow-y-auto">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.page)}
                  className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-medium text-lg">{item.label}</span>
                </button>
              ))}
              
              <div className="border-t mt-6 pt-6">
                <button className="w-full flex items-center space-x-3 px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Settings className="w-6 h-6" />
                  <span className="text-lg">Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-4 text-red-600 hover:bg-red-50 rounded-lg">
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentPlatform;
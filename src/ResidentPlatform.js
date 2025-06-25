import React, { useState } from 'react';
import { 
  Home, Heart, MessageCircle, Users, Calendar, Building, 
  ShoppingBag, Phone, AlertTriangle, Bell, Search, Plus,
  MapPin, Clock, Camera, Zap, Coffee, Dumbbell, Waves,
  Car, Package, Shield, Star, TrendingUp, UserPlus, Menu,
  X, Settings, LogOut, Edit, Share2, Bookmark, Filter, ChevronLeft
} from 'lucide-react';

const ResidentPlatform = ({ onBackToManagement }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
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
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={onBackToManagement}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Back to Management Dashboard"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">HeyNeighbor</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
            <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
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
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          <div className="flex-1 relative overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                
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
                        <button className="flex flex-col items-center p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors">
                          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-2">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Share Photo</span>
                        </button>
                        
                        <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-2">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Create Event</span>
                        </button>
                        
                        <button className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-2">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Report Issue</span>
                        </button>
                        
                        <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
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

                {/* Other tab contents would go here */}
                {activeTab !== 'home' && (
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

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
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
                onClick={() => setActiveTab('messages')}
                className={`flex flex-col items-center py-2 px-3 ${
                  activeTab === 'messages' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs mt-1">Messages</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentPlatform;

import React, { useState, useEffect } from 'react';
import { ManagementDashboard } from '../App';
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';
import HeyNeighborLogo from '../Assets/heyneighbor-emblem-blues.svg';

const DemoLoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('heyneighbor-demo-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    // Demo credentials
    const validCredentials = {
      username: 'demo',
      password: 'heyneighbor2025'
    };

    // Simulate API call delay
    setTimeout(() => {
      if (credentials.username === validCredentials.username && 
          credentials.password === validCredentials.password) {
        localStorage.setItem('heyneighbor-demo-auth', 'authenticated');
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when typing
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && credentials.username && credentials.password && !isLoading) {
      handleLogin();
    }
  };

  // Mock dashboard component (simplified version of what they'd see)
  const DashboardDemo = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Mode Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-3 shadow-sm">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-medium">🎮 Demo Mode Active</span>
          <span className="text-purple-200">|</span>
          <button className="underline hover:text-purple-200 transition-colors">
            Request Real Demo
          </button>
        </div>
      </div>

      {/* Simplified Dashboard */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Good evening, Sarah! 👋</h1>
            <p className="text-gray-600">Here's what's happening at Sunset Gardens today</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                </div>
                <div className="text-green-500 text-sm">↗ +2.1%</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Confidence</p>
                  <p className="text-2xl font-bold text-gray-900">96%</p>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">At-Risk Residents</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="text-yellow-600 text-sm">⚠ Needs attention</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$847K</p>
                </div>
                <div className="text-green-500 text-sm">↗ +5.3%</div>
              </div>
            </div>
          </div>

          {/* Nora AI Panel */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold">Nora AI</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm opacity-75">Online</span>
                </div>
                <p className="text-purple-100 mb-3">
                  I've identified 3 residents who may need intervention to prevent churn. 
                  Sarah Chen in Unit 24B has declining engagement scores.
                </p>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Recommendations →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  <strong>Pool Party Event</strong> - 23 residents attended, 4.8/5 rating
                </span>
                <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  <strong>Maintenance Request</strong> - Unit 15A reported AC issue
                </span>
                <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  <strong>New Resident</strong> - Mike Johnson moved into Unit 8C
                </span>
                <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isAuthenticated) {
  return (
    <>
      {/* Demo Mode Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-3 shadow-sm">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-medium">🎮 Demo Mode Active</span>
          <span className="text-purple-200">|</span>
          <button className="underline hover:text-purple-200 transition-colors">
            Request Real Demo
          </button>
        </div>
      </div>
      
      {/* Your REAL dashboard */}
      <ManagementDashboard />
    </>
  );
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <img 
                src={HeyNeighborLogo} 
                alt="HeyNeighbor Logo" 
                className="w-full h-full object-contain"
                />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">HeyNeighbor Demo</h1>
            <p className="text-gray-600">Secure demo access for authorized users</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !credentials.username || !credentials.password}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Access Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:demo@useheyneighbor.com" className="text-purple-600 hover:underline">
                demo@useheyneighbor.com
              </a>
            </p>
          </div>
        </div>

        {/* Request Demo CTA */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            © 2025 HeyNeighbor. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoLoginPage;

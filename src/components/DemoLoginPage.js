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

  const EXPIRY_TIME_MS = 60 * 60 * 1000; // 60 minutes

  // Check if already authenticated and session is valid
  useEffect(() => {
    const authStatus = localStorage.getItem('heyneighbor-demo-auth');
    const timestamp = localStorage.getItem('heyneighbor-demo-auth-time');
    const now = Date.now();

    if (
      authStatus === 'authenticated' &&
      timestamp &&
      now - parseInt(timestamp, 10) < EXPIRY_TIME_MS
    ) {
      setIsAuthenticated(true);
    } else {
      if (authStatus === 'authenticated') {
        setError('Session expired. Please log in again.');
      }
      localStorage.removeItem('heyneighbor-demo-auth');
      localStorage.removeItem('heyneighbor-demo-auth-time');
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    const validCredentials = {
      username: 'demo',
      password: 'heyneighbor2025'
    };

    setTimeout(() => {
      if (
        credentials.username === validCredentials.username &&
        credentials.password === validCredentials.password
      ) {
        localStorage.setItem('heyneighbor-demo-auth', 'authenticated');
        localStorage.setItem('heyneighbor-demo-auth-time', Date.now().toString());
        setIsAuthenticated(true);
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && credentials.username && credentials.password && !isLoading) {
      handleLogin();
    }
  };

  if (isAuthenticated) {
    return (
      <>
        <ManagementDashboard />
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="absolute inset-0 bg-black/10"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <img src={HeyNeighborLogo} alt="HeyNeighbor Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">HeyNeighbor Demo</h1>
            <p className="text-gray-600">Secure demo access for authorized users</p>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:demo@useheyneighbor.com" className="text-purple-600 hover:underline">
                demo@useheyneighbor.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">© 2025 HeyNeighbor. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default DemoLoginPage;

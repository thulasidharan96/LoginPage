import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, removeUserData } from '../utils/storage';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    token: getUserData() || '',
    lastLogin: new Date().toLocaleString()
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = getUserData();
      if (!token) {
        navigate('/');
      }
    };

    checkAuth();
    const authInterval = setInterval(checkAuth, 5000);

    return () => clearInterval(authInterval);
  }, [navigate]);

  const handleLogout = () => {
    removeUserData();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Welcome User</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-600 mb-4">Profile Info</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Token: {userData.token.slice(0, 20)}...</p>
                <p className="text-gray-600">Last Login: {userData.lastLogin}</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-600 mb-4">Session Status</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-gray-600">Active Now</p>
                </div>
                <p className="text-gray-600">Session Started: {userData.lastLogin}</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Edit Profile
                </button>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  View Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
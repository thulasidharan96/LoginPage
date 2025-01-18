import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const DashboardPage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lastLogin = localStorage.getItem("LastLogin");
  const { token, user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("registerData");
    return storedUser ? JSON.parse(storedUser) : user;
  });

  const tokenData = token || localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      localStorage.setItem("registerData", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUserData(user);
    }
  }, [user, token]);

  useEffect(() => {
    const userAuth = localStorage.getItem("isLoggedIn");
    if (!userAuth) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleUserDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      handleLogout();
      localStorage.removeItem("registerData","lastLogin");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-extrabold text-gray-800">Dashboard</h1>
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow-lg rounded-lg p-3">
            <div className="flex justify-between items-start mb-6">
              {/* Profile Info */}
              <div className="flex items-center space-x-4">
                <img
                  src="https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex flex-col space-y-2">
                  <h5 className="text-xl font-bold text-gray-800">
                    Profile Info
                  </h5>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <p className="text-gray-600 font-bold">Username :</p>
                    <p className="font-bold">{userData?.username}</p>
                    <p className="text-gray-600 font-bold">Email :</p>
                    <p className="font-bold">{userData?.email}</p>
                    <p className="text-gray-600 font-bold">Token :</p>
                    <p className="font-bold truncate">
                      {tokenData || "No token available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 items-start">
                {" "}
                {/* Added items-start */}
                <button
                  onClick={() => alert("Settings clicked")}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 flex items-center justify-center text-sm min-w-[100px]"
                >
                  <i className="fas fa-cogs mr-2"></i>
                  Settings
                </button>
                <button
                  onClick={() => setShowInfo(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center text-sm min-w-[100px]"
                >
                  <i className="fas fa-info-circle mr-2"></i>
                  Info
                </button>
                <button
                  onClick={handleUserDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-600 flex items-center justify-center text-sm min-w-[100px]"
                >
                  <i className="fas fa-trash mr-2"></i>
                  Delete
                </button>
              </div>
            </div>

            {/* Session Status */}
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h5 className="text-xl font-bold text-gray-800">
                  Current Active Session
                </h5>
                <p className="text-gray-600">
                  Session Started:{" "}
                  <span className="text-bold">
                    {new Date().toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-3 mt-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <h5 className="text-xl font-bold text-gray-800">Last Login</h5>
                <p className="text-gray-600">
                  {lastLogin || "No data available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add this popup container */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                User Information
              </h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 ">
              <p className="text-gray-800">
                <strong>Username:</strong> {userData?.username}
              </p>
              <p className="text-gray-800">
                <strong>Email:</strong> {userData?.email}
              </p>
              <p className="text-gray-800">
                <strong>Status:</strong> Active
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

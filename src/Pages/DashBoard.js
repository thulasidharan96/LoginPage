import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Card from "../components/Card";
import { logout } from "../auth/auth";

const DashBoard = () => {
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col">
              <Card />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogOut}
          className="w-1/2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashBoard;

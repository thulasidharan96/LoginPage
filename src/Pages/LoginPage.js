// src/pages/LoginPage.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/authSlice"; // Import the action to set login data

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const currentDateTime = new Date().toLocaleString();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const storedData = JSON.parse(localStorage.getItem("registerData"));

      if (!storedData) {
        setErrorMessage("No registered user found. Please register first.");
        return;
      }

      if (
        storedData.email === formData.email &&
        storedData.password === formData.password
      ) {
        setErrorMessage("");
        const token = "dummy_token";
        dispatch(setLogin({ token, user: storedData }));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem('LastLogin', currentDateTime);
        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-70 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome Back</h2>
          <p className="text-lg text-gray-600">Please sign in to your account.</p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
            Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

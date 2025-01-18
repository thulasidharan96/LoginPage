import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../auth/Storage";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setError("");
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = formData;

      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (!password) {
        setError("Password is required");
        return;
      }

      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store token/data
        localStorage.setItem('idToken', email);
        
        // Verify stored data matches
        const storedData = getUserData();
        if (storedData === email) {
          setSuccess("Login successful! Redirecting...");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          throw new Error("Verification failed");
        }
      } catch (err) {
        setError("Invalid email or password");
      } finally {
        setIsLoading(false);
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
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
              {success}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
              </div>
              <div className="text-sm">
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
              Don't have an account? Register here
            </Link>
          </div>
          <footer className="mt-8 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} XYZ. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
};

export default LoginPage;
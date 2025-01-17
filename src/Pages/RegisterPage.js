import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Register
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                          <label className="block text-sm font-medium text-gray-700">
                              Email:
                          </label>
                          <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          />
                      </div>
                      <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                              Password:
                          </label>
                          <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          />
                      </div>
                      <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">
                              Confirm Password:
                          </label>
                          <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          />
                      </div>
                  </div>

                  <div>
                      <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                          Register
                      </button>
                  </div>
              </form>
              <div className="text-center">
                  <Link to="/" className="text-indigo-600 hover:text-indigo-500">
                      Already have an account? Login here
                  </Link>
              </div>
              <footer className="mt-8 text-center text-sm text-gray-600">
                  <p>© {new Date().getFullYear()} XYZ. All rights reserved.</p>
              </footer>
          </div>
      </div>
  );
};

export default RegisterPage;
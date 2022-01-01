import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { useAuthContext } from '../contexts/AuthProvider';

const SigninPage = () => {
  const [loginData, setLoginData] = useState({});
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLoading, signinUser, authError } = useAuthContext();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser(loginData.email, loginData.password, state, navigate);
    setLoginData({});
  };

  return (
    <>
      <Navbar />
      <section className="py-12 w-full max-w-7xl mx-auto px-6">
        <form onSubmit={handleSubmit}>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div>
                <h3 className="font-body tracking-wide font-bold text-2xl leading-6">
                  Sign in to Hero Rider
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your email address and password to log in to your Hero
                  Rider account.
                </p>
                <p className="font-medium mt-6">Don't have an account?</p>
                <div className="flex gap-5">
                  <Link
                    to="/signup-to-ride"
                    className="text-gray-500 hover:text-black underline"
                  >
                    Sign up to ride
                  </Link>
                  <Link
                    to="/signup-as-rider"
                    className="text-gray-500 hover:text-black underline"
                  >
                    Sign up as rider
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow rounded-md overflow-hidden">
                <div className="px-4 py-5 bg-gray-50 space-y-6 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* email */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Email<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        onChange={handleOnChange}
                        id="email"
                        autoComplete="email"
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/* password */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Password<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="password"
                        onChange={handleOnChange}
                        id="password"
                        className="bg-gray-50 mt-1 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {authError && (
                      <div className="col-span-6">
                        <p className="text-red-500">{authError}</p>
                      </div>
                    )}
                    {/* submit form */}
                    <div className="col-span-6">
                      <div className="pt-4 rounded">
                        <button
                          type="submit"
                          className="block w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                        >
                          {isLoading ? 'Loading...' : 'Sign in'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default SigninPage;

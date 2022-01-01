import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiLoginBoxLine, RiUserAddLine } from 'react-icons/ri';
import {
  BsHouse,
  BsFillCaretRightFill,
  BsThreeDotsVertical,
  BsPerson,
} from 'react-icons/bs';
import { useAuthContext } from '../contexts/AuthProvider';
import { Loading } from '.';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, rider, admin, adminLoading, riderLoading, userSignOut } =
    useAuthContext();

  return (
    <>
      {adminLoading || riderLoading ? <Loading /> : null}
      <nav className="bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border-b border-slate-200 sticky top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <div className="relative flex items-center justify-between h-16">
            {/* <!-- Mobile menu button--> */}
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="transform transition-all inline-flex items-center justify-center p-2 rounded-md focus:outline-none ring-1 ring-inset ring-slate-200"
              >
                <BsThreeDotsVertical className="h-6 w-6 text-gray-700" />
              </button>
              {/* Mobile menu */}
              {mobileMenuOpen && (
                <div className="md:hidden origin-top-left z-40 absolute bottom-0 left-0 w-52 ">
                  <div className="px-2 absolute w-full bg-white pt-2 pb-3 space-y-1 rounded-md shadow-lg">
                    <NavLink
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-gray-100 transform transition-all hover:bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                          : 'text-gray-400 transform transition-all hover:bg-gray-100 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                      }
                    >
                      <BsHouse className="flex-shrink-0 h-6 w-6" />
                      Home
                    </NavLink>
                    <NavLink
                      to="/signup-to-ride"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-gray-100 transform transition-all hover:bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                          : 'text-gray-400 transform transition-all hover:bg-gray-100 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                      }
                    >
                      <RiUserAddLine className="flex-shrink-0 h-6 w-6" />
                      Signup to ride
                    </NavLink>
                    <NavLink
                      to="/signup-as-rider"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-gray-100 transform transition-all hover:bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                          : 'text-gray-400 transform transition-all hover:bg-gray-100 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                      }
                    >
                      <RiUserAddLine className="flex-shrink-0 h-6 w-6" />
                      Signup as rider
                    </NavLink>
                    <NavLink
                      to="/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-gray-100 transform transition-all hover:bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                          : 'text-gray-400 transform transition-all hover:bg-gray-100 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex gap-2 items-center'
                      }
                    >
                      <RiLoginBoxLine className="flex-shrink-0 h-6 w-6" />
                      Sign in
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            {/* logo */}
            <div className="flex-1 md:flex-grow-0 flex items-center justify-center md:items-stretch md:justify-start">
              <Link to="/">
                <BsFillCaretRightFill className="h-8 w-8 text-gray-800" />
              </Link>
            </div>
            {/* links */}
            <div className="hidden md:block md:ml-6">
              <div className="flex sm:space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-gray-700 transform transition-all px-2 py-2 rounded-md text-base'
                      : 'text-gray-400 transform transition-all hover:text-gray-700 px-3 py-2 rounded-md text-base'
                  }
                >
                  Home
                </NavLink>
                {user?.email && (
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-gray-700 transform transition-all px-2 py-2 rounded-md text-base'
                        : 'text-gray-400 transform transition-all hover:text-gray-700 px-3 py-2 rounded-md text-base'
                    }
                  >
                    Orders
                  </NavLink>
                )}
                {admin && (
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-gray-700 transform transition-all px-2 py-2 rounded-md text-base'
                        : 'text-gray-400 transform transition-all hover:text-gray-700 px-3 py-2 rounded-md text-base'
                    }
                  >
                    Users
                  </NavLink>
                )}
                {user?.email ? (
                  <button
                    onClick={() => userSignOut()}
              
                    className="text-gray-400 transform transition-all hover:text-gray-700 px-3 py-2 rounded-md text-base"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/signup-to-ride"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-gray-700 transform transition-all px-2 py-2 rounded-md text-base'
                          : 'text-gray-400 transform transition-all hover:text-gray-700 px-3 py-2 rounded-md text-base'
                      }
                    >
                      Signup to ride
                    </NavLink>
                    <NavLink
                      to="/signup-as-rider"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-gray-700 transform transition-all px-2 py-2 rounded-md text-base'
                          : 'text-gray-400 transform transition-all hover:text-gray-700 px-3 py-2 rounded-md text-base'
                      }
                    >
                      Signup as rider
                    </NavLink>
                    <NavLink
                      to="/signin"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-gray-700 transform transition-all px-2 py-2 rounded-md text-base'
                          : 'text-gray-400 transform transition-all hover:text-gray-700 px-3 py-2 rounded-md text-base'
                      }
                    >
                      Signin
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            {/* profile */}
            <div className="flex absolute inset-y-0 right-0 items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded border border-slate-200 p-1"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {user.photoURL ? (
                      <img
                        className="h-8 w-8 sm:w-9 sm:h-9 rounded-full"
                        src={user.photoURL}
                        alt={user.displayName.split(' ').slice(-1).join(' ')}
                      />
                    ) : (
                      <BsPerson className="h-8 w-8 sm:w-8 sm:h-8 bg-transparent rounded-full overflow-hidden text-gray-700" />
                    )}
                  </button>
                </div>
                {/* <!-- Profile dropdown --> */}
                {dropdownOpen && (
                  <div className="origin-top-right z-40 absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white">
                    {user?.email ? (
                      <div className="divide-y divide-gray-200">
                        <div className="p-4">
                          <div className="truncate text-sm leading-none text-gray-800">
                            {user.displayName}
                          </div>
                          <div className="truncate text-xs leading-none my-1 text-gray-400">
                            {user.email}
                          </div>
                        </div>
                        <NavLink
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          <span className="mt-0.5">Dashboard</span>
                        </NavLink>
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            userSignOut();
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        <NavLink
                          to="/signup-to-ride"
                          onClick={() => setDropdownOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? 'block px-4 py-2 text-sm text-gray-700 bg-gray-100'
                              : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          }
                        >
                          Sign up to ride
                        </NavLink>
                        <NavLink
                          to="/signup-as-rider"
                          onClick={() => setDropdownOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? 'block px-4 py-2 text-sm text-gray-700 bg-gray-100'
                              : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          }
                        >
                          Sign up as rider
                        </NavLink>
                        <NavLink
                          to="/signin"
                          onClick={() => setDropdownOpen(false)}
                          className={({ isActive }) =>
                            isActive
                              ? 'block px-4 py-2 text-sm text-gray-700 bg-gray-100'
                              : 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          }
                        >
                          Sign in
                        </NavLink>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

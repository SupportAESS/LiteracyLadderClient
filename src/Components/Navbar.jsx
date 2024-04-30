import React, { useState, useEffect } from 'react';
import logo from '../asset/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume initial state is logged out
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('session');
    //console.log(loggedInUser);
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(loggedInUser).user.fullName); // Get username from localStorage
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic, e.g., clearing session storage or calling logout API
    // Then update isLoggedIn state and remove user data from localStorage
    localStorage.removeItem('session');
    setIsLoggedIn(false);
    setUsername('');
    window.location.href = '/login';

  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleAccountClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-none flex items-center space-x-2">
            <Link to="/" className="text-white flex">
              <img src={logo} className="w-20" alt="Logo" />
              <h1 className="hidden md:block self-center text-xl font-bold">Literacy Ladder</h1>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:ml-10">
            <div className="flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Home</Link>
              <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">About</Link>
              <Link to="/cart" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Cart</Link>
              <div 
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={handleAccountClick}
              >
                <button 
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  Account {isLoggedIn && <span className="ml-1 text-gray-400 text-sm">(Logged in as {username})</span>}
                </button>
                {isOpen && (
                  <div className="absolute top-full left-0 mt-0 bg-gray-700 text-white py-2 rounded-md text-lg font-medium z-50">
                    {isLoggedIn ? (
                      <>
                        <Link to="/userProfile" className="block px-4 py-2 hover:bg-gray-600">Profile</Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-600">Logout</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-2 hover:bg-gray-600">Login / Signup</Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleNavbar} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          <Link to="/" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/about" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">About</Link>
          <Link to="/cart" className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Cart</Link>
          <div 
            className="relative"
            onClick={handleAccountClick}
          >
            <button 
              className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Account {isLoggedIn && <span className="ml-1 text-gray-400 text-sm">(Logged in as {username})</span>}
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 bg-gray-700 text-white py-2 rounded-md text-base font-medium z-50">
                {isLoggedIn ? (
                  <>
                    <Link to="/userProfile" className="block px-4 py-2 hover:bg-gray-600">Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-600">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-600">Login / Signup</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

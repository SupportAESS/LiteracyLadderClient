import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import UserAddress from './userAddress';
import Orders from './myOrder';
import Profile from './Profile';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [selectedNavItem, setSelectedNavItem] = useState('orders');

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData.user);
    } else {
      // Handle user not logged in
      // Redirect to login page or show a message
    }
  }, []);

  const getUserData = () => {
    const sessionData = localStorage.getItem('session');
    // console.log(sessionData);
    return sessionData ? JSON.parse(sessionData) : null;
  };

  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
  };

  return (
    <div className="min-h-screen container mx-auto mt-10 flex bg-gray-100">
      {user ? (
        <div className="w-1/4 bg-gray-800 text-white py-6 px-4">
          <h2 className="text-lg font-semibold mb-4">{user.fullName}</h2>
          <ul className="space-y-2" style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <NavItem
              title="My Orders"
              selected={selectedNavItem === 'orders'}
              onClick={() => handleNavItemClick('orders')}
            />
            <NavItem
              title="Address"
              selected={selectedNavItem === 'address'}
              onClick={() => handleNavItemClick('address')}
            />
            <NavItem
              title="Personal Details"
              selected={selectedNavItem === 'details'}
              onClick={() => handleNavItemClick('details')}
            />
          </ul>
        </div>
      ) : (
        <h1>Please Login to see Orders</h1>
      )
      }
      <div className="w-3/4 bg-white p-6">
        {user ? (
          <div>
            {selectedNavItem === 'orders' && (
              <div>
                <Orders/>
              </div>
            )}
            {selectedNavItem === 'address' && (
              <div>
                <UserAddress />
              </div>
            )}
            {selectedNavItem === 'details' && (
              <div>
                <div>
                  <Profile/>
                </div>
                {/* Add more user details as needed */}
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

const NavItem = ({ title, selected, onClick }) => {
  return (
    <li
      className={`py-2 px-4 cursor-pointer ${selected ? 'bg-blue-600' : ''}`}
      onClick={onClick}
    >
      <span className={`${selected ? 'text-white' : 'text-gray-300'}`}>{title}</span>
    </li>
  );
};

export default UserProfile;

